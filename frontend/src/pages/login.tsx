import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    // Ensure this runs only on the client
  }, []);

  const handleLogin = async () => {
    setError(null); // Reset error state before attempting login
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    }
  };

  const handleSignUp = async () => {
    setError(null);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{isSignUp ? 'Sign Up' : 'Login'}</CardTitle>
          <CardDescription>Enter your credentials to {isSignUp ? 'create an account' : 'access your account'}.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full"
          />
          <Input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full"
          />
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex space-x-2">
            {isSignUp ? (
              <Button onClick={handleSignUp} className="w-full">Sign Up</Button>
            ) : (
              <Link href="/components/Overview">
                <Button onClick={handleLogin} className="w-full">Login</Button>
              </Link>
            )}
            <Button onClick={handleGoogleLogin} className="w-full bg-red-500 text-white">Sign in with Google</Button>
          </div>
          <Button onClick={() => setIsSignUp(!isSignUp)} className="w-full mt-2">
            {isSignUp ? 'Already have an account? Login' : 'New user? Sign up here'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
