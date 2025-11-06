# 📸 Studio Dashboard

A modern, full-featured content creator management dashboard built with Next.js 14, TypeScript, and Tailwind CSS.

## 🌟 Features

### 👤 Authentication System
- Secure login and signup pages
- User session management
- Profile picture upload and display
- Dynamic user menu with dropdown

### 📊 Dashboard Pages

#### 1. **Overview Dashboard**
- Real-time statistics and metrics
- Quick access to key features
- Activity feed and notifications

#### 2. **Campaigns Management**
- Create and edit campaigns with date pickers
- Budget tracking in USD
- Pause/Resume/Delete campaigns
- Real-time status updates
- Campaign performance metrics

#### 3. **Content Creators**
- Add new creators with detailed profiles
- Direct messaging system
- Approve/Suspend creator accounts
- Track earnings and performance
- Global creator diversity support

#### 4. **User Management**
- Add/Edit users with role assignment
- Role-based access (Admin/Editor/Viewer)
- Activate/Deactivate user accounts
- User activity tracking

#### 5. **Content Requests**
- View detailed request information
- Approve/Reject workflow with reasons
- Status tracking (Pending/Approved/Rejected)
- Request filtering and search

#### 6. **Billing & Payments**
- Multiple subscription plans (Starter/Professional/Enterprise)
- Add payment methods securely
- Upgrade/Downgrade plans
- Transaction history with invoice downloads
- Credit usage tracking

#### 7. **Content Library**
- Upload files (videos, images, documents)
- View file details and metadata
- Download files
- Delete with confirmation
- File type categorization

#### 8. **System Monitoring**
- Real-time system health checks
- Performance metrics
- Server status monitoring

#### 9. **Settings**
- Profile management with picture upload
- Email and password updates
- Notification preferences
- Security settings

### 🎨 UI/UX Features
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Dark Theme**: Modern gradient-based dark interface
- **Smooth Animations**: Framer Motion powered transitions
- **Toast Notifications**: Real-time user feedback
- **Form Validations**: Client-side input validation
- **Loading States**: Skeleton screens and spinners
- **Empty States**: Helpful placeholders for empty data
- **Dropdown Menus**: Context-aware action menus
- **Modal Dialogs**: Clean, animated modal interfaces

### 🔔 Notification System
- Real-time notification bell with badge count
- Mobile-responsive notification panel
- Mark as read functionality
- Sound alerts for new notifications
- Notification history

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: react-hot-toast
- **State Management**: React Context API
- **Form Handling**: React Hooks

## 📦 Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/studio-dashboard.git

# Navigate to project directory
cd studio-dashboard

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Manual Build
```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure
```
studio-dashboard/
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   ├── billing/
│   │   │   ├── campaigns/
│   │   │   ├── creators/
│   │   │   ├── library/
│   │   │   ├── requests/
│   │   │   ├── settings/
│   │   │   ├── system/
│   │   │   ├── uploads/
│   │   │   ├── users/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── login/
│   │   ├── signup/
│   │   └── layout.tsx
│   ├── components/
│   │   └── NotificationBell.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx
│   └── services/
│       └── dashboard.service.ts
├── public/
├── .env.local
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 🔐 Environment Variables

Create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=your_api_url_here
NEXT_PUBLIC_APP_NAME=Studio Dashboard
```

## 🎯 Key Features by Page

### Campaigns
- Full CRUD operations
- Budget management (USD)
- Date range selection
- Status management (Active/Paused/Scheduled/Completed)
- Performance metrics display

### Creators
- Creator profiles with avatars
- Email and phone contact info
- Location tracking
- Earnings and video statistics
- Messaging system
- Approval workflow

### Users
- User role management
- Profile editing
- Account status toggling
- User activity logs

### Requests
- Request status workflow
- Approval with confirmation
- Rejection with reasons
- Detailed view modal
- Date and creator tracking

### Billing
- Plan comparison (Starter/Pro/Enterprise)
- Credit usage tracking
- Payment method management
- Transaction history
- Invoice downloads

### Library
- Multi-format file support
- File metadata display
- Upload with progress
- Preview and download
- Bulk operations

## 💡 Usage Examples

### Adding a Campaign
1. Navigate to Campaigns page
2. Click "New Campaign" button
3. Fill in campaign details (name, budget, dates)
4. Click "Create" to save

### Managing Creators
1. Go to Creators page
2. Click "Add Creator" to onboard new creators
3. Use Message icon to communicate
4. Approve/Suspend using action buttons

### Handling Requests
1. Visit Requests page
2. Click "View" to see request details
3. Use "Approve" or "Reject" buttons
4. Add rejection reason if declining

## 🎨 Customization

### Theme Colors
Edit `tailwind.config.ts` to customize colors:
```typescript
theme: {
  extend: {
    colors: {
      primary: '#06b6d4', // Cyan
      secondary: '#3b82f6', // Blue
    }
  }
}
```

### Adding New Pages
1. Create folder in `src/app/dashboard/`
2. Add `page.tsx` file
3. Update navigation in `layout.tsx`

## 🐛 Troubleshooting

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### Authentication Issues
- Check localStorage is enabled in browser
- Verify environment variables are set
- Clear browser cache and cookies

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please open an issue on GitHub.

## 🎉 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for utility-first CSS
- Framer Motion for smooth animations
- Lucide for beautiful icons

---

Built with ❤️ using Next.js 14
