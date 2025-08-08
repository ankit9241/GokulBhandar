import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, LineChart, Line } from 'recharts';

const AnalyticsPage = () => {
  const monthlyData = [
    { month: 'Jan', revenue: 42000, orders: 245, customers: 89 },
    { month: 'Feb', revenue: 38000, orders: 189, customers: 76 },
    { month: 'Mar', revenue: 51000, orders: 312, customers: 124 },
    { month: 'Apr', revenue: 46000, orders: 278, customers: 98 },
    { month: 'May', revenue: 55000, orders: 356, customers: 143 },
    { month: 'Jun', revenue: 59000, orders: 389, customers: 167 }
  ];

  const categoryData = [
    { name: 'Fruits & Vegetables', value: 35, color: '#10B981' },
    { name: 'Dairy & Bakery', value: 25, color: '#F59E0B' },
    { name: 'Chocolates', value: 20, color: '#8B5CF6' },
    { name: 'Ice Creams', value: 15, color: '#3B82F6' },
    { name: 'Others', value: 5, color: '#6B7280' }
  ];

  const hourlyData = [
    { hour: '6AM', orders: 12 },
    { hour: '7AM', orders: 28 },
    { hour: '8AM', orders: 45 },
    { hour: '9AM', orders: 62 },
    { hour: '10AM', orders: 78 },
    { hour: '11AM', orders: 85 },
    { hour: '12PM', orders: 95 },
    { hour: '1PM', orders: 88 },
    { hour: '2PM', orders: 72 },
    { hour: '3PM', orders: 58 },
    { hour: '4PM', orders: 45 },
    { hour: '5PM', orders: 52 },
    { hour: '6PM', orders: 68 },
    { hour: '7PM', orders: 75 },
    { hour: '8PM', orders: 65 },
    { hour: '9PM', orders: 48 },
    { hour: '10PM', orders: 32 },
    { hour: '11PM', orders: 15 }
  ];

  const topProducts = [
    { name: 'Fresh Red Apples', sales: 1245, revenue: 62250 },
    { name: 'Full Cream Milk', sales: 1132, revenue: 33960 },
    { name: 'Organic Bananas', sales: 998, revenue: 29940 },
    { name: 'Dark Chocolate Bar', sales: 756, revenue: 45360 },
    { name: 'Vanilla Ice Cream', sales: 634, revenue: 31700 }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <div className="flex space-x-3">
          <select className="input-field pr-8">
            <option value="30">Last 30 days</option>
            <option value="90">Last 3 months</option>
            <option value="180">Last 6 months</option>
            <option value="365">Last year</option>
          </select>
          <button className="btn-primary">
            <i className="ri-download-line mr-2 w-4 h-4 flex items-center justify-center inline-flex"></i>
            Export Report
          </button>
        </div>
      </div>

      {/* Monthly Revenue Trend */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue Trend</h3>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip 
              formatter={(value, name) => {
                if (name === 'revenue') return [`₹${value.toLocaleString()}`, 'Revenue'];
                if (name === 'orders') return [value, 'Orders'];
                if (name === 'customers') return [value, 'New Customers'];
                return [value, name];
              }}
            />
            <Area type="monotone" dataKey="revenue" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales by Category */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center mt-4 gap-4">
            {categoryData.map((entry, index) => (
              <div key={index} className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></div>
                <span className="text-sm text-gray-600">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hourly Order Pattern */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Hourly Order Pattern</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip formatter={(value) => [value, 'Orders']} />
              <Line type="monotone" dataKey="orders" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Products */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Performing Products</h3>
        <div className="space-y-4">
          {topProducts.map((product, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-green-600">{index + 1}</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{product.name}</h4>
                  <p className="text-sm text-gray-600">{product.sales} units sold</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-green-600">₹{product.revenue.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Revenue</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Average Order Value</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`₹${value}`, 'AOV']} />
              <Bar dataKey="revenue" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Growth</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [value, 'New Customers']} />
              <Area type="monotone" dataKey="customers" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Volume</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [value, 'Orders']} />
              <Line type="monotone" dataKey="orders" stroke="#F59E0B" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;