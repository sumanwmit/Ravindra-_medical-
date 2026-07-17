import { useState, useRef, DragEvent, ChangeEvent, FormEvent } from 'react';
import { Send, Phone, Upload, CheckCircle, FileText, Trash2, CalendarCheck } from 'lucide-react';

export default function WhatsAppOrderForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    medicines: '',
    message: '',
    deliveryTime: 'Morning (08:00 AM - 12:00 PM)',
  });

  const [prescriptionFile, setPrescriptionFile] = useState<File | null>(null);
  const [prescriptionPreview, setPrescriptionPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (file: File) => {
    if (file && (file.type.startsWith('image/') || file.type === 'application/pdf')) {
      setPrescriptionFile(file);
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPrescriptionPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPrescriptionPreview(null);
      }
    } else {
      alert('Please upload a valid prescription (Image or PDF file).');
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const onFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setPrescriptionFile(null);
    setPrescriptionPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formattedMessage = `Hello Ravindra Medical Hall,

I would like to order the following healthcare items:

📝 *CUSTOMER DETAILS:*
• Name: ${formData.name}
• Phone: ${formData.phone}
${formData.email ? `• Email: ${formData.email}\n` : ''}
📍 *DELIVERY ADDRESS:*
• ${formData.address}

📦 *MEDICINES / PRODUCTS REQUESTED:*
• ${formData.medicines.split('\n').join('\n• ')}

⏰ *PREFERRED DELIVERY:*
• ${formData.deliveryTime}

📎 *PRESCRIPTION ATTACHED:*
• ${prescriptionFile ? `Yes (${prescriptionFile.name}) - [Sending prescription photo next in chat]` : 'No'}

💬 *ADDITIONAL MESSAGE:*
• ${formData.message ? formData.message : 'N/A'}`;

    const encodedMessage = encodeURIComponent(formattedMessage);
    const whatsappURL = `https://api.whatsapp.com/send?phone=919835669082&text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank', 'noreferrer');
  };

  return (
    <div id="whatsapp-order-form" className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-xl overflow-hidden transition-all">
      <div className="bg-gradient-to-r from-[#0A8F6A] to-emerald-500 px-6 py-8 text-white">
        <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
          <Send className="w-5 h-5 sm:w-6 sm:h-6" />
          <span>WhatsApp Quick Order Form</span>
        </h2>
        <p className="text-xs sm:text-sm text-emerald-50 mt-1.5 opacity-90 leading-relaxed">
          Order genuine medicines and wellness products in seconds. Fill out the details below to generate a preformatted request. You can send the prescription image directly inside WhatsApp!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Customer Name */}
          <div>
            <label htmlFor="name" className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-1.5">
              Customer Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-950 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#0A8F6A] focus:ring-1 focus:ring-[#0A8F6A] transition-all text-sm"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phone" className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-1.5">
              Mobile Number (WhatsApp) <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="e.g. 09835669082"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-950 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#0A8F6A] focus:ring-1 focus:ring-[#0A8F6A] transition-all text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Email Address */}
          <div>
            <label htmlFor="email" className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-1.5">
              Email Address <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="yourname@gmail.com"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-950 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#0A8F6A] focus:ring-1 focus:ring-[#0A8F6A] transition-all text-sm"
            />
          </div>

          {/* Delivery Window */}
          <div>
            <label htmlFor="deliveryTime" className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-1.5 flex items-center gap-1">
              <CalendarCheck className="w-3.5 h-3.5 text-[#0A8F6A]" />
              <span>Preferred Delivery / Pickup</span>
            </label>
            <select
              id="deliveryTime"
              name="deliveryTime"
              value={formData.deliveryTime}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-950 text-gray-900 dark:text-white focus:outline-none focus:border-[#0A8F6A] focus:ring-1 focus:ring-[#0A8F6A] transition-all text-sm"
            >
              <option value="Morning (08:00 AM - 12:00 PM)">Morning (08:00 AM - 12:00 PM)</option>
              <option value="Afternoon (12:00 PM - 04:00 PM)">Afternoon (12:00 PM - 04:00 PM)</option>
              <option value="Evening (04:00 PM - 08:00 PM)">Evening (04:00 PM - 08:00 PM)</option>
              <option value="Night (08:00 PM - 10:00 PM)">Night (08:00 PM - 10:00 PM)</option>
            </select>
          </div>
        </div>

        {/* Medicines List */}
        <div>
          <label htmlFor="medicines" className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-1.5">
            Medicine Names & Quantities <span className="text-red-500">*</span>
          </label>
          <textarea
            id="medicines"
            name="medicines"
            required
            rows={3}
            value={formData.medicines}
            onChange={handleInputChange}
            placeholder="Please write medicine names, strengths, and pack sizes here (e.g. Paracetamol 500mg - 2 strips, Baby Diapers Medium - 1 pack)"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-950 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#0A8F6A] focus:ring-1 focus:ring-[#0A8F6A] transition-all text-sm leading-relaxed"
          />
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-1.5">
            Complete Delivery Address / Shop Pickup <span className="text-red-500">*</span>
          </label>
          <textarea
            id="address"
            name="address"
            required
            rows={2}
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Type 'Self Pickup' or write your full delivery address in Pai Bigha or nearby areas."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-950 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#0A8F6A] focus:ring-1 focus:ring-[#0A8F6A] transition-all text-sm leading-relaxed"
          />
        </div>

        {/* Drag and Drop prescription */}
        <div>
          <span className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-1.5">
            Upload Prescription <span className="text-gray-400 font-normal">(Required for prescription medicines)</span>
          </span>

          {!prescriptionFile ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={triggerFileInput}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-[#0A8F6A] bg-emerald-50/50 dark:bg-emerald-950/20'
                  : 'border-gray-300 dark:border-slate-800 hover:border-[#0A8F6A] hover:bg-gray-50/30 dark:hover:bg-slate-950/30'
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={onFileInputChange}
                accept="image/*,application/pdf"
                className="hidden"
              />
              <Upload className="w-8 h-8 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Drag and drop your prescription here, or <span className="text-[#0A8F6A]">browse files</span>
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Supports JPG, PNG, and PDF (Max 5MB)
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-between p-4 rounded-xl border border-emerald-100 dark:border-emerald-950/30 bg-emerald-50/20 dark:bg-emerald-950/10">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center overflow-hidden">
                  {prescriptionPreview ? (
                    <img
                      src={prescriptionPreview}
                      alt="Prescription preview"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <FileText className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 max-w-[180px] sm:max-w-xs truncate">
                      {prescriptionFile.name}
                    </span>
                    <CheckCircle className="w-4.5 h-4.5 text-[#0A8F6A]" />
                  </div>
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {(prescriptionFile.size / 1024 / 1024).toFixed(2)} MB • Ready to send
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={removeFile}
                className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                title="Remove attachment"
              >
                <Trash2 className="w-4.5 h-4.5" />
              </button>
            </div>
          )}
          <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-1.5 italic">
            * Note: Since file binaries cannot be transmitted directly via WhatsApp text URL, your prescription details are formatted in text. When WhatsApp opens, please attach your prescription image in the chat to complete verification.
          </p>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-1.5">
            Additional Message <span className="text-gray-400 font-normal">(Optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={2}
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Any special instructions for the pharmacy staff (e.g., substitute brands allowed, gate code, urgent request)"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-950 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#0A8F6A] focus:ring-1 focus:ring-[#0A8F6A] transition-all text-sm leading-relaxed"
          />
        </div>

        {/* Form Actions */}
        <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="tel:09835669082"
            className="flex items-center justify-center gap-2 px-5 py-3 border border-gray-200 dark:border-slate-800 text-gray-700 dark:text-gray-300 rounded-xl font-bold text-sm hover:bg-gray-50 dark:hover:bg-slate-950 transition-all cursor-pointer"
          >
            <Phone className="w-4 h-4 text-[#0A8F6A]" />
            <span>Call Us Directly</span>
          </a>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 px-5 py-3 bg-[#0A8F6A] hover:bg-[#087859] text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Send Order via WhatsApp</span>
          </button>
        </div>
      </form>
    </div>
  );
}
