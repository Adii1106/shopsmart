import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Search, MapPin, RefreshCcw, Package, Sparkles, ChevronDown, Users, Shield, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card, Badge } from './ui';

const Marketplace = ({ user, addToCart, selectedCity, setSelectedCity, isChangingCity, setIsChangingCity, selectedCategory, setSelectedCategory }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [selectedCity, selectedCategory]);

  const fetchProducts = () => {
    setLoading(true);
    const query = new URLSearchParams();
    if (selectedCity) query.append('city', selectedCity);
    if (selectedCategory) query.append('category', selectedCategory);
    
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/products?${query.toString()}`)
      .then(r => r.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  return (
    <motion.div id="marketRoot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Hero Section */}
      <section id="marketHero" className="relative overflow-hidden bg-muted pt-32 pb-40">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z' fill='%238B6F47'/%3E%3C/svg%3E")` }} />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative text-center">
          <Badge className="mb-8 bg-primary/10 text-primary border-primary/20 px-5 py-2 font-bold tracking-widest text-[10px] uppercase mx-auto rounded-full">
            <Sparkles className="h-3.5 w-3.5 mr-2" /> Supporting Local Heritage
          </Badge>
          
          <h1 className="text-7xl lg:text-9xl font-display font-light tracking-tight text-foreground mb-8 leading-[1] text-balance">
            Crafting Stories <br /><span className="italic font-medium text-primary">In {selectedCity || 'Your City'}</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-16 font-light italic text-balance">
            "Authenticity isn't miles away, it's right in your neighborhood."
          </p>

          <div id="marketFilters" className="max-w-3xl mx-auto grid md:grid-cols-2 gap-4">
            <Card className="border-border shadow-2xl shadow-primary/5 bg-white p-2 rounded-[2rem]">
               <div className="flex items-center gap-4 p-4">
                  <div className="h-12 w-12 bg-muted rounded-2xl flex items-center justify-center text-primary shrink-0">
                    <MapPin size={20} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 text-left">
                     <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-black">Browsing From</p>
                     {isChangingCity ? (
                        <input 
                          autoFocus
                          className="w-full bg-transparent border-none outline-none font-medium text-foreground text-lg" 
                          value={selectedCity} 
                          onChange={e => setSelectedCity(e.target.value)}
                          onBlur={() => setIsChangingCity(false)}
                          onKeyDown={e => e.key === 'Enter' && setIsChangingCity(false)}
                        />
                     ) : (
                        <div onClick={() => setIsChangingCity(true)} className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                           <p className="text-lg font-medium">{selectedCity || 'Select City'}</p>
                           <ChevronDown size={14} className="text-muted-foreground" />
                        </div>
                     )}
                  </div>
               </div>
            </Card>
            <Card className="border-border shadow-2xl shadow-primary/5 bg-white p-2 rounded-[2rem]">
               <div className="flex items-center gap-4 p-4">
                  <div className="h-12 w-12 bg-muted rounded-2xl flex items-center justify-center text-primary shrink-0">
                    <Package size={20} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 text-left">
                     <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-black">Craft Category</p>
                     <select 
                        className="bg-transparent border-none outline-none font-medium text-foreground text-lg w-full appearance-none pr-8" 
                        value={selectedCategory} 
                        onChange={e => setSelectedCategory(e.target.value)}
                     >
                        <option value="">All Masterpieces</option>
                        <option value="Pottery">Pottery & Ceramics</option>
                        <option value="Textiles">Handmade Textiles</option>
                        <option value="Foods">Artisan Foods</option>
                        <option value="Woodwork">Woodwork</option>
                     </select>
                  </div>
               </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section id="marketGrid" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-20">
            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-black">The Artisan Directory</p>
              <h2 className="text-5xl lg:text-7xl font-display font-light text-foreground italic">
                Discover Excellence
              </h2>
            </div>
            <Button onClick={fetchProducts} variant="ghost" className="text-muted-foreground hover:text-primary">
              <RefreshCcw size={16} className={loading ? 'animate-spin' : ''} />
            </Button>
          </div>

          {loading ? (
            <div className="py-20 text-center font-display text-2xl italic animate-pulse text-primary">Curating masterpieces...</div>
          ) : (
            <AnimatePresence mode="wait">
              {products.length === 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-40 text-center border-2 border-dashed border-border rounded-[3rem] space-y-4">
                   <Package size={48} className="mx-auto text-muted-foreground opacity-20" />
                   <h3 className="text-2xl font-display text-muted-foreground font-light italic">No crafts found in this circle.</h3>
                   <Button onClick={() => { setSelectedCity(''); setSelectedCategory(''); }} variant="link" className="text-primary font-bold">Show All Artisans</Button>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {products.map(p => (
                    <ProductCard key={p.id} product={p} addToCart={addToCart} />
                  ))}
                </div>
              )}
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* Trust Section */}
      <section id="marketTrust" className="py-32 bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
             {[
               {Icon: Users, title: 'Hyperlocal Support', desc: '100% of proceeds go directly to local makers in your city.'},
               {Icon: Shield, title: 'Authenticity Vetted', desc: 'Every artisan is personally verified for traditional craft excellence.'},
               {Icon: Clock, title: 'Swift Delivery', desc: 'Proximity means products travel less, arriving fresh and fast.'}
             ].map((item, i) => (
               <div key={i} className="space-y-6 text-center group">
                  <div className="h-24 w-24 bg-white border border-border mx-auto rounded-[2.5rem] flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:rotate-6 transition-all duration-700 shadow-sm">
                    <item.Icon size={32} strokeWidth={1.2} />
                  </div>
                  <h3 className="text-2xl font-display font-medium text-foreground italic">{item.title}</h3>
                  <p className="text-muted-foreground font-light leading-relaxed px-4 text-balance">{item.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Marketplace;
