'use client';

import { createContext, useContext, ReactNode, useState, useEffect, useMemo } from 'react';
import { ConfigProvider, theme } from 'antd';

interface ThemeContextType {
  darkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

// Create a server-safe theme config that doesn't depend on client state
const createServerSafeThemeConfig = (darkMode: boolean) => ({
  algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
  token: {
    colorPrimary: '#6366f1',
    colorInfo: '#6366f1',
    colorBgBase: darkMode ? '#050508' : '#ffffff',
    colorTextBase: darkMode ? '#ffffff' : '#000000',
    borderRadius: 8,
    colorBgContainer: darkMode ? 'rgba(255, 255, 255, 0.045)' : '#ffffff',
    colorBorder: darkMode ? 'rgba(255, 255, 255, 0.1)' : '#e5e7eb',
  },
  components: {
    Layout: {
      headerBg: darkMode ? 'rgba(255, 255, 255, 0.045)' : 'rgba(255, 255, 255, 0.8)',
      bodyBg: darkMode ? '#050508' : '#ffffff',
      footerBg: darkMode ? 'transparent' : '#f9fafb',
    },
    Card: {
      colorBgContainer: darkMode ? 'rgba(255, 255, 255, 0.045)' : '#ffffff',
      colorBorder: darkMode ? 'rgba(255, 255, 255, 0.1)' : '#e5e7eb',
    },
    Button: {
      controlHeightLG: 44,
      borderRadius: 14,
    },
    Menu: {
      itemBg: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(99, 102, 241, 0.08)',
      itemColor: darkMode ? '#ffffff' : '#000000',
    },
    Typography: {
      colorText: darkMode ? '#ffffff' : '#000000',
      colorTextSecondary: darkMode ? '#d1d5db' : '#4b5563',
    }
  },
});

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Initialize from localStorage on the client
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
    }
    // Default to dark mode
    return true;
  });
  
  const [isClient, setIsClient] = useState(false);

  // Initialize theme from localStorage on mount
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        setDarkMode(savedTheme === 'dark');
      }
    }
  }, []);

  // Update localStorage and apply theme to body when darkMode changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', darkMode ? 'dark' : 'light');
      document.body.className = darkMode ? 'dark' : 'light';
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Provide a stable context value
  const contextValue = useMemo(() => ({
    darkMode,
    toggleTheme
  }), [darkMode, toggleTheme]);

  // Use a theme config that's consistent between server and client
  const themeConfig = createServerSafeThemeConfig(darkMode);

  return (
    <ThemeContext.Provider value={contextValue}>
      <ConfigProvider theme={themeConfig}>
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};