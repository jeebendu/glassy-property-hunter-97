
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedProperties from '@/components/FeaturedProperties';
import Footer from '@/components/Footer';
import { useAnimationOnScroll } from '@/lib/animations';
import TopCities from '@/components/TopCities';
import BlogSection from '@/components/BlogSection';

interface IndexProps {
  openAuthDialog?: () => void;
}

const Index = ({ openAuthDialog }: IndexProps) => {
  const aboutAnimation = useAnimationOnScroll('up');
  const statsAnimation = useAnimationOnScroll('up', 0.1, 200);
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar openAuthDialog={openAuthDialog} />
      <Hero />
      
      {/* Featured Properties Section */}
      <section className="py-16">
        <div className="container-custom">
          <FeaturedProperties />
        </div>
      </section>
      
      {/* Top Cities Section */}
      <TopCities />
      
      {/* Blog Section */}
      <BlogSection />
      
      {/* About Section */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div 
                ref={aboutAnimation.ref}
                className={`${aboutAnimation.animationClass} relative rounded-2xl overflow-hidden h-[600px]`}
              >
                <img 
                  src="https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?q=80&w=2070&auto=format&fit=crop" 
                  alt="Real Estate Experts" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <h3 className="text-2xl font-bold mb-2">Superior Properties</h3>
                  <p className="text-white/80">We curate only the most exceptional properties for our discerning clients.</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 
                ref={aboutAnimation.ref}
                className={`${aboutAnimation.animationClass} text-primary font-medium mb-2`}
              >
                About Us
              </h4>
              <h2 
                ref={aboutAnimation.ref}
                className={`${aboutAnimation.animationClass} section-title`}
              >
                We Help You Find The Perfect Property
              </h2>
              <p 
                ref={aboutAnimation.ref}
                className={`${aboutAnimation.animationClass} text-muted-foreground mb-6`}
              >
                With over 15 years of experience in the real estate market, we provide unparalleled service and expertise to our clients. Our dedicated team of professionals is committed to helping you find the perfect property that meets all your needs and exceeds your expectations.
              </p>
              <p 
                ref={aboutAnimation.ref}
                className={`${aboutAnimation.animationClass} animate-delay-100 text-muted-foreground mb-8`}
              >
                Whether you're looking for a cozy apartment in the city, a spacious family home in the suburbs, or a luxurious villa by the beach, we have the knowledge and resources to guide you through every step of the buying, selling, or renting process.
              </p>
              
              <div 
                ref={statsAnimation.ref}
                className={`${statsAnimation.animationClass} grid grid-cols-2 md:grid-cols-4 gap-6 mb-10`}
              >
                <div className="text-center p-4 glass rounded-xl">
                  <h3 className="text-4xl font-bold text-primary mb-1">1500+</h3>
                  <p className="text-sm text-muted-foreground">Properties Sold</p>
                </div>
                <div className="text-center p-4 glass rounded-xl">
                  <h3 className="text-4xl font-bold text-primary mb-1">750+</h3>
                  <p className="text-sm text-muted-foreground">Happy Clients</p>
                </div>
                <div className="text-center p-4 glass rounded-xl">
                  <h3 className="text-4xl font-bold text-primary mb-1">20+</h3>
                  <p className="text-sm text-muted-foreground">Years Experience</p>
                </div>
                <div className="text-center p-4 glass rounded-xl">
                  <h3 className="text-4xl font-bold text-primary mb-1">12</h3>
                  <p className="text-sm text-muted-foreground">Awards Won</p>
                </div>
              </div>
              
              <button className="btn-primary">Learn More About Us</button>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-primary/5">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Find Your Dream Home?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
            Browse our exclusive properties and connect with our expert agents to start your journey to finding the perfect home.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="btn-primary">Browse Properties</button>
            <button className="btn-outline">Contact an Agent</button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
