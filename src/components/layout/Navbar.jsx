import { NavLink } from "react-router-dom";
import { BarChart2, Network, FileSearch, Hexagon } from "lucide-react";

const tabs = [
  { label: "人才缺口预测", path: "/forecast", icon: <BarChart2 size={18} /> },
  { label: "人才图谱", path: "/graph", icon: <Network size={18} /> },
  { label: "AI 简历分析", path: "/resume", icon: <FileSearch size={18} /> },
];

export default function Navbar() {
  return (
    <nav style={{
      height: '56px',
      backgroundColor: 'var(--bg-surface)',
      borderBottom: '1px solid var(--glass-border)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      {/* Logo 区 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '48px' }}>
        <Hexagon color="var(--accent-primary)" size={24} />
        <span style={{ 
          fontFamily: 'var(--font-display)', 
          fontSize: '18px', 
          fontWeight: 'bold', 
          color: 'var(--text-primary)',
          letterSpacing: '1px'
        }}>
          智链人事 AILink HR
        </span>
      </div>

      {/* 导航 Tab 区 */}
      <div style={{ display: 'flex', height: '100%' }}>
        {tabs.map(tab => (
          <NavLink
            key={tab.path}
            to={tab.path}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '0 20px',
              textDecoration: 'none',
              color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
              borderBottom: isActive ? '2px solid var(--accent-primary)' : '2px solid transparent',
              transition: 'color 0.2s',
              height: '100%',
              fontWeight: isActive ? 'bold' : 'normal',
              position: 'relative',
              top: '1px' // 微调以盖住 nav 的 borderBottom
            })}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}