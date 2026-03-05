'use client';

import { useState } from 'react';
import { Layout, Typography, Form, Input, Button, Card, Row, Col, message } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined, PhoneOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { register } from '@/utils/auth';

const { Content } = Layout;
const { Title, Text } = Typography;

const SignupPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // Simulate registration
      await register(values.email, values.password);
      message.success('Account created successfully! Please login.');
      router.push('/login');
    } catch (error) {
      message.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#050508' }}>
      <Content style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: '24px'
      }}>
        <Card 
          style={{ 
            maxWidth: '500px', 
            width: '100%',
            background: 'rgba(255, 255, 255, 0.045)',
            backdropFilter: 'blur(64px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '28px',
            boxShadow: '0 40px 80px rgba(0, 0, 0, 0.5)'
          }}
        >
          <Title level={2} style={{ textAlign: 'center', color: '#fff', marginBottom: '30px' }}>
            Create Account
          </Title>
          
          <Form
            name="signup"
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Please enter your name!' }]}
            >
              <Input 
                prefix={<UserOutlined style={{ color: 'rgba(255,255,255,0.65)' }} />} 
                placeholder="Full Name"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: '#fff'
                }}
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please enter your email!' },
                { type: 'email', message: 'Please enter a valid email!' }
              ]}
            >
              <Input 
                prefix={<MailOutlined style={{ color: 'rgba(255,255,255,0.65)' }} />} 
                placeholder="Email Address"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: '#fff'
                }}
              />
            </Form.Item>

            <Form.Item
              name="mobile"
              rules={[{ required: true, message: 'Please enter your mobile number!' }]}
            >
              <Input 
                prefix={<PhoneOutlined style={{ color: 'rgba(255,255,255,0.65)' }} />} 
                placeholder="Mobile Number"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: '#fff'
                }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please enter your password!' },
                { min: 6, message: 'Password must be at least 6 characters!' }
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: 'rgba(255,255,255,0.65)' }} />}
                placeholder="Password"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: '#fff'
                }}
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match!'));
                  },
                }),
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: 'rgba(255,255,255,0.65)' }} />}
                placeholder="Confirm Password"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: '#fff'
                }}
              />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                block
                size="large"
                style={{ 
                  background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
                  border: 'none',
                  borderRadius: '14px',
                  height: '50px',
                  fontWeight: '600',
                  fontSize: '16px'
                }}
              >
                Sign Up
              </Button>
            </Form.Item>

            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <Text style={{ color: 'rgba(255, 255, 255, 0.65)' }}>
                Already have an account?{' '}
                <Link href="/login" style={{ color: '#6366f1', textDecoration: 'none' }}>
                  Login here
                </Link>
              </Text>
            </div>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};

export default SignupPage;
