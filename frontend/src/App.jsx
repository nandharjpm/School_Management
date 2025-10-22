import HomePage from "./views/component/HomePage";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import Confirmation from "./views/auth/Confirmation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from "./views/component/AdminDashboard";
import ProtectedRouter from "./views/component/ProtectedRouter";
import { UserProvider } from "./context/UserContext";
import LeftMenu from "./views/admin/admin_panel/LeftMenu";
import College from "./views/component/College";


export default function App() {
  return (
    <div>
      <BrowserRouter>
        <UserProvider>
          <ToastContainer position="top-right" autoClose={3000} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="*" element={<h1>Page Not Found</h1>} />
            <Route
              path="/admindashboard"
              element={
                <ProtectedRouter>
                  <AdminDashboard />
                  <LeftMenu />
                </ProtectedRouter>
              }
            />
            <Route path="/college" element={<College/>}/>
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}
