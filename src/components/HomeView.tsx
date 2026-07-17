import { useState, ChangeEvent } from 'react';
import { 
  Phone, MessageSquare, MapPin, Search, CheckCircle, Shield, Sparkles, 
  UserCheck, DollarSign, Clock, Heart, Award, ArrowRight, Star, Plus, Minus, Check, AlertTriangle
} from 'lucide-react';
import { MedicineProduct, Testimonial, FAQItem } from '../types';

interface HomeViewProps {
  setActiveTab: (tab: string) => void;
}

export default function HomeView({ setActiveTab }: HomeViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<MedicineProduct[]>([]);
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  // Searchable Medicines Database
  const medicineDatabase: MedicineProduct[] = [
    { id: 'm1', name: 'Paracetamol (Calpol 650mg)', category: 'Tablets', type: 'Tablet', description: 'Used for pain relief and reducing fever.', requiresPrescription: false, brand: 'GSK' },
    { id: 'm2', name: 'Cetirizine (Alerid 10mg)', category: 'Tablets', type: 'Tablet', description: 'Anti-allergic medication for cold and sneeze.', requiresPrescription: false, brand: 'Cipla' },
    { id: 'm3', name: 'Pantoprazole (Pan-D)', category: 'Capsules', type: 'Capsule', description: 'Relieves acidity, heartburn, and gas reflux.', requiresPrescription: true, brand: 'Alkem' },
    { id: 'm4', name: 'Amoxicillin (Novamox 500mg)', category: 'Capsules', type: 'Capsule', description: 'Broad-spectrum antibiotic for bacterial infections.', requiresPrescription: true, brand: 'Cipla' },
    { id: 'm5', name: 'Multivitamin (Zincovit)', category: 'Vitamins', type: 'Tablet', description: 'Premium nutritional supplement for immunity boosting.', requiresPrescription: false, brand: 'Apex' },
    { id: 'm6', name: 'Glycomet (Metformin 500mg)', category: 'Diabetic Care', type: 'Tablet', description: 'Oral diabetes medicine for blood sugar control.', requiresPrescription: true, brand: 'USV' },
    { id: 'm7', name: 'Benadryl Cough Syrup (100ml)', category: 'Syrups', type: 'Syrup', description: 'Relieves dry cough, throat irritation, and runny nose.', requiresPrescription: false, brand: 'Kenvue' },
    { id: 'm8', name: 'ORS (Electral Powder 21g)', category: 'Personal Hygiene', type: 'Supplements', description: 'WHO-approved formula for hydration & energy.', requiresPrescription: false, brand: 'FDC' },
    { id: 'm9', name: 'Digital Blood Pressure Monitor', category: 'Medical Equipment', type: 'Device', description: 'High-precision automatic digital BP monitoring.', requiresPrescription: false, brand: 'Omron' },
    { id: 'm10', name: 'Digital Thermometer', category: 'Medical Equipment', type: 'Device', description: 'Fast and accurate body temperature reading.', requiresPrescription: false, brand: 'Dr Trust' },
    { id: 'm11', name: 'Baby Diapers (Pampers M)', category: 'Baby Products', type: 'Supplements', description: 'Extra absorb dry pants for baby skin protection.', requiresPrescription: false, brand: 'P&G' },
    { id: 'm12', name: 'Cetaphil Moisturising Cream', category: 'Skin Care', type: 'Ointment', description: 'Dermatologist recommended intense hydration cream.', requiresPrescription: false, brand: 'Galderma' },
    { id: 'm13', name: 'Betadine 10% Ointment (15g)', category: 'Personal Hygiene', type: 'Ointment', description: 'Antiseptic ointment for minor cuts, burns, and wounds.', requiresPrescription: false, brand: 'Win-Medicare' },
    { id: 'm14', name: 'Crepe Bandage (7.5cm x 4m)', category: 'Orthopedic Support', type: 'Equipment', description: 'Elastic bandage providing soft compression and support.', requiresPrescription: false, brand: 'Dyna' },
    { id: 'm15', name: 'Lantus Solostar Insulin Pen', category: 'Diabetic Care', type: 'Injection', description: 'Long-acting insulin pen for blood sugar control.', requiresPrescription: true, brand: 'Sanofi' },
    { id: 'm16', name: 'Shelcal 500 (Calcium + D3)', category: 'Vitamins', type: 'Tablet', description: 'Essential calcium supplement for bone strength.', requiresPrescription: false, brand: 'Torrent' },
    { id: 'm17', name: 'Volini Pain Relief Gel (30g)', category: 'Personal Hygiene', type: 'Ointment', description: 'Instant multi-joint and back muscle pain reliever.', requiresPrescription: false, brand: 'Sun Pharma' },
    { id: 'm18', name: 'Knee Cap Elastic Support', category: 'Orthopedic Support', type: 'Equipment', description: 'Provides warmth and compression to stiff knee joints.', requiresPrescription: false, brand: 'Tynor' },
    { id: 'm19', name: 'Protein Supplement (Protinex 250g)', category: 'Protein Supplements', type: 'Supplements', description: 'High protein drink mix with vitamins & iron.', requiresPrescription: false, brand: 'Danone' },
    { id: 'm20', name: 'Nebulizer Machine', category: 'Medical Equipment', type: 'Device', description: 'Aerosol compressor nebulizer for respiratory care.', requiresPrescription: false, brand: 'Philips' }
  ];

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
    } else {
      const filtered = medicineDatabase.filter(m => 
        m.name.toLowerCase().includes(query.toLowerCase()) || 
        m.category.toLowerCase().includes(query.toLowerCase()) ||
        m.brand.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    }
  };

  const handleToggleItem = (medId: string) => {
    setAddedItems(prev => ({
      ...prev,
      [medId]: !prev[medId]
    }));
  };

  const proceedToOrderSelected = () => {
    const selectedMeds = medicineDatabase
      .filter(m => addedItems[m.id])
      .map(m => m.name)
      .join('\n');
    
    if (selectedMeds) {
      // We will open WhatsApp Order tab and prefill it if possible (via sessionStorage or simple state, 
      // let's save to localStorage so order tab can pick it up!)
      localStorage.setItem('prefilled_medicines', selectedMeds);
      setActiveTab('order');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Why Choose Us Info
  const whyChooseUs = [
    { title: '100% Genuine Medicines', desc: 'Directly sourced from trusted pharmaceutical distributors.', icon: Shield, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/35' },
    { title: 'Experienced Staff', desc: 'Consult with skilled personnel regarding schedules & items.', icon: UserCheck, color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/35' },
    { title: 'Affordable Prices', desc: 'Enjoy pocket-friendly discounts on essential healthcare.', icon: DollarSign, color: 'text-green-500 bg-green-50 dark:bg-green-950/35' },
    { title: 'Fast Service', desc: 'Zero wait times in-store, and quick packaging on WhatsApp.', icon: Clock, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/35' },
    { title: 'Prescription Dispensing', desc: 'Strict regulatory check of scheduled compositions.', icon: Award, color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/35' },
    { title: 'Healthcare Products', desc: 'BP devices, thermometers, vaporizers, and baby supplies.', icon: Heart, color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/35' },
    { title: 'Trusted Local Pharmacy', desc: 'Serving local patients in Makhdumpur region for years.', icon: CheckCircle, color: 'text-teal-500 bg-teal-50 dark:bg-teal-950/35' },
    { title: 'Easy WhatsApp Support', desc: 'Order by uploading prescriptions over WhatsApp.', icon: MessageSquare, color: 'text-cyan-500 bg-cyan-50 dark:bg-cyan-950/35' }
  ];

  // Featured Categories
  const categories = [
    { id: 'tablets', name: 'Tablets', desc: 'Painkillers, anti-allergic & generic prescriptions', icon: '💊', count: '1200+ Items' },
    { id: 'capsules', name: 'Capsules', desc: 'Antibiotics, acidity suppressants & vitamins', icon: '💊', count: '800+ Items' },
    { id: 'syrups', name: 'Syrups', desc: 'Cough mixtures, pediatric suspensions & tonics', icon: '🧪', count: '450+ Items' },
    { id: 'equipment', name: 'Medical Equipment', desc: 'BP monitors, nebulizers & thermometers', icon: '🩺', count: '150+ Items' },
    { id: 'supplements', name: 'Health Supplements', desc: 'Protein shakes, iron, calcium & minerals', icon: '🥛', count: '300+ Items' },
    { id: 'baby', name: 'Baby Care Products', desc: 'Diapers, lotions, baby shampoo & powders', icon: '👶', count: '250+ Items' },
    { id: 'skincare', name: 'Dermato & Skin Care', desc: 'Hypoallergenic creams, lotions & skin balms', icon: '🧴', count: '400+ Items' },
    { id: 'orthopedic', name: 'Orthopedic Supports', desc: 'Knee caps, crepe bandages & wrist splints', icon: '🩹', count: '200+ Items' }
  ];

  // Customer Reviews (6 reviews as requested)
  const testimonials: Testimonial[] = [
    { id: 't1', name: 'Rajeev Ranjan Singh', location: 'Pai Bigha', rating: 5, date: 'June 2026', text: 'Ravindra Medical Hall is our family store. The owner and workers are very friendly. They always provide genuine medicines and suggest exact compositions if any brand is out of stock. Highly recommended pharmacy in the region!' },
    { id: 't2', name: 'Anjali Kumari', location: 'Makhdumpur', rating: 5, date: 'May 2026', text: 'I ordered baby care items and a digital thermometer through their WhatsApp page. The response was extremely fast. They confirmed availability immediately and packaged everything perfectly. Outstanding service!' },
    { id: 't3', name: 'Manoj Kumar Yadav', location: 'Pai Bigha', rating: 5, date: 'July 2026', text: 'Best part of this store is transparency. They sell genuine medicines at a very reasonable rate compared to other big town stores. They also guided me carefully on the correct dosage of Metformin.' },
    { id: 't4', name: 'Dr. Sunil Sharma', location: 'Jehanabad', rating: 5, date: 'April 2026', text: 'As a medical practitioner, I am very picky about medicine storage. Ravindra Medical Hall manages temperature sensitive drugs like insulin extremely well. Truly authentic pharmacy!' },
    { id: 't5', name: 'Gopal Prasad', location: 'Tekari', rating: 5, date: 'March 2026', text: 'Amazing WhatsApp Ordering. I uploaded my grandmother prescription and they got all items ready so I just had to pick it up on my bike. Saved me so much time in traffic.' },
    { id: 't6', name: 'Sanjay Paswan', location: 'Makhdumpur Rd', rating: 4.8, date: 'June 2026', text: 'Very convenient location right on the main Makhdumpur road. They stock almost all major diabetic care supplies, orthopedic kneecaps, and general healthcare equipment. Excellent behavior.' }
  ];

  // 10 Pharmacy FAQs as requested
  const faqs: FAQItem[] = [
    { id: 'faq1', question: 'How can I verify if a medicine is in stock at Ravindra Medical Hall?', answer: 'You can search for common medications directly using our online Search Bar at the top of the homepage. Alternatively, you can send your list or a quick prescription image on WhatsApp (+91 98356 69082) for instant confirmation.' },
    { id: 'faq2', question: 'Do you require a doctor prescription for all medicines?', answer: 'No, prescription is not required for over-the-counter (OTC) products like pain relief gels, pediatric supplies, baby care products, health supplements, and daily hygiene essentials. However, for Scheduled drugs (like specific antibiotics, insulin, or psychiatric formulations), a valid doctor prescription is mandatory.' },
    { id: 'faq3', question: 'What is the easiest way to place an order?', answer: 'The easiest way is to use our custom WhatsApp Order page on this website. Fill out your details, list your medicines, drag-and-drop a photo of your prescription, and click "Send via WhatsApp". We will prepare your package immediately.' },
    { id: 'faq4', question: 'Are the medicines and equipment sold 100% genuine?', answer: 'Yes, absolutely. Ravindra Medical Hall only stocks authentic medicines sourced directly from registered pharmaceutical companies and licensed regional distributors. We adhere to strict quality control rules.' },
    { id: 'faq5', question: 'Do you offer home delivery in Pai Bigha and nearby areas?', answer: 'We support local packaging and priority pick-ups. For senior citizens or emergency medication needs in nearby Pai Bigha locales, please contact us directly on WhatsApp to coordinate special delivery options.' },
    { id: 'faq6', question: 'What are the payment methods accepted at your store?', answer: 'We accept Cash, UPI payments (Google Pay, PhonePe, Paytm, BHIM), and direct bank transfers. For pre-packaged WhatsApp pick-ups, you can pay digitally prior to arrival.' },
    { id: 'faq7', question: 'Do you stock temperature-sensitive medicines like Insulin?', answer: 'Yes, we have advanced refrigeration facilities inside our store to maintain appropriate cold chains for temperature-sensitive drugs like insulin, vaccines, and specific eye drops.' },
    { id: 'faq8', question: 'Can I return or exchange any purchased medicine?', answer: 'Medicines can be returned or exchanged within 7 days of purchase, provided the original cash receipt is presented, the packaging is entirely unopened, and the batch number matches our stock registers. Temperature-sensitive items cannot be returned due to safety regulations.' },
    { id: 'faq9', question: 'What are the working hours of Ravindra Medical Hall?', answer: 'We are open seven days a week (Monday to Sunday) from 08:00 AM to 10:00 PM. Emergency call support is available 24/7.' },
    { id: 'faq10', question: 'Can you arrange specific medicines that are rare or not in stock?', answer: 'Yes! If you require any specialized medication that is currently unavailable, we can specially source it for you within 24 to 48 hours from our principal distributors. Please share details with us on WhatsApp.' }
  ];

  const totalSelectedCount = Object.values(addedItems).filter(Boolean).length;

  return (
    <div className="space-y-16 pb-12">
      
      {/* 1. HERO SECTION WITH EMBEDDED SEARCH BOX */}
      <section className="relative overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        {/* Abstract Background pattern */}
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-900/20 dark:[mask-image:linear-gradient(0deg,rgba(15,23,42,0.8),rgba(15,23,42,0.2))] -z-10" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Hero Text */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900 text-xs sm:text-sm font-semibold text-[#0A8F6A] dark:text-emerald-400 w-fit mx-auto lg:mx-0">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Trusted Local Healthcare Partner</span>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white leading-tight">
                  Ravindra Medical Hall
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#0A8F6A] to-emerald-500 mt-1">
                    Your Trusted Pharmacy
                  </span>
                </h1>
                <p className="max-w-2xl text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mx-auto lg:mx-0">
                  Providing 100% genuine medicines, high-quality surgical supplies, baby care, personal hygiene and daily diagnostic devices at affordable rates in Pai Bigha, Makhdumpur, Bihar.
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  href="tel:09835669082"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0A8F6A] hover:bg-[#087859] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
                >
                  <Phone className="w-4.5 h-4.5" />
                  <span>Call 09835669082</span>
                </a>
                
                <button
                  onClick={() => setActiveTab('order')}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-gray-800 dark:text-white font-bold text-sm hover:bg-gray-50 dark:hover:bg-slate-800 shadow-sm transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4.5 h-4.5 text-[#0A8F6A]" />
                  <span>WhatsApp Order Form</span>
                </button>

                <a
                  href="https://maps.google.com/?q=Ravindra%20Medical%20Hall%2C%20Pai%20Bigha%2C%20Makhdumpur%2C%20Bihar%20804422"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-200 dark:border-slate-800 text-gray-600 dark:text-gray-300 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-slate-800 transition-all"
                >
                  <MapPin className="w-4.5 h-4.5 text-red-500" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>

            {/* Right Column: Dynamic Medicine Search & Quick Cart */}
            <div className="lg:col-span-5">
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800/80 shadow-xl p-5 sm:p-6 transition-all duration-300">
                <div className="mb-4">
                  <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                    <Search className="w-4.5 h-4.5 text-[#0A8F6A]" />
                    <span>In-Stock Medicine Search</span>
                  </h2>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    Search 20+ common essential items stocked at our store. Select items to generate your WhatsApp list automatically!
                  </p>
                </div>

                {/* Search Bar Input */}
                <div className="relative mb-4">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search e.g. Paracetamol, BP Monitor, Volini..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-950 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#0A8F6A] focus:ring-1 focus:ring-[#0A8F6A] text-sm"
                  />
                  <Search className="absolute left-3.5 top-3 w-4.5 h-4.5 text-gray-400" />
                </div>

                {/* Search Results Display */}
                {searchQuery.trim() !== '' ? (
                  <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                    {searchResults.length > 0 ? (
                      searchResults.map((med) => {
                        const isAdded = addedItems[med.id];
                        return (
                          <div 
                            key={med.id} 
                            className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-slate-800 bg-gray-50/30 dark:bg-slate-950/20 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-all text-xs"
                          >
                            <div className="space-y-0.5 max-w-[70%]">
                              <div className="font-semibold text-gray-900 dark:text-white flex items-center gap-1 flex-wrap">
                                <span>{med.name}</span>
                                {med.requiresPrescription && (
                                  <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900">
                                    Rx Required
                                  </span>
                                )}
                              </div>
                              <p className="text-[10px] text-gray-400 dark:text-gray-500 truncate">{med.description}</p>
                              <p className="text-[9px] text-[#0A8F6A] font-semibold uppercase tracking-wider">{med.brand}</p>
                            </div>
                            <button
                              onClick={() => handleToggleItem(med.id)}
                              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-bold text-[10px] transition-all cursor-pointer ${
                                isAdded 
                                  ? 'bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-950/30 dark:text-red-400' 
                                  : 'bg-emerald-50 hover:bg-emerald-100 text-[#0A8F6A] dark:bg-emerald-950/30 dark:text-emerald-400'
                              }`}
                            >
                              {isAdded ? (
                                <>
                                  <Minus className="w-3 h-3" />
                                  <span>Remove</span>
                                </>
                              ) : (
                                <>
                                  <Plus className="w-3 h-3" />
                                  <span>Add List</span>
                                </>
                              )}
                            </button>
                          </div>
                        );
                      })
                    ) : (
                      <div className="py-6 text-center text-gray-400 dark:text-gray-500 text-xs">
                        <AlertTriangle className="w-6 h-6 mx-auto mb-1 text-gray-300" />
                        No match found. Don't worry! We can procure any medicine within 24 hours. Submit your request via the Order Form.
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="py-8 text-center text-gray-400 dark:text-gray-500 text-xs border border-dashed border-gray-200 dark:border-slate-800 rounded-xl bg-gray-50/20 dark:bg-slate-950/10">
                    <Heart className="w-8 h-8 text-emerald-200 dark:text-slate-800 mx-auto mb-2" />
                    <span>Search above to locate genuine medicines in stock</span>
                  </div>
                )}

                {/* Selected Items Cart & Next Step */}
                {totalSelectedCount > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0A8F6A] dark:text-emerald-400">
                      {totalSelectedCount} item{totalSelectedCount > 1 ? 's' : ''} added to inquiry list
                    </span>
                    <button
                      onClick={proceedToOrderSelected}
                      className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-[#0A8F6A] hover:bg-[#087859] text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
                    >
                      <span>Proceed to Order</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-white">
            Why Local Customers Choose Us
          </h2>
          <p className="max-w-2xl text-xs sm:text-sm text-gray-500 dark:text-gray-400 mx-auto">
            Sustaining lives with genuine healthcare services, certified medicinal checks, transparent billing, and dedicated pharmacy personnel.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseUs.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={idx} 
                className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800/80 shadow-sm hover:shadow-md hover:border-[#0A8F6A] dark:hover:border-emerald-600 transition-all duration-300 space-y-3"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. OUR SERVICES PREVIEW */}
      <section className="bg-emerald-50/40 dark:bg-slate-900/40 py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
            <div className="text-center md:text-left space-y-1.5">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-white">
                Complete Pharmacy Services
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Offering an extensive spectrum of diagnostics, pediatric needs, and authentic medications.
              </p>
            </div>
            <button
              onClick={() => {
                setActiveTab('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-1 text-sm font-bold text-[#0A8F6A] hover:text-[#087859] transition-all group"
            >
              <span>Explore All Services</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Prescription Dispensing', desc: 'Sourcing 100% genuine prescribed pharmaceuticals with regulatory inspections.', icon: '📜' },
              { title: 'Over-The-Counter (OTC) Drugs', desc: 'Cold formulas, pain relief balms, rehydrating salts, and daily remedies.', icon: '🩹' },
              { title: 'Pediatric & Baby Essentials', desc: 'Baby cereals, body lotions, powders, diapers, baby shampoo, and gentle supplies.', icon: '👶' },
              { title: 'Diabetic & BP Care', desc: 'Digital meters, testing strips, insulin storage facilities, and sugar-free items.', icon: '🩺' },
              { title: 'Surgical Dressing Items', desc: 'Crepe bandages, adhesive plasters, sterile cotton, and dressing kits.', icon: '🩹' },
              { title: 'Healthcare Devices', desc: 'Compressor nebulizers, vaporizers, automatic thermometers, and pulse oximeters.', icon: '🔌' },
            ].map((service, idx) => (
              <div 
                key={idx} 
                className="p-5 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="text-3xl mb-3.5">{service.icon}</div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-[#0A8F6A] transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED CATEGORIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-white">
            Featured Product Categories
          </h2>
          <p className="max-w-2xl text-xs sm:text-sm text-gray-500 dark:text-gray-400 mx-auto">
            Browse through our organized medicine shelves. We carry products across all key healthcare segments.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div 
              key={cat.id} 
              className="p-5 rounded-2xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-800 group transition-all text-center relative overflow-hidden"
            >
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-[10px] font-bold text-[#0A8F6A] dark:text-emerald-400">
                {cat.count}
              </div>
              <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950 text-2xl flex items-center justify-center mx-auto mb-3.5 group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white group-hover:text-[#0A8F6A] transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5 leading-relaxed">
                {cat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. STATS / TRUST SECTION */}
      <section className="bg-[#0A8F6A] text-white py-12 rounded-3xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 shadow-xl">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center divide-y md:divide-y-0 lg:divide-x divide-emerald-400/30">
          {[
            { metric: '100%', label: 'Genuine Medicines' },
            { metric: '8AM - 10PM', label: 'Working Hours' },
            { metric: 'UPI/Cash', label: 'Flexible Payment' },
            { metric: 'Experienced', label: 'Pharmacy Staff' },
            { metric: 'Reasonable', label: 'Pricing/Discounts' },
            { metric: 'Convenient', label: 'Main Road Location' },
          ].map((stat, idx) => (
            <div key={idx} className="pt-4 md:pt-0 first:pt-0 space-y-1 lg:px-2">
              <p className="text-xl sm:text-2xl font-black tracking-tight">{stat.metric}</p>
              <p className="text-[10px] sm:text-xs text-emerald-100 tracking-wider uppercase font-semibold">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. WORKING PROCESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-white">
            Our Simple Order Process
          </h2>
          <p className="max-w-2xl text-xs sm:text-sm text-gray-500 dark:text-gray-400 mx-auto">
            Procuring your essential healthcare supplies from the comfort of your home is simple. Just follow these steps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {[
            { step: '01', title: 'Visit Store / Website', desc: 'Walk in directly to our Pai Bigha store or open our website on your phone.' },
            { step: '02', title: 'Share Prescription', desc: 'Hand over physical prescription in store or upload on our WhatsApp Form.' },
            { step: '03', title: 'Get Medicines', desc: 'Our qualified staff packs correct formulations. Get your items quickly.' },
            { step: '04', title: 'Easy Payment', desc: 'Pay via Cash or choose direct UPI transfer (GPay, PhonePe, Paytm).' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-6 rounded-2xl shadow-sm relative group">
              <span className="text-3xl font-black text-emerald-100 dark:text-slate-800 group-hover:text-emerald-300 transition-colors absolute top-4 right-4">
                {item.step}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white mt-2">
                {item.title}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CUSTOMER TESTIMONIALS */}
      <section id="testimonials" className="bg-slate-50 dark:bg-slate-900/60 py-16 scroll-mt-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-white">
              What Our Customers Say
            </h2>
            <p className="max-w-2xl text-xs sm:text-sm text-gray-500 dark:text-gray-400 mx-auto">
              Read authentic feedback from local patients, mothers, and doctors who depend on Ravindra Medical Hall for their medical requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((test) => (
              <div 
                key={test.id} 
                className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-md transition-all"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 italic leading-relaxed">
                    "{test.text}"
                  </p>
                </div>
                
                <div className="pt-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between mt-4">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">{test.name}</h4>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500">{test.location}</span>
                  </div>
                  <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950/40 text-[#0A8F6A] px-2 py-0.5 rounded font-semibold">
                    {test.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ SECTION */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 scroll-mt-20">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Have queries regarding medications, prescriptions, or ordering? Find your answers below.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => {
            const isOpen = activeFaq === faq.id;
            return (
              <div 
                key={faq.id} 
                className="border border-gray-150 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-850/30 transition-all cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <span className={`text-[#0A8F6A] text-lg font-black transform transition-transform duration-350 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
                    ＋
                  </span>
                </button>
                
                {isOpen && (
                  <div className="px-5 pb-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed border-t border-gray-50 dark:border-slate-800 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. GOOGLE MAP SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-150 dark:border-slate-800 shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          <div className="p-6 sm:p-8 lg:p-10 lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#0A8F6A] font-bold">Physical Location</span>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white mt-1">
                Visit Our Physical Store
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                We are conveniently located on the prominent Makhdumpur Road. Safe vehicle parking and smooth accessibility available.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-xs">
                <MapPin className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Store Address</h4>
                  <p className="text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
                    Titaiganj Pai Bigha - Makhdumpur Rd, Pai Bigha, Makhdumpur, Bihar 804422
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-xs">
                <Clock className="w-5 h-5 text-[#0A8F6A] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Store Timings</h4>
                  <p className="text-gray-500 dark:text-gray-400 mt-0.5">
                    Monday to Sunday: 08:00 AM - 10:00 PM
                  </p>
                </div>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=Ravindra%20Medical%20Hall%2C%20Pai%20Bigha%2C%20Makhdumpur%2C%20Bihar%20804422"
              target="_blank"
              rel="noreferrer"
              className="w-fit flex items-center gap-1.5 text-xs font-bold text-[#0A8F6A] hover:text-[#087859] border-b border-[#0A8F6A]/30 pb-1"
            >
              <span>Get Precise Route on Google Maps</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="h-[300px] lg:h-auto lg:col-span-7 bg-gray-100 relative">
            <iframe
              src="https://maps.google.com/maps?q=Ravindra%20Medical%20Hall%2C%20Pai%20Bigha%2C%20Makhdumpur%2C%20Bihar%20804422&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer"
              title="Ravindra Medical Hall Google Map Location"
            />
          </div>

        </div>
      </section>

      {/* 10. CONTACT CTA SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-[#0A8F6A] to-emerald-500 text-white rounded-3xl p-6 sm:p-10 text-center space-y-6 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/5 rounded-full blur-2xl" />

          <div className="max-w-2xl mx-auto space-y-2">
            <h2 className="text-xl sm:text-3xl font-black">Need Urgent Medicines or Devices?</h2>
            <p className="text-xs sm:text-sm text-emerald-50 opacity-90 leading-relaxed">
              Don't compromise on your health. Call our store directly to check formulation availability, or place an order via WhatsApp Form instantly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="tel:09835669082"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#0A8F6A] font-bold text-sm rounded-xl hover:bg-emerald-50 shadow-sm transition-all"
            >
              <Phone className="w-4.5 h-4.5" />
              <span>Call Us Now</span>
            </a>
            <button
              onClick={() => {
                setActiveTab('order');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-emerald-950/20 border border-white/20 hover:bg-emerald-950/30 text-white font-bold text-sm rounded-xl transition-all cursor-pointer"
            >
              <MessageSquare className="w-4.5 h-4.5" />
              <span>Order on WhatsApp</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
