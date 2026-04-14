import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { mockForecastData } from "../../api/mockData";
import { useLanguage } from "../../i18n/LanguageContext";
import { roleLabels } from "../../i18n/translations";

export default function ForecastChart() {
  const { language, copy } = useLanguage();
  const formatter = new Intl.NumberFormat(copy.locale);
  const gradients = [
    { id: "colorRd", key: "rd", color: "var(--node-rd)" },
    { id: "colorMfg", key: "mfg", color: "var(--node-mfg)" },
    { id: "colorBiz", key: "biz", color: "var(--node-biz)" },
    { id: "colorSupport", key: "support", color: "var(--node-support)" },
  ];

  return (
    <div style={{ width: "100%", height: "420px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={mockForecastData}
          margin={{ top: 10, right: 12, left: -12, bottom: 0 }}
        >
          <defs>
            {gradients.map((gradient) => (
              <linearGradient key={gradient.id} id={gradient.id} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={gradient.color} stopOpacity={0.38} />
                <stop offset="95%" stopColor={gradient.color} stopOpacity={0.04} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(94, 93, 89, 0.14)" vertical={false} />
          <XAxis
            dataKey="year"
            stroke="var(--text-muted)"
            tick={{ fill: "var(--text-secondary)", fontSize: 13 }}
            tickMargin={10}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            stroke="var(--text-muted)"
            tick={{ fill: "var(--text-secondary)", fontSize: 13 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => formatter.format(value)}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.96)",
              border: "1px solid var(--glass-border)",
              borderRadius: "18px",
              boxShadow: "var(--shadow-soft)",
            }}
            itemStyle={{ color: "var(--text-primary)", fontSize: "14px" }}
            labelStyle={{ color: "var(--text-secondary)", marginBottom: "8px" }}
            formatter={(value, name) => [
              `${formatter.format(value)} ${copy.forecast.peopleUnit}`,
              name,
            ]}
          />
          <Legend
            wrapperStyle={{ paddingTop: "20px" }}
            iconType="circle"
            formatter={(value) => <span style={{ color: "var(--text-secondary)" }}>{value}</span>}
          />
          {gradients.map((gradient) => (
            <Area
              key={gradient.key}
              type="monotone"
              dataKey={gradient.key}
              name={roleLabels[gradient.key][language]}
              stroke={gradient.color}
              fillOpacity={1}
              fill={`url(#${gradient.id})`}
              strokeWidth={2.5}
              activeDot={{ r: 5, strokeWidth: 0, fill: gradient.color }}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
