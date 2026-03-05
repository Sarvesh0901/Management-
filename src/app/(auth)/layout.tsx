import { Layout } from 'antd';
import { ThemeProvider } from '../../context/ThemeContext';

const { Content } = Layout;

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Layout style={{ minHeight: '100vh' }}>
            {/* No Navigation component - hidden on auth pages */}
            <Content style={{ padding: '0', margin: '0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {children}
            </Content>
          </Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}