import React, { useState, useEffect } from 'react';
import { ViewState, CartItem, MenuItem, TableUser, PaidItem } from './types';
import MenuScreen from './components/MenuScreen';
import OrderSummary from './components/OrderSummary';
import SuccessScreen from './components/SuccessScreen';
import PaymentScreen from './components/PaymentScreen';
import PaymentSuccessScreen from './components/PaymentSuccessScreen';
import TableUsersPanel from './components/TableUsersPanel';

import { RESTAURANTS } from './data';

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

  // Table session management
  const [currentUserId] = useState<string>(() => {
    const stored = localStorage.getItem('gus_userId');
    return stored || generateUserId();
  });
  const [currentUserName, setCurrentUserName] = useState<string>(() => {
    return localStorage.getItem('gus_userName') || '';
  });
  const [tableUsers, setTableUsers] = useState<TableUser[]>(() => {
    if (tableId) {
      const stored = localStorage.getItem(`gus_table_${tableId}`);
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });
  const [paidItems, setPaidItems] = useState<PaidItem[]>(() => {
    if (tableId) {
      const stored = localStorage.getItem(`gus_paid_${tableId}`);
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  // Auto-join table when tableId is present and user has a name
  useEffect(() => {
    if (tableId && currentUserName) {
      const userExists = tableUsers.find(u => u.id === currentUserId);
      if (!userExists) {
        setTableUsers(prev => {
          const updated = [...prev, {
            id: currentUserId,
            name: currentUserName,
            joinedAt: Date.now(),
          }];
          localStorage.setItem(`gus_table_${tableId}`, JSON.stringify(updated));
          return updated;
        });
      }
    }
  }, [tableId, currentUserName, currentUserId]);

  // Sync table users to localStorage
  useEffect(() => {
    if (tableId && tableUsers.length > 0) {
      localStorage.setItem(`gus_table_${tableId}`, JSON.stringify(tableUsers));
    }
  }, [tableId, tableUsers]);

  // Sync paid items to localStorage
  useEffect(() => {
    if (tableId && paidItems.length > 0) {
      localStorage.setItem(`gus_paid_${tableId}`, JSON.stringify(paidItems));
    }
  }, [tableId, paidItems]);

  // Store user ID and name
  useEffect(() => {
    localStorage.setItem('gus_userId', currentUserId);
    if (currentUserName) {
      localStorage.setItem('gus_userName', currentUserName);
    }
  }, [currentUserId, currentUserName]);

  const [view, setView] = useState<ViewState>('MENU');
  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [lastOrder, setLastOrder] = useState<CartItem[]>([]);
  const [confirmedItems, setConfirmedItems] = useState<CartItem[]>([]);
  
  // New States
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [lastPaidAmount, setLastPaidAmount] = useState(0);

  // Join table function
  const handleJoinTable = () => {
    if (tableId && currentUserName) {
      const userExists = tableUsers.find(u => u.id === currentUserId);
      if (!userExists) {
        setTableUsers(prev => [...prev, {
          id: currentUserId,
          name: currentUserName,
          joinedAt: Date.now(),
        }]);
      }
    }
  };

  // Update user name
  const handleNameChange = (name: string) => {
    setCurrentUserName(name);
    if (tableId) {
      setTableUsers(prev => {
        const existing = prev.find(u => u.id === currentUserId);
        if (existing) {
          return prev.map(u => u.id === currentUserId ? { ...u, name } : u);
        }
        return [...prev, { id: currentUserId, name, joinedAt: Date.now() }];
      });
    }
  };

  // Helper to calculate total value of a list of items
  const calculateTotal = (items: CartItem[]) => {
    const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const tax = subtotal * 0.13;
    const service = subtotal * 0.10;
    return subtotal + tax + service;
  };

  // Derived state
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
    setLastOrder(cart); // Save current items for success screen receipt
    
    // Merge into confirmed items history
    setConfirmedItems(prev => {
      const newConfirmed = [...prev];
      cart.forEach(cartItem => {
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

  const handlePaymentComplete = (paidItemsList: {id: string, quantity: number}[]) => {
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

    const paidAmount = calculateTotal(itemsBeingPaid);
    setLastPaidAmount(paidAmount);
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

      {(view === 'SUCCESS' || view === 'PAYMENT_SUCCESS') && (
        <header className="flex items-center bg-transparent p-6 pb-2 justify-center sticky top-0 z-30 pt-8">
           <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center">
             <span className="material-symbols-outlined text-primary text-2xl">smart_toy</span>
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
          />
        )}
        
        {view === 'SUCCESS' && (
          <SuccessScreen 
            onKeepOrdering={handleKeepOrdering}
            onPay={handleGoToPayment} 
            orderItems={lastOrder}
            grandTotal={grandTotal}
            tableUsers={tableUsers}
          />
        )}

        {view === 'PAYMENT' && (
          <PaymentScreen 
            confirmedItems={confirmedItems}
            onBack={() => setView('MENU')}
            onCompletePayment={handlePaymentComplete}
            paidItems={paidItems}
            tableUsers={tableUsers}
          />
        )}

        {view === 'PAYMENT_SUCCESS' && (
          <PaymentSuccessScreen 
             onDone={handlePaymentSuccessDone}
             totalPaid={lastPaidAmount}
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
        tableUsers={tableUsers}
      />

      {/* Table Users Panel */}
      {tableId && (
        <TableUsersPanel
          currentUserId={currentUserId}
          users={tableUsers}
          currentUserName={currentUserName}
          onNameChange={handleNameChange}
          onJoinTable={handleJoinTable}
        />
      )}

      {/* Interactive Chat with Gus */}
      {view === 'MENU' && <ChatGus />}

    </div>
  );
};

export default App;