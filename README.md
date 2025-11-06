# 🎯 Studio Dashboard

A professional admin dashboard for managing studio operations, content creators, campaigns, and system monitoring.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-cyan)
![License](https://img.shields.io/badge/License-Proprietary-red)

## 🚀 Live Demo

**Production URL:** [https://studio-dashboard-pearl.vercel.app](https://studio-dashboard-pearl.vercel.app)

## ✨ Features

### Core Features
- 📊 **Dashboard Overview** - Real-time statistics and analytics
- 💳 **Billing & Subscription** - Payment processing and plan management
- 📈 **System Health Monitor** - 30-day uptime tracking
- 👥 **User Management** - Creator and user administration
- 📺 **Content Management** - Upload system with drag-drop
- 📋 **Request Management** - Approval/rejection workflow
- 🎯 **Campaign Tracker** - Budget and performance monitoring
- ⚙️ **Settings** - Profile, Notifications, Security (3 tabs)
- 🔔 **Notification Center** - Real-time alerts with audio

### Highlights
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Dark theme with neon accents
- ✅ Smooth animations (Framer Motion)
- ✅ TypeScript for type safety
- ✅ Modern UI/UX
- ✅ Production ready

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Smooth animations |
| **Recharts** | Data visualization |
| **React Query** | Server state management |
| **Lucide React** | Modern icon library |

## 📦 Installation

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Setup

1. **Clone the repository**
```bash
   git clone https://github.com/princeflexzy0/studio-dashboard.git
   cd studio-dashboard
```

2. **Install dependencies**
```bash
   npm install
```

3. **Set up environment variables**
```bash
   cp .env.example .env.local
```
   
   Edit `.env.local` with your values:
```env
   NEXT_PUBLIC_API_URL=your_backend_api_url
   DEMO_ADMIN_EMAIL=your_admin_email
   DEMO_ADMIN_PASSWORD=your_secure_password
```

4. **Run development server**
```bash
   npm run dev
```

5. **Open browser**
```
   http://localhost:3000
```

## 🏗 Project Structure
```
studio-dashboard/
├── src/
│   ├── app/                  # Next.js app router
│   │   ├── dashboard/        # Dashboard pages
│   │   │   ├── page.tsx      # Overview
│   │   │   ├── billing/      # Billing & subscription
│   │   │   ├── campaigns/    # Campaign tracker
│   │   │   ├── creators/     # User management
│   │   │   ├── requests/     # Request approval
│   │   │   ├── settings/     # Settings (3 tabs)
│   │   │   ├── system/       # System health
│   │   │   └── uploads/      # Upload management
│   │   ├── login/            # Authentication
│   │   └── layout.tsx        # Root layout
│   ├── components/           # Reusable components
│   │   ├── dashboard/        # Dashboard-specific
│   │   └── NotificationBell.tsx
│   ├── contexts/             # React contexts
│   │   └── AuthContext.tsx   # Auth state
│   ├── services/             # API services
│   │   └── dashboard.service.ts
│   └── lib/                  # Utilities
├── public/
│   └── api/                  # Mock API data (development)
├── docs/                     # Documentation
│   └── CLIENT_HANDOVER.md    # Client documentation
└── package.json
```

## 🔄 API Integration

Currently using mock data from `/public/api/` for demonstration.

### To Connect Your Backend:

1. **Set API URL**
```env
   NEXT_PUBLIC_API_URL=https://your-api.com
```

2. **Update Service Layer**
   Edit `src/services/dashboard.service.ts` to point to your endpoints.

3. **Expected Endpoints**
```
   GET  /api/studio/overview      - Dashboard stats
   GET  /api/admin/users          - Users list
   GET  /api/admin/campaigns      - Campaigns
   GET  /api/uploads              - Uploads
   GET  /api/studio/requests      - Requests
   GET  /api/system/health        - System health
   POST /api/studio/request/:id/action - Approve/reject
```

4. **Response Format**
   Check mock JSON files in `/public/api/` for expected response structure.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
```bash
   git push origin main
```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Configure environment variables
   - Deploy

3. **Auto-Deploy**
   - Vercel automatically deploys on push to main branch

### Manual Deployment
```bash
npm run build
npm start
```

Deploy the `.next` folder to your hosting provider.

## 📱 Browser Support

| Browser | Version |
|---------|---------|
| Chrome | 120+ |
| Firefox | 120+ |
| Safari | 17+ |
| Edge | 120+ |
| Mobile Safari | iOS 15+ |
| Chrome Mobile | Android 12+ |

## 🔒 Security

⚠️ **Important Security Notes:**

- Demo authentication is for **development only**
- Implement proper authentication in production (OAuth, JWT)
- Store credentials in environment variables (never commit)
- Use HTTPS in production
- Implement rate limiting
- Add CSRF protection
- Sanitize all user inputs
- Regular security audits

## 📝 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### Code Style

- TypeScript strict mode enabled
- ESLint for code quality
- Prettier for formatting
- Conventional commits

## 📄 License

**Proprietary** - All rights reserved

This software is proprietary and confidential. Unauthorized copying, modification, distribution, or use of this software, via any medium, is strictly prohibited.

## 📞 Support

For issues, questions, or feature requests:
- Create an issue in the repository
- Contact the development team

## 🙏 Acknowledgments

Built with modern web technologies:
- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Recharts](https://recharts.org/)

---

**Built with ❤️ for professional studio management**

📅 Last Updated: November 6, 2025
