import { useState, useEffect } from 'react';
import { Phone, MessageSquare, ArrowUp, ShieldCheck, Heart, MapPin, Clock, X } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import ServicesView from './components/ServicesView';
import GalleryView from './components/GalleryView';
import ContactView from './components/ContactView';
import WhatsAppOrderForm from './components/WhatsAppOrderForm';
import SEO from './components/SEO';
import { useTracker } from './hooks/useTracker';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  
  // Track globally
  useTracker(activeTab);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Check localStorage or system preference
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [showBackToTop, setShowBackToTop] = useState(false);
  const [complianceModal, setComplianceModal] = useState<'privacy' | 'terms' | 'disclaimer' | null>(null);

  // Sync Dark Mode state to root element
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Handle Scroll to toggle Back to Top visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get dynamic SEO contents based on active views
  const getSEOData = () => {
    switch (activeTab) {
      case 'about':
        return {
          title: 'About Our Store',
          description: 'Learn about the legacy, values, and milestone timeline of Ravindra Medical Hall. Managed by Ravindra Kumar in Makhdumpur, Bihar.',
          keywords: 'Ravindra Kumar pharmacist, pharmacy story Bihar, Ravindra Medical Hall history, trusted chemist Makhdumpur'
        };
      case 'services':
        return {
          title: 'Our Medical & Healthcare Services',
          description: 'Dedicated pharmacy services including genuine prescription dispensing, OTC drugs, infant care, diabetes monitoring, and surgical items.',
          keywords: 'diabetic care Bihar, BP monitor Jehanabad, baby supplies Makhdumpur, surgical bandage, healthcare devices'
        };
      case 'gallery':
        return {
          title: 'Store Front & Inventory Gallery',
          description: 'Browse photos of our physical pharmacy front, organized medicine shelves, cold-chain refrigeration units, and clinical monitors.',
          keywords: 'pharmacy photos Bihar, medicine stock gallery, store front Ravindra Medical Hall'
        };
      case 'contact':
        return {
          title: 'Contact Details & Address Location',
          description: 'Get directions to Ravindra Medical Hall on Makhdumpur Road, Bihar. Send us inquiries or call our direct chemistry desk.',
          keywords: 'Ravindra Medical Hall address, phone 09835669082, pharmacy location Pai Bigha, working hours'
        };
      case 'order':
        return {
          title: 'WhatsApp Prescription Order Form',
          description: 'Submit your patient details and medicine lists. Easily upload physical prescription photos for rapid WhatsApp packaging.',
          keywords: 'order medicines WhatsApp Bihar, prescription upload chemist, online pharmacy Makhdumpur'
        };
      case 'home':
      default:
        return {
          title: 'Ravindra Medical Hall | Trusted Pharmacy in Pai Bigha, Bihar',
          description: 'Your premier store for 100% genuine medicines, pediatric products, orthopedic supports, diagnostic devices, and easy WhatsApp prescription orders.',
          keywords: 'genuine medicines Makhdumpur, pharmacy Pai Bigha, medical shop Bihar, digital thermometer Omron, click to call pharmacy'
        };
    }
  };

  const seoData = getSEOData();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300 flex flex-col">
      {/* 1. Dynamic SEO Metadata & Schema Injector */}
      <SEO 
        title={seoData.title} 
        description={seoData.description} 
        keywords={seoData.keywords} 
        activeTab={activeTab} 
      />

      {/* 2. STICKY HEADER */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode} 
      />

      {/* 3. BREADCRUMBS BANNER (Only on sub-tabs) */}
      {activeTab !== 'home' && (
        <div className="bg-gray-50 dark:bg-slate-900 border-b border-gray-100 dark:border-slate-850/60 py-3 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-1.5 flex-wrap">
            <button 
              onClick={() => setActiveTab('home')} 
              className="hover:text-[#0A8F6A] hover:underline cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-gray-800 dark:text-gray-200 font-semibold capitalize">
              {activeTab === 'order' ? 'WhatsApp Order Form' : activeTab}
            </span>
          </div>
        </div>
      )}

      {/* 4. MAIN PAGE VIEW WRAPPER */}
      <main className="flex-grow">
        {activeTab === 'home' && <HomeView setActiveTab={setActiveTab} />}
        {activeTab === 'about' && <AboutView />}
        {activeTab === 'services' && <ServicesView />}
        {activeTab === 'gallery' && <GalleryView />}
        {activeTab === 'contact' && <ContactView />}
        {activeTab === 'order' && (
          <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <WhatsAppOrderForm />
          </div>
        )}
      </main>

      {/* 5. FOOTER SECTION */}
      <Footer 
        setActiveTab={setActiveTab} 
        openModal={setComplianceModal} 
      />

      {/* 6. FLOATING ACTION CONTROLS */}
      
      {/* A. Floating Call button (Bottom-Left) */}
      <a
        href="tel:09835669082"
        className="fixed bottom-6 left-6 z-45 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-tr from-blue-600 to-indigo-500 text-white rounded-full shadow-lg hover:scale-105 transition-transform animate-bounce-slow cursor-pointer"
        title="Call Ravindra Medical Hall"
        aria-label="Call Store"
      >
        <Phone className="w-5.5 h-5.5 sm:w-6 sm:h-6 fill-current" />
      </a>

      {/* B. Floating WhatsApp Form trigger button (Bottom-Right) */}
      <button
        onClick={() => {
          setActiveTab('order');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-tr from-[#0A8F6A] to-emerald-400 text-white rounded-full shadow-lg hover:scale-105 transition-transform cursor-pointer relative"
        title="WhatsApp Medicine Order Form"
        aria-label="Open WhatsApp Form"
      >
        <MessageSquare className="w-5.5 h-5.5 sm:w-6 sm:h-6" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse flex items-center justify-center text-[8px] font-black">
          1
        </span>
        <span className="absolute inset-0 rounded-full bg-emerald-400/35 -z-10 animate-ping-slow" />
      </button>

      {/* C. Back To Top (Stacked above WhatsApp on bottom-right) */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-22 right-6 z-40 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-300 border border-gray-150 dark:border-slate-800 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-slate-800 transition-all cursor-pointer animate-fade-in"
          title="Back to Top"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4.5 h-4.5" />
        </button>
      )}

      {/* 7. COMPLIANCE MODALS (PRIVACY / TERMS / DISCLAIMER) */}
      {complianceModal !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-800 w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[85vh]">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between bg-gray-50 dark:bg-slate-900/50">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#0A8F6A]" />
                <span>
                  {complianceModal === 'privacy' && 'Patient Records & Privacy Policy'}
                  {complianceModal === 'terms' && 'Terms of Purchase & Dispensing'}
                  {complianceModal === 'disclaimer' && 'Healthcare Information Disclaimer'}
                </span>
              </h3>
              <button 
                onClick={() => setComplianceModal(null)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto text-xs sm:text-sm text-gray-650 dark:text-gray-350 space-y-4 leading-relaxed">
              {complianceModal === 'privacy' && (
                <>
                  <p className="font-bold text-gray-900 dark:text-white">1. Patient Confidentiality First</p>
                  <p>At Ravindra Medical Hall, patient privacy is highly sacred. All records, phone numbers, addresses, and physical or digital prescription files shared with us via our staff, email, or our WhatsApp Order Form are kept under complete confidentiality.</p>
                  
                  <p className="font-bold text-gray-900 dark:text-white">2. File Retention Procedures</p>
                  <p>Prescription images uploaded on our quick order forms are used solely for drug safety verification by our qualified chemists. We do not store patient health charts on external web databases, nor do we disclose them to secondary advertisers.</p>
                  
                  <p className="font-bold text-gray-900 dark:text-white">3. Third-Party Interactions</p>
                  <p>We maintain no secondary tracker cookies that spy on patient medication schedules. Your data remains strictly local within our register logs at our physical Pai Bigha store.</p>
                </>
              )}

              {complianceModal === 'terms' && (
                <>
                  <p className="font-bold text-gray-900 dark:text-white">1. Mandatory Prescription Checks (Scheduled Formulations)</p>
                  <p>We strictly comply with the Drugs and Cosmetics Act of India. Scheduled formulations, strong antibiotics, hormones, and diabetic insulins require a valid medical prescription issued by a registered doctor.</p>
                  
                  <p className="font-bold text-gray-900 dark:text-white">2. Sourcing and Authenticity</p>
                  <p>We guarantee 100% genuine healthcare goods with direct authorized channels. We do not engage in parallel trading of unverified generic substitutes without patient authorization.</p>
                  
                  <p className="font-bold text-gray-900 dark:text-white">3. Cash Receipts & Memo Files</p>
                  <p>Patients are provided with direct receipts corresponding to their purchases. Refunds/exchanges are honored within 7 days under closed, original package rules, excluding cold storage dependencies (which cannot be returned once they leave the cold chain).</p>
                </>
              )}

              {complianceModal === 'disclaimer' && (
                <>
                  <p className="font-bold text-gray-900 dark:text-white">1. General Informational Use Only</p>
                  <p>The health parameters, common drug descriptions, and equipment usage briefs mentioned on this platform are designed purely for public educational reference. They must never be considered substitutes for skilled clinical diagnosis or emergency hospital procedures.</p>
                  
                  <p className="font-bold text-gray-900 dark:text-white">2. Direct Consultation Requirement</p>
                  <p>Never adjust your medication dosages or drug routines solely based on online articles. Always seek direct medical checkups from a registered practitioner prior to purchasing scheduled drugs.</p>
                  
                  <p className="font-bold text-gray-900 dark:text-white">3. Platform Liability Disclaimer</p>
                  <p>Ravindra Medical Hall does not operate as an online telemedicine consultation desk and assumes zero diagnostic liabilities. All pharmaceutical purchases are executed under physical client verification guidelines.</p>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-100 dark:border-slate-800 text-right bg-gray-50 dark:bg-slate-900/50">
              <button
                onClick={() => setComplianceModal(null)}
                className="px-4.5 py-2 rounded-xl bg-[#0A8F6A] hover:bg-[#087859] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
              >
                I Understand & Accept
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
