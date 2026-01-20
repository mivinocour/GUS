import React, { useMemo, useState, useEffect } from 'react';
import { RestaurantData } from '../data';
import { Category, MenuItem } from '../types';
import SpiceUpRewards from './SpiceUpRewards';
import TsunamiRewards from './TsunamiRewards';

interface MenuScreenProps {
  restaurant: RestaurantData;
  onItemSelect: (item: MenuItem) => void;
  grandTotal: number;
  cartCount: number;
  hasConfirmedItems: boolean;
  onViewOrder: () => void;
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
  cart?: Array<{id: string, quantity: number, orderedBy: string}>;
  onUpdateQuantity: (id: string, delta: number) => void;
  currentUserId: string;
}

const MenuScreen: React.FC<MenuScreenProps> = ({
  restaurant,
  onItemSelect,
  grandTotal,
  cartCount,
  hasConfirmedItems,
  onViewOrder,
  favorites,
  onToggleFavorite,
  cart = [],
  onUpdateQuantity,
  currentUserId
}) => {
  const showFloatingButton = cartCount > 0 || hasConfirmedItems;
  
  // Tab state for restaurants with menuTabs (like Negroni)
  const [activeTab, setActiveTab] = useState<string>(() => {
    if (restaurant.menuTabs && restaurant.menuTabs.length > 0) {
      return restaurant.menuTabs[0].id;
    }
    return '';
  });

  // Get current menu based on active tab or default menu
  const currentMenu = restaurant.menuTabs 
    ? restaurant.menuTabs.find(tab => tab.id === activeTab)?.menu || []
    : restaurant.menu;
  
  // State to track which categories are expanded (default: all expanded)
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(() => {
    const allExpanded = new Set<string>();
    currentMenu.forEach((cat: Category) => allExpanded.add(cat.id));
    return allExpanded;
  });

  // Update expanded categories when tab changes
  useEffect(() => {
    const allExpanded = new Set<string>();
    currentMenu.forEach((cat: Category) => allExpanded.add(cat.id));
    setExpandedCategories(allExpanded);
  }, [activeTab, currentMenu]);

  // State for rotating recommendations
  const [currentRecommendationIndex, setCurrentRecommendationIndex] = useState(0);

  // Auto-rotate recommendations every 5 seconds
  useEffect(() => {
    if (!restaurant.recommendations || restaurant.recommendations.length <= 1) {
      return; // Don't rotate if there's only one or no recommendations
    }

    const interval = setInterval(() => {
      setCurrentRecommendationIndex(prev =>
        (prev + 1) % restaurant.recommendations.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [restaurant.recommendations]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  // Get quantity of item in cart for current user
  const getCartQuantity = (itemId: string): number => {
    if (!cart || !Array.isArray(cart)) return 0;
    const cartItem = cart.find(item => item.id === itemId && item.orderedBy === currentUserId);
    return cartItem ? cartItem.quantity : 0;
  };

    // Flatten items to find favorites (from all tabs if menuTabs exists)
    const favoriteItems = useMemo(() => {
      const allItems: MenuItem[] = [];
      if (restaurant.menuTabs) {
        restaurant.menuTabs.forEach(tab => {
          tab.menu.forEach((cat: Category) => allItems.push(...cat.items));
        });
      } else {
        restaurant.menu.forEach((cat: Category) => allItems.push(...cat.items));
      }
      return allItems.filter(item => favorites.has(item.id));
    }, [favorites, restaurant]);

  return (
    <div className="flex-1 flex flex-col w-full animate-fade-in">
      {/* Spice Up Rewards - Only for Olive Garden */}
      <SpiceUpRewards isOliveGarden={restaurant.slug === 'olivegarden'} />

      {/* Tsunami Rewards - Only for Tsunami */}
      <TsunamiRewards isTsunami={restaurant.slug === 'tsunamisushi'} />

      {/* Menu Tabs - Only show if menuTabs exists */}
      {restaurant.menuTabs && restaurant.menuTabs.length > 0 && (
        <div className="sticky top-[72px] z-30 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-border-light/50 dark:border-border-dark/50">
          <div className="flex gap-2 px-5 py-3 overflow-x-auto no-scrollbar">
            {restaurant.menuTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Featured Banner - Rotating Recommendations */}
      <div className="px-5 pt-2 pb-6">
         {restaurant.recommendations && restaurant.recommendations.length > 0 && (
           <div className="w-full h-48 rounded-3xl overflow-hidden relative shadow-lg group cursor-pointer"
                onClick={() => onItemSelect(restaurant.recommendations[currentRecommendationIndex])}>

              {/* Background Images with Crossfade */}
              <div className="absolute inset-0">
                {restaurant.recommendations.map((rec, index) => (
                  <img
                    key={rec.id}
                    src={rec.image}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 ${
                      index === currentRecommendationIndex
                        ? 'opacity-100 z-10'
                        : 'opacity-0 z-0'
                    }`}
                    alt={rec.name}
                  />
                ))}
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20"></div>

              {/* Content with Slide Animation */}
              <div className="absolute bottom-0 left-0 p-5 w-full z-30">
                 <span className="inline-block px-2.5 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-wider rounded-lg mb-2 shadow-glow">
                   Recomendado {currentRecommendationIndex + 1}/{restaurant.recommendations.length}
                 </span>

                 {/* Title */}
                 <h3 className="text-white font-bold text-xl mb-1">
                   {restaurant.recommendations[currentRecommendationIndex].name}
                 </h3>

                 <div className="flex justify-between items-end">
                    {/* Description */}
                    <p className="text-white/80 text-sm line-clamp-1 max-w-[70%]">
                      {restaurant.recommendations[currentRecommendationIndex].description}
                    </p>

                    {/* Price */}
                    <span className="text-white font-bold text-lg">
                      ₡{restaurant.recommendations[currentRecommendationIndex].price.toLocaleString()}
                    </span>
                 </div>

                 {/* Dots Indicator */}
                 {restaurant.recommendations.length > 1 && (
                   <div className="flex gap-1.5 mt-3 justify-center">
                     {restaurant.recommendations.map((_, index) => (
                       <button
                         key={index}
                         onClick={(e) => {
                           e.stopPropagation();
                           setCurrentRecommendationIndex(index);
                         }}
                         className={`w-2 h-2 rounded-full transition-all duration-300 ${
                           index === currentRecommendationIndex
                             ? 'bg-white scale-125'
                             : 'bg-white/50 hover:bg-white/75'
                         }`}
                       />
                     ))}
                   </div>
                 )}
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
                  cartQuantity={getCartQuantity(item.id)}
                  onUpdateQuantity={onUpdateQuantity}
                />
              ))}
            </div>
          </section>
        )}

        {currentMenu.map((section: any) => {
          const isExpanded = expandedCategories.has(section.id);
          return (
            <section key={section.id} className="scroll-mt-20" id={section.id}>
              {/* Sticky Header - Clickable to toggle */}
              <div 
                className="sticky top-[72px] z-30 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md px-5 py-3 border-b border-border-light/50 dark:border-border-dark/50 mb-2 cursor-pointer select-none"
                onClick={() => toggleCategory(section.id)}
              >
                <h2 className="text-lg font-extrabold text-text-light dark:text-text-dark flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {section.title}
                    <span className="text-xs font-semibold bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-300 px-2 py-0.5 rounded-full">{section.items.length}</span>
                  </div>
                  <span className="material-symbols-outlined text-[20px] transition-transform duration-200" style={{ transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)' }}>
                    expand_more
                  </span>
                </h2>
              </div>
              
              {/* Collapsible Content */}
              {isExpanded && (
                <div className="flex flex-col gap-4 px-5 animate-fade-in">
                  {section.items.map((item) => (
                    <MenuItemCard
                      key={item.id}
                      item={item}
                      onSelect={onItemSelect}
                      isFavorite={favorites.has(item.id)}
                      onToggleFavorite={() => onToggleFavorite(item.id)}
                      cartQuantity={getCartQuantity(item.id)}
                      onUpdateQuantity={onUpdateQuantity}
                    />
                  ))}
                </div>
              )}
            </section>
          );
        })}
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
  cartQuantity: number;
  onUpdateQuantity: (id: string, delta: number, customization?: any) => void;
}> = ({ item, onSelect, isFavorite, onToggleFavorite, cartQuantity, onUpdateQuantity }) => {
  const hasImage = !!item.image;
  
  return (
    <div 
      onClick={() => onSelect(item)}
      className="group bg-surface-light dark:bg-surface-dark p-3 rounded-2xl shadow-card hover:shadow-soft transition-all duration-300 cursor-pointer border border-transparent hover:border-primary/10 relative overflow-hidden active:scale-[0.99]"
    >
      <div className={`flex ${hasImage ? 'gap-4' : ''}`}>
          {/* Image - Only render if image exists */}
        {hasImage && (
          <div className="size-28 shrink-0 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              loading="lazy"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex flex-1 flex-col relative z-10">
          <div className="flex-1">
            <div className="flex items-center gap-2">
                {/* Favorite Button - Always on the left of title */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite();
                  }}
                  className="size-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shadow-sm active:scale-90 transition-transform shrink-0"
                >
                  <span className={`material-symbols-outlined text-[18px] transition-colors ${isFavorite ? 'text-red-500 material-symbols-filled' : 'text-slate-500 dark:text-slate-300'}`}>favorite</span>
                </button>
                <h3 className="font-bold text-text-light dark:text-text-dark text-base leading-tight mb-1">{item.name}</h3>
            </div>
            <p className="text-xs text-text-muted dark:text-text-muted-dark leading-relaxed line-clamp-2">{item.description}</p>
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <span className="font-bold text-text-light dark:text-text-dark text-base">₡{item.price.toLocaleString()}</span>

            {cartQuantity === 0 ? (
              // Add button when no items in cart
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
            ) : (
              // Quantity controls when items in cart
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onUpdateQuantity(item.id, -1);
                  }}
                  className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 text-text-light dark:text-text-dark flex items-center justify-center transition-colors hover:bg-red-500 hover:text-white active:scale-90"
                >
                  <span className="material-symbols-outlined text-[16px]">remove</span>
                </button>

                <span className="font-bold text-text-light dark:text-text-dark text-sm min-w-[1.5rem] text-center">
                  {cartQuantity}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onUpdateQuantity(item.id, 1);
                  }}
                  className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 text-text-light dark:text-text-dark flex items-center justify-center transition-colors hover:bg-primary hover:text-white active:scale-90"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuScreen;