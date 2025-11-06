const API_BASE = '/api/studio';

export const dashboardService = {
  getOverview: async () => {
    const response = await fetch(`${API_BASE}/overview.json`);
    return response.json();
  },

  getUploads: async () => {
    const response = await fetch(`${API_BASE}/uploads.json`);
    return response.json();
  },

  getCampaigns: async () => {
    const response = await fetch(`${API_BASE}/campaigns.json`);
    return response.json();
  },

  getCreators: async () => {
    const response = await fetch(`${API_BASE}/creators.json`);
    return response.json();
  },

  getRequests: async () => {
    const response = await fetch(`${API_BASE}/requests.json`);
    return response.json();
  },

  getBilling: async () => {
    const response = await fetch(`${API_BASE}/billing.json`);
    return response.json();
  },

  getPaymentMethods: async () => {
    const response = await fetch(`${API_BASE}/payment-methods.json`);
    return response.json();
  },

  getUsers: async () => {
    const response = await fetch(`${API_BASE}/users.json`);
    return response.json();
  },

  getSystemLogs: async () => {
    const response = await fetch(`${API_BASE}/system-logs.json`);
    return response.json();
  },

  deleteUser: async (userId: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  },

  approveRequest: async (requestId: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  },

  rejectRequest: async (requestId: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  }
};
