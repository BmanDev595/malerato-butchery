// data/products.ts
export interface Product {
  id: number
  name: string
  description: string
  longDescription: string
  price: number
  category: string
  cut: string
  weight: number
  unit: string
  rating: number
  stock: number
  images: { color: string; label: string }[]
  nutritionalInfo: {
    calories: string
    protein: string
    fat: string
    carbs: string
  }
  cookingTips: string[]
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Premium Beef T-Bone Steak',
    description: 'Premium T-bone steak, perfect for grilling. Marbled for flavor and tenderness.',
    longDescription: 'Our Premium Beef T-Bone Steak is hand-selected from grass-fed, free-range cattle. Each steak is expertly cut to perfection, ensuring the perfect balance of tenderloin and strip steak.',
    price: 34.99,
    category: 'Beef',
    cut: 'T-Bone',
    weight: 1,
    unit: 'kg',
    rating: 4.8,
    stock: 15,
    images: [
      { color: 'bg-red-100', label: 'Front' },
      { color: 'bg-red-200', label: 'Back' },
    ],
    nutritionalInfo: {
      calories: '250 per 100g',
      protein: '26g',
      fat: '15g',
      carbs: '0g'
    },
    cookingTips: [
      'Bring to room temperature before cooking',
      'Season generously with salt and pepper',
      'Cook on high heat for 2-3 minutes per side',
      'Let rest for 5 minutes before serving'
    ]
  },
  {
    id: 2,
    name: 'Fresh Chicken Breast',
    description: 'Boneless, skinless chicken breast. Perfect for healthy meals.',
    longDescription: 'Our Fresh Chicken Breast is sourced from free-range chickens raised without antibiotics or hormones. Each breast is hand-trimmed for optimal quality.',
    price: 12.99,
    category: 'Chicken',
    cut: 'Breast',
    weight: 1,
    unit: 'kg',
    rating: 4.5,
    stock: 25,
    images: [
      { color: 'bg-yellow-100', label: 'Front' },
      { color: 'bg-yellow-200', label: 'Back' },
    ],
    nutritionalInfo: {
      calories: '165 per 100g',
      protein: '31g',
      fat: '3.6g',
      carbs: '0g'
    },
    cookingTips: [
      'Marinate for at least 30 minutes',
      'Cook to internal temperature of 165°F (74°C)',
      'Slice against the grain for tenderness'
    ]
  },
  {
    id: 3,
    name: 'Pork Ribs',
    description: 'Succulent pork ribs, ideal for BBQ and slow cooking.',
    longDescription: 'Our premium pork ribs are carefully selected for perfect meat-to-bone ratio and marbling.',
    price: 18.99,
    category: 'Pork',
    cut: 'Ribs',
    weight: 1,
    unit: 'kg',
    rating: 4.6,
    stock: 20,
    images: [
      { color: 'bg-pink-100', label: 'Front' },
      { color: 'bg-pink-200', label: 'Back' },
    ],
    nutritionalInfo: {
      calories: '280 per 100g',
      protein: '22g',
      fat: '20g',
      carbs: '0g'
    },
    cookingTips: [
      'Remove membrane from bone side',
      'Rub with seasoning 1 hour before cooking',
      'Cook low and slow for 3-4 hours'
    ]
  },
  {
    id: 4,
    name: 'Fresh Salmon Fillet',
    description: 'Fresh Atlantic salmon fillet, rich in Omega-3.',
    longDescription: 'Wild-caught Atlantic salmon fillets, sustainably sourced and expertly portioned.',
    price: 22.99,
    category: 'Seafood',
    cut: 'Fillet',
    weight: 1,
    unit: 'kg',
    rating: 4.7,
    stock: 12,
    images: [
      { color: 'bg-blue-100', label: 'Front' },
      { color: 'bg-blue-200', label: 'Back' },
    ],
    nutritionalInfo: {
      calories: '208 per 100g',
      protein: '22g',
      fat: '13g',
      carbs: '0g'
    },
    cookingTips: [
      'Pat dry before seasoning',
      'Skin-side down for crispy skin',
      'Cook until opaque and flaky'
    ]
  },
  {
    id: 5,
    name: 'Lamb Chops',
    description: 'Tender lamb chops, seasoned and ready for cooking.',
    longDescription: 'Our lamb chops come from grass-fed lambs, ensuring tender and flavorful meat.',
    price: 28.99,
    category: 'Lamb',
    cut: 'Chops',
    weight: 1,
    unit: 'kg',
    rating: 4.4,
    stock: 10,
    images: [
      { color: 'bg-purple-100', label: 'Front' },
      { color: 'bg-purple-200', label: 'Back' },
    ],
    nutritionalInfo: {
      calories: '294 per 100g',
      protein: '25g',
      fat: '21g',
      carbs: '0g'
    },
    cookingTips: [
      'Bring to room temperature',
      'Season with rosemary and garlic',
      'Cook to medium-rare for best flavor'
    ]
  },
  {
    id: 6,
    name: 'Beef Mince',
    description: 'Freshly ground beef mince, perfect for burgers and pasta.',
    longDescription: 'Freshly ground beef mince made from premium cuts with optimal fat content.',
    price: 16.99,
    category: 'Beef',
    cut: 'Mince',
    weight: 1,
    unit: 'kg',
    rating: 4.3,
    stock: 30,
    images: [
      { color: 'bg-red-100', label: 'Front' },
      { color: 'bg-red-200', label: 'Back' },
    ],
    nutritionalInfo: {
      calories: '250 per 100g',
      protein: '26g',
      fat: '18g',
      carbs: '0g'
    },
    cookingTips: [
      'Do not overmix when making burgers',
      'Cook until no longer pink inside',
      'Drain excess fat after cooking'
    ]
  },
  {
    id: 7,
    name: 'Chicken Thighs',
    description: 'Boneless chicken thighs, juicy and flavorful.',
    longDescription: 'Boneless, skinless chicken thighs with perfect fat content for juicy results.',
    price: 10.99,
    category: 'Chicken',
    cut: 'Thighs',
    weight: 1,
    unit: 'kg',
    rating: 4.2,
    stock: 22,
    images: [
      { color: 'bg-yellow-100', label: 'Front' },
      { color: 'bg-yellow-200', label: 'Back' },
    ],
    nutritionalInfo: {
      calories: '209 per 100g',
      protein: '26g',
      fat: '11g',
      carbs: '0g'
    },
    cookingTips: [
      'Great for slow cooking or grilling',
      'Cook to internal temperature of 165°F (74°C)',
      'Marinate for extra flavor'
    ]
  },
  {
    id: 8,
    name: 'Pork Sausages',
    description: 'Traditional pork sausages, seasoned with herbs.',
    longDescription: 'Handmade pork sausages with traditional herb seasoning and natural casings.',
    price: 14.99,
    category: 'Processed',
    cut: 'Sausages',
    weight: 1,
    unit: 'kg',
    rating: 4.5,
    stock: 18,
    images: [
      { color: 'bg-pink-100', label: 'Front' },
      { color: 'bg-pink-200', label: 'Back' },
    ],
    nutritionalInfo: {
      calories: '301 per 100g',
      protein: '12g',
      fat: '27g',
      carbs: '2g'
    },
    cookingTips: [
      'Prick sausages before cooking',
      'Cook on medium heat to avoid burning',
      'Turn frequently for even cooking'
    ]
  }
]

// Helper function to get product by ID
export function getProductById(id: number): Product | undefined {
  return products.find(product => product.id === id)
}

// Helper function to get products by category
export function getProductsByCategory(category: string): Product[] {
  if (category === 'All') return products
  return products.filter(product => product.category === category)
}

// Helper function to search products
export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase()
  return products.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  )
}