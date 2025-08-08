import { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const phoneNumber = '919876543210';
  const message = 'Hello! I have a question about your products.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`fixed bottom-4 right-4 z-50 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div 
          className={`absolute right-12 bottom-1/2 transform translate-y-1/2 bg-gray-800/95 backdrop-blur-sm text-white text-xs font-medium px-3 py-2 rounded-md shadow-xl transition-all duration-300 whitespace-nowrap ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-3 pointer-events-none'
          }`}
          style={{
            textShadow: '0 1px 2px rgba(0,0,0,0.2)'
          }}
        >
          <div className="absolute right-0 w-2.5 h-2.5 -mr-1 transform translate-x-1/2 translate-y-1/2 rotate-45 bg-gray-800/95" 
               style={{
                 backdropFilter: 'blur(4px)'
               }}
          ></div>
          <div className="flex items-center space-x-1.5">
            <span className="font-semibold text-green-400">Need help?</span>
            <span>Chat with us on WhatsApp</span>
            <svg className="w-3 h-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`group relative flex items-center justify-center w-12 h-12 rounded-full shadow-2xl transition-all duration-300 transform-gpu ${
            isHovered ? 'scale-105 rotate-0' : 'hover:rotate-12'
          }`}
          style={{
            background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
            boxShadow: '0 6px 15px -3px rgba(37, 211, 102, 0.4), 0 4px 6px -2px rgba(37, 211, 102, 0.2)'
          }}
          aria-label="Chat on WhatsApp"
        >
          <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          <FaWhatsapp className="w-6 h-6 text-white transform transition-transform duration-300 group-hover:scale-110" />
          
          <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping-slow opacity-0 group-hover:opacity-100"></div>
        </a>
        
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

export default WhatsAppButton;
