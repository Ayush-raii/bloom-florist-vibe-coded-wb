import React, { useState } from 'react';
import { Sparkles, Plus, Minus, Check, Gift, Calendar, ShoppingBag, Palette, Flower } from 'lucide-react';
import { formatINR } from '../data/products';

export const STEM_OPTIONS = [
  {
    id: 'stem-red-rose',
    name: 'Ecuadorian Grand Red Rose',
    price: 180,
    color: '#B51F3B',
    type: 'Focal Bloom',
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'stem-white-peony',
    name: 'Sarah Bernhardt White Peony',
    price: 240,
    color: '#F5F0E8',
    type: 'Focal Bloom',
    image: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'stem-sunflower',
    name: 'French Golden Sunflower',
    price: 150,
    color: '#E0A96D',
    type: 'Focal Bloom',
    image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'stem-casablanca-lily',
    name: 'Casablanca Oriental Lily',
    price: 260,
    color: '#EDE8E1',
    type: 'Fragrant Accent',
    image: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'stem-gypsophila',
    name: 'Million Stars Gypsophila (Cloud)',
    price: 90,
    color: '#FFFFFF',
    type: 'Filler Cloud',
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'stem-eucalyptus',
    name: 'Silver Dollar Eucalyptus',
    price: 90,
    color: '#708272',
    type: 'Greenery',
    image: 'https://images.unsplash.com/photo-1587556930799-8dca6aae3d82?auto=format&fit=crop&w=400&q=80'
  }
];

export const WRAP_OPTIONS = [
  { id: 'wrap-starry-black', name: 'Midnight Starry Black', extra: 250, desc: 'Matte black flecked with fine silver foil' },
  { id: 'wrap-champagne-silk', name: 'Champagne Ivory Silk', extra: 300, desc: 'Lustrous raw silk with woven pearl edges' },
  { id: 'wrap-burgundy-velvet', name: 'Burgundy Velvet Wrap', extra: 350, desc: 'Rich dramatic crimson velvet touch' },
  { id: 'wrap-french-kraft', name: 'French Parisian Kraft', extra: 150, desc: 'Authentic textured organic florist paper' }
];

export const RIBBON_OPTIONS = [
  { id: 'ribbon-gold', name: 'Hand-dyed Gold Satin' },
  { id: 'ribbon-crimson', name: 'Deep Crimson Silk' },
  { id: 'ribbon-ivory', name: 'Ivory Grosgrain Ribbon' }
];

export default function CustomBouquetBuilder({ onAddToCart }) {
  // Stem quantities state: mapping stem id to count
  const [stems, setStems] = useState({
    'stem-red-rose': 6,
    'stem-white-peony': 3,
    'stem-gypsophila': 4,
    'stem-eucalyptus': 3
  });

  const [selectedWrap, setSelectedWrap] = useState('wrap-starry-black');
  const [selectedRibbon, setSelectedRibbon] = useState('ribbon-gold');
  const [customName, setCustomName] = useState('My Bespoke Parisian Bouquet');
  const [customMessage, setCustomMessage] = useState('Crafted with love and handpicked blooms.');
  const [isSuccess, setIsSuccess] = useState(false);

  // Delivery Date
  const getTomorrow = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };
  const [deliveryDate, setDeliveryDate] = useState(getTomorrow());

  // Increment stem count
  const handleStemChange = (id, delta) => {
    setStems((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  // Total stem count and pricing calculation
  const totalStemsCount = Object.values(stems).reduce((a, b) => a + b, 0);
  
  const stemsCost = Object.entries(stems).reduce((sum, [id, count]) => {
    const stemObj = STEM_OPTIONS.find((s) => s.id === id);
    return sum + (stemObj ? stemObj.price * count : 0);
  }, 0);

  const wrapObj = WRAP_OPTIONS.find((w) => w.id === selectedWrap) || WRAP_OPTIONS[0];
  const wrapCost = wrapObj.extra;
  const baseFloristArrangementFee = 450; // base artisan floral conditioning fee
  const totalCustomPrice = stemsCost + wrapCost + baseFloristArrangementFee;

  const handleAddCustomToCart = () => {
    if (totalStemsCount < 5) return;

    // Build composition summary
    const compositionSummary = Object.entries(stems)
      .filter(([_, count]) => count > 0)
      .map(([id, count]) => {
        const item = STEM_OPTIONS.find((s) => s.id === id);
        return `${item.name} (${count} stems)`;
      })
      .join(', ');

    const customCartItem = {
      productId: `custom-bouquet-${Date.now()}`,
      name: customName || 'Bespoke Handcrafted Bouquet',
      occasion: 'Bespoke Atelier',
      image: 'https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?auto=format&fit=crop&w=800&q=80',
      size: `${totalStemsCount} Stems Custom`,
      sizeName: `Wrap: ${wrapObj.name}`,
      unitPrice: totalCustomPrice,
      quantity: 1,
      giftMessage: customMessage.trim(),
      deliveryDate: deliveryDate,
      flowerComposition: compositionSummary
    };

    onAddToCart(customCartItem);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 2000);
  };

  return (
    <section id="builder-section" className="builder-section-container">
      <div className="builder-inner-wrap">
        {/* Section Header */}
        <div className="builder-header-block">
          <div className="builder-badge">
            <Sparkles size={13} className="text-gold" />
            <span>BESPOKE BOTANICAL ATELIER</span>
          </div>

          <h2 className="builder-title font-serif">
            Design Your Custom Bouquet
          </h2>

          <p className="builder-subtitle font-serif italic">
            Hand-select individual stems, artisanal wraps, and finishing ribbons. Our master florists will hand-bind your vision into an bespoke masterpiece.
          </p>
        </div>

        {/* 2-Column Atelier Interface */}
        <div className="builder-grid">
          {/* Left Column: Stem Palette & Customization */}
          <div className="builder-controls-column">
            {/* Step 1: Stem Selector */}
            <div className="builder-step-card">
              <div className="builder-step-header">
                <span className="step-num font-mono">01</span>
                <div>
                  <h3 className="step-title font-serif">Select Your Botanical Stems</h3>
                  <p className="step-desc">Pick your favorite blooms and lush foliage (minimum 5 stems)</p>
                </div>
              </div>

              <div className="stem-selection-list">
                {STEM_OPTIONS.map((stem) => {
                  const currentQty = stems[stem.id] || 0;
                  return (
                    <div key={stem.id} className="stem-row-item">
                      <img src={stem.image} alt={stem.name} className="stem-thumbnail" />

                      <div className="stem-meta">
                        <div className="stem-name-row">
                          <h4 className="stem-name">{stem.name}</h4>
                          <span className="stem-unit-price font-mono">{formatINR(stem.price)}/stem</span>
                        </div>
                        <span className="stem-type-badge font-mono">{stem.type}</span>
                      </div>

                      <div className="stem-counter-controls">
                        <button
                          type="button"
                          onClick={() => handleStemChange(stem.id, -1)}
                          disabled={currentQty === 0}
                          className="counter-btn"
                          aria-label={`Decrease ${stem.name}`}
                        >
                          <Minus size={12} />
                        </button>
                        <span className="counter-val font-mono">{currentQty}</span>
                        <button
                          type="button"
                          onClick={() => handleStemChange(stem.id, 1)}
                          className="counter-btn"
                          aria-label={`Increase ${stem.name}`}
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Wrap & Packaging */}
            <div className="builder-step-card">
              <div className="builder-step-header">
                <span className="step-num font-mono">02</span>
                <div>
                  <h3 className="step-title font-serif">Luxury Wrap & Packaging</h3>
                  <p className="step-desc">Select handcrafted imported wrapping materials</p>
                </div>
              </div>

              <div className="wrap-options-grid">
                {WRAP_OPTIONS.map((w) => (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => setSelectedWrap(w.id)}
                    className={`wrap-choice-card ${selectedWrap === w.id ? 'active-wrap' : ''}`}
                  >
                    <div className="wrap-choice-top">
                      <span className="wrap-name">{w.name}</span>
                      <span className="wrap-extra font-mono">+{formatINR(w.extra)}</span>
                    </div>
                    <p className="wrap-desc">{w.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Ribbon Selection */}
            <div className="builder-step-card">
              <div className="builder-step-header">
                <span className="step-num font-mono">03</span>
                <div>
                  <h3 className="step-title font-serif">Artisanal Ribbon Accent</h3>
                  <p className="step-desc">Secured with Italian bow craftsmanship (Complimentary)</p>
                </div>
              </div>

              <div className="ribbon-choices">
                {RIBBON_OPTIONS.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setSelectedRibbon(r.id)}
                    className={`ribbon-pill ${selectedRibbon === r.id ? 'active-ribbon' : ''}`}
                  >
                    {selectedRibbon === r.id && <Check size={12} className="text-gold" />}
                    <span>{r.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Live Atelier Preview & Checkout Box */}
          <div className="builder-summary-column">
            <div className="builder-live-receipt-card">
              <div className="receipt-header">
                <div className="receipt-badge font-mono">LIVE ATELIER RECIPE</div>
                <h3 className="receipt-title font-serif">Your Bespoke Bouquet</h3>
              </div>

              {/* Bouquet Name Input */}
              <div className="receipt-input-group">
                <label className="receipt-label">Bouquet Dedication / Name</label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="receipt-text-input"
                  placeholder="e.g. For Ananya's Golden Celebration"
                />
              </div>

              {/* Composition Breakdown */}
              <div className="recipe-breakdown">
                <div className="recipe-breakdown-title font-mono">
                  <span>STEM COMPOSITION ({totalStemsCount} STEMS)</span>
                  <span>SUBTOTAL</span>
                </div>

                <div className="recipe-items-list">
                  {Object.entries(stems).map(([id, count]) => {
                    if (count === 0) return null;
                    const stem = STEM_OPTIONS.find((s) => s.id === id);
                    return (
                      <div key={id} className="recipe-row">
                        <span className="recipe-item-name">
                          {stem.name} &times; {count}
                        </span>
                        <span className="recipe-item-price font-mono">
                          {formatINR(stem.price * count)}
                        </span>
                      </div>
                    );
                  })}
                  {totalStemsCount === 0 && (
                    <div className="recipe-empty-note font-serif italic">
                      No stems selected yet. Add blooms from the palette.
                    </div>
                  )}
                </div>

                <div className="recipe-addons">
                  <div className="recipe-row">
                    <span>{wrapObj.name} Wrap</span>
                    <span className="font-mono">{formatINR(wrapObj.extra)}</span>
                  </div>
                  <div className="recipe-row">
                    <span>Atelier Hand-conditioning & Ribbon</span>
                    <span className="font-mono">{formatINR(baseFloristArrangementFee)}</span>
                  </div>
                </div>

                {/* Date Picker In Builder */}
                <div className="receipt-date-box">
                  <label className="receipt-label flex items-center gap-1.5">
                    <Calendar size={13} className="text-gold" />
                    <span>Requested Delivery Date</span>
                  </label>
                  <input
                    type="date"
                    min={getTomorrow()}
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="receipt-date-input"
                  />
                </div>

                {/* Personal Card Note */}
                <div className="receipt-note-box">
                  <label className="receipt-label">Handwritten Note Card</label>
                  <textarea
                    rows="2"
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    placeholder="Write a message to accompany your custom bouquet..."
                    className="receipt-textarea"
                  />
                </div>

                {/* Total Price */}
                <div className="receipt-total-row">
                  <div>
                    <span className="receipt-total-label font-serif">Bespoke Total</span>
                    <span className="receipt-stem-count font-mono">{totalStemsCount} Luxury Stems</span>
                  </div>
                  <div className="receipt-total-price font-mono">
                    {formatINR(totalCustomPrice)}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  type="button"
                  id="add-custom-bouquet-btn"
                  onClick={handleAddCustomToCart}
                  disabled={totalStemsCount < 5}
                  className={`builder-add-btn ${isSuccess ? 'builder-success-btn' : ''}`}
                >
                  {isSuccess ? (
                    <>
                      <Check size={16} />
                      <span>Custom Creation Added to Cart!</span>
                    </>
                  ) : totalStemsCount < 5 ? (
                    <span>Add at least {5 - totalStemsCount} more stems</span>
                  ) : (
                    <>
                      <ShoppingBag size={15} />
                      <span>Add Bespoke Creation &bull; {formatINR(totalCustomPrice)}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
