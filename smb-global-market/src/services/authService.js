import { supabase } from '../lib/supabaseClient';

export async function signUp({ email, password, fullName, role = 'customer' }) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;

  // Create the profile row. role is fixed at signup; changing it later
  // requires an admin (see RLS policy profiles_update_own_no_role_change).
  if (data.user) {
    const { error: profileErr } = await supabase.from('profiles').insert({
      user_id: data.user.id,
      email,
      full_name: fullName,
      role
    });
    if (profileErr) throw profileErr;
  }
  return data;
}

export async function signIn({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function requestPasswordReset(email) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`
  });
  if (error) throw error;
}

export async function getCurrentProfile() {
  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData.session) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', sessionData.session.user.id)
    .single();
  if (error) return null;
  return data;
}
