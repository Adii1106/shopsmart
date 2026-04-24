import { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import Marketplace from './components/Marketplace';
import LoginSignup from './components/LoginSignup';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartView from './components/CartView';
import OrdersView from './components/OrdersView';
import SellerDashboard from './components/SellerDashboard';
import { AnimatePresence } from 'framer-motion';

function App() {
  const { user, loading, logout } = useAuth();
  const [view, setView] = useState('marketplace');
  const [cart, setCart] = useState([]);
  
  // Marketplace Filter State
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [isChangingCity, setIsChangingCity] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Handle adding to cart
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Handle removing from cart
  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background">
        <div className="text-2xl font-display italic animate-pulse text-primary">
          Curating your experience...
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginSignup setView={setView} />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar 
        user={user} 
        view={view} 
        setView={setView} 
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
        logout={logout} 
      />
      
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {view === 'marketplace' && (
            <Marketplace 
              key="marketplace"
              user={user}
              addToCart={addToCart}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              isChangingCity={isChangingCity}
              setIsChangingCity={setIsChangingCity}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          )}
          
          {view === 'cart' && (
            <CartView 
              key="cart"
              cart={cart}
              setCart={setCart}
              removeFromCart={removeFromCart}
              setView={setView}
            />
          )}

          {view === 'orders' && (
            <OrdersView 
              key="orders"
              user={user}
            />
          )}

          {view === 'seller' && user.role === 'seller' && (
            <SellerDashboard 
              key="seller"
              user={user}
            />
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default App;
