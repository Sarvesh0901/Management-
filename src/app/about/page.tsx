'use client';

import { Layout, Typography, Card, Row, Col } from 'antd';
import { 
  SecurityScanOutlined, 
  DashboardOutlined, 
  UsergroupAddOutlined, 
  ThunderboltOutlined,
  CheckCircleOutlined,
  RocketOutlined
} from '@ant-design/icons';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const AboutPage = () => {
  const features = [
    {
      icon: <SecurityScanOutlined style={{ fontSize: '48px', color: '#6366f1' }} />,
      title: 'Secure Authentication',
      description: 'Industry-standard security protocols to keep your data safe and protected.'
    },
    {
      icon: <DashboardOutlined style={{ fontSize: '48px', color: '#a855f7' }} />,
      title: 'Intuitive Dashboard',
      description: 'Clean, modern interface designed for optimal user experience and productivity.'
    },
    {
      icon: <UsergroupAddOutlined style={{ fontSize: '48px', color: '#ec4899' }} />,
      title: 'Team Collaboration',
      description: 'Built for teams of all sizes with powerful collaboration features.'
    },
    {
      icon: <ThunderboltOutlined style={{ fontSize: '48px', color: '#f59e0b' }} />,
      title: 'Lightning Fast',
      description: 'Optimized performance ensuring quick load times and smooth interactions.'
    },
    {
      icon: <CheckCircleOutlined style={{ fontSize: '48px', color: '#10b981' }} />,
      title: 'Reliable',
      description: '99.9% uptime guarantee with automatic backups and disaster recovery.'
    },
    {
      icon: <RocketOutlined style={{ fontSize: '48px', color: '#3b82f6' }} />,
      title: 'Scalable',
      description: 'Grows with your needs, from startups to enterprise-level organizations.'
    }
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#050508' }}>
      <Content style={{ padding: '48px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <Title level={1} style={{ color: '#fff', fontSize: '48px', marginBottom: '16px' }}>
            About Secure Portal
          </Title>
          <Paragraph style={{ fontSize: '20px', color: 'rgba(255, 255, 255, 0.7)', maxWidth: '800px', margin: '0 auto' }}>
            We're on a mission to provide the most secure and user-friendly platform for teams to collaborate and achieve more.
          </Paragraph>
        </div>

        {/* Features Grid */}
        <Row gutter={[32, 32]} style={{ marginBottom: '64px' }}>
          {features.map((feature, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <Card
                hoverable
                style={{
                  height: '100%',
                  background: 'rgba(255, 255, 255, 0.045)',
                  backdropFilter: 'blur(64px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '20px',
                  textAlign: 'center',
                  padding: '32px 24px'
                }}
              >
                <div style={{ marginBottom: '20px' }}>{feature.icon}</div>
                <Title level={4} style={{ color: '#fff', marginBottom: '12px' }}>
                  {feature.title}
                </Title>
                <Paragraph style={{ color: 'rgba(255, 255, 255, 0.65)' }}>
                  {feature.description}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Story Section */}
        <Card
          style={{
            background: 'rgba(255, 255, 255, 0.045)',
            backdropFilter: 'blur(64px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '28px',
            padding: '48px',
            marginBottom: '48px'
          }}
        >
          <Title level={2} style={{ color: '#fff', marginBottom: '24px' }}>Our Story</Title>
          <Paragraph style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.8' }}>
            Founded in 2024, Secure Portal emerged from a simple observation: teams needed a platform that combined 
            enterprise-grade security with an intuitive, modern user experience. We saw too many organizations 
            struggling with clunky, outdated tools that made collaboration difficult and compromised on security.
          </Paragraph>
          <Paragraph style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.8' }}>
            Our team of experienced engineers and designers set out to build something different—a platform that 
            doesn't force you to choose between security and usability. The result is Secure Portal: a powerful, 
            flexible solution that adapts to your workflow while keeping your data protected with cutting-edge 
            encryption and authentication technologies.
          </Paragraph>
          <Paragraph style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.8' }}>
            Today, we serve thousands of users worldwide, from small startups to large enterprises. We're committed 
            to continuous innovation, regularly releasing new features based on user feedback and emerging security 
            best practices.
          </Paragraph>
        </Card>

        {/* Stats Section */}
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} md={6}>
            <Card
              style={{
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                textAlign: 'center',
                padding: '32px 24px'
              }}
            >
              <Title level={2} style={{ color: '#fff', margin: '0', fontSize: '48px' }}>10K+</Title>
              <Paragraph style={{ color: 'rgba(255, 255, 255, 0.7)', margin: '8px 0 0 0' }}>Active Users</Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card
              style={{
                background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(236, 72, 153, 0.15) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                textAlign: 'center',
                padding: '32px 24px'
              }}
            >
              <Title level={2} style={{ color: '#fff', margin: '0', fontSize: '48px' }}>99.9%</Title>
              <Paragraph style={{ color: 'rgba(255, 255, 255, 0.7)', margin: '8px 0 0 0' }}>Uptime SLA</Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card
              style={{
                background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(245, 158, 11, 0.15) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                textAlign: 'center',
                padding: '32px 24px'
              }}
            >
              <Title level={2} style={{ color: '#fff', margin: '0', fontSize: '48px' }}>50+</Title>
              <Paragraph style={{ color: 'rgba(255, 255, 255, 0.7)', margin: '8px 0 0 0' }}>Countries</Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card
              style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                textAlign: 'center',
                padding: '32px 24px'
              }}
            >
              <Title level={2} style={{ color: '#fff', margin: '0', fontSize: '48px' }}>24/7</Title>
              <Paragraph style={{ color: 'rgba(255, 255, 255, 0.7)', margin: '8px 0 0 0' }}>Support</Paragraph>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default AboutPage;
