'use client';

import { Layout, Typography, Space, Dropdown, Avatar, Button, MenuProps } from 'antd';
import { UserOutlined, LogoutOutlined, DownOutlined, SettingOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { isAuthenticated, logout } from '@/utils/auth';
import ThemeSwitcher from '../ThemeSwitcher';
import { useTheme } from '@/context/ThemeContext';
import { useState, useEffect } from 'react';

const { Header } = Layout;
const { Title } = Typography;

interface DashboardHeaderProps {
  title: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { darkMode } = useTheme();
  const [userAvatar, setUserAvatar] = useState<string | null>(null);

  useEffect(() => {
    // Only run on client side to avoid hydration mismatch
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          if (user.profile_photo_url) {
            setUserAvatar(user.profile_photo_url);
          }
        } catch (e) {
          console.error('Error parsing user data:', e);
        }
      }
    }
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const userMenuItems: MenuProps['items'] = isAuthenticated()
    ? [
        {
          key: 'settings',
          label: <Link href="/settings">Settings</Link>,
          icon: <SettingOutlined />,
        },
        {
          type: 'divider',
        },
        {
          key: 'logout',
          label: 'Logout',
          icon: <LogoutOutlined />,
          danger: true,
          onClick: handleLogout,
        },
      ]
    : [
        {
          key: 'login',
          label: <Link href="/login">Login</Link>,
          icon: <UserOutlined />,
        },
        {
          key: 'signup',
          label: <Link href="/signup">Sign Up</Link>,
          icon: <UserOutlined />,
        },
      ];

  const commonMenuItems: MenuProps['items'] = [
    ...userMenuItems,
    {
      type: 'divider',
    },
    {
      key: 'about',
      label: <Link href="/about">About</Link>,
    },
    {
      key: 'contact',
      label: <Link href="/contact">Contact Us</Link>,
    },
  ];

  const headerStyle: React.CSSProperties = {
    background: darkMode ? 'rgba(255, 255, 255, 0.045)' : 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(64px)',
    borderBottom: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    height: '80px',
    minHeight: '80px'
  };
  
  const logoStyle = {
    color: darkMode ? '#ffffff' : '#1890ff',
    fontSize: '18px',
    fontWeight: 'bold'
  };

  return isAuthenticated() ? (
    <Header className="flex justify-between items-center px-4" style={headerStyle}>
      <div className="logo" style={logoStyle}>
        Secure Portal
      </div>
      <Space>
        <Title level={3} style={{ margin: 0, color: darkMode ? 'white' : '#000000' }}>
          {title}
        </Title>
        <ThemeSwitcher />
        <Dropdown menu={{ items: commonMenuItems }} trigger={['hover']}>
          <Button type="text">
            <Space>
              {userAvatar ? (
                <Avatar size="small" src={userAvatar} />
              ) : (
                <Avatar size="small" icon={<UserOutlined />} style={{ backgroundColor: '#6366f1' }} />
              )}
              <span style={{ color: darkMode ? 'white' : '#000000' }}>Account</span>
            </Space>
          </Button>
        </Dropdown>
      </Space>
    </Header>
  ) : null;
};

export default DashboardHeader;