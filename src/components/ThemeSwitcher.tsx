'use client';

import { Switch } from 'antd';
import { useTheme } from '../context/ThemeContext';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';

const ThemeSwitcher = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <SunOutlined style={{ color: darkMode ? '#6b7280' : '#f5af19' }} />
      <Switch
        checked={darkMode}
        onChange={toggleTheme}
        checkedChildren={null}
        unCheckedChildren={null}
        style={{ 
          backgroundColor: darkMode ? '#6366f1' : '#e5e7eb',
          boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.25)'
        }}
      />
      <MoonOutlined style={{ color: darkMode ? '#6366f1' : '#6b7280' }} />
    </div>
  );
};

export default ThemeSwitcher;