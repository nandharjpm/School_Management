import HomePage from "./views/component/HomePage";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import Confirmation from "./views/auth/Confirmation";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="*" element={ <h1>Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
