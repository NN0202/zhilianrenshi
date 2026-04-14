import GapSummaryCards from "./GapSummaryCards";
import ForecastChart from "./ForecastChart";
import SkillTagCloud from "./SkillTagCloud";
import { useNavigate } from "react-router-dom";
import { useTalentStore } from "../../store/talentStore";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";

export default function ForecastPage() {
  const navigate = useNavigate();
  const setGapFilter = useTalentStore((state) => state.setGapFilter);
  const { copy } = useLanguage();

  const handleNavigateToGraph = () => {
    setGapFilter("high");
    navigate("/graph");
  };

  return (
    <div
      style={{
        padding: "32px",
        maxWidth: "1440px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <header
        style={{
          padding: "32px",
          borderRadius: "32px",
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--glass-border)",
          boxShadow: "var(--shadow-soft)",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            padding: "6px 12px",
            borderRadius: "999px",
            fontSize: "12px",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--accent-primary)",
            backgroundColor: "rgba(201, 100, 66, 0.1)",
          }}
        >
          {copy.forecast.eyebrow}
        </span>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            margin: "14px 0 0 0",
            fontSize: "clamp(2.3rem, 4vw, 3.8rem)",
            lineHeight: 1.1,
            fontWeight: 500,
          }}
        >
          {copy.forecast.title}
        </h1>
        <p
          style={{
            color: "var(--text-secondary)",
            margin: "16px 0 0 0",
            fontSize: "18px",
            maxWidth: "760px",
          }}
        >
          {copy.forecast.subtitle}
        </p>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "24px",
          alignItems: "stretch",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h2
            style={{
              margin: 0,
              fontFamily: "var(--font-display)",
              fontSize: "28px",
              fontWeight: 500,
            }}
          >
            {copy.forecast.summaryTitle}
          </h2>
          <GapSummaryCards />
        </div>

        <section
          style={{
            backgroundColor: "var(--glass-bg)",
            borderRadius: "28px",
            padding: "26px",
            border: "1px solid var(--glass-border)",
            boxShadow: "var(--shadow-soft)",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "28px",
              margin: "0 0 18px 0",
              fontWeight: 500,
            }}
          >
            {copy.forecast.chartTitle}
          </h2>
          <ForecastChart />
        </section>
      </div>

      <section
        style={{
          backgroundColor: "var(--glass-bg)",
          borderRadius: "28px",
          padding: "26px",
          border: "1px solid var(--glass-border)",
          boxShadow: "var(--shadow-soft)",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "28px",
            margin: "0 0 10px 0",
            fontWeight: 500,
          }}
        >
          {copy.forecast.tagCloudTitle}
        </h2>
        <SkillTagCloud />
      </section>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "18px",
          flexWrap: "wrap",
        }}
      >
        <span style={{ color: "var(--text-muted)", fontSize: "14px" }}>
          {copy.forecast.footerNote}
        </span>
        <button className="brand-button" onClick={handleNavigateToGraph}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            {copy.forecast.viewGraph}
            <ArrowRight size={16} />
          </span>
        </button>
      </div>
    </div>
  );
}
