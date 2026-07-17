import { useState, ComponentType, ChangeEvent, FormEvent } from 'react';
import { 
  FileText, ShieldCheck, HeartPulse, Sparkles, Activity, AlertTriangle, 
  MessageSquare, ChevronDown, ChevronUp, Clock, PhoneCall, HelpCircle
} from 'lucide-react';

interface ServiceDetail {
  id: string;
  title: string;
  icon: ComponentType<{ className?: string }>;
  color: string;
  shortDesc: string;
  longDesc: string;
  popularItems: string[];
  precautions?: string;
}

export default function ServicesView() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  // Inquiry form states
  const [inquiryData, setInquiryData] = useState({
    name: '',
    phone: '',
    service: 'Prescription Medicines',
    question: ''
  });

  const services: ServiceDetail[] = [
    {
      id: 'prescription',
      title: 'Prescription Medicines',
      icon: FileText,
      color: 'bg-emerald-50 text-[#0A8F6A] dark:bg-emerald-950/30 dark:text-emerald-400',
      shortDesc: 'Verification and dispensing of authentic, doctor-prescribed medications.',
      longDesc: 'We maintain strict health and compliance checks. Our qualified staff examines chemical compounds, batch configurations, and dosage levels to dispense precisely what your medical practitioner has prescribed.',
      popularItems: ['Cardiac/Hypertension medications', 'Broad-spectrum antibiotics', 'Neurological medications', 'Thyroid regulatory drugs'],
      precautions: 'Requires a valid doctor prescription. Photo upload is mandatory for scheduled medications.'
    },
    {
      id: 'general',
      title: 'General Medicines (OTC)',
      icon: HeartPulse,
      color: 'bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-450',
      shortDesc: 'Over-the-counter remedies for immediate relief from common symptoms.',
      longDesc: 'Easy access to common symptom suppressants. We stock highly effective formulations for cold, fever, pain, digestive issues, and mild allergies without demanding physical prescriptions.',
      popularItems: ['Antacids & gas relief tablets', 'Paracetamol & painkillers', 'Anti-allergy cold capsules', 'Rehydration solutions (ORS)'],
    },
    {
      id: 'supplements',
      title: 'Health Supplements',
      icon: Sparkles,
      color: 'bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400',
      shortDesc: 'Nutritional supplements to complete your vitamins, protein, and minerals.',
      longDesc: 'Fuel your body with vital nutrients. We house global supplement brands carrying high-purity vitamins, multivitamins, zinc formulations, bone calcium, and protein powder mixes.',
      popularItems: ['Calcium + D3 tablets', 'Immunity-boosting Multivitamins', 'Specialized protein drink powders', 'Omega-3 Fish Oil capsules'],
    },
    {
      id: 'baby',
      title: 'Baby Care Products',
      icon: Activity,
      color: 'bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400',
      shortDesc: 'Premium baby hygiene and nutrition essentials for your child safety.',
      longDesc: 'Specially engineered products for sensitive baby skin. From top baby food formulas and rehydrating mixtures to extra-dry diapers, baby oils, powders, and gentle washes.',
      popularItems: ['Infant dry diapers (All sizes)', 'Hypoallergenic baby body wash & powder', 'Infant milk formulas', 'Baby massage oils & wet wipes'],
    },
    {
      id: 'personal',
      title: 'Personal Care Products',
      icon: Sparkles,
      color: 'bg-purple-50 text-purple-600 dark:bg-purple-950/30 dark:text-purple-400',
      shortDesc: 'Daily skin, oral, and hair hygiene essentials for absolute health.',
      longDesc: 'Maintain your physical hygiene routine. We stock premium dermatologist-recommended moisturizers, herbal soaps, daily shampoos, toothpaste, and complete adult personal wellness items.',
      popularItems: ['Dermatological moisturizing lotions', 'Antiseptic handwashes & soaps', 'Oral care tubes and brushes', 'Shampoos and hair oils'],
    },
    {
      id: 'equipment',
      title: 'Medical Equipment',
      icon: Activity,
      color: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-400',
      shortDesc: 'Modern diagnostic devices to track body parameters accurately at home.',
      longDesc: 'Keep constant vigilance over vital stats. We offer highly precise, durable, and battery-operated monitors designed for simple home evaluations without complex calibration.',
      popularItems: ['Automatic blood pressure monitors', 'High-accuracy digital thermometers', 'Aerosol nebulizer compressors', 'Pulse oximeters'],
    },
    {
      id: 'surgical',
      title: 'Surgical Supplies',
      icon: HeartPulse,
      color: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-950/30 dark:text-cyan-400',
      shortDesc: 'Bandages, tapes, and disposable dressings for surgical post-op.',
      longDesc: 'Durable and highly sterile hospital consumables. Perfect for surgical post-op dressing, joint compression, sterile storage, and minor clinic treatment support.',
      popularItems: ['Crepe bandages & orthopedic wraps', 'Adhesive micro-pore surgical tapes', 'Sterilized medical cotton rolls', 'Disposable surgical gloves & masks'],
    },
    {
      id: 'firstaid',
      title: 'First Aid Products',
      icon: ShieldCheck,
      color: 'bg-teal-50 text-teal-600 dark:bg-teal-950/30 dark:text-teal-400',
      shortDesc: 'Essential antiseptic gels and gauze to address emergency cuts.',
      longDesc: 'Be prepared for minor home accidents. We supply complete emergency first aid gear to disinfect, cover, and soothe burns, wounds, cuts, and sudden insect bites.',
      popularItems: ['Antiseptic betadine gels & ointments', 'Liquid Dettol/Savlon bottles', 'Pre-cut band-aids', 'Sterile gauze gauze pads'],
    },
    {
      id: 'diabetic',
      title: 'Diabetic Care',
      icon: Activity,
      color: 'bg-orange-50 text-orange-600 dark:bg-orange-950/30 dark:text-orange-400',
      shortDesc: 'Advanced glucose tracking meters, strips, and chilled storage.',
      longDesc: 'Managing diabetes is easy when monitors are exact. We stock blood glucose tracking machines, testing strip refills, sugar substitutes, and keep temperature-secure insulin pens.',
      popularItems: ['Insulin pen devices & cartridges', 'Blood glucose testing meters', 'Testing strip cartridges', 'Sugar-free sweets & sweeteners'],
      precautions: 'Insulin requires continuous refrigeration. We supply them in protective ice packaging.'
    },
    {
      id: 'essentials',
      title: 'Healthcare Essentials',
      icon: Sparkles,
      color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400',
      shortDesc: 'Vaporizers, hot water bags, and general supportive wellness utilities.',
      longDesc: 'An assortment of secondary tools that comfort patients during colds, recovery, and daily stiffness. Excellent durability with certified heating/vapo seals.',
      popularItems: ['Steamer/Inhaler vaporizers', 'Electric hot water heating pads', 'Orthopedic knee/wrist supports', 'Adult diagnostic scales'],
    }
  ];

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleInquiryChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInquiryData(prev => ({ ...prev, [name]: value }));
  };

  const handleInquirySubmit = (e: FormEvent) => {
    e.preventDefault();
    const message = `Hello Ravindra Medical Hall,

I have a quick inquiry regarding your services:

👤 *CUSTOMER INQUIRY:*
• Name: ${inquiryData.name}
• Phone: ${inquiryData.phone}

📁 *SERVICE CATEGORY:*
• ${inquiryData.service}

❓ *MY QUESTION:*
• ${inquiryData.question}`;

    const encoded = encodeURIComponent(message);
    window.open(`https://api.whatsapp.com/send?phone=919835669082&text=${encoded}`, '_blank', 'noreferrer');
  };

  return (
    <div className="space-y-16 pb-12">
      
      {/* Services Title Header */}
      <section className="bg-gradient-to-br from-emerald-550 to-[#0A8F6A] text-white py-12 sm:py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-2">
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">Our Dedicated Pharmacy Services</h1>
          <p className="text-xs sm:text-base text-emerald-100 opacity-90 leading-relaxed">
            We provide extensive and reliable medical services. Click on any card below to reveal full details and lists of items stocked.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((serv) => {
            const isExpanded = expandedId === serv.id;
            const Icon = serv.icon;
            return (
              <div 
                key={serv.id} 
                className={`bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden ${
                  isExpanded ? 'ring-1 ring-[#0A8F6A] border-[#0A8F6A]' : ''
                }`}
              >
                {/* Header click triggers expand */}
                <div 
                  onClick={() => handleToggle(serv.id)}
                  className="p-5 flex items-start gap-4 cursor-pointer select-none"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${serv.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-grow space-y-1 pr-4">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-1.5 hover:text-[#0A8F6A] transition-colors">
                      {serv.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
                      {serv.shortDesc}
                    </p>
                  </div>
                  <button className="text-gray-400 hover:text-[#0A8F6A] transition-colors mt-1.5">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-gray-50 dark:border-slate-850 pt-4 bg-gray-50/20 dark:bg-slate-950/10 space-y-4">
                    <div className="space-y-1.5">
                      <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Service Overview</h4>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {serv.longDesc}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Common Stocked Items</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {serv.popularItems.map((item, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0A8F6A]" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {serv.precautions && (
                      <div className="p-3 rounded-lg bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-950 text-amber-700 dark:text-amber-400 text-xs flex gap-2 items-start">
                        <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span><strong>Important Note:</strong> {serv.precautions}</span>
                      </div>
                    )}

                    <div className="pt-2">
                      <a
                        href={`https://api.whatsapp.com/send?phone=919835669082&text=Hello%20Ravindra%20Medical%20Hall%2C%20I%20am%20interested%20in%20ordering%20items%20from%20your%20*${encodeURIComponent(serv.title)}*%20category.`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0A8F6A] hover:bg-[#087859] text-white rounded-xl font-bold text-xs shadow-sm transition-all"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Order from {serv.title}</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Emergency Call Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-red-600 to-rose-550 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
            <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center animate-pulse">
              <PhoneCall className="w-6 h-6 text-white" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-black">24/7 Emergency Medicine Support</h3>
              <p className="text-xs text-rose-100 leading-relaxed max-w-xl">
                Do you require specialized life-saving medications during late hours? Don't worry. Call our emergency support hotline directly. We do our absolute best to assist you in crisis.
              </p>
            </div>
          </div>
          <a
            href="tel:09835669082"
            className="flex-shrink-0 flex items-center gap-2 px-6 py-3 bg-white text-red-600 hover:bg-rose-50 font-black text-sm rounded-xl transition-all shadow-sm"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call +91 98356 69082</span>
          </a>
        </div>
      </section>

      {/* Quick Service Inquiry Form */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-md">
          <div className="text-center space-y-2 mb-6">
            <h3 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white flex items-center justify-center gap-1.5">
              <HelpCircle className="w-5 h-5 text-[#0A8F6A]" />
              <span>Quick Service Inquiry</span>
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Have queries regarding a specific medical category or device brand? Fill the inquiry to chat directly.
            </p>
          </div>

          <form onSubmit={handleInquirySubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">My Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={inquiryData.name}
                  onChange={handleInquiryChange}
                  placeholder="Your Name"
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-950 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#0A8F6A] text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Mobile Number</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={inquiryData.phone}
                  onChange={handleInquiryChange}
                  placeholder="Mobile Number"
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-950 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#0A8F6A] text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Interested Service</label>
              <select
                name="service"
                value={inquiryData.service}
                onChange={handleInquiryChange}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-950 text-gray-900 dark:text-white focus:outline-none focus:border-[#0A8F6A] text-xs"
              >
                {services.map(s => (
                  <option key={s.id} value={s.title}>{s.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">My Question</label>
              <textarea
                name="question"
                required
                rows={3}
                value={inquiryData.question}
                onChange={handleInquiryChange}
                placeholder="Write your specific medical or device inquiry here (e.g. Do you stock Omron blood pressure monitor? What is the price?)"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-950 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#0A8F6A] text-xs leading-relaxed"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0A8F6A] hover:bg-[#087859] text-white rounded-xl font-bold text-xs shadow-sm transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Submit Inquiry on WhatsApp</span>
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}
