import React from 'react';
import { SignIn, SignUp } from '@clerk/clerk-react';
import { useAppAuth } from '../lib/auth';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isLoaded, isSignedIn } = useAppAuth();

  // Show loading spinner while Clerk loads
  if (!isLoaded) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Show sign-in if not authenticated
  if (!isSignedIn) {
    return <AuthPage />;
  }

  // Show the app if authenticated
  return <>{children}</>;
};

const AuthPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = React.useState(false);

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="hero-gradient rounded-2xl p-6 text-white mb-6">
            <h1 className="text-3xl font-bold mb-2">✨ Health Tracker</h1>
            <p className="text-white/90">
              Track your 28-day parasite cleanse journey
            </p>
          </div>
        </div>

        {/* Auth Forms */}
        <div className="card-gradient">
          <div className="text-center mb-6">
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

          <div className="clerk-auth-container">
            {isSignUp ? (
              <SignUp 
                routing="hash"
                fields={[
                  { name: 'firstName', required: true },
                  { name: 'lastName', required: true },
                  { name: 'emailAddress', required: true },
                  { name: 'password', required: true }
                ]}
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

        {/* Features */}
        <div className="mt-8 text-center">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="card-gradient p-4">
              <div className="text-primary-600 text-xl mb-2">📊</div>
              <div className="text-gray-900 dark:text-gray-100 font-medium">Track Progress</div>
              <div className="text-gray-600 dark:text-gray-400">28-day journey</div>
            </div>
            <div className="card-gradient p-4">
              <div className="text-primary-600 text-xl mb-2">📱</div>
              <div className="text-gray-900 dark:text-gray-100 font-medium">Sync Devices</div>
              <div className="text-gray-600 dark:text-gray-400">Access anywhere</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthGuard; 