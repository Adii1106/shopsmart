const Footer = () => {
  return (
    <footer id="footerRoot" className="bg-foreground text-background py-32">
      <div id="footerContent" className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-primary rounded-2xl flex items-center justify-center font-display text-white text-xl shadow-lg">L</div>
            <h3 className="text-3xl font-display font-medium text-white italic tracking-tight underline decoration-primary/30 underline-offset-8">LocalLoop</h3>
          </div>
          <p className="text-muted-foreground font-light text-sm italic max-w-xs leading-relaxed">
            "Bridging the distance between heritage and home. Supporting master artisans in every neighborhood."
          </p>
        </div>
        
        <div className="flex gap-16 lg:gap-32">
           <div className="space-y-6">
             <p className="text-[10px] uppercase tracking-[0.4em] font-black opacity-30">Legal Heritage</p>
             <ul className="text-xs space-y-3 font-light opacity-60">
               <li className="hover:text-primary cursor-pointer transition-colors hover:translate-x-1 duration-300">Privacy Policy</li>
               <li className="hover:text-primary cursor-pointer transition-colors hover:translate-x-1 duration-300">Terms of Craft</li>
               <li className="hover:text-primary cursor-pointer transition-colors hover:translate-x-1 duration-300">Cookie Protocol</li>
             </ul>
           </div>
           <div className="space-y-6">
             <p className="text-[10px] uppercase tracking-[0.4em] font-black opacity-30">Artisan Social</p>
             <ul className="text-xs space-y-3 font-light opacity-60">
               <li className="hover:text-primary cursor-pointer transition-colors hover:translate-x-1 duration-300">Instagram</li>
               <li className="hover:text-primary cursor-pointer transition-colors hover:translate-x-1 duration-300">Artisan Stories</li>
               <li className="hover:text-primary cursor-pointer transition-colors hover:translate-x-1 duration-300">Pinterest</li>
             </ul>
           </div>
        </div>
      </div>
      <div id="footerLegal" className="max-w-7xl mx-auto px-6 mt-32 pt-12 border-t border-white/5 text-center">
         <p className="text-[10px] uppercase tracking-[0.5em] opacity-20 font-black">© 2026 LocalLoop. Handcrafted With Heart In India.</p>
      </div>
    </footer>
  );
};

export default Footer;
