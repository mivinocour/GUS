import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  image?: string;
}

const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose, image }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-24 left-0 right-0 z-50 px-5 pointer-events-none flex justify-center w-full max-w-lg mx-auto">
      <div className="bg-primary text-white px-4 py-3 rounded-2xl shadow-lg shadow-primary/30 flex items-center gap-3 animate-pop pointer-events-auto backdrop-blur-sm bg-opacity-95 max-w-sm w-full">
        {image ? (
            <img src={image} alt="" className="size-10 rounded-lg object-cover bg-white/20" />
        ) : (
            <div className="size-10 rounded-lg bg-white/20 flex items-center justify-center">
                <span className="material-symbols-outlined">celebration</span>
            </div>
        )}
        <div className="flex-1 min-w-0">
            <p className="font-bold text-sm leading-tight">¡Agregado!</p>
            <p className="text-xs opacity-90 truncate">{message}</p>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
            <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>
    </div>
  );
};

export default Toast;