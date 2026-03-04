import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Package, Check } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useHomeContent } from '../context/HomeContentContext';

gsap.registerPlugin(ScrollTrigger);

const Products = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { products } = useProducts();
  const { homeContent } = useHomeContent();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.products-badge', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from('.products-title', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });


    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    products.length === 0 ? null : (
    <section
      id="products"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-gray-50"
    >
      <div className="section-padding">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="products-badge inline-flex items-center gap-2 px-4 py-2 
                         bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
            <Package className="w-4 h-4" />
            {homeContent.productsBadgeText}
          </span>
          <h2 className="products-title text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {homeContent.productsTitle}
          </h2>
          <p className="text-gray-600 text-lg">
            {homeContent.productsSubtitle}
          </p>
        </div>

        {/* Featured Product */}
        <div className="mb-10">
          <Link
            to={`/products/${products[0].id}`}
            className="product-card group block bg-white rounded-2xl overflow-hidden shadow-lg
                     hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-72 lg:h-96">
                <img
                  src={products[0].detailImage}
                  alt={products[0].title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                <div className="absolute top-4 left-4 px-3 py-1 bg-yellow-400 text-gray-900 rounded-full text-sm font-bold">
                  Featured
                </div>
                <div className="absolute bottom-4 left-4">
                  <p className="text-white/80 text-sm mb-1">{products[0].subtitle}</p>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white">{products[0].title}</h3>
                </div>
              </div>
              <div className="p-6 lg:p-8 flex flex-col justify-center">
                <p className="text-gray-600 mb-6">{products[0].shortDescription}</p>
                <div className="space-y-2 mb-6">
                  {products[0].features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700 text-sm">{f}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {products[0].summaryItems.map((item, i) => (
                    <span key={i} className="px-3 py-1 bg-green-50 text-green-700 text-sm rounded-lg">
                      {item}
                    </span>
                  ))}
                </div>
                <span className="text-green-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                  View Details <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Products Grid */}
        <div ref={trackRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(1).map((product, idx) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="product-card group bg-white rounded-xl overflow-hidden shadow-md
                       hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-48">
                <img
                  src={product.image}
                  alt={product.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-3 left-3 w-8 h-8 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">0{idx + 2}</span>
                </div>
                <div className="absolute bottom-3 left-3">
                  <p className="text-white/70 text-xs uppercase">{product.subtitle}</p>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                  {product.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.shortDescription}</p>
                <div className="flex flex-wrap gap-1.5">
                  {product.summaryItems.slice(0, 2).map((item, i) => (
                    <span key={i} className="px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-green-600 text-white 
                     px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
          >
            View All Products <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
    )
  );
};

export default Products;
