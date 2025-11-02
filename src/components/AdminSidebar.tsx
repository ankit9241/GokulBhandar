import { Link, useLocation } from 'react-router-dom';
import { 
  RiDashboardLine, 
  RiShoppingBagLine, 
  RiFileListLine, 
  RiFolderLine, 
  RiUserLine, 
  RiBarChartLine
} from 'react-icons/ri';

const AdminSidebar = () => {
  const location = useLocation();

  const navigation = [
    { 
      name: 'Dashboard', 
      href: '/admin', 
      icon: <RiDashboardLine className="h-5 w-5" />,
      exact: true
    },
    { 
      name: 'Products', 
      href: '/admin/products', 
      icon: <RiShoppingBagLine className="h-5 w-5" />,
      exact: false
    },
    { 
      name: 'Orders', 
      href: '/admin/orders', 
      icon: <RiFileListLine className="h-5 w-5" />,
      exact: false
    },
    { 
      name: 'Categories', 
      href: '/admin/categories', 
      icon: <RiFolderLine className="h-5 w-5" />,
      exact: false
    },
    { 
      name: 'Customers', 
      href: '/admin/customers', 
      icon: <RiUserLine className="h-5 w-5" />,
      exact: false
    },
    { 
      name: 'Analytics', 
      href: '/admin/analytics', 
      icon: <RiBarChartLine className="h-5 w-5" />,
      exact: false
    },
  ].map(item => ({
    ...item,
    current: item.exact 
      ? location.pathname === item.href 
      : location.pathname.startsWith(item.href) && 
        (location.pathname === item.href || 
         location.pathname.startsWith(`${item.href}/`))
  }));

  return (
    <div className="fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg">
      <div className="flex flex-col h-full">
        {/* Logo/Brand */}
        <div className="px-4 py-5 border-b border-white bg-white">
          <h1 className="text-xl font-bold text-green-600">Gokul Bhandar</h1>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`${
                item.current 
                  ? 'bg-green-50 text-green-700 font-semibold'
                  : 'text-gray-700 hover:bg-green-50 hover:text-green-700'
              } group flex items-center px-3 py-2.5 text-sm rounded-md transition-colors`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default AdminSidebar;
