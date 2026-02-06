import { motion } from 'framer-motion';
import { ShoppingBag, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button, Card, Badge } from './ui';

const CartView = ({ cart, setCart, setView }) => {
  const { user } = useAuth();
  const subtotal = cart.reduce((sum, item) => sum + (item.price || 0), 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        buyerId: user.id, // Fixed: client sends buyerId
        items: cart, 
        total: subtotal,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      })
    }).then(r => r.ok ? r.json() : Promise.reject())
      .then(() => {
        alert('Order Placed Successfully!');
        setCart([]);
        setView('orders');
      })
      .catch(() => alert('Checkout failed. Please try again.'));
  };

  return (
    <div id="cartRoot" className="max-w-6xl mx-auto py-32 px-6">
      <h2 className="text-6xl font-display font-light mb-16 italic">Shopping Bag</h2>
      
      {cart.length === 0 ? (
        <div id="cartEmpty" className="py-40 text-center border-2 border-dashed border-border rounded-[3rem] space-y-8">
           <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mx-auto text-muted-foreground">
             <ShoppingBag size={40} strokeWidth={1} />
           </div>
           <p className="text-xl text-muted-foreground italic font-light">Your bag is currently empty.</p>
           <Button onClick={() => setView('marketplace')} className="bg-foreground text-background font-bold px-10 h-14 rounded-2xl text-lg hover:bg-foreground/90 transition-all">Start Collecting</Button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-16 items-start">
          <div id="cartItemsList" className="lg:col-span-2 space-y-6">
            {cart.map((item, idx) => (
              <motion.div 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, scale: 0.95 }}
                key={`${item.id}-${idx}`}
              >
                <Card className="p-6 border-border flex items-center gap-8 bg-white hover:border-primary/20 transition-all group">
                   <div className="h-32 w-28 rounded-2xl overflow-hidden bg-muted shrink-0">
                     <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                   </div>
                   <div className="flex-1 space-y-2">
                     <Badge variant="secondary" className="text-[10px] uppercase tracking-widest">{item.category}</Badge>
                     <h4 className="text-2xl font-display font-medium text-foreground">{item.name}</h4>
                     <p className="text-sm text-muted-foreground italic">By {item.seller}</p>
                   </div>
                   <div className="text-right space-y-4">
                     <p className="text-2xl font-display font-bold text-foreground">₹{item.price?.toLocaleString()}</p>
                     <button 
                        onClick={() => setCart(cart.filter((_, i) => i !== idx))}
                        className="text-[10px] uppercase tracking-widest text-destructive font-black hover:underline"
                      >
                       Remove
                     </button>
                   </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div id="cartSummary" className="lg:col-span-1 border border-border rounded-[3rem] p-10 bg-white shadow-2xl shadow-primary/5 sticky top-32">
             <h3 className="text-2xl font-display font-medium mb-8 border-b border-border pb-4">Summary</h3>
             <div className="space-y-6 mb-10">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal ({cart.length} items)</span>
                  <span className="font-bold">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="text-primary font-bold uppercase tracking-widest">Free</span>
                </div>
                <div className="pt-6 border-t border-border flex justify-between items-end">
                  <p className="text-[10px] uppercase tracking-widest font-black text-muted-foreground">Total Amount</p>
                  <p className="text-4xl font-display font-bold text-foreground">₹{subtotal.toLocaleString()}</p>
                </div>
             </div>
             <Button onClick={handleCheckout} className="w-full h-16 rounded-2xl bg-foreground text-background font-bold text-lg hover:bg-foreground/90 transition-all">
               Secure Checkout
             </Button>
             <p className="text-center text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-8 flex items-center justify-center gap-2">
               <Shield size={12} className="text-primary" /> Guaranteed Local Quality
             </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartView;
