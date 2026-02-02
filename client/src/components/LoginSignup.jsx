import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, MapPin, Briefcase, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card, Input, Badge } from './ui';

const LoginSignup = ({ setView }) => {
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useAuth();
  
  // States
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [role, setRole] = useState('buyer');

  const apiUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/auth`;

  const handleSubmit = (e) => {
    e.preventDefault();
    const endpoint = isLogin ? 'login' : 'register';
    const payload = isLogin ? { email, password: pass } : { name, email, password: pass, city, role };
    
    fetch(`${apiUrl}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(r => r.ok ? r.json() : Promise.reject())
      .then(u => {
        if (isLogin) {
          login(u);
          setView('marketplace');
        } else {
          alert('Account created! Please sign in.');
          setIsLogin(true);
        }
      })
      .catch(() => alert('Authentication failed. Check your credentials.'));
  };

  return (
    <div id="authRoot" className="min-h-screen bg-muted flex items-center justify-center p-6 bg-gradient-to-br from-muted via-background to-muted">
      <motion.div 
        id="authCard"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-[1000px] grid md:grid-cols-2 rounded-[2rem] overflow-hidden shadow-2xl bg-white border border-border"
      >
        {/* Left Side: Editorial Image */}
        <div id="authHero" className="relative hidden md:block bg-foreground">
          <img 
            src="https://images.unsplash.com/photo-1513519245088-0e12902e35ca?q=80&w=2070&auto=format&fit=crop" 
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
          />
          <div className="absolute inset-0 p-16 flex flex-col justify-end text-white">
             <div className="w-14 h-14 bg-primary/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-8">
               <Sparkles className="text-white" size={28} />
             </div>
             <h2 className="text-5xl font-display font-light mb-6 leading-tight">
               Elevate the <br /><span className="italic font-medium text-primary">Local Legacy.</span>
             </h2>
             <p className="text-white/60 font-light text-lg max-w-xs leading-relaxed">
               Join a curated circle of master artisans and conscious patrons.
             </p>
          </div>
        </div>

        {/* Right Side: Professional Form */}
        <div id="authForm" className="p-16 flex flex-col justify-center">
          <div className="mb-12">
            <h1 className="text-4xl font-display font-medium text-foreground mb-3 leading-tight">
              {isLogin ? 'Welcome Back' : 'Create Legacy'}
            </h1>
            <p className="text-muted-foreground font-light italic">
              {isLogin ? 'Sign in to your curated dashboard' : 'Join the community of makers and shakers'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode='wait'>
              {!isLogin && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 overflow-hidden"
                >
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary ml-1">Full Name</label>
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-xl border border-border focus-within:border-primary/50 transition-all">
                      <User size={18} className="text-muted-foreground" />
                      <input className="bg-transparent border-none outline-none text-foreground text-sm w-full font-medium" placeholder="E.g. Aarav Sharma" value={name} onChange={e => setName(e.target.value)} required={!isLogin} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary ml-1">Indian City</label>
                      <div className="flex items-center gap-3 p-3 bg-muted rounded-xl border border-border focus-within:border-primary/50 transition-all">
                        <MapPin size={18} className="text-muted-foreground" />
                        <input className="bg-transparent border-none outline-none text-foreground text-sm w-full font-medium" placeholder="Mumbai" value={city} onChange={e => setCity(e.target.value)} required={!isLogin} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary ml-1">Your Role</label>
                      <div className="flex items-center gap-3 p-3 bg-muted rounded-xl border border-border focus-within:border-primary/50 transition-all">
                        <Briefcase size={18} className="text-muted-foreground" />
                        <select className="bg-transparent border-none outline-none text-foreground text-sm w-full font-medium appearance-none" value={role} onChange={e => setRole(e.target.value)}>
                          <option value="buyer">Shopper</option>
                          <option value="seller">Artisan</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary ml-1">Email Address</label>
              <div className="flex items-center gap-3 p-3 bg-muted rounded-xl border border-border focus-within:border-primary/50 transition-all">
                <Mail size={18} className="text-muted-foreground" />
                <input className="bg-transparent border-none outline-none text-foreground text-sm w-full font-medium" placeholder="aarav@artisan.com" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary ml-1">Secure Password</label>
              <div className="flex items-center gap-3 p-3 bg-muted rounded-xl border border-border focus-within:border-primary/50 transition-all">
                <Lock size={18} className="text-muted-foreground" />
                <input className="bg-transparent border-none outline-none text-foreground text-sm w-full font-medium" placeholder="••••••••" type="password" value={pass} onChange={e => setPass(e.target.value)} required />
              </div>
            </div>

            <Button type="submit" className="w-full h-14 rounded-2xl bg-foreground text-background hover:bg-foreground/90 font-bold text-base mt-6">
              {isLogin ? 'Enter Marketplace' : 'Create My Account'} <ArrowRight size={20} className="ml-2" />
            </Button>
          </form>

          <footer className="mt-10 text-center text-sm">
            <span className="text-muted-foreground font-light">{isLogin ? "Don't have an account?" : 'Already a member?'} </span>
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="text-primary font-bold hover:underline ml-1"
            >
              {isLogin ? 'Become a Member' : 'Sign In To Dashboard'}
            </button>
          </footer>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginSignup;
