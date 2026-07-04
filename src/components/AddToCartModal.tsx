import React, { useState, useMemo, useEffect } from 'react';
import { Product } from '../data/products';
import { X, Calculator, Package, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { useInventory } from '../context/InventoryContext';
import { useNavigate } from 'react-router-dom';

interface AddToCartModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function AddToCartModal({ product, isOpen, onClose }: AddToCartModalProps) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { inventory } = useInventory();
  const [m2, setM2] = useState<string>('');
  const [meters, setMeters] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  const carpetWidth = useMemo(() => {
    const match = product.thong_tin_hang.match(/Khổ thảm\s*:\s*([\d.]+)\s*[mM]/i);
    return match ? parseFloat(match[1]) : 0;
  }, [product]);

  const normalizedKey = useMemo(() => product.ma_hang.replace(/[\s-]/g, '').toUpperCase(), [product.ma_hang]);
  const stock = inventory[normalizedKey] ?? product.ton_kho;

  const handleM2Change = (val: string) => {
    setM2(val);
    if (carpetWidth > 0 && val && !isNaN(parseFloat(val))) {
      const calculatedMeters = parseFloat(val) / carpetWidth;
      setMeters(calculatedMeters.toFixed(2));
    } else {
      setMeters('');
    }
  };

  const handleMetersChange = (val: string) => {
    setMeters(val);
    if (carpetWidth > 0 && val && !isNaN(parseFloat(val))) {
      const calculatedM2 = parseFloat(val) * carpetWidth;
      setM2(calculatedM2.toFixed(2));
    } else {
      setM2('');
    }
  };

  const handleConfirm = () => {
    const finalQty = product.loai_hang === 'thảm cuộn' ? parseFloat(m2) : quantity;
    if (isNaN(finalQty) || finalQty <= 0) {
      alert('Vui lòng nhập số lượng hợp lệ');
      return;
    }
    addToCart(product, finalQty);
    onClose();
    navigate('/gio-hang');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-card-bg border border-border-dim p-8 shadow-2xl"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-dim hover:text-accent transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 border border-border-dim overflow-hidden bg-bg">
                <img src={product.anh_1} alt={product.ma_hang} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div>
                <h2 className="text-xl font-serif text-main">{product.ma_hang}</h2>
                <p className="text-accent font-bold">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.gia_tien)}/{product.don_vi_tinh}
                </p>
                {product.loai_hang === 'thảm tấm' && (
                  <p className="text-[10px] text-dim mt-1">
                    * Quy cách: 1 m² = 4 tấm (tương đương {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.gia_tien * 4)}/m²)
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-6">
              {product.loai_hang === 'thảm cuộn' ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent mb-2">
                    <Calculator className="w-4 h-4" />
                    Tính toán theo khổ thảm: {carpetWidth}m
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-dim mb-2">Số lượng (m²)</label>
                      <input 
                        type="number" 
                        value={m2}
                        onChange={(e) => handleM2Change(e.target.value)}
                        placeholder="Nhập m²"
                        className="w-full bg-bg border border-border-dim px-4 py-3 text-main focus:border-accent outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-dim mb-2">Mét dài (mD)</label>
                      <input 
                        type="number" 
                        value={meters}
                        onChange={(e) => handleMetersChange(e.target.value)}
                        placeholder="Nhập mét dài"
                        className="w-full bg-bg border border-border-dim px-4 py-3 text-main focus:border-accent outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-dim mb-2">Số lượng ({product.don_vi_tinh})</label>
                  <div className="flex items-center">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 border border-border-dim flex items-center justify-center hover:bg-accent hover:text-bg transition-all"
                    >
                      -
                    </button>
                    <input 
                      type="number" 
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                      className="w-20 h-12 border-y border-border-dim bg-bg text-center text-main outline-none"
                    />
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 border border-border-dim flex items-center justify-center hover:bg-accent hover:text-bg transition-all"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {stock !== undefined && (
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-dim">
                  <Package className="w-4 h-4 text-accent" />
                  Tồn kho thực tế: {stock} {product.don_vi_tinh}
                </div>
              )}

              <div className="pt-6 border-t border-border-dim">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-dim">Tạm tính:</span>
                  <span className="text-2xl font-serif text-accent">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                      product.gia_tien * (product.loai_hang === 'thảm cuộn' ? parseFloat(m2) || 0 : quantity)
                    )}
                  </span>
                </div>
                <button 
                  onClick={handleConfirm}
                  className="w-full bg-accent text-bg py-4 font-bold text-sm uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Xác nhận thêm vào giỏ hàng
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
