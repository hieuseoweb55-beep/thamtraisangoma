import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../data/products';
import { ShoppingCart } from 'lucide-react';
import AddToCartModal from './AddToCartModal';

interface ProductCardProps {
  product: Product;
  key?: React.Key;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="group bg-white rounded-none border border-border-dim hover:border-accent transition-all duration-700 overflow-hidden flex flex-col shadow-sm hover:shadow-2xl">
        <Link 
          to={`/san-pham/${product.id}`} 
          className="relative aspect-[4/5] overflow-hidden bg-bg block"
        >
          <img 
            src={product.anh_1 || 'https://picsum.photos/seed/carpet/600/800'} 
            alt={product.ma_hang}
            className="object-cover w-full h-full opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 right-4 bg-accent/90 backdrop-blur-sm text-bg px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em]">
            {product.nhom_hang}
          </div>
        </Link>
        
        <div className="p-6 flex flex-col flex-grow">
          <Link to={`/san-pham/${product.id}`}>
            <h3 className="text-lg font-serif italic text-main mb-2 transition-colors group-hover:text-accent">
              {product.ma_hang}
            </h3>
          </Link>
          <p className="text-[10px] text-dim mb-6 uppercase tracking-[0.3em] font-medium">
            {product.loai_hang}
          </p>
          
          <div className="mt-auto flex items-end justify-between border-t border-border-dim pt-6">
            <div>
              <p className="text-[9px] text-dim uppercase tracking-[0.3em] mb-2 font-bold">Giá niêm yết</p>
              <p className="text-xl font-serif text-accent">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.gia_tien)}
                <span className="text-[10px] font-sans text-dim ml-1 italic">/{product.don_vi_tinh}</span>
              </p>
            </div>
            
            <button 
              onClick={(e) => {
                e.preventDefault();
                setIsModalOpen(true);
              }}
              className="w-12 h-12 flex items-center justify-center bg-bg border border-border-dim text-dim hover:bg-accent hover:text-bg hover:border-accent transition-all duration-500"
              title="Thêm vào giỏ hàng"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <AddToCartModal 
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
