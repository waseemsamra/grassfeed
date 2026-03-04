import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useHomeContent } from '../context/HomeContentContext';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { homeContent } = useHomeContent();
  const titleWords = homeContent.heroTitle.split(' ');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup
      gsap.set('.hero-title-word', { y: 100, opacity: 0 });
      gsap.set('.hero-subtitle', { y: 30, opacity: 0 });
      gsap.set('.hero-buttons', { y: 30, opacity: 0 });
      gsap.set(imageRef.current, { scale: 1.2, opacity: 0 });

      // Animation timeline
      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(imageRef.current, {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
      })
      .to('.hero-title-word', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      }, '-=0.6')
      .to('.hero-subtitle', {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.4')
      .to('.hero-buttons', {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.3');

      // Parallax on scroll
      gsap.to(imageRef.current, {
        y: 150,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(contentRef.current, {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src={homeContent.heroImage}
          alt="Premium hay products"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        {/* Grain Texture */}
        <div className="absolute inset-0 grain-texture" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 section-padding w-full pt-20"
      >
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm 
                        rounded-full mb-6 hero-badge opacity-0 animate-fade-in"
               style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            <span className="w-2 h-2 bg-primary-light rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-medium">{homeContent.heroBadgeText}</span>
          </div>

          {/* Title */}
          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white 
                     leading-tight mb-6 overflow-hidden"
          >
            {titleWords.map((word, index) => (
              <span
                key={`${word}-${index}`}
                className={`hero-title-word inline-block ${
                  word === homeContent.heroHighlightWord ? 'text-primary-light' : ''
                }`}
              >
                {word}{' '}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle text-lg sm:text-xl text-white/80 mb-8 max-w-xl leading-relaxed">
            {homeContent.heroSubtitle}
          </p>

          {/* Buttons */}
          <div className="hero-buttons flex flex-wrap gap-4">
            <Link
              to="/products"
              className="group inline-flex items-center gap-2 bg-primary hover:bg-primary-light 
                       text-white px-6 py-3.5 rounded-lg font-semibold transition-all duration-300
                       hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              {homeContent.heroPrimaryButtonText}
              <ArrowRight className="w-5 h-5 transition-transform duration-300 
                                   group-hover:translate-x-1" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 
                       backdrop-blur-sm text-white px-6 py-3.5 rounded-lg font-semibold 
                       transition-all duration-300 border border-white/20
                       hover:-translate-y-0.5"
            >
              {homeContent.heroSecondaryButtonText}
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-white/60 hover:text-white 
                   transition-colors duration-300"
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </a>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  );
};

export default Hero;
