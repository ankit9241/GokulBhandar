/**
 * Utility function to create a test customer account
 * Run this in the browser console to create a test customer account
 */

export const createTestCustomer = () => {
  const testCustomer = {
    id: 'test-customer-123',
    name: 'Test Customer',
    email: 'customer@example.com',
    password: 'password123', // In a real app, passwords should be hashed
    role: 'user',
    phone: '1234567890',
    loyaltyPoints: 0,
    addresses: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  try {
    // Get existing users or initialize empty array
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if customer already exists
    const customerExists = users.some((user: any) => user.email === testCustomer.email);
    
    if (!customerExists) {
      // Add test customer to users array
      users.push(testCustomer);
      localStorage.setItem('users', JSON.stringify(users));
      console.log('✅ Test customer created successfully!');
      console.log('Email: customer@example.com');
      console.log('Password: password123');
      return true;
    } else {
      console.log('ℹ️ Test customer already exists');
      return true;
    }
  } catch (error) {
    console.error('❌ Error creating test customer:', error);
    return false;
  }
};

// Add to window for easy access in browser console
if (typeof window !== 'undefined') {
  (window as any).createTestCustomer = createTestCustomer;
}
