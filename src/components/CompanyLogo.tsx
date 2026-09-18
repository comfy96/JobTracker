import React from 'react';

interface CompanyLogoProps {
  company: string;
  size?: number;
  className?: string;
}

export const CompanyLogo: React.FC<CompanyLogoProps> = ({
  company,
  size = 40,
  className = '',
}) => {
  const normalized = company.trim().toLowerCase();

  // Known brand SVG rendering
  if (normalized.includes('vercel')) {
    return (
      <div
        className={`company-logo-badge bg-black text-white ${className}`}
        style={{
          width: size,
          height: size,
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 76 65" fill="none">
          <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="currentColor" />
        </svg>
      </div>
    );
  }

  if (normalized.includes('stripe')) {
    return (
      <div
        className={`company-logo-badge ${className}`}
        style={{
          width: size,
          height: size,
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #635BFF 0%, #4F46E5 100%)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 800,
          fontSize: `${size * 0.45}px`,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          boxShadow: '0 2px 8px rgba(99, 91, 255, 0.25)',
        }}
      >
        S
      </div>
    );
  }

  if (normalized.includes('linear')) {
    return (
      <div
        className={`company-logo-badge ${className}`}
        style={{
          width: size,
          height: size,
          borderRadius: '10px',
          background: '#5E6AD2',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 100 100" fill="none">
          <path
            d="M1.2257 60.3129C-0.344497 58.7427 -0.344497 56.1951 1.2257 54.6249L54.6249 1.2257C56.1951 -0.344497 58.7427 -0.344497 60.3129 1.2257L98.7743 39.6871C100.344 41.2573 100.344 43.8049 98.7743 45.3751L45.3751 98.7743C43.8049 100.344 41.2573 100.344 39.6871 98.7743L1.2257 60.3129Z"
            fill="currentColor"
          />
        </svg>
      </div>
    );
  }

  if (normalized.includes('figma')) {
    return (
      <div
        className={`company-logo-badge ${className}`}
        style={{
          width: size,
          height: size,
          borderRadius: '10px',
          background: '#000000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width={size * 0.5} height={size * 0.55} viewBox="0 0 38 57" fill="none">
          <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38H19V28.5Z" fill="#1ABCFE" />
          <path d="M0 47.5C0 42.2533 4.2533 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.2533 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
          <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.2533 33.7467 0 28.5 0H19Z" fill="#FF7262" />
          <path d="M0 9.5C0 14.7467 4.2533 19 9.5 19H19V0H9.5C4.2533 0 0 4.2533 0 9.5Z" fill="#F24E1E" />
          <path d="M0 28.5C0 33.7467 4.2533 38 9.5 38H19V19H9.5C4.2533 19 0 23.2533 0 28.5Z" fill="#A259FF" />
        </svg>
      </div>
    );
  }

  if (normalized.includes('google')) {
    return (
      <div
        className={`company-logo-badge ${className}`}
        style={{
          width: size,
          height: size,
          borderRadius: '10px',
          background: '#FFFFFF',
          border: '1px solid #E5E7EB',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
        </svg>
      </div>
    );
  }

  if (normalized.includes('apple')) {
    return (
      <div
        className={`company-logo-badge ${className}`}
        style={{
          width: size,
          height: size,
          borderRadius: '10px',
          background: '#000000',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width={size * 0.45} height={size * 0.5} viewBox="0 0 170 170" fill="currentColor">
          <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.33.13-9.13-1.9-14.4-6.07-3.52-2.81-7.49-7.55-11.92-14.23-8.06-12.18-14.07-25.75-18.04-40.71-3.97-14.96-5.96-28.79-5.96-41.48 0-16.73 4.13-30.73 12.39-42 8.26-11.27 18.84-17.02 31.75-17.25 5.86 0 11.75 1.39 17.67 4.17 5.92 2.78 10.02 4.22 12.3 4.32 2.05.07 6.32-1.39 12.82-4.38 6.5-2.99 12.27-4.34 17.31-4.05 13.55.77 24.31 5.67 32.27 14.7-11.83 7.15-17.6 17.07-17.3 29.76.3 10.15 4.3 18.66 12 25.53 7.7 6.87 16.59 10.74 26.68 11.61-2.48 7.37-5.97 15.54-10.47 24.51zM119.22 31.81c0-7.39 2.74-14.47 8.22-21.24 5.48-6.77 12.36-10.57 20.64-11.4 1.03 8.35-1.9 16.03-7.53 23.04-5.63 7.01-12.75 10.87-21.33 11.58-.2-1.2-.3-2.1-.3-2.7.01-.43 0-.85 0-1.28z" />
        </svg>
      </div>
    );
  }

  // Fallback Monogram Avatar Generator
  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const palettes = [
    { bg: '#EEEDFF', text: '#635BFF', border: '#D4D0FF' },
    { bg: '#EFF6FF', text: '#2563EB', border: '#BFDBFE' },
    { bg: '#F5F3FF', text: '#7C3AED', border: '#DDD6FE' },
    { bg: '#ECFDF5', text: '#059669', border: '#A7F3D0' },
    { bg: '#FFF7ED', text: '#EA580C', border: '#FFEDD5' },
    { bg: '#FDF2F8', text: '#DB2777', border: '#FBCFE8' },
    { bg: '#F0FDFA', text: '#0D9488', border: '#99F6E4' },
  ];

  let hash = 0;
  for (let i = 0; i < company.length; i++) {
    hash = company.charCodeAt(i) + ((hash << 5) - hash);
  }
  const paletteIndex = Math.abs(hash) % palettes.length;
  const theme = palettes[paletteIndex];

  return (
    <div
      className={`company-logo-badge ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: '12px',
        backgroundColor: theme.bg,
        color: theme.text,
        border: `1px solid ${theme.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontSize: `${size * 0.38}px`,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        flexShrink: 0,
      }}
    >
      {getInitials(company)}
    </div>
  );
};
