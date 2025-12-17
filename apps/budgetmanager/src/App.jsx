import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootPage from "./pages/RootPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<RootPage />} />
      </Routes>
    </BrowserRouter>
  );
}
