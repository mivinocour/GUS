import React from 'react';
import { CartItem, MenuItem, PaidItem, TableUser } from '../types';
import { RestaurantData } from '../data';

interface OrderSummaryProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  confirmedItems: CartItem[];
  recommendations: MenuItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onConfirm: () => void;
  onAddRecommendation: (item: any) => void;
  onGoToPayment: () => void;
  paidItems?: PaidItem[];
  tableUsers?: TableUser[];
  restaurant?: RestaurantData;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  isOpen,
  onClose,
  cart,
  confirmedItems,
  recommendations,
  onUpdateQuantity,
  onConfirm,
  onAddRecommendation,
  onGoToPayment,
  paidItems = [],
  tableUsers = [],
  restaurant
}) => {
  if (!isOpen) return null;

  const getPaidCount = (itemId: string) => {
    return paidItems.filter(p => p.itemId === itemId).reduce((sum, p) => sum + p.quantity, 0);
  };

  const getUserName = (userId?: string) => {
    if (!userId) return null;
    return tableUsers.find(u => u.id === userId)?.name || 'Desconocido';
  };

  // Mode check
  const isOrderingMode = cart.length > 0;
  const isBillMode = cart.length === 0 && confirmedItems.length > 0;
  const isEmpty = cart.length === 0 && confirmedItems.length === 0;

  // Calculate totals based on mode
  // When ordering: only show cart total
  // When viewing bill: show all confirmed items total
  const itemsForCalculation = isOrderingMode ? cart : confirmedItems;
  const total = itemsForCalculation.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Spice Up Rewards calculation (only for Olive Garden)
  const isOliveGarden = restaurant?.slug === 'olivegarden';
  const rewardsEarning = isOliveGarden ? total * 0.03 : 0; // 3% cashback

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Drawer Content */}
      <div className="relative w-full max-w-lg mx-auto pointer-events-none flex flex-col h-[95vh]">
        <div className="pointer-events-auto bg-surface-light dark:bg-surface-dark w-full rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex flex-col h-full animate-slide-up relative overflow-hidden">
          
          {/* Handle */}
          <div className="w-full flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing shrink-0" onClick={onClose}>
            <div className="h-1.5 w-10 rounded-full bg-slate-200 dark:bg-slate-700"></div>
          </div>

          {/* Header */}
          <div className="px-6 pb-4 pt-1 flex items-center justify-between shrink-0">
            <h2 className="text-text-light dark:text-text-dark text-2xl font-bold tracking-tight">
              {isBillMode ? 'Tu Cuenta' : 'Tu Pedido'}
            </h2>
            <button 
              onClick={onClose}
              className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Scrollable Cart Items */}
          <div className="flex-1 overflow-y-auto px-6 py-2 no-scrollbar">
            
            {/* Confirmed Items Section */}
            {confirmedItems.length > 0 && (
              <div className={`mb-6 ${isOrderingMode ? 'opacity-75 grayscale-[0.3]' : ''}`}>
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border-light dark:border-border-dark">
                  <span className={`material-symbols-outlined text-[20px] ${isBillMode ? 'text-primary' : 'text-green-600'}`}>
                    {isBillMode ? 'receipt_long' : 'check_circle'}
                  </span>
                  <p className={`text-xs font-bold uppercase tracking-wider ${isBillMode ? 'text-text-light dark:text-text-dark' : 'text-green-700 dark:text-green-400'}`}>
                    {isBillMode ? 'Items Confirmados' : 'En preparación'}
                  </p>
                </div>
                <div className={`space-y-4 pl-2 border-l-2 ${isBillMode ? 'border-primary/20' : 'border-green-500/20'}`}>
                  {confirmedItems.map((item) => {
                    const paidCount = getPaidCount(item.id);
                    const remainingQty = item.quantity - paidCount;
                    const isFullyPaid = remainingQty <= 0;
                    const paidItemsForThis = paidItems.filter(p => p.itemId === item.id);
                    
                    return (
                      <div key={`confirmed-${item.id}`} className={`flex flex-col gap-2 ${isFullyPaid ? 'opacity-50' : ''}`}>
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex gap-4 flex-1">
                                <div className="size-12 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0 overflow-hidden">
                                    <img 
                                      src={item.image} 
                                      alt={item.name} 
                                      className={`w-full h-full object-cover ${isFullyPaid ? 'grayscale' : ''}`} 
                                    />
                                </div>
                                <div className="flex-1 min-w-0 pt-0.5">
                                    <p className={`text-sm font-bold leading-tight truncate ${
                                      isFullyPaid 
                                        ? 'text-slate-400 dark:text-slate-500 line-through' 
                                        : 'text-text-light dark:text-text-dark'
                                    }`}>
                                      {item.name}
                                    </p>
                                    <div className="mt-1 text-text-muted dark:text-text-muted-dark font-medium text-xs">
                                      {item.quantity}x <span className="mx-1">•</span> ₡{(item.price * item.quantity).toLocaleString()}
                                      {item.orderedBy && tableUsers.length > 1 && (
                                        <span className="ml-2">• por {getUserName(item.orderedBy)}</span>
                                      )}
                                    </div>
                                    {paidCount > 0 && (
                                      <div className="mt-1 text-xs">
                                        <span className="text-green-600 dark:text-green-400 font-semibold">
                                          {paidCount} pagado{paidCount > 1 ? 's' : ''}
                                        </span>
                                        {remainingQty > 0 && (
                                          <span className="text-text-muted dark:text-text-muted-dark ml-2">
                                            • {remainingQty} pendiente{remainingQty > 1 ? 's' : ''}
                                          </span>
                                        )}
                                      </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        {paidItemsForThis.length > 0 && (
                          <div className="ml-16 text-xs text-green-600 dark:text-green-400 space-y-1">
                            {paidItemsForThis.map((paid, idx) => (
                              <div key={idx}>
                                {paid.quantity}x pagado{paid.quantity > 1 ? 's' : ''} por {getUserName(paid.paidBy)}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Current Cart Items */}
            {isEmpty ? (
               <div className="flex flex-col items-center justify-center h-48 text-slate-400">
                  <div className="size-16 bg-slate-50 dark:bg-slate-800/50 rounded-full flex items-center justify-center mb-3">
                     <span className="material-symbols-outlined text-3xl opacity-50">shopping_basket</span>
                  </div>
                  <p className="font-medium text-sm">Agrega productos para comenzar</p>
               </div>
            ) : isOrderingMode ? (
              <div className="space-y-6 mt-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">shopping_cart</span>
                  <p className="text-xs font-bold uppercase tracking-wider text-primary">Nueva Orden</p>
                </div>
                {cart.map((item) => (
                  <div key={item.id} className="flex flex-col gap-3 group">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex gap-4 flex-1">
                            <div className="size-16 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0 overflow-hidden">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0 pt-0.5">
                                <p className="text-text-light dark:text-text-dark text-base font-bold leading-tight truncate">{item.name}</p>
                                <p className="text-text-muted dark:text-text-muted-dark text-sm mt-1 leading-normal">{item.category}</p>
                                <div className="mt-2 text-primary font-bold text-sm">₡{(item.price * item.quantity).toLocaleString()}</div>
                            </div>
                        </div>
                        
                        <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center bg-slate-50 dark:bg-slate-800/50 rounded-lg p-1 border border-border-light dark:border-border-dark">
                                <button 
                                    onClick={() => onUpdateQuantity(item.id, -1)}
                                    className="size-7 rounded-md flex items-center justify-center text-slate-500 hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm transition-all"
                                >
                                    <span className="material-symbols-outlined text-[16px]">remove</span>
                                </button>
                                <span className="text-sm font-bold text-text-light dark:text-text-dark w-6 text-center">{item.quantity}</span>
                                <button 
                                    onClick={() => onUpdateQuantity(item.id, 1)}
                                    className="size-7 rounded-md flex items-center justify-center text-slate-500 hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm transition-all"
                                >
                                    <span className="material-symbols-outlined text-[16px]">add</span>
                                </button>
                            </div>
                        </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {/* Price Breakdown */}
            {itemsForCalculation.length > 0 && (
              <div className="mt-8 pt-6 pb-2 border-t border-dashed border-border-light dark:border-border-dark space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-text-muted dark:text-text-muted-dark text-sm font-medium">Total</span>
                  <span className="text-text-light dark:text-text-dark font-medium">₡{total.toLocaleString()}</span>
                </div>
                {/* Spice Up Rewards Earning Display */}
                {isOliveGarden && rewardsEarning > 0 && (
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-dashed border-[#54301A]/30 dark:border-[#54301A]/30">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#54301A] dark:text-[#54301A] text-[16px]">loyalty</span>
                      <span className="text-[#54301A] dark:text-[#54301A] text-sm font-medium">Ganarás (3%)</span>
                    </div>
                    <span className="text-[#54301A] dark:text-[#54301A] font-bold">₡{Math.round(rewardsEarning).toLocaleString()}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Area */}
          <div className="px-6 pt-4 pb-8 bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark z-10 shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
            <div className="flex justify-between items-end mb-6">
              <span className="text-text-light dark:text-text-dark font-bold text-xl">
                {isOrderingMode ? 'Total de Nueva Orden' : 'Total Global'}
              </span>
              <div className="flex flex-col items-end">
                 <span className="text-primary text-3xl font-extrabold tracking-tight leading-none">₡{total.toLocaleString()}</span>
                 <span className="text-xs text-text-muted dark:text-text-muted-dark font-medium mt-1">Incluye impuestos</span>
              </div>
            </div>

            {/* Recommendations only when Ordering */}
            {isOrderingMode && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-amber-500 text-[20px] material-symbols-filled">stars</span>
                  <p className="text-xs font-bold uppercase tracking-wider text-text-muted dark:text-text-muted-dark">Te podría gustar</p>
                </div>
                <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-6 px-6 pb-2 snap-x">
                  {recommendations.map((rec) => (
                    <div key={rec.id} className="snap-start flex-shrink-0 w-64 p-3 rounded-2xl bg-white dark:bg-slate-800 border border-border-light dark:border-border-dark flex items-center gap-3 shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-95" onClick={() => onAddRecommendation(rec)}>
                      <div className="size-12 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center shrink-0 overflow-hidden">
                        <img src={rec.image} alt={rec.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm text-text-light dark:text-text-dark truncate">{rec.name}</p>
                        <p className="text-xs font-medium text-text-muted dark:text-text-muted-dark truncate">₡{rec.price.toLocaleString()}</p>
                      </div>
                      <button 
                        className="size-8 rounded-full bg-slate-100 dark:bg-slate-700 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">add</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {isBillMode ? (
              <button 
                onClick={onGoToPayment}
                className="w-full bg-slate-800 dark:bg-slate-100 hover:bg-slate-900 dark:hover:bg-white text-white dark:text-slate-900 font-bold text-lg h-14 rounded-2xl shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined relative z-10">payments</span>
                <span className="relative z-10">Pagar / Dividir Cuenta</span>
              </button>
            ) : (
              <button 
                onClick={onConfirm}
                disabled={!isOrderingMode}
                className={`w-full bg-primary hover:bg-primary-dark text-white font-bold text-lg h-14 rounded-2xl shadow-lg shadow-primary/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 relative overflow-hidden ${!isOrderingMode ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
              >
                <span className="relative z-10">Confirmar Nueva Orden</span>
                <span className="material-symbols-outlined relative z-10" style={{fontSize: '20px'}}>arrow_forward</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;