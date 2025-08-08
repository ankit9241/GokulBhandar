'use client';

import { useState } from 'react';
import { categories, type Category } from '../../../lib/products';
import toast from 'react-hot-toast';

export default function CategoriesPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Omit<Category, 'id'>>({
    name: '',
    icon: 'ri-box-line',
    count: 0,
    image: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Category added successfully');
    setShowAddForm(false);
    setFormData({
      name: '',
      icon: 'ri-box-line',
      count: 0,
      image: ''
    });
  };

  const handleDelete = () => {
    toast.success('Category deleted successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Categories Management</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary"
        >
          <i className="ri-add-line mr-2 w-4 h-4 flex items-center justify-center inline-flex"></i>
          Add Category
        </button>
      </div>

      {showAddForm && (
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Category</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="input-field w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Icon (Remix Icon class)
                </label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({...formData, icon: e.target.value})}
                  className="input-field w-full"
                  placeholder="e.g., ri-apple-line"
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <button type="submit" className="btn-primary">
                Add Category
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category: Category) => (
          <div key={category.id} className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i className={`${category.icon} text-2xl text-green-600 w-8 h-8 flex items-center justify-center`}></i>
              </div>
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-700 p-2">
                  <i className="ri-edit-line w-4 h-4 flex items-center justify-center"></i>
                </button>
                <button 
                  onClick={handleDelete}
                  className="text-red-600 hover:text-red-700 p-2"
                >
                  <i className="ri-delete-bin-line w-4 h-4 flex items-center justify-center"></i>
                </button>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
            <div className="flex items-center justify-between text-sm mt-4">
              <span className="text-gray-500">Items: {category.count}</span>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {category.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}