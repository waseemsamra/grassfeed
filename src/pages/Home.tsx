import { Toaster } from 'sonner';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Products from '../sections/Products';
import Testimonials from '../sections/Testimonials';
import EnquiryForm from '../sections/EnquiryForm';

const Home = () => {
  return (
    <>
      <Toaster position="top-right" richColors />
      <Hero />
      <About />
      <Products />
      <Testimonials />
      <EnquiryForm />
    </>
  );
};

export default Home;
