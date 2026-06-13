'use client';

import React from 'react';
import { ShoppingBag, Sparkles } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function Navbar({ cartCount, onCartClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/5 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="bg-gold-gradient bg-clip-text text-2xl font-semibold tracking-[0.2em] text-transparent font-luxury">
              AURA
            </span>
            <span className="text-xs tracking-[0.3em] text-zinc-400 font-light uppercase mt-1">
              Luxe
            </span>
          </div>

          {/* Navigation links - Aesthetic only */}
          <nav className="hidden md:flex items-center gap-8 text-sm tracking-widest text-zinc-300 uppercase font-light">
            <a href="#collections" className="hover:text-amber-400 transition-colors duration-300">
              Collections
            </a>
            <a href="#about" className="hover:text-amber-400 transition-colors duration-300">
              Our Craft
            </a>
            <a href="#tryon-info" className="hover:text-amber-400 transition-colors duration-300 flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-amber-400" />
              Web-AR Try-On
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={onCartClick}
              className="relative p-2.5 rounded-full border border-white/10 hover:border-amber-400/40 text-zinc-200 hover:text-amber-400 transition-all duration-300 hover:bg-white/5 group"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="h-5 w-5 stroke-[1.5]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold-gradient text-[10px] font-medium text-black ring-2 ring-black">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
