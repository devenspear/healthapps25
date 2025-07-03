import React from 'react';

const PreCleansePrimer: React.FC = () => {
  const sections = [
    {
      title: '🌱 Pre-Cleanse Primer',
      subtitle: '(Everything you need to know before Day 1 — fast, factual, and field-tested)'
    },
    {
      title: 'Traditions & Key Botanicals',
      content: (
        <table className="w-full text-sm text-left border-collapse mb-6">
          <thead>
            <tr>
              <th className="border-b p-2">Tradition</th>
              <th className="border-b p-2">Famous “Parasite Purge”</th>
              <th className="border-b p-2">Key Botanicals</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Ayurveda', 'Panchakarma seasonal detox', 'Triphala, neem, castor oil'],
              ['TCM', '“Gu” syndrome protocols', 'Sweet wormwood, huáng qín'],
              ['Greco-Roman', 'Post-festival de-worming', 'Pumpkin seeds, wormwood wine'],
              ['Amazonian tribes', 'Purge before plant medicine', 'Tobacco tea, ipecac'],
              ['Medieval Europe', 'Spring “worm cures”', 'Violet syrup, mugwort']
            ].map(([t, p, b]) => (
              <tr key={t} className="odd:bg-gray-50 dark:odd:bg-gray-800/30">
                <td className="p-2 border-b">{t}</td>
                <td className="p-2 border-b">{p}</td>
                <td className="p-2 border-b">{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    },
    {
      title: '7-Day Prep Checklist',
      list: [
        'Scrub the diet: pull refined sugars, alcohol, ultra-processed foods',
        'Bitters before meals: dandelion or gentian to wake up bile flow',
        'Light binders: psyllium or activated charcoal (2 h away from meds)',
        'Hydrate hard: 0.75 – 1 oz of water per lb body weight',
        'Load magnesium: 300–400 mg nightly for smooth elimination',
        'Baseline metrics: log HRV, RHR, sleep, VO₂ max (Oura / Apple Watch)',
        'Gear check: Black Walnut, Wormwood, Clove, binders, journal',
        'Intention set: one sentence on why you’re doing this'
      ]
    },
    {
      title: 'What You Might Feel (Anecdotal)',
      list: [
        '🌬️ Lighter digestion, less bloating',
        '⚡ Sharper focus, steadier energy',
        '😴 Deeper sleep architecture (more REM & deep)',
        '✨ Clearer skin, fewer histamine flares',
        '🛡️ Perceived immune “upgrade”'
      ],
      note: 'Individual results vary; scientific evidence is still emerging.'
    },
    {
      title: 'Expert Tips',
      list: [
        'Start workouts 30 % lighter this week — save the PRs for post-cleanse.',
        'Add a liver-support tea (milk thistle + dandelion) each night.',
        'Expect a roller-coaster: “die-off” fatigue is feedback, not failure. Track & tweak.'
      ]
    },
    {
      title: '🚀 Next Step',
      content: <p>Duplicate the Cleanse Calendar, stock your stack, and tap “Day 1” when ready. Your future gut thanks you.</p>
    },
    {
      title: '⚖️ Legal Disclaimer',
      content: <p className="text-sm">This app provides experimental wellness content for informational and entertainment purposes only. It is not medical advice, diagnosis, or treatment. Always consult a qualified health-care professional before acting on any guidance herein. By continuing, you acknowledge sole responsibility for your health decisions and release the creators from all liability to the fullest extent permitted by law.</p>
    }
  ];

  return (
    <div className="p-4 space-y-8">
      {sections.map((sec) => (
        <div key={sec.title} className="card-gradient p-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {sec.title}
          </h2>
          {sec.subtitle && (
            <p className="text-gray-600 dark:text-gray-400 mb-4">{sec.subtitle}</p>
          )}
          {sec.content}
          {sec.list && (
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              {sec.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
          {sec.note && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">{sec.note}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default PreCleansePrimer;
