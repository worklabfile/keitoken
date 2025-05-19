
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import FAQSection from '@/components/FAQSection';

const FAQ = () => {
  return (
    <div className="min-h-screen space-bg">
      <NavBar />
      <div className="pt-16">
        <FAQSection />
      </div>
      <Footer />
    </div>
  );
};

export default FAQ;
