import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import HomeLayout from './layout/HomeLayout';
import Home from './components/Home';
import Login from './pages/Login';
import AuthProvider from './Provider/AuthProvider';
import Register from './pages/Register';
import AddCourse from './pages/AddCourse';
import CourseDetails from './pages/CourseDetails';
import ManageCourses from './pages/ManageCourses';
import EditCourse from './pages/EditCourse';
import MyEnrolled from './pages/MyEnrolled';
import PrivetRoute from './Provider/PrivetRoute';
import AboutUs from './pages/AboutUs';
import NotFoundPage from './pages/NotFoundPage';
import Courses from './pages/Courses';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/add-course',
        element: <PrivetRoute><AddCourse></AddCourse></PrivetRoute>
      },
      {
        path: '/course-details/:id',
        loader: ({params}) => fetch(`http://localhost:3000/course-details/${params.id}`),
        hydrateFallbackElement: <span className="loading loading-bars loading-xl"></span>,
        element: <CourseDetails></CourseDetails>
      },
      {
        path: '/manage-course',
        element: <PrivetRoute><ManageCourses></ManageCourses></PrivetRoute>
      },
      {
        path: '/edit-course/:id',
        loader: ({params}) => fetch(`http://localhost:3000/course-details/${params.id}`),
        hydrateFallbackElement: <span className="loading loading-bars loading-xl"></span>,
        element: <PrivetRoute><EditCourse></EditCourse></PrivetRoute>
      },
      {
        path: '/my-enrolled',
        element: <PrivetRoute><MyEnrolled></MyEnrolled></PrivetRoute>
      },
      {
        path: '/about-us',
        element: <AboutUs></AboutUs>
      },
      {
        path: '/courses',
        element: <Courses></Courses>
      }
    ]
  },
  {
    path: '/*',
    element: <NotFoundPage></NotFoundPage>
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
