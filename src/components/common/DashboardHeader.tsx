'use client';

import { Layout, Typography, Space, Dropdown, Avatar, Button, MenuProps } from 'antd';
import { UserOutlined, LogoutOutlined, DownOutlined, SettingOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { isAuthenticated, logout } from '@/utils/auth';
import ThemeSwitcher from '../ThemeSwitcher';
import { useTheme } from '@/context/ThemeContext';

const { Header } = Layout;
const { Title } = Typography;

interface DashboardHeaderProps {
  title: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { darkMode } = useTheme();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const userMenuItems: MenuProps['items'] = [
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
  ];

  const headerStyle = {
    background: darkMode ? 'rgba(255, 255, 255, 0.045)' : 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(64px)',
    borderBottom: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)'
  };
  
  const textStyle = {
    color: darkMode ? 'white' : '#000000'
  };

  return (
    <Header className="flex justify-between items-center px-4" style={headerStyle}>
      <div className="logo" style={{ ...textStyle, fontSize: '18px', fontWeight: 'bold' }}>
        Secure Portal
      </div>
      <Space>
        <Title level={3} style={{ margin: 0, ...textStyle }}>
          {title}
        </Title>
        <ThemeSwitcher />
        {isAuthenticated() && (
          <Dropdown menu={{ items: userMenuItems }} trigger={['click']}>
            <Button type="text" style={{ color: 'white' }}>
              <Space>
                <Avatar size="small" icon={<UserOutlined />} style={{ backgroundColor: '#6366f1' }} />
                <span>Account</span>
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        )}
      </Space>
    </Header>
  );
};

export default DashboardHeader;