import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, ArrowRight, IndianRupee, MapPin, FileText, PlusCircle } from 'lucide-react';
import { Button } from './ui';

const SellerDashboard = ({ user, setView }) => {
  const [pName, setPName] = useState('');
  const [pPrice, setPPrice] = useState('');
  const [pDesc, setPDesc] = useState('');
  const [pCity, setPCity] = useState(user.city || '');
  const apiUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/products`;

  const handleList = (e) => {
    e.preventDefault();
    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        name: pName, 
        price: pPrice, 
        desc: pDesc, 
        city: pCity, 
        sellerId: user.id, 
        category: 'Artisan',
        seller: user.name,
        image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&q=80'
      })
    }).then(() => {
      alert('Masterpiece Listed!');
      setPName(''); setPPrice(''); setPDesc('');
      setView('marketplace');
    });
  };

  return (
    <motion.div id="sellerRoot" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto py-20 px-6">
      <div className="grid lg:grid-cols-3 gap-16">
        <div id="sellerSidebar" className="lg:col-span-1 space-y-8">
          <div id="sellerStudioInf" className="p-10 bg-white border border-border rounded-[2rem] shadow-sm space-y-6">
            <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <Package size={32} strokeWidth={1.5} />
            </div>
            <h2 className="text-4xl font-display font-medium text-foreground">Seller Studio</h2>
            <p className="text-muted-foreground font-light leading-relaxed">
              Bring your handcrafted legacy to our conscious community. Every listing supports local heritage.
            </p>
          </div>
          
          <div id="listingTips" className="p-8 bg-muted border border-border rounded-[2rem] space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold">Listing Tips</h4>
            <ul className="text-sm text-muted-foreground space-y-4 font-light italic">
              <li className="flex items-start gap-3"><ArrowRight size={14} className="mt-1 text-primary shrink-0" /> Capture the natural texture</li>
              <li className="flex items-start gap-3"><ArrowRight size={14} className="mt-1 text-primary shrink-0" /> Share the story of your process</li>
              <li className="flex items-start gap-3"><ArrowRight size={14} className="mt-1 text-primary shrink-0" /> Ensure authenticity in every detail</li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-2">
          <form id="sellerStudioForm" onSubmit={handleList} className="bg-white border border-border rounded-[3rem] p-12 lg:p-16 space-y-10 shadow-2xl shadow-primary/5">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-primary font-bold ml-1">Product Title</label>
                <div className="flex items-center gap-3 p-4 bg-muted rounded-2xl border border-border focus-within:border-primary transition-all">
                  <Package size={18} className="text-muted-foreground" />
                  <input id="prodTitle" className="bg-transparent border-none outline-none text-foreground font-medium w-full" placeholder="Handwoven Silk Pashmina" value={pName} onChange={e => setPName(e.target.value)} required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-primary font-bold ml-1">Price (INR)</label>
                <div className="flex items-center gap-3 p-4 bg-muted rounded-2xl border border-border focus-within:border-primary transition-all">
                  <IndianRupee size={18} className="text-muted-foreground" />
                  <input id="prodPrice" className="bg-transparent border-none outline-none text-foreground font-medium w-full" type="number" placeholder="4500" value={pPrice} onChange={e => setPPrice(e.target.value)} required />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-primary font-bold ml-1">Location of Craft</label>
              <div className="flex items-center gap-3 p-4 bg-muted rounded-2xl border border-border focus-within:border-primary transition-all">
                <MapPin size={18} className="text-muted-foreground" />
                <input id="prodCity" className="bg-transparent border-none outline-none text-foreground font-medium w-full" placeholder="E.g. Pune, Maharashtra" value={pCity} onChange={e => setPCity(e.target.value)} required />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-primary font-bold ml-1">The Artisan Story</label>
              <div className="flex items-start gap-3 p-4 bg-muted rounded-2xl border border-border focus-within:border-primary transition-all min-h-[200px]">
                <FileText size={18} className="text-muted-foreground mt-1" />
                <textarea id="prodDesc" className="bg-transparent border-none outline-none text-foreground font-medium w-full h-full resize-none leading-relaxed" placeholder="Tell the story behind this handcrafted masterpiece..." value={pDesc} onChange={e => setPDesc(e.target.value)} required />
              </div>
            </div>

            <Button type="submit" id="listSubmitBtn" className="w-full h-18 rounded-[2rem] bg-foreground text-background hover:bg-foreground/90 font-bold text-lg">
              <PlusCircle size={24} className="mr-2" /> Publish to Global Marketplace
            </Button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default SellerDashboard;
