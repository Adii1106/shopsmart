import { ShoppingBag, Store, LogOut } from 'lucide-react';
import { Button } from './ui';

const Navbar = ({ user, view, setView, cartCount, logout }) => {
  return (
    <nav id="mainNav" className="sticky top-0 z-50 bg-background/80 backdrop-blur-2xl border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <div onClick={() => setView('marketplace')} className="flex items-center gap-4 cursor-pointer group">
            <div id="navLogo" className="h-12 w-12 rounded-2xl bg-foreground flex items-center justify-center shadow-lg group-hover:-rotate-6 transition-transform">
              <Store className="h-6 w-6 text-background" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-2xl font-display font-semibold tracking-tight text-foreground">
                LocalLoop
              </h1>
              <p className="text-[10px] text-primary font-bold uppercase tracking-[0.3em]">Curated Crafts</p>
            </div>
          </div>
          
          <div id="navLinks" className="hidden lg:flex items-center gap-10">
            <button onClick={() => setView('marketplace')} className={`text-xs uppercase tracking-[0.2em] font-bold transition-colors ${view === 'marketplace' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>Discover</button>
            {user.role === 'seller' ? (
              <button 
                onClick={() => setView('seller')} 
                className={`text-xs uppercase tracking-[0.2em] font-bold transition-colors ${view === 'seller' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
              >
                Studio
              </button>
            ) : (
              <button 
                onClick={() => setView('orders')} 
                className={`text-xs uppercase tracking-[0.2em] font-bold transition-colors ${view === 'orders' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
              >
                Collection
              </button>
            )}
          </div>

          <div id="navActions" className="flex items-center gap-4">
            {user.role === 'buyer' && (
              <Button onClick={() => setView('cart')} variant="ghost" size="icon" className="text-foreground hover:text-primary relative hover:bg-muted rounded-xl h-11 w-11">
                <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 h-5 w-5 rounded-full bg-primary text-white text-[10px] flex items-center justify-center font-bold shadow-md ring-2 ring-background">
                    {cartCount}
                  </span>
                )}
              </Button>
            )}
            <Button onClick={logout} variant="outline" size="icon" className="h-11 w-11 rounded-xl border-border hover:bg-destructive hover:text-white transition-all group">
              <LogOut className="h-4 w-4 group-hover:scale-110 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
