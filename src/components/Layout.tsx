import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  Pill, 
  Activity, 
  BookOpen, 
  Target,
  Sun,
  Moon,
  LogOut
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useAppAuth } from '../lib/auth';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAppAuth();

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/calendar', icon: Calendar, label: 'Calendar' },
    { path: '/supplements', icon: Pill, label: 'Supplements' },
    { path: '/biofeedback', icon: Activity, label: 'Metrics' },
    { path: '/journal', icon: BookOpen, label: 'Journal' },
    { path: '/post-cleanse', icon: Target, label: 'Post-Plan' },
  ];

  return (
    <div className="flex flex-col h-screen gradient-bg">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 hero-gradient rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
              </span>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Welcome back, {user?.username || 'User'}!
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                @{user?.username || 'health-tracker-user'}
              </p>
            </div>
          </div>

          {/* App Title */}
          <div className="hero-gradient rounded-lg px-4 py-1">
            <span className="text-white font-semibold text-sm">✨ Health Tracker</span>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>
            <button
              onClick={() => signOut()}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              aria-label="Sign out"
            >
              <LogOut className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        <div className="max-w-md mx-auto">
          {children}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 px-2 py-2">
        <div className="flex justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-tab ${isActive ? 'active' : ''}`}
              >
                <Icon size={20} />
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Layout; 