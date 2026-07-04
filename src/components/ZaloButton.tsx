import { motion } from 'motion/react';
import { Phone } from 'lucide-react';

export default function ZaloButton() {
  const phoneNumber = '0936250263';
  const zaloUrl = `https://zalo.me/${phoneNumber}`;

  return (
    <motion.a
      href={zaloUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-24 z-50 h-14 w-14 rounded-full bg-[#0068ff] text-white shadow-2xl flex items-center justify-center group"
      title="Chat Zalo với chúng tôi"
    >
      <div className="absolute right-full mr-3 bg-white text-[#0068ff] px-3 py-1 rounded-lg shadow-lg text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-[#0068ff]/20">
        Zalo: {phoneNumber}
      </div>
      <Phone size={24} fill="currentColor" />
      <span className="absolute -top-1 -right-1 flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-white"></span>
      </span>
    </motion.a>
  );
}
