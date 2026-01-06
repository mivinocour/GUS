import React, { useState, useEffect } from 'react';
import { CartItem } from '../types';

interface PaymentScreenProps {
  confirmedItems: CartItem[];
  onBack: () => void;
  onCompletePayment: (paidItems: { id: string; quantity: number }[]) => void;
}

type PaymentMethod = 'CARD' | 'SINPE' | 'CASH';

const PaymentScreen: React.FC<PaymentScreenProps> = ({ confirmedItems, onBack, onCompletePayment }) => {
  const [flatItems, setFlatItems] = useState<{ uniqueId: string, originalItem: CartItem }[]>([]);
  const [selectedUniqueIds, setSelectedUniqueIds] = useState<Set<string>>(new Set());
  const [tipPercentage, setTipPercentage] = useState<number>(10); // Default 10%
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('CARD');

  useEffect(() => {
    // Flatten items: If quantity is 2, create 2 entries so they can be paid individually
    const flat: { uniqueId: string, originalItem: CartItem }[] = [];
    confirmedItems.forEach((item, index) => {
      for (let i = 0; i < item.quantity; i++) {
        flat.push({
          uniqueId: `${item.id}-${index}-${i}`,
          originalItem: { ...item, quantity: 1 } // Treat as single unit
        });
      }
    });
    setFlatItems(flat);
    // Default select all
    setSelectedUniqueIds(new Set(flat.map(i => i.uniqueId)));
  }, [confirmedItems]);

  const toggleItem = (uniqueId: string) => {
    const newSet = new Set(selectedUniqueIds);
    if (newSet.has(uniqueId)) {
      newSet.delete(uniqueId);
    } else {
      newSet.add(uniqueId);
    }
    setSelectedUniqueIds(newSet);
  };

  const toggleAll = () => {
    if (selectedUniqueIds.size === flatItems.length) {
      setSelectedUniqueIds(new Set());
    } else {
      setSelectedUniqueIds(new Set(flatItems.map(i => i.uniqueId)));
    }
  };

  // Calculations
  const selectedItemsPrice = flatItems
    .filter(i => selectedUniqueIds.has(i.uniqueId))
    .reduce((acc, i) => acc + i.originalItem.price, 0);

  const iva = selectedItemsPrice * 0.13;
  const service = selectedItemsPrice * 0.10; // Mandatory service
  const voluntaryTip = selectedItemsPrice * (tipPercentage / 100);
  const total = selectedItemsPrice + iva + service + voluntaryTip;

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
    onCompletePayment(paidPayload);
  };

  const getButtonText = () => {
    if (selectedUniqueIds.size === 0) return 'Selecciona ítems';
    const amount = `₡${total.toLocaleString()}`;
    switch (paymentMethod) {
      case 'CARD': return `Pagar ${amount}`;
      case 'SINPE': return `Confirmar SINPE ${amount}`;
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

      <div className="flex-1 overflow-y-auto no-scrollbar pb-64">
        {/* Selection Section */}
        <div className="p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-text-muted dark:text-text-muted-dark">Selecciona los artículos</h2>
            <button 
              onClick={toggleAll}
              className="text-primary text-sm font-bold hover:underline"
            >
              {selectedUniqueIds.size === flatItems.length ? 'Deseleccionar todo' : 'Seleccionar todo'}
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {flatItems.map((item) => {
              const isSelected = selectedUniqueIds.has(item.uniqueId);
              return (
                <div 
                  key={item.uniqueId}
                  onClick={() => toggleItem(item.uniqueId)}
                  className={`p-3 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center gap-4 ${isSelected ? 'bg-primary/5 border-primary/30' : 'bg-surface-light dark:bg-surface-dark border-transparent shadow-sm'}`}
                >
                  <div className={`size-6 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'bg-primary border-primary' : 'border-slate-300 dark:border-slate-600'}`}>
                    {isSelected && <span className="material-symbols-outlined text-white text-[16px] font-bold">check</span>}
                  </div>
                  
                  <div className="size-12 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0 overflow-hidden">
                    <img src={item.originalItem.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-1">
                    <p className={`font-bold text-sm ${isSelected ? 'text-primary' : 'text-text-light dark:text-text-dark'}`}>{item.originalItem.name}</p>
                    <p className="text-xs text-text-muted dark:text-text-muted-dark">₡{item.originalItem.price.toLocaleString()}</p>
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

        {/* Payment Method Section */}
        {selectedUniqueIds.size > 0 && (
          <div className="px-5 pt-2 pb-6 border-t border-dashed border-border-light dark:border-border-dark">
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

              {/* SINPE */}
              <div 
                onClick={() => setPaymentMethod('SINPE')}
                className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${paymentMethod === 'SINPE' ? 'bg-primary/5 border-primary shadow-sm' : 'bg-surface-light dark:bg-surface-dark border-transparent shadow-sm'}`}
              >
                 <div className="size-10 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-red-600 dark:text-red-400">currency_exchange</span>
                 </div>
                 <div className="flex-1">
                    <p className="font-bold text-sm text-text-light dark:text-text-dark">SINPE Móvil</p>
                    <p className="text-xs text-text-muted dark:text-text-muted-dark">8888-8888 • Restaurante El Patio</p>
                 </div>
                 <div className={`size-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'SINPE' ? 'border-primary' : 'border-slate-300 dark:border-slate-600'}`}>
                    {paymentMethod === 'SINPE' && <div className="size-2.5 rounded-full bg-primary"></div>}
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
      <div className="fixed bottom-0 left-0 right-0 bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark p-6 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] pb-8 max-w-lg mx-auto z-40">
        <div className="space-y-2 mb-6 text-sm">
          <div className="flex justify-between text-text-muted dark:text-text-muted-dark">
            <span>Subtotal ({selectedUniqueIds.size} items)</span>
            <span>₡{selectedItemsPrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-text-muted dark:text-text-muted-dark">
            <span>IVA (13%)</span>
            <span>₡{iva.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-text-muted dark:text-text-muted-dark">
            <span>Servicio (10%)</span>
            <span>₡{service.toLocaleString()}</span>
          </div>
          {tipPercentage > 0 && (
            <div className="flex justify-between text-amber-600 dark:text-amber-400 font-medium">
              <span>Propina Extra ({tipPercentage}%)</span>
              <span>+ ₡{voluntaryTip.toLocaleString()}</span>
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
            {paymentMethod === 'CASH' ? 'payments' : paymentMethod === 'SINPE' ? 'send_to_mobile' : 'credit_card'}
          </span>
          <span>{getButtonText()}</span>
        </button>
      </div>
    </div>
  );
};

export default PaymentScreen;