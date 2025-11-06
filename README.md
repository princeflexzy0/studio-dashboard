# 🎯 Studio Dashboard

Professional admin dashboard for managing studio operations, content creators, campaigns, and system monitoring.

## 🚀 Live Demo

**Production URL:** [https://studio-dashboard-pearl.vercel.app](https://studio-dashboard-pearl.vercel.app)

## 🔐 Login Credentials

### Admin Access (Full Permissions)
- **Email:** `admin@studio.com`
- **Password:** `Studio@2025`
- **Access:** All features including billing, system health, user management

### Studio Manager Access
- **Email:** `studio@manager.com`
- **Password:** `Manager@2025`
- **Access:** Content management, campaigns, requests approval

### Creator Access
- **Email:** `creator@studio.com`
- **Password:** `Creator@2025`
- **Access:** Upload content, view own statistics

---

## ✨ Features

### 📊 Dashboard Overview
- Real-time statistics (uploads, requests, revenue)
- Recent activity feed with user actions
- Revenue trend chart (5-day performance)
- Quick action buttons for common tasks

### 💳 Billing & Subscription
- Current plan overview with next billing date
- Credit usage tracker with visual progress bar
- Low credit warnings (>80% usage)
- 3 subscription tiers (Starter, Professional, Enterprise)
- Transaction history with export functionality
- Monthly spending analytics

### 📈 System Health Monitor
- Overall system status dashboard
- 30-day uptime performance chart
- Individual service monitoring (API, Database, CDN, Queue)
- Response time tracking
- Mobile-optimized charts

### 👥 User Management
- Creator/user list with search and filters
- Role-based access control
- User statistics and activity tracking

### 📺 Content Management
- Upload system with drag-drop support
- Video library with preview thumbnails
- File validation (mp4/webm, max 200MB)
- Upload progress tracking

### 📋 Request Management
- Approval/rejection workflow
- Status tracking (Pending, Approved, Rejected)
- Real-time notifications

### 🎯 Campaign Tracker
- Active campaign monitoring
- Budget tracking and spending analysis
- Performance metrics (impressions, clicks)
- Campaign status management

### ⚙️ Settings
**Profile Tab:**
- Edit personal information (name, email, phone, location)
- Bio/description
- Profile avatar management

**Notifications Tab:**
- Email notifications toggle
- Push notifications toggle
- Activity alerts (uploads, requests, campaigns)
- Weekly report subscription

**Security Tab:**
- Password change with current password verification
- Two-factor authentication (2FA) toggle
- Password visibility controls

### 🔔 Notifications
- Real-time notification bell with badge counter
- Audio notification sound on new alerts
- Mark as read/unread functionality
- Clear individual or all notifications
- Notification types: Success, Warning, Info

---

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Charts:** Recharts
- **Icons:** Lucide React
- **State Management:** React Query
- **Notifications:** React Hot Toast

---

## 📦 Project Structure
```
/src
├── /app
│   ├── /dashboard
│   │   ├── page.tsx              # Dashboard overview
│   │   ├── /billing              # Billing & subscription
│   │   ├── /campaigns            # Campaign tracker
│   │   ├── /creators             # User management
│   │   ├── /requests             # Request approval
│   │   ├── /settings             # Settings (3 tabs)
│   │   ├── /system               # System health
│   │   └── /uploads              # Upload management
│   └── /login                    # Login page
├── /components
│   ├── /dashboard                # Dashboard components
│   └── NotificationBell.tsx      # Notification system
├── /contexts
│   └── AuthContext.tsx           # Authentication
└── /services
    └── dashboard.service.ts      # API service layer
```

---

## 🎨 Key Highlights

✅ **Fully Responsive** - Works seamlessly on mobile, tablet, and desktop
✅ **Dark Theme** - Modern dark UI with neon accents
✅ **Real-time Updates** - Live data with 30-second refresh intervals
✅ **Professional Animations** - Smooth transitions and micro-interactions
✅ **Role-Based Access** - Different permissions for Admin, Manager, Creator
✅ **Dummy Data Ready** - Pre-populated with realistic test data
✅ **Backend Ready** - Structured for easy API integration

---

## 🔄 API Integration

Currently using dummy data from `/public/api/` folder. To connect to backend:

1. Set `NEXT_PUBLIC_API_URL` in `.env.local`
2. Update `src/services/dashboard.service.ts` to use real endpoints
3. All dummy JSON files map to expected backend response formats

---

## 🚀 Deployment

**Platform:** Vercel
**Auto-deploy:** Enabled on main branch push
**Build Status:** ✅ Passing

---

## 📞 Support

For issues or questions about the dashboard, please contact the development team.

---

## 📄 License

Proprietary - All rights reserved

---

Built with ❤️ for professional studio management
