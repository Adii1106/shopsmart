let products = [
  { 
    id: 1, 
    name: 'Hand-painted Terracotta Pot', 
    price: 450, 
    city: 'Pune', 
    category: 'Pottery', 
    sellerId: 1, 
    seller: 'Kala Kendra',
    desc: 'Earthy pot with intricate tribal art, handcrafted by master potters from the Konkan belt.', 
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80',
    rating: 4.5, 
    reviews: 120 
  },
  { 
    id: 2, 
    name: 'Paithani Silk Pouch', 
    price: 550, 
    city: 'Pune', 
    category: 'Textiles', 
    sellerId: 2, 
    seller: 'Vastra Heritage',
    desc: 'Handcrafted pouch with traditional Paithani borders and zari work. A piece of royal history.', 
    image: 'https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?w=800&q=80',
    rating: 4.8, 
    reviews: 85 
  },
  { 
    id: 3, 
    name: 'Blue Pottery Vase', 
    price: 1200, 
    city: 'Jaipur', 
    category: 'Pottery', 
    sellerId: 3, 
    seller: 'Rawat Artisans',
    desc: 'Classic Jaipur blue pottery with traditional floral motifs. A cobalt blue masterpiece.', 
    image: 'https://images.unsplash.com/photo-1541480601022-2308c0f02487?w=800&q=80',
    rating: 4.6, 
    reviews: 210 
  },
  { 
    id: 4, 
    name: 'Hand-woven Bamboo Picnic Basket', 
    price: 850, 
    city: 'Kolkata', 
    category: 'Woodwork', 
    sellerId: 4, 
    seller: 'Eco-Crafts',
    desc: 'Lightweight and durable, expertly woven by artisans from the North East.', 
    image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&q=80',
    rating: 4.4, 
    reviews: 45 
  }
];

const cities = ['Pune', 'Jaipur', 'Delhi', 'Kolkata', 'Mumbai'];

// Helper to "Artisan-ify" products from external APIs
const transformExternalProduct = (item) => {
  let imageUrl = '';
  try {
    // Platzi API often returns "["[\"https://...\"]"]"
    const cleanedStr = item.images?.[0]?.replace(/^[\["]+|[\]"]+$/g, '') || '';
    imageUrl = cleanedStr.startsWith('http') ? cleanedStr : item.images?.[0];
  } catch (e) {
    imageUrl = item.images?.[0];
  }

  return {
    id: `ext-${item.id}`,
    name: item.title,
    price: Math.floor(item.price * 80), // Approx INR
    city: cities[Math.floor(Math.random() * cities.length)],
    category: item.category?.name || 'Artisan',
    desc: item.description,
    image: imageUrl,
    rating: (Math.random() * (5 - 3.5) + 3.5).toFixed(1),
    reviews: Math.floor(Math.random() * 500) + 10
  };
};

exports.getProducts = async (req, res) => {
  const { city, category, search } = req.query;
  
  try {
    // 1. Fetch from External API
    let extraItems = [];
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/products?limit=30');
      const apiItems = await response.json();
      extraItems = apiItems.map(transformExternalProduct);
    } catch (apiErr) {
      console.error('External API down, falling back to local inventory.', apiErr.message);
    }

    let allItems = [...products, ...extraItems];

    // 3. Filtering
    if (city) {
      const searchCity = city.toLowerCase();
      allItems = allItems.filter(p => p.city?.toLowerCase().includes(searchCity));
    }
    if (category) {
      allItems = allItems.filter(p => p.category === category);
    }
    if (search) {
      const query = search.toLowerCase();
      allItems = allItems.filter(p => p.name?.toLowerCase().includes(query) || p.desc?.toLowerCase().includes(query));
    }

    res.json(allItems);
  } catch (err) {
    res.status(500).json({ msg: 'Error aggregating products', error: err.message });
  }
};

exports.createProduct = (req, res) => {
  const newItem = { 
    id: products.length + 1, 
    ...req.body, 
    price: Number(req.body.price),
    rating: 0,
    reviews: 0
  };
  products.push(newItem);
  res.status(201).json(newItem);
};
