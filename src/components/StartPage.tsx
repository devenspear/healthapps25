import React from 'react';
import { useNavigate } from 'react-router-dom';

const StartPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Development mode detection
  const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  
  const handleBeginCleanse = () => {
    if (isDevelopment) {
      // In development mode, use the globally exposed mock sign in
      if ((window as any).mockSignIn) {
        (window as any).mockSignIn();
      }
      // Navigate to dashboard after signing in
      setTimeout(() => {
        navigate('/');
      }, 100);
    } else {
      // In production, navigate to the dashboard (Clerk will handle auth)
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col items-center mb-6">
            <img src="/logo.png" alt="Paratox Logo" className="h-32 w-32 mb-4 rounded-2xl shadow-lg" />
            <p className="mt-2 text-lg text-primary-400 font-medium">Remove toxins. Reclaim your health.</p>
          </div>
          <p className="text-gray-700 dark:text-gray-200 text-base mb-4">
            Paratox is your companion for a guided 28-day parasite cleanse.<br/>
            Track your daily progress, log biofeedback, and follow a science-backed protocol to eliminate toxins and restore your vitality.<br/>
            Start your journey to a healthier, more energized you—one day at a time.
          </p>
          <button
            className="mt-4 px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg shadow transition"
            onClick={handleBeginCleanse}
          >
            Begin Your Cleanse
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartPage; 