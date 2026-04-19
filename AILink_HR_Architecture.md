# AILink HR 智链人事 · React 前端开发架构文档

> **文档目标**：供 AI 开发者直接翻译为可运行代码，无需补充信息。  
> **技术栈**：React 18 + React Router v6 + D3.js（图谱渲染）+ Tailwind CSS + Framer Motion  
> **设计风格**：深色科技感（Deep Tech Dark）——深海蓝底色、青蓝色节点高亮、玻璃拟态卡片

---

## 一、项目结构总览

```
src/
├── App.jsx                        # 根组件，路由配置
├── main.jsx                       # 入口文件
├── index.css                      # 全局样式 / CSS 变量
│
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx             # 顶部导航栏
│   │   └── PageWrapper.jsx        # 页面容器（统一背景/动画）
│   │
│   ├── shared/
│   │   ├── GlassCard.jsx          # 玻璃拟态卡片基础组件
│   │   ├── StatusBadge.jsx        # 状态标签（高/中/低缺口）
│   │   └── LoadingSpinner.jsx     # 加载动画
│   │
│   ├── forecast/                  # 模块①：人才缺口预测
│   │   ├── ForecastPage.jsx       # 页面容器
│   │   ├── ForecastChart.jsx      # 折线/柱状图（D3 或 Recharts）
│   │   ├── GapSummaryCards.jsx    # 四类人才缺口卡片
│   │   └── SkillTagCloud.jsx      # 缺口技能标签云
│   │
│   ├── graph/                     # 模块②：人才图谱
│   │   ├── GraphPage.jsx          # 页面容器（左图谱 + 右详情面板）
│   │   ├── TalentGraph.jsx        # D3 force graph 核心渲染组件
│   │   ├── GraphControls.jsx      # 缩放/过滤/搜索控制栏
│   │   ├── NodeDetailPanel.jsx    # 右侧节点详情面板
│   │   ├── AddTalentModal.jsx     # 新增人才节点弹窗（含简历分析入口）
│   │   └── graphData.js           # mock 图谱数据结构
│   │
│   └── resume/                    # 模块③：AI 简历分析
│       ├── ResumePage.jsx         # 页面容器（可嵌入 GraphPage）
│       ├── ResumeUploader.jsx     # PDF/文本上传区
│       ├── ChatWindow.jsx         # AI 对话窗口
│       ├── AnalysisReport.jsx     # 分析报告展示（评分雷达图 + 技能标签）
│       └── GraphPreview.jsx       # 分析完毕后的图谱节点预览
│
├── hooks/
│   ├── useGraphData.js            # 图谱数据管理 hook
│   ├── useForecastData.js         # 预测数据管理 hook
│   └── useResumeAnalysis.js       # 简历分析 API 调用 hook
│
├── store/
│   └── talentStore.js             # 全局状态（Zustand）：人才库 + 缺口数据
│
├── api/
│   ├── anthropic.js               # Anthropic API 封装
│   └── mockData.js                # 所有 mock 数据集中管理
│
└── constants/
    ├── talentCategories.js        # 四类人才定义
    └── skillTags.js               # 技能标签字典
```

---

## 二、全局样式规范（index.css）

```css
:root {
  /* 背景色系 */
  --bg-base: #050d1a; /* 最深底色 */
  --bg-surface: #0a1628; /* 卡片底色 */
  --bg-elevated: #0f2040; /* 悬浮层 */

  /* 主色调 */
  --accent-primary: #00c8ff; /* 青蓝高亮（节点/按钮） */
  --accent-secondary: #3b82f6; /* 蓝色次级 */
  --accent-warn: #f59e0b; /* 橙色警告（缺口高） */
  --accent-success: #10b981; /* 绿色（缺口低） */
  --accent-danger: #ef4444; /* 红色（缺口极高） */

  /* 文字 */
  --text-primary: #e2f0ff;
  --text-secondary: #7aa0c4;
  --text-muted: #3d6080;

  /* 图谱专用 */
  --node-rd: #00c8ff; /* 技术研发节点 */
  --node-mfg: #10b981; /* 制造运维节点 */
  --node-biz: #f59e0b; /* 国际业务节点 */
  --node-support: #a78bfa; /* 远程支持节点 */
  --node-skill: #64748b; /* 技能标签节点 */
  --node-skill-gap: #ef4444; /* 待培养技能节点（虚线红） */

  /* 边 */
  --edge-solid: rgba(0, 200, 255, 0.4);
  --edge-dashed: rgba(239, 68, 68, 0.5);

  /* 字体 */
  --font-display: "Orbitron", monospace; /* 标题/数字 */
  --font-body: "Noto Sans SC", sans-serif; /* 正文/中文 */

  /* 玻璃效果 */
  --glass-bg: rgba(10, 22, 40, 0.7);
  --glass-border: rgba(0, 200, 255, 0.15);
  --glass-blur: 12px;
}

body {
  background-color: var(--bg-base);
  color: var(--text-primary);
  font-family: var(--font-body);
}
```

---

## 三、路由配置（App.jsx）

```jsx
// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import ForecastPage from "./components/forecast/ForecastPage";
import GraphPage from "./components/graph/GraphPage";
import ResumePage from "./components/resume/ResumePage";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/forecast" replace />} />
        <Route path="/forecast" element={<ForecastPage />} />
        <Route path="/graph" element={<GraphPage />} />
        <Route path="/resume" element={<ResumePage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## 四、顶部导航（Navbar.jsx）

**视觉规范**：

- 高度 56px，背景 `var(--bg-surface)`，底部 1px `var(--glass-border)`
- Logo 左侧：图标（六边形齿轮）+ 文字"智链人事 AILink HR"，字体 Orbitron
- 右侧三个导航 Tab：人才缺口预测 / 人才图谱 / AI简历分析
- 当前激活 Tab：底部 2px `var(--accent-primary)` 下划线 + 文字高亮
- 悬停动画：文字颜色过渡 0.2s

```jsx
// Navbar.jsx 伪代码结构
const tabs = [
  { label: "人才缺口预测", path: "/forecast", icon: <BarChart2 /> },
  { label: "人才图谱", path: "/graph", icon: <Network /> },
  { label: "AI 简历分析", path: "/resume", icon: <FileSearch /> },
];
// 使用 useLocation 判断激活项
// 使用 NavLink 导航
```

---

## 五、模块①：人才缺口预测页（ForecastPage）

### 5.1 页面布局

```
┌─────────────────────────────────────────────────────────┐
│  页面标题 + 副标题（湖州高新区 · 智能物流人才需求预测）    │
├──────────────┬──────────────────────────────────────────┤
│              │                                          │
│  四类人才     │   主图表区域                              │
│  缺口卡片     │   （折线图：2024-2030 预测趋势）           │
│  (2列×2行)   │                                          │
│              │                                          │
├──────────────┴──────────────────────────────────────────┤
│   技能缺口标签云（热度越高字体越大）                       │
├─────────────────────────────────────────────────────────┤
│   数据来源说明 + 联动按钮："在图谱中查看人才分布 →"        │
└─────────────────────────────────────────────────────────┘
```

### 5.2 GapSummaryCards 组件规范

每张卡片展示：

- 人才类别名称（中文）
- 缺口等级 Badge：高 / 中 / 低（对应红/橙/绿）
- 预测需求数字（大字号，Orbitron 字体）
- 当前供给 vs 预测需求的小型进度条
- 趋势箭头图标（↑ 快速增长 / → 稳定增长）

四类数据：

```js
const gapCards = [
  {
    id: "rd",
    label: "技术研发人员",
    gap: "moderate",
    demand: 1240,
    supply: 980,
    trend: "stable",
  },
  {
    id: "mfg",
    label: "制造与运维人员",
    gap: "low",
    demand: 3200,
    supply: 2900,
    trend: "stable",
  },
  {
    id: "biz",
    label: "国际业务人员",
    gap: "high",
    demand: 860,
    supply: 420,
    trend: "rapid",
  },
  {
    id: "support",
    label: "远程售后技术支持",
    gap: "high",
    demand: 720,
    supply: 310,
    trend: "rapid",
  },
];
```

### 5.3 ForecastChart 组件规范

- 使用 **Recharts** 库（`LineChart` + `AreaChart`）
- X轴：2024 ~ 2030 年份
- Y轴：需求人数
- 四条折线，颜色对应四类人才节点色（`--node-*`）
- 图例在右侧垂直排列
- 鼠标悬停 Tooltip 显示：年份、各类需求量、缺口量

### 5.4 联动按钮

底部固定一个按钮：

```
"在人才图谱中查看当前人才分布 →"
```

点击后：跳转 `/graph`，并通过 URL 参数或全局 store 传入 `filterByGap: 'high'`，图谱页自动高亮缺口高的节点。

---

## 六、模块②：人才图谱页（GraphPage）

### 6.1 页面整体布局

```
┌──────────────────────────────────────────────────────────────────┐
│  顶部控制栏：[搜索框] [过滤器下拉] [缩放+/-] [导入新人才按钮]      │
├────────────────────────────────┬─────────────────────────────────┤
│                                │                                  │
│                                │   右侧详情面板（NodeDetailPanel） │
│    图谱主画布                   │                                  │
│    （TalentGraph.jsx）          │   ┌──────────────────────────┐  │
│                                │   │ 头像占位 + 姓名 + 岗位    │  │
│    Neo4j 风格力导向图            │   ├──────────────────────────┤  │
│                                │   │ 技能雷达图（小型）         │  │
│    默认宽度：占页面 65%          │   ├──────────────────────────┤  │
│                                │   │ 已有技能标签（实线节点）   │  │
│                                │   ├──────────────────────────┤  │
│                                │   │ 待培养技能（虚线红节点）   │  │
│                                │   ├──────────────────────────┤  │
│                                │   │ [分析简历] [加入培养计划]  │  │
│                                │   └──────────────────────────┘  │
└────────────────────────────────┴─────────────────────────────────┘
```

### 6.2 TalentGraph 核心组件（D3 力导向图）

#### 节点类型定义

| 节点类型      | 形状                 | 颜色         | 说明         |
| ------------- | -------------------- | ------------ | ------------ |
| `talent`      | 圆形（r=22）         | 按人才类别色 | 人才个体节点 |
| `skill-owned` | 圆角矩形             | `#64748b`    | 已掌握技能   |
| `skill-gap`   | 圆角矩形（虚线描边） | `#ef4444`    | 待培养技能   |
| `role`        | 六边形               | `#3b82f6`    | 岗位类型节点 |

#### 边类型定义

| 边类型         | 样式                 | 含义               |
| -------------- | -------------------- | ------------------ |
| `has-skill`    | 实线，`opacity: 0.5` | 人才拥有某技能     |
| `needs-skill`  | 虚线，红色           | 人才待培养技能     |
| `matches-role` | 实线加粗，蓝色       | 人才匹配某岗位     |
| `skill-bridge` | 虚线，橙色           | 技能关联（可迁移） |

#### D3 实现要点

```js
// TalentGraph.jsx 关键实现逻辑

// 1. 使用 d3.forceSimulation 创建力导向仿真
const simulation = d3
  .forceSimulation(nodes)
  .force(
    "link",
    d3
      .forceLink(links)
      .id((d) => d.id)
      .distance(80),
  )
  .force("charge", d3.forceManyBody().strength(-300))
  .force("center", d3.forceCenter(width / 2, height / 2))
  .force("collision", d3.forceCollide().radius(30));

// 2. 节点渲染：SVG <g> 元素包含 circle/rect + text
// talent节点：外发光效果（filter: drop-shadow）
// skill-gap节点：stroke-dasharray="4,2" 虚线描边

// 3. 交互事件
// - 单击节点：更新右侧 NodeDetailPanel（通过 useState 或 store）
// - 双击节点：展开/折叠该节点的技能子节点
// - 拖拽：d3 drag behavior
// - 滚轮缩放：d3 zoom behavior
// - 悬停：节点高亮 + tooltip 显示基本信息

// 4. 节点颜色映射函数
const nodeColor = (node) => {
  if (node.type === "talent") return talentCategoryColor[node.category];
  if (node.type === "skill-gap") return "var(--node-skill-gap)";
  if (node.type === "skill-owned") return "var(--node-skill)";
  return "var(--accent-secondary)";
};

// 5. useEffect 监听 selectedFilter prop
// 当来自 ForecastPage 的 filterByGap='high' 时，
// 高亮 category 为 'biz' 或 'support' 的节点，其余节点 opacity 降低至 0.2
```

#### Neo4j 风格视觉细节

- 画布背景：`radial-gradient` 从中心 `#0a1628` 到边缘 `#050d1a`
- 节点 talent 类型：外发光 `box-shadow / filter: drop-shadow`，颜色与节点色一致
- 节点悬停：放大 1.2x + 发光增强，持续 0.15s
- 边：半透明，带方向箭头（`marker-end`）
- 背景网格：极淡的点阵 `dot grid`，`opacity: 0.05`

### 6.3 GraphControls 组件

```jsx
// 控制栏组件包含：
// 1. 搜索框：输入姓名/技能，实时高亮匹配节点
// 2. 类别过滤下拉：全部 / 四类人才 / 仅显示缺口节点
// 3. 缩放按钮：+ / - / 重置
// 4. 布局切换：力导向 / 层级布局（可选）
// 5. 导入新人才按钮：打开 AddTalentModal
//    - 按钮样式：右上角主操作按钮，accent-primary 底色
```

### 6.4 NodeDetailPanel 组件

右侧面板，宽度 320px，`position: sticky`，内容：

```
┌─────────────────────────────┐
│ [人才头像占位] 马特强         │
│ 岗位：自动化技术员            │
│ 类型 Badge：制造与运维        │
├─────────────────────────────┤
│ 技能雷达图（Recharts RadarChart）│
│ 维度：技术/管理/创新/文化/学习  │
├─────────────────────────────┤
│ ✅ 已有技能（点击可跳转图谱节点）│
│  · PLC编程  · CAD制图  ...   │
├─────────────────────────────┤
│ 🔴 待培养技能（来自缺口预测）  │
│  · 远程诊断  · 多语言...      │
│  每个技能显示：[+加入培养计划] │
├─────────────────────────────┤
│ [🔍 重新分析简历]             │
│ → 点击后在右侧滑出 ChatWindow │
└─────────────────────────────┘
```

**联动逻辑**：NodeDetailPanel 的「待培养技能」列表，数据来源于：

1. 全局 store 中该人才的 `gapSkills` 字段
2. 该字段在 AI 简历分析完成后写入，或由缺口预测模块根据人才类别自动匹配

### 6.5 AddTalentModal 组件

弹窗内含：

- 基本信息填写：姓名、岗位类别（下拉选四类）、入职年限
- 简历上传区（调用 ResumeUploader 子组件）
- 点击「开始AI分析」→ 调用 `useResumeAnalysis` hook → 分析完毕后：
  - 右侧 GraphPreview 小预览图显示该人才节点 + 技能节点
  - 点击「确认加入图谱」→ store 写入新节点 → 图谱重新渲染

---

## 七、模块③：AI简历分析页（ResumePage）

### 7.1 页面布局

```
┌──────────────────────────────────────────────────────────┐
│  页面标题：AI 简历分析 · 智能人岗匹配                      │
├────────────────────────┬─────────────────────────────────┤
│                        │                                  │
│  左侧操作区             │  右侧结果区                      │
│                        │                                  │
│  ┌──────────────────┐  │  ┌──────────────────────────┐   │
│  │  ResumeUploader  │  │  │  AnalysisReport          │   │
│  │  拖拽上传区       │  │  │  (初始为空，分析后渲染)   │   │
│  └──────────────────┘  │  │                          │   │
│                        │  │  · 雷达图（6维评分）       │   │
│  ┌──────────────────┐  │  │  · 技能标签（已有/待培养） │   │
│  │  ChatWindow      │  │  │  · 岗位匹配度（进度条）   │   │
│  │  AI对话框         │  │  │  · 图谱预览卡片           │   │
│  │  (Dify 或 直连   │  │  └──────────────────────────┘   │
│  │   Anthropic API) │  │                                  │
│  └──────────────────┘  │  ┌──────────────────────────┐   │
│                        │  │  [加入人才图谱] 按钮       │   │
│                        │  └──────────────────────────┘   │
└────────────────────────┴─────────────────────────────────┘
```

### 7.2 ResumeUploader 组件

- 拖拽区：`onDragOver` / `onDrop` 支持 PDF、TXT、DOC
- 点击区域触发 `<input type="file">` 隐藏元素
- 上传后显示文件名 + 大小 + 移除按钮
- 支持直接粘贴文本简历（Tab 切换：「上传文件 / 粘贴文本」）

### 7.3 ChatWindow 组件

```jsx
// ChatWindow.jsx
// 消息气泡列表（messages state）
// 用户气泡：右对齐，accent-primary 底色
// AI气泡：左对齐，glass 卡片风格
// 底部输入框 + 发送按钮
//
// 初始化时携带系统 prompt（见 7.5 节）
// 发送时调用 useResumeAnalysis hook
```

### 7.4 AnalysisReport 组件

分析完成后渲染，包含：

1. **综合评分 Header**：候选人姓名 + 目标岗位 + 总体匹配度 `XX%`

2. **雷达图**（Recharts RadarChart，6维）：
   - 技术能力 / 管理潜力 / 创新能力 / 文化适应 / 领导力 / 学习能力
   - 双层：候选人得分（填充）vs 岗位要求（轮廓线）

3. **技能标签区**：
   - ✅ 已有技能：绿色 Tag
   - ⚠️ 需强化技能：橙色 Tag
   - 🔴 待培养技能：红色虚线 Tag（与图谱中 skill-gap 节点视觉一致）

4. **岗位匹配度**：四类岗位各一条进度条，展示该候选人对每类岗位的适配程度

5. **GraphPreview 小组件**：
   - 显示该候选人节点 + 其已有技能节点 + 待培养技能节点的迷你图谱
   - 使用简化版 D3 / 纯 SVG 静态渲染（不需要交互，仅预览）
   - 底部 CTA 按钮：「加入人才图谱 →」

### 7.5 System Prompt 设计（anthropic.js）

```js
// api/anthropic.js
const SYSTEM_PROMPT = `
你是智链人事（AILink HR）的AI简历分析助手，专门服务于中国智能物流装备出海企业的人才管理。

## 知识库背景
- 企业背景：湖州高新区智能物流装备企业，面向东南亚/中东市场出海
- 核心岗位四类：技术研发人员、制造与运维人员、国际业务人员、远程售后技术支持
- 当前紧缺岗位：国际业务人员（缺口高）、远程售后技术支持（缺口高）

## 分析框架
对候选人简历进行六维评估，每维1-5分：
1. 技术能力（Technical Capability）
2. 管理潜力（Management Potential）
3. 创新与解决问题能力（Innovation & Problem Solving）
4. 文化适应与团队协作（Cultural Adaptability）
5. 领导力与决策能力（Leadership）
6. 学习与适应能力（Learning Agility）

## 输出格式（必须严格遵守JSON）
{
  "name": "候选人姓名",
  "targetRole": "最匹配岗位",
  "overallMatch": 85,
  "scores": {
    "technical": 4, "management": 2, "innovation": 3,
    "cultural": 5, "leadership": 2, "learning": 5
  },
  "ownedSkills": ["PLC编程", "CAD制图"],
  "reinforceSkills": ["复杂系统调试"],
  "gapSkills": ["远程诊断", "马来语", "跨境合规"],
  "roleMatch": {
    "rd": 70, "mfg": 85, "biz": 40, "support": 60
  },
  "summary": "综合评价文本（3-4句）",
  "recommendation": "建议文本"
}
`;
```

### 7.6 useResumeAnalysis Hook

```js
// hooks/useResumeAnalysis.js
export function useResumeAnalysis() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [messages, setMessages] = useState([]);

  const analyzeResume = async (resumeText, userMessage) => {
    setLoading(true);
    // 1. 构建消息历史（含简历全文作为第一条 user 消息）
    // 2. 调用 Anthropic API（见 api/anthropic.js）
    // 3. 解析 JSON 响应 → 写入 result state
    // 4. 技能归一化处理 (Skill Normalization)
    const normalizedOwned = result.ownedSkills.map((s) => skillNormalizer(s));
    const normalizedGap = result.gapSkills.map((s) => skillNormalizer(s));

    // 更新结果集，确保写入 store 的是标准 ID
    const finalizedResult = {
      ...result,
      ownedSkills: normalizedOwned,
      gapSkills: normalizedGap,
    };
    // 5. 同时将 AI 回复的 summary 字段作为对话气泡显示
    // 6. 将 gapSkills 写入全局 talentStore（待加入图谱时使用）
    setLoading(false);
  };

  return { loading, result, messages, analyzeResume };
}
```

---

## 八、全局状态管理（Zustand Store）

```js
// store/talentStore.js
import { create } from "zustand";

export const useTalentStore = create((set, get) => ({
  // 图谱数据
  nodes: [...mockTalentNodes], // 初始 mock 数据
  edges: [...mockEdges],

  // 缺口预测结果（从 ForecastPage 写入）
  gapFilter: null, // null | 'high' | 'moderate' | 'low'
  setGapFilter: (level) => set({ gapFilter: level }),

  // 新增人才节点
  addTalentNode: (talentData) =>
    set((state) => ({
      nodes: [...state.nodes, buildTalentNode(talentData)],
      edges: [...state.edges, ...buildSkillEdges(talentData)],
    })),

  // 当前选中节点（NodeDetailPanel 使用）
  selectedNodeId: null,
  setSelectedNode: (id) => set({ selectedNodeId: id }),

  // 临时存储简历分析结果（用于 GraphPreview）
  pendingTalent: null,
  setPendingTalent: (data) => set({ pendingTalent: data }),
}));
```

---

## 九、Mock 数据结构（api/mockData.js）

```js
// 图谱 Mock 数据示例
export const mockTalentNodes = [
  {
    id: "talent-001",
    type: "talent",
    category: "mfg",
    name: "马特强",
    role: "自动化技术员",
    scores: {
      technical: 4,
      management: 2,
      innovation: 3,
      cultural: 5,
      leadership: 2,
      learning: 5,
    },
  },
  {
    id: "talent-002",
    type: "talent",
    category: "biz",
    name: "陈思远",
    role: "海外市场专员",
    scores: {
      technical: 2,
      management: 4,
      innovation: 3,
      cultural: 4,
      leadership: 3,
      learning: 4,
    },
  },
  // ... 建议初始化 10-15 个人才节点，覆盖四类岗位

  // 技能节点
  { id: "skill-plc", type: "skill-owned", label: "PLC编程" },
  { id: "skill-cad", type: "skill-owned", label: "CAD制图" },
  { id: "skill-remote", type: "skill-gap", label: "远程诊断" },
  { id: "skill-malay", type: "skill-gap", label: "马来语" },
  { id: "skill-crossborder", type: "skill-gap", label: "跨境合规" },
  // ...
];

export const mockEdges = [
  { id: "e1", source: "talent-001", target: "skill-plc", type: "has-skill" },
  { id: "e2", source: "talent-001", target: "skill-cad", type: "has-skill" },
  {
    id: "e3",
    source: "talent-001",
    target: "skill-remote",
    type: "needs-skill",
  },
  // ...
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
```

---

## 十、三模块联动实现细节

### 联动 A：缺口预测 → 图谱（高亮缺口岗位）

```
触发点：ForecastPage 底部按钮「在图谱中查看 →」
实现方式：
  1. 点击按钮调用 store.setGapFilter('high')
  2. navigate('/graph')
  3. GraphPage 的 TalentGraph 组件 useEffect 监听 gapFilter
  4. 当 gapFilter='high' 时，将 category 为 'biz'/'support' 的节点
     放大 1.3x + 发光增强，其余节点 opacity 降至 0.2
  5. 控制栏显示「当前过滤：高缺口岗位」Badge + [清除过滤] 按钮
```

### 联动 B：图谱节点「待培养技能」← 来自缺口预测

```
实现方式：
  每个 talent 节点的 gapSkills 字段在 mockData 中预设
  规则：category='biz' 的节点自动挂载 ['跨境合规','商务英语','东南亚市场知识']
       category='support' 的节点自动挂载 ['远程诊断','多语言服务','IoT协议']
  这些 gapSkills 对应图谱中的 skill-gap 类型节点（虚线红色）
  NodeDetailPanel 渲染时分开展示 ownedSkills 和 gapSkills
```

### 联动 C：简历分析结果 → 写入图谱

```
触发点：AnalysisReport 底部「加入人才图谱 →」按钮
实现方式：
  1. 读取 store.pendingTalent（由 useResumeAnalysis 在分析完成后写入）
  2. 调用 store.addTalentNode(pendingTalent)
  3. addTalentNode 内部：
     - 创建 talent 节点（type:'talent', category 根据 targetRole 映射）
     - 为每个 ownedSkill 创建/复用 skill-owned 节点 + has-skill 边
     - 为每个 gapSkill 创建/复用 skill-gap 节点 + needs-skill 边
  4. navigate('/graph')，图谱自动渲染新节点
  5. 新节点入场动画：scale 从 0 到 1，duration 0.4s
```

### 联动 D：图谱节点面板 → 触发简历重新分析

```
触发点：NodeDetailPanel 底部「重新分析简历」按钮
实现方式：
  方案A（独立页面）：navigate('/resume', { state: { talentId: selectedNodeId } })
           ResumePage 读取 location.state，预填候选人信息
  方案B（同页滑出）：GraphPage 右侧 NodeDetailPanel 下方滑出 ChatWindow
           宽度从 320px 扩展到 640px，聊天框内嵌显示
           （推荐方案B，体验更连贯）
```

---

## 十一、依赖包清单（package.json 关键部分）

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "d3": "^7.8.5",
    "recharts": "^2.10.0",
    "zustand": "^4.4.7",
    "framer-motion": "^10.16.0",
    "lucide-react": "^0.294.0",
    "tailwindcss": "^3.3.0"
  }
}
```

---

## 十二、开发顺序建议（给 AI 开发者）

按以下顺序开发，每步可独立测试：

1. **基础层**：`index.css` 全局变量 + `Navbar.jsx` + `App.jsx` 路由
2. **数据层**：`api/mockData.js` 全部 mock 数据 + `store/talentStore.js`
3. **模块①**：`ForecastPage` + `GapSummaryCards` + `ForecastChart`（先用静态数据）
4. **模块②核心**：`TalentGraph.jsx`（D3 力导向图，先只渲染 mock 节点，不做交互）
5. **模块②交互**：节点点击 → `NodeDetailPanel` 显示 + 拖拽/缩放
6. **模块③**：`ResumeUploader` + `ChatWindow` + Anthropic API 接入
7. **模块③结果**：`AnalysisReport` + `GraphPreview`
8. **联动**：按十、节联动 A/B/C/D 顺序逐一实现
9. **美化**：动画、过渡效果、响应式适配

---

## 附录：关键 UI 交互状态说明

| 场景                | 组件            | 状态变化                                   |
| ------------------- | --------------- | ------------------------------------------ |
| 首次进入图谱页      | TalentGraph     | 力导向动画稳定过渡，节点从中心扩散         |
| 点击人才节点        | NodeDetailPanel | 从右侧滑入（translateX 320→0，0.25s ease） |
| 悬停 skill-gap 节点 | Tooltip         | 显示「待培养技能：建议培养路径...」        |
| 简历分析加载中      | ChatWindow      | AI 气泡显示打字动画（三点闪烁）            |
| 新节点加入图谱      | TalentGraph     | 新节点脉冲发光 2s 后恢复正常               |
| 缺口高亮模式激活    | TalentGraph     | 非高亮节点淡出，高亮节点边框闪烁           |

```

---

*文档版本：v1.0 · 适用于智链人事 AILink HR 平台 SCI 论文配套系统*
```
