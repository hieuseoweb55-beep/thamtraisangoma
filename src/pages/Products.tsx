import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Filter, Search, X } from 'lucide-react';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const groupFilter = searchParams.get('group');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    const normalize = (str: string) => str.replace(/[\s-]/g, '').toLowerCase();
    const normalizedSearch = normalize(searchTerm);

    return products.filter(product => {
      const matchesCategory = categoryFilter ? product.loai_hang === categoryFilter : true;
      const matchesGroup = groupFilter ? product.nhom_hang === groupFilter : true;
      
      const normalizedMaHang = normalize(product.ma_hang);
      const normalizedNhomHang = normalize(product.nhom_hang);
      
      const matchesSearch = normalizedMaHang.includes(normalizedSearch) || 
                            normalizedNhomHang.includes(normalizedSearch);
      return matchesCategory && matchesGroup && matchesSearch;
    });
  }, [categoryFilter, groupFilter, searchTerm]);

  const handleCategoryClick = (category: string) => {
    if (categoryFilter === category) {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
      searchParams.delete('group'); // Reset group when changing category
    }
    setSearchParams(searchParams);
  };

  const handleGroupClick = (group: string) => {
    if (groupFilter === group) {
      searchParams.delete('group');
    } else {
      searchParams.set('group', group);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen bg-bg py-20">
      <div className="max-w-[85%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-20 gap-8">
          <div>
            <h1 className="text-5xl font-serif italic text-main tracking-tight mb-4">Bộ sưu tập Goma</h1>
            <div className="w-20 h-1 bg-accent mb-4"></div>
            <p className="text-dim font-sans uppercase tracking-[0.3em] text-[10px] font-bold">Premium Carpet Solutions for Every Space</p>
          </div>
          
          <div className="w-full md:w-auto flex gap-4">
            <div className="relative flex-grow md:w-80">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-accent" />
              </div>
              <input
                type="text"
                className="block w-full pl-12 pr-6 py-4 bg-white border border-border-dim text-main placeholder-dim/50 focus:outline-none focus:border-accent transition-all text-sm shadow-sm"
                placeholder="Tìm kiếm mã hàng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden inline-flex items-center px-6 py-4 bg-white border border-border-dim text-xs font-bold uppercase tracking-widest text-main hover:border-accent transition-all"
            >
              <Filter className="h-4 w-4 mr-2" />
              Lọc
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-16">
          {/* Sidebar Filters */}
          <div className={`md:w-72 flex-shrink-0 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
            <div className="bg-white border border-border-dim p-10 sticky top-32 shadow-sm">
              <div className="flex justify-between items-center mb-6 md:hidden">
                <h2 className="text-lg font-serif text-main">Bộ lọc</h2>
                <button onClick={() => setIsFilterOpen(false)} className="text-dim hover:text-main">
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <h3 className="text-xs font-sans font-bold text-accent uppercase tracking-[0.2em] mb-6">Loại thảm</h3>
              <div className="space-y-1 mb-10">
                {Object.keys(categories).map(category => (
                  <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className={`block w-full text-left px-3 py-2 text-sm transition-all ${
                      categoryFilter === category 
                        ? 'text-accent font-medium' 
                        : 'text-dim hover:text-main'
                    }`}
                  >
                    <span className="capitalize">{category}</span>
                  </button>
                ))}
              </div>

              {categoryFilter && categories[categoryFilter as keyof typeof categories] && (
                <>
                  <h3 className="text-xs font-sans font-bold text-accent uppercase tracking-[0.2em] mb-6 border-t border-border-dim pt-8">Nhóm hàng</h3>
                  <div className="space-y-1">
                    {Object.keys(categories[categoryFilter as keyof typeof categories]).map(group => (
                      <button
                        key={group}
                        onClick={() => handleGroupClick(group)}
                        className={`block w-full text-left px-3 py-2 text-sm transition-all ${
                          groupFilter === group 
                            ? 'text-accent font-medium' 
                            : 'text-dim hover:text-main'
                        }`}
                      >
                        {group}
                      </button>
                    ))}
                  </div>
                </>
              )}
              
              {(categoryFilter || groupFilter || searchTerm) && (
                <button
                  onClick={() => {
                    setSearchParams({});
                    setSearchTerm('');
                  }}
                  className="mt-10 w-full text-center text-xs text-dim hover:text-red-400 font-bold uppercase tracking-widest py-3 border border-border-dim hover:border-red-400/30 transition-all"
                >
                  Xóa bộ lọc
                </button>
              )}
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="bg-card-bg border border-border-dim p-20 text-center">
                <div className="mx-auto h-16 w-16 text-border-dim mb-6">
                  <Search className="h-full w-full" />
                </div>
                <h3 className="text-xl font-serif text-main mb-2">Không tìm thấy sản phẩm</h3>
                <p className="text-dim">Vui lòng thử lại với từ khóa hoặc bộ lọc khác.</p>
              </div>
            ) : (
              <div>
                <div className="mb-8 text-xs text-dim uppercase tracking-widest">
                  Hiển thị <span className="text-main font-bold">{filteredProducts.length}</span> sản phẩm
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
