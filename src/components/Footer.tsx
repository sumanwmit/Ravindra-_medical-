import { Heart, Phone, Mail, MapPin, MessageSquare, Clock, ShieldCheck, ArrowUp } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  openModal: (type: 'privacy' | 'terms' | 'disclaimer') => void;
}

export default function Footer({ setActiveTab, openModal }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 dark:bg-slate-950 border-t border-slate-800 transition-colors duration-300">
      
      {/* Upper Footer - Links and Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#0A8F6A] text-white">
                <Heart className="w-4.5 h-4.5 fill-current" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Ravindra <span className="text-emerald-400">Medical</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Your trusted partner in healthcare. Sourcing 100% genuine medicines, healthcare monitors, orthopedic supports, baby care and wellness products since establishment.
            </p>
            <div className="pt-2 flex flex-col space-y-2">
              <a 
                href="tel:09835669082" 
                className="flex items-center space-x-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors w-fit"
              >
                <Phone className="w-4 h-4" />
                <span>+91 98356 69082</span>
              </a>
              <span className="flex items-center space-x-2 text-sm text-slate-400">
                <Mail className="w-4 h-4 text-emerald-500" />
                <span>ravindramedical@gmail.com</span>
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Quick Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { id: 'home', label: 'Home Page' },
                { id: 'about', label: 'About Store' },
                { id: 'services', label: 'Our Services' },
                { id: 'gallery', label: 'Photo Gallery' },
                { id: 'contact', label: 'Contact Us' },
                { id: 'order', label: 'WhatsApp Order Form' }
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleLinkClick(item.id)}
                    className="hover:text-emerald-400 hover:underline transition-colors cursor-pointer text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services Offered */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Our Core Offerings
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>• Prescription Drugs</li>
              <li>• OTC Wellness & Cold Care</li>
              <li>• Pediatric & Baby Essentials</li>
              <li>• Surgical Dressing Supplies</li>
              <li>• Diabetic Care Supplies</li>
              <li>• Blood Pressure Monitors</li>
              <li>• Orthopedic Supporters</li>
              <li>• Daily Multivitamins</li>
            </ul>
          </div>

          {/* Column 4: Timings & Location */}
          <div className="space-y-4">
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-3 border-b border-slate-800 pb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Operating Timings</span>
              </h3>
              <p className="text-sm text-slate-300">Mon - Sun: 08:00 AM - 10:00 PM</p>
              <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Emergency Call Support 24/7 Available
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-400" />
                <span>Our Address</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Titaiganj Pai Bigha - Makhdumpur Rd, Pai Bigha, Makhdumpur, Jehanabad, Bihar 804422
              </p>
              <a
                href="https://maps.google.com/?q=Ravindra%20Medical%20Hall%2C%20Pai%20Bigha%2C%20Makhdumpur%2C%20Bihar%20804422"
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center space-x-1.5 text-xs text-emerald-400 hover:text-emerald-300 transition-colors border-b border-emerald-500/30 pb-0.5"
              >
                <span>Open Google Maps</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Middle Compliance Footer - Medical Disclaimer */}
      <div className="bg-slate-950 border-t border-slate-800/60 py-6 text-center text-xs text-slate-500 px-4">
        <div className="max-w-4xl mx-auto space-y-2">
          <p className="font-semibold text-slate-400 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4.5 h-4.5 text-[#0A8F6A]" />
            <span>MEDICAL DISCLAIMER</span>
          </p>
          <p className="leading-relaxed">
            All medicinal products, dosage guides, and health parameters listed on this website are for general informational purposes only. Ravindra Medical Hall does not provide medical consultations. We strictly advise presenting a valid doctor prescription for scheduled formulations. Always consult with a registered medical practitioner regarding health conditions.
          </p>
        </div>
      </div>

      {/* Lower Footer - Copyright & Action links */}
      <div className="bg-slate-950 border-t border-slate-900 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            &copy; {currentYear} Ravindra Medical Hall. All rights reserved. | Sourced and updated in Pai Bigha, Bihar.
          </div>
          <div className="flex flex-wrap gap-4 text-xs">
            <button 
              onClick={() => openModal('privacy')} 
              className="text-slate-500 hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-slate-800">|</span>
            <button 
              onClick={() => openModal('terms')} 
              className="text-slate-500 hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <span className="text-slate-800">|</span>
            <button 
              onClick={() => openModal('disclaimer')} 
              className="text-slate-500 hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Disclaimer
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
}
