import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import ForecastPage from "./components/forecast/ForecastPage";
import GraphPage from "./components/graph/GraphPage";
import ResumePage from "./components/resume/ResumePage";
import { LanguageProvider } from "./i18n/LanguageContext";

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/forecast" replace />} />
          <Route path="/forecast" element={<ForecastPage />} />
          <Route path="/graph" element={<GraphPage />} />
          <Route path="/resume" element={<ResumePage />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}
