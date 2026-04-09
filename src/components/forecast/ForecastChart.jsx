import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockForecastData } from '../../api/mockData';

export default function ForecastChart() {
  // 定义渐变色 ID
  const gradients = [
    { id: "colorRd", color: "var(--node-rd)" },
    { id: "colorMfg", color: "var(--node-mfg)" },
    { id: "colorBiz", color: "var(--node-biz)" },
    { id: "colorSupport", color: "var(--node-support)" },
  ];

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={mockForecastData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            {gradients.map(grad => (
              <linearGradient key={grad.id} id={grad.id} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={grad.color} stopOpacity={0.4} />
                <stop offset="95%" stopColor={grad.color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" vertical={false} />
          <XAxis 
            dataKey="year" 
            stroke="var(--text-muted)" 
            tick={{ fill: 'var(--text-secondary)', fontSize: 13, fontFamily: 'var(--font-display)' }} 
            tickMargin={10}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            stroke="var(--text-muted)" 
            tick={{ fill: 'var(--text-secondary)', fontSize: 13, fontFamily: 'var(--font-display)' }} 
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(15, 32, 64, 0.9)', 
              border: '1px solid var(--glass-border)', 
              borderRadius: '8px',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
            }}
            itemStyle={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: '500' }}
            labelStyle={{ color: 'var(--text-secondary)', marginBottom: '8px', fontFamily: 'var(--font-display)' }}
            formatter={(value, name) => [`${value} 人`, name]}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }} 
            iconType="circle"
          />
          <Area type="monotone" dataKey="rd" name="技术研发" stroke="var(--node-rd)" fillOpacity={1} fill="url(#colorRd)" strokeWidth={3} activeDot={{ r: 6, strokeWidth: 0, fill: "var(--node-rd)" }} />
          <Area type="monotone" dataKey="mfg" name="制造运维" stroke="var(--node-mfg)" fillOpacity={1} fill="url(#colorMfg)" strokeWidth={3} activeDot={{ r: 6, strokeWidth: 0, fill: "var(--node-mfg)" }} />
          <Area type="monotone" dataKey="biz" name="国际业务" stroke="var(--node-biz)" fillOpacity={1} fill="url(#colorBiz)" strokeWidth={3} activeDot={{ r: 6, strokeWidth: 0, fill: "var(--node-biz)" }} />
          <Area type="monotone" dataKey="support" name="远程售后" stroke="var(--node-support)" fillOpacity={1} fill="url(#colorSupport)" strokeWidth={3} activeDot={{ r: 6, strokeWidth: 0, fill: "var(--node-support)" }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}