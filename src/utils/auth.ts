// Authentication utility functions
import { authAPI } from './api';

// Simulate checking if user is authenticated
export const isAuthenticated = (): boolean => {
  // In a real app, you would check for tokens in localStorage/sessionStorage
  return typeof window !== 'undefined' && !!localStorage.getItem('authToken');
};

// Simulate login
export const login = async (identifier: string, password: string): Promise<boolean> => {
  try {
    // Call the backend API
    const response = await authAPI.login(identifier, password);
    if (response.token) {
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Simulate logout
export const logout = (): void => {
  localStorage.removeItem('authToken');
};

// Simulate signup
export const signup = async (name: string, identifier: string, password: string): Promise<boolean> => {
  try {
    // Call the backend API
    // For PIN-based auth, we'll use the PIN as both pin and password
    const response = await authAPI.signup(name, identifier, identifier, password, password);
    if (response.token) {
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

// Register function (alias for signup)
export const register = async (email: string, password: string): Promise<boolean> => {
  return await signup(email, email, password);
};

// Forgot password/PIN
export const forgotPassword = async (mobile: string) => {
  try {
    const response = await authAPI.forgotPassword(mobile);
    return response;
  } catch (error) {
    console.error('Forgot password error:', error);
    throw error;
  }
};

// Reset password/PIN
export const resetPassword = async (mobile: string, code: string, newPin: string) => {
  try {
    const response = await authAPI.resetPassword(mobile, code, newPin);
    return response;
  } catch (error) {
    console.error('Reset password error:', error);
    throw error;
  }
};

// Get current user
export const getCurrentUser = async () => {
  try {
    const response = await authAPI.getCurrentUser();
    return response.user;
  } catch (error) {
    console.error('Get current user error:', error);
    throw error;
  }
};