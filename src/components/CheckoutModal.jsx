import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, ArrowLeft, Sparkles, CreditCard, Banknote, Calendar, PackageCheck, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatINR } from '../data/products';

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  orderTotals,
  onOrderSuccess
}) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    streetAddress: '',
    city: '',
    state: 'Maharashtra',
    pincode: '',
    deliveryInstructions: '',
    paymentMethod: 'online_demo' // 'cod_demo' | 'online_demo'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  const indianStates = [
    'Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'West Bengal',
    'Telangana', 'Gujarat', 'Uttar Pradesh', 'Rajasthan', 'Kerala',
    'Punjab', 'Haryana', 'Goa', 'Madhya Pradesh'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please provide a valid email format';
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    const cleanPhone = formData.phone.replace(/[\s-+]/g, '');
    if (!cleanPhone) {
      newErrors.phone = '10-digit mobile number is required';
    } else if (!phoneRegex.test(cleanPhone)) {
      newErrors.phone = 'Enter valid 10-digit Indian phone (starts with 6, 7, 8, or 9)';
    }

    if (!formData.streetAddress.trim()) {
      newErrors.streetAddress = 'Street address is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    const pinRegex = /^[1-9][0-9]{5}$/;
    if (!formData.pincode.trim()) {
      newErrors.pincode = '6-digit PIN code is required';
    } else if (!pinRegex.test(formData.pincode)) {
      newErrors.pincode = 'Enter valid 6-digit Indian PIN code (e.g. 400001)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate luxury order submission
    setTimeout(() => {
      const orderRef = `BLM-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
      
      const orderData = {
        orderId: orderRef,
        createdAt: new Date().toISOString(),
        customer: { ...formData },
        items: [...cartItems],
        totals: { ...orderTotals },
        paymentMethod: formData.paymentMethod === 'online_demo' ? 'Online Demo Payment' : 'Cash on Delivery (Demo)'
      };

      // Persist to local order history
      try {
        const pastOrders = JSON.parse(localStorage.getItem('bloom_demo_orders') || '[]');
        pastOrders.unshift(orderData);
        localStorage.setItem('bloom_demo_orders', JSON.stringify(pastOrders));
      } catch (err) {
        console.warn('Could not save to localStorage', err);
      }

      setCompletedOrder(orderData);
      setIsSubmitting(false);

      // Trigger Celebration Confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C6A56B', '#B51F3B', '#F5F0E8']
      });

      // Clear the shopping cart
      onOrderSuccess();
    }, 1200);
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-[rgba(0,0,0,0.85)] backdrop-blur-md flex items-center justify-center p-4 md:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-4xl luxury-modal-card rounded-3xl shadow-2xl overflow-hidden my-auto animate-fadeIn max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[rgba(245,240,232,0.08)] flex items-center justify-between bg-[rgba(8,8,9,0.5)]">
          <div className="flex items-center gap-3">
            <span className="font-serif text-2xl text-[#F5F0E8]">
              {completedOrder ? 'Order Confirmation' : 'Checkout & Atelier Delivery'}
            </span>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[rgba(198,165,107,0.2)] text-[#C6A56B] border border-[rgba(198,165,107,0.3)]">
              Demo Checkout
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Checkout"
            className="p-2 rounded-full hover:bg-[rgba(255,255,255,0.06)] text-[#AAA4A0] hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 overflow-y-auto flex-grow">
          {completedOrder ? (
            /* ================= ORDER CONFIRMATION VIEW ================= */
            <div className="text-center max-w-2xl mx-auto py-6 space-y-6">
              <div className="w-20 h-20 rounded-full bg-[rgba(45,106,79,0.2)] border-2 border-[#2D6A4F] flex items-center justify-center mx-auto text-[#4ADE80] animate-bounce">
                <CheckCircle size={40} />
              </div>

              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-[#C6A56B] font-mono block mb-1">
                  ORDER PLACED SUCCESSFULLY
                </span>
                <h3 className="font-serif text-3xl md:text-4xl text-[#F5F0E8] font-normal mb-2">
                  Thank You, {completedOrder.customer.fullName}!
                </h3>
                <p className="text-xs text-[#AAA4A0] max-w-md mx-auto">
                  Your floral creation is now being hand-crafted with fresh blooms by our master florists.
                </p>
              </div>

              {/* Order Reference Box */}
              <div className="p-4 rounded-2xl bg-[rgba(8,8,9,0.7)] border border-[rgba(198,165,107,0.3)] max-w-md mx-auto text-center">
                <span className="text-[10px] uppercase font-mono text-[#AAA4A0] block">
                  Order Reference
                </span>
                <span className="font-mono text-xl text-[#C6A56B] font-bold tracking-wider">
                  {completedOrder.orderId}
                </span>
              </div>

              {/* Order Details Summary */}
              <div className="text-left bg-[rgba(8,8,9,0.5)] p-5 rounded-2xl border border-[rgba(255,255,255,0.06)] space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#C6A56B] border-b border-[rgba(255,255,255,0.06)] pb-2">
                  Delivery Destination
                </h4>
                <div className="text-xs text-[#AAA4A0] space-y-1">
                  <p className="text-[#F5F0E8] font-medium">{completedOrder.customer.fullName} &bull; {completedOrder.customer.phone}</p>
                  <p>{completedOrder.customer.streetAddress}, {completedOrder.customer.city}</p>
                  <p>{completedOrder.customer.state} - {completedOrder.customer.pincode}</p>
                  {completedOrder.customer.deliveryInstructions && (
                    <p className="italic text-[#635E5B]">Note: "{completedOrder.customer.deliveryInstructions}"</p>
                  )}
                </div>

                <h4 className="text-xs font-mono uppercase tracking-wider text-[#C6A56B] border-b border-[rgba(255,255,255,0.06)] pb-2 pt-2">
                  Bouquets in this Order ({completedOrder.items.length})
                </h4>
                <div className="space-y-3">
                  {completedOrder.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-3">
                        <img src={it.image} alt="" className="w-10 h-10 rounded-lg object-cover bg-black" />
                        <div>
                          <p className="text-[#F5F0E8] font-serif text-sm">{it.name} <span className="text-[10px] text-[#C6A56B]">({it.size})</span></p>
                          <p className="text-[#AAA4A0] text-[11px]">Qty: {it.quantity} &bull; Delivery: {it.deliveryDate}</p>
                        </div>
                      </div>
                      <span className="font-mono text-[#F5F0E8]">{formatINR(it.unitPrice * it.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[rgba(255,255,255,0.08)] pt-3 flex justify-between text-sm font-semibold text-[#F5F0E8]">
                  <span>Total Paid ({completedOrder.paymentMethod})</span>
                  <span className="font-mono text-base text-[#C6A56B]">{formatINR(completedOrder.totals.finalTotal)}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  id="order-continue-shopping-btn"
                  onClick={onClose}
                  className="btn-gold px-8 py-3 text-xs tracking-wider"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            /* ================= CHECKOUT FORM VIEW ================= */
            <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Delivery & Payment Details */}
              <div className="lg:col-span-7 space-y-5">
                <div className="p-3 rounded-2xl bg-[rgba(198,165,107,0.1)] border border-[rgba(198,165,107,0.25)] flex items-start gap-2.5 text-xs text-[#C6A56B]">
                  <ShieldCheck size={16} className="flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Simulated Demo Environment:</strong> No real bank transactions or card details are requested. You can safely complete this demo purchase.
                  </span>
                </div>

                <h4 className="text-xs uppercase font-mono tracking-wider text-[#C6A56B]">
                  Customer & Delivery Information
                </h4>

                {/* Full Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] text-[#AAA4A0] block mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      id="checkout-fullname"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Radhika Sharma"
                      className={`w-full bg-[rgba(8,8,9,0.7)] border rounded-xl px-3.5 py-2.5 text-xs text-[#F5F0E8] focus:outline-none ${
                        errors.fullName ? 'border-[#B51F3B]' : 'border-[rgba(255,255,255,0.1)] focus:border-[#C6A56B]'
                      }`}
                    />
                    {errors.fullName && <p className="text-[10px] text-[#B51F3B] mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="text-[11px] text-[#AAA4A0] block mb-1">Mobile Phone (10 digits) *</label>
                    <input
                      type="tel"
                      name="phone"
                      id="checkout-phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. 9820123456"
                      className={`w-full bg-[rgba(8,8,9,0.7)] border rounded-xl px-3.5 py-2.5 text-xs text-[#F5F0E8] focus:outline-none ${
                        errors.phone ? 'border-[#B51F3B]' : 'border-[rgba(255,255,255,0.1)] focus:border-[#C6A56B]'
                      }`}
                    />
                    {errors.phone && <p className="text-[10px] text-[#B51F3B] mt-1">{errors.phone}</p>}
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="text-[11px] text-[#AAA4A0] block mb-1">Email Address (for order receipt) *</label>
                  <input
                    type="email"
                    name="email"
                    id="checkout-email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. radhika@example.com"
                    className={`w-full bg-[rgba(8,8,9,0.7)] border rounded-xl px-3.5 py-2.5 text-xs text-[#F5F0E8] focus:outline-none ${
                      errors.email ? 'border-[#B51F3B]' : 'border-[rgba(255,255,255,0.1)] focus:border-[#C6A56B]'
                    }`}
                  />
                  {errors.email && <p className="text-[10px] text-[#B51F3B] mt-1">{errors.email}</p>}
                </div>

                {/* Street Address */}
                <div>
                  <label className="text-[11px] text-[#AAA4A0] block mb-1">Street Address / Apartment *</label>
                  <input
                    type="text"
                    name="streetAddress"
                    id="checkout-address"
                    value={formData.streetAddress}
                    onChange={handleInputChange}
                    placeholder="Flat 402, Lotus Towers, Nariman Point"
                    className={`w-full bg-[rgba(8,8,9,0.7)] border rounded-xl px-3.5 py-2.5 text-xs text-[#F5F0E8] focus:outline-none ${
                      errors.streetAddress ? 'border-[#B51F3B]' : 'border-[rgba(255,255,255,0.1)] focus:border-[#C6A56B]'
                    }`}
                  />
                  {errors.streetAddress && <p className="text-[10px] text-[#B51F3B] mt-1">{errors.streetAddress}</p>}
                </div>

                {/* City, State, PIN */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[11px] text-[#AAA4A0] block mb-1">City *</label>
                    <input
                      type="text"
                      name="city"
                      id="checkout-city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g. Mumbai"
                      className={`w-full bg-[rgba(8,8,9,0.7)] border rounded-xl px-3.5 py-2.5 text-xs text-[#F5F0E8] focus:outline-none ${
                        errors.city ? 'border-[#B51F3B]' : 'border-[rgba(255,255,255,0.1)] focus:border-[#C6A56B]'
                      }`}
                    />
                    {errors.city && <p className="text-[10px] text-[#B51F3B] mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="text-[11px] text-[#AAA4A0] block mb-1">State *</label>
                    <select
                      name="state"
                      id="checkout-state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full bg-[rgba(8,8,9,0.7)] border border-[rgba(255,255,255,0.1)] rounded-xl px-3.5 py-2.5 text-xs text-[#F5F0E8] focus:outline-none focus:border-[#C6A56B]"
                    >
                      {indianStates.map((st) => (
                        <option key={st} value={st} className="bg-[#111014]">{st}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] text-[#AAA4A0] block mb-1">PIN Code (6 digits) *</label>
                    <input
                      type="text"
                      name="pincode"
                      id="checkout-pincode"
                      maxLength="6"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="e.g. 400021"
                      className={`w-full bg-[rgba(8,8,9,0.7)] border rounded-xl px-3.5 py-2.5 text-xs text-[#F5F0E8] focus:outline-none ${
                        errors.pincode ? 'border-[#B51F3B]' : 'border-[rgba(255,255,255,0.1)] focus:border-[#C6A56B]'
                      }`}
                    />
                    {errors.pincode && <p className="text-[10px] text-[#B51F3B] mt-1">{errors.pincode}</p>}
                  </div>
                </div>

                {/* Delivery Instructions */}
                <div>
                  <label className="text-[11px] text-[#AAA4A0] block mb-1">Delivery Instructions (Optional)</label>
                  <input
                    type="text"
                    name="deliveryInstructions"
                    id="checkout-instructions"
                    value={formData.deliveryInstructions}
                    onChange={handleInputChange}
                    placeholder="Ring bell twice / Leave with reception"
                    className="w-full bg-[rgba(8,8,9,0.7)] border border-[rgba(255,255,255,0.1)] rounded-xl px-3.5 py-2.5 text-xs text-[#F5F0E8] focus:outline-none focus:border-[#C6A56B]"
                  />
                </div>

                {/* Payment Selection */}
                <div className="pt-2">
                  <h4 className="text-xs uppercase font-mono tracking-wider text-[#C6A56B] mb-2">
                    Payment Selection (Demo)
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className={`p-3 rounded-2xl border cursor-pointer flex items-center gap-3 transition-all ${
                      formData.paymentMethod === 'online_demo'
                        ? 'border-[#C6A56B] bg-[rgba(198,165,107,0.15)] text-[#F5F0E8]'
                        : 'border-[rgba(255,255,255,0.08)] bg-[rgba(8,8,9,0.5)] text-[#AAA4A0]'
                    }`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="online_demo"
                        checked={formData.paymentMethod === 'online_demo'}
                        onChange={handleInputChange}
                        className="accent-[#C6A56B]"
                      />
                      <CreditCard size={16} className="text-[#C6A56B]" />
                      <div className="text-xs">
                        <div className="font-semibold">Online Demo</div>
                        <div className="text-[10px] text-[#AAA4A0]">Simulated Card/UPI</div>
                      </div>
                    </label>

                    <label className={`p-3 rounded-2xl border cursor-pointer flex items-center gap-3 transition-all ${
                      formData.paymentMethod === 'cod_demo'
                        ? 'border-[#C6A56B] bg-[rgba(198,165,107,0.15)] text-[#F5F0E8]'
                        : 'border-[rgba(255,255,255,0.08)] bg-[rgba(8,8,9,0.5)] text-[#AAA4A0]'
                    }`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod_demo"
                        checked={formData.paymentMethod === 'cod_demo'}
                        onChange={handleInputChange}
                        className="accent-[#C6A56B]"
                      />
                      <Banknote size={16} className="text-[#C6A56B]" />
                      <div className="text-xs">
                        <div className="font-semibold">Cash on Delivery</div>
                        <div className="text-[10px] text-[#AAA4A0]">Demo COD</div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column: Order Summary Review */}
              <div className="lg:col-span-5 bg-[rgba(8,8,9,0.7)] p-6 rounded-3xl border border-[rgba(255,255,255,0.06)] flex flex-col justify-between">
                <div>
                  <h4 className="font-serif text-xl text-[#F5F0E8] font-normal mb-4">
                    Order Summary
                  </h4>

                  <div className="space-y-3 max-h-56 overflow-y-auto pr-1 mb-4">
                    {cartItems.map((item, i) => (
                      <div key={i} className="flex justify-between items-center text-xs pb-2 border-b border-[rgba(255,255,255,0.04)]">
                        <div className="flex items-center gap-2">
                          <img src={item.image} alt="" className="w-8 h-8 rounded-lg object-cover bg-black" />
                          <div>
                            <p className="text-[#F5F0E8] font-medium leading-tight">{item.name}</p>
                            <p className="text-[10px] text-[#AAA4A0]">
                              {item.size} &times; {item.quantity}
                            </p>
                          </div>
                        </div>
                        <span className="font-mono text-[#F5F0E8]">
                          {formatINR(item.unitPrice * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Calculations */}
                  <div className="space-y-2 text-xs text-[#AAA4A0] border-t border-[rgba(255,255,255,0.06)] pt-3">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-mono text-[#F5F0E8]">{formatINR(orderTotals.subtotal)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span className="font-mono text-[#F5F0E8]">
                        {orderTotals.deliveryFee === 0 ? 'COMPLIMENTARY' : formatINR(orderTotals.deliveryFee)}
                      </span>
                    </div>

                    {orderTotals.discount > 0 && (
                      <div className="flex justify-between text-[#4ADE80]">
                        <span>Promo Discount ({orderTotals.appliedPromo})</span>
                        <span className="font-mono">-{formatINR(orderTotals.discount)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-base font-semibold text-[#F5F0E8] pt-2 border-t border-[rgba(255,255,255,0.06)]">
                      <span className="font-serif">Final Amount</span>
                      <span className="font-mono text-xl text-[#C6A56B]">{formatINR(orderTotals.finalTotal)}</span>
                    </div>
                  </div>
                </div>

                {/* Submit Order Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    id="submit-demo-order-btn"
                    disabled={isSubmitting}
                    className="btn-gold w-full py-3.5 text-xs tracking-widest flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Placing Demo Order...</span>
                    ) : (
                      <>
                        <Sparkles size={14} />
                        <span>CONFIRM DEMO ORDER &bull; {formatINR(orderTotals.finalTotal)}</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-center text-[#635E5B] mt-2">
                    Simulated transaction &middot; No real charges apply
                  </p>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
