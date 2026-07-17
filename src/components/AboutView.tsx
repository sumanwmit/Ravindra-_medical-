import { Heart, Target, Eye, ShieldCheck, Quote, Clock, MapPin, Award } from 'lucide-react';

export default function AboutView() {
  const values = [
    { title: '100% Genuine Quality', desc: 'We procure direct from corporate pharma channels and never accept unverified generic counterfeits.', icon: ShieldCheck, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30' },
    { title: 'Local Compassion', desc: 'Treating every patient like a neighbor, offering gentle pricing and honest medical guidance.', icon: Heart, color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/30' },
    { title: 'Operational Precision', desc: 'Ensuring correct dosage packaging, accurate expiration dates, and cold storage maintenance.', icon: Target, color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/30' },
    { title: 'Trust & Transparency', desc: 'Honest pricing with cash memo receipts for all purchased medications.', icon: Award, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/30' },
  ];

  const timelineSteps = [
    { year: '2012', title: 'The Genesis', desc: 'Ravindra Medical Hall was established as a humble pharmacy along Makhdumpur Road, aiming to make critical formulations accessible to the Pai Bigha community.' },
    { year: '2016', title: 'Inventory Expansion', desc: 'Increased shelf capacity to include medical diagnostic equipment, surgical dressing consumables, and specialized infant nutritional supplies.' },
    { year: '2020', title: 'Advanced Storage Integration', desc: 'Installed heavy-duty refrigeration systems and critical inverter backups to preserve cold-chain dependencies like insulin and specialized vaccines.' },
    { year: '2024', title: 'Digitalization & Delivery', desc: 'Introduced smart WhatsApp prescription ordering and local packaging queues to support patients and busy workers.' }
  ];

  return (
    <div className="space-y-16 pb-12">
      
      {/* Page Title Header */}
      <section className="bg-gradient-to-br from-emerald-550 to-[#0A8F6A] text-white py-12 sm:py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-2">
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">About Ravindra Medical Hall</h1>
          <p className="text-xs sm:text-base text-emerald-100 opacity-90 leading-relaxed">
            Discover our rich heritage, founding principles, and how we serve Pai Bigha & Makhdumpur as a beacon of genuine medicine supply.
          </p>
        </div>
      </section>

      {/* Story & Owner message */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        <div className="lg:col-span-7 space-y-6">
          <span className="text-xs uppercase tracking-wider text-[#0A8F6A] font-bold">Our Story</span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white leading-tight">
            Serving Generational Health With Total Accountability
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-gray-600 dark:text-gray-350 leading-relaxed">
            <p>
              Founded in Pai Bigha, Makhdumpur, Bihar, **Ravindra Medical Hall** was built with a simple, powerful vision: that no patient in our locality should have to travel long distances or accept duplicate medicines for their health recovery. 
            </p>
            <p>
              Over the years, we have grown from a local retail counter into one of Makhdumpur’s most respected healthcare pharmacies. We stock an extensive catalog of life-saving prescription medicines, general over-the-counter remedies, specialized orthotics, baby products, skin care formulations, and advanced digital health monitoring equipment.
            </p>
            <p>
              We stand apart through our strict dedication to **Authenticity**. Every single tablet, capsule, or medical device we supply is backed by direct sourcing channels, assuring you absolute safety, correct formulation, and honest local pricing.
            </p>
          </div>
        </div>

        {/* Owner message quote card */}
        <div className="lg:col-span-5 bg-emerald-50/50 dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 p-6 sm:p-8 rounded-2xl shadow-sm relative">
          <div className="absolute top-4 right-4 text-emerald-250 dark:text-slate-800">
            <Quote className="w-10 h-10 transform rotate-180" />
          </div>
          <div className="space-y-4 relative">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 italic leading-relaxed pt-2">
              "A pharmacy is not merely a commercial business; it is a sacred institution of public trust. When a mother walks in for baby food, or a son walks in for his father's diabetes medicine, they are trusting us with their family's lives. We honor that trust daily by dispensing only 100% authentic compositions."
            </p>
            
            <div className="flex items-center space-x-3 pt-2">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150&h=150"
                alt="Owner Ravindra Kumar"
                className="w-12 h-12 rounded-full object-cover border-2 border-[#0A8F6A]"
                referrerPolicy="no-referrer"
              />
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">Ravindra Kumar</h4>
                <span className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wider">Founder & Chief Pharmacist</span>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Mission & Vision Bento Cards */}
      <section className="bg-slate-50 dark:bg-slate-900/40 py-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Mission Card */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-gray-150 dark:border-slate-800 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-[#0A8F6A]">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Our Mission</h3>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                To simplify and accelerate local patient recovery by stocking, examining, and dispensing highly authentic formulations, wellness essentials, and orthopedic monitors. We aim to protect human lives in Makhdumpur by eradicating generic counterfeits and bringing absolute transparency to pharmaceutical sales.
              </p>
            </div>
          </div>

          {/* Vision Card */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-gray-150 dark:border-slate-800 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center text-blue-600">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Our Vision</h3>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                To stand as the gold standard of local pharmaceutical support in Bihar, creating a healthy, digitally integrated ecosystem where every prescription request can be fulfilled seamlessly, emergency care can be addressed immediately, and human wellness remains the singular core indicator of our progress.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Our Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">Our Core Values</h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">The unshakeable foundations that guide our pharmacist routines and patient behaviors.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div key={i} className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${v.color}`}>
                  <Icon className="w-5.5 h-5.5" />
                </div>
                <h4 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">{v.title}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Visual Timeline Growth */}
      <section className="bg-slate-50 dark:bg-slate-900/40 py-16 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-2 mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">Journey Timeline</h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">How we evolved over the decade to serve our community better.</p>
          </div>

          <div className="relative border-l border-emerald-100 dark:border-slate-800 pl-6 sm:pl-8 space-y-10 max-w-2xl mx-auto">
            {timelineSteps.map((step, idx) => (
              <div key={idx} className="relative">
                {/* Dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-[#0A8F6A] border-4 border-white dark:border-slate-950 shadow" />
                
                <span className="text-xs font-black text-[#0A8F6A] bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                  {step.year}
                </span>
                
                <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white mt-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-550 dark:text-gray-400 mt-1 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
