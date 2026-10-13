import React from 'react';
import { Eye, Plus, Check } from 'lucide-react';
import { formatINR } from '../data/products';

export default function ProductCard({
  product,
  onViewProduct,
  onQuickAdd,
  isAddedJustNow
}) {
  const defaultSizePrice = product.sizes[product.defaultSize || 'medium'].price;

  return (
    <div className="glass-card group rounded-3xl overflow-hidden flex flex-col justify-between border border-[rgba(245,240,232,0.06)] hover:border-[rgba(198,165,107,0.3)] transition-all duration-500 bg-[rgba(17,16,20,0.7)]">
      {/* Product Image Area */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-black">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Ambient Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,8,9,0.9)] via-transparent to-transparent opacity-80" />

        {/* Occasion Pill */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <span className="card-occasion-badge">
            {product.occasion}
          </span>
        </div>

        {/* Flower Type Pill */}
        <div className="absolute top-3.5 right-3.5 z-10">
          <span className="card-type-badge">
            {product.flowerType}
          </span>
        </div>

        {/* Hover Quick Actions */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-[rgba(8,8,9,0.45)] backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onViewProduct(product)}
            id={`view-btn-${product.id}`}
            aria-label={`View details of ${product.name}`}
            className="p-3 rounded-full bg-[rgba(245,240,232,0.95)] text-black hover:bg-[#C6A56B] hover:text-black transition-all duration-200 transform scale-90 group-hover:scale-100 shadow-xl"
            title="View Details"
          >
            <Eye size={18} />
          </button>

          <button
            onClick={() => onQuickAdd(product)}
            id={`quick-add-btn-${product.id}`}
            aria-label={`Quick add ${product.name} to cart`}
            className={`p-3 rounded-full transition-all duration-200 transform scale-90 group-hover:scale-100 shadow-xl ${
              isAddedJustNow
                ? 'bg-[#2D6A4F] text-white'
                : 'bg-[#B51F3B] hover:bg-[#8a1329] text-white'
            }`}
            title="Quick Add to Cart"
          >
            {isAddedJustNow ? <Check size={18} /> : <Plus size={18} />}
          </button>
        </div>
      </div>

      {/* Card Information */}
      <div className="p-5 md:p-6 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex items-baseline justify-between mb-2">
            <h4 className="font-serif text-xl md:text-2xl text-[#F5F0E8] font-normal group-hover:text-[#C6A56B] transition-colors">
              {product.name}
            </h4>
            <span className="font-mono text-sm md:text-base font-semibold text-[#C6A56B]">
              {formatINR(defaultSizePrice)}
            </span>
          </div>

          <p className="text-xs text-[#AAA4A0] line-clamp-2 font-light leading-relaxed mb-4">
            {product.shortDescription}
          </p>

          <p className="text-[11px] text-[#635E5B] italic font-serif line-clamp-1 mb-5">
            {product.flowerComposition}
          </p>
        </div>

        {/* Bottom Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[rgba(245,240,232,0.06)]">
          <button
            onClick={() => onViewProduct(product)}
            className="w-full py-2 px-3 rounded-xl text-xs uppercase tracking-wider text-[#AAA4A0] hover:text-[#F5F0E8] border border-[rgba(245,240,232,0.1)] hover:border-[rgba(198,165,107,0.4)] transition-colors text-center"
          >
            View Bouquet
          </button>

          <button
            onClick={() => onQuickAdd(product)}
            className={`w-full py-2 px-3 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all text-center flex items-center justify-center gap-1 ${
              isAddedJustNow
                ? 'bg-[#2D6A4F] text-white'
                : 'bg-[rgba(198,165,107,0.15)] hover:bg-[#C6A56B] text-[#C6A56B] hover:text-black border border-[rgba(198,165,107,0.3)]'
            }`}
          >
            {isAddedJustNow ? (
              <>
                <Check size={12} />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus size={12} />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
