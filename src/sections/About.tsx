import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Leaf, Award, Sprout } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Sprout,
    title: 'Sustainable Farming',
    description: 'Eco-friendly practices that protect the environment while producing premium feed.',
    image: '/about-sustainable.jpg',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Rigorous quality control ensures only the highest grade nutrients for your livestock.',
    image: '/about-quality.jpg',
  },
  {
    icon: Leaf,
    title: 'Wide Variety',
    description: 'Complete range of feed products for all types of livestock and animals.',
    image: '/about-variety.jpg',
  },
];

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title animation
      gsap.from('.about-badge', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from('.about-title', {
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

      gsap.from('.about-text', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Cards animation
      gsap.from('.feature-card', {
        y: 80,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Parallax on card images
      gsap.utils.toArray<HTMLElement>('.feature-image').forEach((img) => {
        gsap.to(img, {
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 lg:py-32 bg-white relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="section-padding relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="about-badge inline-flex items-center gap-2 px-4 py-2 
                         bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            <Leaf className="w-4 h-4" />
            About Us
          </span>
          <h2 className="about-title text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-6">
            Why Choose Our <span className="text-gradient">Products?</span>
          </h2>
          <p className="about-text text-gray-600 text-lg leading-relaxed">
            We provide the highest quality animal feed products sourced from sustainable farms. 
            Our commitment to excellence ensures your livestock receives the best nutrition possible.
          </p>
        </div>

        {/* Feature Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card group relative bg-white rounded-2xl overflow-hidden 
                       shadow-card hover:shadow-card-hover transition-all duration-500
                       hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="feature-image w-full h-full object-cover transition-transform 
                           duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Icon */}
                <div className="absolute bottom-4 left-4 w-12 h-12 bg-primary rounded-xl 
                              flex items-center justify-center shadow-lg
                              transition-transform duration-300 group-hover:scale-110">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-dark mb-3 group-hover:text-primary 
                             transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent 
                            group-hover:border-primary/20 transition-colors duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '15+', label: 'Years Experience' },
            { value: '5000+', label: 'Happy Customers' },
            { value: '50+', label: 'Products' },
            { value: '99%', label: 'Satisfaction Rate' },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-green-50 rounded-xl"
            >
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
