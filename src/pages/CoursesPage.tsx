import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import CoursesSection from '@/components/CoursesSection';

const CoursesPage = () => {
  return (
    <div className="min-h-screen space-bg">
      <NavBar />
      <div className="pt-16">
        <CoursesSection />
      </div>
      <Footer />
    </div>
  );
};

export default CoursesPage; 