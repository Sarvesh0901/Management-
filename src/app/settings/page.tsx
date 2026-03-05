'use client';

import { Layout, Switch, Slider, Select, Radio, Space } from 'antd';
import { useState, useEffect } from 'react';
import { UserOutlined, MailOutlined, LockOutlined, BellOutlined, GlobalOutlined } from '@ant-design/icons';
import DashboardHeader from '../../components/common/DashboardHeader';
import DashboardCard from '../../components/common/DashboardCard';
import ProtectedRoute from '../../components/ProtectedRoute';
import { useTheme } from '../../context/ThemeContext';

const { Content, Footer } = Layout;
const { Option } = Select;

const SettingsPage = () => {
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('en');
  const [privacy, setPrivacy] = useState('public');
  const { darkMode, toggleTheme } = useTheme();

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  const layoutStyle = {
    minHeight: '100vh',
    background: darkMode ? '#050508' : '#ffffff'
  };

  return (
    <ProtectedRoute>
      <Layout style={layoutStyle}>
        <Content style={{ padding: '24px', marginTop: 64 }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <DashboardCard title="Account Settings">
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ color: darkMode ? '#fff' : '#000000', marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                  <UserOutlined style={{ marginRight: '8px' }} /> Profile Information
                </h4>
                <div style={{ background: darkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(99, 102, 241, 0.08)', padding: '16px', borderRadius: '14px' }}>
                  <p style={{ color: darkMode ? '#d1d5db' : '#4b5563', margin: '8px 0' }}><strong>Name:</strong> John Doe</p>
                  <p style={{ color: darkMode ? '#d1d5db' : '#4b5563', margin: '8px 0' }}><strong>Email:</strong> john@example.com</p>
                  <p style={{ color: darkMode ? '#d1d5db' : '#4b5563', margin: '8px 0' }}><strong>Member since:</strong> January 1, 2024</p>
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ color: darkMode ? '#fff' : '#000000', marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                  <LockOutlined style={{ marginRight: '8px' }} /> Security
                </h4>
                <div style={{ background: darkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(99, 102, 241, 0.08)', padding: '16px', borderRadius: '14px' }}>
                  <p style={{ color: darkMode ? '#d1d5db' : '#4b5563', margin: '8px 0' }}>Password: ********</p>
                  <button 
                    style={{
                      background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white',
                      padding: '8px 16px',
                      cursor: 'pointer',
                      marginTop: '8px'
                    }}
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </DashboardCard>

            <DashboardCard title="Preferences" style={{ marginTop: '24px' }}>
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ color: darkMode ? '#fff' : '#000000', marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                  <BellOutlined style={{ marginRight: '8px' }} /> Notifications
                </h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: darkMode ? '#d1d5db' : '#4b5563' }}>Enable notifications</span>
                  <Switch checked={notifications} onChange={setNotifications} />
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ color: '#fff', marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                  <GlobalOutlined style={{ marginRight: '8px' }} /> Language & Region
                </h4>
                <Select 
                  defaultValue={language} 
                  onChange={(value) => setLanguage(value)}
                  style={{ width: '100%', background: darkMode ? 'rgba(255, 255, 255, 0.06)' : '#ffffff', borderRadius: '8px' }}
                  className="custom-select"
                >
                  <Option value="en">English</Option>
                  <Option value="es">Spanish</Option>
                  <Option value="fr">French</Option>
                  <Option value="de">German</Option>
                </Select>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ color: darkMode ? '#fff' : '#000000', marginBottom: '12px' }}>Theme</h4>
                <Radio.Group 
                  value={darkMode ? 'dark' : 'light'} 
                  onChange={(e) => {
                    const newTheme = e.target.value === 'dark';
                    if (newTheme !== darkMode) {
                      toggleTheme();
                    }
                  }}
                  style={{ display: 'flex', gap: '16px' }}
                >
                  <Radio.Button value="light" style={{ background: darkMode ? 'rgba(255, 255, 255, 0.06)' : '#ffffff', borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : '#e5e7eb', color: darkMode ? '#fff' : '#000000' }}>Light</Radio.Button>
                  <Radio.Button value="dark" style={{ background: darkMode ? 'rgba(255, 255, 255, 0.06)' : '#ffffff', borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : '#e5e7eb', color: darkMode ? '#fff' : '#000000' }}>Dark</Radio.Button>
                </Radio.Group>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ color: darkMode ? '#fff' : '#000000', marginBottom: '12px' }}>Privacy</h4>
                <Radio.Group 
                  value={privacy} 
                  onChange={(e) => setPrivacy(e.target.value)}
                  style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
                >
                  <Radio value="public" style={{ color: darkMode ? '#d1d5db' : '#4b5563' }}>Public - Anyone can see my profile</Radio>
                  <Radio value="friends" style={{ color: darkMode ? '#d1d5db' : '#4b5563' }}>Friends only - Only friends can see my profile</Radio>
                  <Radio value="private" style={{ color: darkMode ? '#d1d5db' : '#4b5563' }}>Private - Only I can see my profile</Radio>
                </Radio.Group>
              </div>
            </DashboardCard>

            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <button 
                onClick={handleSave}
                style={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
                  border: 'none',
                  borderRadius: '14px',
                  color: 'white',
                  padding: '12px 24px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  width: '200px'
                }}
              >
                Save Settings
              </button>
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', color: darkMode ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)', background: 'transparent' }}>
          Secure Portal ©{new Date().getFullYear()} - Settings
        </Footer>
      </Layout>
    </ProtectedRoute>
  );
};

export default SettingsPage;