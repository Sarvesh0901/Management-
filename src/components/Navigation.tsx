'use client';

import { Layout, Menu, Space, Dropdown, Avatar, Button, MenuProps } from 'antd';
import { LoginOutlined, TeamOutlined, UserOutlined, LogoutOutlined, DownOutlined, SettingOutlined, MailOutlined, GlobalOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import ThemeSwitcher from './ThemeSwitcher';
import { isAuthenticated, logout } from '@/utils/auth';
import { useState, useEffect } from 'react';

const { Header } = Layout;

const Navigation = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only run on client side to avoid hydration mismatch
    setMounted(true);
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('authToken');
    if (userStr && token) {
      try {
        const user = JSON.parse(userStr);
        setIsAuth(true);
        if (user.profile_photo_url) {
          setUserAvatar(user.profile_photo_url);
        }
      } catch (e) {
        console.error('Error parsing user data:', e);
        setIsAuth(false);
      }
    } else {
      setIsAuth(false);
    }
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  // User dropdown menu items
  const userMenuItems: MenuProps['items'] = [
    ...(pathname !== '/dashboard' ? [{
      key: 'dashboard',
      label: <Link href="/dashboard">Dashboard</Link>,
      icon: <UserOutlined />,
    }] : []),
    {
      key: 'settings',
      label: <Link href="/settings">Settings</Link>,
      icon: <SettingOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: 'about',
      label: <Link href="/about">About Us</Link>,
      icon: <TeamOutlined />,
    },
    {
      key: 'contact',
      label: <Link href="/contact">Contact Us</Link>,
      icon: <MailOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: 'theme',
      label: <div onClick={(e) => e.stopPropagation()}>
        <ThemeSwitcher />
      </div>,
      icon: <GlobalOutlined />,
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ];

  // Auth menu items (Login/Signup) when not authenticated
  const authMenuItems: MenuProps['items'] = [
    {
      key: '/login',
      label: <Link href="/login">Login</Link>,
      icon: <LoginOutlined />,
    },
    {
      key: '/signup',
      label: <Link href="/signup">Sign Up</Link>,
      icon: <TeamOutlined />,
    },
  ];

  // Don't render anything until mounted on client
  if (!mounted) {
    return null;
  }

  return (
    !isAuth ? null : (
      <Header className="flex justify-between items-center px-4" style={{ position: 'sticky', top: 0, zIndex: 1000, background: 'rgba(255, 255, 255, 0.045)', backdropFilter: 'blur(64px)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', height: '80px', minHeight: '80px' }}>
        <div className="logo" style={{ color: 'white', fontSize: '22px', fontWeight: 'bold' }}>
          Secure Portal
        </div>
        <Space>
          <Dropdown menu={{ items: userMenuItems }} trigger={['click']}>
            <Button 
              type="text" 
              style={{ 
                color: 'white',
                padding: '8px',
                height: 'auto',
                background: 'transparent',
                border: 'none'
              }}
            >
              <Space>
                {userAvatar ? (
                  <Avatar size="large" src={userAvatar} style={{ cursor: 'pointer' }} />
                ) : (
                  <Avatar size="large" icon={<UserOutlined />} style={{ backgroundColor: '#6366f1', cursor: 'pointer' }} />
                )}
              </Space>
            </Button>
          </Dropdown>
        </Space>
      </Header>
    )
  );
};

export default Navigation;