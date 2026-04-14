export const languageOptions = [
  { value: "zh", label: "中文" },
  { value: "en", label: "English" },
];

export const roleLabels = {
  rd: { zh: "技术研发人员", en: "R&D Talent" },
  mfg: { zh: "制造与运维人员", en: "Manufacturing & Operations" },
  biz: { zh: "国际业务人员", en: "International Business" },
  support: { zh: "远程售后技术支持", en: "Remote Support" },
};

export const skillLabels = {
  "skill-plc": { zh: "PLC编程", en: "PLC Programming" },
  "skill-cad": { zh: "CAD制图", en: "CAD Drafting" },
  "skill-python": { zh: "Python", en: "Python" },
  "skill-ai": { zh: "AI算法", en: "AI Algorithms" },
  "skill-remote": { zh: "远程诊断", en: "Remote Diagnostics" },
  "skill-malay": { zh: "马来语", en: "Malay" },
  "skill-crossborder": { zh: "跨境合规", en: "Cross-border Compliance" },
  "skill-iot": { zh: "IoT协议", en: "IoT Protocols" },
};

export const tagLabels = {
  "skill-crossborder": skillLabels["skill-crossborder"],
  overseasExpansion: { zh: "海外客户拓展", en: "Overseas Client Development" },
  "skill-malay": skillLabels["skill-malay"],
  "skill-remote": skillLabels["skill-remote"],
  supplyChain: { zh: "供应链管理", en: "Supply Chain Management" },
  crossCultural: { zh: "跨文化沟通", en: "Cross-cultural Communication" },
  "skill-iot": skillLabels["skill-iot"],
  "skill-ai": skillLabels["skill-ai"],
  dataAnalysis: { zh: "数据分析", en: "Data Analysis" },
  "skill-plc": skillLabels["skill-plc"],
  systemIntegration: { zh: "系统集成", en: "System Integration" },
};

export const copy = {
  zh: {
    locale: "zh-CN",
    appName: "智链人事 AILink HR",
    navbar: {
      forecast: "人才缺口预测",
      graph: "人才图谱",
      resume: "AI 简历分析",
      languageLabel: "页面语言",
    },
    forecast: {
      eyebrow: "物流人才洞察",
      title: "人才缺口预测",
      subtitle: "湖州高新区智能物流人才需求趋势与关键能力缺口。",
      chartTitle: "2024-2030 需求趋势",
      tagCloudTitle: "紧缺技能标签云",
      footerNote: "数据来源：企业 ERP 系统及当地人社局历年统计数据",
      viewGraph: "在人才图谱中查看当前人才分布",
      summaryTitle: "按岗位类别查看供需情况",
      predictedDemand: "预测需求",
      currentSupply: "当前供给",
      fulfillment: "满足度",
      rapidGrowth: "快速增长",
      steadyGrowth: "稳定增长",
      peopleUnit: "人",
      gaps: {
        high: "高缺口",
        moderate: "中缺口",
        low: "低缺口",
      },
    },
    graph: {
      title: "企业人才技能图谱",
      highGapActive: "高缺口岗位高亮中",
      clearFilter: "清除过滤",
      hint: "支持鼠标拖拽节点与滚轮缩放画布",
    },
    resume: {
      eyebrow: "候选人协同录入",
      title: "AI 智能简历分析",
      intro: "点击页面右下角的悬浮聊天气泡，打开 Dify AI 助手进行简历分析。",
      steps: [
        "上传候选人简历附件",
        "让 AI 基于六维模型评估候选人",
        "提取候选人的“已有技能”和“待培养技能”",
      ],
      helperTitle: "分析完成后",
      helperText:
        "请将 AI 提取的关键信息填入右侧的数据桥接面板，系统会自动标准化并同步到人才图谱。",
      bridgeTitle: "数据桥接面板",
      nameLabel: "候选人姓名",
      namePlaceholder: "例如：张三",
      targetRoleLabel: "匹配岗位类别",
      ownedSkillsLabel: "已有核心技能（逗号分隔）",
      ownedSkillsPlaceholder: "例如：PLC编程, CAD制图, Python",
      gapSkillsLabel: "待培养技能（逗号分隔）",
      gapSkillsPlaceholder: "例如：跨境合规, 英语, 远程诊断",
      submit: "同步至人才图谱",
      submitting: "数据传输中...",
      overlayTitle: "正在执行技能归一化协作...",
      overlayText: "准备写入人才图谱数据库",
      validationNameRequired: "请输入候选人姓名",
    },
  },
  en: {
    locale: "en-US",
    appName: "AILink HR",
    navbar: {
      forecast: "Talent Gap Forecast",
      graph: "Talent Graph",
      resume: "AI Resume Review",
      languageLabel: "Language",
    },
    forecast: {
      eyebrow: "Logistics Talent Insights",
      title: "Talent Gap Forecast",
      subtitle:
        "Demand trends and capability gaps for smart logistics talent in Huzhou High-tech Zone.",
      chartTitle: "Demand Trend, 2024-2030",
      tagCloudTitle: "High-priority Skills",
      footerNote:
        "Source: enterprise ERP systems and annual statistics from the local human resources bureau",
      viewGraph: "View current talent distribution in the graph",
      summaryTitle: "Supply and demand by talent segment",
      predictedDemand: "Projected Demand",
      currentSupply: "Current Supply",
      fulfillment: "Fulfillment",
      rapidGrowth: "Rapid Growth",
      steadyGrowth: "Steady Growth",
      peopleUnit: "people",
      gaps: {
        high: "High Gap",
        moderate: "Moderate Gap",
        low: "Low Gap",
      },
    },
    graph: {
      title: "Enterprise Talent Skills Graph",
      highGapActive: "High-gap roles highlighted",
      clearFilter: "Clear filter",
      hint: "Drag nodes and zoom the canvas with your mouse wheel",
    },
    resume: {
      eyebrow: "Candidate Sync Workspace",
      title: "AI Resume Review",
      intro:
        "Use the floating chat bubble in the lower-right corner to open the Dify AI assistant for resume analysis.",
      steps: [
        "Upload the candidate resume",
        "Ask AI to evaluate the profile with the six-dimension model",
        "Extract current skills and growth-gap skills from the resume",
      ],
      helperTitle: "After the analysis",
      helperText:
        "Fill the key details into the bridge panel on the right, and the system will standardize the data before syncing it into the talent graph.",
      bridgeTitle: "Data Bridge Panel",
      nameLabel: "Candidate Name",
      namePlaceholder: "Example: Alex Chen",
      targetRoleLabel: "Target Role Category",
      ownedSkillsLabel: "Current Core Skills (comma separated)",
      ownedSkillsPlaceholder: "Example: PLC programming, CAD drafting, Python",
      gapSkillsLabel: "Skills to Develop (comma separated)",
      gapSkillsPlaceholder:
        "Example: Cross-border compliance, English, remote diagnostics",
      submit: "Sync to Talent Graph",
      submitting: "Syncing data...",
      overlayTitle: "Running skill normalization...",
      overlayText: "Preparing records for the talent graph database",
      validationNameRequired: "Please enter the candidate name",
    },
  },
};
