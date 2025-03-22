
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface PostPropertyProps {
  openAuthDialog?: () => void;
}

const PostProperty = ({ openAuthDialog }: PostPropertyProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar openAuthDialog={openAuthDialog} />
      
      <div className="pt-24 pb-16">
        <div className="container-custom">
          <h1>Post Property Page</h1>
          <p>This page is under construction.</p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PostProperty;
