import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans antialiased">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <Toaster 
        position="top-right"
        toastOptions={{
          className: '!bg-white !text-gray-800 !shadow-lg !border !border-gray-200',
          duration: 3000,
        }}
      />
    </div>
  );
};

export default Layout;
