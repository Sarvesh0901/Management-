'use client';

import { useTheme } from '@/context/ThemeContext';

interface DashboardCardProps {
  title?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, children, style }) => {
  const { darkMode } = useTheme();
  
  const cardStyle = {
    background: darkMode ? 'rgba(255, 255, 255, 0.045)' : '#ffffff',
    backdropFilter: 'blur(64px)',
    border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
    borderRadius: '28px',
    padding: title ? '32px' : '24px',
    boxShadow: darkMode 
      ? '0 40px 80px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08)' 
      : '0 4px 12px rgba(0, 0, 0, 0.05)',
    ...style
  };
  
  const titleStyle = {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '20px',
    fontWeight: 600,
    color: darkMode ? '#fff' : '#000000',
    marginBottom: '24px',
    letterSpacing: '-0.5px',
  };

  return (
    <div style={cardStyle}>
      {title && (
        <h3 style={titleStyle}>
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};

export default DashboardCard;