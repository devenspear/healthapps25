import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAppAuth } from './lib/auth';
import AuthGuard from './components/AuthGuard';
import { useLocalStorage } from './hooks/useLocalStorage';
import { UserProgress } from './types';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import CleanseCalendar from './components/CleanseCalendar';
import SupplementStack from './components/SupplementStack';
import BiofeedbackTracker from './components/BiofeedbackTracker';
import CleanseJournal from './components/CleanseJournal';
import PostCleanseIntegration from './components/PostCleanseIntegration';
import { cleanseCalendar } from './data/cleanseCalendar';
import { fetchProgress, saveProgress } from './lib/api';

const initialProgress: UserProgress = {
  currentDay: 1,
  startDate: new Date().toISOString().split('T')[0],
  completedDays: [],
  journalEntries: {},
  biofeedbackEntries: {},
  dayEntries: cleanseCalendar.reduce((acc, day) => {
    acc[day.day] = day;
    return acc;
  }, {} as { [day: number]: any })
};

function AppContent() {
  const { userId } = useAppAuth();
  const [progress, setProgress] = useLocalStorage<UserProgress>('cleanse-progress', initialProgress);

  // Hydrate from server once we have a userId
  React.useEffect(() => {
    async function loadRemote() {
      if (!userId) return;
      try {
        const remote = await fetchProgress(userId);
        if (remote) {
          setProgress(remote);
        }
      } catch (err) {
        console.error('Failed to fetch remote progress', err);
      }
    }
    loadRemote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const updateProgress = React.useCallback((newProgress: Partial<UserProgress>) => {
    setProgress(prev => {
      const updated = { ...prev, ...newProgress } as UserProgress;
      // Fire and forget remote save
      if (userId) {
        saveProgress(userId, updated).catch(err => console.error('saveProgress failed', err));
      }
      return updated;
    });
  }, [setProgress, userId]);

  return (
    <Router>
      <div className="App min-h-screen bg-gray-50">
        <Layout>
          <Routes>
            <Route 
              path="/" 
              element={<Dashboard progress={progress} updateProgress={updateProgress} />} 
            />
            <Route 
              path="/calendar" 
              element={<CleanseCalendar progress={progress} updateProgress={updateProgress} />} 
            />
            <Route 
              path="/supplements" 
              element={<SupplementStack />} 
            />
            <Route 
              path="/biofeedback" 
              element={<BiofeedbackTracker progress={progress} updateProgress={updateProgress} />} 
            />
            <Route 
              path="/journal" 
              element={<CleanseJournal progress={progress} updateProgress={updateProgress} />} 
            />
            <Route 
              path="/post-cleanse" 
              element={<PostCleanseIntegration />} 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AuthGuard>
        <AppContent />
      </AuthGuard>
    </AuthProvider>
  );
}

export default App; 