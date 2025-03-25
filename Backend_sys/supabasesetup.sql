-- Enable UUID extension for generating unique IDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User Profiles table (enhanced with clerk_id for Clerk auth)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  clerk_id TEXT UNIQUE, -- Add this for Clerk integration
  name TEXT,
  email TEXT UNIQUE,
  bio TEXT,
  phone TEXT,
  location TEXT,
  company TEXT,
  role TEXT,
  hourly_rate DECIMAL(10, 2),
  is_mentor BOOLEAN DEFAULT false,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Skills table (added search index)
CREATE TABLE public.skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX idx_skills_name ON public.skills (name);
CREATE UNIQUE INDEX idx_skills_name_category_unique ON public.skills (name, category) 
WHERE category IS NOT NULL;

-- Many-to-many relationship between users and skills (with improved constraints)
CREATE TABLE public.user_skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  skill_id UUID REFERENCES public.skills(id) ON DELETE CASCADE,
  proficiency_level TEXT CHECK (proficiency_level IN ('beginner', 'intermediate', 'advanced', 'expert')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, skill_id)
);

-- Mentor sessions table (with timezone awareness)
CREATE TABLE public.mentor_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mentor_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  mentee_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  session_date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration INTEGER NOT NULL CHECK (duration > 0 AND duration <= 240), -- 4 hour max
  price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
  status TEXT NOT NULL CHECK (status IN ('scheduled', 'completed', 'cancelled', 'rescheduled')),
  meeting_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  CHECK (mentor_id != mentee_id)
);

-- Reviews table (with validation)
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES public.mentor_sessions(id) ON DELETE CASCADE,
  reviewer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT CHECK (length(review_text) <= 1000),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(session_id, reviewer_id)
);

-- Mentor videos table (with validation)
CREATE TABLE public.mentor_videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mentor_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL CHECK (length(title) <= 100),
  description TEXT CHECK (length(description) <= 500),
  video_url TEXT NOT NULL CHECK (video_url LIKE 'https://%'),
  thumbnail_url TEXT CHECK (thumbnail_url LIKE 'https://%'),
  duration INTEGER CHECK (duration > 0), -- in seconds
  views INTEGER DEFAULT 0 CHECK (views >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- User settings (with validation)
CREATE TABLE public.user_settings (
  user_id UUID REFERENCES public.profiles(id) PRIMARY KEY,
  email_notifications BOOLEAN DEFAULT true,
  sms_notifications BOOLEAN DEFAULT false,
  dark_mode BOOLEAN DEFAULT false,
  language TEXT DEFAULT 'en' CHECK (language IN ('en', 'es', 'fr', 'de', 'ja')),
  timezone TEXT DEFAULT 'UTC' CHECK (timezone IN ('UTC', 'PST', 'EST', 'CET', 'JST')),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Messages table (with read receipts)
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  recipient_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL CHECK (length(content) <= 2000),
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  CHECK (sender_id != recipient_id)
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentor_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentor_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Enhanced security policies
-- Profiles: Public read but only own write
CREATE POLICY "profiles_select_policy" 
ON public.profiles FOR SELECT USING (true);

CREATE POLICY "profiles_update_policy"
ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Skills: Public read only
CREATE POLICY "skills_select_policy"
ON public.skills FOR SELECT USING (true);

CREATE POLICY "skills_insert_policy"
ON public.skills FOR INSERT WITH CHECK (auth.role() = 'admin');

-- User Skills: User-specific access
CREATE POLICY "user_skills_full_access"
ON public.user_skills
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Mentor Sessions: Complex access rules
CREATE POLICY "mentor_sessions_mentor_access"
ON public.mentor_sessions
USING (auth.uid() = mentor_id)
WITH CHECK (auth.uid() = mentor_id);

CREATE POLICY "mentor_sessions_mentee_access"
ON public.mentor_sessions
USING (auth.uid() = mentee_id)
WITH CHECK (auth.uid() = mentee_id);

-- Reviews: Session participants can create/read
CREATE POLICY "reviews_session_participants"
ON public.reviews
USING (
  auth.uid() = reviewer_id OR
  auth.uid() IN (
    SELECT mentor_id FROM public.mentor_sessions WHERE id = session_id
    UNION
    SELECT mentee_id FROM public.mentor_sessions WHERE id = session_id
  )
)
WITH CHECK (auth.uid() = reviewer_id);

-- Updated user creation function for Clerk
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, clerk_id, email, name)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'clerk_id',
    new.email,
    COALESCE(
      new.raw_user_meta_data->>'name',
      CONCAT(new.raw_user_meta_data->>'first_name', ' ', new.raw_user_meta_data->>'last_name')
    )
  );
  
  INSERT INTO public.user_settings (user_id)
  VALUES (new.id);
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for user signup
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create indexes for performance
CREATE INDEX idx_profiles_clerk_id ON public.profiles (clerk_id);
CREATE INDEX idx_mentor_sessions_dates ON public.mentor_sessions (session_date);
CREATE INDEX idx_messages_recipient ON public.messages (recipient_id, is_read);