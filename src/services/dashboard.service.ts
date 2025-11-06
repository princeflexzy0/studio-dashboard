interface DashboardStats {
  totalUploads: number;
  activeUsers: number;
  storageUsed: string;
  revenue: number;
}

interface Upload {
  id: string;
  title: string;
  date: string;
  status: string;
  uploader: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  avatar: string;
}

export const dashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    const response = await fetch('/api/studio/stats.json');
    if (!response.ok) throw new Error('Failed to fetch stats');
    return response.json();
  },

  getUploads: async (): Promise<Upload[]> => {
    const response = await fetch('/api/studio/uploads.json');
    if (!response.ok) throw new Error('Failed to fetch uploads');
    return response.json();
  },

  getUsers: async (): Promise<User[]> => {
    const response = await fetch('/api/studio/users.json');
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  },

  getBillingInfo: async () => {
    const response = await fetch('/api/studio/billing.json');
    if (!response.ok) throw new Error('Failed to fetch billing');
    return response.json();
  },

  updateUserRole: async (userId: string, role: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, userId, role };
  },

  deleteUser: async (userId: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, userId };
  },

  getRequests: async () => {
    const response = await fetch('/api/studio/requests.json');
    if (!response.ok) throw new Error('Failed to fetch requests');
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
    if (!response.ok) throw new Error('Failed to fetch campaigns');
    return response.json();
  },

  getSystemHealth: async () => {
    const response = await fetch('/api/studio/system-health.json');
    if (!response.ok) throw new Error('Failed to fetch system health');
    return response.json();
  }
};
