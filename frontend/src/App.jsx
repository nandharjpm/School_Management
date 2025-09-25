import HomePage from "./views/component/HomePage";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Login from "./views/auth/Login";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={ <h1>Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
