import { Link } from 'react-router-dom';
import { Leaf, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { useHomeContent } from '../context/HomeContentContext';

const Footer = () => {
  const { homeContent } = useHomeContent();
  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Products' },
    { path: '/contact', label: 'Contact Us' },
  ];

  const products = [
    { path: '/products/hay', label: 'Hay Products' },
    { path: '/products/alfalfa', label: 'Alfalfa' },
    { path: '/products/straw', label: 'Straw Products' },
    { path: '/products/grain', label: 'Grain & Silage' },
    { path: '/products/pellets', label: 'Pellets' },
  ];

  return (
    <footer className="bg-dark text-white">
      {/* Main Footer */}
      <div className="section-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center 
                            transition-transform duration-300 group-hover:scale-110">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">
                Agro<span className="text-primary-light">Feed</span>
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              {homeContent.footerDescription}
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center
                           transition-all duration-300 hover:bg-primary hover:scale-110"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-primary-light transition-colors duration-300
                             flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 
                                   group-hover:opacity-100 transition-opacity duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Our Products</h3>
            <ul className="space-y-3">
              {products.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-primary-light transition-colors duration-300
                             flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 
                                   group-hover:opacity-100 transition-opacity duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>{homeContent.footerAddress}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span>{homeContent.footerPhone}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <span>{homeContent.footerEmail}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="section-padding py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} AgroFeed. {homeContent.footerCopyright}
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-primary-light transition-colors duration-300">
                {homeContent.footerPrivacyLabel}
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-light transition-colors duration-300">
                {homeContent.footerTermsLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
