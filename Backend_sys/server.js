const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Enhanced CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:3000',  
    'http://localhost:8080',  // Potential Vue/React port
    'http://localhost:8081',
    'http://localhost:5173',  // Vite default port
    'http://localhost:5174'   // Alternative Vite port
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Apply CORS middleware with options
app.use(cors(corsOptions));

// Parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Logging middleware for debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
};




app.post('/api/book-session', async (req, res) => {
  try {
    const { mentor_id, mentee_id, title, description, session_date, duration, price } = req.body;
    
    // Validate input data
    if (!mentor_id || !mentee_id) {
      return res.status(400).json({ error: 'Mentor and mentee IDs are required' });
    }

    // Check for valid UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(mentor_id) || !uuidRegex.test(mentee_id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    // Check if mentee and mentor exist
    const { data: menteeCheck, error: menteeError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', mentee_id)
      .single();

    const { data: mentorCheck, error: mentorError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', mentor_id)
      .single();

    if (menteeError || mentorError) {
      return res.status(404).json({ error: 'Mentor or mentee not found' });
    }

    // Insert session
    const { data, error } = await supabase
      .from('mentor_sessions')
      .insert([{
        mentor_id,
        mentee_id,
        title,
        description,
        session_date,
        duration,
        price,
        status: 'scheduled'
      }])
      .select();

    if (error) throw error;

    res.status(201).json(data[0]);
  } catch (error) {
    console.error('Error booking session:', error);
    res.status(500).json({ error: error.message });
  }
});



// Enhanced Get Messages Endpoint
app.post('/api/messages', async (req, res) => {
  try {
    const { sender_id, recipient_id, content } = req.body;
    
    // Validate input against schema requirements
    if (!sender_id || !recipient_id || !content) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    if (sender_id === recipient_id) {
      return res.status(400).json({ error: 'Cannot message yourself' });
    }
    
    if (content.length > 2000) {
      return res.status(400).json({ error: 'Message exceeds 2000 character limit' });
    }

    // Check if users exist
    const { data: sender, error: senderError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', sender_id)
      .single();

    const { data: recipient, error: recipientError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', recipient_id)
      .single();

    if (senderError || !sender) {
      return res.status(404).json({ error: 'Sender not found' });
    }
    
    if (recipientError || !recipient) {
      return res.status(404).json({ error: 'Recipient not found' });
    }

    // Insert message
    const { data, error } = await supabase
      .from('messages')
      .insert([{
        sender_id,
        recipient_id,
        content,
        is_read: false
      }])
      .select('*');

    if (error) {
      console.error('Database insert error:', error);
      throw error;
    }

    res.status(201).json(data[0]);
  } catch (error) {
    console.error('Full error:', error);
    res.status(500).json({ 
      error: 'Failed to send message',
      details: error.message 
    });
  }
});


// Catch-all for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware (should be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});