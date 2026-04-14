import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "../shared/GlassCard";
import { useTalentStore } from "../../store/talentStore";
import { Network, Database, Loader2 } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";
import { roleLabels } from "../../i18n/translations";

export default function ResumePage() {
  const navigate = useNavigate();
  const addTalentNode = useTalentStore((state) => state.addTalentNode);
  const { language, copy } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    targetRole: "mfg",
    ownedSkills: "",
    gapSkills: "",
  });
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    window.difyChatbotConfig = {
      token: "GyKUm3Gio7gZebtD",
      inputs: {},
      systemVariables: {},
      userVariables: {},
    };

    const script = document.createElement("script");
    script.src = "https://udify.app/embed.min.js";
    script.id = "GyKUm3Gio7gZebtD";
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      const existingScript = document.getElementById("GyKUm3Gio7gZebtD");
      if (existingScript) {
        document.body.removeChild(existingScript);
      }

      const difyBubble = document.getElementById("dify-chatbot-bubble-button");
      const difyWindow = document.getElementById("dify-chatbot-bubble-window");
      if (difyBubble) {
        difyBubble.remove();
      }
      if (difyWindow) {
        difyWindow.remove();
      }

      delete window.difyChatbotConfig;
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSync = async (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      window.alert(copy.resume.validationNameRequired);
      return;
    }

    setIsSyncing(true);

    const talentData = {
      name: formData.name.trim(),
      targetRole: formData.targetRole,
      roleLabel: roleLabels[formData.targetRole][language],
      scores: {
        technical: 4,
        management: 3,
        innovation: 3,
        cultural: 4,
        leadership: 2,
        learning: 4,
      },
      roleMatch: { [formData.targetRole]: 90 },
      ownedSkills: formData.ownedSkills
        .split(/[,，、]+/)
        .map((skill) => skill.trim())
        .filter(Boolean),
      gapSkills: formData.gapSkills
        .split(/[,，、]+/)
        .map((skill) => skill.trim())
        .filter(Boolean),
    };

    setTimeout(() => {
      addTalentNode(talentData);
      setIsSyncing(false);
      navigate("/graph");
    }, 1500);
  };

  return (
    <div
      style={{
        padding: "32px",
        maxWidth: "1440px",
        margin: "0 auto",
        display: "flex",
        gap: "24px",
        minHeight: "calc(100vh - 72px)",
        flexWrap: "wrap",
        alignItems: "stretch",
      }}
    >
      <GlassCard
        style={{
          flex: "1 1 640px",
          padding: "34px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <div>
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
            {copy.resume.eyebrow}
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              margin: "14px 0 12px 0",
              fontSize: "clamp(2rem, 3.6vw, 3.2rem)",
              lineHeight: 1.15,
              fontWeight: 500,
            }}
          >
            {copy.resume.title}
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "17px", margin: 0 }}>
            {copy.resume.intro}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "14px",
          }}
        >
          {copy.resume.steps.map((step, index) => (
            <div
              key={step}
              style={{
                padding: "18px",
                borderRadius: "22px",
                backgroundColor: "rgba(255, 255, 255, 0.72)",
                border: "1px solid var(--glass-border)",
                boxShadow: "var(--shadow-ring)",
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "999px",
                  display: "grid",
                  placeItems: "center",
                  marginBottom: "12px",
                  backgroundColor: "rgba(201, 100, 66, 0.12)",
                  color: "var(--accent-primary)",
                  fontWeight: 700,
                  fontSize: "13px",
                }}
              >
                {index + 1}
              </div>
              <span style={{ color: "var(--text-primary)" }}>{step}</span>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "auto",
            padding: "22px",
            backgroundColor: "rgba(201, 100, 66, 0.07)",
            borderRadius: "24px",
            border: "1px solid rgba(201, 100, 66, 0.18)",
          }}
        >
          <h4
            style={{
              margin: "0 0 8px 0",
              color: "var(--text-primary)",
              fontFamily: "var(--font-display)",
              fontSize: "24px",
              fontWeight: 500,
            }}
          >
            {copy.resume.helperTitle}
          </h4>
          <span style={{ color: "var(--text-secondary)", fontSize: "15px" }}>
            {copy.resume.helperText}
          </span>
        </div>
      </GlassCard>

      <GlassCard
        style={{
          width: "420px",
          maxWidth: "100%",
          padding: "28px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
          <Database size={20} color="var(--accent-primary)" />
          <h3
            style={{
              margin: 0,
              fontSize: "28px",
              fontFamily: "var(--font-display)",
              fontWeight: 500,
            }}
          >
            {copy.resume.bridgeTitle}
          </h3>
        </div>

        <form onSubmit={handleSync} style={{ display: "flex", flexDirection: "column", gap: "16px", flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
              {copy.resume.nameLabel} <span style={{ color: "var(--accent-danger)" }}>*</span>
            </label>
            <input
              className="warm-field"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder={copy.resume.namePlaceholder}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
              {copy.resume.targetRoleLabel}
            </label>
            <select
              className="warm-field"
              name="targetRole"
              value={formData.targetRole}
              onChange={handleChange}
            >
              {Object.entries(roleLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label[language]}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
              {copy.resume.ownedSkillsLabel}
            </label>
            <textarea
              className="warm-field"
              name="ownedSkills"
              value={formData.ownedSkills}
              onChange={handleChange}
              placeholder={copy.resume.ownedSkillsPlaceholder}
              rows={4}
              style={{ resize: "vertical", minHeight: "108px" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
              {copy.resume.gapSkillsLabel}
            </label>
            <textarea
              className="warm-field"
              name="gapSkills"
              value={formData.gapSkills}
              onChange={handleChange}
              placeholder={copy.resume.gapSkillsPlaceholder}
              rows={4}
              style={{
                resize: "vertical",
                minHeight: "108px",
                borderStyle: "dashed",
                borderColor: "rgba(181, 51, 51, 0.35)",
              }}
            />
          </div>

          <button
            type="submit"
            className="brand-button"
            disabled={isSyncing}
            style={{
              marginTop: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            {isSyncing ? (
              <>
                <Loader2 className="animate-spin" size={18} style={{ animation: "spin 1s linear infinite" }} />
                {copy.resume.submitting}
              </>
            ) : (
              <>
                <Network size={18} />
                {copy.resume.submit}
              </>
            )}
          </button>
        </form>
      </GlassCard>

      <AnimatePresence>
        {isSyncing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(245, 244, 237, 0.72)",
              backdropFilter: "blur(8px)",
              zIndex: 9999,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.14, 1],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Network size={64} color="var(--accent-primary)" />
            </motion.div>
            <h2
              style={{
                color: "var(--text-primary)",
                marginTop: "24px",
                fontFamily: "var(--font-display)",
                fontSize: "34px",
                fontWeight: 500,
              }}
            >
              {copy.resume.overlayTitle}
            </h2>
            <p style={{ color: "var(--text-secondary)", marginTop: "8px" }}>
              {copy.resume.overlayText}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
