import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Calendar, Heart, ShieldCheck, Sparkles, Check, MessageSquare } from 'lucide-react';
import { formatINR } from '../data/products';

export default function ProductModal({
  product,
  onClose,
  onAddToCart
}) {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState(product.defaultSize || 'medium');
  const [quantity, setQuantity] = useState(1);
  const [giftMessage, setGiftMessage] = useState('');
  
  // Calculate default delivery date (Tomorrow)
  const getMinDeliveryDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const getMaxDeliveryDate = () => {
    const future = new Date();
    future.setDate(future.getDate() + 30);
    return future.toISOString().split('T')[0];
  };

  const [deliveryDate, setDeliveryDate] = useState(getMinDeliveryDate());
  const [dateError, setDateError] = useState('');
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);

  const activeSizeInfo = product.sizes[selectedSize];
  const unitPrice = activeSizeInfo.price;
  const totalPrice = unitPrice * quantity;

  const MAX_GIFT_CHARS = 200;

  // Handle Delivery Date Change with Validation
  const handleDateChange = (e) => {
    const val = e.target.value;
    setDeliveryDate(val);
    const selected = new Date(val);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selected <= today) {
      setDateError('Please choose a delivery date starting from tomorrow.');
    } else {
      setDateError('');
    }
  };

  // Add to Cart handler
  const handleAdd = () => {
    if (dateError) return;

    onAddToCart({
      productId: product.id,
      name: product.name,
      occasion: product.occasion,
      image: product.image,
      size: selectedSize,
      sizeName: activeSizeInfo.name,
      unitPrice: unitPrice,
      quantity: quantity,
      giftMessage: giftMessage.trim(),
      deliveryDate: deliveryDate,
      flowerComposition: product.flowerComposition
    });

    setIsAddedSuccess(true);
    setTimeout(() => {
      setIsAddedSuccess(false);
      onClose();
    }, 900);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-[rgba(0,0,0,0.85)] backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative w-full max-w-4xl rounded-3xl luxury-modal-card shadow-2xl overflow-hidden my-auto animate-fadeIn max-h-[90vh] flex flex-col md:flex-row"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          id="close-product-modal-btn"
          aria-label="Close Product Details"
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[rgba(8,8,9,0.7)] hover:bg-[#C6A56B] hover:text-black text-[#AAA4A0] border border-[rgba(255,255,255,0.1)] transition-colors"
        >
          <X size={18} />
        </button>

        {/* Left Column: Visual Showcase */}
        <div className="md:w-1/2 relative bg-black aspect-square md:aspect-auto min-h-[320px] md:min-h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(17,16,20,0.9)] via-transparent to-transparent md:hidden" />
          
          <div className="absolute top-4 left-4 z-10 flex gap-2">
            <span className="card-occasion-badge">
              {product.occasion}
            </span>
            <span className="card-type-badge">
              {product.flowerType}
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#121118] border border-[rgba(198,165,107,0.25)] hidden md:block shadow-xl">
            <p className="text-[11px] uppercase tracking-wider font-semibold text-[#C6A56B] mb-1">
              Botanical Composition
            </p>
            <p className="text-xs text-[#DDD8D0] italic leading-relaxed">
              {product.flowerComposition}
            </p>
          </div>
        </div>

        {/* Right Column: Configuration & Ordering */}
        <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col justify-between luxury-modal-right-col">
          <div>
            {/* Header */}
            <div className="mb-4">
              <h3 className="font-serif text-3xl md:text-4xl text-[#F5F0E8] font-normal mb-1">
                {product.name}
              </h3>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-[#C6A56B] tracking-tight">
                  {formatINR(totalPrice)}
                </span>
                <span className="text-xs text-[#AAA4A0]">
                  ({formatINR(unitPrice)} each)
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="modal-desc-text mb-6">
              {product.fullDescription}
            </p>

            {/* Size Selector */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="modal-section-label">
                  Select Bouquet Size
                </label>
                <span className="text-[11px] text-[#AAA4A0]">
                  {activeSizeInfo.stems}
                </span>
              </div>

              <div className="modal-size-grid">
                {Object.entries(product.sizes).map(([sizeKey, sizeData]) => {
                  const isSelected = selectedSize === sizeKey;
                  return (
                    <button
                      key={sizeKey}
                      type="button"
                      id={`size-btn-${sizeKey}`}
                      onClick={() => setSelectedSize(sizeKey)}
                      className={`modal-size-card ${isSelected ? 'active' : ''}`}
                    >
                      <div className="modal-size-name">{sizeKey}</div>
                      <div className="modal-size-price">
                        {formatINR(sizeData.price)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="modal-qty-container mb-6">
              <span className="modal-section-label">
                Quantity
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  id="qty-minus-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full border border-[rgba(198,165,107,0.3)] flex items-center justify-center hover:border-[#C6A56B] hover:text-[#C6A56B] text-[#AAA4A0] transition-colors"
                >
                  <Minus size={13} />
                </button>
                <span className="font-semibold text-sm w-6 text-center text-[#F5F0E8]">
                  {quantity}
                </span>
                <button
                  type="button"
                  id="qty-plus-btn"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full border border-[rgba(198,165,107,0.3)] flex items-center justify-center hover:border-[#C6A56B] hover:text-[#C6A56B] text-[#AAA4A0] transition-colors"
                >
                  <Plus size={13} />
                </button>
              </div>
            </div>

            {/* Personalized Gift Message */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-1.5">
                <label className="modal-section-label flex items-center gap-1.5">
                  <MessageSquare size={13} />
                  <span>Personalized Gift Card Note</span>
                </label>
                <span className="text-[10px] text-[#AAA4A0]">
                  {giftMessage.length}/{MAX_GIFT_CHARS}
                </span>
              </div>
              <textarea
                id="gift-message-textarea"
                rows="2"
                maxLength={MAX_GIFT_CHARS}
                placeholder="Write a heartfelt note to be handwritten on luxury embossed cardstock..."
                value={giftMessage}
                onChange={(e) => setGiftMessage(e.target.value)}
                className="modal-textarea-input"
              />
            </div>

            {/* Delivery Date Picker */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-1.5">
                <label className="modal-section-label flex items-center gap-1.5">
                  <Calendar size={13} />
                  <span>Desired Delivery Date</span>
                </label>
                <span className="text-[10px] text-[#AAA4A0]">Hand-delivered</span>
              </div>
              <input
                type="date"
                id="delivery-date-input"
                min={getMinDeliveryDate()}
                max={getMaxDeliveryDate()}
                value={deliveryDate}
                onChange={handleDateChange}
                className="modal-date-picker-input"
              />
              {dateError && (
                <p className="text-[11px] text-[#B51F3B] mt-1">{dateError}</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-[rgba(255,255,255,0.06)] flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              id="continue-shopping-btn"
              onClick={onClose}
              className="btn-outline w-full sm:w-1/2 py-3 text-xs"
            >
              Continue Shopping
            </button>

            <button
              type="button"
              id="add-to-cart-modal-btn"
              onClick={handleAdd}
              disabled={Boolean(dateError)}
              className={`w-full sm:w-1/2 py-3 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                isAddedSuccess
                  ? 'bg-[#2D6A4F] text-white'
                  : 'btn-gold'
              }`}
            >
              {isAddedSuccess ? (
                <>
                  <Check size={16} />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <Sparkles size={14} />
                  <span>Add to Cart &bull; {formatINR(totalPrice)}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
