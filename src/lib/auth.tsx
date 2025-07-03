import React, { createContext, useContext, useEffect, useState } from 'react';
import { ClerkProvider, useAuth, useUser } from '@clerk/clerk-react';
import { createUser, initializeDatabase } from './database';

const publishableKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
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
  return (
    <ClerkProvider publishableKey={publishableKey!}>
      <AuthWrapper>{children}</AuthWrapper>
    </ClerkProvider>
  );
}

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn, userId, signOut } = useAuth();
  const { user } = useUser();
  const [dbInitialized, setDbInitialized] = useState(false);

  // Initialize database and create user when signed in
  useEffect(() => {
    async function setupUser() {
      if (isLoaded && isSignedIn && userId && user && !dbInitialized) {
        try {
          // Initialize database tables
          await initializeDatabase();
          
          // Create or update user in our database
          await createUser(
            userId,
            user.primaryEmailAddress?.emailAddress,
            user.firstName || undefined,
            user.lastName || undefined
          );
          
          setDbInitialized(true);
          console.log('User setup completed');
        } catch (error) {
          console.error('Error setting up user:', error);
        }
      }
    }

    setupUser();
  }, [isLoaded, isSignedIn, userId, user, dbInitialized]);

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