import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, Award, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import clearanceBanner from '../assets/images/clearance_banner_1782807022067.jpg';

export default function Home() {
  const featuredProducts = products.slice(0, 4);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if user has already seen the popup in this session
    const hasSeen = sessionStorage.getItem('goma_clearance_popup_seen');
    if (!hasSeen) {
      // Show popup after a short delay for better UX
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
    sessionStorage.setItem('goma_clearance_popup_seen', 'true');
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      {/* Promotional Popup Welcome Banner */}
      <AnimatePresence>
        {showPopup && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="relative max-w-lg w-full bg-[#111] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            >
              {/* Close Button */}
              <button 
                onClick={handleClosePopup}
                className="absolute top-4 right-4 z-50 bg-black/60 hover:bg-black text-white p-2 rounded-full transition-colors border border-white/10"
                aria-label="Close promotion banner"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Clickable Banner Body */}
              <Link 
                to="/khuyen-mai" 
                onClick={handleClosePopup}
                className="block group"
              >
                <div className="relative aspect-[16/9] bg-neutral-900 overflow-hidden">
                  <img 
                    src={clearanceBanner} 
                    alt="Chương trình thanh lý thảm Goma" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                </div>
                
                <div className="p-6 text-center">
                  <span className="inline-block bg-[#ff2d00] text-white text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-full mb-3">
                    🔥 SỰ KIỆN KHẨN CẤP
                  </span>
                  <h3 className="text-xl font-serif text-white font-bold tracking-tight mb-2 group-hover:text-[#ff2d00] transition-colors">
                    THANH LÝ KHO THẢM - GIẢM ĐẾN 90%
                  </h3>
                  <p className="text-xs text-neutral-400 mb-6 max-w-sm mx-auto">
                    Chuyển mặt bằng kho, thanh lý thảm tấm, thảm cuộn, thảm mỹ thuật với giá siêu hời chỉ từ 10%.
                  </p>
                  <span className="inline-flex items-center justify-center w-full py-3.5 bg-[#ff2d00] hover:bg-white hover:text-[#ff2d00] text-white font-bold text-[11px] uppercase tracking-wider transition-all rounded-lg">
                    Xem Chi Tiết Chương Trình <ArrowRight className="w-4 h-4 ml-2" />
                  </span>
                </div>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden border-b border-border-dim">
        <div className="absolute inset-0">
          <img
            src="https://picsum.photos/seed/luxury-carpet-interior/1920/1080"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg/20 via-bg/40 to-bg"></div>
        </div>
        <div className="relative max-w-[85%] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-serif italic text-main mb-6 tracking-tight leading-none">
              Goma <span className="text-accent">Carpet</span>
            </h1>
            <p className="text-sm md:text-lg text-dim max-w-2xl mx-auto mb-12 uppercase tracking-[0.4em] leading-relaxed font-medium">
              Kiến tạo không gian đẳng cấp với thảm trải sàn Luxury
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <Link
                to="/san-pham"
                className="inline-flex items-center justify-center px-12 py-5 bg-accent text-bg text-[11px] font-bold uppercase tracking-widest hover:bg-main hover:text-bg transition-all duration-500 shadow-xl"
              >
                Xem bộ sưu tập
                <ArrowRight className="ml-3 w-4 h-4" />
              </Link>
              <Link
                to="/cong-cu"
                className="inline-flex items-center justify-center px-12 py-5 border-2 border-accent text-[11px] font-bold uppercase tracking-widest text-accent hover:bg-accent hover:text-bg transition-all duration-500"
              >
                Check tồn kho - công cụ
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Brand Gallery - New Section */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-[85%] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif italic text-main mb-4">Khẳng định vị thế</h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
            <p className="text-xs text-dim uppercase tracking-[0.5em]">The Art of Luxury Flooring</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[800px]">
            <div className="md:col-span-8 h-full relative group overflow-hidden">
              <img 
                src="https://picsum.photos/seed/carpet-office-luxury/1200/800" 
                alt="Luxury Office" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              <div className="absolute bottom-10 left-10 text-white">
                <p className="text-[10px] uppercase tracking-[0.3em] mb-2">Office Collection</p>
                <h3 className="text-3xl font-serif italic">Không gian làm việc chuyên nghiệp</h3>
              </div>
            </div>
            <div className="md:col-span-4 grid grid-rows-2 gap-4 h-full">
              <div className="relative group overflow-hidden">
                <img 
                  src="https://picsum.photos/seed/carpet-hotel/600/600" 
                  alt="Hotel Carpet" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-[10px] uppercase tracking-[0.3em]">Hotel & Resort</p>
                </div>
              </div>
              <div className="relative group overflow-hidden">
                <img 
                  src="https://picsum.photos/seed/carpet-home/600/600" 
                  alt="Home Carpet" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-[10px] uppercase tracking-[0.3em]">Residential Luxury</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-bg">
        <div className="max-w-[85%] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4">
            <div>
              <h2 className="text-3xl font-serif italic text-accent mb-2">Sản phẩm tiêu biểu</h2>
              <p className="text-[10px] text-dim uppercase tracking-[0.4em]">Diamond Silk & Office Pro Collections</p>
            </div>
            <Link to="/san-pham" className="text-[11px] text-dim hover:text-accent uppercase tracking-widest transition-colors flex items-center">
              Xem toàn bộ danh mục <ArrowRight className="ml-2 w-3 h-3" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features - Minimalist */}
      <section className="py-24 border-t border-border-dim bg-card-bg/30">
        <div className="max-w-[85%] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-serif italic text-accent mb-4">Chất lượng Luxury</h3>
              <p className="text-xs text-dim leading-relaxed uppercase tracking-wider">Sản phẩm nhập khẩu chính hãng, độ bền cao, an toàn cho sức khỏe và môi trường.</p>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-lg font-serif italic text-accent mb-4">Vận hành AI</h3>
              <p className="text-xs text-dim leading-relaxed uppercase tracking-wider">Hệ thống AI điều phối vận chuyển thông minh, tối ưu hóa chi phí logistics cho khách hàng.</p>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-lg font-serif italic text-accent mb-4">Bảo hành Uy tín</h3>
              <p className="text-xs text-dim leading-relaxed uppercase tracking-wider">Cam kết bảo hành dài hạn, hỗ trợ kỹ thuật nhanh chóng từ đội ngũ chuyên gia Goma.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
