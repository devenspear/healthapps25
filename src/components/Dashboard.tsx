import React from 'react';
import { Link } from 'react-router-dom';
import { UserProgress } from '../types';
import { 
  Calendar, 
  Activity, 
  BookOpen, 
  TrendingUp,
  CheckCircle,
  Clock
} from 'lucide-react';
import { format, addDays, parseISO } from 'date-fns';
import { useAppAuth } from '../lib/auth';

interface DashboardProps {
  progress: UserProgress;
  updateProgress: (progress: Partial<UserProgress>) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ progress }) => {
  const { user } = useAppAuth();
  const startDate = parseISO(progress.startDate);
  const currentDate = addDays(startDate, progress.currentDay - 1);
  const completionPercentage = (progress.completedDays.length / 28) * 100;
  
  const todayEntry = progress.dayEntries[progress.currentDay];
  const todaysBiofeedback = progress.biofeedbackEntries[format(currentDate, 'yyyy-MM-dd')];
  const todaysJournal = progress.journalEntries[format(currentDate, 'yyyy-MM-dd')];

  const quickStats = [
    {
      label: 'Current Day',
      value: progress.currentDay,
      total: 28,
      icon: Calendar,
      color: 'text-primary-600'
    },
    {
      label: 'Completed Days',
      value: progress.completedDays.length,
      total: 28,
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      label: 'Overall Progress',
      value: `${Math.round(completionPercentage)}%`,
      total: null,
      icon: TrendingUp,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Welcome Section */}
      <div className="hero-gradient rounded-2xl p-6 text-white mb-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">
            Welcome Back, {user?.firstName || 'Biohacker'}! 🚀
          </h2>
          <p className="text-white/90 mb-4">
            Day {progress.currentDay} of your parasite cleanse journey
          </p>
          <div className="bg-white/20 rounded-full h-3 mb-2">
            <div 
              className="bg-white rounded-full h-3 transition-all duration-500 shadow-sm"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <p className="text-sm text-white/80">
            {format(currentDate, 'EEEE, MMMM do, yyyy')}
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-4">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card-gradient">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {stat.value}
                    {stat.total && <span className="text-lg text-gray-400 dark:text-gray-500">/{stat.total}</span>}
                  </p>
                </div>
                <Icon className={`h-8 w-8 ${stat.color} dark:opacity-80`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Today's Phase */}
      {todayEntry && (
        <div className="card-gradient">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Today's Focus</h3>
          <div className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border border-primary-200 dark:border-primary-700 rounded-lg p-4">
            <h4 className="font-medium text-primary-900 dark:text-primary-100">{todayEntry.phase}</h4>
            <p className="text-sm text-primary-700 dark:text-primary-300 mt-1">
              Phase {todayEntry.week} • Day {todayEntry.day}
            </p>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="card-gradient">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Quick Actions</h3>
        <div className="space-y-3">
          <Link 
            to="/calendar" 
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-primary-600 mr-3" />
              <span className="font-medium">Complete Today's Tasks</span>
            </div>
            <Clock className="h-4 w-4 text-gray-400" />
          </Link>
          
          <Link 
            to="/biofeedback" 
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center">
              <Activity className="h-5 w-5 text-green-600 mr-3" />
              <span className="font-medium">Log Biofeedback</span>
            </div>
            {!todaysBiofeedback && (
              <div className="w-2 h-2 bg-red-500 rounded-full" />
            )}
          </Link>
          
          <Link 
            to="/journal" 
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center">
              <BookOpen className="h-5 w-5 text-purple-600 mr-3" />
              <span className="font-medium">Daily Journal</span>
            </div>
            {!todaysJournal && (
              <div className="w-2 h-2 bg-red-500 rounded-full" />
            )}
          </Link>
        </div>
      </div>

      {/* Phase Info */}
      {progress.currentDay > 21 && (
        <div className="card-gradient">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Rebuild Phase Active</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            You're in the crucial rebuilding phase. Focus on gut repair and beneficial bacteria restoration.
          </p>
          <Link 
            to="/post-cleanse" 
            className="btn-primary text-sm w-full text-center block"
          >
            View Post-Cleanse Plan
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 