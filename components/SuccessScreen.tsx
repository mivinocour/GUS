import React from 'react';
import { CartItem } from '../types';

interface SuccessScreenProps {
  onKeepOrdering: () => void;
  onPay: () => void;
  orderItems: CartItem[];
  grandTotal: number;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({ onKeepOrdering, onPay, orderItems, grandTotal }) => {
  // Calculate total for the specific receipt (Last Order)
  const subtotal = orderItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.13;
  const service = subtotal * 0.10;
  const total = subtotal + tax + service;

  return (
    <div className="flex-1 flex flex-col items-center w-full max-w-md mx-auto h-full pb-8 px-4 overflow-y-auto no-scrollbar">
      <div className="flex flex-col items-center gap-6 w-full animate-fade-in-up pt-8">
        {/* Animated Checkmark */}
        <div className="relative flex items-center justify-center animate-pop">
          <div className="absolute inset-0 bg-primary/20 dark:bg-primary/30 rounded-full blur-xl transform scale-150"></div>
          <div className="relative bg-primary text-white w-24 h-24 rounded-full flex items-center justify-center shadow-lg shadow-primary/30 ring-4 ring-white dark:ring-background-dark">
             <span className="material-symbols-outlined text-[48px]">check</span>
          </div>
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">¡Orden Confirmada!</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-[250px] mx-auto">
            La cocina ha recibido tu pedido y comenzará a prepararlo pronto.
          </p>
        </div>

        {/* Receipt Card */}
        <div className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden mt-4 relative">
            
            <div className="p-6">
                <div className="flex justify-between items-center mb-6 border-b border-dashed border-slate-200 dark:border-slate-700 pb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Recibo Actual</span>
                    <span className="text-xs font-medium text-slate-400">#{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</span>
                </div>

                <div className="space-y-4 mb-6">
                    {orderItems.map((item) => (
                        <div key={item.id} className="flex justify-between items-start text-sm">
                            <div className="flex gap-3">
                                <span className="font-bold text-text-light dark:text-text-dark w-5">{item.quantity}x</span>
                                <span className="text-slate-600 dark:text-slate-300">{item.name}</span>
                            </div>
                            <span className="font-medium text-text-light dark:text-text-dark">₡{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                    ))}
                </div>

                <div className="pt-4 border-t border-dashed border-slate-200 dark:border-slate-700 space-y-2">
                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                        <span>Subtotal</span>
                        <span>₡{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                        <span>IVA (13%)</span>
                        <span>₡{tax.toLocaleString()}</span>
                    </div>
                     <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                        <span>Servicio (10%)</span>
                        <span>₡{service.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-base font-bold text-text-light dark:text-text-dark pt-2 mt-2 border-t border-slate-100 dark:border-slate-700">
                        <span>Total de esta orden</span>
                        <span>₡{total.toLocaleString()}</span>
                    </div>
                </div>
            </div>
            
             {/* Sawtooth border effect bottom for receipt look */}
             <div className="h-4 bg-background-light dark:bg-background-dark w-full relative -mb-2" style={{clipPath: 'polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%, 25% 100%, 30% 0%, 35% 100%, 40% 0%, 45% 100%, 50% 0%, 55% 100%, 60% 0%, 65% 100%, 70% 0%, 75% 100%, 80% 0%, 85% 100%, 90% 0%, 95% 100%, 100% 0%)'}}></div>
        </div>

        <div className="flex flex-col w-full gap-3 mt-4 mb-8">
            <button 
                onClick={onPay}
                className="w-full bg-primary text-white font-bold h-14 rounded-xl shadow-xl shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 hover:bg-blue-600"
            >
                <span className="material-symbols-outlined">credit_card</span>
                <span>Pagar Total (₡{grandTotal.toLocaleString()})</span>
            </button>
            <button 
                onClick={onKeepOrdering}
                className="w-full bg-white dark:bg-gray-800 border border-border-light dark:border-border-dark text-text-light dark:text-text-dark font-bold h-14 rounded-xl shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700"
            >
                <span className="material-symbols-outlined">add_circle</span>
                <span>Agregar a la orden</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessScreen;