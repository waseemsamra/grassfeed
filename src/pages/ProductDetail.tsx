import { useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowLeft, ArrowRight, Check, Leaf, Package, 
  Truck, Shield, Clock, ChevronRight, Star,
  Phone
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';

gsap.registerPlugin(ScrollTrigger);

const ProductDetail = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);
  const { products } = useProducts();

  const product = category ? products.find((item) => item.id === category) : null;

  useEffect(() => {
    if (!product) {
      navigate('/products');
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from('.detail-hero-content', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      gsap.from('.detail-main-image', {
        scale: 1.1,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
      });

      gsap.from('.detail-info-card', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.detail-info-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, pageRef);

    return () => ctx.revert();
  }, [product, navigate]);

  if (!product) return null;

  const relatedProductsList = product.relatedProducts
    .map((id) => products.find((item) => item.id === id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <div ref={pageRef} className="pt-20">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-dark overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/90 to-dark/70" />
        </div>

        <div className="section-padding relative z-10">
          <div className="detail-hero-content">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-white/60 text-sm mb-6">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/products" className="hover:text-white transition-colors">Products</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">{product.title}</span>
            </div>

            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 
                           text-primary-light rounded-full text-sm font-medium mb-4">
              <Package className="w-4 h-4" />
              {product.subtitle}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              {product.title}
            </h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-2xl">
              {product.description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Image */}
            <div className="detail-main-image relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={product.detailImage}
                  alt={product.title}
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-primary text-white p-6 rounded-2xl shadow-xl">
                <div className="flex items-center gap-3">
                  <Star className="w-8 h-8 fill-accent text-accent" />
                  <div>
                    <div className="text-2xl font-bold">Premium</div>
                    <div className="text-white/80 text-sm">Quality Guaranteed</div>
                  </div>
                </div>
              </div>

              {/* Decorative */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl -z-10" />
            </div>

            {/* Info */}
            <div className="detail-info-section space-y-8">
              <div className="detail-info-card">
                <h2 className="text-2xl font-bold text-dark mb-4">
                  About {product.title}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {product.longDescription}
                </p>
              </div>

              {/* Specifications */}
              <div className="detail-info-card bg-green-50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-dark mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  Specifications
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {product.specifications.map((spec, index) => (
                    <div key={index}>
                      <div className="text-sm text-gray-500">{spec.label}</div>
                      <div className="font-semibold text-dark">{spec.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="detail-info-card">
                <h3 className="text-lg font-bold text-dark mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Key Benefits
                </h3>
                <ul className="space-y-3">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Uses */}
              <div className="detail-info-card">
                <h3 className="text-lg font-bold text-dark mb-4 flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-primary" />
                  Recommended Uses
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.uses.map((use, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium"
                    >
                      {use}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="detail-info-card flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-primary text-white 
                           px-6 py-3.5 rounded-xl font-semibold transition-all duration-300
                           hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/30
                           hover:-translate-y-0.5 group"
                >
                  Request Quote
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 
                                       group-hover:translate-x-1" />
                </Link>
                <a
                  href="tel:+15551234567"
                  className="inline-flex items-center gap-2 bg-green-50 text-primary 
                           px-6 py-3.5 rounded-xl font-semibold transition-all duration-300
                           hover:bg-green-100"
                >
                  <Phone className="w-5 h-5" />
                  Call Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-green-50/50">
        <div className="section-padding">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-dark mb-4">
              Why Choose Our {product.title}?
            </h2>
            <p className="text-gray-600">
              We take pride in delivering only the best quality products to our customers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'Quality Assured', desc: 'Rigorous testing and quality control' },
              { icon: Truck, title: 'Fast Delivery', desc: 'Reliable shipping to your location' },
              { icon: Clock, title: 'Fresh Stock', desc: 'Regular inventory turnover' },
              { icon: Star, title: 'Expert Support', desc: 'Professional guidance available' },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 text-center shadow-card
                         hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-dark mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="section-padding">
          <h2 className="text-2xl font-bold text-dark mb-8">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProductsList.map((related) => (
              <Link
                key={related.id}
                to={`/products/${related.id}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-card
                         hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={related.image}
                    alt={related.title}
                    className="w-full h-full object-cover transition-transform duration-500
                             group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-lg font-bold text-white">{related.title}</h3>
                    <p className="text-white/80 text-sm">{related.subtitle}</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 text-sm line-clamp-2">{related.description}</p>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium mt-3
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Back Button */}
      <div className="section-padding pb-16">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-primary font-medium
                   hover:text-primary-dark transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to All Products
        </Link>
      </div>
    </div>
  );
};

export default ProductDetail;
