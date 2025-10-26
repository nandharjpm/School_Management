import HomePage from "./views/component/HomePage";
import { BrowserRouter, Routes, Route, Navigate, Outlet} from "react-router-dom";
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import Confirmation from "./views/auth/Confirmation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from "./views/component/AdminDashboard";
import ProtectedRouter from "./views/component/ProtectedRouter";
import { UserProvider } from "./context/UserContext";
import LeftMenu from "./views/admin/admin_panel/LeftMenu";
import Location_list from "./views/component/master/location/Location_list";
import Location_add from "./views/component/master/location/Location_add";
import LocationView from "./views/component/master/location/LocationView";
import LocationEdit from "./views/component/master/location/LocationEdit";


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
            <Route path="location" element={<Outlet />}>
              <Route index element={<Navigate to="list" replace />} />
              <Route path="list" element={<Location_list />} />
              <Route path="add" element={<Location_add />} />
              <Route path="view/:id" element={<LocationView />}/>
              <Route path="edit/:id" element={<LocationEdit />}/>
            </Route>
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}
