import { Layout } from 'antd';
import { ThemeProvider } from '../../context/ThemeContext';

const { Content, Footer } = Layout;

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Layout style={{ minHeight: '100vh', background: '#050508' }}>
            <Content style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {children}
            </Content>
            <Footer style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.4)', background: 'transparent' }}>
              Secure Portal ©{new Date().getFullYear()} Created with Next.js and Ant Design
            </Footer>
          </Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}