import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const dashboardService = {
  getStats: async () => {
    try {
      const { data } = await api.get('/admin/summary');
      return data;
    } catch (error) {
      console.error('Failed to fetch stats:', error);
      throw error;
    }
  },

  getRequests: async () => {
    try {
      const { data } = await api.get('/studio/requests');
      return data;
    } catch (error) {
      console.error('Failed to fetch requests:', error);
      throw error;
    }
  },

  updateRequestStatus: async (id: string, action: 'approve' | 'reject') => {
    try {
      const { data } = await api.post(`/studio/request/${id}/action`, { action });
      return data;
    } catch (error) {
      console.error('Failed to update request:', error);
      throw error;
    }
  },

  getUploads: async () => {
    try {
      const { data } = await api.get('/uploads');
      return data;
    } catch (error) {
      console.error('Failed to fetch uploads:', error);
      throw error;
    }
  },

  uploadFile: async (file: File, onProgress?: (progress: number) => void) => {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const { data } = await api.post('/uploads', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
            onProgress?.(progress);
          }
        },
      });
      return data;
    } catch (error) {
      console.error('Failed to upload file:', error);
      throw error;
    }
  },

  deleteFile: async (id: string) => {
    try {
      const { data } = await api.delete(`/uploads/${id}`);
      return data;
    } catch (error) {
      console.error('Failed to delete file:', error);
      throw error;
    }
  },

  getProfile: async () => {
    try {
      const { data } = await api.get('/user/profile');
      return data;
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      throw error;
    }
  },

  updateProfile: async (profile: any) => {
    try {
      const { data } = await api.post('/user/update', profile);
      return data;
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
    }
  },

  updateNotifications: async (settings: any) => {
    try {
      const { data } = await api.post('/user/notifications', settings);
      return data;
    } catch (error) {
      console.error('Failed to update notifications:', error);
      throw error;
    }
  },

  updateSecurity: async (security: any) => {
    try {
      const { data } = await api.post('/user/security', security);
      return data;
    } catch (error) {
      console.error('Failed to update security:', error);
      throw error;
    }
  },
};
