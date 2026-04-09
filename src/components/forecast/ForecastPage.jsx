import React from 'react';
import GapSummaryCards from "./GapSummaryCards";
import ForecastChart from "./ForecastChart";
import SkillTagCloud from "./SkillTagCloud";
import { useNavigate } from "react-router-dom";
import { useTalentStore } from "../../store/talentStore";
import { ArrowRight } from "lucide-react";

export default function ForecastPage() {
  const navigate = useNavigate();
  const setGapFilter = useTalentStore(state => state.setGapFilter);

  const handleNavigateToGraph = () => {
    // 触发点：联动A 缺口预测 → 图谱（高亮缺口岗位）
    setGapFilter('high');
    navigate('/graph');
  };

  return (
    <div style={{ 
      padding: '24px 32px', 
      maxWidth: '1440px', 
      margin: '0 auto', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '24px' 
    }}>
      {/* 页面头部 */}
      <header>
        <h1 style={{ fontFamily: 'var(--font-display)', margin: 0, fontSize: '28px', letterSpacing: '1px' }}>
          人才缺口预测
        </h1>
        <p style={{ color: 'var(--text-secondary)', margin: '8px 0 0 0', fontSize: '14px' }}>
          湖州高新区 · 智能物流人才需求预测
        </p>
      </header>

      {/* 核心数据区 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '24px' }}>
        {/* 左侧：四类人才缺口卡片 (2列×2行) */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <GapSummaryCards />
        </div>
        
        {/* 右侧：主图表区域 */}
        <div style={{ 
          backgroundColor: 'var(--glass-bg)', 
          borderRadius: '12px', 
          padding: '24px', 
          border: '1px solid var(--glass-border)',
          backdropFilter: 'blur(var(--glass-blur))'
        }}>
          <h2 style={{ fontSize: '16px', margin: '0 0 20px 0', color: 'var(--text-primary)', fontWeight: 'normal' }}>
            2024-2030 预测趋势
          </h2>
          <ForecastChart />
        </div>
      </div>

      {/* 底部：技能缺口标签云 */}
      <div style={{ 
        backgroundColor: 'var(--glass-bg)', 
        borderRadius: '12px', 
        padding: '24px', 
        border: '1px solid var(--glass-border)',
        backdropFilter: 'blur(var(--glass-blur))'
      }}>
        <h2 style={{ fontSize: '16px', margin: '0 0 16px 0', color: 'var(--text-primary)', fontWeight: 'normal' }}>
          紧缺技能标签云
        </h2>
        <SkillTagCloud />
      </div>

      {/* 底部联动说明与跳转按钮 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
        <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
          * 数据来源：企业ERP系统及当地人社局历年统计数据
        </span>
        <button 
          onClick={handleNavigateToGraph}
          style={{
            backgroundColor: 'var(--accent-primary)',
            color: '#050d1a',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            transition: 'opacity 0.2s, transform 0.1s'
          }}
          onMouseOver={e => e.currentTarget.style.opacity = '0.9'}
          onMouseOut={e => e.currentTarget.style.opacity = '1'}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          在人才图谱中查看当前人才分布
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}