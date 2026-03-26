import HomePage from "./views/component/HomePage";
import Program from "./views/component/Program";
import Campuslife from "./views/component/Campuslife";
import Innovations from "./views/component/innovations";
import { BrowserRouter, Routes, Route, Navigate, Outlet} from "react-router-dom";
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import Confirmation from "./views/auth/Confirmation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from "./views/component/AdminDashboard";
// import UserForm from "./views/component/UserForm";
import ProtectedRouter from "./views/component/ProtectedRouter";
import { UserProvider } from "./context/UserContext";
import Location_list from "./views/component/master/location/Location_list";
import Location_add from "./views/component/master/location/Location_add";
import LocationView from "./views/component/master/location/LocationView";
import LocationEdit from "./views/component/master/location/LocationEdit";

import CollegeList from "./views/component/master/college/CollegeList";
import CollegeAdd from "./views/component/master/college/CollegeAdd";
import CollegeEdit from "./views/component/master/college/CollegeEdit";
import CollegeView from "./views/component/master/college/CollegeView";

import BuildingList from "./views/component/master/building/BuildingList";
import BuildingAdd from "./views/component/master/building/BuildingAdd";
import BuildingEdit from "./views/component/master/building/BuildingEdit";
import BuildingView from "./views/component/master/building/BuildingView";

import DepartmentList from "./views/component/master/department/DepartmentList";
import DepartmentAdd from "./views/component/master/department/DepartmentAdd";
import DepartmentEdit from "./views/component/master/department/DepartmentEdit";
import DepartmentView from "./views/component/master/department/DepartmentView";

import StaffList from "./views/component/master/staff/StaffList";
import StaffAdd from "./views/component/master/staff/StaffAdd";
import StaffEdit from "./views/component/master/staff/StaffEdit";
import StaffView from "./views/component/master/staff/StaffView";

import StudentList from "./views/component/master/student/StudentList";
import StudentAdd from "./views/component/master/student/StudentAdd";
import StudentEdit from "./views/component/master/student/StudentEdit";
import StudentView from "./views/component/master/student/StudentView";

import CourseList from "./views/component/academics/course/CourseList";
import CourseAdd from "./views/component/academics/course/CourseAdd";
import CourseView from "./views/component/academics/course/CourseView";
import CourseEdit from "./views/component/academics/course/CourseEdit";

import Library from "./views/component/academics/library/Library";

// import NoticeBoard from "./views/component/news/NoticeBoard";
// import NoticeBoardAdd from "./views/component/news/NoticeBoardAdd";



export default function App() {
  return (
    <div>
      <BrowserRouter>
        <UserProvider>
          <ToastContainer position="top-right" autoClose={3000} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/program" element={<Program />} />
            <Route path="/innovations" element={<Innovations />} />
            <Route path="/campus-life" element={<Campuslife />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="*" element={<h1>Page Not Found</h1>} />
            <Route path="/adminDashboard" element={ <ProtectedRouter> <AdminDashboard /> </ProtectedRouter>}/>
            
            <Route path="location" element={<ProtectedRouter>  <Outlet /></ProtectedRouter>}
            >
              <Route index element={<Navigate to="list" replace />} />
              <Route path="list" element={<Location_list />} />
              <Route path="add" element={<Location_add />} />
              <Route path="view/:id" element={<LocationView />} />
              <Route path="edit/:id" element={<LocationEdit />} />
            </Route>

            <Route path="college" element={ <ProtectedRouter><Outlet /></ProtectedRouter>}>
              <Route index element={<Navigate to="list" replace />} />
              <Route path="list" element={<CollegeList />} />
              <Route path="add" element={<CollegeAdd />} />
              <Route path="view/:id" element={<CollegeView />} />
              <Route path="edit/:id" element={<CollegeEdit />} />
            </Route>

            <Route path="building" element={<ProtectedRouter> <Outlet /> </ProtectedRouter>} >
              <Route index element={<Navigate to="list" replace />} />
              <Route path="list" element={<BuildingList />} />
              <Route path="add" element={<BuildingAdd />} />
              <Route path="view/:id" element={<BuildingView />} />
              <Route path="edit/:id" element={<BuildingEdit />} />
            </Route>

            <Route path="department" element={<ProtectedRouter> <Outlet /> </ProtectedRouter>} >
              <Route index element={<Navigate to="list" replace />} />
              <Route path="list" element={<DepartmentList />} />
              <Route path="add" element={<DepartmentAdd />} />
              <Route path="view/:id" element={<DepartmentView />} />
              <Route path="edit/:id" element={<DepartmentEdit />} />
            </Route>

            <Route path="staff" element={<ProtectedRouter> <Outlet /> </ProtectedRouter>} >
              <Route index element={<Navigate to="list" replace />} />
              <Route path="list" element={<StaffList />} />
              <Route path="add" element={<StaffAdd />} />
              <Route path="view/:id" element={<StaffView />} />
              <Route path="edit/:id" element={<StaffEdit />} />
            </Route>

            <Route path="student" element={<ProtectedRouter> <Outlet /> </ProtectedRouter>} >
              <Route index element={<Navigate to="list" replace />} />
              <Route path="list" element={<StudentList />} />
              <Route path="add" element={<StudentAdd />} />
              <Route path="view/:id" element={<StudentView />} />
              <Route path="edit/:id" element={<StudentEdit />} />
            </Route>


            <Route path="course" element={<ProtectedRouter> <Outlet /> </ProtectedRouter>} >
              <Route index element={<Navigate to="list" replace />} />
              <Route path="list" element={<CourseList />} />
              <Route path="add" element={<CourseAdd />} />
              <Route path="view/:id" element={<CourseView />} />
              <Route path="edit/:id" element={<CourseEdit />} />
            </Route>


            <Route path="library" element={<ProtectedRouter> <Outlet /> </ProtectedRouter>} >
              <Route index element={<Navigate to="search-page" replace />} />
              <Route path="search-page" element={<Library />} />
            </Route>

            {/* <Route path="noticeboard" element={<ProtectedRouter> <Outlet /> </ProtectedRouter>} >
              <Route index element={<Navigate to="noticeboard" replace />} />
              <Route path="noticeboard" element={<NoticeBoard />} />
              <Route path="add" element={<NoticeBoardAdd />} />
            </Route> */}


          </Routes>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}
