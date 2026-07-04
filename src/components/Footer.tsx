import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-bg text-dim border-t border-border-dim py-10">
      <div className="max-w-[85%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] uppercase tracking-widest">
            © {new Date().getFullYear()} Goma Carpet. Leading with AI Integration.
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex flex-col items-center md:items-start">
              <span className="text-[10px] uppercase tracking-widest text-accent mb-1">Địa chỉ kho HCM</span>
              <span className="text-[10px] uppercase tracking-widest">326 Nguyễn Thị Tú, Bình Tân, TPHCM</span>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <span className="text-[10px] uppercase tracking-widest text-accent mb-1">Liên hệ Mr. Hiếu</span>
              <span className="text-[10px] uppercase tracking-widest">0936 250 263 | hieu.seoweb55@gmail.com</span>
            </div>
          </div>
          
          <div className="flex gap-8">
            <Link to="/sitemap" className="text-[10px] uppercase tracking-widest hover:text-accent transition-colors">Sitemap</Link>
            <Link to="/san-pham" className="text-[10px] uppercase tracking-widest hover:text-accent transition-colors">Sản phẩm</Link>
            <Link to="/gio-hang" className="text-[10px] uppercase tracking-widest hover:text-accent transition-colors">Giỏ hàng</Link>
          </div>

          <div className="text-[10px] opacity-50 font-mono">
            https://thamtraisangoma.io.vn/
          </div>
        </div>
      </div>
    </footer>
  );
}
