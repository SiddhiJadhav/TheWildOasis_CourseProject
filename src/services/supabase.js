import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://frjroarqxikqotyaxqwf.supabase.co';
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyanJvYXJxeGlrcW90eWF4cXdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxNzA1MTcsImV4cCI6MjA0ODc0NjUxN30.1OteLRAOwNpdndE6YNHUo9RuzMlGo10YBUkBwQRHrDc`;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
