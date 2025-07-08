# Paratox - 28-Day Parasite Cleanse Tracker

A modern, professional health tracking application for guided parasite cleanse protocols. Built with React, TypeScript, and Tailwind CSS.

## 🎨 Recent Updates (v2.0)

### Visual Design Overhaul
- **Purple Radial Background**: Beautiful gradient from light purple (center) to dark purple (edges)
- **Glassmorphism Headers**: Modern frosted glass effect for all page headers with backdrop blur
- **Consistent Branding**: "Paratox" branding throughout with professional white typography
- **Responsive Layout**: Optimized for mobile-first design with centered content column

### Authentication & User Experience
- **Development Mode**: Smart localhost detection with mock authentication for testing
- **Clerk Integration**: Production-ready authentication with user profiles
- **Personalized Welcome**: Headers use actual user first names from Clerk
- **Clickable Logo**: Paratox header returns users to start page
- **Perfectly Centered**: Header logo stays centered regardless of other elements

### App Structure
- **StartPage**: Clean landing page with consistent styling and working navigation
- **Dashboard**: Personalized welcome with user data and progress tracking
- **Calendar**: Day-by-day protocol tracking with glassmorphism header
- **Supplements**: Complete supplement guide and search functionality
- **Biofeedback**: Physiological and subjective metrics tracking
- **Journal**: Daily reflection and meal logging
- **Post-Cleanse**: Integration and rebuilding protocols

### Technical Features
- **Database Persistence**: Vercel Postgres integration for user data
- **Progress Tracking**: Real-time day counting and completion status
- **Mock Development**: Local development with bypass authentication
- **Cross-browser Support**: Safari-compatible backdrop filters
- **Responsive Design**: Mobile-optimized with proper spacing

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm start

# App will open at http://localhost:3000
# Authentication is bypassed for local development
```

### Environment Variables

#### Development (.env.local)
```bash
# Local development uses mock authentication
# No environment variables needed
```

#### Production (Vercel)
```bash
REACT_APP_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
HEALTH_DATABASE_URL=postgresql://...
```

## 🏗️ Architecture

### Authentication Flow
- **Development**: Mock authentication with localhost detection
- **Production**: Clerk authentication with user profiles and database sync

### Database Schema
- `users`: User profiles and metadata
- `user_progress`: Daily progress and completion tracking
- `biofeedback_entries`: Physiological and subjective metrics
- `journal_entries`: Daily reflections and meal logs
- `day_entries`: Protocol tasks and die-off scores

### Component Structure
```
src/
├── components/
│   ├── AuthGuard.tsx          # Authentication wrapper
│   ├── Dashboard.tsx          # Main dashboard with progress
│   ├── CleanseCalendar.tsx    # Day-by-day protocol
│   ├── SupplementStack.tsx    # Supplement guide
│   ├── BiofeedbackTracker.tsx # Metrics tracking
│   ├── CleanseJournal.tsx     # Daily journaling
│   ├── PostCleanseIntegration.tsx # Rebuilding phase
│   ├── Layout.tsx             # App layout and navigation
│   └── StartPage.tsx          # Landing page
├── lib/
│   ├── auth.tsx               # Authentication logic
│   ├── api.ts                 # API client functions
│   └── database.ts            # Database utilities
├── data/
│   ├── cleanseCalendar.ts     # 28-day protocol data
│   └── supplements.ts         # Supplement information
└── types/
    └── index.ts               # TypeScript definitions
```

## 🎯 Key Features

### Progress Tracking
- 28-day protocol calendar
- Daily task completion
- Die-off symptom scoring
- Overall progress visualization

### Biofeedback Monitoring
- HRV, resting heart rate, temperature delta
- VO₂ max, active calories, sleep metrics
- Subjective scoring (mood, energy, brain fog, libido)
- Notes and observations

### Daily Journaling
- Physical, emotional, cognitive, spiritual reflections
- Die-off symptom logging and mitigation strategies
- Meal tracking with detailed food logs
- Date-based entry management

### Supplement Guidance
- Complete supplement protocols by phase
- Search and filtering capabilities
- Dosage and timing instructions
- Phase-specific recommendations

## 🚀 Deployment

### Vercel Deployment
1. Connect GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Domain Setup
- Production: `paratox.health`
- Clerk authentication domain: `accounts.paratox.health`
- Custom domain configuration with GoDaddy DNS

## 🛠️ Development Workflow

### Local Testing
- Mock authentication automatically enabled on localhost
- All features work without database connection
- Real-time preview of design changes

### Production Testing
- Full Clerk authentication flow
- Database persistence and sync
- User profile integration

## 📱 Mobile Optimization

- Mobile-first responsive design
- Touch-friendly interface elements
- Optimized spacing and typography
- Progressive Web App capabilities

## 🔒 Security

- Clerk authentication with production keys
- Database connection encryption
- Environment variable protection
- CORS and security headers

## 📈 Future Enhancements

- Push notifications for protocol reminders
- Advanced analytics and trend visualization
- Integration with wearable devices
- Community features and progress sharing
- Practitioner dashboard for monitoring clients

## 🤝 Contributing

This is a private health tracking application. For feature requests or bug reports, please contact the development team.

## 📄 License

Private proprietary software. All rights reserved.

---

**Built with ❤️ for optimal health and wellness tracking** Small test change made on 2025-07-07 at 22:07:22
