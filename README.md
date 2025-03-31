
# EduWealth - Learning and Mentorship Platform

EduWealth is a comprehensive education platform designed to connect learners with mentors, facilitate knowledge sharing, and track learning progress. The platform offers a personalized dashboard, mentorship sessions, skill tracking, and more.

## Features Implemented

### User Authentication & Authorization
- Secure authentication using Clerk integration
- User roles (mentee and mentor)
- Protected routes requiring authentication

### Dashboard
- Overview of learning statistics
- Learning paths progress tracking
- Upcoming mentorship sessions
- Recommended mentors based on user interests

### Mentorship System
- Browse available mentors
- Schedule mentorship sessions
- View mentor profiles with skills and hourly rates
- Ratings and reviews for mentors

### Learning Resources
- Educational videos from mentors
- Structured learning paths
- Progress tracking for courses and skills

### Personal Accomplishments
- Track educational milestones and achievements
- Display certificates and awards
- Record participation in events and competitions

### Analytics
- Learning progress visualization
- Skills development tracking
- Network growth metrics

## Technology Stack

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- Shadcn UI component library
- React Router for navigation
- Tanstack React Query for data fetching

### Backend
- Supabase for database and authentication
- Flask Python API for custom business logic
- PostgreSQL database

### Database Schema
The application uses a relational database with tables for:
- User profiles
- Mentors
- Courses and learning paths
- Mentorship sessions
- Reviews and ratings
- Skills and accomplishments

## Project Structure

```
eduwealth/
├── src/                # Frontend source code
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom React hooks
│   ├── services/       # API service functions
│   └── integrations/   # Third-party integrations
├── Backend_sys/        # Backend server code
│   ├── server.js       # Nodejs API server
│   └── supabasesetup.sql   # Database schema
└── public/             # Static assets
```

## Getting Started

### Prerequisites
- Node.js (v16+)
- Python 3.8+
- PostgreSQL

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/eduwealth.git
cd eduwealth
```

2. Install frontend dependencies
```bash
npm install
```

3. Install backend dependencies
```bash
cd Backend_sys
npm install 
```

4. Start the frontend development server
```bash
npm run dev
```

5. Start the backend server
```bash
cd Backend_sys
npm start
```

6. Access the application frontend will be live at port `http://localhost:8080`
7. Access the application’s backend full power at port ``http://localhost:5000`


## Future Enhancements

### Planned Features
- Real-time chat between mentors and mentees
- Integration with payment gateways for premium content
- Mobile application
- AI-powered learning recommendations
- Virtual classroom functionality

## Contributing

We welcome contributions to improve EduWealth! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
