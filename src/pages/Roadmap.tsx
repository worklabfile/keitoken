
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import RoadmapSection from '@/components/RoadmapSection';

const Roadmap = () => {
  return (
    <div className="min-h-screen space-bg">
      <NavBar />
      <div className="pt-16">
        <RoadmapSection />
      </div>
      <Footer />
    </div>
  );
};

export default Roadmap;
