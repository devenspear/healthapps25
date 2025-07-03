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

## 🆕 2025 Backend Upgrade Overview

The app now runs with a full backend on **Vercel** instead of storing everything in browser-local storage. Key upgrades:

1. **Authentication** – Powered by **Clerk** (username / email / password).
2. **Database** – **Neon Postgres** accessed through Vercel's `@vercel/postgres` helper.
3. **Serverless APIs** – All database logic lives in `/api` functions (e.g. `api/setup-user.ts`).
4. **Environment Isolation** – Each sub-domain (health, crm, etc.) uses its **own** env-var prefix so projects never share a database by accident.

### Required Environment Variables
| Variable | Scope | Purpose |
|----------|-------|---------|
| `REACT_APP_CLERK_PUBLISHABLE_KEY` | Front-end | Public Clerk key (loads the widgets) |
| `CLERK_SECRET_KEY` | Server | Private Clerk key for serverless functions |
| `HEALTH_DATABASE_URL` | Server | Connection string for this project's Neon database <br/> (preferred – keeps isolation) |
| `POSTGRES_URL` | Server | Fallback for local dev or if you don't want a project-specific var |

> ⚠️  **Always set `HEALTH_DATABASE_URL` in Vercel.** The code converts it into `POSTGRES_URL` at runtime so the helper picks it up, preventing accidental reuse of a global database.

### New Project Structure (excerpt)
```
api/
  └─ setup-user.ts      # Serverless function: DB init + user upsert
src/
  lib/
    └─ database.ts      # Shared db helper (server-only)
    └─ auth.tsx         # Front-end auth provider (calls setup-user API)
``` 

### Local Development
1. Create a `.env` file in the project root:
   ```bash
   # Clerk
   REACT_APP_CLERK_PUBLISHABLE_KEY=pk_live_…
   CLERK_SECRET_KEY=sk_live_…

   # Database (use the same value for both vars if you like)
   HEALTH_DATABASE_URL="postgres://…?sslmode=require&connect_timeout=10"
   POSTGRES_URL="$HEALTH_DATABASE_URL"
   ```
2. `npm start` – the dev server proxies `/api/*` to Vercel's serverless runtime automatically.

### Deployment Steps (Vercel)
1. Add the four environment variables above in **Project → Settings → Environment Variables**.
2. Push to `main`; Vercel builds CRA and the `/api` TypeScript functions.
3. First load prints a one-time log:
   ```
   Database env check → { POSTGRES_URL_present: true, HEALTH_DATABASE_URL_present: true, using: 'HEALTH_DATABASE_URL' }
   ```
4. Done – login → DB table auto-creates → user row upserts.

---

### Data Persistence (Updated)
- **Server-side**: All cleanses, journal entries, and biofeedback are stored in Postgres (Neon).
- **Client-side**: The UI caches form state transiently but nothing permanent remains in local storage.
- **API Security**: Every `/api/*` route validates the signed-in user via Clerk before touching the database.

---

**Happy Cleansing! 🌱**

*Remember: This journey is about reclaiming your health. Listen to your body, stay hydrated, and don't hesitate to consult with healthcare professionals.* 