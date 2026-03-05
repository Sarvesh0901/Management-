'use client';

import { Layout, Menu, Space, Dropdown, Avatar, Button, MenuProps } from 'antd';
import { HomeOutlined, LoginOutlined, TeamOutlined, UserOutlined, LogoutOutlined, DownOutlined, SettingOutlined, MailOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import ThemeSwitcher from './ThemeSwitcher';
import { isAuthenticated, logout } from '@/utils/auth';

const { Header } = Layout;

const Navigation = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isAuth = isAuthenticated();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  // User dropdown menu items
  const userMenuItems: MenuProps['items'] = [
    {
      key: 'home',
      label: <Link href="/">Home</Link>,
      icon: <HomeOutlined />,
    },
    {
      key: 'dashboard',
      label: <Link href="/dashboard">Dashboard</Link>,
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
      label: <Link href="/contact">Contact</Link>,
      icon: <MailOutlined />,
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
  ];

  // Main navigation menu items
  const mainMenuItems: MenuProps['items'] = [
    {
      key: '/',
      label: <Link href="/">Home</Link>,
      icon: <HomeOutlined />,
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
        {isAuth ? (
          <Dropdown menu={{ items: userMenuItems }} trigger={['click']}>
            <Button type="text" style={{ color: 'white' }}>
              <Space>
                <Avatar size="small" icon={<UserOutlined />} style={{ backgroundColor: '#6366f1' }} />
                <span>Account</span>
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        ) : (
          <Dropdown menu={{ items: authMenuItems }} trigger={['click']}>
            <Button type="primary" style={{ 
              background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
              border: 'none',
              borderRadius: '12px',
              padding: '0 20px'
            }}>
              <Space>
                <LoginOutlined />
                <span>Login / Sign Up</span>
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        )}
      </Space>
    </Header>
  );
};

export default Navigation;