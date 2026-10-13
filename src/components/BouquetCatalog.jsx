import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, RotateCcw, ArrowLeft, Sparkles, Filter } from 'lucide-react';
import { PRODUCTS, OCCASIONS, FLOWER_TYPES } from '../data/products';
import ProductCard from './ProductCard';

export default function BouquetCatalog({
  activeOccasion,
  onSelectOccasion,
  onViewProduct,
  onQuickAdd,
  recentlyAddedId
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFlowerType, setSelectedFlowerType] = useState('All');
  const [selectedSizeFilter, setSelectedSizeFilter] = useState('All');
  const [priceRange, setPriceRange] = useState(10000);
  const [sortBy, setSortBy] = useState('featured');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Active occasion configuration (or 'All' if browsing entire catalogue)
  const currentOccasionConfig = activeOccasion ? OCCASIONS[activeOccasion] : null;

  // Filter and sort product items
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Occasion filter (if an occasion is actively selected)
      if (activeOccasion && item.occasion !== activeOccasion) {
        return false;
      }

      // Search term filter
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.shortDescription.toLowerCase().includes(query);
        const matchesComp = item.flowerComposition.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesComp) return false;
      }

      // Flower type filter
      if (selectedFlowerType !== 'All' && item.flowerType !== selectedFlowerType) {
        return false;
      }

      // Max Price filter based on default medium size
      const defaultPrice = item.sizes[item.defaultSize || 'medium'].price;
      if (defaultPrice > priceRange) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = a.sizes[a.defaultSize || 'medium'].price;
      const priceB = b.sizes[b.defaultSize || 'medium'].price;

      if (sortBy === 'price-low') return priceA - priceB;
      if (sortBy === 'price-high') return priceB - priceA;
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      return 0; // default featured order
    });
  }, [activeOccasion, searchTerm, selectedFlowerType, priceRange, sortBy]);

  // Reset all filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedFlowerType('All');
    setSelectedSizeFilter('All');
    setPriceRange(10000);
    setSortBy('featured');
  };

  return (
    <section 
      id="catalog-section"
      className="relative min-h-screen w-full bg-[#080809] pt-24 pb-28 px-4 md:px-8"
      style={{
        background: currentOccasionConfig ? currentOccasionConfig.themeBg : '#080809'
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Occasion Header Banner */}
        <div className="relative mb-12 text-center max-w-3xl mx-auto">
          {/* Back to Three-Rose Selector Navigation */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <button
              onClick={() => onSelectOccasion(null)}
              id="back-to-occasions-btn"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#AAA4A0] hover:text-[#C6A56B] px-4 py-1.5 rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(17,16,20,0.6)] backdrop-blur-md transition-colors"
            >
              <ArrowLeft size={13} />
              <span>Back to Occasion Selector</span>
            </button>
          </div>

          {/* Occasion Badge */}
          <span className="text-[11px] uppercase tracking-[0.3em] font-mono font-medium text-[#C6A56B] block mb-2">
            {currentOccasionConfig ? currentOccasionConfig.badge : 'Haute Florist Atelier'}
          </span>

          <h2 className="font-serif text-4xl md:text-6xl text-[#F5F0E8] font-normal tracking-tight mb-3">
            {currentOccasionConfig ? currentOccasionConfig.heading : 'OUR FLORAL COLLECTIONS'}
          </h2>

          <p className="font-serif italic text-base md:text-xl text-[#AAA4A0] max-w-xl mx-auto mb-6">
            {currentOccasionConfig 
              ? currentOccasionConfig.subtitle 
              : 'Hand-sculpted botanical couture for life’s most precious moments.'}
          </p>

          {/* Occasion Switcher Tabs */}
          <div className="inline-flex p-1.5 rounded-full bg-[rgba(17,16,20,0.7)] border border-[rgba(198,165,107,0.2)] backdrop-blur-md flex-wrap justify-center gap-1">
            <button
              onClick={() => onSelectOccasion(null)}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all ${
                activeOccasion === null 
                  ? 'bg-[rgba(198,165,107,0.2)] text-[#C6A56B] font-semibold border border-[rgba(198,165,107,0.3)]' 
                  : 'text-[#AAA4A0] hover:text-white'
              }`}
            >
              All Bouquets
            </button>
            <button
              onClick={() => onSelectOccasion('birthday')}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all ${
                activeOccasion === 'birthday' 
                  ? 'bg-[rgba(198,165,107,0.25)] text-[#C6A56B] font-semibold border border-[#C6A56B]' 
                  : 'text-[#AAA4A0] hover:text-white'
              }`}
            >
              Birthday
            </button>
            <button
              onClick={() => onSelectOccasion('anniversary')}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all ${
                activeOccasion === 'anniversary' 
                  ? 'bg-[rgba(181,31,59,0.3)] text-[#F5F0E8] font-semibold border border-[#B51F3B]' 
                  : 'text-[#AAA4A0] hover:text-white'
              }`}
            >
              Anniversary
            </button>
            <button
              onClick={() => onSelectOccasion('wedding')}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all ${
                activeOccasion === 'wedding' 
                  ? 'bg-[rgba(230,215,195,0.25)] text-[#E6D7C3] font-semibold border border-[#E6D7C3]' 
                  : 'text-[#AAA4A0] hover:text-white'
              }`}
            >
              Wedding
            </button>
          </div>
        </div>

        {/* Filter and Search Control Bar */}
        <div className="catalog-filter-bar mb-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-4 relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C6A56B]" />
              <input
                type="text"
                id="search-bouquets-input"
                placeholder="Search bouquets or flowers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="catalog-search-input"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#C6A56B] hover:text-white px-2 py-0.5 rounded-full bg-[rgba(198,165,107,0.15)]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Flower Type Filter */}
            <div className="md:col-span-3">
              <select
                id="flower-type-select"
                value={selectedFlowerType}
                onChange={(e) => setSelectedFlowerType(e.target.value)}
                aria-label="Filter by Flower Type"
                className="catalog-select-input"
              >
                {FLOWER_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type === 'All' ? 'All Flower Types' : `${type}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="md:col-span-3">
              <select
                id="sort-bouquets-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort Bouquets"
                className="catalog-select-input"
              >
                <option value="featured">Sort: Featured Curations</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>

            {/* Clear Filters Button */}
            <div className="md:col-span-2 flex justify-end">
              <button
                id="clear-filters-btn"
                onClick={handleClearFilters}
                className="catalog-reset-btn w-full md:w-auto"
              >
                <RotateCcw size={12} />
                <span>Reset Filters</span>
              </button>
            </div>
          </div>

          {/* Quick Price Slider Bar */}
          <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.08)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-xs text-[#DDD8D0] whitespace-nowrap font-medium">Max Price:</span>
              <input
                type="range"
                min="2000"
                max="8500"
                step="200"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full sm:w-48 cursor-pointer"
              />
              <span className="text-xs text-[#C6A56B] font-semibold tracking-wide">₹{priceRange.toLocaleString('en-IN')}</span>
            </div>

            <span className="text-xs text-[#DDD8D0]">
              Showing <span className="text-[#C6A56B] font-semibold">{filteredProducts.length}</span> Bouquets
            </span>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewProduct={onViewProduct}
                onQuickAdd={onQuickAdd}
                isAddedJustNow={recentlyAddedId === product.id}
              />
            ))}
          </div>
        ) : (
          /* Empty Search / Filter State */
          <div className="py-20 text-center glass-card rounded-3xl p-8 max-w-md mx-auto border border-[rgba(245,240,232,0.1)]">
            <div className="w-16 h-16 rounded-full bg-[rgba(198,165,107,0.1)] border border-[rgba(198,165,107,0.2)] flex items-center justify-center mx-auto mb-4 text-[#C6A56B]">
              <Sparkles size={24} />
            </div>
            <h3 className="font-serif text-2xl text-[#F5F0E8] mb-2">No Bouquets Found</h3>
            <p className="text-xs text-[#AAA4A0] mb-6">
              No floral creations match your current filters. Try searching with a different keyword or resetting your price range.
            </p>
            <button
              onClick={handleClearFilters}
              className="btn-gold text-xs px-6 py-2.5"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
