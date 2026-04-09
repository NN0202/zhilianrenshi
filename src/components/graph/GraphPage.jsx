import React from "react";
import TalentGraph from "./TalentGraph";
import { useTalentStore } from "../../store/talentStore";

export default function GraphPage() {
  const gapFilter = useTalentStore((state) => state.gapFilter);
  const setGapFilter = useTalentStore((state) => state.setGapFilter);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 56px)",
      }}
    >
      {/* 顶部控制栏区域占位 */}
      <div
        style={{
          height: "56px",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid var(--glass-border)",
          backgroundColor: "var(--bg-surface)",
        }}
      >
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <span
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              fontFamily: "var(--font-display)",
            }}
          >
            企业人才技能图谱
          </span>
          {gapFilter === "high" && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  fontSize: "12px",
                  padding: "4px 8px",
                  backgroundColor: "rgba(239, 68, 68, 0.2)",
                  color: "var(--accent-danger)",
                  borderRadius: "4px",
                  border: "1px solid rgba(239, 68, 68, 0.5)",
                }}
              >
                高缺口岗位高亮中
              </span>
              <button
                onClick={() => setGapFilter(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                  fontSize: "12px",
                  textDecoration: "underline",
                }}
              >
                清除过滤
              </button>
            </div>
          )}
        </div>
        <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
          支持鼠标拖拽节点与滚轮缩放画布
        </div>
      </div>

      {/* 主体区域：左侧图谱画布 + 右侧详情占位 */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* 左侧画布，暂占满整个宽度，后续如果开发详情面板可以调整 width */}
        <div style={{ flex: 1, position: "relative" }}>
          <TalentGraph />
        </div>
      </div>
    </div>
  );
}
