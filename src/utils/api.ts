// API Configuration
// We're using the server backend by default. 
// If you want to use a local backend, set NEXT_PUBLIC_API_URL in .env.local
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://management-backend-seven.vercel.app/api';

// Helper function to handle API responses
async function handleResponse(response: Response) {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Something went wrong');
  }
  return response.json();
}

// Helper function to get auth token
function getToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
}

// Auth API
export const authAPI = {
  // Login
  login: async (mobile: string, pin: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mobile, pin }),
    });
    return handleResponse(response);
  },

  // Signup
  signup: async (name: string, email: string, mobile: string, pin: string, password?: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, mobile, pin, password }),
    });
    return handleResponse(response);
  },

  // Forgot Password/PIN
  forgotPassword: async (mobile: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mobile }),
    });
    return handleResponse(response);
  },

  // Reset Password/PIN
  resetPassword: async (mobile: string, code: string, newPin: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mobile, code, newPin }),
    });
    return handleResponse(response);
  },

  // Get current user
  getCurrentUser: async () => {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  },
};

// User API
export const userAPI = {
  // Get profile
  getProfile: async () => {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/user/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  },

  // Update profile
  updateProfile: async (data: { name?: string; email?: string; avatar?: string }) => {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/user/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  // Change PIN
  changePin: async (oldPin: string, newPin: string) => {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/user/change-pin`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ oldPin, newPin }),
    });
    return handleResponse(response);
  },

  // Delete account
  deleteAccount: async () => {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/user/account`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  },
};

// Articles API
export const articlesAPI = {
  // Get all articles
  getArticles: async (page: number = 1, limit: number = 10) => {
    const response = await fetch(
      `${API_BASE_URL}/articles?page=${page}&limit=${limit}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return handleResponse(response);
  },

  // Get featured articles
  getFeaturedArticles: async () => {
    const response = await fetch(`${API_BASE_URL}/articles/featured`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  },

  // Get single article
  getArticle: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  },

  // Search articles
  searchArticles: async (query: string) => {
    const response = await fetch(`${API_BASE_URL}/articles/search/${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  },

  // Create article (Admin)
  createArticle: async (articleData: { title: string; description: string; content: string; author: string; tags?: string[]; imageUrl?: string; category?: string; featured?: boolean }) => {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/articles`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(articleData),
    });
    return handleResponse(response);
  },
};
