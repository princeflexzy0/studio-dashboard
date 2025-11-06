# Project Structure
```
studio-dashboard/
├── .github/                  # GitHub configuration
├── backend/                  # Backend API (Node.js/Express)
│   ├── config/              # Configuration files
│   ├── controllers/         # API controllers
│   ├── middleware/          # Express middleware
│   ├── models/              # Data models
│   ├── routes/              # API routes
│   └── server.js            # Backend entry point
├── docs/                     # All project documentation
│   ├── CLIENT_DELIVERY.md   # Client delivery notes
│   ├── CLIENT_HANDOVER.md   # Handover instructions
│   ├── DELIVERY_CHECKLIST.md # Pre-delivery checklist
│   ├── PROJECT_STRUCTURE.md # This file
│   ├── TESTING.md           # Testing guidelines
│   └── TEST_CREDENTIALS.txt # Test account credentials
├── logs/                     # Build and error logs
│   ├── build-errors.txt
│   ├── build-errors-full.txt
│   └── build-final.txt
├── public/                   # Static assets
│   └── api/                 # API documentation
├── scripts/                  # Utility scripts
│   ├── check_billing_issues.sh
│   ├── check_missing_features.sh
│   ├── test-api.sh
│   └── verify_complete_build.sh
├── src/                      # Source code
│   ├── app/                 # Next.js App Router
│   │   ├── dashboard/       # Dashboard pages
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
│   │   ├── login/           # Login page
│   │   ├── signup/          # Signup page
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   ├── components/          # React components
│   │   ├── dashboard/       # Dashboard-specific components
│   │   ├── NotificationBell.tsx
│   │   └── ProtectedRoute.tsx
│   ├── contexts/            # React Context providers
│   │   ├── AuthContext.tsx
│   │   └── UserContext.tsx
│   ├── hooks/               # Custom React hooks
│   ├── services/            # API services
│   │   └── dashboard.service.ts
│   └── types/               # TypeScript type definitions
│       └── dashboard.ts
├── .env.example             # Environment variables template
├── .env.local               # Local environment (gitignored)
├── .gitignore               # Git ignore rules
├── CHANGELOG.md             # Version history
├── CONTRIBUTING.md          # Contribution guidelines
├── LICENSE                  # MIT License
├── README.md                # Main documentation
├── next.config.js           # Next.js configuration
├── package.json             # Project dependencies
├── postcss.config.js        # PostCSS configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── vercel.json              # Vercel deployment config
```

## Key Directories

### `/src/app/`
Next.js 14 App Router pages. Each folder represents a route.

### `/src/components/`
Reusable React components used across the application.

### `/src/contexts/`
React Context providers for global state management.

### `/src/services/`
API service functions for backend communication.

### `/src/types/`
TypeScript type definitions and interfaces.

### `/docs/`
All project documentation, client notes, and testing guides.

### `/scripts/`
Utility scripts for testing, verification, and maintenance.

### `/backend/`
Optional backend API server (can be deployed separately).

### `/public/`
Static assets served directly by Next.js.

### `/logs/`
Build logs and error reports (not tracked in git).

## File Naming Conventions

- **Components**: PascalCase (e.g., `NotificationBell.tsx`)
- **Pages**: lowercase with hyphens (e.g., `dashboard/campaigns/`)
- **Services**: kebab-case with `.service.ts` suffix
- **Types**: kebab-case with `.ts` extension
- **Hooks**: camelCase with `use` prefix (e.g., `useAuth.ts`)

## Import Order

1. External libraries
2. Internal absolute imports
3. Relative imports
4. Types
5. Styles

Example:
```typescript
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

import { useAuth } from '@/contexts/AuthContext';
import { dashboardService } from '@/services/dashboard.service';

import type { User } from '@/types/dashboard';
```
