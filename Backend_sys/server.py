import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from supabase import create_client
from dotenv import load_dotenv
import jwt
from functools import wraps
from jwt import PyJWKClient
import logging
from datetime import datetime

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Initialize Supabase client
supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))

# Clerk configuration
CLERK_JWKS_URL = f"https://{os.getenv('CLERK_DOMAIN')}/.well-known/jwks.json"
jwks_client = PyJWKClient(CLERK_JWKS_URL)

def verify_clerk_token(token):
    """Verify Clerk JWT token and return payload"""
    try:
        signing_key = jwks_client.get_signing_key_from_jwt(token)
        payload = jwt.decode(
            token,
            signing_key.key,
            algorithms=["RS256"],
            options={
                "verify_iss": True,
                "issuer": f"https://{os.getenv('CLERK_DOMAIN')}",
                "verify_aud": False,
                "verify_exp": True
            }
        )
        return payload
    except Exception as e:
        logger.error(f"Token verification failed: {str(e)}")
        raise ValueError("Invalid authentication token")

def clerk_auth_required(f):
    """Decorator to protect routes with Clerk authentication"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        
        if not auth_header or not auth_header.startswith('Bearer '):
            logger.warning("Missing or invalid authorization header")
            return jsonify({'error': 'Unauthorized'}), 401
            
        try:
            token = auth_header.split(' ')[1]
            payload = verify_clerk_token(token)
            request.user_id = payload['sub']  # Clerk user ID
            request.user_data = payload
        except Exception as e:
            logger.error(f"Authentication error: {str(e)}")
            return jsonify({'error': str(e)}), 401
            
        return f(*args, **kwargs)
    return decorated_function

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'eduwealth-backend',
        'timestamp': datetime.datetime.utcnow().isoformat()
    })

@app.route('/api/dashboard', methods=['GET'])
@clerk_auth_required
def get_dashboard():
    """Fetch all dashboard data for authenticated user"""
    try:
        user_id = request.user_id
        
        # Fetch data from Supabase
        stats = get_user_stats(user_id)
        learning_paths = get_learning_paths(user_id)
        upcoming_sessions = get_upcoming_sessions(user_id)
        recommended_mentors = get_recommended_mentors(user_id)
        
        return jsonify({
            'stats': stats,
            'learning_paths': learning_paths,
            'upcoming_sessions': upcoming_sessions,
            'recommended_mentors': recommended_mentors,
            'success': True
        })
        
    except Exception as e:
        logger.error(f"Dashboard error for user {user_id}: {str(e)}")
        return jsonify({'error': str(e), 'success': False}), 500

def get_user_stats(user_id):
    """Fetch user statistics from Supabase"""
    result = supabase.rpc('get_user_stats', {'user_id': user_id}).execute()
    
    if result.data:
        return {
            'learning_hours': result.data[0].get('learning_hours', 0),
            'completed_sessions': result.data[0].get('completed_sessions', 0),
            'skills_in_progress': result.data[0].get('skills_in_progress', 0),
            'network_growth': result.data[0].get('network_growth', 0)
        }
    return default_stats()

def default_stats():
    """Return default stats when no data is available"""
    return {
        'learning_hours': 0,
        'completed_sessions': 0,
        'skills_in_progress': 0,
        'network_growth': 0
    }

def get_learning_paths(user_id):
    """Fetch user's learning paths from Supabase"""
    result = supabase.table('learning_paths') \
        .select('id, title, progress, completed_modules, total_modules') \
        .eq('user_id', user_id) \
        .execute()
    return result.data or []

def get_upcoming_sessions(user_id):
    """Fetch upcoming mentorship sessions"""
    now = datetime.utcnow().isoformat()
    result = supabase.table('mentor_sessions') \
        .select('id, title, session_date, duration, mentor:profiles(name, avatar_url)') \
        .eq('mentee_id', user_id) \
        .gte('session_date', now) \
        .order('session_date') \
        .limit(2) \
        .execute()
    
    return [format_session(session) for session in result.data] if result.data else []

def format_session(session):
    """Format session data for frontend"""
    session_date = datetime.fromisoformat(session['session_date'])
    return {
        'id': session['id'],
        'title': session['title'],
        'mentorName': session['mentor']['name'],
        'date': session_date.strftime('%Y-%m-%d'),
        'time': session_date.strftime('%I:%M %p'),
        'duration': f"{session['duration']} min",
        'avatarUrl': session['mentor'].get('avatar_url')
    }

def get_recommended_mentors(user_id):
    """Fetch recommended mentors based on user's skills"""
    result = supabase.rpc('get_recommended_mentors', {'user_id': user_id}).execute()
    return [format_mentor(mentor) for mentor in result.data] if result.data else []

def format_mentor(mentor):
    """Format mentor data for frontend"""
    return {
        'id': mentor['id'],
        'name': mentor['name'],
        'title': mentor.get('title', ''),
        'rating': float(mentor.get('rating', 4.5)),
        'reviews': mentor.get('reviews', 0),
        'skills': mentor.get('skills', []),
        'hourlyRate': float(mentor.get('hourly_rate', 50)),
        'avatarUrl': mentor.get('avatar_url')
    }

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=os.getenv('FLASK_DEBUG', 'False') == 'True')