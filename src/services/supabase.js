import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://famguzfgfjwwxdlemzlh.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhbWd1emZnZmp3d3hkbGVtemxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM3Mzk4NDYsImV4cCI6MjAzOTMxNTg0Nn0.C7RaO_Xj3AMHoaQB_GZhblWI4vHHbHUuMouu35qQdfo";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
