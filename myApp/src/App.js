import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import React from 'react';
import HomePage from './Pages/HomePage.jsx'
import StudentPortal from './portal/StudentPortal.jsx';
import StaffPortal from './portal/StaffPortal.jsx';
import ErrorPage from './error/ErrorPage'
import { loader as staffLoader } from './portal/StaffPortal.jsx';
import StudentRecord from './record/StudentRecord.jsx';
import { loader as studentLoader } from './record/StudentRecord'


const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route index element={<HomePage />} />
    <Route path='studentPortal' element={<StudentPortal />} />
    <Route path='staffPortal' element={<StaffPortal />} loader={staffLoader} errorElement={<ErrorPage />} shouldRevalidate={() => false}>
      <Route path='studentRecord' element={<StudentRecord />} loader={studentLoader} shouldRevalidate={() => false}/>
    </Route>
    <Route path='studentData' element={<StudentPortal />} errorElement={<ErrorPage />} />
    <Route path="/*" element={<Navigate to='/' />} />
  </Route>
))

function App() {
  return (<RouterProvider router={router} />);
}

export default App;