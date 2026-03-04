import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Package, ChevronRight, Check } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

gsap.registerPlugin(ScrollTrigger);

const ProductsPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const { products } = useProducts();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Page header animation
      gsap.from('.page-header-content', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      // Product cards animation
      gsap.from('.product-category-card', {
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.products-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="pt-20">
      {/* Page Header */}
      <section className="relative py-20 lg:py-28 bg-dark overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/about-variety.jpg"
            alt="Products background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/90 to-dark/70" />
        </div>

        <div className="section-padding relative z-10">
          <div className="page-header-content max-w-3xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-white/60 text-sm mb-6">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">Products</span>
            </div>

            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 
                           text-primary-light rounded-full text-sm font-medium mb-4">
              <Package className="w-4 h-4" />
              Our Products
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Premium Animal <span className="text-primary-light">Feed Products</span>
            </h1>
            <p className="text-lg text-white/70 leading-relaxed">
              Discover our comprehensive range of high-quality animal feed products. 
              From premium hays to specialized supplements, we have everything your livestock needs.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="section-padding">
          <div className="products-grid space-y-20">
            {products.map((product, index) => (
              <div
                key={product.id}
                className={`product-category-card grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center
                          ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Image */}
                <div className={`relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-[400px] lg:h-[500px] object-cover transition-transform 
                               duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full 
                                     text-primary font-semibold text-sm">
                        {product.subtitle}
                      </span>
                    </div>

                    {/* Title Overlay */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <h2 className="text-3xl font-bold text-white mb-2">
                        {product.title}
                      </h2>
                    </div>
                  </div>

                  {/* Decorative Element */}
                  <div className={`absolute -z-10 w-full h-full bg-primary/10 rounded-3xl 
                                ${index % 2 === 0 ? '-bottom-4 -left-4' : '-bottom-4 -right-4'}`} />
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    {product.description}
                  </p>

                  {/* Items List */}
                  <div className="space-y-6">
                    {product.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="bg-green-50 rounded-xl p-5 hover:bg-green-100 
                                 transition-colors duration-300"
                      >
                        <h3 className="text-lg font-bold text-dark mb-2">
                          {item.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">
                          {item.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {item.benefits.map((benefit, bIndex) => (
                            <span
                              key={bIndex}
                              className="inline-flex items-center gap-1 px-2 py-1 
                                       bg-white rounded-md text-xs text-primary"
                            >
                              <Check className="w-3 h-3" />
                              {benefit}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link
                    to={`/products/${product.id}`}
                    className="inline-flex items-center gap-2 mt-8 bg-primary text-white 
                             px-6 py-3.5 rounded-xl font-semibold transition-all duration-300
                             hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/30
                             hover:-translate-y-0.5 group"
                  >
                    View Details
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 
                                         group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 grain-texture opacity-10" />
        <div className="section-padding relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Need Help Choosing the Right Product?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Our experts are here to help you find the perfect feed solution for your livestock.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-primary 
                       px-8 py-4 rounded-xl font-semibold transition-all duration-300
                       hover:bg-accent hover:text-dark hover:shadow-xl
                       hover:-translate-y-0.5 group"
            >
              Contact Our Experts
              <ArrowRight className="w-5 h-5 transition-transform duration-300 
                                   group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
