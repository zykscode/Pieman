import type { SupabaseClient, User } from '@supabase/supabase-js';
import { useEffect, useRef, useState } from 'react';

import { createClient } from '#/utils/client';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = useRef<SupabaseClient>(createClient());

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.current.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = (email: string, password: string) => {
    return supabase.current.auth.signUp({ email, password });
  };

  const signIn = (email: string, password: string) => {
    return supabase.current.auth.signInWithPassword({ email, password });
  };

  const signOut = () => {
    return supabase.current.auth.signOut();
  };

  return { user, loading, signUp, signIn, signOut };
}
