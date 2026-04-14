import { NavLink } from "react-router-dom";
import {
  BarChart2,
  Network,
  FileSearch,
  Hexagon,
  Languages,
} from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";
import { languageOptions } from "../../i18n/translations";

export default function Navbar() {
  const { language, setLanguage, copy } = useLanguage();
  const tabs = [
    { label: copy.navbar.forecast, path: "/forecast", icon: <BarChart2 size={18} /> },
    { label: copy.navbar.graph, path: "/graph", icon: <Network size={18} /> },
    { label: copy.navbar.resume, path: "/resume", icon: <FileSearch size={18} /> },
  ];

  return (
    <nav
      style={{
        minHeight: "72px",
        backgroundColor: "rgba(245, 244, 237, 0.92)",
        borderBottom: "1px solid var(--glass-border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "20px",
        padding: "0 28px",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backdropFilter: "blur(18px)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "18px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "14px",
              display: "grid",
              placeItems: "center",
              backgroundColor: "var(--bg-card-strong)",
              boxShadow: "var(--shadow-ring)",
            }}
          >
            <Hexagon color="var(--accent-primary)" size={20} />
          </div>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "22px",
              fontWeight: 500,
              color: "var(--text-primary)",
              letterSpacing: "0.02em",
            }}
          >
            {copy.appName}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            height: "72px",
            alignItems: "stretch",
            flexWrap: "wrap",
          }}
        >
          {tabs.map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "0 18px",
                textDecoration: "none",
                color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                borderBottom: isActive
                  ? "2px solid var(--accent-primary)"
                  : "2px solid transparent",
                height: "72px",
                fontWeight: isActive ? 600 : 400,
                lineHeight: 1,
                transition: "color 0.2s ease, border-color 0.2s ease",
              })}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </NavLink>
          ))}
        </div>
      </div>

      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "10px 14px",
          borderRadius: "16px",
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--glass-border)",
          boxShadow: "var(--shadow-ring)",
          color: "var(--text-secondary)",
        }}
      >
        <Languages size={16} />
        <span style={{ fontSize: "14px" }}>{copy.navbar.languageLabel}</span>
        <select
          className="lang-select"
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
          aria-label={copy.navbar.languageLabel}
        >
          {languageOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </nav>
  );
}
