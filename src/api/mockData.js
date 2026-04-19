// api/mockData.js

// 图谱 Mock 数据示例
export const mockTalentNodes = [
  // 人才节点
  {
    id: "talent-001",
    type: "talent",
    category: "mfg",
    name: { zh: "马特强", en: "Strong Ma" },
    role: "自动化技术员",
    scores: {
      technical: 4,
      management: 2,
      innovation: 3,
      cultural: 5,
      leadership: 2,
      learning: 5,
    },
    gapSkills: [],
    ownedSkills: ["skill-plc", "skill-cad"],
  },
  {
    id: "talent-002",
    type: "talent",
    category: "biz",
    name: { zh: "陈思远", en: "Kevin Chen" },
    role: "海外市场专员",
    scores: {
      technical: 2,
      management: 4,
      innovation: 3,
      cultural: 4,
      leadership: 3,
      learning: 4,
    },
    gapSkills: ["skill-crossborder", "skill-malay"],
    ownedSkills: [],
  },
  {
    id: "talent-003",
    type: "talent",
    category: "rd",
    name: { zh: "李研发", en: "Ryan Li" },
    role: "算法工程师",
    scores: {
      technical: 5,
      management: 2,
      innovation: 5,
      cultural: 3,
      leadership: 2,
      learning: 5,
    },
    gapSkills: [],
    ownedSkills: ["skill-python", "skill-ai"],
  },
  {
    id: "talent-004",
    type: "talent",
    category: "support",
    name: { zh: "王支持", en: "Victor Wang" },
    role: "技术支持工程师",
    scores: {
      technical: 3,
      management: 3,
      innovation: 2,
      cultural: 4,
      leadership: 2,
      learning: 4,
    },
    gapSkills: ["skill-remote", "skill-iot"],
    ownedSkills: [],
  },

  // 技能节点 (owned)
  { id: "skill-plc", type: "skill-owned", label: "PLC编程" },
  { id: "skill-cad", type: "skill-owned", label: "CAD制图" },
  { id: "skill-python", type: "skill-owned", label: "Python" },
  { id: "skill-ai", type: "skill-owned", label: "AI算法" },

  // 技能节点 (gap)
  { id: "skill-remote", type: "skill-gap", label: "远程诊断" },
  { id: "skill-malay", type: "skill-gap", label: "马来语" },
  { id: "skill-crossborder", type: "skill-gap", label: "跨境合规" },
  { id: "skill-iot", type: "skill-gap", label: "IoT协议" },
];

export const mockEdges = [
  // talent-001 (mfg)
  { id: "e1", source: "talent-001", target: "skill-plc", type: "has-skill" },
  { id: "e2", source: "talent-001", target: "skill-cad", type: "has-skill" },

  // talent-002 (biz)
  {
    id: "e3",
    source: "talent-002",
    target: "skill-crossborder",
    type: "needs-skill",
  },
  {
    id: "e4",
    source: "talent-002",
    target: "skill-malay",
    type: "needs-skill",
  },

  // talent-003 (rd)
  { id: "e5", source: "talent-003", target: "skill-python", type: "has-skill" },
  { id: "e6", source: "talent-003", target: "skill-ai", type: "has-skill" },

  // talent-004 (support)
  {
    id: "e7",
    source: "talent-004",
    target: "skill-remote",
    type: "needs-skill",
  },
  { id: "e8", source: "talent-004", target: "skill-iot", type: "needs-skill" },
];

// 预测图表 Mock 数据
export const mockForecastData = [
  { year: 2024, rd: 980, mfg: 2900, biz: 420, support: 310 },
  { year: 2025, rd: 1020, mfg: 3050, biz: 520, support: 420 },
  { year: 2026, rd: 1080, mfg: 3150, biz: 640, support: 530 },
  { year: 2027, rd: 1120, mfg: 3200, biz: 700, support: 600 },
  { year: 2028, rd: 1180, mfg: 3280, biz: 750, support: 660 },
  { year: 2029, rd: 1210, mfg: 3350, biz: 800, support: 700 },
  { year: 2030, rd: 1240, mfg: 3420, biz: 860, support: 720 },
];
