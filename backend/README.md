# 🔧 Studio Dashboard Backend Setup

## Prerequisites
- Node.js v18+
- MongoDB installed locally or MongoDB Atlas account
- npm or yarn

## Installation

1. Navigate to backend directory:
```bash
cd backend
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update `.env` with your credentials:
```env
MONGODB_URI=mongodb://localhost:27017/studio-dashboard
JWT_SECRET=your-secret-key
```

4. Start MongoDB (if local):
```bash
mongod
```

5. Start backend server:
```bash
npm run dev
```

## Testing Backend

Test all endpoints:
```bash
# From project root
./scripts/test-api.sh
```

## API Endpoints

### Studio
- `GET /api/studio/overview` - Dashboard stats
- `GET /api/studio/requests` - All requests
- `POST /api/studio/request/:id/action` - Approve/Reject

### Uploads
- `GET /api/uploads` - List uploads
- `POST /api/uploads` - Upload file
- `DELETE /api/uploads/:id` - Delete file

### User
- `GET /api/user/profile` - Get profile
- `POST /api/user/update` - Update profile
- `POST /api/user/notifications` - Update notifications
- `POST /api/user/security` - Update security

## Deployment

See main README for production deployment instructions.