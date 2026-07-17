import { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight, Image as ImageIcon, ZoomIn } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: 'store' | 'shelves' | 'equipment' | 'products' | 'customers';
  categoryLabel: string;
  imageUrl: string;
  description: string;
}

export default function GalleryView() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'g1',
      title: 'Pharmacy Store Front',
      category: 'store',
      categoryLabel: 'Store Front',
      imageUrl: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&q=80&w=800',
      description: 'The clean, brightly lit exterior storefront of Ravindra Medical Hall on Makhdumpur Road, providing safe and convenient ramp accessibility.'
    },
    {
      id: 'g2',
      title: 'Organized Medicine Shelves',
      category: 'shelves',
      categoryLabel: 'Medicine Shelves',
      imageUrl: 'https://images.unsplash.com/photo-1607619056574-7b8d304f3ced?auto=format&fit=crop&q=80&w=800',
      description: 'Systematically categorized medicine storage. All drugs are stored alphabetically and therapeutic-wise to ensure rapid dispensing.'
    },
    {
      id: 'g3',
      title: 'Diagnostic Diagnostic Gear',
      category: 'equipment',
      categoryLabel: 'Medical Equipment',
      imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
      description: 'Clinical grade diagnostic equipment including blood pressure monitors, digital thermometers, pulse oximeters, and nebulizers.'
    },
    {
      id: 'g4',
      title: 'Pediatric & Baby Wellness Supplies',
      category: 'products',
      categoryLabel: 'Products',
      imageUrl: 'https://images.unsplash.com/photo-1515488042361-404e9250afef?auto=format&fit=crop&q=80&w=800',
      description: 'A dedicated aisle carrying branded baby nutrition formulas, baby skin creams, diapers, pacifiers, and high-quality oral hygiene products.'
    },
    {
      id: 'g5',
      title: 'Patient Medication Consulting',
      category: 'customers',
      categoryLabel: 'Customers',
      imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
      description: 'Our experienced pharmaceutical counter staff reviewing a patient prescription and explaining dosage schedules in local Hindi/English.'
    },
    {
      id: 'g6',
      title: 'Secure Cold Chain Refrigeration',
      category: 'products',
      categoryLabel: 'Products',
      imageUrl: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&q=80&w=800',
      description: 'Dedicated pharmacy refrigeration units safeguarding temperature-critical insulin cartridges, serums, and children vaccines.'
    },
    {
      id: 'g7',
      title: 'Authentic Skin Care Formulations',
      category: 'products',
      categoryLabel: 'Products',
      imageUrl: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=800',
      description: 'Hypoallergenic skin lotions, sunscreen defense shields, medicated soaps, and moisture creams recommended by top dermatologists.'
    },
    {
      id: 'g8',
      title: 'Orthopedic Support Splints',
      category: 'equipment',
      categoryLabel: 'Medical Equipment',
      imageUrl: 'https://images.unsplash.com/photo-1631549916768-4119b2e55c06?auto=format&fit=crop&q=80&w=800',
      description: 'High-durability orthopedic rehabilitation gear including knee caps, lumbar supports, cervical collars, and compression crepe bandages.'
    }
  ];

  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  const openLightbox = (itemIndex: number) => {
    // Find index of item in the CURRENT filtered list
    const actualIndex = galleryItems.findIndex(i => i.id === filteredItems[itemIndex].id);
    setSelectedItemIndex(actualIndex);
  };

  const closeLightbox = () => {
    setSelectedItemIndex(null);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (selectedItemIndex === null) return;
    
    let newIndex = selectedItemIndex;
    if (direction === 'prev') {
      newIndex = selectedItemIndex === 0 ? galleryItems.length - 1 : selectedItemIndex - 1;
    } else {
      newIndex = selectedItemIndex === galleryItems.length - 1 ? 0 : selectedItemIndex + 1;
    }
    setSelectedItemIndex(newIndex);
  };

  const filters = [
    { id: 'all', label: 'All Photos' },
    { id: 'store', label: 'Store Front' },
    { id: 'shelves', label: 'Medicine Shelves' },
    { id: 'products', label: 'Products & Storage' },
    { id: 'equipment', label: 'Diagnostics & Equipment' },
    { id: 'customers', label: 'Patient Support' }
  ];

  return (
    <div className="space-y-12 pb-12">
      
      {/* Title Header */}
      <section className="bg-gradient-to-br from-emerald-550 to-[#0A8F6A] text-white py-12 sm:py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-2">
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight flex items-center justify-center gap-2">
            <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8" />
            <span>Store & Product Gallery</span>
          </h1>
          <p className="text-xs sm:text-base text-emerald-100 opacity-90 leading-relaxed">
            Take a virtual tour of Ravindra Medical Hall. View our alphabetically categorized medicine stacks, diagnostic devices, and customer spaces.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-gray-100 dark:border-slate-800 pb-6">
          {filters.map(filt => (
            <button
              key={filt.id}
              onClick={() => setActiveFilter(filt.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeFilter === filt.id
                  ? 'bg-[#0A8F6A] text-white shadow-md shadow-emerald-100 dark:shadow-none'
                  : 'bg-gray-100 dark:bg-slate-900 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-800'
              }`}
            >
              {filt.label}
            </button>
          ))}
        </div>
      </section>

      {/* Modern Masonry Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {filteredItems.map((item, idx) => (
            <div 
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="break-inside-avoid bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-800/80 rounded-2xl shadow-sm hover:shadow-lg overflow-hidden group cursor-pointer relative transition-all duration-350 transform hover:-translate-y-1"
            >
              {/* Image Container with zoom effects */}
              <div className="relative overflow-hidden aspect-video sm:aspect-auto sm:h-64">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-350 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
                <span className="absolute bottom-3 left-3 bg-[#0A8F6A]/95 text-white font-bold text-[9px] px-2 py-0.5 rounded uppercase tracking-wider">
                  {item.categoryLabel}
                </span>
              </div>

              {/* Text Info */}
              <div className="p-4 space-y-1">
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#0A8F6A] transition-colors">
                  {item.title}
                </h3>
                <p className="text-[11px] text-gray-400 dark:text-gray-500 leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modern Lightbox Modal */}
      {selectedItemIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-fade-in">
          
          {/* Close trigger button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
            title="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Nav arrows */}
          <button
            onClick={() => navigateLightbox('prev')}
            className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
            title="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => navigateLightbox('next')}
            className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
            title="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Main Frame */}
          <div className="max-w-4xl w-full flex flex-col items-center space-y-4">
            <div className="relative bg-slate-900 rounded-2xl overflow-hidden shadow-2xl max-h-[70vh] flex items-center justify-center">
              <img
                src={galleryItems[selectedItemIndex].imageUrl}
                alt={galleryItems[selectedItemIndex].title}
                referrerPolicy="no-referrer"
                className="max-h-[65vh] object-contain max-w-full"
              />
            </div>
            
            {/* Context Box */}
            <div className="text-center text-white max-w-2xl px-4 space-y-1.5">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                {galleryItems[selectedItemIndex].categoryLabel}
              </span>
              <h2 className="text-base sm:text-xl font-bold">
                {galleryItems[selectedItemIndex].title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {galleryItems[selectedItemIndex].description}
              </p>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
