import React, { useState } from 'react';
import { ShoppingCart, Trash2, Plus, Minus, CreditCard, Receipt } from 'lucide-react';

const initialCart = [
  { id: 1, name: 'Coca Cola 50cl', price: 2.00, quantity: 2, image: '🥤' },
  { id: 2, name: 'Bread Loaf', price: 3.05, quantity: 1, image: '🍞' },
  { id: 3, name: 'Milk Drops', price: 3.55, quantity: 1, image: '🥛' },
];

export const POS = () => {
  const [cart, setCart] = useState(initialCart);

  const updateQuantity = (id: number, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQ = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQ };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="p-4 flex flex-col h-full bg-slate-50 pb-24">
      
      <div className="flex justify-between items-center mb-6 px-1">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Smart POS</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Syncs with shelf inventory</p>
        </div>
        <div className="bg-slate-100 text-slate-600 p-2 rounded-lg border border-slate-200 shadow-sm">
          <ShoppingCart className="w-4 h-4" />
        </div>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {cart.map(item => (
          <div key={item.id} className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 flex items-center">
            <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded flex items-center justify-center text-xl shrink-0">
              {item.image}
            </div>
            <div className="ml-3 flex-1">
              <h4 className="font-bold text-slate-800 text-sm tracking-tight">{item.name}</h4>
              <p className="text-[11px] text-slate-500 font-mono font-medium">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center space-x-2 bg-slate-50 rounded border border-slate-200 p-1">
              <button 
                onClick={() => updateQuantity(item.id, -1)}
                className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm border border-slate-200 text-slate-600 active:bg-slate-100"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
              <button 
                onClick={() => updateQuantity(item.id, 1)}
                className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm border border-slate-200 text-slate-600 active:bg-slate-100"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}

        {cart.length === 0 && (
          <div className="flex flex-col items-center justify-center h-48 text-slate-400 space-y-4">
            <ShoppingCart className="w-12 h-12 opacity-20" />
            <p>Cart is empty</p>
          </div>
        )}
      </div>

      {/* Checkout Summary */}
      <div className="mt-auto pt-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
          <div className="space-y-3 mb-4">
            <div className="flex justify-between text-[11px] font-bold text-slate-500 uppercase tracking-tight">
              <span>Subtotal</span>
              <span className="font-mono">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[11px] font-bold text-slate-500 uppercase tracking-tight">
              <span>Tax (8%)</span>
              <span className="font-mono">${(total * 0.08).toFixed(2)}</span>
            </div>
            <div className="h-px bg-slate-200 w-full" />
            <div className="flex justify-between font-black text-lg text-slate-900">
              <span>TOTAL</span>
              <span className="font-mono">${(total * 1.08).toFixed(2)}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-4">
            <button className="flex items-center justify-center space-x-2 bg-white border border-slate-300 text-slate-700 py-2.5 rounded text-xs font-bold uppercase active:bg-slate-50 transition-colors">
              <Receipt className="w-4 h-4" />
              <span>Save</span>
            </button>
            <button className="flex items-center justify-center space-x-2 bg-slate-900 text-white py-2.5 rounded text-xs font-bold uppercase active:bg-slate-800 transition-colors">
              <CreditCard className="w-4 h-4" />
              <span>Pay</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
