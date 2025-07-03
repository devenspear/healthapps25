import React, { useState } from 'react';
import { UserProgress, JournalEntry, MealEntry } from '../types';
import { Save, Calendar, Plus, Trash2, BookOpen } from 'lucide-react';
import { format } from 'date-fns';

interface CleanseJournalProps {
  progress: UserProgress;
  updateProgress: (progress: Partial<UserProgress>) => void;
}

const CleanseJournal: React.FC<CleanseJournalProps> = ({ progress, updateProgress }) => {
  const today = format(new Date(), 'yyyy-MM-dd');
  const [selectedDate, setSelectedDate] = useState(today);
  
  const currentEntry = progress.journalEntries[selectedDate] || {
    date: selectedDate,
    physical: '',
    emotional: '',
    cognitive: '',
    spiritual: '',
    dieOffSymptoms: '',
    dieOffIntensity: undefined,
    dieOffMitigation: '',
    meals: [
      { meal: 'Breakfast', foods: '', notes: '' },
      { meal: 'Lunch', foods: '', notes: '' },
      { meal: 'Dinner', foods: '', notes: '' },
      { meal: 'Snacks', foods: '', notes: '' }
    ]
  };

  const [formData, setFormData] = useState<JournalEntry>(currentEntry);

  const updateFormData = (field: keyof JournalEntry, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateMeal = (index: number, field: keyof MealEntry, value: string) => {
    const updatedMeals = [...formData.meals];
    updatedMeals[index] = { ...updatedMeals[index], [field]: value };
    updateFormData('meals', updatedMeals);
  };

  const addMeal = () => {
    updateFormData('meals', [...formData.meals, { meal: '', foods: '', notes: '' }]);
  };

  const removeMeal = (index: number) => {
    const updatedMeals = formData.meals.filter((_, i) => i !== index);
    updateFormData('meals', updatedMeals);
  };

  const handleSave = () => {
    updateProgress({
      journalEntries: {
        ...progress.journalEntries,
        [selectedDate]: { ...formData, date: selectedDate }
      }
    });
    alert('Journal entry saved successfully!');
  };

  const reflectionSections = [
    { 
      key: 'physical', 
      label: 'Physical', 
      placeholder: 'Describe any physical symptoms, sensations, or changes you noticed today...',
      icon: '🏃‍♂️'
    },
    { 
      key: 'emotional', 
      label: 'Emotional', 
      placeholder: 'How did you feel emotionally today? Any mood highlights or challenges?',
      icon: '❤️'
    },
    { 
      key: 'cognitive', 
      label: 'Cognitive', 
      placeholder: 'Describe your mental clarity, focus, and cognitive function today...',
      icon: '🧠'
    },
    { 
      key: 'spiritual', 
      label: 'Intuitive / Spiritual', 
      placeholder: 'Any insights, dreams, meditative experiences, or spiritual observations?',
      icon: '✨'
    }
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          📖 Cleanse Journal
        </h2>
        <p className="text-gray-600">
          Reflect on your daily experience and track your journey
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
             const existingEntry = progress.journalEntries[e.target.value];
             setFormData(existingEntry || {
               date: e.target.value,
               physical: '',
               emotional: '',
               cognitive: '',
               spiritual: '',
               dieOffSymptoms: '',
               dieOffIntensity: undefined,
               dieOffMitigation: '',
               meals: [
                 { meal: 'Breakfast', foods: '', notes: '' },
                 { meal: 'Lunch', foods: '', notes: '' },
                 { meal: 'Dinner', foods: '', notes: '' },
                 { meal: 'Snacks', foods: '', notes: '' }
               ]
             });
           }}
           className="input-field"
           aria-label="Select date for journal entry"
         />
      </div>

      {/* Reflection Sections */}
      {reflectionSections.map((section) => (
        <div key={section.key} className="card">
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-xl">{section.icon}</span>
            <h3 className="text-lg font-semibold text-gray-900">{section.label}</h3>
          </div>
          <textarea
            value={(formData as any)[section.key] || ''}
            onChange={(e) => updateFormData(section.key as keyof JournalEntry, e.target.value)}
            className="input-field h-24 resize-none"
            placeholder={section.placeholder}
          />
        </div>
      ))}

      {/* Die-Off Log */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          🦠 Die-Off Log
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Symptoms
            </label>
            <textarea
              value={formData.dieOffSymptoms}
              onChange={(e) => updateFormData('dieOffSymptoms', e.target.value)}
              className="input-field h-20 resize-none"
              placeholder="Describe any die-off symptoms you experienced..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Intensity (1-10)
            </label>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                <button
                  key={score}
                  onClick={() => updateFormData('dieOffIntensity', score)}
                  className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    formData.dieOffIntensity === score
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {score}
                </button>
              ))}
            </div>
            {formData.dieOffIntensity && (
              <p className="text-xs text-gray-600 mt-1">
                Current intensity: {formData.dieOffIntensity}/10
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mitigation Steps
            </label>
            <textarea
              value={formData.dieOffMitigation}
              onChange={(e) => updateFormData('dieOffMitigation', e.target.value)}
              className="input-field h-20 resize-none"
              placeholder="What did you do to manage symptoms? (rest, hydration, etc.)"
            />
          </div>
        </div>
      </div>

      {/* Food Intake */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            🍽️ Food Intake
          </h3>
          <button
            onClick={addMeal}
            className="btn-secondary text-sm flex items-center space-x-1"
          >
            <Plus className="h-4 w-4" />
            <span>Add Meal</span>
          </button>
        </div>

        <div className="space-y-4">
          {formData.meals.map((meal, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <input
                  type="text"
                  value={meal.meal}
                  onChange={(e) => updateMeal(index, 'meal', e.target.value)}
                  className="input-field flex-1 mr-2"
                  placeholder="Meal name (e.g., Breakfast)"
                />
                {index >= 4 && (
                  <button
                    onClick={() => removeMeal(index)}
                    className="text-red-600 hover:text-red-800"
                    aria-label="Remove meal"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Foods
                  </label>
                  <textarea
                    value={meal.foods}
                    onChange={(e) => updateMeal(index, 'foods', e.target.value)}
                    className="input-field h-16 resize-none"
                    placeholder="List the foods you ate..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    value={meal.notes}
                    onChange={(e) => updateMeal(index, 'notes', e.target.value)}
                    className="input-field h-16 resize-none"
                    placeholder="Any notes about the meal, digestion, etc..."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="card">
        <button
          onClick={handleSave}
          className="btn-primary w-full flex items-center justify-center space-x-2"
        >
          <Save className="h-5 w-5" />
          <span>Save Journal Entry</span>
        </button>
      </div>

      {/* Entry Count */}
      {Object.keys(progress.journalEntries).length > 0 && (
        <div className="card">
          <div className="flex items-center space-x-3 mb-2">
            <BookOpen className="h-5 w-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Your Journal</h3>
          </div>
          <p className="text-sm text-gray-600">
            You've completed {Object.keys(progress.journalEntries).length} journal entr{Object.keys(progress.journalEntries).length === 1 ? 'y' : 'ies'}. 
            Regular reflection helps track your progress and identify patterns.
          </p>
        </div>
      )}
    </div>
  );
};

export default CleanseJournal; 