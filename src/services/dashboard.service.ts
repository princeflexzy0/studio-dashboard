const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export const dashboardService = {
  // Dashboard Overview
  async getStats() {
    const response = await fetch(`${API_BASE_URL}/studio/overview.json`);
    return response.json();
  },

  // Users/Creators
  async getUsers() {
    const response = await fetch(`${API_BASE_URL}/admin/users.json`);
    return response.json();
  },

  // Campaigns
  async getCampaigns() {
    const response = await fetch(`${API_BASE_URL}/admin/campaigns.json`);
    return response.json();
  },

  // Uploads
  async getUploads() {
    const response = await fetch(`${API_BASE_URL}/uploads.json`);
    return response.json();
  },

  // Requests
  async getRequests() {
    const response = await fetch(`${API_BASE_URL}/studio/requests.json`);
    return response.json();
  },

  // System Health
  async getSystemHealth() {
    const response = await fetch(`${API_BASE_URL}/system/health.json`);
    return response.json();
  },

  // Billing Info
  async getBillingInfo() {
    const response = await fetch(`${API_BASE_URL}/billing/info.json`);
    return response.json();
  },

  // Request Actions
  async approveRequest(id: number) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, message: 'Request approved' };
  },

  async rejectRequest(id: number) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, message: 'Request rejected' };
  },
};
