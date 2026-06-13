'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Plus, Sparkles } from 'lucide-react';
import { JewelryItem } from '../data/products';

interface ProductCardProps {
  product: JewelryItem;
  onAddToCart: (product: JewelryItem) => void;
  onTryOn: (product: JewelryItem) => void;
}

export default function ProductCard({ product, onAddToCart, onTryOn }: ProductCardProps) {
  // Format currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/40 backdrop-blur-sm transition-all duration-500 hover:border-amber-400/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.07)]"
    >
      {/* Product Image Area */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-950">
        {/* Unsplash Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-80 group-hover:opacity-90"
          loading="lazy"
        />

        {/* Category Badge */}
        <span className="absolute top-4 left-4 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-[10px] tracking-widest text-amber-400 uppercase">
          {product.category}
        </span>

        {/* Live AR indicator */}
        <span className="absolute top-4 right-4 flex items-center gap-1 rounded-full border border-amber-400/25 bg-amber-400/10 px-2.5 py-1 text-[9px] tracking-wider text-amber-300 uppercase backdrop-blur-md">
          <Camera className="h-3 w-3 stroke-[2]" />
          AR Try-On
        </span>

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-black/40 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex flex-col gap-2.5">
            <button
              onClick={() => onTryOn(product)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gold-gradient py-3 text-xs font-semibold tracking-wider text-black transition-all duration-300 hover:brightness-110 active:scale-[0.98] shadow-lg shadow-amber-400/10"
            >
              <Sparkles className="h-4 w-4 fill-black/10" />
              TRY ON IN AR
            </button>
            
            <button
              onClick={() => onAddToCart(product)}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-black/40 py-3 text-xs font-semibold tracking-wider text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 active:scale-[0.98]"
            >
              <Plus className="h-4 w-4" />
              ADD TO CART
            </button>
          </div>
        </div>
      </div>

      {/* Info Area */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-medium tracking-wide text-zinc-100 group-hover:text-amber-400 transition-colors duration-300">
          {product.name}
        </h3>
        <p className="mt-2 text-xs font-light leading-5 text-zinc-400 flex-grow">
          {product.description}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
          <span className="text-lg font-semibold text-amber-400 tracking-wide">
            {formatPrice(product.price)}
          </span>
          
          {/* Quick Try-On link for touch devices */}
          <button
            onClick={() => onTryOn(product)}
            className="md:hidden flex items-center gap-1.5 text-xs text-amber-300 font-medium tracking-wider uppercase"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Try On
          </button>
        </div>
      </div>
    </motion.div>
  );
}
