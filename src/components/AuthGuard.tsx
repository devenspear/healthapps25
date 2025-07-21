import React from 'react';
import { SignIn, SignUp } from '@clerk/clerk-react';
import { useAppAuth } from '../lib/auth';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isLoaded, isSignedIn } = useAppAuth();

  // Development mode detection
  const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

  // Show loading spinner while Clerk loads (only in production)
  if (!isDevelopment && !isLoaded) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // In development mode, if not signed in, just show the children (App.tsx handles routing)
  if (isDevelopment) {
    return <>{children}</>;
  }

  // Production: Show sign-in if not authenticated
  if (!isSignedIn) {
    return <AuthPage />;
  }

  // Show the app if authenticated
  return <>{children}</>;
};

const AuthPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = React.useState(false);

  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo - Large and Centered */}
        <div className="text-center mb-8">
          <img src="/logo.png" alt="Paratox Logo" className="mx-auto h-32 w-32 mb-4 rounded-2xl shadow-lg" />
        </div>
        {/* Auth Forms with Tagline */}
        <div className="card-gradient">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold mb-2 text-primary-800">✨ Health Tracker</h1>
            <p className="text-primary-400 mb-4">Track your 28-day parasite cleanse journey</p>
            <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setIsSignUp(false)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  !isSignUp
                    ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsSignUp(true)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  isSignUp
                    ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          {isSignUp && (
            <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                💡 <strong>Please provide your first and last name</strong> during signup for a personalized experience throughout your health journey.
              </p>
            </div>
          )}

          <div className="clerk-auth-container">
            {isSignUp ? (
              <SignUp 
                routing="hash"
                appearance={{
                  elements: {
                    formButtonPrimary: 'bg-primary-600 hover:bg-primary-700',
                    card: 'shadow-none bg-transparent',
                    headerTitle: 'text-gray-900 dark:text-gray-100',
                    headerSubtitle: 'text-gray-600 dark:text-gray-400',
                    socialButtonsBlockButton: 'border-gray-200 dark:border-gray-600',
                    formFieldInput: 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700',
                    footerActionLink: 'text-primary-600 hover:text-primary-700'
                  }
                }}
              />
            ) : (
              <SignIn 
                routing="hash"
                appearance={{
                  elements: {
                    formButtonPrimary: 'bg-primary-600 hover:bg-primary-700',
                    card: 'shadow-none bg-transparent',
                    headerTitle: 'text-gray-900 dark:text-gray-100',
                    headerSubtitle: 'text-gray-600 dark:text-gray-400',
                    socialButtonsBlockButton: 'border-gray-200 dark:border-gray-600',
                    formFieldInput: 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700',
                    footerActionLink: 'text-primary-600 hover:text-primary-700'
                  }
                }}
              />
            )}
          </div>
        </div>
        {/* Features section removed as requested */}
      </div>
    </div>
  );
};

export default AuthGuard; 