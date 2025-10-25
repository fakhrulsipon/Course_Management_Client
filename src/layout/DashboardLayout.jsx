import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { use } from "react";
import { Link } from "react-router";
import CustomNavLink from "../components/CustomNavLink";

// React Icons imports
import { FaBars, FaTimes, FaArrowLeft } from "react-icons/fa";
import { HiPlus, HiViewList, HiAcademicCap } from "react-icons/hi";
import axios from "axios";

const DashboardLayout = () => {
  const { user } = use(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState("user");
  const [loading, setLoading] = useState(true);
  console.log(userRole);

  // Fetch user role
  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user) return;
        try {
          setLoading(true); 
          const response = await axios.get(
            `https://coursemanagementserver-production.up.railway.app/user-role/${user.email}`
          );
          setUserRole(response.data.userRole);
        } catch (error) {
          console.error("Error fetching user role:", error);
          setUserRole("user"); // Default to user role
        } finally {
          setLoading(false);
        }
    };

    fetchUserRole();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-10 w-10 animate-[spin_2s_linear_infinite] rounded-full border-4 border-dashed border-sky-600"></div>
        ;
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 shadow-lg">
        <div className="flex flex-col flex-1 pt-5 pb-4">
          <div className="flex items-center justify-center px-4 mb-8">
            {/* Go to Home Button */}
            <Link
              to="/"
              className="flex items-center px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <FaArrowLeft className="mr-2" size={16} />
              Go to Home
            </Link>
          </div>

          {/* Navigation with CustomNavLink and React Icons */}
          <nav className="mt-8 flex-1 px-4 space-y-2">
            {/* Admin routes - Only for admin */}
            {userRole === "admin" && (
              <>
                <CustomNavLink
                  to="/dashboard/add-course"
                  icon={HiPlus}
                  iconSize={18}
                >
                  Add Course
                </CustomNavLink>

                <CustomNavLink
                  to="/dashboard/manage-message"
                  icon={HiPlus}
                  iconSize={18}
                >
                  Manage Messages
                </CustomNavLink>
              </>
            )}

            {/* User routes - Only for user */}
            {userRole === "user" && (
              <>
              <CustomNavLink
                  to="/dashboard/add-course"
                  icon={HiPlus}
                  iconSize={18}
                >
                  Add Course
                </CustomNavLink>

                <CustomNavLink
                  to="/dashboard/manage-course"
                  icon={HiViewList}
                  iconSize={18}
                >
                  Manage Courses
                </CustomNavLink>
                <CustomNavLink
                  to="/dashboard/my-enrolled"
                  icon={HiAcademicCap}
                  iconSize={18}
                >
                  My Enrolled Courses
                </CustomNavLink>
              </>
            )}
          </nav>

          {/* User Info */}
          <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <img
                src={user?.photoURL}
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-blue-400"
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user?.displayName || "User"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg">
            <div className="flex flex-col h-full pt-5 pb-4">
              {/* Mobile sidebar header */}
              <div className="flex items-center justify-between px-4 mb-8">
                <div className="flex items-center">
                  {/* Go to Home Button */}
                  <Link
                    to="/"
                    className="flex items-center px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <FaArrowLeft className="mr-2" size={16} />
                    Go to Home
                  </Link>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              {/* Mobile navigation with CustomNavLink */}
              <nav className="mt-8 flex-1 px-4 space-y-2">
                <CustomNavLink
                  to="/dashboard/add-course"
                  icon={HiPlus}
                  iconSize={18}
                  onClick={() => setSidebarOpen(false)}
                >
                  Add Course
                </CustomNavLink>

                <CustomNavLink
                  to="/dashboard/manage-course"
                  icon={HiViewList}
                  iconSize={18}
                  onClick={() => setSidebarOpen(false)}
                >
                  Manage Courses
                </CustomNavLink>

                <CustomNavLink
                  to="/dashboard/my-enrolled"
                  icon={HiAcademicCap}
                  iconSize={18}
                  onClick={() => setSidebarOpen(false)}
                >
                  My Enrolled Courses
                </CustomNavLink>
              </nav>

              {/* Mobile user info */}
              <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <img
                    src={user?.photoURL}
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-blue-400"
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user?.displayName || "User"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b xl:hidden border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 mr-4"
              >
                <FaBars size={20} />
              </button>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Dashboard
              </h1>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
