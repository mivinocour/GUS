import React, { useMemo } from 'react';
import { RestaurantData } from '../data';
import { Category, MenuItem } from '../types';

interface MenuScreenProps {
  restaurant: RestaurantData;
  onItemSelect: (item: MenuItem) => void;
  grandTotal: number;
  cartCount: number;
  hasConfirmedItems: boolean;
  onViewOrder: () => void;
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
}

const MenuScreen: React.FC<MenuScreenProps> = ({ 
  restaurant,
  onItemSelect, 
  grandTotal, 
  cartCount, 
  hasConfirmedItems, 
  onViewOrder,
  favorites,
  onToggleFavorite
}) => {
  const showFloatingButton = cartCount > 0 || hasConfirmedItems;

    // Flatten items to find favorites
    const favoriteItems = useMemo(() => {
      const allItems: MenuItem[] = [];
      restaurant.menu.forEach((cat: Category) => allItems.push(...cat.items));
      return allItems.filter(item => favorites.has(item.id));
    }, [favorites, restaurant]);

  return (
    <div className="flex-1 flex flex-col w-full animate-fade-in">
      {/* Featured Banner (Optional, using first recommendation) */}
      <div className="px-5 pt-2 pb-6">
         {restaurant.recommendations && restaurant.recommendations.length > 0 && (
           <div className="w-full h-48 rounded-3xl overflow-hidden relative shadow-lg group cursor-pointer" onClick={() => onItemSelect(restaurant.recommendations[0])}>
              <img 
                src={restaurant.recommendations[0].image} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Featured"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-5 w-full">
                 <span className="inline-block px-2.5 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-wider rounded-lg mb-2 shadow-glow">Recomendado</span>
                 <h3 className="text-white font-bold text-xl mb-1">{restaurant.recommendations[0].name}</h3>
                 <div className="flex justify-between items-end">
                    <p className="text-white/80 text-sm line-clamp-1 max-w-[70%]">{restaurant.recommendations[0].description}</p>
                    <span className="text-white font-bold text-lg">₡{restaurant.recommendations[0].price.toLocaleString()}</span>
                 </div>
              </div>
           </div>
         )}
      </div>

      <div className="flex flex-col gap-8 pb-8">
        {/* Favorites Section */}
        {favoriteItems.length > 0 && (
          <section className="scroll-mt-20">
             <div className="sticky top-[72px] z-30 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md px-5 py-3 border-b border-border-light/50 dark:border-border-dark/50 mb-2">
              <h2 className="text-lg font-extrabold text-text-light dark:text-text-dark flex items-center gap-2">
                <span className="material-symbols-outlined text-red-500 material-symbols-filled">favorite</span>
                Tus Favoritos
                <span className="text-xs font-semibold bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-400 px-2 py-0.5 rounded-full">{favoriteItems.length}</span>
              </h2>
            </div>
            <div className="flex flex-col gap-4 px-5">
              {favoriteItems.map((item) => (
                <MenuItemCard 
                  key={`fav-${item.id}`} 
                  item={item} 
                  onSelect={onItemSelect} 
                  isFavorite={true}
                  onToggleFavorite={() => onToggleFavorite(item.id)}
                />
              ))}
            </div>
          </section>
        )}

        {restaurant.menu.map((section: any) => (
          <section key={section.id} className="scroll-mt-20" id={section.id}>
            {/* Sticky Header */}
            <div className="sticky top-[72px] z-30 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md px-5 py-3 border-b border-border-light/50 dark:border-border-dark/50 mb-2">
              <h2 className="text-lg font-extrabold text-text-light dark:text-text-dark flex items-center gap-2">
                {section.title}
                <span className="text-xs font-semibold bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-300 px-2 py-0.5 rounded-full">{section.items.length}</span>
              </h2>
            </div>
            
            <div className="flex flex-col gap-4 px-5">
              {section.items.map((item) => (
                <MenuItemCard 
                  key={item.id} 
                  item={item} 
                  onSelect={onItemSelect} 
                  isFavorite={favorites.has(item.id)}
                  onToggleFavorite={() => onToggleFavorite(item.id)}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Floating Action Button for Cart or Bill */}
      {showFloatingButton && (
        <div className="fixed bottom-6 left-0 right-0 px-5 pointer-events-none z-40 max-w-lg mx-auto">
          <button 
            onClick={onViewOrder}
            className={`pointer-events-auto w-full rounded-2xl h-16 pl-5 pr-6 flex items-center justify-between shadow-float transition-all transform hover:-translate-y-1 active:scale-95 group overflow-hidden relative ${cartCount > 0 ? 'bg-primary hover:bg-primary-dark text-white' : 'bg-slate-800 hover:bg-slate-900 text-white dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900'}`}
          >
            {/* Background shimmer effect only for ordering */}
            {cartCount > 0 && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] animate-[shimmer_3s_infinite]"></div>}
            
            <div className="flex items-center gap-3 relative z-10">
              {cartCount > 0 ? (
                <div className="flex items-center justify-center bg-white text-primary rounded-lg size-8 text-sm font-bold shadow-sm group-hover:scale-110 transition-transform">{cartCount}</div>
              ) : (
                <div className="flex items-center justify-center bg-white/20 text-white dark:text-slate-900 rounded-lg size-8 text-sm font-bold shadow-sm">
                  <span className="material-symbols-outlined text-[20px]">receipt_long</span>
                </div>
              )}
              <div className="flex flex-col items-start">
                  <span className="font-bold text-sm leading-none mb-0.5">
                    {cartCount > 0 ? 'Ver Pedido' : 'Ver Cuenta'}
                  </span>
                  <span className="text-[10px] opacity-80 font-medium">
                    {cartCount > 0 ? 'Checkout now' : 'Revisar consumo'}
                  </span>
              </div>
            </div>
            <span className="font-bold text-lg tracking-tight relative z-10">₡{grandTotal.toLocaleString()}</span>
          </button>
        </div>
      )}
    </div>
  );
};

const MenuItemCard: React.FC<{ 
  item: MenuItem; 
  onSelect: (item: MenuItem) => void; 
  isFavorite: boolean;
  onToggleFavorite: () => void;
}> = ({ item, onSelect, isFavorite, onToggleFavorite }) => {
  return (
    <div 
      onClick={() => onSelect(item)}
      className="group bg-surface-light dark:bg-surface-dark p-3 rounded-2xl shadow-card hover:shadow-soft transition-all duration-300 cursor-pointer border border-transparent hover:border-primary/10 relative overflow-hidden active:scale-[0.99]"
    >
      <div className="flex gap-4">
          {/* Image */}
        <div className="size-28 shrink-0 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            loading="lazy"
          />
          {/* Favorite Button Overlay */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
            className="absolute top-1.5 right-1.5 size-7 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center shadow-sm z-20 active:scale-90 transition-transform"
          >
            <span className={`material-symbols-outlined text-[18px] transition-colors ${isFavorite ? 'text-red-500 material-symbols-filled' : 'text-slate-500 dark:text-slate-300'}`}>favorite</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col relative z-10">
          <div className="flex-1">
            <div className="flex justify-between items-start gap-2">
                <h3 className="font-bold text-text-light dark:text-text-dark text-base leading-tight mb-1">{item.name}</h3>
            </div>
            <p className="text-xs text-text-muted dark:text-text-muted-dark leading-relaxed line-clamp-2">{item.description}</p>
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <span className="font-bold text-text-light dark:text-text-dark text-base">₡{item.price.toLocaleString()}</span>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onSelect(item);
              }}
              className="h-8 px-3 rounded-full bg-slate-100 dark:bg-slate-800 text-text-light dark:text-text-dark font-semibold text-xs flex items-center gap-1 transition-colors hover:bg-primary hover:text-white group-active:bg-primary group-active:text-white"
            >
              Add
              <span className="material-symbols-outlined text-[16px]">add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuScreen;