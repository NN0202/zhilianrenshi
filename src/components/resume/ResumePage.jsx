import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../shared/GlassCard';
import { useTalentStore } from '../../store/talentStore';
import { Network, Database, Loader2 } from 'lucide-react';

export default function ResumePage() {
  const navigate = useNavigate();
  const addTalentNode = useTalentStore((state) => state.addTalentNode);

  // 表单状态
  const [formData, setFormData] = useState({
    name: '',
    targetRole: 'mfg', // 默认制造与运维
    ownedSkills: '',
    gapSkills: '',
  });

  const [isSyncing, setIsSyncing] = useState(false);

  // 初始化 Dify 配置脚本
  useEffect(() => {
    // 设置全局配置
    window.difyChatbotConfig = {
      token: 'GyKUm3Gio7gZebtD',
      inputs: {},
      systemVariables: {},
      userVariables: {},
    };

    // 动态加载 embed 脚本
    const script = document.createElement('script');
    script.src = 'https://udify.app/embed.min.js';
    script.id = 'GyKUm3Gio7gZebtD';
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      // 组件卸载时清理脚本和配置
      const existingScript = document.getElementById('GyKUm3Gio7gZebtD');
      if (existingScript) document.body.removeChild(existingScript);
      
      // 注意：Dify 脚本可能会在 body 注入气泡和 iframe，这里做个简单清理尝试
      const difyBubble = document.getElementById('dify-chatbot-bubble-button');
      const difyWindow = document.getElementById('dify-chatbot-bubble-window');
      if (difyBubble) difyBubble.remove();
      if (difyWindow) difyWindow.remove();
      
      delete window.difyChatbotConfig;
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSync = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return alert("请输入候选人姓名");

    setIsSyncing(true);

    // 模拟将表单字符串分割并处理为数组
    const talentData = {
      name: formData.name.trim(),
      targetRole: getRoleName(formData.targetRole),
      // mock 得分
      scores: {
        technical: 4, management: 3, innovation: 3,
        cultural: 4, leadership: 2, learning: 4
      },
      // 指定归属类别
      roleMatch: { [formData.targetRole]: 90 },
      ownedSkills: formData.ownedSkills.split(/[,，、]+/).map(s => s.trim()).filter(Boolean),
      gapSkills: formData.gapSkills.split(/[,，、]+/).map(s => s.trim()).filter(Boolean),
    };

    // 延时展示动画效果
    setTimeout(() => {
      // 写入全局 store，经过归一化处理
      addTalentNode(talentData);
      setIsSyncing(false);
      navigate('/graph');
    }, 1500);
  };

  const getRoleName = (id) => {
    const roles = {
      'rd': '技术研发人员',
      'mfg': '制造与运维人员',
      'biz': '国际业务人员',
      'support': '远程售后技术支持'
    };
    return roles[id] || '未知岗位';
  };

  return (
    <div style={{ 
      padding: '24px 32px', 
      maxWidth: '1440px', 
      margin: '0 auto', 
      display: 'flex', 
      gap: '24px',
      height: 'calc(100vh - 104px)'
    }}>
      
      {/* 左侧：说明与占位区 */}
      <GlassCard style={{ flex: 1, padding: '32px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', margin: '0 0 16px 0', color: 'var(--accent-primary)' }}>
          AI 智能简历分析
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
          请点击页面右下角的悬浮聊天气泡，打开 Dify AI 助手进行简历分析交互。
          <br /><br />
          在聊天窗口中，您可以：
          <br />1. 上传候选人简历附件
          <br />2. 让 AI 根据六维模型评估候选人
          <br />3. 提取候选人的「已有技能」和「待培养技能」
        </p>
        
        <div style={{ 
          marginTop: 'auto', 
          padding: '20px', 
          backgroundColor: 'rgba(0, 200, 255, 0.05)', 
          borderRadius: '8px',
          border: '1px dashed var(--edge-solid)'
        }}>
          <h4 style={{ margin: '0 0 8px 0', color: 'var(--text-primary)' }}>💡 分析完成后：</h4>
          <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            请将 AI 提取的关键信息填入右侧的数据桥接面板，以便将其转化为标准化的数据节点，并同步至企业人才技能图谱中。
          </span>
        </div>
      </GlassCard>

      {/* 右侧：数据同步桥接面板 (Action Panel) */}
      <GlassCard style={{ width: '400px', padding: '24px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
          <Database size={20} color="var(--accent-secondary)" />
          <h3 style={{ margin: 0, fontSize: '18px' }}>数据桥接面板</h3>
        </div>

        <form onSubmit={handleSync} style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>候选人姓名 <span style={{color:'red'}}>*</span></label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="例如：张三"
              style={{
                backgroundColor: 'rgba(10, 22, 40, 0.8)',
                border: '1px solid var(--glass-border)',
                borderRadius: '6px',
                padding: '10px 12px',
                color: 'var(--text-primary)',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>匹配岗位类别</label>
            <select 
              name="targetRole"
              value={formData.targetRole}
              onChange={handleChange}
              style={{
                backgroundColor: 'rgba(10, 22, 40, 0.8)',
                border: '1px solid var(--glass-border)',
                borderRadius: '6px',
                padding: '10px 12px',
                color: 'var(--text-primary)',
                outline: 'none'
              }}
            >
              <option value="rd">技术研发人员</option>
              <option value="mfg">制造与运维人员</option>
              <option value="biz">国际业务人员</option>
              <option value="support">远程售后技术支持</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>已有核心技能 (逗号分隔)</label>
            <textarea 
              name="ownedSkills"
              value={formData.ownedSkills}
              onChange={handleChange}
              placeholder="例如：PLC编程, CAD制图, Python"
              rows={3}
              style={{
                backgroundColor: 'rgba(10, 22, 40, 0.8)',
                border: '1px solid var(--glass-border)',
                borderRadius: '6px',
                padding: '10px 12px',
                color: 'var(--text-primary)',
                outline: 'none',
                resize: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>待培养技能 (逗号分隔)</label>
            <textarea 
              name="gapSkills"
              value={formData.gapSkills}
              onChange={handleChange}
              placeholder="例如：跨境合规, 英语, 远程诊断"
              rows={3}
              style={{
                backgroundColor: 'rgba(10, 22, 40, 0.8)',
                border: '1px dashed var(--accent-danger)',
                borderRadius: '6px',
                padding: '10px 12px',
                color: 'var(--text-primary)',
                outline: 'none',
                resize: 'none'
              }}
            />
          </div>

          <button 
            type="submit"
            disabled={isSyncing}
            style={{
              marginTop: 'auto',
              backgroundColor: 'var(--accent-primary)',
              color: '#050d1a',
              border: 'none',
              padding: '14px',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '15px',
              cursor: isSyncing ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              opacity: isSyncing ? 0.7 : 1,
              transition: 'all 0.2s'
            }}
          >
            {isSyncing ? (
              <>
                <Loader2 className="animate-spin" size={18} style={{ animation: 'spin 1s linear infinite' }} />
                数据传输中...
              </>
            ) : (
              <>
                <Network size={18} />
                同步至人才图谱
              </>
            )}
          </button>
        </form>
      </GlassCard>

      {/* 加载动画蒙层 (数据传输中) */}
      <AnimatePresence>
        {isSyncing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(5, 13, 26, 0.8)',
              backdropFilter: 'blur(8px)',
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Network size={64} color="var(--accent-primary)" />
            </motion.div>
            <h2 style={{ color: 'var(--text-primary)', marginTop: '24px', fontFamily: 'var(--font-display)' }}>
              正在执行技能归一化协议...
            </h2>
            <p style={{ color: 'var(--accent-primary)', marginTop: '8px' }}>
              准备写入人才图谱数据库
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}