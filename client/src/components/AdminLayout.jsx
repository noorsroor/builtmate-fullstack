// src/components/AdminLayout.jsx
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import ProtectedAdminRoute from './ProtectedAdminRoute';
import AdminSidebar from "./admin/Sidebar"
import AdminToolbar from './admin/AdminToolbar';
import { useState,useEffect } from 'react';

const getPageTitle = (pathname) => {
  if (pathname.includes("/admin/users")) return "Manage Users";
  if (pathname.includes("/admin/professionals")) return "Manage Professionals";
  if (pathname.includes("/admin/bookings")) return "Manage Bookings";
  if (pathname.includes("/admin/ideas")) return "Manage Ideas";
  return "Dashboard";
};

const AdminLayout = () => {
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [screenSize, setScreenSize] = useState(getScreenSize());
  
  // Function to determine screen size
  function getScreenSize() {
    const width = window.innerWidth;
    if (width < 375) return 'xs-mobile'; // 320px
    if (width < 425) return 'm-mobile';  // 375px
    if (width < 768) return 'l-mobile';  // 425px
    if (width < 1024) return 'tablet';   // 768px
    return 'desktop';                    // 1024px and up
  }
  
  // Update screen size on resize
  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getScreenSize());
      
      // Auto-close sidebar on small screens when resizing
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Set initial sidebar state based on screen size
    if (window.innerWidth >= 1024) {
      setSidebarOpen(true);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Apply appropriate margin based on screen size
  let contentClasses;
  if (screenSize === 'desktop') {
    contentClasses = 'ml-64'; // Always show margin on desktop
  } else {
    contentClasses = 'ml-0'; // No margin on other devices
  }

  return (
    <ProtectedAdminRoute>
    <div className="flex h-screen bg-gray-50">
      {/* Fixed sidebar */}
      <AdminSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Main content with left margin for sidebar */}
      <div className={`flex flex-col flex-1 ${contentClasses} min-h-screen transition-all duration-300`}>
        <AdminToolbar title={pageTitle} toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </ProtectedAdminRoute>
  );
};

export default AdminLayout;
