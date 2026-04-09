import React from 'react';
import { TrendingUp, ArrowRight } from 'lucide-react';

const gapCards = [
  { id: "rd", label: "技术研发人员", gap: "moderate", demand: 1240, supply: 980, trend: "stable", color: "var(--node-rd)" },
  { id: "mfg", label: "制造与运维人员", gap: "low", demand: 3200, supply: 2900, trend: "stable", color: "var(--node-mfg)" },
  { id: "biz", label: "国际业务人员", gap: "high", demand: 860, supply: 420, trend: "rapid", color: "var(--node-biz)" },
  { id: "support", label: "远程售后技术支持", gap: "high", demand: 720, supply: 310, trend: "rapid", color: "var(--node-support)" },
];

const gapConfig = {
  high: { text: "高缺口", color: "var(--accent-danger)" },
  moderate: { text: "中缺口", color: "var(--accent-warn)" },
  low: { text: "低缺口", color: "var(--accent-success)" }
};

export default function GapSummaryCards() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', height: '100%' }}>
      {gapCards.map(card => {
        const conf = gapConfig[card.gap];
        const percent = Math.min(100, (card.supply / card.demand) * 100);
        
        return (
          <div key={card.id} style={{
            backgroundColor: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            borderRadius: '12px',
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backdropFilter: 'blur(var(--glass-blur))',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '15px', color: 'var(--text-secondary)', fontWeight: '500' }}>
                {card.label}
              </span>
              <span style={{ 
                fontSize: '12px', 
                padding: '4px 10px', 
                borderRadius: '16px', 
                backgroundColor: `${conf.color}20`, 
                color: conf.color,
                border: `1px solid ${conf.color}50`,
                fontWeight: 'bold',
                letterSpacing: '1px'
              }}>
                {conf.text}
              </span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', margin: '20px 0' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '36px', color: card.color, lineHeight: 1 }}>
                {card.demand}
              </span>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>预测需求 (人)</span>
              
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px', color: card.trend === 'rapid' ? 'var(--accent-warn)' : 'var(--accent-primary)' }}>
                {card.trend === 'rapid' ? <TrendingUp size={18} /> : <ArrowRight size={18} />}
                <span style={{ fontSize: '12px', opacity: 0.8 }}>
                  {card.trend === 'rapid' ? '快速增长' : '稳定增长'}
                </span>
              </div>
            </div>

            <div style={{ marginTop: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                <span>当前供给: <strong style={{ color: 'var(--text-primary)' }}>{card.supply}</strong></span>
                <span>{percent.toFixed(0)}% 满足度</span>
              </div>
              <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--bg-elevated)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ 
                  width: `${percent}%`, 
                  height: '100%', 
                  backgroundColor: card.color, 
                  borderRadius: '3px',
                  boxShadow: `0 0 10px ${card.color}`
                }} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}