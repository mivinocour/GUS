import React, { useState, useEffect } from 'react';
import { CartItem, TableUser } from '../types';
import { apiService } from '../services/api';
import { RESTAURANTS } from '../data';

interface OrderItemStatus {
  id: string;
  menu_item_id: string;
  menu_item_name?: string;
  menu_item_image?: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  notes?: string;
  ordered_by: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'served' | 'cancelled';
  created_at: string;
}

interface ApiOrderResponse {
  id: string;
  restaurant_id: string;
  table_id?: string;
  order_number: number;
  total_amount: number;
  notes?: string;
  created_at: string;
  items: OrderItemStatus[];
}

interface SuccessScreenProps {
  onKeepOrdering: () => void;
  onPay: () => void;
  orderItems: CartItem[]; // Current order items (just confirmed)
  confirmedItems: CartItem[]; // All confirmed items from the session
  grandTotal: number;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({
  onKeepOrdering,
  onPay,
  orderItems,
  confirmedItems,
  grandTotal
}) => {

  // Calculate total from ALL confirmed items (not just current order) including extras
  const total = confirmedItems.reduce((acc, item) => {
    const basePrice = item.price * item.quantity;
    const extrasPrice = item.customization ? item.customization.totalExtrasPrice * item.quantity : 0;
    return acc + basePrice + extrasPrice;
  }, 0);
  
  // Separate current order items from previously confirmed items
  const currentOrderIds = new Set(orderItems.map(item => item.id));
  const previouslyConfirmed = confirmedItems.filter(item => !currentOrderIds.has(item.id));

  const getStatusDisplay = (status: string) => {
    const statusMap = {
      pending: { text: 'Pendiente', color: 'bg-slate-100 text-slate-600 border-slate-200' },
      confirmed: { text: 'Confirmado', color: 'bg-blue-100 text-blue-700 border-blue-200' },
      preparing: { text: 'Preparando', color: 'bg-amber-100 text-amber-700 border-amber-200' },
      ready: { text: 'Listo', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
      served: { text: 'Entregado', color: 'bg-slate-100 text-slate-500 border-slate-200' },
      cancelled: { text: 'Cancelado', color: 'bg-red-100 text-red-700 border-red-200' }
    };
    return statusMap[status as keyof typeof statusMap] || statusMap.pending;
  };

  return (
    <div className="flex-1 flex flex-col w-full max-w-md mx-auto h-full pb-8 px-5 overflow-y-auto no-scrollbar bg-white dark:bg-background-dark">
      <div className="flex flex-col gap-6 w-full animate-fade-in-up pt-8">
        {/* Header - Clean Style */}
        <div className="text-center space-y-4">
          {/* Simple Cooking Animation */}
          <div className="relative flex items-center justify-center mb-4">
            <div className="text-6xl animate-pulse">🍳</div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">¡Orden Confirmada!</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-[280px] mx-auto">
            La cocina está trabajando en tu pedido
          </p>
        </div>

        {/* Items List */}
        <div className="space-y-6">
          {/* Current Order Items (Just Confirmed) */}
          {orderItems.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border-light dark:border-border-dark">
                <span className="material-symbols-outlined text-[20px] text-primary">
                  shopping_cart
                </span>
                <p className="text-xs font-bold uppercase tracking-wider text-primary">
                  Nueva Orden
                </p>
              </div>
              <div className="space-y-4 pl-2 border-l-2 border-primary/20">
                {orderItems.map((item: CartItem) => (
                  <div key={`new-${item.id}`} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                      {item.customization && (item.customization.extras.length > 0 || item.customization.specialInstructions) && (
                        <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                          {item.customization.extras.length > 0 && (
                            <div>Extras: {item.customization.extras.map(e => `${e.name} (+₡${e.price.toLocaleString()})`).join(', ')}</div>
                          )}
                          {item.customization.specialInstructions && (
                            <div>Instrucciones: {item.customization.specialInstructions}</div>
                          )}
                        </div>
                      )}
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {item.quantity}x • ₡{((item.price + (item.customization?.totalExtrasPrice || 0)) * item.quantity).toLocaleString()}
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">
                      Confirmado
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Previously Confirmed Items */}
          {previouslyConfirmed.length > 0 && (
            <div className="opacity-75">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border-light dark:border-border-dark">
                <span className="material-symbols-outlined text-[20px] text-green-600 dark:text-green-400">
                  check_circle
                </span>
                <p className="text-xs font-bold uppercase tracking-wider text-green-700 dark:text-green-400">
                  En Preparación
                </p>
              </div>
              <div className="space-y-4 pl-2 border-l-2 border-green-500/20">
                {previouslyConfirmed.map((item: CartItem) => (
                  <div key={`prev-${item.id}`} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                      {item.customization && (item.customization.extras.length > 0 || item.customization.specialInstructions) && (
                        <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                          {item.customization.extras.length > 0 && (
                            <div>Extras: {item.customization.extras.map(e => `${e.name} (+₡${e.price.toLocaleString()})`).join(', ')}</div>
                          )}
                          {item.customization.specialInstructions && (
                            <div>Instrucciones: {item.customization.specialInstructions}</div>
                          )}
                        </div>
                      )}
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {item.quantity}x • ₡{((item.price + (item.customization?.totalExtrasPrice || 0)) * item.quantity).toLocaleString()}
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">
                      En Preparación
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Total Summary */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
          <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white">
            <span>Total</span>
            <span>₡{total.toLocaleString()}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col w-full gap-3 mt-6 mb-8">
          <button
            onClick={onPay}
            className="w-full bg-blue-600 text-white font-bold h-14 rounded-2xl shadow-lg active:scale-[0.98] transition-all hover:bg-blue-700"
          >
            <span>Pagar Total (₡{total.toLocaleString()})</span>
          </button>
          <button
            onClick={onKeepOrdering}
            className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-bold h-14 rounded-2xl active:scale-[0.98] transition-all hover:bg-gray-200"
          >
            <span>Agregar más</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessScreen;