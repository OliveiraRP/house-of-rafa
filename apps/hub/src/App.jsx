import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage/AuthPage.jsx";
import AppsPage from "./pages/AppsPage/AppsPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/apps" element={<AppsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
