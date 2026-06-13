'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Camera, X, ShoppingBag, Eye, ShieldCheck, HelpCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';
import { products, JewelryItem } from '../data/products';

interface CartItem {
  product: JewelryItem;
  quantity: number;
}

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTryOn, setActiveTryOn] = useState<JewelryItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Set up listener for messages from AR iframe
  useEffect(() => {
    const handleARMessage = (event: MessageEvent) => {
      if (!event.data) return;

      if (event.data.type === 'SNAPSHOT_TAKEN') {
        showToast('📸 Portrait captured successfully!');
      }

      if (event.data.type === 'ADD_TO_CART') {
        const item = products.find(p => p.id === event.data.itemId);
        if (item) {
          addToCart(item);
          showToast(`✨ Added ${item.name} to your Bag!`);
        }
      }
    };

    window.addEventListener('message', handleARMessage);
    return () => window.removeEventListener('message', handleARMessage);
  }, []);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Add item to cart
  const addToCart = (product: JewelryItem) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  // Update cart quantity
  const updateCartQuantity = (productId: string, delta: number) => {
    setCartItems(prev =>
      prev
        .map(item =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  // Remove item from cart
  const removeCartItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  // Start AR Try-On
  const handleTryOn = (product: JewelryItem) => {
    setActiveTryOn(product);
  };

  // Swap active item inside the AR iframe without reloading the iframe
  const handleArItemSwap = (product: JewelryItem) => {
    if (activeTryOn && activeTryOn.arType === product.arType) {
      setActiveTryOn(product);
      // Send message to iframe to change item
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          { type: 'CHANGE_ITEM', itemId: product.id },
          '*'
        );
      }
    } else {
      // Different AR type (e.g. face to hand), need to load different iframe
      setActiveTryOn(product);
    }
  };

  // Get total cart items count
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Filtered products list
  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  // Get products of the same category for quick-swap inside AR mode
  const quickSwapItems = activeTryOn
    ? products.filter(p => p.category === activeTryOn.category)
    : [];

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 flex flex-col selection:bg-amber-400/30 selection:text-amber-200">
      {/* Navbar */}
      <Navbar cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />

      {/* Hero Section */}
      <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[600px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-2"
          >
            <Sparkles className="h-4.5 w-4.5 text-amber-400 fill-amber-400/20" />
            <span className="text-[11px] tracking-[0.4em] font-semibold text-amber-400 uppercase">
              Immersive Fine Jewelry
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-7xl font-light tracking-[0.15em] leading-[1.15] text-zinc-50"
          >
            TRUE CRAFT, <br />
            <span className="text-gold-gradient font-semibold">IMMERSIVE LUXURY</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto text-sm sm:text-base font-light leading-7 text-zinc-400 tracking-wide"
          >
            Experience haute joaillerie through your lens. Try on our handcrafted gold crowns, pearl drop earrings, and brilliant gemstone rings in real-time with browser-native Web-AR.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <a
              href="#collections"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gold-gradient text-black font-semibold text-xs tracking-widest uppercase hover:brightness-110 active:scale-[0.98] transition-all duration-300 shadow-xl shadow-amber-500/10"
            >
              Explore Collection
            </a>
            <a
              href="#tryon-info"
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/10 hover:border-amber-400/30 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs tracking-widest uppercase active:scale-[0.98] transition-all duration-300"
            >
              How it works
            </a>
          </motion.div>
        </div>
      </section>

      {/* Catalog & Filter Section */}
      <section id="collections" className="scroll-mt-24 py-24 bg-[#070707] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-3xl font-medium tracking-wider text-zinc-100 font-luxury">
                Curated Masterpieces
              </h2>
              <p className="text-xs text-zinc-500 tracking-widest uppercase mt-2 font-light">
                Discover pieces forged in starlight & gold
              </p>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap items-center gap-2 border-b border-white/5 md:border-b-0 pb-4 md:pb-0">
              {['all', 'crown', 'earring', 'ring', 'necklace'].map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 rounded-full text-[10px] font-semibold tracking-widest uppercase border transition-all duration-300 ${
                    selectedCategory === category
                      ? 'border-amber-400 text-amber-400 bg-amber-400/5'
                      : 'border-white/5 text-zinc-400 hover:text-zinc-200 hover:border-white/15'
                  }`}
                >
                  {category === 'all' ? 'View All' : `${category}s`}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                onTryOn={handleTryOn}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Info / Tech section */}
      <section id="tryon-info" className="py-24 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl font-medium tracking-wide text-zinc-100 font-luxury">
              AR Try-On Experience
            </h2>
            <p className="text-sm text-zinc-400 font-light leading-6 mt-4">
              Our bespoke Web-AR system maps physical geometry in real-time, matching jewelry dimensions directly to your scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="rounded-2xl border border-white/5 bg-zinc-900/20 p-8 space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">
                <Eye className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-medium tracking-wide text-zinc-200">1. Grant Camera Access</h3>
              <p className="text-xs font-light leading-5 text-zinc-500">
                Click "Try On" and grant temporary camera access. No data is stored or uploaded to servers — all tracking is processed locally on your device.
              </p>
            </div>

            {/* Step 2 */}
            <div className="rounded-2xl border border-white/5 bg-zinc-900/20 p-8 space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">
                <Camera className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-medium tracking-wide text-zinc-200">2. Face or Hand Tracking</h3>
              <p className="text-xs font-light leading-5 text-zinc-500">
                Position your face (for crowns & earrings) or place your hand (for rings) in front of the lens. The AI model will lock target coordinates instantly.
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-2xl border border-white/5 bg-zinc-900/20 p-8 space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-medium tracking-wide text-zinc-200">3. Capture & Acquire</h3>
              <p className="text-xs font-light leading-5 text-zinc-500">
                Take a portrait photo directly inside the camera to see how it fits, customize sizes, or add the jewelry to your shopping bag to secure the purchase.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#050505] py-12 text-center text-xs text-zinc-600 tracking-wider">
        <p className="font-light">© {new Date().getFullYear()} AURA Luxe. All rights reserved.</p>
        <p className="text-[10px] text-zinc-700 mt-2 font-light">Powered by WebGL, WebAR, & Next.js</p>
      </footer>

      {/* Shopping Cart Drawer */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeCartItem}
      />

      {/* AR Try-On Modal */}
      <AnimatePresence>
        {activeTryOn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6"
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl aspect-[4/3] sm:aspect-[16/9] flex flex-col md:flex-row overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 shadow-2xl"
            >
              {/* Left Column: The Camera Iframe View */}
              <div className="relative flex-1 bg-black aspect-[4/3] md:aspect-auto">
                <iframe
                  ref={iframeRef}
                  src={
                    activeTryOn.arType === 'face'
                      ? `/ar/face-tryon.html?item=${activeTryOn.id}`
                      : `/ar/hand-tryon.html?item=${activeTryOn.id}`
                  }
                  className="h-full w-full border-0"
                  allow="camera; microphone"
                />
              </div>

              {/* Right Column: Dynamic Controller panel */}
              <div className="w-full md:w-80 flex flex-col bg-zinc-900 border-t md:border-t-0 md:border-l border-white/5 text-zinc-100 p-6 justify-between select-none">
                {/* Header */}
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-medium tracking-wide text-zinc-100 font-luxury">
                        {activeTryOn.name}
                      </h3>
                      <p className="text-xs text-amber-400 tracking-wider font-semibold mt-1">
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                          maximumFractionDigits: 0,
                        }).format(activeTryOn.price)}
                      </p>
                    </div>
                    
                    <button
                      onClick={() => setActiveTryOn(null)}
                      className="p-1.5 rounded-full border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all md:absolute md:top-4 md:right-4"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <p className="text-xs font-light leading-5 text-zinc-400">
                    {activeTryOn.description}
                  </p>
                </div>

                {/* Swap Options (Items in same category) */}
                <div className="space-y-3 py-6 border-t border-b border-white/5 my-6">
                  <h4 className="text-[10px] tracking-widest text-zinc-500 uppercase font-semibold">
                    Change {activeTryOn.category}
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {quickSwapItems.map(item => (
                      <button
                        key={item.id}
                        onClick={() => handleArItemSwap(item)}
                        className={`relative aspect-[3/4] rounded-lg overflow-hidden border transition-all duration-300 ${
                          activeTryOn.id === item.id
                            ? 'border-amber-400 ring-1 ring-amber-400'
                            : 'border-white/5 hover:border-white/15'
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover opacity-80"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Instructions & Help */}
                <div className="flex gap-2.5 items-start bg-white/5 p-3.5 rounded-xl border border-white/5">
                  <HelpCircle className="h-4.5 w-4.5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-[10px] leading-4 text-zinc-400">
                    {activeTryOn.arType === 'face'
                      ? 'Ensure your face is well-lit and fully visible in the camera frame.'
                      : 'Place your hand with fingers flat and facing the camera lens.'}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-55 flex items-center justify-center"
          >
            <div className="rounded-full bg-zinc-900 border border-amber-400/30 px-6 py-3.5 text-xs text-amber-200 tracking-wider shadow-xl shadow-black/80 backdrop-blur-md font-medium">
              {toastMessage}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
