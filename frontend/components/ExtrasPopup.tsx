import React, { useState } from 'react';
import { MenuItem, ItemCustomization, ExtraItem } from '../types';

interface ExtrasPopupProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (item: MenuItem, customization: ItemCustomization, quantity: number) => void;
  restaurantSlug: string;
}

const TSUNAMI_EXTRAS = [
  { name: 'Extra Salsa Anguila', price: 699 }, // ₡699.00 in cents
  { name: 'Extra Aguacate', price: 699 }, // ₡699.00 in cents
  { name: 'Extra Tempura Camarón', price: 2090 }, // ₡2,090.00 in cents
  { name: 'Extra Maduro', price: 1045 }, // ₡1,045.00 in cents
  { name: 'Extra Pollo', price: 3482 }, // ₡3,482.00 in cents
  { name: 'Extra Salmón', price: 2090 }, // ₡2,090.00 in cents
  { name: 'Extra Crunch', price: 699 }, // ₡699.00 in cents
  { name: 'Extra Kanikama', price: 3482 }, // ₡3,482.00 in cents
  { name: 'Extra Calamar', price: 2437 }, // ₡2,437.00 in cents
  { name: 'Salsa Soya', price: 2090 } // ₡2,090.00 in cents
];

const ExtrasPopup: React.FC<ExtrasPopupProps> = ({
  item,
  isOpen,
  onClose,
  onConfirm,
  restaurantSlug
}) => {
  const [selectedExtras, setSelectedExtras] = useState<ExtraItem[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !item) return null;

  const toggleExtra = (extra: ExtraItem) => {
    setSelectedExtras(prev =>
      prev.find(e => e.name === extra.name)
        ? prev.filter(e => e.name !== extra.name)
        : [...prev, extra]
    );
  };

  // Calculate total extras price
  const totalExtrasPrice = selectedExtras.reduce((sum, extra) => sum + extra.price, 0);

  const handleConfirm = () => {
    // Build special instructions: include selection if needed, then any additional instructions
    let instructions = '';
    if (item.selectionOptions && selectedOption) {
      instructions = `Selección: ${selectedOption}`;
      if (specialInstructions.trim()) {
        instructions += ` | ${specialInstructions.trim()}`;
      }
    } else {
      instructions = specialInstructions.trim();
    }

    const customization: ItemCustomization = {
      extras: selectedExtras,
      specialInstructions: instructions,
      totalExtrasPrice
    };

    onConfirm(item, customization, quantity);

    // Reset state
    setSelectedExtras([]);
    setSpecialInstructions('');
    setSelectedOption('');
    setQuantity(1);
    onClose();
  };

  const handleCancel = () => {
    // Reset state
    setSelectedExtras([]);
    setSpecialInstructions('');
    setSelectedOption('');
    setQuantity(1);
    onClose();
  };

  // Only show extras for Tsunami
  const showExtras = restaurantSlug === 'tsunamisushi';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-start">
            <div className="flex-1 pr-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">{item.name}</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">₡{item.price.toLocaleString()}</p>
            </div>
            <button
              onClick={handleCancel}
              className="size-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Quantity - Fixed */}
          <div className="p-6 pb-0">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-3">
                Cantidad
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="size-10 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 flex items-center justify-center transition-colors hover:bg-slate-200 dark:hover:bg-slate-600"
                >
                  <span className="material-symbols-outlined text-[20px]">remove</span>
                </button>
                <span className="text-lg font-bold text-slate-900 dark:text-white min-w-[2rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="size-10 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 flex items-center justify-center transition-colors hover:bg-slate-200 dark:hover:bg-slate-600"
                >
                  <span className="material-symbols-outlined text-[20px]">add</span>
                </button>
              </div>
            </div>
          </div>

          {/* Scrollable Extras and Instructions */}
          <div className="flex-1 overflow-y-auto px-6">
            {/* Selection Options (for grouped items like beverages) */}
            {item.selectionOptions && item.selectionOptions.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-3">
                  Selecciona tu opción <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  <option value="">-- Selecciona --</option>
                  {item.selectionOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Extras - Only for Tsunami */}
            {showExtras && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-3">
                  Extras
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {TSUNAMI_EXTRAS.map((extra) => (
                    <button
                      key={extra.name}
                      onClick={() => toggleExtra(extra)}
                      className={`p-3 rounded-lg border transition-all text-left ${
                        selectedExtras.find(e => e.name === extra.name)
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white hover:border-slate-300 dark:hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{extra.name}</span>
                          <span className="text-xs text-slate-500 dark:text-slate-400">₡{extra.price.toLocaleString()}</span>
                        </div>
                        {selectedExtras.find(e => e.name === extra.name) && (
                          <span className="material-symbols-outlined text-[18px] text-primary">check</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Special Instructions - Always visible for all restaurants */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-3">
                Instrucciones Especiales
              </label>
              <textarea
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder={
                  item.selectionOptions 
                    ? "Instrucciones adicionales (opcional)..." 
                    : showExtras
                    ? "Ej: Extra ginger en el lado, sin wasabi..."
                    : "Ej: Sin cebolla, bien cocido, sin picante..."
                }
                className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
                rows={3}
                maxLength={200}
              />
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {specialInstructions.length}/200 caracteres
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 p-6 border-t border-slate-200 dark:border-slate-700">
          {/* Price Summary */}
          <div className="mb-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">Precio base (x{quantity})</span>
              <span className="text-slate-900 dark:text-white">₡{(item.price * quantity).toLocaleString()}</span>
            </div>
            {totalExtrasPrice > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Extras (x{quantity})</span>
                <span className="text-slate-900 dark:text-white">₡{(totalExtrasPrice * quantity).toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-bold border-t border-slate-200 dark:border-slate-700 pt-2">
              <span className="text-slate-900 dark:text-white">Total</span>
              <span className="text-primary">₡{((item.price + totalExtrasPrice) * quantity).toLocaleString()}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className="flex-1 px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirm}
              disabled={item.selectionOptions && item.selectionOptions.length > 0 && !selectedOption}
              className={`flex-1 px-4 py-3 rounded-lg bg-primary text-white font-semibold transition-colors ${
                item.selectionOptions && item.selectionOptions.length > 0 && !selectedOption
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-primary-dark'
              }`}
            >
              Agregar al Pedido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtrasPopup;