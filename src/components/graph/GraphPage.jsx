import TalentGraph from "./TalentGraph";
import { useTalentStore } from "../../store/talentStore";
import { useLanguage } from "../../i18n/LanguageContext";

export default function GraphPage() {
  const gapFilter = useTalentStore((state) => state.gapFilter);
  const setGapFilter = useTalentStore((state) => state.setGapFilter);
  const { copy } = useLanguage();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 72px)",
        padding: "24px 24px 28px 24px",
        gap: "18px",
      }}
    >
      <div
        style={{
          padding: "18px 22px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          border: "1px solid var(--glass-border)",
          borderRadius: "24px",
          backgroundColor: "var(--glass-bg)",
          boxShadow: "var(--shadow-soft)",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
          <span
            style={{
              fontSize: "28px",
              fontWeight: 500,
              fontFamily: "var(--font-display)",
            }}
          >
            {copy.graph.title}
          </span>
          {gapFilter === "high" && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
              <span
                style={{
                  fontSize: "12px",
                  padding: "6px 10px",
                  backgroundColor: "rgba(181, 51, 51, 0.1)",
                  color: "var(--accent-danger)",
                  borderRadius: "999px",
                  border: "1px solid rgba(181, 51, 51, 0.2)",
                }}
              >
                {copy.graph.highGapActive}
              </span>
              <button
                onClick={() => setGapFilter(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                  fontSize: "13px",
                  textDecoration: "underline",
                }}
              >
                {copy.graph.clearFilter}
              </button>
            </div>
          )}
        </div>
        <div style={{ fontSize: "14px", color: "var(--text-muted)" }}>{copy.graph.hint}</div>
      </div>

      <div
        style={{
          display: "flex",
          flex: 1,
          overflow: "hidden",
          borderRadius: "28px",
          border: "1px solid var(--glass-border)",
          boxShadow: "var(--shadow-soft)",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
        }}
      >
        <div style={{ flex: 1, position: "relative" }}>
          <TalentGraph />
        </div>
      </div>
    </div>
  );
}
