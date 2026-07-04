import React, { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, Send, CheckCircle2, Truck, Info, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { sendOrderToTelegram } from '../services/telegramService';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    distance: '10', // Default distance in km
    noFolding: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  // Weight calculation logic
  const totalWeight = useMemo(() => {
    return cart.reduce((sum, item) => {
      let weightPerUnit = 0;
      const loai = item.loai_hang.toLowerCase();
      const nhom = item.nhom_hang.toLowerCase();
      const ma = item.ma_hang.toLowerCase();

      if (loai === 'thảm tấm') {
        // Trọng lượng mặc định thảm tấm: 1 kg/tấm
        // Some items are 925g/tấm, 1000g/tấm, 1025g/tấm.
        const match = item.thong_tin_hang.match(/(?:Tổng trọng lượng|Trọng lượng)\s*:\s*([\d.]+)\s*g\/\s*tấm/i);
        if (match) {
          weightPerUnit = parseFloat(match[1]) / 1000;
        } else {
          weightPerUnit = 1.0;
        }
      } else if (loai === 'thảm cuộn') {
        if (nhom.includes('866')) {
          weightPerUnit = 1.4;
        } else if (nhom.includes('diamond')) {
          weightPerUnit = 1.4;
        } else if (nhom.includes('rainbow c') || ma.startsWith('c10') || ma.startsWith('c20')) {
          weightPerUnit = 1.9;
        } else if (nhom.includes('pt')) {
          weightPerUnit = 1.65;
        } else if (nhom.includes('manila')) {
          weightPerUnit = 1.85;
        } else if (nhom.includes('sky')) {
          if (ma.includes('cl-p') || ma.includes('clp')) {
            weightPerUnit = 2.6;
          } else if (ma.startsWith('t') && !isNaN(parseInt(ma.substring(1)))) {
            weightPerUnit = 2.0;
          } else {
            weightPerUnit = 2.2; // QD, BG, JZ
          }
        } else if (nhom.includes('thaisilk') || nhom.includes('shr')) {
          weightPerUnit = 1.55;
        } else if (nhom.includes('wilton') || ma.startsWith('rp') || ma.startsWith('vg')) {
          weightPerUnit = 2.0;
        } else {
          weightPerUnit = 1.9; // Default thảm cuộn
        }
      } else if (loai === 'thảm mỹ thuật') {
        weightPerUnit = 13.0; // 13kg/cuộn
      } else if (loai === 'phụ kiện thảm' || nhom.includes('phụ kiện') || nhom.includes('phu kien')) {
        if (ma.includes('underlay')) {
          weightPerUnit = 20.0; // 20kg/cuộn
        } else if (ma.includes('nẹp đinh') || ma.includes('nep dinh')) {
          weightPerUnit = 8.0; // 8kg/thùng
        } else if (ma.includes('băng keo') || ma.includes('bang keo')) {
          weightPerUnit = 1.0; // 1kg/cuộn
        } else {
          weightPerUnit = 1.0; // Default for other accessories
        }
      } else {
        weightPerUnit = 1.0;
      }
      return sum + (weightPerUnit * item.quantity);
    }, 0);
  }, [cart]);

  const totalM2 = useMemo(() => {
    return cart.reduce((sum, item) => {
      if (item.don_vi_tinh === 'm2') return sum + item.quantity;
      if (item.don_vi_tinh === 'tấm') return sum + (item.quantity * 0.25);
      return sum;
    }, 0);
  }, [cart]);

  const isFreeship = useMemo(() => {
    const distance = parseFloat(formData.distance) || 0;
    return (totalM2 >= 20 || totalPrice >= 2000000) && distance <= 20;
  }, [totalM2, totalPrice, formData.distance]);

  const shippingInfo = useMemo(() => {
    const distance = parseFloat(formData.distance) || 0;
    let vehicle = "Xe Máy";
    
    // Calculate intermediate stats
    let totalTiles = 0;
    let totalTilesBoxes = 0;
    let thinRollM2 = 0;
    let thickRollM2 = 0;
    let maxRollLength = 0;
    let artCarpetCount = 0;

    cart.forEach(item => {
      const loai = item.loai_hang.toLowerCase();
      const nhom = item.nhom_hang.toLowerCase();
      const ma = item.ma_hang.toLowerCase();

      if (loai === 'thảm tấm') {
        totalTiles += item.quantity;
        // Determine box spec (Forest is 28 tiles, others are 24 tiles)
        const isForest = ma.includes('forest');
        const tilesPerBox = isForest ? 28 : 24;
        totalTilesBoxes += item.quantity / tilesPerBox;
      } else if (loai === 'thảm cuộn') {
        const isThin = nhom.includes('866') || nhom.includes('diamond');
        if (isThin) {
          thinRollM2 += item.quantity;
        } else {
          thickRollM2 += item.quantity;
        }

        // Calculate length in meters
        let width = 4.0;
        if (nhom.includes('thaisilk') || nhom.includes('shr')) {
          width = 3.98;
        } else if (nhom.includes('pt') || ma.startsWith('c10') || ((nhom.includes('sky') && (ma.includes('qd') || ma.includes('bg') || ma.includes('jz'))))) {
          width = 3.66;
        }
        const length = item.quantity / width;
        if (length > maxRollLength) {
          maxRollLength = length;
        }
      } else if (loai === 'thảm mỹ thuật') {
        artCarpetCount += item.quantity;
      }
    });

    // 1. Force 2-Ton truck if no folding is requested
    if (formData.noFolding) {
      vehicle = "Xe Tải 2 Tấn";
    } 
    // 2. Strict Weight-Based and Dimension-Based limits
    else if (totalWeight > 950 || maxRollLength > 25 || thinRollM2 > 500 || thickRollM2 > 350) {
      vehicle = "Xe Tải 2 Tấn";
    } else if (totalWeight >= 460 || maxRollLength > 15 || thinRollM2 > 300 || thickRollM2 > 200) {
      vehicle = "Xe Van Lớn (1000kg)";
    } else if (totalWeight > 200 || totalTilesBoxes > 8 || thinRollM2 >= 120 || thickRollM2 >= 60 || artCarpetCount > 6) {
      vehicle = "Xe Van Nhỏ (500kg)";
    } else if (totalWeight > 100 || totalTilesBoxes > 4 || thinRollM2 >= 60 || thickRollM2 >= 30 || artCarpetCount > 3) {
      // 2 Motorcycles option is preferred over Van if we can split and save cost
      vehicle = "Phương án 2 Xe Máy";
    } else {
      vehicle = "Xe Máy";
    }

    // Rates according to Goma formulas & support structures
    let feeRate = 15000; // default for Xe Máy
    if (vehicle === "Phương án 2 Xe Máy") {
      feeRate = 30000;
    } else if (vehicle === "Xe Van Nhỏ (500kg)") {
      feeRate = 30000;
    } else if (vehicle === "Xe Van Lớn (1000kg)") {
      feeRate = 40000;
    } else if (vehicle === "Xe Tải 2 Tấn") {
      feeRate = 60000;
    }

    // Base estimated cost (for non-freeship references)
    const baseFee = vehicle === "Xe Máy" ? 30000 : vehicle === "Phương án 2 Xe Máy" ? 60000 : vehicle.includes("Van Nhỏ") ? 150000 : vehicle.includes("Van Lớn") ? 250000 : 400000;
    const perKm = vehicle === "Xe Máy" ? 5000 : vehicle === "Phương án 2 Xe Máy" ? 10000 : vehicle.includes("Van") ? 15000 : 25000;
    const totalEstimatedFee = baseFee + (perKm * distance);

    let fee = 0;
    if (isFreeship) {
      fee = 0;
    } else if (totalM2 >= 20 || totalPrice >= 2000000) {
      // Eligible for Freeship, but distance > 20km: pay only for extra km
      const extraKm = Math.max(0, distance - 20);
      fee = feeRate * extraKm;
    } else {
      // Not eligible: full distance * feeRate
      fee = feeRate * distance;
    }

    return { vehicle, fee, totalEstimatedFee };
  }, [cart, totalWeight, totalM2, totalPrice, formData.distance, formData.noFolding, isFreeship]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);
    
    const orderData = {
      customerName: formData.name,
      phoneNumber: formData.phone,
      address: formData.address,
      items: cart.map(item => ({
        ma_hang: item.ma_hang,
        nhom_hang: item.nhom_hang,
        quantity: item.quantity,
        price: item.gia_tien,
        unit: item.don_vi_tinh
      })),
      totalPrice: totalPrice,
      totalWeight: totalWeight,
      shippingFee: shippingInfo.fee,
      vehicleType: shippingInfo.vehicle,
      isFreeship: isFreeship
    };

    const success = await sendOrderToTelegram(orderData);
    
    if (success) {
      setIsSuccess(true);
      clearCart();
    } else {
      alert('Có lỗi xảy ra khi gửi đơn hàng. Vui lòng thử lại hoặc liên hệ trực tiếp qua Zalo/Telegram.');
    }
    
    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-card-bg border border-border-dim p-12 text-center">
          <CheckCircle2 className="w-20 h-20 text-accent mx-auto mb-8" />
          <h1 className="text-3xl font-serif text-main mb-4">Đặt hàng thành công!</h1>
          <p className="text-dim mb-10 leading-relaxed">
            Cảm ơn anh/chị đã tin tưởng Goma Carpet. Em (Thùy Linh) đã gửi thông tin đến Mr. Hiếu. Chúng em sẽ gọi lại tư vấn ngay ạ!
          </p>
          <Link 
            to="/san-pham" 
            className="inline-block w-full py-4 bg-accent text-bg text-xs font-bold uppercase tracking-[0.2em] hover:bg-accent/90 transition-all"
          >
            Tiếp tục xem sản phẩm
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <ShoppingBag className="w-16 h-16 text-border-dim mx-auto mb-6" />
          <h1 className="text-2xl font-serif text-main mb-4">Giỏ hàng trống</h1>
          <p className="text-dim mb-10">Anh/chị chưa thêm sản phẩm nào vào giỏ hàng.</p>
          <Link 
            to="/san-pham" 
            className="inline-block px-10 py-4 border border-accent text-accent text-xs font-bold uppercase tracking-[0.2em] hover:bg-accent hover:text-bg transition-all"
          >
            Xem danh mục sản phẩm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg py-20">
      <div className="max-w-[85%] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif text-main mb-12 flex items-center">
          <ShoppingBag className="w-8 h-8 mr-4 text-accent" />
          Giỏ hàng của bạn
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div key={item.id} className="bg-card-bg border border-border-dim p-6 flex flex-col sm:flex-row items-center gap-6 group">
                <div className="w-24 h-24 flex-shrink-0 bg-bg border border-border-dim overflow-hidden">
                  <img 
                    src={item.anh_1} 
                    alt={item.ma_hang} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div className="flex-grow text-center sm:text-left">
                  <h3 className="text-lg font-serif text-main mb-1">{item.ma_hang}</h3>
                  <p className="text-xs text-dim uppercase tracking-widest mb-2">{item.nhom_hang}</p>
                  <p className="text-accent font-medium">
                    {new Intl.NumberFormat('vi-VN').format(item.gia_tien)}đ / {item.don_vi_tinh}
                  </p>
                </div>

                <div className="flex items-center border border-border-dim bg-bg">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-3 hover:text-accent transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-bold text-sm">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-3 hover:text-accent transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-right min-w-[120px]">
                  <p className="text-lg font-serif text-main mb-2">
                    {new Intl.NumberFormat('vi-VN').format(item.gia_tien * item.quantity)}đ
                  </p>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-dim hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            <div className="bg-accent/5 border border-accent/20 p-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-accent mb-4 flex items-center">
                <Truck className="w-4 h-4 mr-2" /> Ước tính vận chuyển
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-dim">Tổng diện tích:</span>
                    <span className="text-main font-bold">{totalM2.toFixed(2)} m²</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-dim">Tổng trọng lượng:</span>
                    <span className="text-main font-bold">{totalWeight.toFixed(2)} kg</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-dim">Phương tiện đề xuất:</span>
                    <span className="text-accent font-bold uppercase">{shippingInfo.vehicle}</span>
                  </div>
                </div>
                <div className="bg-bg p-4 border border-border-dim">
                  <div className="flex items-start gap-3 text-xs text-dim leading-relaxed">
                    <Info className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-accent mb-1 uppercase tracking-tighter">Chính sách Freeship:</p>
                      <p>- Miễn phí 20km đầu cho đơn ≥ 20m² hoặc ≥ 2 triệu VNĐ.</p>
                      <p>- Hỗ trợ tối đa theo loại xe điều phối.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-1">
            <div className="bg-card-bg border border-border-dim p-8 sticky top-28">
              <h2 className="text-xl font-serif text-main mb-8 pb-4 border-b border-border-dim">Thông tin đặt hàng</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold text-main uppercase tracking-widest mb-2">Họ tên người nhận</label>
                  <input 
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-bg border border-border-dim px-4 py-3 text-sm focus:outline-none focus:border-accent transition-all"
                    placeholder="Nhập họ tên..."
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-main uppercase tracking-widest mb-2">Số điện thoại</label>
                  <input 
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-bg border border-border-dim px-4 py-3 text-sm focus:outline-none focus:border-accent transition-all"
                    placeholder="Nhập số điện thoại..."
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-main uppercase tracking-widest mb-2">Địa chỉ giao hàng</label>
                  <textarea 
                    required
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full bg-bg border border-border-dim px-4 py-3 text-sm focus:outline-none focus:border-accent transition-all resize-none"
                    placeholder="Nhập địa chỉ chi tiết..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-main uppercase tracking-widest mb-2 flex items-center">
                      <MapPin className="w-3 h-3 mr-1" /> Khoảng cách (km)
                    </label>
                    <input 
                      type="number"
                      name="distance"
                      value={formData.distance}
                      onChange={handleInputChange}
                      className="w-full bg-bg border border-border-dim px-4 py-3 text-sm focus:outline-none focus:border-accent transition-all"
                    />
                  </div>
                  <div className="flex items-end pb-3">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        type="checkbox"
                        name="noFolding"
                        checked={formData.noFolding}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-accent"
                      />
                      <span className="text-[10px] font-bold uppercase tracking-tighter text-dim group-hover:text-accent transition-colors">Không được gấp</span>
                    </label>
                  </div>
                </div>

                <div className="pt-6 border-t border-border-dim space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-dim text-xs uppercase tracking-widest">Tạm tính hàng:</span>
                    <span className="text-main font-bold">
                      {new Intl.NumberFormat('vi-VN').format(totalPrice)}đ
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-dim text-xs uppercase tracking-widest">Phí vận chuyển:</span>
                    <span className={`font-bold ${isFreeship ? 'text-green-500' : 'text-main'}`}>
                      {isFreeship ? 'MIỄN PHÍ' : `${new Intl.NumberFormat('vi-VN').format(shippingInfo.fee)}đ`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-border-dim">
                    <span className="text-main text-sm font-bold uppercase tracking-widest">Tổng cộng:</span>
                    <span className="text-2xl font-serif text-accent">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice + shippingInfo.fee)}
                    </span>
                  </div>

                  <button 
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full py-5 bg-accent text-bg text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center hover:bg-white hover:text-accent border border-accent transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      "Đang xử lý..."
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-3" />
                        Xác nhận & Chốt đơn
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-dim text-center mt-4 italic">
                    * Đơn hàng sẽ được gửi đến Mr. Hiếu. Chúng tôi sẽ liên hệ lại để xác nhận phí ship cuối cùng và thời gian giao hàng.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
