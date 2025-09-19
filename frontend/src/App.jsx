import HomePage from "./views/component/HomePage";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Login from "./views/auth/Login";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <HomePage />
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
