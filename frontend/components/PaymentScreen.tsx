import React, { useState, useEffect } from 'react';
import { CartItem, PaidItem, TableUser } from '../types';
import { RestaurantData } from '../data';

interface PaymentScreenProps {
  confirmedItems: CartItem[];
  onBack: () => void;
  onCompletePayment: (paidItems: { id: string; quantity: number }[], totalAmount: number) => void;
  paidItems?: PaidItem[];
  tableUsers?: TableUser[];
  restaurant?: RestaurantData;
}

type PaymentMethod = 'CARD' | 'CASH';

const PaymentScreen: React.FC<PaymentScreenProps> = ({ confirmedItems, onBack, onCompletePayment, paidItems = [], tableUsers = [], restaurant }) => {
  const [flatItems, setFlatItems] = useState<{ uniqueId: string, originalItem: CartItem, isPaid: boolean, paidBy?: string }[]>([]);
  const [selectedUniqueIds, setSelectedUniqueIds] = useState<Set<string>>(new Set());
  const [tipPercentage, setTipPercentage] = useState<number>(10); // Default 10%
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('CARD');
  const [useRewards, setUseRewards] = useState<boolean>(false);

  // Rewards data (hardcoded for demo)
  const isOliveGarden = restaurant?.slug === 'olivegarden';
  const isTsunami = restaurant?.slug === 'tsunamisushi';
  // Convert $3 USD to colones (approximate rate: $1 = ₡500)
  const USD_TO_CRC = 500;
  const rewardsData = {
    currentBalanceUSD: 3.00, // $3 credit
    currentBalanceCRC: 3.00 * USD_TO_CRC, // ₡1,500 in colones
    cashbackRate: 3 // 3% cashback
  };

  const getPaidCount = (itemId: string) => {
    return paidItems.filter(p => p.itemId === itemId).reduce((sum, p) => sum + p.quantity, 0);
  };

  const getUserName = (userId?: string) => {
    if (!userId) return null;
    return tableUsers.find(u => u.id === userId)?.name || null;
  };

  useEffect(() => {
    // Flatten items: If quantity is 2, create 2 entries so they can be paid individually
    const flat: { uniqueId: string, originalItem: CartItem, isPaid: boolean, paidBy?: string }[] = [];
    confirmedItems.forEach((item, index) => {
      const paidCount = getPaidCount(item.id);
      const paidItemsForThis = paidItems.filter(p => p.itemId === item.id);
      let paidIndex = 0;

      for (let i = 0; i < item.quantity; i++) {
        const isPaid = i < paidCount;
        const paidBy = isPaid && paidItemsForThis[paidIndex] ? paidItemsForThis[paidIndex].paidBy : undefined;
        if (isPaid && paidItemsForThis[paidIndex] && i >= paidItemsForThis[paidIndex].quantity) {
          paidIndex++;
        }

        flat.push({
          uniqueId: `${item.id}-${index}-${i}`,
          originalItem: { ...item, quantity: 1 }, // Treat as single unit
          isPaid,
          paidBy,
        });
      }
    });
    setFlatItems(flat);
    // Default select all unpaid items
    setSelectedUniqueIds(new Set(flat.filter(i => !i.isPaid).map(i => i.uniqueId)));
  }, [confirmedItems, paidItems]);

  const toggleItem = (uniqueId: string) => {
    const item = flatItems.find(i => i.uniqueId === uniqueId);
    if (item?.isPaid) return; // Don't allow toggling paid items
    
    const newSet = new Set(selectedUniqueIds);
    if (newSet.has(uniqueId)) {
      newSet.delete(uniqueId);
    } else {
      newSet.add(uniqueId);
    }
    setSelectedUniqueIds(newSet);
  };

  const toggleAll = () => {
    const unpaidItems = flatItems.filter(i => !i.isPaid);
    if (selectedUniqueIds.size === unpaidItems.length) {
      setSelectedUniqueIds(new Set());
    } else {
      setSelectedUniqueIds(new Set(unpaidItems.map(i => i.uniqueId)));
    }
  };

  // Calculations
  const selectedItemsPrice = flatItems
    .filter(i => selectedUniqueIds.has(i.uniqueId))
    .reduce((acc, i) => {
      const basePrice = i.originalItem.price;
      const extrasPrice = i.originalItem.customization?.totalExtrasPrice || 0;
      return acc + basePrice + extrasPrice;
    }, 0);

  const voluntaryTip = selectedItemsPrice * (tipPercentage / 100);
  
  // Rewards calculations
  const rewardsEarning = (isOliveGarden || isTsunami) ? selectedItemsPrice * (rewardsData.cashbackRate / 100) : 0;
  const rewardsToApply = useRewards && (isOliveGarden || isTsunami) ? Math.min(rewardsData.currentBalanceCRC, selectedItemsPrice) : 0;
  const subtotalAfterRewards = selectedItemsPrice - rewardsToApply;
  const total = subtotalAfterRewards + voluntaryTip;

  const handlePay = () => {
    if (selectedUniqueIds.size === 0) return;
    
    // Construct a map of ID -> Quantity Paid
    const paymentMap = new Map<string, number>();
    flatItems.forEach(item => {
      if (selectedUniqueIds.has(item.uniqueId)) {
        const current = paymentMap.get(item.originalItem.id) || 0;
        paymentMap.set(item.originalItem.id, current + 1);
      }
    });

    const paidPayload = Array.from(paymentMap.entries()).map(([id, qty]) => ({ id, quantity: qty }));
    // Pass the total amount (including tax, service, and tip) to the callback
    onCompletePayment(paidPayload, total);
  };

  const getButtonText = () => {
    if (selectedUniqueIds.size === 0) return 'Selecciona ítems';
    const amount = `₡${total.toLocaleString()}`;
    switch (paymentMethod) {
      case 'CARD': return `Pagar ${amount}`;
      case 'CASH': return `Solicitar Cobro ${amount}`;
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-background-light dark:bg-background-dark animate-fade-in">
      {/* Header */}
      <div className="sticky top-0 z-10 glass border-b border-border-light dark:border-border-dark px-5 py-4 flex items-center gap-4">
        <button
          onClick={onBack}
          className="size-10 rounded-full bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors active:scale-95"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </button>
        <h1 className="text-xl font-extrabold text-text-light dark:text-text-dark">Pagar Cuenta</h1>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-80">
        {/* Selection Section */}
        <div className="p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-text-muted dark:text-text-muted-dark">Selecciona los artículos</h2>
            {flatItems.filter(i => !i.isPaid).length > 0 && (
              <button 
                onClick={toggleAll}
                className="text-primary text-sm font-bold hover:underline"
              >
                {selectedUniqueIds.size === flatItems.filter(i => !i.isPaid).length ? 'Deseleccionar todo' : 'Seleccionar todo'}
              </button>
            )}
          </div>

          <div className="flex flex-col gap-3">
            {flatItems.map((item) => {
              const isSelected = selectedUniqueIds.has(item.uniqueId);
              const paidByName = item.isPaid ? getUserName(item.paidBy) : null;
              
              return (
                <div 
                  key={item.uniqueId}
                  onClick={() => !item.isPaid && toggleItem(item.uniqueId)}
                  className={`p-3 rounded-2xl border transition-all duration-200 flex items-center gap-4 ${
                    item.isPaid 
                      ? 'bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 opacity-60 cursor-not-allowed' 
                      : isSelected 
                        ? 'bg-primary/5 border-primary/30 cursor-pointer' 
                        : 'bg-surface-light dark:bg-surface-dark border-transparent shadow-sm cursor-pointer'
                  }`}
                >
                  <div className={`size-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    item.isPaid 
                      ? 'bg-slate-300 dark:bg-slate-600 border-slate-400 dark:border-slate-500' 
                      : isSelected 
                        ? 'bg-primary border-primary' 
                        : 'border-slate-300 dark:border-slate-600'
                  }`}>
                    {item.isPaid ? (
                      <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-[16px]">check_circle</span>
                    ) : isSelected ? (
                      <span className="material-symbols-outlined text-white text-[16px] font-bold">check</span>
                    ) : null}
                  </div>
                  
                  <div className="size-12 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0 overflow-hidden">
                    <img 
                      src={item.originalItem.image || restaurant?.logo || ''} 
                      alt="" 
                      className={`w-full h-full object-cover ${item.isPaid ? 'grayscale' : ''}`} 
                    />
                  </div>
                  
                  <div className="flex-1">
                    <p className={`font-bold text-sm ${
                      item.isPaid 
                        ? 'text-slate-400 dark:text-slate-500 line-through' 
                        : isSelected 
                          ? 'text-primary' 
                          : 'text-text-light dark:text-text-dark'
                    }`}>
                      {item.originalItem.name}
                    </p>
                    {item.originalItem.customization && (item.originalItem.customization.extras.length > 0 || item.originalItem.customization.specialInstructions) && !item.isPaid && (
                      <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        {item.originalItem.customization.extras.length > 0 && (
                          <div>Extras: {item.originalItem.customization.extras.map(e => `${e.name} (+₡${e.price.toLocaleString()})`).join(', ')}</div>
                        )}
                        {item.originalItem.customization.specialInstructions && (
                          <div>Instrucciones: {item.originalItem.customization.specialInstructions}</div>
                        )}
                      </div>
                    )}
                    {item.isPaid ? (
                      <p className="text-xs text-green-600 dark:text-green-400 font-semibold">
                        {paidByName ? `Pagado por ${paidByName}` : 'Pagado'}
                      </p>
                    ) : (
                      <p className="text-xs text-text-muted dark:text-text-muted-dark">
                        ₡{(item.originalItem.price + (item.originalItem.customization?.totalExtrasPrice || 0)).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tip Section */}
        {selectedUniqueIds.size > 0 && (
          <div className="px-5 pt-2 pb-6 border-t border-dashed border-border-light dark:border-border-dark">
            <div className="flex items-center gap-2 mb-4 mt-4">
               <span className="material-symbols-outlined text-amber-500 text-[20px]">savings</span>
               <h2 className="text-sm font-bold uppercase tracking-wider text-text-light dark:text-text-dark">Propina Voluntaria</h2>
            </div>
            
            <div className="grid grid-cols-5 gap-2">
              {[0, 5, 10, 15, 20].map((pct) => (
                <button
                  key={pct}
                  onClick={() => setTipPercentage(pct)}
                  className={`py-2 rounded-xl text-sm font-bold border transition-all ${
                    tipPercentage === pct 
                      ? 'bg-amber-100 dark:bg-amber-900/30 border-amber-500 text-amber-700 dark:text-amber-400' 
                      : 'bg-surface-light dark:bg-surface-dark border-transparent text-text-muted dark:text-text-muted-dark hover:bg-slate-50'
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>
            <p className="text-xs text-center mt-2 text-text-muted dark:text-text-muted-dark">
              {tipPercentage === 0 ? 'Sin propina extra' : `Agregando ₡${voluntaryTip.toLocaleString()} de propina`}
            </p>
          </div>
        )}

        {/* Rewards Section */}
        {(isOliveGarden || isTsunami) && selectedUniqueIds.size > 0 && (
          <div className="px-5 pt-2 pb-6 border-t border-dashed border-border-light dark:border-border-dark">
            <div className={`rounded-2xl p-4 border ${
              isTsunami
                ? 'bg-[#003580]/5 dark:bg-[#003580]/10 border-[#003580]/20 dark:border-[#003580]/30'
                : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/50'
            }`}>
              <div className="flex items-center gap-2 mb-3">
                <span className={`material-symbols-outlined text-[20px] ${
                  isTsunami
                    ? 'text-[#003580] dark:text-[#003580]'
                    : 'text-blue-600 dark:text-blue-400'
                }`}>
                  {isTsunami ? 'waves' : 'loyalty'}
                </span>
                <h2 className={`text-sm font-bold uppercase tracking-wider ${
                  isTsunami
                    ? 'text-[#003580] dark:text-[#003580]'
                    : 'text-blue-700 dark:text-blue-300'
                }`}>
                  {isTsunami ? 'Tsunami Rewards' : 'Spice Up Rewards'}
                </h2>
              </div>
              
              {/* Rewards Earning */}
              <div className={`bg-white/60 dark:bg-slate-800/60 rounded-xl p-3 mb-3 backdrop-blur-sm border ${
                isTsunami
                  ? 'border-[#003580]/20 dark:border-[#003580]/30'
                  : 'border-blue-100 dark:border-blue-800/30'
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-sm font-medium ${
                    isTsunami
                      ? 'text-[#003580] dark:text-[#003580]'
                      : 'text-blue-700 dark:text-blue-300'
                  }`}>
                    Ganarás con esta compra
                  </span>
                  <span className={`text-lg font-bold ${
                    isTsunami
                      ? 'text-[#003580] dark:text-[#003580]'
                      : 'text-blue-600 dark:text-blue-400'
                  }`}>
                    ₡{Math.round(rewardsEarning).toLocaleString()}
                  </span>
                </div>
                <p className={`text-xs ${
                  isTsunami
                    ? 'text-[#003580]/70 dark:text-[#003580]/70'
                    : 'text-blue-600/70 dark:text-blue-400/70'
                }`}>
                  3% de reembolso en efectivo
                </p>
              </div>

              {/* Use Rewards Toggle */}
              {rewardsData.currentBalanceCRC > 0 && (
                <div className={`flex items-center justify-between p-3 bg-white/40 dark:bg-slate-800/40 rounded-xl backdrop-blur-sm border ${
                  isTsunami
                    ? 'border-[#003580]/20 dark:border-[#003580]/30'
                    : 'border-blue-100 dark:border-blue-800/30'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`size-10 rounded-lg flex items-center justify-center ${
                      isTsunami
                        ? 'bg-[#003580]/20 dark:bg-[#003580]/30'
                        : 'bg-blue-100 dark:bg-blue-900/30'
                    }`}>
                      <span className={`material-symbols-outlined text-[20px] ${
                        isTsunami
                          ? 'text-[#003580] dark:text-[#003580]'
                          : 'text-blue-600 dark:text-blue-400'
                      }`}>
                        {isTsunami ? 'waves' : 'savings'}
                      </span>
                    </div>
                    <div>
                      <p className={`text-sm font-bold ${
                        isTsunami
                          ? 'text-[#003580] dark:text-[#003580]'
                          : 'text-blue-700 dark:text-blue-300'
                      }`}>
                        Usar crédito disponible
                      </p>
                      <p className={`text-xs ${
                        isTsunami
                          ? 'text-[#003580]/70 dark:text-[#003580]/70'
                          : 'text-blue-600/70 dark:text-blue-400/70'
                      }`}>
                        ${rewardsData.currentBalanceUSD.toFixed(2)} (₡{rewardsData.currentBalanceCRC.toLocaleString()}) disponibles
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setUseRewards(!useRewards)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      useRewards
                        ? isTsunami
                          ? 'bg-[#003580] dark:bg-[#003580]'
                          : 'bg-blue-600 dark:bg-blue-500'
                        : 'bg-slate-300 dark:bg-slate-600'
                    }`}
                  >
                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow-md ${
                      useRewards ? 'translate-x-6' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Payment Method Section */}
        {selectedUniqueIds.size > 0 && (
          <div className="px-5 pt-2 pb-10 border-t border-dashed border-border-light dark:border-border-dark">
            <div className="flex items-center gap-2 mb-4 mt-2">
               <span className="material-symbols-outlined text-primary text-[20px]">account_balance_wallet</span>
               <h2 className="text-sm font-bold uppercase tracking-wider text-text-light dark:text-text-dark">Método de Pago</h2>
            </div>

            <div className="flex flex-col gap-3">
              {/* Card */}
              <div 
                onClick={() => setPaymentMethod('CARD')}
                className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${paymentMethod === 'CARD' ? 'bg-primary/5 border-primary shadow-sm' : 'bg-surface-light dark:bg-surface-dark border-transparent shadow-sm'}`}
              >
                 <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-slate-700 dark:text-slate-200">credit_card</span>
                 </div>
                 <div className="flex-1">
                    <p className="font-bold text-sm text-text-light dark:text-text-dark">Tarjeta terminada en 4242</p>
                    <p className="text-xs text-text-muted dark:text-text-muted-dark">Visa • Guardada en App</p>
                 </div>
                 <div className={`size-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'CARD' ? 'border-primary' : 'border-slate-300 dark:border-slate-600'}`}>
                    {paymentMethod === 'CARD' && <div className="size-2.5 rounded-full bg-primary"></div>}
                 </div>
              </div>


              {/* Cash */}
              <div 
                onClick={() => setPaymentMethod('CASH')}
                className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${paymentMethod === 'CASH' ? 'bg-primary/5 border-primary shadow-sm' : 'bg-surface-light dark:bg-surface-dark border-transparent shadow-sm'}`}
              >
                 <div className="size-10 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-green-600 dark:text-green-400">payments</span>
                 </div>
                 <div className="flex-1">
                    <p className="font-bold text-sm text-text-light dark:text-text-dark">Efectivo</p>
                    <p className="text-xs text-text-muted dark:text-text-muted-dark">Pagar al mesero</p>
                 </div>
                 <div className={`size-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'CASH' ? 'border-primary' : 'border-slate-300 dark:border-slate-600'}`}>
                    {paymentMethod === 'CASH' && <div className="size-2.5 rounded-full bg-primary"></div>}
                 </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Summary */}
      <div className="fixed bottom-0 left-0 right-0 bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark px-6 pt-6 pb-8 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] max-w-lg mx-auto z-40">
        <div className="space-y-2 mb-6 text-sm">
          <div className="flex justify-between text-text-muted dark:text-text-muted-dark">
            <span>Subtotal ({selectedUniqueIds.size} items)</span>
            <span>₡{selectedItemsPrice.toLocaleString()}</span>
          </div>
          
          {/* Rewards Discount */}
          {(isOliveGarden || isTsunami) && useRewards && rewardsToApply > 0 && (
            <div className={`flex justify-between font-medium ${
              isTsunami
                ? 'text-[#003580] dark:text-[#003580]'
                : 'text-blue-600 dark:text-blue-400'
            }`}>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">
                  {isTsunami ? 'waves' : 'loyalty'}
                </span>
                Crédito aplicado
              </span>
              <span>- ₡{rewardsToApply.toLocaleString()}</span>
            </div>
          )}
          
          {tipPercentage > 0 && (
            <div className="flex justify-between text-amber-600 dark:text-amber-400 font-medium">
              <span>Propina Extra ({tipPercentage}%)</span>
              <span>+ ₡{voluntaryTip.toLocaleString()}</span>
            </div>
          )}
          
          {/* Rewards Earning Display */}
          {(isOliveGarden || isTsunami) && rewardsEarning > 0 && (
            <div className={`flex justify-between items-center pt-2 border-t border-dashed ${
              isTsunami
                ? 'border-[#003580]/30 dark:border-[#003580]/30'
                : 'border-blue-200 dark:border-blue-800/50'
            }`}>
              <div className="flex items-center gap-2">
                <span className={`material-symbols-outlined text-[16px] ${
                  isTsunami
                    ? 'text-[#003580] dark:text-[#003580]'
                    : 'text-blue-600 dark:text-blue-400'
                }`}>
                  {isTsunami ? 'waves' : 'trending_up'}
                </span>
                <span className={`text-sm font-medium ${
                  isTsunami
                    ? 'text-[#003580] dark:text-[#003580]'
                    : 'text-blue-700 dark:text-blue-300'
                }`}>
                  Ganarás (3%)
                </span>
              </div>
              <span className={`font-bold ${
                isTsunami
                  ? 'text-[#003580] dark:text-[#003580]'
                  : 'text-blue-600 dark:text-blue-400'
              }`}>
                ₡{Math.round(rewardsEarning).toLocaleString()}
              </span>
            </div>
          )}
          
          <div className="flex justify-between text-xl font-extrabold text-text-light dark:text-text-dark pt-3 border-t border-dashed border-slate-200 dark:border-slate-700 mt-2">
            <span>Total a Pagar</span>
            <span>₡{total.toLocaleString()}</span>
          </div>
        </div>

        <button 
          onClick={handlePay}
          disabled={selectedUniqueIds.size === 0}
          className={`w-full bg-primary hover:bg-primary-dark text-white font-bold text-lg h-14 rounded-2xl shadow-lg shadow-primary/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 ${selectedUniqueIds.size === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <span className="material-symbols-outlined">
            {paymentMethod === 'CASH' ? 'payments' : 'credit_card'}
          </span>
          <span>{getButtonText()}</span>
        </button>
      </div>
    </div>
  );
};

export default PaymentScreen;