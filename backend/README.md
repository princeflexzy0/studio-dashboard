# Studio Dashboard Backend API

Optional backend API server for Studio Dashboard.

## Setup
```bash
cd backend
npm install
```

## Configuration

Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/studio-dashboard
JWT_SECRET=your-secret-key
```

## Run
```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/profile` - Get user profile

### Campaigns
- `GET /api/campaigns` - List campaigns
- `POST /api/campaigns` - Create campaign
- `PUT /api/campaigns/:id` - Update campaign
- `DELETE /api/campaigns/:id` - Delete campaign

### Uploads
- `POST /api/uploads` - Upload file
- `GET /api/uploads/:id` - Get file details

## Tech Stack

- Node.js
- Express.js
- MongoDB
- JWT Authentication
