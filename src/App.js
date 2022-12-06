
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import Class from "./pages/classes/Classes";
import Login from './pages/member/Login';
import Register from './pages/member/Register';
import Error from './pages/Error';
import MyPageLayout from "./layouts/MyPageLayout";
import Profile from "./pages/member/Profile";
import Main from "./pages/main/Main"
import ClassManagement from "./pages/admin/ClassManagement";
import ClassRegistration from "./pages/admin/ClassRegistration";
import ClassUpdate from "./pages/admin/ClassUpdate";
import ClassDetail from "./pages/classes/ClassDetail";
import TeacherManagement from "./pages/teacher/TeacherManagement";
import TeacherRegistration from "./pages/teacher/TeacherRegistration";
import MemberManagement from "./pages/member/MemberManagement";
import MemberUpdate from "./pages/member/MemberUpdate";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Layout/> }>
        <Route index element={ <Main/> }/>
        <Route path="/classes"index element={ <Class/> }/>
        <Route path="class/:classCode" element={ <ClassDetail/> }/>
          

          <Route path="mypage" element={ <MyPageLayout/> }>
            <Route index element={ <Navigate to="/mypage/profile" replace /> } />
            <Route path="profile" element={ <Profile/> }/>
          </Route>
          <Route path="class-management" element={ <ClassManagement/> }/>
          <Route path="class-registration" element={ <ClassRegistration/> }/>
          <Route path="class-update/:classCode" element={ <ClassUpdate/> }/>

          <Route path="teacher-management" element={ <TeacherManagement/> }/>
          <Route path="teacher-registration" element={ <TeacherRegistration/> }/>

          <Route path="member-management" element={ <MemberManagement/> }/>
          <Route path="member-update/:memberCode" element={ <MemberUpdate/> }/>


        </Route>

        <Route path="/login" element={ <Login/>}/>
        <Route path="/register" element={ <Register/>}/>
        <Route path="*" element={ <Error/> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
