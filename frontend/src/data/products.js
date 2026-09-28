const products = [
  {
    id: 1,
    name: 'Pure Ceylon Alba Cinnamon Quills',
    category: 'Spices',
    localPrice: 1850,
    internationalPrice: 12.50,
    rating: 4.9,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800'
    ],
    tag: 'Grade Alba • Pure Origin',
    isFeatured: true,
    isNew: true,
    description: 'Harvested from the lush cinnamon plantations of Mirissa, Alba is the highest & rarest grade of authentic Ceylon Cinnamon. Soft, sweet, fragile, and intensely aromatic.',
    origin: 'Southern Province, Sri Lanka',
    weight: '100g / 3.5oz',
    specifications: [
      { label: 'Grade', value: 'Alba (Pencil Thin)' },
      { label: 'Coumarin Content', value: 'Ultra Low (< 0.004%)' },
      { label: 'Harvesting Method', value: 'Hand-peeled by master artisans' },
      { label: 'Shelf Life', value: '24 Months' }
    ]
  },
  {
    id: 2,
    name: 'Single Origin Nuwara Eliya Loose Leaf Black Tea',
    category: 'Tea',
    localPrice: 2200,
    internationalPrice: 14.80,
    rating: 4.95,
    reviewsCount: 218,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=800'
    ],
    tag: 'High Grown • BOPF Grade',
    isFeatured: true,
    isNew: false,
    description: 'Known as the "Champagne of Ceylon Teas", grown at 6,000 feet elevation amidst misty tea estates. Yields a delicate golden liqueur with floral notes.',
    origin: 'Nuwara Eliya (6,000 ft), Sri Lanka',
    weight: '250g Tin Pack',
    specifications: [
      { label: 'Elevation', value: 'High Grown (1,800m+)' },
      { label: 'Tasting Notes', value: 'Delicate, Floral, Crisp Citrus' },
      { label: 'Flush', value: 'First Flush Spring Harvest' },
      { label: 'Certifications', value: 'Lion Logo Authentic Pure Ceylon Tea' }
    ]
  },
  {
    id: 3,
    name: 'Ceylon Black Pepper Whole Corns',
    category: 'Spices',
    localPrice: 1450,
    internationalPrice: 9.80,
    rating: 4.8,
    reviewsCount: 89,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800'
    ],
    tag: 'High Piperine • Hand-Sorted',
    isFeatured: false,
    isNew: false,
    description: 'Renowned globally for its exceptionally high piperine content and intense aromatic kick. Grown organically in Matale spice gardens.',
    origin: 'Matale Valley, Sri Lanka',
    weight: '200g Pouch',
    specifications: [
      { label: 'Piperine Content', value: '6.5% (Highest Global Standard)' },
      { label: 'Processing', value: 'Sun-dried natural processing' }
    ]
  },
  {
    id: 4,
    name: 'Green Cardamom Pods Jumbo Harvest',
    category: 'Spices',
    localPrice: 3100,
    internationalPrice: 21.00,
    rating: 4.88,
    reviewsCount: 76,
    image: 'https://images.unsplash.com/photo-1608797178974-15b35a64ede9?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1608797178974-15b35a64ede9?auto=format&fit=crop&q=80&w=800'
    ],
    tag: 'Jumbo Size • Aromatic',
    isFeatured: true,
    isNew: true,
    description: 'Plump, vivid green cardamom pods selected from the Central Highlands. Delivers sweet eucalyptus and warm citrus fragrance.',
    origin: 'Kandy Hill Country, Sri Lanka',
    weight: '100g Glass Jar',
    specifications: [
      { label: 'Grade', value: 'LG (Large Green Pods)' },
      { label: 'Flavor Profile', value: 'Sweet, Camphorous, Zesty' }
    ]
  },
  {
    id: 5,
    name: 'Pure Artisanal Kithul Treacle (Syrup)',
    category: 'Delicacies',
    localPrice: 2400,
    internationalPrice: 16.50,
    rating: 4.97,
    reviewsCount: 164,
    image: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&q=80&w=800'
    ],
    tag: '100% Raw • Low Glycemic Index',
    isFeatured: true,
    isNew: false,
    description: 'Tapped by hand from the sap of Caryota urens (Kithul Palm) in Sinharaja rainforest buffer zones. A healthy, caramel-rich natural sweetener.',
    origin: 'Sinharaja Biosphere, Sri Lanka',
    weight: '375ml Traditional Bottle',
    specifications: [
      { label: 'Source', value: 'Wild Rainforest Kithul Palms' },
      { label: 'Purity', value: 'Zero Added Sugar or Preservatives' },
      { label: 'Pairing', value: 'Curd, Pancakes, Ceylon Black Tea' }
    ]
  },
  {
    id: 6,
    name: 'Organic Cold-Pressed Virgin Coconut Oil',
    category: 'Natural Oils',
    localPrice: 1950,
    internationalPrice: 13.00,
    rating: 4.91,
    reviewsCount: 132,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800'
    ],
    tag: 'Cold Pressed • Raw Coconut',
    isFeatured: false,
    isNew: false,
    description: 'Extracted within hours of harvesting fresh coconuts from the Coconut Triangle of Kurunegala. Silky texture with subtle natural tropical scent.',
    origin: 'Coconut Triangle (Kurunegala), Sri Lanka',
    weight: '500ml Glass Container',
    specifications: [
      { label: 'Extraction', value: 'First Cold Press (< 45°C)' },
      { label: 'Lauric Acid', value: '52% High Purity' }
    ]
  },
  {
    id: 7,
    name: 'Hand-Carved Raksha Wooden Mask',
    category: 'Handcrafted',
    localPrice: 6500,
    internationalPrice: 42.00,
    rating: 4.96,
    reviewsCount: 52,
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80&w=800'
    ],
    tag: 'Heritage Art • Hand-Painted',
    isFeatured: true,
    isNew: true,
    description: 'Crafted by master artisans in Ambalangoda using sustainable Kaduru wood and natural botanical paints. Symbolizes protection, peace, and prosperity.',
    origin: 'Ambalangoda Coastal Heritage Centre, Sri Lanka',
    weight: '800g Wall Art Piece',
    specifications: [
      { label: 'Material', value: 'Kaduru Wood (Strychnos nux-vomica)' },
      { label: 'Craftsmanship', value: '100% Hand-Carved & Hand-Painted' }
    ]
  },
  {
    id: 8,
    name: 'Whole Nutmeg with Mace Aril',
    category: 'Spices',
    localPrice: 1750,
    internationalPrice: 11.50,
    rating: 4.84,
    reviewsCount: 61,
    image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&q=80&w=800'
    ],
    tag: 'Dual Spice • Sun Dried',
    isFeatured: false,
    isNew: false,
    description: 'Whole sun-dried Ceylon nutmeg encased in vibrant crimson mace ribbons. Warm, bittersweet, and essential for baking & gourmet savory dishes.',
    origin: 'Kegalle Spice Gardens, Sri Lanka',
    weight: '150g Jar',
    specifications: [
      { label: 'Includes', value: 'Whole Nutmeg + Crimson Mace' },
      { label: 'Processing', value: 'Naturally Aged' }
    ]
  }
]

export const categories = [
  {
    id: 'tea',
    name: 'Ceylon Tea',
    tagline: 'High-grown, single origin black, green & silver needle teas.',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800',
    count: 18
  },
  {
    id: 'spices',
    name: 'Ceylon Spices',
    tagline: 'Alba Cinnamon, high-piperine pepper, green cardamom & cloves.',
    image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&q=80&w=800',
    count: 24
  },
  {
    id: 'delicacies',
    name: 'Kithul & Delicacies',
    tagline: 'Authentic rainforest Kithul treacle, palm jaggery & coconut sweets.',
    image: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&q=80&w=800',
    count: 12
  },
  {
    id: 'oils',
    name: 'Natural Oils',
    tagline: 'Virgin coconut oil, citronella, lemongrass & essential botanical oils.',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
    count: 14
  },
  {
    id: 'handcrafted',
    name: 'Handcrafted Arts',
    tagline: 'Wooden masks, brassware, handloom textiles & natural reed crafts.',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80&w=800',
    count: 16
  }
]

export default products