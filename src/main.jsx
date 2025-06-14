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
        element: <AddCourse></AddCourse>
      },
      {
        path: '/course-details/:id',
        loader: ({params}) => fetch(`http://localhost:3000/course-details/${params.id}`),
        element: <CourseDetails></CourseDetails>
      }
    ]
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
