import { useState, useEffect } from 'react';
import { FaDownload } from 'react-icons/fa';

const DownloadButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  
  useEffect(() => {
    // Show button after a short delay for better UX
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    await deferredPrompt.userChoice;
    
    // Clear the deferredPrompt variable
    setDeferredPrompt(null);
  };

  // Don't show the button if PWA is already installed or on iOS
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return null;
  }

  return (
    <div 
      className={`fixed bottom-4 left-4 z-50 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div 
          className={`absolute left-12 bottom-1/2 transform translate-y-1/2 bg-gray-800/95 backdrop-blur-sm text-white text-xs font-medium px-3 py-2 rounded-md shadow-xl transition-all duration-300 whitespace-nowrap ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3 pointer-events-none'
          }`}
          style={{
            textShadow: '0 1px 2px rgba(0,0,0,0.2)'
          }}
        >
          <div className="absolute left-0 w-2.5 h-2.5 -ml-1 transform -translate-x-1/2 translate-y-1/2 rotate-45 bg-gray-800/95" 
               style={{
                 backdropFilter: 'blur(4px)'
               }}
          ></div>
          <div className="flex items-center space-x-1.5">
            <span className="font-semibold text-blue-400">Install App</span>
            <span>Get the best experience</span>
            <svg className="w-3 h-3 text-blue-400 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        
        <button
          onClick={handleInstallClick}
          className={`group relative flex items-center justify-center w-12 h-12 rounded-full shadow-2xl transition-all duration-300 transform-gpu ${
            isHovered ? 'scale-105' : ''
          }`}
          style={{
            background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
            boxShadow: '0 6px 15px -3px rgba(79, 70, 229, 0.4), 0 4px 6px -2px rgba(79, 70, 229, 0.2)'
          }}
          aria-label="Install App"
        >
          <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          <FaDownload className="w-5 h-5 text-white transform transition-transform duration-300 group-hover:scale-110" />
          
          <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping-slow opacity-0 group-hover:opacity-100"></div>
        </button>
        
        <style>{`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
            100% { transform: translateY(0px); }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          @keyframes ping-slow {
            0% {
              transform: scale(0.8);
              opacity: 0.8;
            }
            70% {
              transform: scale(1.3);
              opacity: 0;
            }
            100% {
              transform: scale(0.8);
              opacity: 0;
            }
          }
          .animate-ping-slow {
            animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
          }
        `}</style>
      </div>
    </div>
  );
};

export default DownloadButton;
