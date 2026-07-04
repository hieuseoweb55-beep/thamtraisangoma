import { Building2, Users, Cpu, Target, Mail, Phone, MapPin } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-bg py-16">
      <div className="max-w-[85%] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="bg-card-bg border border-border-dim overflow-hidden mb-16">
          <div className="relative h-80 sm:h-96 lg:h-[500px]">
            <img 
              src="https://picsum.photos/seed/goma-office/1920/1080" 
              alt="Goma Office" 
              className="w-full h-full object-cover opacity-60"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent flex items-end">
              <div className="p-8 lg:p-16">
                <h1 className="text-5xl sm:text-6xl font-serif text-main tracking-tight mb-6">
                  Về <span className="text-accent italic">Goma Carpet</span>
                </h1>
                <p className="text-lg sm:text-xl text-dim max-w-3xl font-sans leading-relaxed">
                  Thương hiệu thảm trải sàn tiên phong, kết hợp hoàn hảo giữa chất lượng sản phẩm vượt trội và công nghệ quản lý thông minh.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-card-bg border border-border-dim p-10 lg:p-12">
              <h2 className="text-2xl font-serif text-main mb-8 flex items-center">
                <Building2 className="w-6 h-6 mr-4 text-accent" />
                Câu chuyện thương hiệu
              </h2>
              <div className="font-sans text-dim leading-relaxed space-y-6">
                <p>
                  Goma Carpet được thành lập với sứ mệnh mang đến những giải pháp trải sàn toàn diện, nâng tầm không gian sống và làm việc tại Việt Nam. Chúng tôi không chỉ cung cấp thảm, chúng tôi cung cấp sự tiện nghi, thẩm mỹ và đẳng cấp.
                </p>
                <p>
                  Với danh mục sản phẩm đa dạng từ thảm tấm (Carpet Tiles) linh hoạt cho văn phòng, thảm cuộn (Carpet Rolls) sang trọng cho khách sạn, đến các dòng thảm mỹ thuật dệt Jacquard cao cấp nhập khẩu từ Bỉ, Goma tự hào đáp ứng mọi nhu cầu khắt khe nhất của khách hàng.
                </p>
              </div>
            </div>

            <div className="bg-card-bg border border-border-dim p-10 lg:p-12">
              <h2 className="text-2xl font-serif text-main mb-8 flex items-center">
                <Cpu className="w-6 h-6 mr-4 text-accent" />
                Dẫn đầu công nghệ AI
              </h2>
              <div className="font-sans text-dim leading-relaxed space-y-6">
                <p>
                  Điểm khác biệt cốt lõi của Goma nằm ở việc ứng dụng mạnh mẽ Trí tuệ nhân tạo (AI) vào quy trình vận hành. Hệ thống <strong className="text-main">Goma AI Assistant</strong> (Trợ lý Thùy Linh) được tích hợp sâu vào khâu tư vấn, báo giá và điều phối kho bãi.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong className="text-main">Tối ưu hóa logistics:</strong> AI tự động tính toán khối lượng, kích thước và đề xuất phương tiện vận chuyển rẻ nhất, giúp khách hàng tiết kiệm tối đa chi phí.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong className="text-main">Tính toán vật tư chính xác:</strong> Hệ thống tự động quy đổi m² sang số thùng, số tấm lẻ hoặc mét dài cắt cuộn với độ chính xác tuyệt đối.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong className="text-main">Quản lý tồn kho thời gian thực:</strong> Đảm bảo thông tin hàng hóa luôn minh bạch và cập nhật liên tục.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-card-bg border border-border-dim p-10 lg:p-12">
              <h2 className="text-2xl font-serif text-main mb-8 flex items-center">
                <Target className="w-6 h-6 mr-4 text-accent" />
                Định hướng tương lai
              </h2>
              <div className="font-sans text-dim leading-relaxed">
                <p>
                  Goma hướng tới việc trở thành hệ sinh thái vật liệu sàn thông minh số 1 Đông Nam Á. Chúng tôi tiếp tục mở rộng dải sản phẩm, nâng cấp trải nghiệm người dùng thông qua các công cụ thực tế ảo (AR/VR) giúp khách hàng ướm thử thảm vào không gian thực tế trước khi mua.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-12">
            <div className="bg-accent rounded-none p-10 text-bg">
              <h2 className="text-2xl font-serif mb-8 flex items-center">
                <Users className="w-6 h-6 mr-4" />
                Liên hệ
              </h2>
              <ul className="space-y-8">
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="block text-[10px] uppercase tracking-widest mb-2 opacity-80">Kho trung tâm HCM:</strong>
                    <span className="text-sm font-medium">326 Nguyễn Thị Tú, Phường Bình Hưng Hòa B, Quận Bình Tân, TP.HCM</span>
                  </div>
                </li>
                <li className="flex items-center">
                  <Phone className="w-5 h-5 mr-4 flex-shrink-0" />
                  <div>
                    <strong className="block text-[10px] uppercase tracking-widest mb-2 opacity-80">Hotline (Mr. Hiếu):</strong>
                    <span className="text-2xl font-serif">0936 250 263</span>
                  </div>
                </li>
                <li className="flex items-center">
                  <Mail className="w-5 h-5 mr-4 flex-shrink-0" />
                  <div>
                    <strong className="block text-[10px] uppercase tracking-widest mb-2 opacity-80">Email:</strong>
                    <span className="text-sm font-medium">hieu.seoweb55@gmail.com</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-card-bg border border-border-dim p-10">
              <h3 className="text-xs font-bold text-main uppercase tracking-[0.2em] mb-6">Giờ làm việc</h3>
              <ul className="space-y-4 text-sm font-sans">
                <li className="flex justify-between border-b border-border-dim pb-3">
                  <span className="text-dim">Thứ 2 - Thứ 6:</span>
                  <span className="font-bold text-main">08:00 - 17:30</span>
                </li>
                <li className="flex justify-between border-b border-border-dim pb-3">
                  <span className="text-dim">Thứ 7:</span>
                  <span className="font-bold text-main">08:00 - 12:00</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-dim">Chủ nhật:</span>
                  <span className="font-bold text-red-400">Nghỉ</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
