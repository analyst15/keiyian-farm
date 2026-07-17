import { Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  return (
    <footer className="bg-[#0A2218] text-stone-300">
      
      {/* Upper Footer section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-stone-800/40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand Col */}
          <div id="about-section" className="scroll-mt-24 space-y-4">
            <div className="flex items-center">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/keiyian-farm.firebasestorage.app/o/Logo.png?alt=media&token=f1b428a9-5c7c-4e0f-b0fd-40d3206ba325"
                alt="Keiyian Farmers Co-operative Logo"
                className="h-20 w-auto object-contain brightness-0 invert"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-xs">
              Organizing smallholders in Trans Mara, Narok County to eliminate agricultural spoilage, reduce input costs, and secure competitive collective markets.
            </p>
          </div>

          {/* Links Column (Explore) */}
          <div className="space-y-4 text-xs">
            <h4 className="font-extrabold text-white text-sm tracking-wider uppercase font-sans">Explore</h4>
            <ul className="space-y-2.5">
              <li>
                <button 
                  onClick={() => {
                    setActiveTab('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }} 
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    setActiveTab('home');
                    setTimeout(() => {
                      const el = document.getElementById('about-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }} 
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    setActiveTab('home');
                    setTimeout(() => {
                      const el = document.getElementById('why-choose-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }} 
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Why Choose Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    setActiveTab('services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }} 
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Our Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    setActiveTab('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }} 
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Contacts Column */}
          <div id="contact-section" className="scroll-mt-24 space-y-4 text-xs">
            <h4 className="font-extrabold text-white text-sm tracking-wider uppercase font-sans">Contact Coordinates</h4>
            <ul className="space-y-3 font-mono text-stone-400">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>Trans Mara West, Narok County, Kenya</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                <a href="tel:+254721346564" className="hover:text-emerald-400 transition-colors">
                  +254 721 346564
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                <a href="mailto:info@keiyianfarm.co.ke" className="hover:text-emerald-400 transition-colors">
                  info@keiyianfarm.co.ke
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Partner and Copyright section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-xs text-stone-500 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          © {new Date().getFullYear()} Keiyian Farmers Co-operative Society Ltd. All rights reserved.
        </div>
        <div className="flex items-center space-x-4 border-t border-stone-800/20 pt-4 sm:border-0 sm:pt-0">
          <span className="text-3xs">Narok Cooperative Board</span>
        </div>
      </div>

    </footer>
  );
}
