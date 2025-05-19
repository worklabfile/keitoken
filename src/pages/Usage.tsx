
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import UsageSection from '@/components/UsageSection';

const Usage = () => {
  return (
    <div className="min-h-screen space-bg">
      <NavBar />
      <div className="pt-16">
        <UsageSection />
      </div>
      <Footer />
    </div>
  );
};

export default Usage;
