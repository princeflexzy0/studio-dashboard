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
- 30-day uptime performance chart (mobile-optimized)
- Individual service monitoring (API, Database, CDN, Queue)
- Response time tracking

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

### �� Campaign Tracker
- Active campaign monitoring
- Budget tracking and spending analysis
- Performance metrics (impressions, clicks)
- Campaign status management

### ⚙️ Settings (3 Tabs)
**Profile Tab:**
- Edit personal information
- Bio/description
- Profile avatar management

**Notifications Tab:**
- Email/Push notifications toggle
- Activity alerts configuration
- Weekly report subscription

**Security Tab:**
- Password change
- Two-factor authentication (2FA)
- Password visibility controls

### 🔔 Notifications
- Real-time notification bell with badge counter
- **Audio notification sound** 🔊
- Mark as read/unread functionality
- Clear individual or all notifications

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

## 🎨 Key Highlights

✅ Fully Responsive (mobile, tablet, desktop)
✅ Professional dark theme with neon accents
✅ Real-time updates (30-second refresh)
✅ Smooth animations and micro-interactions
✅ Role-based access control
✅ Backend-ready with dummy data
✅ Production-ready deployment

---

## 🔄 API Integration

Currently using dummy data from `/public/api/`. To connect backend:

1. Set `NEXT_PUBLIC_API_URL` in `.env.local`
2. Update `src/services/dashboard.service.ts`
3. All JSON files match expected API response formats

---

## 🚀 Deployment

**Platform:** Vercel
**Auto-deploy:** Enabled on main branch
**Build Status:** ✅ Passing

---

Built with ❤️ for professional studio management
