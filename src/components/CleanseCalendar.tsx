import React, { useState } from 'react';
import { UserProgress } from '../types';
import { ChevronLeft, ChevronRight, CheckCircle, Circle } from 'lucide-react';

interface CleanseCalendarProps {
  progress: UserProgress;
  updateProgress: (progress: Partial<UserProgress>) => void;
}

const CleanseCalendar: React.FC<CleanseCalendarProps> = ({ progress, updateProgress }) => {
  const [selectedDay, setSelectedDay] = useState(progress.currentDay);
  
  const dayEntry = progress.dayEntries[selectedDay] || null;

  const handleTaskToggle = (taskId: string) => {
    if (!dayEntry) return;

    const updatedTasks = dayEntry.tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );

    const allTasksCompleted = updatedTasks.every(task => task.completed);
    
    const updatedDayEntry = {
      ...dayEntry,
      tasks: updatedTasks,
      completed: allTasksCompleted
    };

    const updatedDayEntries = {
      ...progress.dayEntries,
      [selectedDay]: updatedDayEntry
    };

    let updatedCompletedDays = [...progress.completedDays];
    if (allTasksCompleted && !updatedCompletedDays.includes(selectedDay)) {
      updatedCompletedDays.push(selectedDay);
    } else if (!allTasksCompleted && updatedCompletedDays.includes(selectedDay)) {
      updatedCompletedDays = updatedCompletedDays.filter(day => day !== selectedDay);
    }

    updateProgress({
      dayEntries: updatedDayEntries,
      completedDays: updatedCompletedDays
    });
  };

  const handleDieOffScoreChange = (score: number) => {
    if (!dayEntry) return;

    const updatedDayEntry = {
      ...dayEntry,
      dieOffScore: score
    };

    updateProgress({
      dayEntries: {
        ...progress.dayEntries,
        [selectedDay]: updatedDayEntry
      }
    });
  };

  const navigateDay = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && selectedDay > 1) {
      setSelectedDay(selectedDay - 1);
    } else if (direction === 'next' && selectedDay < 28) {
      setSelectedDay(selectedDay + 1);
    }
  };

  if (!dayEntry) {
    return (
      <div className="p-4">
        <div className="card-gradient text-center">
          <p className="text-gray-600 dark:text-gray-400">Day not found</p>
        </div>
      </div>
    );
  }

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'Priming': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Kill - Phase 1': return 'bg-red-100 text-red-800 border-red-200';
      case 'Kill - Phase 2': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Rebuild': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Day Navigation */}
      <div className="card-gradient">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigateDay('prev')}
            disabled={selectedDay === 1}
            className="p-2 rounded-lg bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous day"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Day {selectedDay}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Week {dayEntry.week}</p>
          </div>
          
          <button
            onClick={() => navigateDay('next')}
            disabled={selectedDay === 28}
            className="p-2 rounded-lg bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next day"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Phase Badge */}
        <div className="text-center">
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getPhaseColor(dayEntry.phase)}`}>
            {dayEntry.phase}
          </span>
        </div>
      </div>

      {/* Daily Tasks */}
      <div className="card-gradient">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Today's Protocol</h3>
        <div className="space-y-3">
          {dayEntry.tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
            >
              <button
                onClick={() => handleTaskToggle(task.id)}
                className="mt-0.5"
              >
                {task.completed ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <Circle className="h-5 w-5 text-gray-400" />
                )}
              </button>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary-600">
                    {task.time}
                  </span>
                </div>
                <p className={`text-sm mt-1 ${task.completed ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                  {task.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Die-Off Score */}
      <div className="card-gradient">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Die-Off Score</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Rate your detox symptoms today (1 = minimal, 10 = intense)
        </p>
        <div className="grid grid-cols-5 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
            <button
              key={score}
              onClick={() => handleDieOffScoreChange(score)}
              className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                dayEntry.dieOffScore === score
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {score}
            </button>
          ))}
        </div>
        {dayEntry.dieOffScore && (
          <p className="text-sm text-gray-600 mt-2">
            Current score: <span className="font-medium">{dayEntry.dieOffScore}/10</span>
          </p>
        )}
      </div>

      {/* Quick Day Selector */}
      <div className="card-gradient">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Quick Day Select</h3>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => {
            const isCompleted = progress.completedDays.includes(day);
            const isCurrent = day === selectedDay;
            const isToday = day === progress.currentDay;
            
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`aspect-square rounded-lg text-sm font-medium transition-colors relative ${
                  isCurrent
                    ? 'bg-primary-600 text-white'
                    : isCompleted
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {day}
                {isToday && !isCurrent && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CleanseCalendar; 