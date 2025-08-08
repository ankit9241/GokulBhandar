import { useState } from 'react';
import { RiSearchLine, RiUserLine, RiDeleteBinLine, RiCheckLine, RiCloseLine, RiShoppingCartLine } from 'react-icons/ri';
import { toast } from 'react-hot-toast';


type CustomerStatus = 'active' | 'inactive';

interface Customer {
  id: string;
  name: string;
  email: string;
  status: CustomerStatus;
  joinDate: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
}

// Mock data - in a real app, this would come from an API
const mockCustomers: Customer[] = [
  { 
    id: '1', 
    name: 'Rahul Sharma', 
    email: 'rahul@example.com', 
    status: 'active', 
    joinDate: '2025-01-15',
    phone: '+91 9876543210',
    totalOrders: 15,
    totalSpent: 4500,
    lastOrder: '2024-01-15'
  },
  { 
    id: '2', 
    name: 'Priya Patel', 
    email: 'priya@example.com', 
    status: 'active', 
    joinDate: '2025-02-20',
    phone: '+91 9876543211',
    totalOrders: 8,
    totalSpent: 2800,
    lastOrder: '2024-01-14'
  },
  { 
    id: '3', 
    name: 'Amit Singh', 
    email: 'amit@example.com', 
    status: 'inactive', 
    joinDate: '2025-03-10',
    phone: '+91 9876543212',
    totalOrders: 23,
    totalSpent: 7200,
    lastOrder: '2024-01-13'
  },
  { 
    id: '4', 
    name: 'Neha Gupta', 
    email: 'neha@example.com', 
    status: 'active', 
    joinDate: '2025-04-05',
    phone: '+91 9876543213',
    totalOrders: 5,
    totalSpent: 1500,
    lastOrder: '2024-01-16'
  },
];

const CustomersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recent');

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);
    const matchesStatus = selectedStatus === 'all' || customer.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
    } else if (sortBy === 'top') {
      return b.totalSpent - a.totalSpent;
    } else if (sortBy === 'orders') {
      return b.totalOrders - a.totalOrders;
    }
    return 0;
  });

  const handleToggleStatus = (customerId: string) => {
    setCustomers(customers.map(customer => 
      customer.id === customerId 
        ? { ...customer, status: customer.status === 'active' ? 'inactive' : 'active' } 
        : customer
    ));
    toast.success('Customer status updated');
  };

  const handleDeleteCustomer = (customerId: string) => {
    if (window.confirm('Are you sure you want to delete this customer? This action cannot be undone.')) {
      setCustomers(customers.filter(customer => customer.id !== customerId));
      toast.success('Customer deleted successfully');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Customers Management</h1>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search customers by name, email or phone..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <select
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="recent">Most Recent</option>
                <option value="top">Top Spenders</option>
                <option value="orders">Most Orders</option>
              </select>
              <select
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Order</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <RiUserLine className="h-6 w-6 text-gray-500" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                        <div className="text-sm text-gray-500">Joined {new Date(customer.joinDate).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{customer.email}</div>
                    <div className="text-sm text-gray-500">{customer.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <RiShoppingCartLine className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm font-medium">{customer.totalOrders}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{customer.totalSpent.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${customer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(customer.lastOrder).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleToggleStatus(customer.id)}
                        className={customer.status === 'active' 
                          ? 'text-yellow-600 hover:text-yellow-900' 
                          : 'text-green-600 hover:text-green-900'}
                        title={customer.status === 'active' ? 'Deactivate' : 'Activate'}
                      >
                        {customer.status === 'active' ? <RiCloseLine className="h-5 w-5" /> : <RiCheckLine className="h-5 w-5" />}
                      </button>
                      <button
                        onClick={() => handleDeleteCustomer(customer.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete Customer"
                      >
                        <RiDeleteBinLine className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;
