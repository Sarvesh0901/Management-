'use client';

import { useState, useEffect } from 'react';
import { Layout, Typography, Row, Col, Tag, Skeleton, message } from 'antd';
import { useRouter } from 'next/navigation';
import DashboardHeader from '../../components/common/DashboardHeader';
import DashboardCard from '../../components/common/DashboardCard';
import ProtectedRoute from '../../components/ProtectedRoute';
import { useTheme } from '../../context/ThemeContext';
import { articlesAPI } from '@/utils/api';

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

const DashboardPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const { darkMode } = useTheme();
  const router = useRouter();

  useEffect(() => {
    // Fetch articles data from backend
    const fetchData = async () => {
      try {
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
                <DashboardCard title="Latest Articles">
                  {loading ? (
                    <Skeleton active paragraph={{ rows: 3 }} />
                  ) : (
                    <div>
                      {articles.slice(0, 2).map(article => (
                        <div 
                          key={article.id} 
                          style={{ 
                            marginBottom: '20px', 
                            paddingBottom: '20px', 
                            borderBottom: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid #eaeaea',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <Title 
                            level={4} 
                            style={{ 
                              color: darkMode ? '#fff' : '#000000', 
                              marginBottom: '12px', 
                              fontWeight: 600,
                              cursor: 'pointer',
                              transition: 'color 0.2s ease'
                            }}
                            onClick={() => router.push(`/dashboard/documentation/${article.id}`)}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = darkMode ? '#a5b4fc' : '#4f46e5';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = darkMode ? '#fff' : '#000000';
                            }}
                          > 
                            {article.title}
                          </Title>
                          <Text style={{ color: darkMode ? '#a1a1aa' : '#666', display: 'block', marginBottom: '16px', lineHeight: 1.6 }}> 
                            {article.description}
                          </Text>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}> 
                            {article.tags.map(tag => (
                              <Tag 
                                key={tag} 
                                color={darkMode ? 'rgba(99, 102, 241, 0.15)' : '#f3f4f6'} 
                                style={{ 
                                  color: darkMode ? '#a5b4fc' : '#4f46e5', 
                                  borderRadius: '6px',
                                  border: 'none',
                                  padding: '4px 12px',
                                  fontSize: '13px',
                                  fontWeight: 500,
                                  cursor: 'pointer',
                                  transition: 'all 0.2s ease'
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  console.log(`Tag clicked: ${tag}`);
                                  if (typeof window !== 'undefined') {
                                    alert(`You clicked on tag: ${tag}\n\nThis could filter articles by this tag.`);
                                  }
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = darkMode ? 'rgba(99, 102, 241, 0.25)' : 'rgba(99, 102, 241, 0.15)';
                                  e.currentTarget.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = darkMode ? 'rgba(99, 102, 241, 0.15)' : '#f3f4f6';
                                  e.currentTarget.style.transform = 'translateY(0)';
                                }}
                              >
                                {tag}
                              </Tag>
                            ))}
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> 
                            <Text style={{ color: darkMode ? '#71717a' : '#9ca3af', fontSize: '13px' }}>
                              By <span style={{ color: darkMode ? '#a1a1aa' : '#4b5563', fontWeight: 500 }}>{article.author}</span> • {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </Text>
                            <button 
                              style={{
                                background: darkMode ? '#fff' : '#000',
                                border: 'none',
                                borderRadius: '8px',
                                color: darkMode ? '#000' : '#fff',
                                padding: '8px 16px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: 500,
                                transition: 'all 0.2s ease'
                              }}
                              onClick={() => router.push(`/dashboard/documentation/${article.id}`)}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                              }}
                            >
                              Read More →
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
                              background: darkMode ? 'rgba(255, 255, 255, 0.04)' : 'rgba(243, 244, 246, 0.8)', 
                              padding: '20px', 
                              borderRadius: '12px',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              border: darkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid #e5e7eb'
                            }}
                            onClick={() => router.push(`/dashboard/documentation/${article.id}`)}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = darkMode ? 'rgba(99, 102, 241, 0.1)' : 'rgba(249, 250, 251, 1)';
                              e.currentTarget.style.transform = 'translateY(-2px)';
                              e.currentTarget.style.boxShadow = darkMode ? '0 8px 24px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.05)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = darkMode ? 'rgba(255, 255, 255, 0.04)' : 'rgba(243, 244, 246, 0.8)';
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = 'none';
                            }}
                          >
                            <Text 
                              strong 
                              style={{ 
                                color: darkMode ? '#fff' : '#000000', 
                                display: 'block', 
                                marginBottom: '12px', 
                                fontSize: '15px', 
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'color 0.2s ease'
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(`/dashboard/documentation/${article.id}`);
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color = darkMode ? '#a5b4fc' : '#4f46e5';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.color = darkMode ? '#fff' : '#000000';
                              }}
                            >
                              {article.title.substring(0, 40)}...
                            </Text>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}> 
                              {article.tags.slice(0, 2).map(tag => (
                                <Tag 
                                  key={tag} 
                                  color={darkMode ? 'rgba(168, 85, 247, 0.15)' : '#ede9fe'} 
                                  style={{ 
                                    color: darkMode ? '#c4b5fd' : '#7c3aed', 
                                    borderRadius: '6px',
                                    border: 'none',
                                    fontSize: '11px',
                                    fontWeight: 500,
                                    padding: '2px 8px'
                                  }}
                                >
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