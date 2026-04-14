import { TrendingUp, ArrowRight } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";
import { roleLabels } from "../../i18n/translations";

const gapCards = [
  { id: "rd", gap: "moderate", demand: 1240, supply: 980, trend: "stable", color: "var(--node-rd)" },
  { id: "mfg", gap: "low", demand: 3200, supply: 2900, trend: "stable", color: "var(--node-mfg)" },
  { id: "biz", gap: "high", demand: 860, supply: 420, trend: "rapid", color: "var(--node-biz)" },
  { id: "support", gap: "high", demand: 720, supply: 310, trend: "rapid", color: "var(--node-support)" },
];

export default function GapSummaryCards() {
  const { language, copy } = useLanguage();
  const formatter = new Intl.NumberFormat(copy.locale);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "18px",
      }}
    >
      {gapCards.map((card) => {
        const percent = Math.min(100, (card.supply / card.demand) * 100);
        const gapText = copy.forecast.gaps[card.gap];
        const trendText =
          card.trend === "rapid"
            ? copy.forecast.rapidGrowth
            : copy.forecast.steadyGrowth;

        return (
          <div
            key={card.id}
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--glass-border)",
              borderRadius: "24px",
              padding: "22px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
              <span
                style={{
                  fontSize: "16px",
                  color: "var(--text-secondary)",
                  fontWeight: 600,
                }}
              >
                {roleLabels[card.id][language]}
              </span>
              <span
                style={{
                  fontSize: "12px",
                  padding: "4px 10px",
                  borderRadius: "999px",
                  backgroundColor:
                    card.gap === "high"
                      ? "rgba(181, 51, 51, 0.1)"
                      : card.gap === "moderate"
                        ? "rgba(183, 128, 54, 0.12)"
                        : "rgba(111, 138, 85, 0.12)",
                  color:
                    card.gap === "high"
                      ? "var(--accent-danger)"
                      : card.gap === "moderate"
                        ? "var(--accent-warn)"
                        : "var(--accent-success)",
                  border: "1px solid rgba(209, 207, 197, 0.7)",
                  fontWeight: 600,
                }}
              >
                {gapText}
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "baseline", gap: "10px", flexWrap: "wrap" }}>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "42px",
                  color: card.color,
                  lineHeight: 1,
                }}
              >
                {formatter.format(card.demand)}
              </span>
              <span style={{ fontSize: "14px", color: "var(--text-muted)" }}>
                {copy.forecast.predictedDemand} ({copy.forecast.peopleUnit})
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                color: "var(--text-secondary)",
                fontSize: "14px",
                gap: "8px",
              }}
            >
              <span>
                {copy.forecast.currentSupply}:{" "}
                <strong style={{ color: "var(--text-primary)" }}>
                  {formatter.format(card.supply)}
                </strong>
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  color: card.trend === "rapid" ? "var(--accent-warn)" : "var(--accent-secondary)",
                }}
              >
                {card.trend === "rapid" ? <TrendingUp size={16} /> : <ArrowRight size={16} />}
                {trendText}
              </span>
            </div>

            <div style={{ marginTop: "auto" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "13px",
                  color: "var(--text-secondary)",
                  marginBottom: "8px",
                }}
              >
                <span>{copy.forecast.fulfillment}</span>
                <span>{percent.toFixed(0)}%</span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "8px",
                  backgroundColor: "var(--bg-elevated)",
                  borderRadius: "999px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${percent}%`,
                    height: "100%",
                    backgroundColor: card.color,
                    borderRadius: "999px",
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
