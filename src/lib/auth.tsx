import React, { createContext, useContext, useEffect, useState } from 'react';
import { ClerkProvider, useAuth, useUser } from '@clerk/clerk-react';

const publishableKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

// Development mode detection - only works on localhost
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// Development mode mock auth provider
function DevAuthProvider({ children }: { children: React.ReactNode }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [, setUser] = useState<any>(null);
  
  const mockAuth = {
    isLoaded: true,
    isSignedIn,
    userId: isSignedIn ? 'dev-user-123' : null,
    user: isSignedIn ? {
      firstName: 'Dev',
      lastName: 'User',
      primaryEmailAddress: { emailAddress: 'dev@localhost.com' }
    } : null,
    signOut: () => {
      setIsSignedIn(false);
      setUser(null);
      console.log('Mock signOut');
    }
  };

  // Expose signIn function globally for StartPage to use
  React.useEffect(() => {
    (window as any).mockSignIn = () => {
      setIsSignedIn(true);
      setUser({
        firstName: 'Dev',
        lastName: 'User',
        primaryEmailAddress: { emailAddress: 'dev@localhost.com' }
      });
    };
  }, []);

  return (
    <AuthContext.Provider value={mockAuth}>
      {children}
    </AuthContext.Provider>
  );
}

if (!publishableKey && !isDevelopment) {
  throw new Error('Missing REACT_APP_CLERK_PUBLISHABLE_KEY environment variable');
}

// Custom auth context for our app
interface AuthContextType {
  isLoaded: boolean;
  isSignedIn: boolean;
  userId: string | null | undefined;
  user: any;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Use mock auth in development mode
  if (isDevelopment) {
    return <DevAuthProvider>{children}</DevAuthProvider>;
  }

  // Use real Clerk in production
  return (
    <ClerkProvider publishableKey={publishableKey!}>
      <AuthWrapper>{children}</AuthWrapper>
    </ClerkProvider>
  );
}

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn, userId, signOut } = useAuth();
  const { user } = useUser();
  const [setupDone, setSetupDone] = useState(false);

  // Initialize database and create user when signed in
  useEffect(() => {
    async function setupUser() {
      if (isLoaded && isSignedIn && userId && user && !setupDone) {
        try {
          await fetch('/api/setup-user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId,
              email: user.primaryEmailAddress?.emailAddress,
              firstName: user.firstName,
              lastName: user.lastName,
            }),
          });

          setSetupDone(true);
          console.log('User setup completed');
        } catch (error) {
          console.error('Error setting up user:', error);
        }
      }
    }

    setupUser();
  }, [isLoaded, isSignedIn, userId, user, setupDone]);

  const authValue: AuthContextType = {
    isLoaded,
    isSignedIn: isSignedIn || false,
    userId,
    user,
    signOut
  };

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAppAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAppAuth must be used within an AuthProvider');
  }
  return context;
} 