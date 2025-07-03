# 🧠 Biohacker Parasite Cleanse HQ

A modern, professional web-based mobile application for tracking your 28-day parasite cleanse journey. Built with React, TypeScript, and Tailwind CSS.

## 🌟 Features

### 📱 Mobile-First Design
- Responsive interface optimized for smartphones
- Clean, professional UI with intuitive navigation
- Progressive Web App capabilities

### 🗓️ 28-Day Cleanse Calendar
- Daily task tracking with progress visualization
- Phase-based protocol (Priming → Kill Phase 1 → Kill Phase 2 → Rebuild)
- Die-off symptom scoring (1-10 scale)
- Visual progress indicators

### 💊 Comprehensive Supplement Stack
- Complete database of cleanse supplements
- Searchable and filterable by phase
- Detailed dosage, timing, and brand information
- Phase-specific color coding

### 📈 Biofeedback Tracker
- Physiological metrics: HRV, heart rate, sleep, temperature
- Subjective assessments: mood, energy, brain fog, libido
- Historical data visualization
- Notes and observations

### 📖 Daily Journal
- Structured reflection templates
- Physical, emotional, cognitive, and spiritual tracking
- Die-off symptom logging with intensity scoring
- Meal tracking with notes
- Progress insights

### ⚙️ Post-Cleanse Integration
- Comprehensive rebuilding protocol
- Food reintroduction guidelines
- Long-term maintenance strategies
- Warning signs and emergency protocols

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd biohacker-parasite-cleanse-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 📱 Usage Guide

### Getting Started
1. **Dashboard**: Overview of your progress and quick actions
2. **Calendar**: Navigate through your 28-day protocol
3. **Supplements**: Reference guide for all cleanse supplements
4. **Biofeedback**: Log daily health metrics
5. **Journal**: Reflect on your daily experience
6. **Post-Cleanse**: Integration and rebuilding guidance

### Data Persistence
- All data is stored locally in your browser
- Progress automatically saves as you use the app
- No account creation required

### Daily Workflow
1. Check Dashboard for today's phase and quick stats
2. Complete daily tasks in the Calendar
3. Rate die-off symptoms (1-10 scale)
4. Log biofeedback metrics
5. Write journal reflections
6. Track meals and observations

## 🏗️ Technical Architecture

### Built With
- **React 18** - Modern UI framework
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons
- **date-fns** - Date manipulation

### Key Features
- **Local Storage**: All data persists in browser
- **Responsive Design**: Mobile-first approach
- **Type Safety**: Full TypeScript implementation
- **Performance**: Optimized React components
- **Accessibility**: ARIA labels and semantic HTML

### Project Structure
```
src/
├── components/          # React components
├── data/               # Static data (supplements, calendar)
├── hooks/              # Custom React hooks
├── types/              # TypeScript interfaces
├── App.tsx             # Main app component
├── index.tsx           # Entry point
└── index.css           # Global styles
```

## 🔧 Customization

### Adding Supplements
Edit `src/data/supplements.ts` to modify the supplement database.

### Modifying Phases
Update `src/data/cleanseCalendar.ts` to adjust the 28-day protocol.

### Styling Changes
Modify `tailwind.config.js` for design system changes or edit component styles directly.

### Adding Features
Follow the existing patterns in the components directory for new functionality.

## ⚠️ Important Notes

### Medical Disclaimer
This application is for informational and tracking purposes only. Always consult with a qualified healthcare provider before starting any cleanse or supplement protocol.

### Data Privacy
- All data is stored locally in your browser
- No personal information is transmitted to external servers
- Clear browser data will reset your progress

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- JavaScript must be enabled
- Local storage must be available

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is for educational and personal use. Please consult healthcare professionals for medical advice.

## 🆘 Support

For technical issues:
1. Check browser console for errors
2. Ensure JavaScript and local storage are enabled
3. Try clearing browser cache and reloading
4. Use the latest version of a supported browser

## 🔮 Future Enhancements

- Export data functionality
- Trend analysis and charts
- Reminder notifications
- Integration with health devices
- Social sharing features
- Multi-language support

---

**Happy Cleansing! 🌱**

*Remember: This journey is about reclaiming your health. Listen to your body, stay hydrated, and don't hesitate to consult with healthcare professionals.* 