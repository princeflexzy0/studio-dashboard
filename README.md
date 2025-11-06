# 🎬 Studio Dashboard - Professional Content Management Platform

A modern, responsive dashboard for managing video content, creator collaborations, and studio operations. Built with Next.js 14, TypeScript, and Tailwind CSS.

![Studio Dashboard](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 📊 Dashboard Overview
- Real-time analytics and statistics
- Active campaigns tracking
- Recent uploads monitoring
- System health indicators
- Beautiful gradient UI with animations

### 🎥 Content Management
- Drag-and-drop file uploads
- Video and image support
- Upload progress tracking
- File management system
- Preview capabilities

### 👥 Creator Collaboration
- Collaboration request system
- Creator management
- Request approval workflow
- Communication tools

### 📈 Campaign Management
- Campaign creation and tracking
- Performance analytics
- Budget monitoring
- Timeline management

### ⚙️ Settings & Profile
- **Auto-location detection** via IP geolocation
- Profile picture upload
- Email and notification preferences
- Password management
- Two-factor authentication
- Security settings

### 🖥️ System Health
- Real-time system monitoring
- 30-day uptime performance chart
- Service status tracking
- Response time metrics
- Professional recharts visualization

## 🚀 Tech Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Charts:** Recharts
- **State Management:** React Context API
- **File Upload:** React Dropzone
- **Notifications:** React Hot Toast
- **Icons:** Lucide React

## 📱 Mobile Responsive

Fully optimized for all devices:
- **📱 Mobile:** 320px - 640px (Single column, touch-optimized)
- **📲 Tablet:** 640px - 1024px (2-column grids)
- **💻 Desktop:** 1024px+ (Full multi-column layouts)

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/princeflexzy0/studio-dashboard.git

# Navigate to project directory
cd studio-dashboard

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Default Login Credentials

```
Email: admin@studio.com
Password: admin123
```

**⚠️ Important:** Change these credentials in production!

## 📦 Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## 🌐 Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

Or connect your GitHub repository on [vercel.com](https://vercel.com) for automatic deployments.

## 📂 Project Structure

```
studio-dashboard/
├── src/
│   ├── app/
│   │   ├── dashboard/          # Dashboard pages
│   │   │   ├── page.tsx        # Main dashboard
│   │   │   ├── settings/       # Settings page
│   │   │   ├── system/         # System health
│   │   │   ├── campaigns/      # Campaign management
│   │   │   ├── creators/       # Creator management
│   │   │   └── requests/       # Collaboration requests
│   │   ├── login/              # Authentication
│   │   └── api/                # API routes
│   ├── components/             # Reusable components
│   ├── contexts/               # React contexts
│   ├── services/               # API services
│   └── types/                  # TypeScript types
├── public/                     # Static assets
└── backend/                    # Backend API (optional)
```

## 🎨 Key Features Breakdown

### Auto-Location Detection
Uses IP geolocation API to automatically detect user's:
- City and region
- Country
- Phone country code
- Manual override option

### Professional Charts
- Smooth animated area charts
- 30-day historical data
- Interactive tooltips
- Gradient fills
- Responsive design

### Modern UI/UX
- Glassmorphism effects
- Smooth animations
- Gradient backgrounds
- Touch-friendly controls
- Loading states
- Error handling

## 🔧 Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=your_api_url
```

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

Developed by **Prince Flexzy**
- GitHub: [@princeflexzy0](https://github.com/princeflexzy0)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for utility-first styling
- Framer Motion for smooth animations
- Recharts for beautiful data visualization

---

**🚀 Ready to go live!** Deploy to Vercel in minutes and start managing your studio content professionally.
