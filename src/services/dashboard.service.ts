import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Fallback to local dummy data if API fails
const useDummyData = !BASE_URL || BASE_URL === '';

export const dashboardService = {
  getStats: async () => {
    if (useDummyData) {
      const response = await fetch('/api/summary.json');
      return response.json();
    }
    const { data } = await axios.get(`${BASE_URL}/api/studio/overview`);
    return data;
  },

  getUsers: async () => {
    if (useDummyData) {
      const response = await fetch('/api/users.json');
      return response.json();
    }
    const { data } = await axios.get(`${BASE_URL}/api/admin/users`);
    return data;
  },

  getCampaigns: async () => {
    if (useDummyData) {
      const response = await fetch('/api/campaigns.json');
      return response.json();
    }
    const { data } = await axios.get(`${BASE_URL}/api/admin/campaigns`);
    return data;
  },

  getUploads: async () => {
    if (useDummyData) {
      const response = await fetch('/api/uploads.json');
      return response.json();
    }
    const { data } = await axios.get(`${BASE_URL}/api/uploads`);
    return data;
  },

  getRequests: async () => {
    if (useDummyData) {
      const response = await fetch('/api/requests.json');
      return response.json();
    }
    const { data } = await axios.get(`${BASE_URL}/api/studio/requests`);
    return data;
  },

  getSystemHealth: async () => {
    if (useDummyData) {
      const response = await fetch('/api/health.json');
      return response.json();
    }
    const { data } = await axios.get(`${BASE_URL}/api/system/health`);
    return data;
  },

  approveRequest: async (id: number) => {
    if (useDummyData) {
      return { success: true };
    }
    const { data } = await axios.post(`${BASE_URL}/api/studio/request/${id}/action`, {
      action: 'approve'
    });
    return data;
  },

  rejectRequest: async (id: number) => {
    if (useDummyData) {
      return { success: true };
    }
    const { data } = await axios.post(`${BASE_URL}/api/studio/request/${id}/action`, {
      action: 'reject'
    });
    return data;
  }
};
