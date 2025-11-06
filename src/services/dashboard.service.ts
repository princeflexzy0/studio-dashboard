const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api/studio';

export const dashboardService = {
  async getOverview() {
    const response = await fetch(`${API_BASE}/overview.json`);
    if (!response.ok) throw new Error('Failed to fetch overview');
    return response.json();
  },

  async getStats() {
    const response = await fetch(`${API_BASE}/stats.json`);
    if (!response.ok) throw new Error('Failed to fetch stats');
    return response.json();
  },

  async getUsers() {
    const response = await fetch(`${API_BASE}/users.json`);
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  },

  async getCampaigns() {
    const response = await fetch(`${API_BASE}/campaigns.json`);
    if (!response.ok) throw new Error('Failed to fetch campaigns');
    return response.json();
  },

  async getUploads() {
    const response = await fetch(`${API_BASE}/uploads.json`);
    if (!response.ok) throw new Error('Failed to fetch uploads');
    return response.json();
  },

  async getRequests() {
    const response = await fetch(`${API_BASE}/requests.json`);
    if (!response.ok) throw new Error('Failed to fetch requests');
    return response.json();
  },

  async getSystemHealth() {
    const response = await fetch(`${API_BASE}/system-health.json`);
    if (!response.ok) throw new Error('Failed to fetch system health');
    return response.json();
  },

  async getBillingInfo() {
    const response = await fetch(`${API_BASE}/billing.json`);
    if (!response.ok) throw new Error('Failed to fetch billing info');
    return response.json();
  },

  async approveRequest(id: number) {
    // Mock approval - in real app would be POST request
    return { success: true, id };
  },

  async rejectRequest(id: number) {
    // Mock rejection - in real app would be POST request
    return { success: true, id };
  },
};

  getRequests: async () => {
    const response = await fetch('/api/studio/requests.json');
    return response.json();
  },

  approveRequest: async (id: number) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, id };
  },

  rejectRequest: async (id: number) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, id };
  },

  getCampaigns: async () => {
    const response = await fetch('/api/studio/campaigns.json');
    return response.json();
  },

  getSystemHealth: async () => {
    const response = await fetch('/api/studio/system-health.json');
    return response.json();
  },
