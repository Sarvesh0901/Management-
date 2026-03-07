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
  const isAuth = isAuthenticated();
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

  // User dropdown menu items
  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: <Link href="/settings">Profile</Link>,
      icon: <UserOutlined />,
    },
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

  return (
    <Header className="flex justify-between items-center px-4" style={{ position: 'sticky', top: 0, zIndex: 1000, background: 'rgba(255, 255, 255, 0.045)', backdropFilter: 'blur(64px)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', height: '80px', minHeight: '80px' }}>
      <div className="logo" style={{ color: 'white', fontSize: '22px', fontWeight: 'bold' }}>
        Secure Portal
      </div>
      <Space>
        {/* <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[pathname]}
          items={mainMenuItems}
          style={{ flex: 1, minWidth: 0, background: 'transparent' }}
        /> */}

        <ThemeSwitcher />
        <Dropdown menu={{ items: isAuth ? userMenuItems : authMenuItems }} trigger={['click']}>
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
              {isAuth ? (
                userAvatar ? (
                  <Avatar size="large" src={userAvatar} style={{ cursor: 'pointer' }} />
                ) : (
                  <Avatar size="large" icon={<UserOutlined />} style={{ backgroundColor: '#6366f1', cursor: 'pointer' }} />
                )
              ) : (
                <>
                  <LoginOutlined style={{ fontSize: '20px' }} />
                  <span>Login / Sign Up</span>
                </>
              )}
            </Space>
          </Button>
        </Dropdown>
      </Space>
    </Header>
  );
};

export default Navigation;