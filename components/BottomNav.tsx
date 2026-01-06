import React from 'react';

interface BottomNavProps {
  activeTab?: string;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab = 'home' }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-border-light/50 dark:border-border-dark/50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-xl px-6 pb-safe pt-2 z-40 max-w-lg mx-auto">
      <div className="flex justify-between items-center pb-2">
        <a className={`flex flex-1 flex-col items-center justify-center gap-1.5 transition-all duration-300 group cursor-pointer p-2 rounded-xl hover:bg-slate-100/50 dark:hover:bg-slate-800/50`}>
          <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors text-[26px]">home</span>
        </a>
        
        <a className={`flex flex-1 flex-col items-center justify-center gap-1.5 transition-all duration-300 group cursor-pointer p-2 rounded-xl ${activeTab === 'menu' ? 'text-primary' : 'text-slate-400'}`}>
          <div className={`relative ${activeTab === 'menu' ? 'transform -translate-y-1' : ''} transition-transform`}>
             <span className={`material-symbols-outlined text-[28px] ${activeTab === 'menu' ? 'material-symbols-filled drop-shadow-sm' : 'group-hover:text-primary transition-colors'}`}>restaurant_menu</span>
             {activeTab === 'menu' && (
               <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></span>
             )}
          </div>
        </a>
        
        <a className="flex flex-1 flex-col items-center justify-center gap-1.5 transition-all duration-300 group cursor-pointer p-2 rounded-xl hover:bg-slate-100/50 dark:hover:bg-slate-800/50">
          <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors text-[26px]">receipt_long</span>
        </a>
        
        <a className="flex flex-1 flex-col items-center justify-center gap-1.5 transition-all duration-300 group cursor-pointer p-2 rounded-xl hover:bg-slate-100/50 dark:hover:bg-slate-800/50">
          <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors text-[26px]">person</span>
        </a>
      </div>
    </nav>
  );
};

export default BottomNav;