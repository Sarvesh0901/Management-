import { Layout, Typography, Row, Col, Button } from 'antd';
import Link from 'next/link';

const { Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

export default function HomePage() {
  return (
    <Layout style={{ minHeight: '100vh', background: '#050508' }}>
      <Content style={{ padding: '24px', marginTop: 64 }}>
        <Row justify="center">
          <Col xs={22} sm={20} md={16} lg={12}>
            <div 
              style={{ 
                background: 'rgba(255, 255, 255, 0.045)',
                backdropFilter: 'blur(64px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '28px',
                padding: '40px 30px',
                boxShadow: '0 40px 80px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
                textAlign: 'center'
              }}
            >
              <Title level={2} style={{ color: '#fff', marginBottom: '16px' }}>Welcome to Secure Portal</Title>
              <Paragraph style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '30px' }}>
                A secure platform with modern authentication and personalized dashboard
              </Paragraph>
              
              <div style={{ marginTop: '30px' }}>
                <Link href="/login" passHref>
                  <Button 
                    type="primary" 
                    size="large" 
                    style={{ 
                      marginRight: '16px',
                      background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
                      border: 'none',
                      borderRadius: '14px',
                      padding: '8px 24px',
                      fontWeight: '600'
                    }}
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/signup" passHref>
                  <Button 
                    type="default" 
                    size="large"
                    style={{ 
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '14px',
                      color: '#fff',
                      padding: '8px 24px',
                      fontWeight: '600'
                    }}
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Content>
      <Footer style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.4)', background: 'transparent' }}>
        Secure Portal ©{new Date().getFullYear()} Created with Next.js and Ant Design
      </Footer>
    </Layout>
  );
}