import React from 'react';
import { Target, Heart, Utensils, Beaker, Calendar, CheckCircle } from 'lucide-react';

const PostCleanseIntegration: React.FC = () => {
  const rebuildingPhases = [
    {
      title: "Terrain Rebuilding (Days 22–28)",
      icon: Target,
      color: "text-green-600",
      items: [
        "L‑Glutamine — 5 g nightly",
        "Collagen Peptides — 20 g daily",
        "Omega‑3 DHA/EPA — 2 g daily"
      ]
    },
    {
      title: "Gut Lining Protocol",
      icon: Heart,
      color: "text-red-600",
      items: [
        "24‑h bone broth fast (Day 24)",
        "Slippery Elm tea ×2 daily for 7 days"
      ]
    },
    {
      title: "Food Reintroduction",
      icon: Utensils,
      color: "text-orange-600",
      items: [
        "Day 25: lightly‑cooked veg & steamed fish",
        "Day 26–27: add low‑glycemic fruits & fermented foods",
        "Day 28: evaluate tolerance; resume normal diet gradually"
      ]
    },
    {
      title: "Probiotic Regimen",
      icon: Beaker,
      color: "text-purple-600",
      items: [
        "Spore‑based probiotic — 1 cap breakfast ×30 days",
        "Rotate strains monthly thereafter"
      ]
    }
  ];

  const longTermIntegration = [
    {
      category: "Monthly Maintenance",
      recommendations: [
        "Consider quarterly mini-cleanses (7-day protocols)",
        "Regular probiotic cycling with different strains",
        "Continue omega-3 and glutamine supplementation",
        "Monthly 24-hour bone broth fasts"
      ]
    },
    {
      category: "Lifestyle Integration",
      recommendations: [
        "Maintain anti-inflammatory diet principles",
        "Continue tracking biofeedback metrics",
        "Regular sauna or heat therapy sessions",
        "Stress management and meditation practices"
      ]
    },
    {
      category: "Warning Signs to Watch",
      recommendations: [
        "Return of brain fog or fatigue",
        "Digestive issues or bloating",
        "Skin problems or rashes",
        "Mood changes or irritability"
      ]
    }
  ];

  const successMetrics = [
    "Improved energy levels",
    "Better sleep quality",
    "Enhanced mental clarity",
    "Optimized digestion",
    "Stable mood",
    "Healthy skin"
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          ⚙️ Post-Cleanse Integration
        </h2>
        <p className="text-gray-600">
          Your comprehensive guide for the rebuilding phase and beyond
        </p>
      </div>

      {/* Rebuilding Phases */}
      <div className="space-y-4">
        {rebuildingPhases.map((phase, index) => {
          const Icon = phase.icon;
          return (
            <div key={index} className="card">
              <div className="flex items-center space-x-3 mb-4">
                <Icon className={`h-6 w-6 ${phase.color}`} />
                <h3 className="text-lg font-semibold text-gray-900">{phase.title}</h3>
              </div>
              <ul className="space-y-2">
                {phase.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Timeline */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-4">
          <Calendar className="h-6 w-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Integration Timeline</h3>
        </div>
        <div className="space-y-4">
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-medium text-gray-900">Days 22-24: Initial Repair</h4>
            <p className="text-sm text-gray-600">Begin gut repair supplements and bone broth fast</p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-medium text-gray-900">Days 25-27: Food Reintroduction</h4>
            <p className="text-sm text-gray-600">Gradually reintroduce foods while monitoring tolerance</p>
          </div>
          <div className="border-l-4 border-purple-500 pl-4">
            <h4 className="font-medium text-gray-900">Day 28+: Long-term Integration</h4>
            <p className="text-sm text-gray-600">Establish sustainable practices for ongoing gut health</p>
          </div>
        </div>
      </div>

      {/* Success Metrics */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          🎯 Success Metrics to Track
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {successMetrics.map((metric, index) => (
            <div key={index} className="flex items-center space-x-2 p-2 bg-green-50 rounded-lg">
              <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
              <span className="text-sm text-green-800">{metric}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Long-term Integration */}
      <div className="space-y-4">
        {longTermIntegration.map((section, index) => (
          <div key={index} className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {section.category}
            </h3>
            <ul className="space-y-2">
              {section.recommendations.map((rec, recIndex) => (
                <li key={recIndex} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Important Reminders */}
      <div className="card bg-blue-50 border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          💡 Important Reminders
        </h3>
        <div className="space-y-2 text-sm text-blue-800">
          <p>• Listen to your body during the reintroduction phase</p>
          <p>• Keep a food diary to identify any sensitivities</p>
          <p>• Continue tracking your biofeedback metrics</p>
          <p>• Consult with a healthcare provider for personalized guidance</p>
          <p>• Remember that healing is a gradual process</p>
        </div>
      </div>

      {/* Emergency Protocol */}
      <div className="card bg-yellow-50 border-yellow-200">
        <h3 className="text-lg font-semibold text-yellow-900 mb-3">
          ⚠️ If Symptoms Return
        </h3>
        <div className="space-y-2 text-sm text-yellow-800">
          <p>1. Return to the anti-parasitic protocol for 7-10 days</p>
          <p>2. Increase probiotic and gut-healing supplements</p>
          <p>3. Consider food sensitivity testing</p>
          <p>4. Evaluate stress levels and sleep quality</p>
          <p>5. Consult with a functional medicine practitioner</p>
        </div>
      </div>
    </div>
  );
};

export default PostCleanseIntegration; 