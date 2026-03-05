'use client';

import { useState } from 'react';
import { Layout, Typography, Form, Input, Button, Card, message, Select } from 'antd';
import { MailOutlined, UserOutlined, MessageOutlined, PhoneOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const ContactPage = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // Simulate sending contact form
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success('Message sent successfully! We\'ll get back to you soon.');
    } catch (error) {
      message.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#050508' }}>
      <Content style={{ padding: '48px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <Title level={1} style={{ color: '#fff', fontSize: '48px', marginBottom: '16px' }}>
            Get In Touch
          </Title>
          <Paragraph style={{ fontSize: '20px', color: 'rgba(255, 255, 255, 0.7)', maxWidth: '600px', margin: '0 auto' }}>
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </Paragraph>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          {/* Contact Form */}
          <Card
            style={{
              background: 'rgba(255, 255, 255, 0.045)',
              backdropFilter: 'blur(64px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '28px',
              padding: '40px'
            }}
          >
            <Title level={3} style={{ color: '#fff', marginBottom: '24px' }}>Send us a Message</Title>
            
            <Form
              name="contact"
              onFinish={onFinish}
              layout="vertical"
              size="large"
            >
              <Form.Item
                name="name"
                label={<span style={{ color: '#fff' }}>Your Name</span>}
                rules={[{ required: true, message: 'Please enter your name!' }]}
              >
                <Input 
                  prefix={<UserOutlined style={{ color: 'rgba(255,255,255,0.65)' }} />} 
                  placeholder="John Doe"
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
                label={<span style={{ color: '#fff' }}>Email Address</span>}
                rules={[
                  { required: true, message: 'Please enter your email!' },
                  { type: 'email', message: 'Please enter a valid email!' }
                ]}
              >
                <Input 
                  prefix={<MailOutlined style={{ color: 'rgba(255,255,255,0.65)' }} />} 
                  placeholder="john@example.com"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                />
              </Form.Item>

              <Form.Item
                name="subject"
                label={<span style={{ color: '#fff' }}>Subject</span>}
                rules={[{ required: true, message: 'Please enter a subject!' }]}
              >
                <Select
                  placeholder="Select a subject"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                >
                  <Option value="general">General Inquiry</Option>
                  <Option value="support">Technical Support</Option>
                  <Option value="sales">Sales Question</Option>
                  <Option value="feedback">Feedback</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="message"
                label={<span style={{ color: '#fff' }}>Message</span>}
                rules={[{ required: true, message: 'Please enter your message!' }]}
              >
                <TextArea 
                  rows={5}
                  placeholder="How can we help you?"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    color: '#fff',
                    resize: 'none'
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
                  Send Message
                </Button>
              </Form.Item>
            </Form>
          </Card>

          {/* Contact Information */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <Card
              style={{
                background: 'rgba(255, 255, 255, 0.045)',
                backdropFilter: 'blur(64px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '28px',
                padding: '40px',
                flex: 1
              }}
            >
              <Title level={3} style={{ color: '#fff', marginBottom: '24px' }}>Contact Information</Title>
              
              <div style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{ 
                    width: '50px', 
                    height: '50px', 
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '16px'
                  }}>
                    <MailOutlined style={{ fontSize: '24px', color: '#fff' }} />
                  </div>
                  <div>
                    <div style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '14px', marginBottom: '4px' }}>Email</div>
                    <div style={{ color: '#fff', fontSize: '16px' }}>support@secureportal.com</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{ 
                    width: '50px', 
                    height: '50px', 
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f59e0b 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '16px'
                  }}>
                    <PhoneOutlined style={{ fontSize: '24px', color: '#fff' }} />
                  </div>
                  <div>
                    <div style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '14px', marginBottom: '4px' }}>Phone</div>
                    <div style={{ color: '#fff', fontSize: '16px' }}>+1 (555) 123-4567</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ 
                    width: '50px', 
                    height: '50px', 
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #ec4899 0%, #f59e0b 50%, #10b981 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '16px'
                  }}>
                    <MessageOutlined style={{ fontSize: '24px', color: '#fff' }} />
                  </div>
                  <div>
                    <div style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '14px', marginBottom: '4px' }}>Live Chat</div>
                    <div style={{ color: '#fff', fontSize: '16px' }}>Available 24/7</div>
                  </div>
                </div>
              </div>

              <div style={{ 
                padding: '24px',
                background: 'rgba(99, 102, 241, 0.1)',
                borderRadius: '16px',
                border: '1px solid rgba(99, 102, 241, 0.2)'
              }}>
                <Title level={5} style={{ color: '#fff', marginBottom: '12px' }}>Response Time</Title>
                <Paragraph style={{ color: 'rgba(255, 255, 255, 0.7)', margin: 0 }}>
                  We typically respond within 2-4 business hours during weekdays. For urgent matters, please use our live chat or phone support.
                </Paragraph>
              </div>
            </Card>

            {/* Office Hours */}
            <Card
              style={{
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
                backdropFilter: 'blur(64px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '28px',
                padding: '32px'
              }}
            >
              <Title level={4} style={{ color: '#fff', marginBottom: '16px' }}>Business Hours</Title>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255, 255, 255, 0.8)' }}>
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM EST</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255, 255, 255, 0.8)' }}>
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM EST</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255, 255, 255, 0.65)' }}>
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default ContactPage;
