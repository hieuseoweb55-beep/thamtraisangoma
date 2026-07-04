import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ZaloButton from './components/ZaloButton';
import Home from './pages/Home';
import Sitemap from './pages/Sitemap';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Tools from './pages/Tools';
import About from './pages/About';
import Cart from './pages/Cart';
import Promotions from './pages/Promotions';
import { CartProvider } from './context/CartContext';
import { InventoryProvider } from './context/InventoryContext';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <InventoryProvider>
      <CartProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-bg text-text-main font-sans">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sitemap" element={<Sitemap />} />
                <Route path="/san-pham" element={<Products />} />
                <Route path="/san-pham/:id" element={<ProductDetail />} />
                <Route path="/cong-cu" element={<Tools />} />
                <Route path="/khuyen-mai" element={<Promotions />} />
                <Route path="/ve-goma" element={<About />} />
                <Route path="/gio-hang" element={<Cart />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <ZaloButton />
          </div>
        </Router>
      </CartProvider>
    </InventoryProvider>
  );
}
