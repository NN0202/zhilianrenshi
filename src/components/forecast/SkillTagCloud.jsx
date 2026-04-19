import { useLanguage } from "../../i18n/LanguageContext";
import { tagLabels } from "../../i18n/translations";

const tags = [
  { key: "skill-crossborder", weight: 9, color: "var(--node-skill-gap)" },
  { key: "overseasExpansion", weight: 8, color: "var(--node-skill-gap)" },
  { key: "skill-malay", weight: 8, color: "var(--node-skill-gap)" },
  { key: "skill-remote", weight: 7, color: "var(--node-skill-gap)" },
  { key: "supplyChain", weight: 7, color: "var(--accent-warn)" },
  { key: "crossCultural", weight: 6, color: "var(--accent-warn)" },
  { key: "skill-iot", weight: 6, color: "var(--node-skill-gap)" },
  { key: "skill-ai", weight: 5, color: "var(--node-skill)" },
  { key: "dataAnalysis", weight: 5, color: "var(--node-skill)" },
  { key: "skill-plc", weight: 4, color: "var(--node-skill)" },
  { key: "systemIntegration", weight: 4, color: "var(--node-skill)" },
];

export default function SkillTagCloud() {
  const { language } = useLanguage();

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "14px",
        alignItems: "center",
        padding: "10px 0 4px 0",
      }}
    >
      {tags.map((tag) => {
        const fontSize = 13 + (tag.weight - 4) * 2.8;
        const opacity = 0.6 + (tag.weight / 10) * 0.35;
        const label = tagLabels[tag.key][language];

        return (
          <span
            key={tag.key}
            style={{
              fontSize: `${fontSize}px`,
              color: tag.color,
              opacity,
              padding: "8px 16px",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              borderRadius: "999px",
              border: `1px solid ${tag.color}33`,
              transition: "all 0.3s ease",
              cursor: "pointer",
              userSelect: "none",
              fontWeight: tag.weight >= 7 ? 600 : 500,
              boxShadow: "var(--shadow-ring)",
            }}
            onMouseOver={(event) => {
              event.currentTarget.style.transform = "translateY(-2px)";
              event.currentTarget.style.borderColor = tag.color;
              event.currentTarget.style.opacity = "1";
            }}
            onMouseOut={(event) => {
              event.currentTarget.style.transform = "translateY(0)";
              event.currentTarget.style.borderColor = `${tag.color}33`;
              event.currentTarget.style.opacity = opacity.toString();
            }}
          >
            {label}
          </span>
        );
      })}
    </div>
  );
}
