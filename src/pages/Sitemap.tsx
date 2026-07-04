import { Link } from 'react-router-dom';
import { categories } from '../data/products';
import { ChevronRight, Map, Home as HomeIcon, ShoppingBag, Wrench, Info, Package, Tag, Star, Gem, DollarSign } from 'lucide-react';
import { motion } from 'motion/react';

export default function Sitemap() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Hero Section */}
      <div className="relative h-[40vh] overflow-hidden">
        <img 
          src="https://picsum.photos/seed/carpet-texture/1920/1080?blur=2" 
          alt="Sitemap Background" 
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg flex flex-col items-center justify-center text-center px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-none border-2 border-accent mb-8 bg-bg/50 backdrop-blur-sm"
          >
            <Map className="w-10 h-10 text-accent" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif italic text-accent tracking-tighter mb-4"
          >
            Sitemap
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xs text-dim uppercase tracking-[0.5em] font-bold"
          >
            Bản đồ định hướng không gian Goma
          </motion.p>
        </div>
      </div>

      <div className="max-w-[85%] mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Cấu trúc chính */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card-bg border-2 border-border-dim p-8 relative group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 -mr-12 -mt-12 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
            <h2 className="text-2xl font-serif italic text-accent mb-10 border-b-2 border-accent/20 pb-4 relative">
              Hệ thống chính
            </h2>
            <ul className="space-y-6 relative">
              {[
                { name: 'Trang chủ', path: '/', icon: <HomeIcon className="w-4 h-4" /> },
                { name: 'Sản phẩm', path: '/san-pham', icon: <ShoppingBag className="w-4 h-4" /> },
                { name: 'Công cụ tính', path: '/cong-cu', icon: <Wrench className="w-4 h-4" /> },
                { name: 'Về Goma', path: '/ve-goma', icon: <Info className="w-4 h-4" /> },
                { name: 'Xả kho', path: '/khuyen-mai', icon: <Tag className="w-4 h-4" /> },
              ].map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="flex items-center text-[11px] font-bold text-dim hover:text-accent uppercase tracking-widest transition-all group/link">
                    <span className="w-8 h-8 rounded-none border border-border-dim flex items-center justify-center mr-4 group-hover/link:border-accent group-hover/link:bg-accent group-hover/link:text-bg transition-all">
                      {item.icon}
                    </span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Không gian & Phân khúc */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="bg-card-bg border-2 border-border-dim p-8">
              <h2 className="text-2xl font-serif italic text-accent mb-10 border-b-2 border-accent/20 pb-4">
                Theo không gian
              </h2>
              <div className="space-y-8">
                {[
                  { name: 'Thảm gia đình', tag: 'gia-dinh', img: 'https://picsum.photos/seed/home/400/200' },
                  { name: 'Thảm văn phòng', tag: 'van-phong', img: 'https://picsum.photos/seed/office/400/200' },
                  { name: 'Thảm khách sạn', tag: 'khach-san', img: 'https://picsum.photos/seed/hotel/400/200' },
                ].map((item) => (
                  <Link key={item.tag} to={`/san-pham?tag=${item.tag}`} className="block group">
                    <div className="relative h-24 overflow-hidden mb-3">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-accent/20 group-hover:bg-transparent transition-colors"></div>
                    </div>
                    <span className="text-[10px] font-bold text-dim uppercase tracking-widest group-hover:text-accent transition-colors">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-card-bg border-2 border-border-dim p-8">
              <h2 className="text-2xl font-serif italic text-accent mb-10 border-b-2 border-accent/20 pb-4">
                Theo phân khúc
              </h2>
              <ul className="space-y-8">
                {[
                  { name: 'Cơ bản (Giá tốt)', price: 'basic', desc: 'Giải pháp tối ưu ngân sách' },
                  { name: 'Cao cấp', price: 'premium', desc: 'Chất lượng vượt trội' },
                  { name: 'Luxury', price: 'luxury', desc: 'Đẳng cấp & Khác biệt' },
                ].map((item) => (
                  <li key={item.price}>
                    <Link to={`/san-pham?price=${item.price}`} className="block group">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold text-main uppercase tracking-widest group-hover:text-accent transition-colors">
                          {item.name}
                        </span>
                        <ChevronRight className="w-4 h-4 text-border-dim group-hover:translate-x-1 transition-transform" />
                      </div>
                      <p className="text-[10px] text-dim italic">{item.desc}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Danh mục sản phẩm */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card-bg border-2 border-border-dim p-8"
          >
            <h2 className="text-2xl font-serif italic text-accent mb-10 border-b-2 border-accent/20 pb-4">
              Dòng sản phẩm
            </h2>
            <div className="space-y-8 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
              {Object.entries(categories).map(([mainCategory, subCategories]) => (
                <div key={mainCategory} className="border-b border-border-dim pb-6 last:border-0">
                  <h3 className="text-[11px] font-bold text-main mb-4 uppercase tracking-[0.2em] flex items-center">
                    <span className="w-2 h-2 bg-accent mr-3"></span>
                    {mainCategory}
                  </h3>
                  <ul className="space-y-3 pl-5">
                    {Object.keys(subCategories).map(sub => (
                      <li key={sub}>
                        <Link to={`/san-pham?group=${sub}`} className="text-[10px] text-dim hover:text-accent uppercase tracking-widest transition-colors flex items-center">
                          {sub}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
