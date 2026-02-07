import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Clock } from 'lucide-react';
import { Card, Badge } from './ui';

const OrdersView = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    if (user?.id) {
       fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/orders/${user.id}`)
        .then(r => r.ok ? r.json() : Promise.reject())
        .then(setOrders)
        .catch(() => console.error('Failed to load orders.'));
    }
  }, [user]);

  return (
    <div id="ordersRoot" className="max-w-4xl mx-auto py-32 px-6">
      <h2 className="text-6xl font-display font-light mb-16 italic">Your Handpicked Collection</h2>
      <div id="orderList" className="space-y-8">
        {orders.length === 0 ? (
          <div id="noOrders" className="py-20 text-center border-2 border-dashed border-border rounded-[3rem] text-muted-foreground italic font-light">
            No orders found yet. Start your journey in the marketplace.
          </div>
        ) : orders.map(o => (
          <Card key={o.id} id="orderCard" className="p-10 border-border hover:border-primary/20 transition-all bg-white relative overflow-hidden group">
             <div className="absolute top-0 right-0 h-24 w-24 bg-primary/5 rounded-bl-[5rem] -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
             <div className="flex justify-between items-start relative z-10">
               <div className="space-y-4">
                 <Badge variant="outline" className="text-primary border-primary/20 uppercase tracking-widest text-[10px]">Order ID: {o.id}</Badge>
                 <h4 className="text-3xl font-display font-medium text-foreground">{o.items?.map(i => i.name).join(', ')}</h4>
                 <div className="flex items-center gap-3 text-xs text-primary font-bold uppercase tracking-widest">
                   <Clock size={14} /> {o.status}
                 </div>
               </div>
               <div className="text-right space-y-2">
                 <p className="text-3xl font-display font-bold text-foreground">₹{o.total?.toLocaleString()}</p>
                 <p className="text-xs text-muted-foreground uppercase tracking-widest">{o.date}</p>
               </div>
             </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrdersView;
