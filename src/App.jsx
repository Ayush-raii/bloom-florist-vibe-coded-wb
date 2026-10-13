import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import ScrollFrameHero from './components/ScrollFrameHero';
import ThreeRosesSection from './components/ThreeRosesSection';
import BouquetCatalog from './components/BouquetCatalog';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import BrandStory from './components/BrandStory';
import CustomBouquetBuilder from './components/CustomBouquetBuilder';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import LegalModal from './components/LegalModal';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  // Persisted cart state
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('bloom_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Active occasion state: null means entire catalogue, or 'birthday' | 'anniversary' | 'wedding'
  const [activeOccasion, setActiveOccasion] = useState(null);

  // Modals & Drawers state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutTotals, setCheckoutTotals] = useState({
    subtotal: 0,
    deliveryFee: 0,
    discount: 0,
    finalTotal: 0,
    appliedPromo: null
  });
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [legalModal, setLegalModal] = useState({ isOpen: false, type: 'privacy' });

  // Micro-feedback states
  const [recentlyAddedId, setRecentlyAddedId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Persist cart whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('bloom_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Could not persist cart to localStorage', e);
    }
  }, [cartItems]);

  // Toast helper
  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  }, []);

  // Keyboard Escape listener to close modals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedProduct(null);
        setIsCartOpen(false);
        setIsCheckoutOpen(false);
        setIsContactOpen(false);
        setLegalModal({ isOpen: false, type: 'privacy' });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Total items in cart
  const totalCartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  // Navigation handlers
  const handleNavigateHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreOccasions = () => {
    const el = document.getElementById('occasions-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectOccasion = (occasionId) => {
    setActiveOccasion(occasionId);
    if (occasionId) {
      const el = document.getElementById('catalog-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      handleExploreOccasions();
    }
  };

  const handleNavigateCatalog = () => {
    setActiveOccasion(null);
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateStory = () => {
    const el = document.getElementById('story-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateBuilder = () => {
    const el = document.getElementById('builder-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Cart Operations
  const handleAddToCart = (item) => {
    setCartItems((prev) => {
      // Find matching item with exact size and personalized message
      const existingIdx = prev.findIndex(
        (i) => i.productId === item.productId && 
               i.size === item.size && 
               i.giftMessage === item.giftMessage && 
               i.deliveryDate === item.deliveryDate
      );

      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx].quantity += item.quantity;
        return updated;
      }
      return [...prev, item];
    });

    showToast(`Added "${item.name}" (${item.size}) to your atelier cart`);
  };

  const handleQuickAdd = (product) => {
    const defaultSize = product.defaultSize || 'medium';
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const quickItem = {
      productId: product.id,
      name: product.name,
      occasion: product.occasion,
      image: product.image,
      size: defaultSize,
      sizeName: product.sizes[defaultSize].name,
      unitPrice: product.sizes[defaultSize].price,
      quantity: 1,
      giftMessage: '',
      deliveryDate: tomorrow.toISOString().split('T')[0],
      flowerComposition: product.flowerComposition
    };

    handleAddToCart(quickItem);
    setRecentlyAddedId(product.id);
    setTimeout(() => {
      setRecentlyAddedId((prev) => (prev === product.id ? null : prev));
    }, 1200);
  };

  const handleUpdateQuantity = (index, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveItem = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
    showToast('Item removed from cart');
  };

  const handleClearCart = () => {
    setCartItems([]);
    showToast('Your cart has been cleared');
  };

  const handleProceedCheckout = (totals) => {
    setCheckoutTotals(totals);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = () => {
    setCartItems([]);
    showToast('Demo Order Confirmed! Receipt generated.');
  };

  return (
    <div className="relative min-h-screen bg-[#080809] text-[#F5F0E8] overflow-x-hidden font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div 
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-5 py-3 rounded-full bg-[rgba(17,16,20,0.95)] border border-[rgba(198,165,107,0.4)] shadow-2xl backdrop-blur-xl animate-fadeIn"
          role="status"
        >
          <CheckCircle2 size={16} className="text-[#4ADE80]" />
          <span className="text-xs font-medium text-[#F5F0E8]">{toastMessage}</span>
        </div>
      )}

      {/* Global Navigation Bar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigateHome={handleNavigateHome}
        onNavigateOccasion={handleSelectOccasion}
        onNavigateCatalog={handleNavigateCatalog}
        onNavigateStory={handleNavigateStory}
        onNavigateBuilder={handleNavigateBuilder}
        onOpenContact={() => setIsContactOpen(true)}
        activeOccasion={activeOccasion}
        onSkipIntro={handleExploreOccasions}
      />

      {/* 1. Scroll-Controlled 100-Frame Animation Section */}
      <ScrollFrameHero
        onExploreOccasions={handleExploreOccasions}
        onSelectOccasion={handleSelectOccasion}
      />

      {/* 2. End of Frame 100: Three Interactive Roses Selection Section */}
      <ThreeRosesSection
        onSelectOccasion={handleSelectOccasion}
        activeOccasion={activeOccasion}
      />

      {/* 3. Occasion Bouquet Collections & Product Cards */}
      <BouquetCatalog
        activeOccasion={activeOccasion}
        onSelectOccasion={handleSelectOccasion}
        onViewProduct={(prod) => setSelectedProduct(prod)}
        onQuickAdd={handleQuickAdd}
        recentlyAddedId={recentlyAddedId}
      />

      {/* 4. Bespoke Custom Bouquet Builder Atelier */}
      <CustomBouquetBuilder onAddToCart={handleAddToCart} />

      {/* 5. Brand Story Section */}
      <BrandStory onExploreOccasions={handleExploreOccasions} />

      {/* 6. Luxury Footer */}
      <Footer
        onNavigateHome={handleNavigateHome}
        onNavigateOccasion={handleSelectOccasion}
        onNavigateCatalog={handleNavigateCatalog}
        onNavigateStory={handleNavigateStory}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenLegal={(type) => setLegalModal({ isOpen: true, type })}
      />

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onProceedCheckout={handleProceedCheckout}
      />

      {/* Checkout & Demo Confirmation Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        orderTotals={checkoutTotals}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Concierge Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Legal & Privacy Modal */}
      <LegalModal
        isOpen={legalModal.isOpen}
        type={legalModal.type}
        onClose={() => setLegalModal({ isOpen: false, type: 'privacy' })}
      />
    </div>
  );
}
