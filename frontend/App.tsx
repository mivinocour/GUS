import React, { useState, useEffect } from 'react';
import { ViewState, CartItem, MenuItem, PaidItem } from './types';
import MenuScreen from './components/MenuScreen';
import OrderSummary from './components/OrderSummary';
import SuccessScreen from './components/SuccessScreen';
import PaymentScreen from './components/PaymentScreen';
import PaymentSuccessScreen from './components/PaymentSuccessScreen';

import { RESTAURANTS } from './data';
import { debugLocalStorage } from './utils/localStorage';

const getResKey = () => {
  if (typeof window === 'undefined') return 'gus';
  const params = new URLSearchParams(window.location.search);
  return params.get('res')?.toLowerCase() || 'gus';
};

const getTableId = () => {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  return params.get('table') || null;
};

const generateUserId = () => {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const App: React.FC = () => {
  const resKey = getResKey();
  const restaurant = RESTAURANTS[resKey] || RESTAURANTS.gus;
  const tableId = getTableId();

  useEffect(() => {
    document.documentElement.style.setProperty('--app-primary', restaurant.colors.primary);
    document.documentElement.style.setProperty('--app-primary-dark', restaurant.colors['primary-dark']);
    document.documentElement.style.setProperty('--app-background', restaurant.colors.background);
  }, [restaurant]);

  // Simple localStorage-based state management (single user)
  const [currentUserId] = useState<string>(() => {
    const stored = localStorage.getItem('gus_userId');
    return stored || generateUserId();
  });
  const [paidItems, setPaidItems] = useState<PaidItem[]>(() => {
    if (tableId) {
      const stored = localStorage.getItem(`gus_paid_${tableId}`);
      try {
        return stored ? JSON.parse(stored) : [];
      } catch {
        // Clear invalid data
        localStorage.removeItem(`gus_paid_${tableId}`);
        return [];
      }
    }
    return [];
  });

  // Sync paid items to localStorage
  useEffect(() => {
    if (tableId && paidItems.length > 0) {
      localStorage.setItem(`gus_paid_${tableId}`, JSON.stringify(paidItems));
    }
  }, [tableId, paidItems]);

  // Store user ID and debug localStorage
  useEffect(() => {
    localStorage.setItem('gus_userId', currentUserId);
    debugLocalStorage(); // Debug what's in localStorage
  }, [currentUserId]);

  const [view, setView] = useState<ViewState>('MENU');
  const [pendingPaymentItems, setPendingPaymentItems] = useState<CartItem[]>([]);
  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [lastOrder, setLastOrder] = useState<CartItem[]>([]);
  const [confirmedItems, setConfirmedItems] = useState<CartItem[]>([]);

  // New States
  // Hardcode favorite for Olive Garden (Fried Mozzarella)
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    const initialFavorites = new Set<string>();
    // If Olive Garden, add fried-mozzarella as a favorite
    if (resKey === 'olivegarden') {
      initialFavorites.add('fried-mozzarella');
    }
    return initialFavorites;
  });
  const [lastPaidAmount, setLastPaidAmount] = useState(0);
  const [lastPaidItems, setLastPaidItems] = useState<CartItem[]>([]);
  
  // Helper to get items for payment (ensures we always have items even if state is stale)
  const getItemsForPayment = (): CartItem[] => {
    // Priority: confirmedItems > lastOrder (items just confirmed) > pendingPaymentItems
    if (confirmedItems.length > 0) {
      return confirmedItems;
    }
    if (lastOrder.length > 0) {
      return lastOrder;
    }
    if (pendingPaymentItems.length > 0) {
      return pendingPaymentItems;
    }
    return [];
  };


  // Helper to calculate total value of a list of items
  const calculateTotal = (items: CartItem[]) => {
    return items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const currentCartTotal = calculateTotal(cart);
  const confirmedTotal = calculateTotal(confirmedItems);
  const grandTotal = currentCartTotal + confirmedTotal;

  const handleAddToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id && i.orderedBy === currentUserId);
      if (existing) {
        return prev.map(i => 
          i.id === item.id && i.orderedBy === currentUserId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1, orderedBy: currentUserId }];
    });
  };

  // Modified handler: Adds to cart without toast or drawer
  const handleItemSelect = (item: MenuItem) => {
    handleAddToCart(item);
  };

  const handleToggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavs = new Set(prev);
      if (newFavs.has(id)) {
        newFavs.delete(id);
      } else {
        newFavs.add(id);
      }
      return newFavs;
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id && item.orderedBy === currentUserId) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const handleConfirmOrder = () => {
    if (cart.length === 0) return;

    // Simple localStorage-based confirmation (no API calls)
    const itemsToConfirm = [...cart]; // Copy cart items before clearing

    setLastOrder(itemsToConfirm); // Save current items for success screen receipt
    setPendingPaymentItems(itemsToConfirm); // Store items for payment screen

    // Merge into confirmed items history
    setConfirmedItems(prev => {
      const newConfirmed = [...prev];
      itemsToConfirm.forEach(cartItem => {
        const existingIndex = newConfirmed.findIndex(i => i.id === cartItem.id);
        if (existingIndex >= 0) {
          newConfirmed[existingIndex] = {
            ...newConfirmed[existingIndex],
            quantity: newConfirmed[existingIndex].quantity + cartItem.quantity
          };
        } else {
          newConfirmed.push(cartItem);
        }
      });
      return newConfirmed;
    });

    setIsOrderSummaryOpen(false);
    setCart([]); // Clear active cart

    setView('SUCCESS');
  };

  const handleKeepOrdering = () => {
    setView('MENU');
  };

  const handleGoToPayment = () => {
    // If there are items in the cart, move them into confirmed items before paying
    if (cart.length > 0) {
      setConfirmedItems(prev => {
        const newConfirmed = [...prev];
        cart.forEach(cartItem => {
          const existingIndex = newConfirmed.findIndex(i => i.id === cartItem.id && i.orderedBy === cartItem.orderedBy);
          if (existingIndex >= 0) {
            newConfirmed[existingIndex] = {
              ...newConfirmed[existingIndex],
              quantity: newConfirmed[existingIndex].quantity + cartItem.quantity
            };
          } else {
            newConfirmed.push(cartItem);
          }
        });
        return newConfirmed;
      });
      setCart([]); // clear active cart now that it is part of confirmed items
    }
    
    setIsOrderSummaryOpen(false);
    setView('PAYMENT');
  };

  const handlePaymentComplete = (paidItemsList: {id: string, quantity: number}[], totalAmount: number) => {
    // Determine if we fully paid everything
    let remainingItems: CartItem[] = [];
    let itemsBeingPaid: CartItem[] = [];

    // Clone the current confirmed items
    const currentItems = [...confirmedItems];

    currentItems.forEach(item => {
        const paidInfo = paidItemsList.find(p => p.id === item.id);
        if (paidInfo) {
            itemsBeingPaid.push({ ...item, quantity: paidInfo.quantity });
            const remainingQty = item.quantity - paidInfo.quantity;
            if (remainingQty > 0) {
                remainingItems.push({ ...item, quantity: remainingQty });
            }
            // Mark items as paid
            if (tableId) {
              setPaidItems(prev => [
                ...prev,
                { itemId: item.id, quantity: paidInfo.quantity, paidBy: currentUserId }
              ]);
            }
        } else {
            remainingItems.push(item);
        }
    });

    // Use the total amount passed from PaymentScreen (includes tax, service, and tip)
    setLastPaidAmount(totalAmount);
    setLastPaidItems(itemsBeingPaid); // Store items that were paid for
    setConfirmedItems(remainingItems);

    // Instead of alert, go to Payment Success Screen
    setView('PAYMENT_SUCCESS');
  };

  const handlePaymentSuccessDone = () => {
    if (confirmedItems.length === 0) {
        setLastOrder([]); 
        setView('MENU');
    } else {
        setView('MENU');
    }
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark">
      
      {/* Header - Conditional based on View */}
      {view === 'MENU' && (
        <header className="sticky top-0 z-40 text-white shadow-md transition-all duration-300"
          style={{ background: `var(--app-primary, ${restaurant.colors.primary})` }}>
          <div className="px-5 py-4 flex items-center justify-between gap-4 max-w-lg mx-auto w-full">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm shadow-inner">
                {restaurant.logo ? (
                  <img src={restaurant.logo} alt={restaurant.name} className="h-8 w-auto" />
                ) : (
                  <span className="material-symbols-outlined text-white">restaurant</span>
                )}
              </div>
              <h1 className="text-xl font-extrabold leading-tight truncate tracking-tight">{restaurant.name}</h1>
            </div>
            {/* Search removed as requested */}
          </div>
        </header>
      )}


      {/* Main Content */}
      <main className={`flex-1 flex flex-col w-full max-w-lg mx-auto relative ${view === 'MENU' ? 'pb-28' : ''}`}>
        {view === 'MENU' && (
          <MenuScreen
            restaurant={restaurant}
            onItemSelect={handleItemSelect}
            grandTotal={grandTotal}
            cartCount={cartCount}
            hasConfirmedItems={confirmedItems.length > 0}
            onViewOrder={() => setIsOrderSummaryOpen(true)}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            currentUserId={currentUserId}
          />
        )}
        
        {view === 'SUCCESS' && (
          <SuccessScreen
            onKeepOrdering={handleKeepOrdering}
            onPay={handleGoToPayment}
            orderItems={lastOrder}
            grandTotal={grandTotal}
          />
        )}

        {view === 'PAYMENT' && (
          <PaymentScreen
            confirmedItems={confirmedItems}
            onBack={() => setView('MENU')}
            onCompletePayment={handlePaymentComplete}
            paidItems={paidItems}
            restaurant={restaurant}
          />
        )}

        {view === 'PAYMENT_SUCCESS' && (
          <PaymentSuccessScreen 
             onDone={handlePaymentSuccessDone}
             totalPaid={lastPaidAmount}
             paidItems={lastPaidItems}
          />
        )}
      </main>

      {/* Order Summary Drawer (Overlay) */}
      <OrderSummary
        isOpen={isOrderSummaryOpen}
        onClose={() => setIsOrderSummaryOpen(false)}
        cart={cart}
        confirmedItems={confirmedItems}
        recommendations={restaurant.recommendations || []}
        onUpdateQuantity={handleUpdateQuantity}
        onConfirm={handleConfirmOrder}
        onAddRecommendation={handleItemSelect}
        onGoToPayment={handleGoToPayment}
        paidItems={paidItems}
        restaurant={restaurant}
      />

    </div>
  );
};

export default App;