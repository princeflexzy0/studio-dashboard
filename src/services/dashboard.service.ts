import api from './api';
import { DashboardStats, Request, UploadedFile, User } from '@/types/dashboard';

export const dashboardService = {
  // Overview
  getStats: async (): Promise<DashboardStats> => {
    const { data } = await api.get('/studio/overview');
    return data;
  },

  // Requests
  getRequests: async (): Promise<Request[]> => {
    const { data } = await api.get('/studio/requests');
    return data;
  },

  updateRequestStatus: async (id: string, action: 'approve' | 'reject') => {
    const { data } = await api.post(`/studio/request/${id}/action`, { action });
    return data;
  },

  // Uploads
  getUploads: async (): Promise<UploadedFile[]> => {
    const { data } = await api.get('/uploads');
    return data;
  },

  uploadFile: async (file: File, onProgress?: (progress: number) => void) => {
    const formData = new FormData();
    formData.append('file', file);

    const { data } = await api.post('/uploads', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const progress = (progressEvent.loaded / progressEvent.total) * 100;
          onProgress?.(progress);
        }
      },
    });
    return data;
  },

  deleteFile: async (id: string) => {
    const { data } = await api.delete(`/uploads/${id}`);
    return data;
  },

  // User Profile
  getProfile: async (): Promise<User> => {
    const { data } = await api.get('/user/profile');
    return data;
  },

  updateProfile: async (profile: Partial<User>) => {
    const { data } = await api.post('/user/update', profile);
    return data;
  },

  updateNotifications: async (settings: any) => {
    const { data } = await api.post('/user/notifications', settings);
    return data;
  },

  updateSecurity: async (security: any) => {
    const { data } = await api.post('/user/security', security);
    return data;
  },
};