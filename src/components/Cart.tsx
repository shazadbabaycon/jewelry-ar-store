'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { JewelryItem } from '../data/products';

interface CartItem {
  product: JewelryItem;
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
}

export default function Cart({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
}: CartProps) {
  // Calculate subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Format currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-50 flex w-full max-w-md flex-col bg-zinc-950 border-l border-white/5 text-zinc-100 shadow-2xl"
          >
            {/* Header */}
            <div className="flex h-20 items-center justify-between border-b border-white/5 px-6">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-amber-400" />
                <h2 className="text-lg font-medium tracking-wide font-luxury">Shopping Bag</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center space-y-4">
                  <div className="rounded-full border border-dashed border-white/10 p-5">
                    <ShoppingBag className="h-10 w-10 text-zinc-500 stroke-[1]" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-zinc-300">Your bag is empty</p>
                    <p className="text-xs text-zinc-500">Discover our collection to add items</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="mt-2 text-xs font-semibold tracking-wider text-amber-400 uppercase hover:text-amber-300"
                  >
                    Continue Browsing
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.product.id} className="flex gap-4 border-b border-white/5 pb-6 last:border-0 last:pb-0">
                    <div className="h-20 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-900 border border-white/5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover object-center opacity-85"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-zinc-200 tracking-wide">
                          {item.product.name}
                        </h3>
                        <p className="text-xs text-zinc-400 font-light mt-0.5 capitalize">
                          {item.product.category}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Quantity controls */}
                        <div className="flex items-center rounded-lg border border-white/10 bg-zinc-900/60 px-1 py-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="p-1 rounded text-zinc-400 hover:text-white"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="p-1 rounded text-zinc-400 hover:text-white"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        {/* Remove item */}
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-zinc-500 hover:text-red-400 p-1.5 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-medium text-amber-400 tracking-wide">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {cartItems.length > 0 && (
              <div className="border-t border-white/5 bg-zinc-900/40 p-6 space-y-6">
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-zinc-400">
                    <span>Shipping</span>
                    <span className="text-xs tracking-wider uppercase text-emerald-400">Complimentary</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Insurance</span>
                    <span className="text-xs tracking-wider uppercase text-emerald-400 font-luxury">Insured</span>
                  </div>
                  <div className="flex justify-between text-base font-medium pt-3 border-t border-white/5 text-zinc-100">
                    <span>Subtotal</span>
                    <span className="text-amber-400 font-semibold tracking-wider">{formatPrice(subtotal)}</span>
                  </div>
                </div>

                <button
                  onClick={() => alert("Checkout processed! Thank you for purchasing from AURA Luxe.")}
                  className="flex w-full items-center justify-center rounded-xl bg-gold-gradient py-4 text-sm font-semibold tracking-widest text-black shadow-lg shadow-amber-400/5 hover:brightness-110 active:scale-[0.99] transition-all uppercase"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
