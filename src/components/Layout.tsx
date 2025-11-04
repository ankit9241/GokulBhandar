import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import DownloadButton from './DownloadButton';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans antialiased">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <DownloadButton />
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
