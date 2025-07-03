import React, { useState } from 'react';
import { UserProgress, BiofeedbackEntry } from '../types';
import { Save, Calendar, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';

interface BiofeedbackTrackerProps {
  progress: UserProgress;
  updateProgress: (progress: Partial<UserProgress>) => void;
}

const BiofeedbackTracker: React.FC<BiofeedbackTrackerProps> = ({ progress, updateProgress }) => {
  const today = format(new Date(), 'yyyy-MM-dd');
  const [selectedDate, setSelectedDate] = useState(today);
  
  const currentEntry = progress.biofeedbackEntries[selectedDate] || {
    date: selectedDate,
    hrv: undefined,
    restingHR: undefined,
    tempDelta: undefined,
    vo2Max: undefined,
    activeCals: undefined,
    deepSleep: undefined,
    remSleep: undefined,
    brainFog: undefined,
    mood: undefined,
    libido: undefined,
    energy: undefined,
    notes: ''
  };

  const [formData, setFormData] = useState<BiofeedbackEntry>(currentEntry);

  const updateFormData = (field: keyof BiofeedbackEntry, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value === '' ? undefined : value
    }));
  };

  const handleSave = () => {
    updateProgress({
      biofeedbackEntries: {
        ...progress.biofeedbackEntries,
        [selectedDate]: { ...formData, date: selectedDate }
      }
    });
    alert('Biofeedback data saved successfully!');
  };

  const physiologicalMetrics = [
    { key: 'hrv', label: 'HRV (ms)', type: 'number', min: 0, max: 200 },
    { key: 'restingHR', label: 'Resting HR (bpm)', type: 'number', min: 40, max: 120 },
    { key: 'tempDelta', label: 'Temp Δ (°F)', type: 'number', step: 0.1, min: -5, max: 5 },
    { key: 'vo2Max', label: 'VO₂ Max', type: 'number', min: 20, max: 80 },
    { key: 'activeCals', label: 'Active Calories', type: 'number', min: 0, max: 5000 },
    { key: 'deepSleep', label: 'Deep Sleep (h)', type: 'number', step: 0.1, min: 0, max: 12 },
    { key: 'remSleep', label: 'REM Sleep (h)', type: 'number', step: 0.1, min: 0, max: 12 }
  ];

  const subjectiveMetrics = [
    { key: 'brainFog', label: 'Brain Fog', description: '(1 = clear, 10 = foggy)' },
    { key: 'mood', label: 'Mood', description: '(1 = poor, 10 = excellent)' },
    { key: 'libido', label: 'Libido', description: '(1 = low, 10 = high)' },
    { key: 'energy', label: 'Energy', description: '(1 = tired, 10 = energetic)' }
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          📈 Biofeedback Tracker
        </h2>
        <p className="text-gray-600">
          Track your physiological and subjective metrics
        </p>
      </div>

      {/* Date Selection */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-4">
          <Calendar className="h-5 w-5 text-primary-600" />
          <h3 className="text-lg font-semibold text-gray-900">Select Date</h3>
        </div>
                 <input
           type="date"
           value={selectedDate}
           onChange={(e) => {
             setSelectedDate(e.target.value);
             const existingEntry = progress.biofeedbackEntries[e.target.value];
             setFormData(existingEntry || { 
               date: e.target.value,
               hrv: undefined,
               restingHR: undefined,
               tempDelta: undefined,
               vo2Max: undefined,
               activeCals: undefined,
               deepSleep: undefined,
               remSleep: undefined,
               brainFog: undefined,
               mood: undefined,
               libido: undefined,
               energy: undefined,
               notes: ''
             });
           }}
           className="input-field"
           aria-label="Select date for biofeedback entry"
         />
      </div>

      {/* Physiological Metrics */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Physiological Metrics</h3>
        <div className="space-y-4">
          {physiologicalMetrics.map((metric) => (
            <div key={metric.key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {metric.label}
              </label>
              <input
                type={metric.type}
                step={metric.step}
                min={metric.min}
                max={metric.max}
                value={(formData as any)[metric.key] || ''}
                onChange={(e) => updateFormData(metric.key as keyof BiofeedbackEntry, 
                  metric.type === 'number' ? parseFloat(e.target.value) : e.target.value)}
                className="input-field"
                placeholder="Enter value"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Subjective Metrics */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Subjective Metrics (1-10)</h3>
        <div className="space-y-6">
          {subjectiveMetrics.map((metric) => (
            <div key={metric.key}>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700">
                  {metric.label}
                </label>
                <span className="text-xs text-gray-500">{metric.description}</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                  <button
                    key={score}
                    onClick={() => updateFormData(metric.key as keyof BiofeedbackEntry, score)}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      (formData as any)[metric.key] === score
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {score}
                  </button>
                ))}
              </div>
              {(formData as any)[metric.key] && (
                <p className="text-xs text-gray-600 mt-1">
                  Current: {(formData as any)[metric.key]}/10
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="card">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Notes
        </label>
        <textarea
          value={formData.notes || ''}
          onChange={(e) => updateFormData('notes', e.target.value)}
          className="input-field h-24 resize-none"
          placeholder="Any additional observations, symptoms, or notes..."
        />
      </div>

      {/* Save Button */}
      <div className="card">
        <button
          onClick={handleSave}
          className="btn-primary w-full flex items-center justify-center space-x-2"
        >
          <Save className="h-5 w-5" />
          <span>Save Biofeedback Data</span>
        </button>
      </div>

      {/* Quick Stats */}
      {Object.keys(progress.biofeedbackEntries).length > 0 && (
        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Your Progress</h3>
          </div>
          <p className="text-sm text-gray-600">
            You've logged biofeedback data for {Object.keys(progress.biofeedbackEntries).length} day(s).
            Keep tracking to identify patterns and improvements!
          </p>
        </div>
      )}
    </div>
  );
};

export default BiofeedbackTracker; 