export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'contributor';
  avatar?: string;
}

export interface DashboardStats {
  uploads: number;
  requests: number;
  users: number;
}

export interface Request {
  id: string;
  name: string;
  date: string;
  type: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedBy: string;
}

export interface UploadedFile {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: string;
  thumbnail?: string;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  updates: boolean;
}