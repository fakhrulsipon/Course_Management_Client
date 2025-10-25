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
import DashboardLayout from './layout/DashboardLayout';
import ManageMessages from './pages/ManageMessages';

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
        loader: ({params}) => fetch(` https://coursemanagementserver-production.up.railway.app/course-details/${params.id}`),
        hydrateFallbackElement: <span className="loading loading-bars loading-xl"></span>,
        element: <CourseDetails></CourseDetails>
      },
      {
        path: '/manage-course',
        element: <PrivetRoute><ManageCourses></ManageCourses></PrivetRoute>
      },
      {
        path: '/edit-course/:id',
        loader: ({params}) => fetch(` https://coursemanagementserver-production.up.railway.app/course-details/${params.id}`),
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
    path: '/dashboard',
    element: <PrivetRoute><DashboardLayout></DashboardLayout></PrivetRoute>,
    children: [
      
      {
        path: 'add-course',
        element: <AddCourse/>
      },
      {
        path: 'manage-course',
        element: <ManageCourses/>
      },
      {
        path: 'my-enrolled',
        element: <MyEnrolled/>
      },
      {
        path: 'manage-message',
        element: <ManageMessages/>
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
