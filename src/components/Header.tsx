import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Map, ShoppingBag, Wrench, Info, ShoppingCart, Tag, Package, ChevronDown, ChevronRight } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { categories } from '../data/products';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { totalItems } = useCart();
  const location = useLocation();

  const navLinks = [
    { name: 'Sitemap', path: '/sitemap', icon: <Map className="w-4 h-4 mr-2" /> },
    { name: 'Danh mục', path: '/san-pham', icon: <ShoppingBag className="w-4 h-4 mr-2" />, hasDropdown: true },
    { name: 'Công cụ', path: '/cong-cu', icon: <Wrench className="w-4 h-4 mr-2" /> },
    { name: 'Xả kho', path: '/khuyen-mai', icon: <Tag className="w-4 h-4 mr-2" /> },
    { name: 'Về Goma', path: '/ve-goma', icon: <Info className="w-4 h-4 mr-2" /> },
  ];

  // 3-level dropdown structure
  const menuStructure = useMemo(() => {
    return {
      "thảm tấm": {
        "Sapphire": ["Sapphire"],
        "Melody": ["Melody C", "Melody X", "Melody DK", "Melody Forest"],
        "Shining": ["Shining AL", "Shining KN"]
      },
      "thảm cuộn": {
        "Rainbow": ["Rainbow C", "Rainbow 866", "Rainbow PT"],
        "Cao cấp": ["Manila", "ThaiSilk Line", "Diamond", "Sky", "Wilton"]
      },
      "thảm mỹ thuật": {
        "Nghệ thuật": ["Dệt Jacquard"]
      },
      "phụ kiện thảm": {
        "Vật tư": ["Underlay", "Dụng cụ", "Vật tư"]
      }
    };
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-bg border-b-2 border-border-dim sticky top-0 z-50">
      <div className="max-w-[85%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="font-serif font-bold text-2xl text-accent tracking-[0.2em] uppercase">GOMA</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <div 
                key={link.path} 
                className="relative group h-full flex items-center"
                onMouseEnter={() => link.hasDropdown && setActiveDropdown('main')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={link.path}
                  className={`px-1 py-2 text-[11px] uppercase tracking-[0.15em] font-bold transition-all duration-300 flex items-center ${
                    isActive(link.path) ? 'text-accent border-b-2 border-accent' : 'text-dim hover:text-accent'
                  }`}
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown className="w-3 h-3 ml-1" />}
                </Link>

                {/* 3-Level Dropdown */}
                {link.hasDropdown && activeDropdown === 'main' && (
                  <div className="absolute top-full left-0 w-[450px] bg-bg border-2 border-border-dim shadow-2xl flex animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* Level 1: Categories */}
                    <div className="w-1/2 border-r border-border-dim bg-card-bg/50">
                      {Object.keys(menuStructure).map((cat) => (
                        <div key={cat} className="group/cat relative">
                          <Link 
                            to={`/san-pham?category=${cat}`}
                            className="flex items-center justify-between px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-dim hover:text-accent hover:bg-bg transition-all"
                          >
                            {cat}
                            <ChevronRight className="w-3 h-3" />
                          </Link>
                          
                          {/* Level 2: Types */}
                          <div className="absolute top-0 left-full w-full h-full bg-bg border-r border-border-dim hidden group-hover/cat:block">
                            {Object.keys(menuStructure[cat as keyof typeof menuStructure]).map((type) => (
                              <div key={type} className="group/type relative">
                                <div className="flex items-center justify-between px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-dim hover:text-accent hover:bg-card-bg transition-all cursor-default">
                                  {type}
                                  <ChevronRight className="w-3 h-3" />
                                </div>

                                {/* Level 3: Groups */}
                                <div className="absolute top-0 left-full w-full bg-bg border-r border-border-dim hidden group-hover/type:block shadow-xl">
                                  {menuStructure[cat as keyof typeof menuStructure][type as keyof (typeof menuStructure)["thảm tấm"]].map((group) => (
                                    <Link
                                      key={group}
                                      to={`/san-pham?group=${group}`}
                                      className="block px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-dim hover:text-accent hover:bg-card-bg transition-all"
                                    >
                                      {group}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            <Link to="/gio-hang" className={`relative p-2 transition-colors ${isActive('/gio-hang') ? 'text-accent' : 'text-dim hover:text-accent'}`}>
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-bg text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-none border-2 border-bg">
                  {totalItems}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden space-x-4">
            <Link to="/gio-hang" className={`relative p-2 transition-colors ${isActive('/gio-hang') ? 'text-accent' : 'text-dim hover:text-accent'}`}>
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-bg text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-none border-2 border-bg">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-none text-dim hover:text-accent hover:bg-card-bg focus:outline-none transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-bg border-t-2 border-border-dim">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-4 text-xs uppercase tracking-widest font-bold transition-all ${
                  isActive(link.path) ? 'text-accent bg-card-bg' : 'text-dim hover:text-accent hover:bg-card-bg'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
