import { useState } from 'react';
import { Menu, X, Phone, MessageSquare, Heart, Sun, Moon, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Header({ activeTab, setActiveTab, isDarkMode, toggleDarkMode }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'testimonials', label: 'Testimonials', isAnchor: true },
    { id: 'faq', label: 'FAQ', isAnchor: true },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    setIsOpen(false);
    if (item.isAnchor) {
      setActiveTab('home');
      setTimeout(() => {
        const element = document.getElementById(item.id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      setActiveTab(item.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo Section */}
          <div 
            onClick={() => handleNavClick({ id: 'home', label: 'Home' })} 
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0A8F6A] to-emerald-400 text-white shadow-md shadow-emerald-200 dark:shadow-none transform transition-transform group-hover:scale-105">
              <Heart className="w-5 h-5 fill-current" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-slate-950 animate-ping" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-1">
                Ravindra <span className="text-[#0A8F6A] font-extrabold">Medical</span>
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                Pai Bigha, Bihar
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id && !item.isAnchor;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-[#0A8F6A] font-semibold'
                      : 'text-gray-600 dark:text-gray-300 hover:text-[#0A8F6A] dark:hover:text-emerald-400 hover:bg-gray-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons & Dark Mode */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl border border-gray-200 dark:border-slate-800 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Call Now */}
            <a
              href="tel:09835669082"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#0A8F6A] text-[#0A8F6A] dark:text-emerald-400 dark:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-sm font-semibold transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Call Store</span>
            </a>

            {/* WhatsApp Order Form Trigger */}
            <button
              onClick={() => setActiveTab('order')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0A8F6A] hover:bg-[#097e5e] text-white text-sm font-semibold shadow-md hover:shadow-lg hover:shadow-emerald-100 dark:hover:shadow-none transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Order via WhatsApp</span>
            </button>
          </div>

          {/* Mobile Quick Panel Controls (Hamburger + Dark Mode) */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg border border-gray-200 dark:border-slate-800 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5 text-slate-700" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg border border-gray-200 dark:border-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden border-t border-gray-100 dark:border-slate-800/80 bg-white dark:bg-slate-900 transition-colors duration-300">
          <div className="px-4 pt-2 pb-6 space-y-1 sm:px-6">
            {navItems.map((item) => {
              const isActive = activeTab === item.id && !item.isAnchor;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`w-full text-left block px-4 py-3 rounded-xl text-base font-medium ${
                    isActive
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-[#0A8F6A] font-semibold border-l-4 border-[#0A8F6A]'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            <div className="pt-4 grid grid-cols-2 gap-3 border-t border-gray-100 dark:border-slate-800">
              <a
                href="tel:09835669082"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-800 text-gray-700 dark:text-gray-300 font-semibold text-sm hover:bg-gray-50 dark:hover:bg-slate-800 transition-all"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Call Store</span>
              </a>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setActiveTab('order');
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#0A8F6A] text-white font-semibold text-sm hover:bg-[#087b5c] shadow-sm transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Order</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
