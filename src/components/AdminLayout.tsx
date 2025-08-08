import { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { authService } from "../services/auth";
import AdminSidebar from './AdminSidebar';

interface AdminLayoutProps {
  children?: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [user, setUser] = useState(authService.getCurrentUser());

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
          <Link to="/" className="inline-block px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar - Always visible on all admin routes */}
      <AdminSidebar />
      
      {/* Main Content */}
      <div className="flex-1 md:pl-64">
        <main>
          <div className="py-6">
            <div className="px-4 sm:px-6 lg:px-8">
              {children || <Outlet />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
