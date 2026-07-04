import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-9xl font-serif font-bold text-accent/20 mb-4">404</h1>
        <h2 className="text-3xl font-serif italic text-accent mb-6">Trang không tồn tại</h2>
        <p className="text-dim uppercase tracking-[0.2em] text-xs max-w-md mx-auto mb-12 leading-relaxed">
          Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển sang một địa chỉ khác.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            to="/"
            className="inline-flex items-center px-8 py-4 bg-accent text-bg text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-accent/90 transition-all w-full sm:w-auto justify-center"
          >
            <Home className="w-4 h-4 mr-2" /> Quay về trang chủ
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-8 py-4 border-2 border-accent text-accent text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-accent hover:text-bg transition-all w-full sm:w-auto justify-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại trang trước
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <Link to="/san-pham?category=thảm tấm" className="p-4 border border-accent/10 hover:border-accent/30 transition-all">
            <h3 className="text-xs font-bold uppercase tracking-wider mb-2">Thảm Tấm</h3>
            <p className="text-[10px] text-dim">Các dòng thảm tấm văn phòng hiện đại.</p>
          </Link>
          <Link to="/san-pham?category=thảm cuộn" className="p-4 border border-accent/10 hover:border-accent/30 transition-all">
            <h3 className="text-xs font-bold uppercase tracking-wider mb-2">Thảm Cuộn</h3>
            <p className="text-[10px] text-dim">Thảm cuộn sang trọng cho khách sạn, hội trường.</p>
          </Link>
          <Link to="/san-pham?category=thảm mỹ thuật" className="p-4 border border-accent/10 hover:border-accent/30 transition-all">
            <h3 className="text-xs font-bold uppercase tracking-wider mb-2">Thảm Mỹ Thuật</h3>
            <p className="text-[10px] text-dim">Điểm nhấn nghệ thuật cho không gian sống.</p>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
