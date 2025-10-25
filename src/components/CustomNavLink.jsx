import React from 'react';
import { NavLink } from 'react-router';

const CustomNavLink = ({ 
  to, 
  children, 
  icon: Icon, // React Icon component
  end = false,
  className = "",
  activeClassName = "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 border-r-2 border-blue-600",
  inactiveClassName = "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700",
  onClick,
  iconSize = 20
}) => {
  const baseClasses = "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200";
  
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) => 
        `${baseClasses} ${isActive ? activeClassName : inactiveClassName} ${className}`
      }
    >
      {Icon && <Icon size={iconSize} className="mr-3 flex-shrink-0" />}
      {children}
    </NavLink>
  );
};

export default CustomNavLink;