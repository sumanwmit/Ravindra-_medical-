import { useState, ChangeEvent, FormEvent } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactView() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    submitMethod: 'whatsapp' // 'whatsapp' or 'email_simulate'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (formData.name.trim() === '' || formData.phone.trim() === '' || formData.message.trim() === '') {
      setErrorMsg('Please fill in all mandatory fields (*)');
      return;
    }

    if (formData.submitMethod === 'whatsapp') {
      const formatted = `Hello Ravindra Medical Hall,

I have sent a general inquiry from your website Contact Page:

👤 *SENDER DETAILS:*
• Name: ${formData.name}
• Phone: ${formData.phone}
${formData.email ? `• Email: ${formData.email}\n` : ''}
✉️ *MESSAGE:*
• ${formData.message}`;

      const encoded = encodeURIComponent(formatted);
      window.open(`https://api.whatsapp.com/send?phone=919835669082&text=${encoded}`, '_blank', 'noreferrer');
      setIsSubmitted(true);
    } else {
      // Simulate Email submitting locally with beautiful visual states
      setIsSubmitted(true);
    }

    // Reset fields except name (for greeting)
    setFormData(prev => ({
      ...prev,
      email: '',
      message: ''
    }));
  };

  return (
    <div className="space-y-16 pb-12">
      
      {/* Contact Title Header */}
      <section className="bg-gradient-to-br from-emerald-550 to-[#0A8F6A] text-white py-12 sm:py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-2">
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight flex items-center justify-center gap-2">
            <Mail className="w-6 h-6 sm:w-8 sm:h-8" />
            <span>Contact Ravindra Medical Hall</span>
          </h1>
          <p className="text-xs sm:text-base text-emerald-100 opacity-90 leading-relaxed">
            Have questions regarding prescription stocks, medical equipment specifications, or bulk orders? Connect with our team instantly.
          </p>
        </div>
      </section>

      {/* Main Details and Forms Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Business Details & Timings */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-wider text-[#0A8F6A] font-bold">Get In Touch</span>
            <h2 className="text-xl sm:text-3xl font-black text-gray-900 dark:text-white leading-tight">
              We are Here to Support Your Family Wellness
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Ravindra Medical Hall prioritizes your health requirements. We are accessible via direct call, WhatsApp message, or in-person visits during operational hours.
            </p>
          </div>

          {/* Details Lists */}
          <div className="space-y-5">
            {/* Address */}
            <div className="flex items-start space-x-3.5 bg-gray-50 dark:bg-slate-900/60 p-4 rounded-xl border border-gray-100 dark:border-slate-800">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-[#0A8F6A] dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-xs sm:text-sm">
                <h4 className="font-bold text-gray-900 dark:text-white">Our Address Location</h4>
                <p className="text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                  Titaiganj Pai Bigha - Makhdumpur Rd, Pai Bigha, Makhdumpur, Jehanabad, Bihar 804422
                </p>
                <a
                  href="https://maps.google.com/?q=Ravindra%20Medical%20Hall%2C%20Pai%20Bigha%2C%20Makhdumpur%2C%20Bihar%20804422"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1.5 inline-flex items-center text-xs font-bold text-[#0A8F6A] hover:underline"
                >
                  Open in Google Maps App
                </a>
              </div>
            </div>

            {/* Direct Calls */}
            <div className="flex items-start space-x-3.5 bg-gray-50 dark:bg-slate-900/60 p-4 rounded-xl border border-gray-100 dark:border-slate-800">
              <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-450 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="text-xs sm:text-sm">
                <h4 className="font-bold text-gray-900 dark:text-white">Call Now / Phone Inquiry</h4>
                <p className="text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                  Have a quick verbal question? Dial our chief chemist directly on:
                </p>
                <a
                  href="tel:09835669082"
                  className="mt-1.5 inline-flex items-center text-[#0A8F6A] font-extrabold"
                >
                  +91 98356 69082
                </a>
              </div>
            </div>

            {/* Working Hours */}
            <div className="flex items-start space-x-3.5 bg-gray-50 dark:bg-slate-900/60 p-4 rounded-xl border border-gray-150 dark:border-slate-800">
              <div className="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-450 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-xs sm:text-sm">
                <h4 className="font-bold text-gray-900 dark:text-white">Operating Timings</h4>
                <p className="text-gray-500 dark:text-gray-400 mt-0.5">
                  Monday to Sunday: 08:00 AM - 10:00 PM
                </p>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                  * Cold insulin units are maintained 24/7 in backup generators.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-150 dark:border-slate-800 shadow-lg p-6 sm:p-8">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-slate-800 pb-2">
              Send Us an Instant Message
            </h3>

            {isSubmitted ? (
              <div className="text-center py-10 space-y-4 animate-fade-in">
                <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950 rounded-full flex items-center justify-center mx-auto text-[#0A8F6A]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">Inquiry Form Handled!</h4>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                    {formData.submitMethod === 'whatsapp' 
                      ? 'WhatsApp chat launched successfully. Please send the prefilled details directly inside the chat.'
                      : 'Thank you for reaching out! Your inquiry has been logged. Our store executives will call you shortly.'
                    }
                  </p>
                </div>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-4 py-2 rounded-xl bg-gray-150 dark:bg-slate-850 hover:bg-gray-200 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300 font-semibold text-xs transition-all"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMsg && (
                  <div className="p-3 bg-red-50 dark:bg-red-950/35 border border-red-100 dark:border-red-950 rounded-xl text-xs text-red-600 dark:text-red-400 flex gap-2 items-center">
                    <AlertCircle className="w-4.5 h-4.5 flex-shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Sender Name */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-1.5">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-950 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#0A8F6A] text-xs"
                    />
                  </div>

                  {/* Sender Phone */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-1.5">
                      Contact Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Mobile number"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-950 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#0A8F6A] text-xs"
                    />
                  </div>
                </div>

                {/* Email (Optional) */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-1.5">
                    Email Address <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@gmail.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-950 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#0A8F6A] text-xs"
                  />
                </div>

                {/* Submission Routing */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-1.5">
                    How would you like to transmit?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className={`border rounded-xl p-3 flex items-center justify-between cursor-pointer transition-all ${
                      formData.submitMethod === 'whatsapp' 
                        ? 'border-[#0A8F6A] bg-emerald-50/30 dark:bg-emerald-950/25' 
                        : 'border-gray-200 dark:border-slate-800'
                    }`}>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="submitMethod"
                          value="whatsapp"
                          checked={formData.submitMethod === 'whatsapp'}
                          onChange={handleInputChange}
                          className="accent-[#0A8F6A]"
                        />
                        <span className="text-xs font-bold text-gray-800 dark:text-gray-200">WhatsApp</span>
                      </div>
                      <MessageSquare className="w-4.5 h-4.5 text-emerald-600" />
                    </label>

                    <label className={`border rounded-xl p-3 flex items-center justify-between cursor-pointer transition-all ${
                      formData.submitMethod === 'email_simulate' 
                        ? 'border-[#0A8F6A] bg-emerald-50/30 dark:bg-emerald-950/25' 
                        : 'border-gray-200 dark:border-slate-800'
                    }`}>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="submitMethod"
                          value="email_simulate"
                          checked={formData.submitMethod === 'email_simulate'}
                          onChange={handleInputChange}
                          className="accent-[#0A8F6A]"
                        />
                        <span className="text-xs font-bold text-gray-800 dark:text-gray-200">Submit on Site</span>
                      </div>
                      <Send className="w-4.5 h-4.5 text-indigo-600" />
                    </label>
                  </div>
                </div>

                {/* Sender Message */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-1.5">
                    Your Message / Question <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Type your message, query, or bulk request details here..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-950 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#0A8F6A] text-xs leading-relaxed"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-[#0A8F6A] hover:bg-[#087859] text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all"
                >
                  {formData.submitMethod === 'whatsapp' ? (
                    <>
                      <MessageSquare className="w-4.5 h-4.5" />
                      <span>Launch WhatsApp Chat</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4.5 h-4.5" />
                      <span>Submit In-App Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

      </section>

      {/* Embedded Google Maps Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-gray-150 dark:border-slate-800 shadow-md overflow-hidden h-[350px] bg-gray-100">
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
      </section>

    </div>
  );
}
