import React from 'react';

export default function GlassCard({ children, style, className }) {
  return (
    <div
      className={className}
      style={{
        backgroundColor: 'var(--glass-bg)',
        borderRadius: '12px',
        border: '1px solid var(--glass-border)',
        backdropFilter: 'blur(var(--glass-blur))',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}