import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Tag, Check, Calendar, Clock, MessageSquare, AlertCircle } from 'lucide-react';
import { formatINR } from '../data/products';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedCheckout
}) {
  if (!isOpen) return null;

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Delivery Date & Slot in Cart
  const getMinDeliveryDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const [cartDeliveryDate, setCartDeliveryDate] = useState(getMinDeliveryDate());
  const [cartDeliverySlot, setCartDeliverySlot] = useState('morning'); // 'morning' | 'evening' | 'midnight'

  const deliverySlots = [
    { id: 'morning', label: 'Morning (9 AM – 1 PM)', icon: '☀️' },
    { id: 'evening', label: 'Evening (4 PM – 8 PM)', icon: '🌙' },
    { id: 'midnight', label: 'Midnight Surprise (11:30 PM)', icon: '✨' }
  ];

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
  const deliveryFee = subtotal === 0 ? 0 : (subtotal >= 2500 ? 0 : 199);

  let discount = 0;
  if (appliedPromo === 'BLOOM10') {
    discount = Math.round(subtotal * 0.10);
  } else if (appliedPromo === 'FIRSTBLOOM') {
    discount = Math.min(300, subtotal);
  }

  const finalTotal = Math.max(0, subtotal + deliveryFee - discount);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const cleanCode = promoCode.trim().toUpperCase();
    if (cleanCode === 'BLOOM10' || cleanCode === 'FIRSTBLOOM') {
      setAppliedPromo(cleanCode);
      setPromoError('');
    } else {
      setPromoError('Invalid coupon. Try BLOOM10 (10% off) or FIRSTBLOOM (₹300 off).');
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCode('');
    setPromoError('');
  };

  return (
    <div 
      className="cart-drawer-overlay"
      role="dialog"
      aria-modal="true"
    >
      {/* Background click to dismiss */}
      <div className="cart-backdrop-click" onClick={onClose} />

      {/* Solid Luxury Drawer (Opaque background, zero crazy bleed) */}
      <div className="cart-drawer-panel">
        {/* Header */}
        <div className="cart-header">
          <div className="cart-header-title-row">
            <ShoppingBag size={20} className="text-gold" />
            <h3 className="cart-title font-serif">
              Your Atelier Cart
            </h3>
            <span className="cart-badge font-mono">
              {cartItems.reduce((acc, i) => acc + i.quantity, 0)} items
            </span>
          </div>

          <button
            onClick={onClose}
            id="close-cart-btn"
            aria-label="Close Cart"
            className="cart-close-btn"
          >
            <X size={18} />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="cart-body-scroll">
          {cartItems.length === 0 ? (
            <div className="cart-empty-state">
              <div className="empty-icon-circle">
                <ShoppingBag size={26} className="text-gold" />
              </div>
              <h4 className="font-serif empty-title">Your cart is empty</h4>
              <p className="empty-desc">
                Discover our hand-sculpted floral creations or build a custom bouquet in our atelier.
              </p>
              <button
                onClick={onClose}
                className="btn-gold text-xs px-6 py-2.5"
              >
                Start Exploring
              </button>
            </div>
          ) : (
            <div className="cart-items-stack">
              {cartItems.map((item, index) => {
                const lineTotal = item.unitPrice * item.quantity;
                return (
                  <div
                    key={`${item.productId}-${item.size}-${index}`}
                    className="cart-item-card"
                  >
                    {/* Fixed Size Thumbnail */}
                    <div className="cart-item-thumb-box">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="cart-item-thumb-img"
                      />
                    </div>

                    {/* Information */}
                    <div className="cart-item-details">
                      <div className="cart-item-top-row">
                        <h5 className="cart-item-name font-serif">
                          {item.name}
                        </h5>
                        <button
                          onClick={() => onRemoveItem(index)}
                          aria-label={`Remove ${item.name}`}
                          className="cart-remove-icon-btn"
                          title="Remove Item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="cart-item-tags-row">
                        <span className="cart-size-pill font-mono">
                          {item.size}
                        </span>
                        <span className="cart-unit-price font-mono">
                          {formatINR(item.unitPrice)} each
                        </span>
                      </div>

                      {/* Gift Note preview if present */}
                      {item.giftMessage && (
                        <div className="cart-gift-note-row">
                          <MessageSquare size={11} className="text-gold flex-shrink-0" />
                          <span className="truncate">"{item.giftMessage}"</span>
                        </div>
                      )}

                      {/* Quantity & Line Total */}
                      <div className="cart-qty-total-row">
                        <div className="cart-stepper">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                            className="cart-stepper-btn"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="cart-stepper-num font-mono">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                            className="cart-stepper-btn"
                            aria-label="Increase quantity"
                          >
                            <Plus size={11} />
                          </button>
                        </div>

                        <span className="cart-line-subtotal font-mono">
                          {formatINR(lineTotal)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Clear Entire Cart Option */}
              <div className="clear-cart-row">
                {showClearConfirm ? (
                  <div className="clear-confirm-bar">
                    <span className="confirm-text">Clear entire cart?</span>
                    <div className="confirm-buttons">
                      <button
                        type="button"
                        onClick={() => {
                          onClearCart();
                          setShowClearConfirm(false);
                        }}
                        className="confirm-yes-btn"
                      >
                        Yes, Clear
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowClearConfirm(false)}
                        className="confirm-cancel-btn"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowClearConfirm(true)}
                    className="clear-cart-link"
                  >
                    <Trash2 size={12} />
                    <span>Clear all items</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Interactive Delivery Date & Time Slot Picker In Cart */}
          {cartItems.length > 0 && (
            <div className="cart-delivery-scheduler-card">
              <div className="scheduler-header">
                <Calendar size={14} className="text-gold" />
                <span className="scheduler-title font-mono">SCHEDULE WHITE-GLOVE DELIVERY</span>
              </div>

              <div className="scheduler-date-row">
                <label className="scheduler-label">Select Delivery Date:</label>
                <input
                  type="date"
                  min={getMinDeliveryDate()}
                  value={cartDeliveryDate}
                  onChange={(e) => setCartDeliveryDate(e.target.value)}
                  className="cart-date-picker-input"
                />
              </div>

              <div className="scheduler-slots-row">
                <label className="scheduler-label">Preferred Time Window:</label>
                <div className="slots-chips-grid">
                  {deliverySlots.map((slot) => (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => setCartDeliverySlot(slot.id)}
                      className={`slot-chip ${cartDeliverySlot === slot.id ? 'active-slot-chip' : ''}`}
                    >
                      <span>{slot.icon}</span>
                      <span>{slot.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer & Calculations */}
        {cartItems.length > 0 && (
          <div className="cart-footer">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="promo-form-row">
              <div className="promo-input-wrapper">
                <Tag size={13} className="promo-icon text-muted" />
                <input
                  type="text"
                  placeholder="Promo Code (e.g. BLOOM10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="promo-input font-mono"
                />
              </div>
              <button
                type="submit"
                className="promo-submit-btn font-mono"
              >
                Apply
              </button>
            </form>

            {appliedPromo && (
              <div className="promo-success-banner">
                <div className="flex items-center gap-1.5">
                  <Check size={13} />
                  <span>Coupon '{appliedPromo}' Applied!</span>
                </div>
                <button type="button" onClick={handleRemovePromo} className="promo-remove-link">
                  Remove
                </button>
              </div>
            )}

            {promoError && (
              <p className="promo-error-text">{promoError}</p>
            )}

            {/* Price Calculations */}
            <div className="cart-calc-table">
              <div className="calc-row">
                <span>Subtotal</span>
                <span className="font-mono text-ivory">{formatINR(subtotal)}</span>
              </div>

              <div className="calc-row">
                <span>Hand Delivery Fee</span>
                <span className="font-mono">
                  {deliveryFee === 0 ? (
                    <span className="free-shipping-badge">COMPLIMENTARY</span>
                  ) : (
                    formatINR(deliveryFee)
                  )}
                </span>
              </div>

              {discount > 0 && (
                <div className="calc-row discount-row">
                  <span>Promo Discount</span>
                  <span className="font-mono">-{formatINR(discount)}</span>
                </div>
              )}

              <div className="calc-total-row">
                <span className="font-serif total-label">Total (INR)</span>
                <span className="font-mono total-amount">{formatINR(finalTotal)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              id="proceed-checkout-btn"
              type="button"
              onClick={() => {
                onProceedCheckout({
                  subtotal,
                  deliveryFee,
                  discount,
                  finalTotal,
                  appliedPromo,
                  deliveryDate: cartDeliveryDate,
                  deliverySlot: cartDeliverySlot
                });
              }}
              className="cart-checkout-btn"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight size={15} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
