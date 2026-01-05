import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootPage from "./pages/RootPage.jsx";
import { SettingsProvider } from "./contexts/SettingsContext";

export default function App() {
  return (
    <BrowserRouter>
      <SettingsProvider>
        <Routes>
          <Route path="/*" element={<RootPage />} />
        </Routes>
      </SettingsProvider>
    </BrowserRouter>
  );
}
