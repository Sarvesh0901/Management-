'use client';

import { useState, useEffect } from 'react';
import { Layout, Typography, Row, Col, Tag, Skeleton, message } from 'antd';
import { MailOutlined, PhoneOutlined, CalendarOutlined } from '@ant-design/icons';
import DashboardHeader from '../../components/common/DashboardHeader';
import DashboardCard from '../../components/common/DashboardCard';
import ProtectedRoute from '../../components/ProtectedRoute';
import { useTheme } from '../../context/ThemeContext';
import { userAPI, articlesAPI } from '@/utils/api';

const { Content, Footer } = Layout;
const { Title, Text } = Typography;

interface Article {
  id: number;
  title: string;
  description: string;
  content: string;
  author: string;
  publishedAt: string;
  tags: string[];
  imageUrl?: string;
}

interface User {
  name: string;
  email: string;
  mobile: string;
  role: string;
  joinDate: string;
  avatar?: string;
}

const DashboardPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { darkMode } = useTheme();

  useEffect(() => {
    // Fetch user and articles data from backend
    const fetchData = async () => {
      try {
        // Fetch user profile
        const userData = await userAPI.getProfile();
        setUser(userData.user);
        
        // Fetch articles
        const articlesData = await articlesAPI.getArticles(1, 10);
        setArticles(articlesData.articles);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        message.error('Failed to load data. Please refresh.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  const layoutStyle = {
    minHeight: '100vh',
    background: darkMode ? '#050508' : '#ffffff'
  };

  return (
    <ProtectedRoute>
      <Layout style={layoutStyle}>
        <Content style={{ padding: '24px', marginTop: 64 }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={16}>
                <DashboardCard title="User Profile">
                  {loading ? (
                    <Skeleton active paragraph={{ rows: 3 }} />
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', padding: '16px', borderRadius: '12px', background: darkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(99, 102, 241, 0.08)' }}>
                      <div style={{ 
                        width: '60px', 
                        height: '60px', 
                        borderRadius: '50%', 
                        background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px',
                        color: 'white',
                        fontWeight: 'bold',
                        marginRight: '16px'
                      }}>
                        {user?.name.charAt(0)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <Title level={4} style={{ color: darkMode ? '#fff' : '#000000', margin: 0 }}>{user?.name}</Title>
                        <Text style={{ color: darkMode ? '#d1d5db' : '#4b5563', display: 'block', marginBottom: '4px' }}>{user?.role}</Text>
                        <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <MailOutlined style={{ color: darkMode ? '#a5b4fc' : '#4f46e5' }} />
                            <Text style={{ color: darkMode ? '#d1d5db' : '#4b5563' }}>{user?.email}</Text>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <PhoneOutlined style={{ color: darkMode ? '#a5b4fc' : '#4f46e5' }} />
                            <Text style={{ color: darkMode ? '#d1d5db' : '#4b5563' }}>{user?.mobile}</Text>
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
                          <CalendarOutlined style={{ color: darkMode ? '#a5b4fc' : '#4f46e5' }} />
                          <Text style={{ color: darkMode ? '#d1d5db' : '#4b5563' }}>Member since {user?.joinDate}</Text>
                        </div>
                      </div>
                    </div>
                  )}
                </DashboardCard>
                
                <DashboardCard title="Latest Articles" style={{ marginTop: '24px' }}>
                  {loading ? (
                    <Skeleton active paragraph={{ rows: 3 }} />
                  ) : (
                    <div>
                      {articles.slice(0, 2).map(article => (
                        <div key={article.id} style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)' }}>
                          <Title level={4} style={{ color: darkMode ? '#fff' : '#000000', marginBottom: '8px' }}>{article.title}</Title>
                          <Text style={{ color: darkMode ? '#d1d5db' : '#4b5563', display: 'block', marginBottom: '12px' }}>{article.description}</Text>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                            {article.tags.map(tag => (
                              <Tag key={tag} color="blue" style={{ color: darkMode ? '#fff' : '#000000', borderRadius: '20px' }}>{tag}</Tag>
                            ))}
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ color: darkMode ? '#9ca3af' : '#6b7280', fontSize: '12px' }}>
                              By {article.author} • {new Date(article.publishedAt).toLocaleDateString()}
                            </Text>
                            <button 
                              style={{
                                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
                                border: 'none',
                                borderRadius: '8px',
                                color: 'white',
                                padding: '6px 12px',
                                cursor: 'pointer',
                                fontSize: '12px'
                              }}
                            >
                              Read More
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </DashboardCard>
                
                <DashboardCard title="Trending Topics" style={{ marginTop: '24px' }}>
                  <Row gutter={[16, 16]}>
                    {loading ? (
                      Array.from({ length: 4 }).map((_, idx) => (
                        <Col xs={24} sm={12} key={idx}>
                          <Skeleton.Button active size="large" block />
                        </Col>
                      ))
                    ) : (
                      articles.slice(0, 4).map(article => (
                        <Col xs={24} sm={12} key={article.id}>
                          <div 
                            style={{ 
                              background: darkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(99, 102, 241, 0.08)', 
                              padding: '16px', 
                              borderRadius: '12px',
                              cursor: 'pointer',
                              transition: 'transform 0.2s, background 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = darkMode ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.2)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = darkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(99, 102, 241, 0.08)'}
                          >
                            <Text strong style={{ color: darkMode ? '#fff' : '#000000', display: 'block', marginBottom: '8px' }}>
                              {article.title.substring(0, 40)}...
                            </Text>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                              {article.tags.slice(0, 2).map(tag => (
                                <Tag key={tag} color="geekblue" style={{ color: darkMode ? '#fff' : '#000000', borderRadius: '12px', fontSize: '10px' }}>
                                  {tag}
                                </Tag>
                              ))}
                            </div>
                          </div>
                        </Col>
                      ))
                    )}
                  </Row>
                </DashboardCard>
              </Col>
              
              <Col xs={24} lg={8}>
                <DashboardCard title="Quick Stats">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ 
                      background: darkMode ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.2)', 
                      padding: '16px', 
                      borderRadius: '12px' 
                    }}>
                      <Text style={{ color: darkMode ? '#a5b4fc' : '#4f46e5', display: 'block', fontSize: '14px' }}>Total Articles</Text>
                      <Title level={3} style={{ color: darkMode ? '#fff' : '#000000', margin: '8px 0' }}>
                        {loading ? '--' : articles.length}
                      </Title>
                    </div>
                    
                    <div style={{ 
                      background: darkMode ? 'rgba(168, 85, 247, 0.15)' : 'rgba(168, 85, 247, 0.2)', 
                      padding: '16px', 
                      borderRadius: '12px' 
                    }}>
                      <Text style={{ color: darkMode ? '#c4b5fd' : '#7c3aed', display: 'block', fontSize: '14px' }}>Reading Time</Text>
                      <Title level={3} style={{ color: darkMode ? '#fff' : '#000000', margin: '8px 0' }}>
                        {loading ? '--' : `${Math.ceil(articles.length * 3.5)} min`}
                      </Title>
                    </div>
                    
                    <div style={{ 
                      background: darkMode ? 'rgba(236, 72, 153, 0.15)' : 'rgba(236, 72, 153, 0.2)', 
                      padding: '16px', 
                      borderRadius: '12px' 
                    }}>
                      <Text style={{ color: darkMode ? '#f0abfc' : '#db2777', display: 'block', fontSize: '14px' }}>Bookmarks</Text>
                      <Title level={3} style={{ color: darkMode ? '#fff' : '#000000', margin: '8px 0' }}>
                        {loading ? '--' : `${Math.floor(articles.length * 1.2)}`}
                      </Title>
                    </div>
                  </div>
                </DashboardCard>
                
                <DashboardCard title="Popular Tags" style={{ marginTop: '24px' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {['Next.js', 'TypeScript', 'React', 'CSS', 'JavaScript', 'Web Design', 'UI/UX', 'Frontend'].map(tag => (
                      <Tag 
                        key={tag} 
                        color="purple" 
                        style={{ 
                          color: darkMode ? '#fff' : '#000000', 
                          borderRadius: '20px',
                          cursor: 'pointer',
                          transition: 'transform 0.2s'
                        }}
                        onClick={() => console.log(`Clicked on tag: ${tag}`)}
                      >
                        #{tag}
                      </Tag>
                    ))}
                  </div>
                </DashboardCard>
              </Col>
            </Row>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', color: darkMode ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)', background: 'transparent' }}>
          Secure Portal ©{new Date().getFullYear()} - Dashboard
        </Footer>
      </Layout>
    </ProtectedRoute>
  );
};

export default DashboardPage;