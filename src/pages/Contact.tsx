import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Send, Mail, Phone, User, MessageSquare, CheckCircle, Loader2,
  MapPin, Clock, ChevronRight
} from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { useHomeContent } from '../context/HomeContentContext';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  const { homeContent } = useHomeContent();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success('Message sent successfully! We will contact you soon.');

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    }, 3000);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-hero-content', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      gsap.from('.contact-info-card', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-info-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from('.contact-form-container', {
        x: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-form-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const contactInfo = [
    {
      icon: MapPin,
      title: homeContent.contactVisitTitle,
      details: [homeContent.contactVisitLine1, homeContent.contactVisitLine2],
    },
    {
      icon: Phone,
      title: homeContent.contactCallTitle,
      details: [homeContent.contactCallLine1, homeContent.contactCallLine2],
    },
    {
      icon: Mail,
      title: homeContent.contactEmailTitle,
      details: [homeContent.contactEmailLine1, homeContent.contactEmailLine2],
    },
    {
      icon: Clock,
      title: homeContent.contactHoursTitle,
      details: [homeContent.contactHoursLine1, homeContent.contactHoursLine2],
    },
  ];

  return (
    <div ref={pageRef} className="pt-20">
      <Toaster position="top-right" richColors />
      
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-dark overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={homeContent.contactHeroImage}
            alt="Contact background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/90 to-dark/70" />
        </div>

        <div className="section-padding relative z-10">
          <div className="contact-hero-content max-w-3xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-white/60 text-sm mb-6">
              <a href="/" className="hover:text-white transition-colors">Home</a>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">Contact</span>
            </div>

            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 
                           text-primary-light rounded-full text-sm font-medium mb-4">
              <Mail className="w-4 h-4" />
              {homeContent.contactBadgeText}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              {homeContent.contactTitle}
            </h1>
            <p className="text-lg text-white/70 leading-relaxed">
              {homeContent.contactSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Info */}
            <div className="contact-info-section">
              <h2 className="text-2xl font-bold text-dark mb-8">
                Contact Information
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="contact-info-card bg-green-50 rounded-2xl p-6
                             hover:bg-green-100 transition-colors duration-300"
                  >
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-dark mb-2">{info.title}</h3>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-gray-600 text-sm">{detail}</p>
                    ))}
                  </div>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="mt-8 rounded-2xl overflow-hidden shadow-card h-64 bg-gray-100 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
                    <p className="text-gray-600">{homeContent.contactMapLabel}</p>
                    <p className="text-sm text-gray-500">{homeContent.contactMapAddress}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-section">
              <div className="contact-form-container bg-white rounded-3xl shadow-card p-8 lg:p-10">
                <h2 className="text-2xl font-bold text-dark mb-2">
                  {homeContent.contactFormTitle}
                </h2>
                <p className="text-gray-600 mb-8">
                  {homeContent.contactFormSubtitle}
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div className="form-field">
                    <label className="block text-sm font-medium text-dark mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Smith"
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 
                                 focus:border-primary focus:ring-2 focus:ring-primary/20 
                                 outline-none transition-all duration-300 bg-white"
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="form-field">
                      <label className="block text-sm font-medium text-dark mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="john@example.com"
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 
                                   focus:border-primary focus:ring-2 focus:ring-primary/20 
                                   outline-none transition-all duration-300 bg-white"
                        />
                      </div>
                    </div>
                    <div className="form-field">
                      <label className="block text-sm font-medium text-dark mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 000-0000"
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 
                                   focus:border-primary focus:ring-2 focus:ring-primary/20 
                                   outline-none transition-all duration-300 bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="form-field">
                    <label className="block text-sm font-medium text-dark mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 
                               focus:border-primary focus:ring-2 focus:ring-primary/20 
                               outline-none transition-all duration-300 bg-white appearance-none"
                    >
                      <option value="">Select a subject</option>
                      <option value="quote">Request a Quote</option>
                      <option value="product">Product Inquiry</option>
                      <option value="order">Order Status</option>
                      <option value="support">Customer Support</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="form-field">
                    <label className="block text-sm font-medium text-dark mb-2">
                      Message *
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        required
                        placeholder="How can we help you?"
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 
                                 focus:border-primary focus:ring-2 focus:ring-primary/20 
                                 outline-none transition-all duration-300 bg-white resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300
                              flex items-center justify-center gap-2
                              ${isSubmitted 
                                ? 'bg-green-500 text-white' 
                                : 'bg-primary text-white hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/30'
                              } disabled:cursor-not-allowed`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : isSubmitted ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Sent Successfully!
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        {homeContent.contactFormSubmitText}
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-green-50/50">
        <div className="section-padding">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-dark mb-4">
              {homeContent.contactFaqTitle}
            </h2>
            <p className="text-gray-600">
              {homeContent.contactFaqSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                q: homeContent.faq1Question,
                a: homeContent.faq1Answer,
              },
              {
                q: homeContent.faq2Question,
                a: homeContent.faq2Answer,
              },
              {
                q: homeContent.faq3Question,
                a: homeContent.faq3Answer,
              },
              {
                q: homeContent.faq4Question,
                a: homeContent.faq4Answer,
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover 
                         transition-all duration-300"
              >
                <h3 className="font-bold text-dark mb-3">{faq.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
