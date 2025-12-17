import { BrowserRouter, Routes, Route } from "react-router-dom";
import WalletsPage from "./pages/WalletsPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WalletsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
