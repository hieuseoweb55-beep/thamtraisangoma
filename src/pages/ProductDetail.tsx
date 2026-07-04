import { useParams, Link, useNavigate } from 'react-router-dom';
import { products, Product } from '../data/products';
import { ArrowLeft, ShoppingCart, Info, Shield, Truck } from 'lucide-react';
import { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import AddToCartModal from '../components/AddToCartModal';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);
  
  const [activeImage, setActiveImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { inventory } = useInventory();

  const normalizedKey = product?.ma_hang.replace(/[\s-]/g, '').toUpperCase() || '';
  const stock = product ? (inventory[normalizedKey] ?? product.ton_kho) : undefined;

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-bg px-4">
        <h2 className="text-2xl font-serif italic text-accent mb-4">Không tìm thấy sản phẩm</h2>
        <p className="text-dim mb-8 uppercase tracking-widest text-xs">Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        <button 
          onClick={() => navigate('/san-pham')}
          className="inline-flex items-center px-8 py-4 border border-accent text-xs font-bold uppercase tracking-widest text-accent hover:bg-accent hover:text-bg transition-all"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Về danh mục sản phẩm
        </button>
      </div>
    );
  }

  const images = [product.anh_1, product.anh_2].filter(Boolean) as string[];
  const hasMultipleImages = images.length > 1;

  return (
    <div className="min-h-screen bg-bg py-16">
      <div className="max-w-[85%] mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-dim hover:text-accent mb-12 transition-all"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại
        </button>

        <div className="bg-card-bg border border-border-dim overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image Gallery */}
            <div className="p-8 lg:p-12 bg-black/20 border-r border-border-dim">
              <div className="aspect-square overflow-hidden bg-bg border border-border-dim mb-6">
                <img 
                  src={images[activeImage] || 'https://picsum.photos/seed/carpet/800/800'} 
                  alt={product.ma_hang}
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                  referrerPolicy="no-referrer"
                />
              </div>
              {hasMultipleImages && (
                <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
                  {images.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`relative w-20 h-20 overflow-hidden border transition-all ${
                        activeImage === idx ? 'border-accent' : 'border-border-dim hover:border-dim'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover opacity-60 hover:opacity-100" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-8 lg:p-16 flex flex-col">
              <div className="mb-6 flex items-center gap-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 border border-accent/30 text-accent">
                  {product.loai_hang}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 border border-border-dim text-dim">
                  {product.nhom_hang}
                </span>
                {stock !== undefined && (
                  <span className={`text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 border ${stock > 0 ? 'border-green-500/30 text-green-500' : 'border-red-500/30 text-red-500'}`}>
                    {stock > 0 ? `Còn hàng: ${stock} ${product.don_vi_tinh}` : 'Hết hàng'}
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-serif text-main tracking-tight mb-6">
                {product.ma_hang}
              </h1>
              
              <div className="mb-12">
                <p className="text-4xl font-serif text-accent">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.gia_tien)}
                  <span className="text-base font-sans font-normal text-dim ml-2">/{product.don_vi_tinh}</span>
                </p>
                {product.loai_hang === 'thảm tấm' && (
                  <div className="mt-4 p-4 border border-border-dim bg-accent/5 max-w-md">
                    <p className="text-xs text-main">
                      * Quy cách thảm tấm: <span className="font-bold text-accent">1 m² = 4 tấm</span>
                    </p>
                    <p className="text-[11px] text-dim mt-1">
                      Đơn giá tương đương: <span className="font-semibold">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.gia_tien * 4)}/m²</span>
                    </p>
                  </div>
                )}
              </div>

              <div className="mb-12">
                <h3 className="text-xs font-bold text-main uppercase tracking-[0.2em] mb-4">Thông số kỹ thuật</h3>
                <div className="text-dim font-sans leading-relaxed whitespace-pre-line text-sm border-l border-border-dim pl-6">
                  {product.thong_tin_hang}
                </div>
              </div>

              {product.dac_diem_nhan_dang && (
                <div className="mb-12">
                  <h3 className="text-xs font-bold text-main uppercase tracking-[0.2em] mb-4 flex items-center">
                    <Info className="w-4 h-4 mr-2 text-accent" /> Đặc điểm nhận dạng
                  </h3>
                  <p className="text-dim italic bg-accent/5 p-6 border-l-2 border-accent leading-relaxed text-sm">
                    {product.dac_diem_nhan_dang}
                  </p>
                </div>
              )}

              <div className="mt-auto pt-12 border-t border-border-dim flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="flex-1 bg-accent text-bg px-8 py-4 font-bold text-sm uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Thêm vào giỏ hàng
                </button>
                <Link to="/cong-cu" className="flex-1 bg-transparent text-main border border-border-dim px-8 py-4 font-bold text-sm uppercase tracking-widest hover:border-accent transition-all flex items-center justify-center text-center">
                  Tính toán vật tư
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-6 text-[10px] font-bold uppercase tracking-widest text-dim">
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-2 text-accent/60" />
                  Bảo hành chính hãng
                </div>
                <div className="flex items-center">
                  <Truck className="w-4 h-4 mr-2 text-accent/60" />
                  Giao hàng toàn quốc
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddToCartModal 
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
