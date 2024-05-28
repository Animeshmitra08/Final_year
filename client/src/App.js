import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Authentication/Login';
import Dashboard from './Pages/Dashboard';
import HomePage from './Pages/HomePage';
import Contacts from './singlepage/Contacts';
import About from './singlepage/About';
import AdminLogin from './Authentication/AdminLogin';
import SignUp from './Authentication/SignUp';
import { Certificate } from './Pages/Certificate';
import { UserAuthContextProvider } from './Authentication/UseAuthContext';
import ProtectedRoute from './Authentication/ProtectedRoute';
import Profile from './Pages/Profile';
import Exam from './Pages/Exam';
import ExamPage from './Pages/ExamPage';
import Course from './Pages/Course';
import ViewCourse from './Pages/ViewCourse';
import ResetPass from './Pages/ResetPass';
import DashboardAdmin from './Admin/DashboardAdmin';
import Users from './Admin/Users';
import AdminCourse from './Admin/AdminCourse';
import ProtectedAdminRoute from './Admin/ProtectedAdminRoute';
import ApplyWithPayment from './Pages/ApplyWithPayment';

  




function App() {
  return (
    <>
      <UserAuthContextProvider>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/register' element={<SignUp/>}/>

          <Route exact path='/dashboard' element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="profile" replace/>}/>
            <Route path='profile' element={<Profile/>}/>
            <Route path='exam' element={<Exam/>}/>
          </Route>
          <Route exact path='/examportal' element={
            <ProtectedRoute>
              <ExamPage/>
            </ProtectedRoute>
          }/>

          {/* Admin--------------- */}          
          <Route exact path='/adminlogin' element={<AdminLogin />}/>
          <Route path='/admindashboard' element={
              <DashboardAdmin/>
          }>
            <Route index element={<Navigate to="users" replace/>}/>
            <Route path='users' element={<Users/>}/>
            <Route path='courses' element={<AdminCourse/>}/>
          </Route>

          <Route exact path='/contact' element={<Contacts/>}/>
          <Route exact path='/about' element={<About/>}/>
          <Route exact path='/viewcourses/:name/:id' element={<ViewCourse/>}/>
          <Route exact path='/applynow/:id/:cname' element={<ApplyWithPayment/>}/>
          <Route exact path='/certificate' element={<Certificate/>}/>
          <Route exact path='/courses' element={<Course/>}/>
          <Route exact path='/resetpassword' element={<ResetPass/>}/>
          <Route path='*' element={<h1>Page not found</h1>}/>
        </Routes>
      </UserAuthContextProvider>
    </>
  );
}

export default App;
