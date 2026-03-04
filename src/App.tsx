import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import { ProductProvider } from './context/ProductContext';
import { HomeContentProvider } from './context/HomeContentContext';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize smooth scroll behavior
    const lenis = {
      raf: () => {
        ScrollTrigger.update();
      }
    };
    
    requestAnimationFrame(lenis.raf);
    
    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <Router>
      <HomeContentProvider>
        <ProductProvider>
          <div className="min-h-screen bg-white">
            <Navigation />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:category" element={<ProductDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin" element={<Admin />} />
              <Route path="/admin/footer" element={<Admin />} />
              <Route path="/admin/contact" element={<Admin />} />
              <Route path="/admin/products" element={<Admin />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ProductProvider>
      </HomeContentProvider>
    </Router>
  );
}

export default App;
