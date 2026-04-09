import React from 'react';

const tags = [
  { label: "跨境合规", weight: 9, color: "var(--node-skill-gap)" },
  { label: "海外客户拓展", weight: 8, color: "var(--node-skill-gap)" },
  { label: "马来语", weight: 8, color: "var(--node-skill-gap)" },
  { label: "远程诊断", weight: 7, color: "var(--node-skill-gap)" },
  { label: "供应链管理", weight: 7, color: "var(--accent-warn)" },
  { label: "跨文化沟通", weight: 6, color: "var(--accent-warn)" },
  { label: "IoT协议", weight: 6, color: "var(--node-skill-gap)" },
  { label: "AI算法", weight: 5, color: "var(--node-skill)" },
  { label: "数据分析", weight: 5, color: "var(--node-skill)" },
  { label: "PLC编程", weight: 4, color: "var(--node-skill)" },
  { label: "系统集成", weight: 4, color: "var(--node-skill)" },
];

export default function SkillTagCloud() {
  return (
    <div style={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      gap: '16px', 
      alignItems: 'center', 
      padding: '12px 0' 
    }}>
      {tags.map((tag, idx) => {
        // 字体大小范围：12px ~ 28px
        const fontSize = 12 + (tag.weight - 4) * 3.2; 
        // 缺口越高的技能，透明度越高
        const opacity = 0.6 + (tag.weight / 10) * 0.4;
        
        return (
          <span 
            key={idx} 
            style={{
              fontSize: `${fontSize}px`,
              color: tag.color,
              opacity: opacity,
              padding: '6px 16px',
              backgroundColor: 'var(--bg-elevated)',
              borderRadius: '24px',
              border: `1px solid ${tag.color}40`,
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              userSelect: 'none',
              fontWeight: tag.weight >= 7 ? 'bold' : 'normal',
              boxShadow: `0 4px 12px ${tag.color}15`
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
              e.currentTarget.style.borderColor = tag.color;
              e.currentTarget.style.boxShadow = `0 6px 16px ${tag.color}30`;
              e.currentTarget.style.opacity = '1';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.borderColor = `${tag.color}40`;
              e.currentTarget.style.boxShadow = `0 4px 12px ${tag.color}15`;
              e.currentTarget.style.opacity = opacity.toString();
            }}
          >
            {tag.label}
          </span>
        );
      })}
    </div>
  );
}