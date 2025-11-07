# 🎨 Studio Dashboard

A modern, full-featured admin dashboard for managing content creators, uploads, campaigns, and system monitoring. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

![Studio Dashboard](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🔐 Authentication
- Mock authentication system (admin@test.com / Test@123)
- Protected routes with middleware
- Session management with cookies
- Auto-redirect for authenticated users

### 📊 Dashboard
- Real-time statistics and metrics
- Recent activity feed
- Top performers leaderboard
- Responsive card layouts

### 👥 Creator Management
- Search and filter creators
- Status tracking (Active, Pending, Inactive)
- Upload statistics per creator
- Profile management

### 📤 Upload Management
- Connected to API endpoints
- File status tracking (Approved, Pending, Rejected)
- Search functionality
- Bulk actions support

### 📣 Campaign Management
- Campaign creation and tracking
- Budget monitoring
- Participant management
- Duration and deadline tracking

### 🖥️ System Monitoring
- CPU, Memory, and Disk usage metrics
- System uptime tracking
- Real-time logs with color coding
- Active users monitoring
- API call tracking

### ⚙️ Settings
- Connected to API endpoints
- General site configuration
- User management settings
- Notification preferences
- Theme selection
- Maintenance mode

## �� Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd studio-dashboard
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### 🔑 Demo Credentials
```
Email: admin@test.com
Password: Test@123
```

## 📁 Project Structure
```
studio-dashboard/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── api/               # API routes
│   │   │   └── admin/         # Admin API endpoints
│   │   ├── dashboard/         # Dashboard pages
│   │   │   ├── creators/      # Creator management
│   │   │   ├── uploads/       # Upload management
│   │   │   ├── campaigns/     # Campaign management
│   │   │   ├── system/        # System monitoring
│   │   │   └── settings/      # Settings page
│   │   ├── login/             # Login page
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable components
│   │   ├── Sidebar.tsx        # Navigation sidebar
│   │   ├── Header.tsx         # Page header
│   │   ├── Table.tsx          # Reusable table
│   │   ├── ChartCard.tsx      # Metric cards
│   │   ├── LoadingSpinner.tsx # Loading states
│   │   └── ErrorBoundary.tsx  # Error handling
│   ├── contexts/              # React contexts
│   │   └── AuthContext.tsx    # Authentication context
│   └── middleware.ts          # Route protection
├── public/                    # Static assets
├── .env.example              # Environment variables template
├── next.config.js            # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS configuration
└── package.json              # Dependencies
```

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **State Management:** React Context API

## 📱 Responsive Design

The dashboard is fully responsive and works seamlessly on:
- 📱 Mobile devices (320px+)
- �� Tablets (768px+)
- 💻 Laptops (1024px+)
- 🖥️ Desktops (1280px+)

## 🔒 Security Features

- Protected routes with middleware
- Cookie-based session management
- Auto-redirect for unauthenticated users
- Admin-only access
- CSRF protection ready

## 🎨 Customization

### Colors
Update `tailwind.config.ts` to change the color scheme:
```typescript
colors: {
  primary: '#06b6d4', // Cyan
  secondary: '#3b82f6', // Blue
}
```

### Branding
Update the sidebar branding in `src/components/Sidebar.tsx`:
```tsx
<h1>Your Brand</h1>
```

## 📝 API Endpoints

### Uploads API
```
GET /api/admin/uploads - Get all uploads
```

### Settings API
```
GET /api/admin/settings - Get settings
POST /api/admin/settings - Update settings
```

## 🚧 Future Enhancements

- [ ] Real database integration
- [ ] Advanced analytics
- [ ] Export functionality
- [ ] Email notifications
- [ ] Multi-language support
- [ ] Role-based access control
- [ ] Real-time updates with WebSockets
- [ ] File upload with S3/CloudFlare
- [ ] Advanced search and filters

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## �� Support

For support, email support@yourdomain.com or open an issue in the repository.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animated with [Framer Motion](https://www.framer.com/motion/)
- Icons from [Lucide](https://lucide.dev/)

---

Made with ❤️ by Your Team
