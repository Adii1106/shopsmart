import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Store, MapPin, Star, CheckCircle2 } from 'lucide-react';
import { Button, Card, CardContent, Badge } from './ui';

const ProductCard = ({ product, addToCart }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <Card 
      id="prodCard"
      className="group overflow-hidden border-border hover:border-primary/30 transition-all duration-500 cursor-pointer bg-white hover:shadow-2xl hover:shadow-primary/5"
    >
      <div id="prodImgContainer" className="relative aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-4 right-4 h-10 w-10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 hover:bg-white backdrop-blur-sm border border-border mt-12"
        >
          <Heart className="h-4 w-4 text-primary" strokeWidth={1.5} />
        </Button>
        <Badge className="absolute top-4 left-4 bg-white/90 text-primary border-0 backdrop-blur-sm">
          {product.category || 'Artisan'}
        </Badge>
      </div>
      
      <CardContent id="prodInfo" className="p-6 space-y-4">
        <div>
          <h3 className="font-display text-xl font-medium text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Store className="h-4 w-4" strokeWidth={1.5} />
            <span className="font-light italic">{product.seller || 'Local Artisan'}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="h-4 w-4" strokeWidth={1.5} />
            <span className="font-light">{product.city || 'Pune'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="h-4 w-4 fill-[#F4C430] text-[#F4C430]" strokeWidth={0} />
            <span className="font-medium text-foreground">{product.rating || '4.9'}</span>
          </div>
        </div>

        <div id="cardActions" className="pt-4 border-t border-border flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-light mb-1 uppercase tracking-widest">Price</p>
            <p className="text-2xl font-display font-medium text-foreground">₹{product.price?.toLocaleString()}</p>
          </div>
          <Button 
            onClick={handleAddToCart}
            size="sm" 
            className={`transition-all duration-500 font-bold px-6 h-10 rounded-xl flex items-center gap-2 ${
              isAdded ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-primary hover:bg-primary/90 text-white'
            }`}
          >
            <AnimatePresence mode="wait">
              {isAdded ? (
                <motion.div key="added" initial={{ y: 5, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -5, opacity: 0 }} className="flex items-center gap-2">
                  <CheckCircle2 size={16} /> Collected
                </motion.div>
              ) : (
                <motion.div key="collect" initial={{ y: 5, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -5, opacity: 0 }}>
                  Collect
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
