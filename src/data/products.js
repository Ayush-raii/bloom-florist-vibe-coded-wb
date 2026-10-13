export const OCCASIONS = {
  birthday: {
    id: 'birthday',
    name: 'Birthday',
    heading: 'BIRTHDAY BLOOMS',
    subtitle: 'A little surprise. A lot of happiness.',
    badge: 'Celebration Collection',
    image: '/occasions/birthday.jpg',
    accentColor: '#D4A373',
    themeBg: 'linear-gradient(180deg, rgba(74, 7, 21, 0.25) 0%, rgba(8, 8, 9, 0.95) 100%)',
    description: 'Radiant petals, joyful palettes, and cheerful bouquets crafted to make birthdays genuinely unforgettable.'
  },
  anniversary: {
    id: 'anniversary',
    name: 'Anniversary',
    heading: 'LOVE, IN FULL BLOOM',
    subtitle: 'Celebrate every chapter of your story.',
    badge: 'Romance Collection',
    image: '/occasions/anniversary.jpg',
    accentColor: '#B51F3B',
    themeBg: 'linear-gradient(180deg, rgba(181, 31, 59, 0.2) 0%, rgba(8, 8, 9, 0.95) 100%)',
    description: 'Deep velvety crimsons, intoxicating fragrances, and dramatic romantic arrangements that honor eternal vows.'
  },
  wedding: {
    id: 'wedding',
    name: 'Wedding',
    heading: 'FOREVER BEGINS HERE',
    subtitle: 'Flowers for your once-in-a-lifetime moments.',
    badge: 'Bridal & Couture Collection',
    image: '/occasions/wedding.jpg',
    accentColor: '#C6A56B',
    themeBg: 'linear-gradient(180deg, rgba(198, 165, 107, 0.18) 0%, rgba(8, 8, 9, 0.95) 100%)',
    description: 'Timeless ivory blooms, ethereal champagne cascades, and heirloom bridal stems celebrating the dawn of forever.'
  }
};

export const PRODUCTS = [
  // ================= BIRTHDAY BLOOMS =================
  {
    id: 'bday-sunshine',
    occasion: 'birthday',
    name: 'Sunshine',
    shortDescription: 'Vibrant golden sunflowers paired with crisp chamomile and solidago.',
    fullDescription: 'An explosion of genuine joy. Hand-cut organic golden sunflowers radiant against delicate chamomile daisies and Italian ruscus greenery. Bound with raw silk ribbon for an invigorating birthday surprise.',
    flowerType: 'Sunflowers',
    flowerComposition: 'French Sunflowers (5 stems), Chamomile Blooms, Solidago, Eucalyptus Parvifolia',
    image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=900&q=80',
    available: true,
    sizes: {
      small: { name: 'Petite Bloom', price: 1899, stems: '12 Stems' },
      medium: { name: 'Signature Classic', price: 2399, stems: '18 Stems' },
      large: { name: 'Grand Luxury', price: 2999, stems: '28 Stems' }
    },
    defaultSize: 'medium'
  },
  {
    id: 'bday-blush-daydream',
    occasion: 'birthday',
    name: 'Blush Daydream',
    shortDescription: 'Pastel pink garden roses with whisper-soft baby breath and lisianthus.',
    fullDescription: 'Dreamy English garden nostalgia captured in pastel hues. Features fragrant O’Hara garden roses swathed in clouds of double-flowered lisianthus and silvery dusty miller.',
    flowerType: 'Roses',
    flowerComposition: 'Pink O’Hara Garden Roses (12 stems), White Lisianthus, Gypsophila, Salal',
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=900&q=80',
    available: true,
    sizes: {
      small: { name: 'Petite Bloom', price: 2199, stems: '14 Stems' },
      medium: { name: 'Signature Classic', price: 2699, stems: '22 Stems' },
      large: { name: 'Grand Luxury', price: 3499, stems: '34 Stems' }
    },
    defaultSize: 'medium'
  },
  {
    id: 'bday-golden-hour',
    occasion: 'birthday',
    name: 'Golden Hour',
    shortDescription: 'Warm sunset yellow roses, peach spray carnations, and dried bunny tails.',
    fullDescription: 'Inspired by the magical amber glow of late afternoon sun. Sunkissed garden spray roses combined with delicate apricot ranunculus and velvety peach hypericum berries.',
    flowerType: 'Mixed',
    flowerComposition: 'Sunset Yellow Roses (8 stems), Peach Ranunculus, Apricot Carnations, Hypericum',
    image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=900&q=80',
    available: true,
    sizes: {
      small: { name: 'Petite Bloom', price: 1999, stems: '12 Stems' },
      medium: { name: 'Signature Classic', price: 2499, stems: '18 Stems' },
      large: { name: 'Grand Luxury', price: 3199, stems: '26 Stems' }
    },
    defaultSize: 'medium'
  },
  {
    id: 'bday-sweet-celebration',
    occasion: 'birthday',
    name: 'Sweet Celebration',
    shortDescription: 'A confection of pastel lilac roses, pink hydrangeas, and sweet peas.',
    fullDescription: 'An opulent pastel banquet designed for joyful milestone birthdays. A lush foundation of Dutch pink hydrangea supporting lilac memory lane roses and dancing sweet peas.',
    flowerType: 'Mixed',
    flowerComposition: 'Dutch Pink Hydrangea, Memory Lane Lilac Roses, Lavender Sweet Peas, Waxflowers',
    image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=900&q=80',
    available: true,
    sizes: {
      small: { name: 'Petite Bloom', price: 2399, stems: '16 Stems' },
      medium: { name: 'Signature Classic', price: 2899, stems: '24 Stems' },
      large: { name: 'Grand Luxury', price: 3699, stems: '36 Stems' }
    },
    defaultSize: 'medium'
  },
  {
    id: 'bday-ruby-joy',
    occasion: 'birthday',
    name: 'Ruby Joy',
    shortDescription: 'Striking duo of scarlet Explorer roses and hot pink cerise blooms.',
    fullDescription: 'Bold, theatrical, and spirited. Ruby red Explorer roses layered with passionate cerise blooms and fresh aromatic eucalyptus. Guaranteed to light up the celebration.',
    flowerType: 'Roses',
    flowerComposition: 'Red Explorer Roses (10 stems), Hot Pink Cerise Roses (8 stems), Seeded Eucalyptus',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=80',
    available: true,
    sizes: {
      small: { name: 'Petite Bloom', price: 2599, stems: '18 Stems' },
      medium: { name: 'Signature Classic', price: 3199, stems: '26 Stems' },
      large: { name: 'Grand Luxury', price: 3999, stems: '40 Stems' }
    },
    defaultSize: 'medium'
  },
  {
    id: 'bday-wildflower-wishes',
    occasion: 'birthday',
    name: 'Wildflower Wishes',
    shortDescription: 'Fresh seasonal meadow stems with cornflowers, veronica, and poppies.',
    fullDescription: 'Hand-gathered aesthetic mirroring an untamed Alpine wildflower meadow. Dynamic textures featuring blue cornflowers, purple veronica spikes, and cheerful seasonal blooms.',
    flowerType: 'Wildflowers',
    flowerComposition: 'Blue Cornflowers, Blue Veronica, Yellow Craspedia, Chamomile, Feather Grass',
    image: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=900&q=80',
    available: true,
    sizes: {
      small: { name: 'Petite Bloom', price: 1799, stems: '15 Stems' },
      medium: { name: 'Signature Classic', price: 2299, stems: '22 Stems' },
      large: { name: 'Grand Luxury', price: 2899, stems: '32 Stems' }
    },
    defaultSize: 'medium'
  },

  // ================= ANNIVERSARY COLLECTION =================
  {
    id: 'anni-eternal-love',
    occasion: 'anniversary',
    name: 'Eternal Love',
    shortDescription: 'Pure crimson Ecuadorian grand roses wrapped in black stellar luxury wrap.',
    fullDescription: 'The definitive testament of unwavering romance. Velvet-textured high-altitude Ecuadorian Grand Amore red roses with towering 60cm stems, mirroring our cinematic boutique centerpiece.',
    flowerType: 'Roses',
    flowerComposition: 'Ecuadorian Grand Amore Red Roses (24 stems), Ruscus foliage, Starry matte wrap',
    image: '/occasions/anniversary.jpg',
    available: true,
    sizes: {
      small: { name: 'Petite Bloom', price: 2999, stems: '16 Stems' },
      medium: { name: 'Signature Classic', price: 3699, stems: '24 Stems' },
      large: { name: 'Grand Luxury', price: 4799, stems: '36 Stems' }
    },
    defaultSize: 'medium'
  },
  {
    id: 'anni-velvet-romance',
    occasion: 'anniversary',
    name: 'Velvet Romance',
    shortDescription: 'Deep moody Black Baccara roses and burgundy calla lilies in dramatic harmony.',
    fullDescription: 'Sensual and dramatic. Dark gothic elegance uniting almost-black velvet roses with sleek burgundy calla lilies and bronze eucalyptus. A tribute to intoxicating passion.',
    flowerType: 'Roses',
    flowerComposition: 'Black Baccara Roses (12 stems), Burgundy Calla Lilies (6 stems), Bronze Cotinus',
    image: 'https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&w=900&q=80',
    available: true,
    sizes: {
      small: { name: 'Petite Bloom', price: 3299, stems: '16 Stems' },
      medium: { name: 'Signature Classic', price: 3999, stems: '24 Stems' },
      large: { name: 'Grand Luxury', price: 4999, stems: '34 Stems' }
    },
    defaultSize: 'medium'
  },
  {
    id: 'anni-blush-forever',
    occasion: 'anniversary',
    name: 'Blush Forever',
    shortDescription: 'Subtle romantic dusty pink Mondial roses with scented eucalyptus.',
    fullDescription: 'Graceful poetry in gentle shades of rose quartz. Mondial Ecuadorian roses prized for their high petal count and longevity, surrounded by silver dollar eucalyptus leaves.',
    flowerType: 'Roses',
    flowerComposition: 'Dusty Pink Mondial Roses (18 stems), Silver Dollar Eucalyptus, Waxflower',
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=900&q=80',
    available: true,
    sizes: {
      small: { name: 'Petite Bloom', price: 2699, stems: '14 Stems' },
      medium: { name: 'Signature Classic', price: 3299, stems: '20 Stems' },
      large: { name: 'Grand Luxury', price: 4199, stems: '30 Stems' }
    },
    defaultSize: 'medium'
  },
  {
    id: 'anni-midnight-rose',
    occasion: 'anniversary',
    name: 'Midnight Rose',
    shortDescription: 'Dramatic scarlet roses accented with dark foliage and midnight plum accents.',
    fullDescription: 'Rich midnight drama. Intense scarlet blossoms nestled within dark Italian foliage, deep plum astrantia, and black satin ribbons. Built for candlelit anniversaries.',
    flowerType: 'Roses',
    flowerComposition: 'Scarlet Explorer Roses (20 stems), Dark Plum Astrantia, Smoke Bush leaves',
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=900&q=80',
    available: true,
    sizes: {
      small: { name: 'Petite Bloom', price: 3499, stems: '18 Stems' },
      medium: { name: 'Signature Classic', price: 4299, stems: '26 Stems' },
      large: { name: 'Grand Luxury', price: 5499, stems: '38 Stems' }
    },
    defaultSize: 'medium'
  },
  {
    id: 'anni-golden-promise',
    occasion: 'anniversary',
    name: 'Golden Promise',
    shortDescription: 'Crimson roses paired with gold-dusted magnolia leaves and champagne lisianthus.',
    fullDescription: 'Honoring lifelong commitments. Striking red roses accented with subtle hand-gilded gold botanical leaves and creamy champagne lisianthus, echoing golden milestone anniversaries.',
    flowerType: 'Mixed',
    flowerComposition: 'Velvet Red Roses (14 stems), Champagne Lisianthus, Gilded Magnolia Foliage',
    image: 'https://images.unsplash.com/photo-1509744645300-a2098b11871a?auto=format&fit=crop&w=900&q=80',
    available: true,
    sizes: {
      small: { name: 'Petite Bloom', price: 3199, stems: '16 Stems' },
      medium: { name: 'Signature Classic', price: 3899, stems: '22 Stems' },
      large: { name: 'Grand Luxury', price: 4899, stems: '32 Stems' }
    },
    defaultSize: 'medium'
  },
  {
    id: 'anni-love-in-bloom',
    occasion: 'anniversary',
    name: 'Love in Bloom',
    shortDescription: 'Mixed romantic arrangement with red ranunculus, garden roses, and anemones.',
    fullDescription: 'A dynamic symphony of diverse romantic blossoms. Velvet dark-eyed red anemones, multi-petaled ranunculus, and lush garden roses intertwined in effortless Parisian charm.',
    flowerType: 'Mixed',
    flowerComposition: 'Red Ranunculus, Dark Eyed Anemones, Garden Spray Roses, Italian Ruscus',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=80',
    available: true,
    sizes: {
      small: { name: 'Petite Bloom', price: 2799, stems: '16 Stems' },
      medium: { name: 'Signature Classic', price: 3399, stems: '24 Stems' },
      large: { name: 'Grand Luxury', price: 4399, stems: '36 Stems' }
    },
    defaultSize: 'medium'
  },

  // ================= WEDDING COLLECTION =================
  {
    id: 'wed-ivory-grace',
    occasion: 'wedding',
    name: 'Ivory Grace',
    shortDescription: 'Pristine Playa Blanca white roses and ethereal gypsophila cascade.',
    fullDescription: 'The quintessence of bridal purity. Sourced from organic Ecuadorian highlands, these pristine Playa Blanca roses feature over 45 pristine ivory petals opening to a majestic spherical crown.',
    flowerType: 'Roses',
    flowerComposition: 'Playa Blanca White Roses (20 stems), Million Stars Gypsophila, Salal Greenery',
    image: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=900&q=80',
    available: true,
    sizes: {
      small: { name: 'Petite Bloom', price: 3800, stems: '18 Stems' },
      medium: { name: 'Signature Classic', price: 4600, stems: '26 Stems' },
      large: { name: 'Grand Luxury', price: 5800, stems: '38 Stems' }
    },
    defaultSize: 'medium'
  },
  {
    id: 'wed-pearl-elegance',
    occasion: 'wedding',
    name: 'Pearl Elegance',
    shortDescription: 'Lush ivory peonies, champagne lisianthus, and olive branch greenery.',
    fullDescription: 'Sublime bridal romance. Pillowy ivory Sarah Bernhardt peonies crowned with champagne lisianthus, white delphinium, and Mediterranean olive branches symbolizing peace and lasting fidelity.',
    flowerType: 'Peonies',
    flowerComposition: 'White Bridal Peonies (8 stems), Champagne Lisianthus, White Delphinium, Olive Sprigs',
    image: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?auto=format&fit=crop&w=900&q=80',
    available: true,
    sizes: {
      small: { name: 'Petite Bloom', price: 4400, stems: '16 Stems' },
      medium: { name: 'Signature Classic', price: 5300, stems: '24 Stems' },
      large: { name: 'Grand Luxury', price: 6500, stems: '34 Stems' }
    },
    defaultSize: 'medium'
  },
  {
    id: 'wed-blush-vows',
    occasion: 'wedding',
    name: 'Blush Vows',
    shortDescription: 'Romantic blush Keira garden roses combined with ivory spray roses.',
    fullDescription: 'Soft and fairytale-worthy. Fragrant David Austin Keira garden roses featuring intricate ruffled blush centers surrounded by pure ivory spray roses and trailing jasmine vine.',
    flowerType: 'Roses',
    flowerComposition: 'David Austin Keira Roses (10 stems), Ivory Spray Roses (8 stems), Jasmine Foliage',
    image: 'https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?auto=format&fit=crop&w=900&q=80',
    available: true,
    sizes: {
      small: { name: 'Petite Bloom', price: 4100, stems: '18 Stems' },
      medium: { name: 'Signature Classic', price: 4900, stems: '26 Stems' },
      large: { name: 'Grand Luxury', price: 6100, stems: '36 Stems' }
    },
    defaultSize: 'medium'
  },
  {
    id: 'wed-garden-romance',
    occasion: 'wedding',
    name: 'Garden Romance',
    shortDescription: 'Organic organic garden roses, white veronica, and silver dollar eucalyptus.',
    fullDescription: 'Inspired by romantic country châteaux. An unstructured organic silhouette brimming with scented garden roses, cascading white snapdragons, and aromatic herbal eucalyptus.',
    flowerType: 'Roses',
    flowerComposition: 'Ivory English Garden Roses (12 stems), White Snapdragons, Veronica, Eucalyptus',
    image: 'https://images.unsplash.com/photo-1508615070457-7baeba4003ab?auto=format&fit=crop&w=900&q=80',
    available: true,
    sizes: {
      small: { name: 'Petite Bloom', price: 3600, stems: '16 Stems' },
      medium: { name: 'Signature Classic', price: 4300, stems: '24 Stems' },
      large: { name: 'Grand Luxury', price: 5400, stems: '34 Stems' }
    },
    defaultSize: 'medium'
  },
  {
    id: 'wed-pure-eternity',
    occasion: 'wedding',
    name: 'Pure Eternity',
    shortDescription: 'Regal Casablanca oriental white lilies paired with avalanche roses.',
    fullDescription: 'Breathtaking majesty and intoxicating fragrance. Pristine Casablanca lilies blooming alongside Avalanche white roses and cascading Italian ferns. Pure royal luxury.',
    flowerType: 'Lilies',
    flowerComposition: 'Casablanca White Lilies (6 large stems), Avalanche White Roses (14 stems), Ferns',
    image: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=900&q=80',
    available: true,
    sizes: {
      small: { name: 'Petite Bloom', price: 4700, stems: '16 Stems' },
      medium: { name: 'Signature Classic', price: 5700, stems: '24 Stems' },
      large: { name: 'Grand Luxury', price: 6900, stems: '34 Stems' }
    },
    defaultSize: 'medium'
  },
  {
    id: 'wed-forever-yours',
    occasion: 'wedding',
    name: 'Forever Yours',
    shortDescription: 'Our signature bridal masterpiece with white orchids, peonies, and garden roses.',
    fullDescription: 'The pinnacle of haute floristry. Cascading pure white Phalaenopsis orchids flowing from a lush crown of Sarah Bernhardt peonies and Playa Blanca garden roses, secured with bespoke Italian silk ribbon.',
    flowerType: 'Orchids',
    flowerComposition: 'White Phalaenopsis Orchids (3 arching sprays), White Peonies, Playa Blanca Roses',
    image: 'https://images.unsplash.com/photo-1533616688419-b7a585564566?auto=format&fit=crop&w=900&q=80',
    available: true,
    sizes: {
      small: { name: 'Petite Bloom', price: 5500, stems: '20 Stems' },
      medium: { name: 'Signature Classic', price: 6600, stems: '30 Stems' },
      large: { name: 'Grand Luxury', price: 8200, stems: '45 Stems' }
    },
    defaultSize: 'medium'
  }
];

export const FLOWER_TYPES = ['All', 'Roses', 'Sunflowers', 'Peonies', 'Lilies', 'Orchids', 'Mixed', 'Wildflowers'];

// Helper to format currency in Indian Rupees
export function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}
