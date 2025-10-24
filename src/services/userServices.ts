// src/services/userService.ts

import { supabase } from '../lib/supabaseClient'; // Adjust path to your client

// This function is now reusable and in a logical place
export async function fetchUserData() {
  if (!supabase) {
    console.error("Supabase client is not initialized.");
    return null; // Return null or an empty array
  }

  const { data, error } = await supabase.from('users').select('*');

  if (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
  
  console.log("User data:", data);
  return data;
}