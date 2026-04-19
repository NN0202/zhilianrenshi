import { create } from "zustand";
import { mockTalentNodes, mockEdges } from "../api/mockData";

// 技能归一化字典（十三：归一化协议）
// 用于将 AI 分析出来的非标技能名称映射为图谱中的标准节点 ID
const SKILL_DICTIONARY = {
  "plc编程": "skill-plc",
  "plc programming": "skill-plc",
  "cad制图": "skill-cad",
  "cad drafting": "skill-cad",
  "python": "skill-python",
  "ai算法": "skill-ai",
  "ai algorithms": "skill-ai",
  "远程诊断": "skill-remote",
  "remote diagnostics": "skill-remote",
  "马来语": "skill-malay",
  "malay": "skill-malay",
  "跨境合规": "skill-crossborder",
  "cross-border compliance": "skill-crossborder",
  "iot协议": "skill-iot",
  "iot protocols": "skill-iot",
};

// 技能归一化处理函数
const skillNormalizer = (skillName) => {
  if (!skillName) return null;
  const normalizedLabel = skillName.trim();
  const lowerLabel = normalizedLabel.toLowerCase().replace(/\s+/g, " ");
  
  // 查找标准词典
  if (SKILL_DICTIONARY[lowerLabel]) {
    return {
      id: SKILL_DICTIONARY[lowerLabel],
      label: normalizedLabel,
    };
  }

  // 如果字典中没有，则动态生成一个归一化 ID
  const dynamicId = `skill-${lowerLabel.replace(/[^a-z0-9\u4e00-\u9fa5]/g, "")}`;
  return {
    id: dynamicId,
    label: normalizedLabel,
  };
};

export const useTalentStore = create((set, get) => ({
  // 图谱数据
  nodes: [...mockTalentNodes],
  edges: [...mockEdges],

  // 缺口预测结果
  gapFilter: null,
  setGapFilter: (level) => set({ gapFilter: level }),

  // 新增人才节点（包含技能归一化协议逻辑）
  addTalentNode: (talentData) => {
    set((state) => {
      const newNodes = [...state.nodes];
      const newEdges = [...state.edges];

      // 提取 AI 分析结果的基础信息
      const {
        name,
        targetRole,
        scores = {},
        roleMatch = {},
        ownedSkills = [],
        gapSkills = [],
      } = talentData;

      // 确定人才所属类别 (category)，取 roleMatch 中得分最高的一项
      let category = "mfg"; // 默认
      if (Object.keys(roleMatch).length > 0) {
        category = Object.keys(roleMatch).reduce((a, b) =>
          roleMatch[a] > roleMatch[b] ? a : b
        );
      }

      // 生成新的人才节点 ID
      const newTalentId = `talent-${Date.now()}`;

      // 技能归一化处理 (Skill Normalization)
      const normalizedOwned = ownedSkills.map((s) => skillNormalizer(s)).filter(Boolean);
      const normalizedGap = gapSkills.map((s) => skillNormalizer(s)).filter(Boolean);

      // 1. 构建并添加人才节点
      const newTalentNode = {
        id: newTalentId,
        type: "talent",
        category,
        name,
        role: targetRole,
        scores,
        ownedSkills: normalizedOwned.map((s) => s.id),
        gapSkills: normalizedGap.map((s) => s.id),
      };
      newNodes.push(newTalentNode);

      // 2. 处理技能节点和边的复用或新建
      const processSkill = (skillObj, nodeType, edgeType) => {
        // 检查图谱中是否已存在该归一化后的技能节点
        const existingNode = newNodes.find((n) => n.id === skillObj.id);
        
        if (!existingNode) {
          // 如果不存在，创建新的技能节点
          newNodes.push({
            id: skillObj.id,
            type: nodeType, // "skill-owned" 或 "skill-gap"
            label: skillObj.label,
          });
        } else {
          // 状态合并逻辑：如果已有技能是 gap，但新的人才是 owned，可根据业务逻辑决定是否升级类型
          // 这里为了简单，如果新节点带入的是 owned 属性且原节点是 gap，则提升为 owned
          if (nodeType === "skill-owned" && existingNode.type === "skill-gap") {
            existingNode.type = "skill-owned";
          }
        }

        // 添加连线 (Edge)
        newEdges.push({
          id: `edge-${newTalentId}-${skillObj.id}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          source: newTalentId,
          target: skillObj.id,
          type: edgeType, // "has-skill" 或 "needs-skill"
        });
      };

      // 遍历归一化后的技能数组，建立关系
      normalizedOwned.forEach((skill) => processSkill(skill, "skill-owned", "has-skill"));
      normalizedGap.forEach((skill) => processSkill(skill, "skill-gap", "needs-skill"));

      return { nodes: newNodes, edges: newEdges };
    });
  },

  // 当前选中节点（NodeDetailPanel 使用）
  selectedNodeId: null,
  setSelectedNode: (id) => set({ selectedNodeId: id }),

  // 临时存储简历分析结果（用于 GraphPreview）
  pendingTalent: null,
  setPendingTalent: (data) => set({ pendingTalent: data }),
}));
