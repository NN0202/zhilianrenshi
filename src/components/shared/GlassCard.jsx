import React from 'react';

export default function GlassCard({ children, style, className }) {
  return (
    <div
      className={className}
      style={{
        backgroundColor: 'var(--glass-bg)',
        borderRadius: '24px',
        border: '1px solid var(--glass-border)',
        backdropFilter: 'blur(var(--glass-blur))',
        boxShadow: 'var(--shadow-soft)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
