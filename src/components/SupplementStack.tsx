import React, { useState } from 'react';
import { supplements } from '../data/supplements';
import { Search, Clock, Target, Package } from 'lucide-react';

const SupplementStack: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPhase, setSelectedPhase] = useState('all');

  const filteredSupplements = supplements.filter(supplement => {
    const matchesSearch = supplement.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplement.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPhase = selectedPhase === 'all' || supplement.phase.includes(selectedPhase);
    
    return matchesSearch && matchesPhase;
  });

  const phases = ['all', '1–21', '8–21', '1–28', '22–28'];

  const getPhaseColor = (phase: string) => {
    if (phase.includes('1–21')) return 'bg-red-100 text-red-800';
    if (phase.includes('8–21')) return 'bg-orange-100 text-orange-800';
    if (phase.includes('22–28')) return 'bg-green-100 text-green-800';
    if (phase.includes('1–28')) return 'bg-blue-100 text-blue-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          💊 Supplement Stack
        </h2>
        <p className="text-gray-600">
          Complete guide to your parasite cleanse supplements
        </p>
      </div>

      {/* Search and Filter */}
      <div className="card space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search supplements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {phases.map((phase) => (
            <button
              key={phase}
              onClick={() => setSelectedPhase(phase)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedPhase === phase
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {phase === 'all' ? 'All Phases' : `Days ${phase}`}
            </button>
          ))}
        </div>
      </div>

      {/* Supplements Grid */}
      <div className="space-y-4">
        {filteredSupplements.map((supplement, index) => (
          <div key={index} className="card">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">
                {supplement.name}
              </h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPhaseColor(supplement.phase)}`}>
                Days {supplement.phase}
              </span>
            </div>
            
            <p className="text-gray-600 mb-4">{supplement.purpose}</p>
            
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center space-x-3">
                <Package className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Dosage</p>
                  <p className="text-sm text-gray-600">{supplement.dosage}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Timing</p>
                  <p className="text-sm text-gray-600">{supplement.timing}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Target className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Brand</p>
                  <p className="text-sm text-gray-600">{supplement.brand}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSupplements.length === 0 && (
        <div className="card text-center">
          <p className="text-gray-600">No supplements found matching your criteria.</p>
        </div>
      )}

      {/* Important Notes */}
      <div className="card bg-yellow-50 border-yellow-200">
        <h3 className="text-lg font-semibold text-yellow-900 mb-2">
          ⚠️ Important Notes
        </h3>
        <ul className="text-sm text-yellow-800 space-y-1">
          <li>• Always take supplements as directed</li>
          <li>• Start with lower doses and increase gradually</li>
          <li>• Take on empty stomach when specified</li>
          <li>• Consult healthcare provider if you have concerns</li>
          <li>• Stay hydrated throughout the cleanse</li>
        </ul>
      </div>
    </div>
  );
};

export default SupplementStack; 