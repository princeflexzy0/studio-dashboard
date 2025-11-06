import api from './api';

export const dashboardService = {
  getStats: async () => {
    const { data } = await api.get('/admin/summary');
    return data;
  },

  getRequests: async () => {
    const { data } = await api.get('/studio/requests');
    return data;
  },

  updateRequestStatus: async (id: string, action: 'approve' | 'reject') => {
    const { data } = await api.post(`/studio/request/${id}/action`, { action });
    return data;
  },

  getUploads: async () => {
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

  getProfile: async () => {
    const { data } = await api.get('/user/profile');
    return data;
  },

  updateProfile: async (profile: any) => {
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
