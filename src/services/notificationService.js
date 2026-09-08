// src/services/notificationService.js
//
// ASSUMPTION TO VERIFY: this assumes a `notifications` table with columns
// (id, user_id, type, message, is_read, created_at) — matching the table
// your README says already exists (rows are written on order/vendor events,
// delivery via email/SMS/push is what's still pending). If your actual
// 0001_schema.sql names these columns differently, adjust the `.select()`
// and `.eq()` calls below to match — everything else in Header.jsx will
// keep working either way because the calls are wrapped in try/catch.

import { supabase } from '../lib/supabaseClient';

export async function getMyNotifications(limit = 10) {
  const { data: auth } = await supabase.auth.getUser();
  const userId = auth?.user?.id;
  if (!userId) return [];

  const { data, error } = await supabase
    .from('notifications')
    .select('id, type, message, is_read, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
}

export async function getUnreadNotificationCount() {
  const { data: auth } = await supabase.auth.getUser();
  const userId = auth?.user?.id;
  if (!userId) return 0;

  const { count, error } = await supabase
    .from('notifications')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('is_read', false);

  if (error) throw error;
  return count || 0;
}

export async function markAllNotificationsRead() {
  const { data: auth } = await supabase.auth.getUser();
  const userId = auth?.user?.id;
  if (!userId) return;

  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('user_id', userId)
    .eq('is_read', false);

  if (error) throw error;
}
