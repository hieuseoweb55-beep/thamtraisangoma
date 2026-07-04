import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MessageSquare, AlertTriangle, Image as ImageIcon, CheckCircle, X, ZoomIn } from 'lucide-react';

import gomaWarehouse1 from '../assets/images/goma_warehouse_1.jpg';
import gomaWarehouse2 from '../assets/images/goma_warehouse_2.jpg';

interface PromoProduct {
  src: string;
  label: string;
}

export default function Promotions() {
  const [activeImg, setActiveImg] = useState<PromoProduct | null>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const skyProducts: PromoProduct[] = [
    { src: 'https://gomacarpet.com/wp-content/uploads/2026/05/057422daa3104691bd34c7c42dd0c21c.jpg', label: 'QD55' },
    { src: 'https://gomacarpet.com/wp-content/uploads/2026/05/2e25a209c88b411f8ac45cd9b400b8bc.jpg', label: 'QD26' },
    { src: 'https://gomacarpet.com/wp-content/uploads/2026/05/2c56567b72444055988f5f5c2d2f0a0e.jpg', label: 'QD36' },
    { src: 'https://gomacarpet.com/wp-content/uploads/2026/05/0a2be5f5d7604a9f95ce18ef68236821.jpg', label: 'QD50' },
    { src: 'https://gomacarpet.com/wp-content/uploads/2026/05/5b59de05c4a84d8b828c07e2675465d4.jpg', label: 'BG55' },
    { src: 'https://gomacarpet.com/wp-content/uploads/2026/05/b21b5e2683874235a3f63a3054977090.jpg', label: 'BG26' },
    { src: 'https://gomacarpet.com/wp-content/uploads/2026/05/0bb157b9d4704b11bcce53979f8b5632.jpg', label: 'BG36' },
    { src: 'https://gomacarpet.com/wp-content/uploads/2026/05/a3d564557e1248bfb45b3bbf4ba51d4b.jpg', label: 'BG50' },
    { src: 'https://gomacarpet.com/wp-content/uploads/2026/05/8d58f87c573f464d8c19d06c06ed8373.jpg', label: 'JZ55' },
    { src: 'https://gomacarpet.com/wp-content/uploads/2026/05/2ac3acd187a94ac7823319bf5c40ebd4.jpg', label: 'JZ26' },
    { src: 'https://gomacarpet.com/wp-content/uploads/2026/05/1900f0b96b1b4ed8a951e02f446bc898.jpg', label: 'JZ36' },
    { src: 'https://gomacarpet.com/wp-content/uploads/2026/05/6629cf9b307a40f485438ee1529cd9b7.jpg', label: 'JZ50' },
    { src: 'https://gomacarpet.com/wp-content/uploads/2026/05/0da794f48f424b799142ecfff7dd0156.jpg', label: 'T22' },
    { src: 'https://gomacarpet.com/wp-content/uploads/2026/05/115653f04881479aa4a74c9f95f56137.jpg', label: 'T32' },
    { src: 'https://gomacarpet.com/wp-content/uploads/2026/05/2cf24e68b4fe4d23a80a8f1186e92f02.jpg', label: 'T52' },
    { src: 'https://gomacarpet.com/wp-content/uploads/2026/05/a0663d0109134899948d6bb15a6e0a6b.jpg', label: 'T62' },
  ];

  const diamondProducts: PromoProduct[] = [
    { src: 'https://gomacarpet.com/wp-content/uploads/2026/05/13ebbc32863c4dbd8d5a2cd80e1659e0.jpg', label: 'D01' },
    { src: 'https://gomacarpet.com/wp-content/uploads/2026/05/0b2fa133d2984c5d9548532e0612bf98.jpg', label: 'D05' },
    { src: 'https://gomacarpet.com/wp-content/uploads/2026/05/61e164fa85274e4c876796c234c5006f.jpg', label: 'D06' },
    { src: 'https://gomacarpet.com/wp-content/uploads/2026/05/b5b165ec8e8a4bf28f65b6966a085710.jpg', label: 'D07' },
    { src: 'https://gomacarpet.com/wp-content/uploads/2026/05/21a01dd78edd4bbcbf8c1b1720ee2948.jpg', label: 'D08' },
    { src: 'https://gomacarpet.com/wp-content/uploads/2026/05/a8296c8b14a64c8dbe73adfc62ff26e5.jpg', label: 'D10' },
    { src: 'https://gomacarpet.com/wp-content/uploads/2026/05/67ee01ba0a9045e5a559b0c0f559744d.jpg', label: 'D14' },
    { src: 'https://gomacarpet.com/wp-content/uploads/2026/05/02d8748f14d340669b09378f3eaa5299.jpg', label: 'D15' },
    { src: 'https://gomacarpet.com/wp-content/uploads/2026/05/6d405083483447a391d7aac5b3995838.jpg', label: 'D17' },
    { src: 'https://gomacarpet.com/wp-content/uploads/2026/05/e4f1e02e028a40f58415e72f4c6d44f9.jpg', label: 'D18' },
  ];

  const xakhoTags = [
    'A7', 'HP31208', 'HP31212', 'PT09', 'A2', 'A3', 'A36', 'HP31202', 'HP510',
    'HP507', 'HP101', 'HP108', 'PT02', 'RH133', 'RH136', 'RH101', 'HOA 3D',
    'TIA HOA', 'BD 2×3', 'TYS'
  ];

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white font-sans selection:bg-[#ff2d00] selection:text-white">
      {/* NOTICE BAR */}
      <div className="bg-[#ff2d00] text-center py-3 px-4 text-xs sm:text-sm font-bold tracking-wider uppercase animate-pulse">
        ⚡ CHUYỂN KHO — THANH LÝ GẤP — SỐ LƯỢNG CÓ HẠN, HẾT LÀ HẾT ⚡
      </div>

      {/* HERO SECTION */}
      <section className="relative min-h-[550px] flex items-center justify-center overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0000] via-[#3d0000] to-[#1a0000]"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none"
          style={{ backgroundImage: `url(${gomaWarehouse1})` }}
        ></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,45,0,0.18)_0%,transparent_70%)] pointer-events-none"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-[#ff2d00] text-white text-[10px] sm:text-xs font-black tracking-[0.2em] px-5 py-2 rounded-full mb-6 uppercase"
          >
            🔥 Sự kiện thanh lý kho lớn nhất
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-7xl font-serif font-black tracking-tight leading-none mb-6 text-white"
          >
            THẢM CARPET <br />
            <span className="text-[#ff2d00] drop-shadow-[0_2px_15px_rgba(255,45,0,0.5)]">GIẢM ĐẾN 90%</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8"
          >
            Chuyển mặt bằng kho, buộc phải thanh lý toàn bộ lô hàng tồn đọng nhiều năm.
            Hàng chất lượng — giá chỉ còn <strong className="text-[#ff2d00] font-black">10–30% so với giá niêm yết ban đầu</strong>.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-block bg-white/5 border border-white/15 rounded-2xl p-6 text-sm sm:text-base text-[#ffd700] font-medium max-w-md mx-auto"
          >
            ⚠️ Cơ hội này 5–10 năm mới có một lần <br />
            <span className="text-white">Hàng bán hết là </span><strong>KHÔNG CÓ ĐỢT 2</strong>
          </motion.div>
        </div>
      </section>

      {/* WAREHOUSE PHOTOS */}
      <section className="bg-[#111] py-16 border-t border-white/5">
        <div className="max-w-[85%] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-2">Hình ảnh kho thực tế</h2>
            <div className="w-16 h-1 bg-[#ff2d00] mx-auto mb-4"></div>
            <p className="text-xs text-gray-500 uppercase tracking-widest">Hàng thật — kho thật — không ảo</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div 
              onClick={() => setActiveImg({ src: gomaWarehouse1, label: 'Hình ảnh thực tế kho Goma — Khu vực thảm cuộn' })}
              className="relative group overflow-hidden rounded-xl border border-white/10 aspect-[4/3] bg-neutral-900 cursor-zoom-in"
            >
              <img 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                src={gomaWarehouse1} 
                alt="Kho thảm thực tế 1"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                <ZoomIn className="w-8 h-8 text-white" />
              </div>
              <div className="absolute bottom-4 left-4 text-xs font-bold text-white/80 uppercase tracking-widest bg-black/60 px-3 py-1.5 rounded">
                Khu vực thảm cuộn
              </div>
            </div>

            <div 
              onClick={() => setActiveImg({ src: gomaWarehouse2, label: 'Hình ảnh thực tế kho Goma — Khu vực xe nâng & thảm cuộn phân loại' })}
              className="relative group overflow-hidden rounded-xl border border-white/10 aspect-[4/3] bg-neutral-900 cursor-zoom-in"
            >
              <img 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                src={gomaWarehouse2} 
                alt="Kho thảm thực tế 2"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                <ZoomIn className="w-8 h-8 text-white" />
              </div>
              <div className="absolute bottom-4 left-4 text-xs font-bold text-white/80 uppercase tracking-widest bg-black/60 px-3 py-1.5 rounded">
                Khu vực phân loại thảm tấm & thảm cuộn
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* URGENT NOTICE */}
      <section className="bg-[#111] pb-16">
        <div className="max-w-[85%] mx-auto">
          <div className="max-w-4xl mx-auto bg-[#1a1a00] border-2 border-[#ffd700] rounded-xl p-6 flex gap-4 items-start">
            <AlertTriangle className="w-8 h-8 text-[#ffd700] shrink-0 mt-0.5 animate-bounce" />
            <div>
              <p className="text-sm sm:text-base text-[#ffd700] font-bold leading-relaxed">
                Đây là đợt thanh lý <span className="underline">duy nhất trong năm</span>. Toàn bộ hàng bán hết sẽ không được nhập lại. Số lượng mỗi mã có hạn — <strong className="text-white">ai liên hệ trước sẽ được ưu tiên chọn và giữ hàng trước</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: HÀNG XẢ KHO */}
      <section className="py-16 bg-[#0d0d0d]">
        <div className="max-w-[85%] mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-[#7b0000] to-[#c0392b] rounded-t-2xl p-6 sm:p-8 flex items-center gap-4">
              <span className="text-4xl">🔥</span>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wide">HÀNG XẢ KHO</h3>
                <p className="text-xs sm:text-sm text-white/80">Giảm sốc nhất — chỉ còn 10–30% giá gốc</p>
              </div>
            </div>
            
            <div className="bg-[#1a1a1a] border-x border-b border-white/10 rounded-b-2xl p-6 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-white/5 border border-white/5 rounded-xl p-5 text-center">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Hàng lỗi nhẹ — Cắt lẻ</p>
                  <p className="text-3xl font-black text-[#ff2d00]">-80%</p>
                  <p className="text-[10px] text-gray-500 mt-2 uppercase tracking-widest">Còn 20% giá gốc</p>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-xl p-5 text-center border-l-2 border-l-[#ff2d00]">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Hàng lỗi nhẹ — Nguyên cuộn</p>
                  <p className="text-4xl font-black text-[#ff2d00]">-90%</p>
                  <p className="text-[10px] text-gray-500 mt-2 uppercase tracking-widest">Còn 10% giá gốc</p>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-xl p-5 text-center">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Hàng tốt — Cắt lẻ</p>
                  <p className="text-3xl font-black text-[#ff6b35]">-70%</p>
                  <p className="text-[10px] text-gray-500 mt-2 uppercase tracking-widest">Còn 30% giá gốc</p>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-xl p-5 text-center">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Hàng tốt — Nguyên cuộn</p>
                  <p className="text-3xl font-black text-[#ff6b35]">-80%</p>
                  <p className="text-[10px] text-gray-500 mt-2 uppercase tracking-widest">Còn 20% giá gốc</p>
                </div>
              </div>

              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-4">Các mã hàng thanh lý đợt này</h4>
              <div className="flex flex-wrap gap-2 mb-8">
                {xakhoTags.map(tag => (
                  <span key={tag} className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-md px-3.5 py-1.5 text-xs font-semibold tracking-wider transition-colors">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="bg-white/5 border border-white/5 rounded-lg p-4 text-xs sm:text-sm text-gray-400 flex flex-wrap items-center justify-between gap-4">
                <span>📦 Tổng tồn kho: <strong className="text-[#ffd700]">~2,498 m²</strong></span>
                <span className="text-[11px] uppercase tracking-wider text-gray-500">Ảnh thực tế — Inbox zalo để xem ngay</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: THẢM SKY */}
      <section className="py-16 bg-[#111] border-y border-white/5">
        <div className="max-w-[85%] mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-[#003d7a] to-[#0070c0] rounded-t-2xl p-6 sm:p-8 flex items-center gap-4">
              <span className="text-4xl">💛</span>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wide">THẢM SKY</h3>
                <p className="text-xs sm:text-sm text-white/80">Giảm 30–50% — Hàng cao cấp giá siêu mềm</p>
              </div>
            </div>
            
            <div className="bg-[#1a1a1a] border-x border-b border-white/10 rounded-b-2xl p-6 sm:p-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Lỗi nhẹ Cắt lẻ</p>
                  <p className="text-xl font-bold text-[#ff6b35]">-40%</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Lỗi nhẹ Nguyên cuộn</p>
                  <p className="text-xl font-bold text-[#ff6b35]">-50%</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Hàng tốt Cắt lẻ</p>
                  <p className="text-xl font-bold text-gray-300">-30%</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Hàng tốt Nguyên cuộn</p>
                  <p className="text-xl font-bold text-gray-300">-40%</p>
                </div>
              </div>

              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-4">Hình ảnh sản phẩm Sky thanh lý</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-8">
                {skyProducts.map((p, index) => (
                  <div 
                    key={index} 
                    onClick={() => setActiveImg(p)}
                    className="group relative aspect-square bg-black border border-white/5 rounded-lg overflow-hidden cursor-zoom-in hover:border-white/30 transition-all"
                  >
                    <img 
                      src={p.src} 
                      alt={p.label} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <ZoomIn className="w-5 h-5 text-white" />
                    </div>
                    <div className="absolute bottom-0 inset-x-0 bg-black/70 py-1.5 text-center text-[10px] font-bold tracking-wider uppercase">
                      {p.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white/5 border border-white/5 rounded-lg p-4 text-xs sm:text-sm text-gray-400">
                📦 Tổng tồn kho thảm Sky: <strong className="text-[#ffd700]">~5,167 m²</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: THẢM DIAMOND */}
      <section className="py-16 bg-[#0d0d0d]">
        <div className="max-w-[85%] mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-[#2d1b69] to-[#6c3483] rounded-t-2xl p-6 sm:p-8 flex items-center gap-4">
              <span className="text-4xl">💎</span>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wide">THẢM DIAMOND</h3>
                <p className="text-xs sm:text-sm text-white/80">Giảm 30–50% — Dòng thảm dệt nổi hoa văn cao cấp</p>
              </div>
            </div>
            
            <div className="bg-[#1a1a1a] border-x border-b border-white/10 rounded-b-2xl p-6 sm:p-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Lỗi nhẹ Cắt lẻ</p>
                  <p className="text-xl font-bold text-[#ff6b35]">-40%</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Lỗi nhẹ Nguyên cuộn</p>
                  <p className="text-xl font-bold text-[#ff6b35]">-50%</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Hàng tốt Cắt lẻ</p>
                  <p className="text-xl font-bold text-gray-300">-30%</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Hàng tốt Nguyên cuộn</p>
                  <p className="text-xl font-bold text-gray-300">-40%</p>
                </div>
              </div>

              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-4">Hình ảnh sản phẩm Diamond thanh lý</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 mb-8">
                {diamondProducts.map((p, index) => (
                  <div 
                    key={index} 
                    onClick={() => setActiveImg(p)}
                    className="group relative aspect-square bg-black border border-white/5 rounded-lg overflow-hidden cursor-zoom-in hover:border-white/30 transition-all"
                  >
                    <img 
                      src={p.src} 
                      alt={p.label} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <ZoomIn className="w-5 h-5 text-white" />
                    </div>
                    <div className="absolute bottom-0 inset-x-0 bg-black/70 py-1.5 text-center text-[10px] font-bold tracking-wider uppercase">
                      {p.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white/5 border border-white/5 rounded-lg p-4 text-xs sm:text-sm text-gray-400">
                📦 Tổng tồn kho thảm Diamond: <strong className="text-[#ffd700]">~2,632 m²</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW TO BUY */}
      <section className="bg-[#0d0d0d] py-16 border-t border-white/5">
        <div className="max-w-[85%] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-2">Mua hàng dễ dàng</h2>
            <div className="w-16 h-1 bg-[#ff2d00] mx-auto mb-4"></div>
            <p className="text-xs text-gray-500 uppercase tracking-widest">Chỉ cần 3 bước đơn giản</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-6 text-center">
              <div className="w-10 h-10 bg-[#ff2d00] text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                1
              </div>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-2">Liên hệ check kho</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Nhắn tin qua Zalo hoặc gọi trực tiếp số <strong className="text-white">0936.250.263</strong> để kiểm tra số lượng tồn kho của mã thảm bạn cần.
              </p>
            </div>

            <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-6 text-center">
              <div className="w-10 h-10 bg-[#ff2d00] text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                2
              </div>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-2">Xem &amp; chọn hàng</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Nhận video, ảnh thực tế rõ ràng từ nhân viên kho hoặc bạn có thể ghé trực tiếp kho Bình Tân xem thực tế trước khi chốt đơn.
              </p>
            </div>

            <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-6 text-center">
              <div className="w-10 h-10 bg-[#ff2d00] text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                3
              </div>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-2">Giao hàng nhanh</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Giao hàng tận nơi toàn quốc qua chành xe hoặc điều vận chuyển hoả tốc nội thành Hồ Chí Minh. Thanh toán linh hoạt, tiện lợi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative overflow-hidden py-20 px-4 text-center border-t border-[#ff2d00] border-b border-[#ff2d00] bg-gradient-to-r from-[#1a0000] to-[#2d0000]">
        <div className="max-w-2xl mx-auto relative z-10">
          <h2 className="text-3xl sm:text-4xl font-serif font-black mb-4">Đừng để mất cơ hội này!</h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8">
            Hàng thanh lý số lượng có hạn tuyệt đối — ai đặt trước được chọn trước. <br />
            Kho Goma mở cửa đón tiếp: <strong>8:00 – 17:30</strong> (Thứ 2 đến Thứ 7).
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a 
              href="https://zalo.me/0936250263" 
              target="_blank" 
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#0068ff] hover:bg-[#0055d0] text-white font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-lg shadow-[#0068ff]/20 hover:translate-y-[-2px]"
            >
              <MessageSquare className="w-5 h-5" />
              Nhắn Zalo ngay
            </a>
            <a 
              href="tel:0936250263" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white hover:bg-neutral-100 text-[#111] font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-lg hover:translate-y-[-2px]"
            >
              <Phone className="w-5 h-5 text-[#ff2d00]" />
              Gọi: 0936.250.263
            </a>
          </div>
          
          <p className="mt-8 text-xs text-gray-500 uppercase tracking-widest">
            📍 Địa chỉ kho: 326 Nguyễn Thị Tú, Phường Bình Hưng Hòa B, Quận Bình Tân, TP.HCM
          </p>
        </div>
      </section>

      {/* LIGHTBOX FOR PRODUCTS */}
      <AnimatePresence>
        {activeImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImg(null)}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 cursor-zoom-out"
          >
            <button 
              onClick={() => setActiveImg(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-4xl max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={activeImg.src} 
                alt={activeImg.label} 
                className="max-w-full max-h-[75vh] object-contain rounded-lg border border-white/10"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 bg-black/80 px-6 py-2 rounded-full border border-white/10 text-xs sm:text-sm font-bold tracking-wider uppercase text-[#ffd700] whitespace-nowrap">
                {activeImg.label.startsWith('Hình ảnh') ? activeImg.label : `Mã sản phẩm: ${activeImg.label}`}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
