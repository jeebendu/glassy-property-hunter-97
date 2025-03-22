
import React, { useState } from 'react';
import { properties } from '@/lib/data';
import PropertyCard from './PropertyCard';
import { useAnimationOnScroll } from '@/lib/animations';

const FeaturedProperties = () => {
  const [visibleProperties, setVisibleProperties] = useState(6);
  
  const headerAnimation = useAnimationOnScroll('up');
  const subHeaderAnimation = useAnimationOnScroll('up', 0.1, 100);
  
  const featuredProperties = properties.filter(property => property.featured);
  const displayedProperties = properties.slice(0, visibleProperties);
  
  const loadMore = () => {
    setVisibleProperties(prev => Math.min(prev + 3, properties.length));
  };

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h4 
            ref={headerAnimation.ref}
            className={`${headerAnimation.animationClass} text-primary font-medium mb-2`}
          >
            Featured Properties
          </h4>
          <h2 
            ref={subHeaderAnimation.ref}
            className={`${subHeaderAnimation.animationClass} section-title`}
          >
            Discover Our Premium Selection
          </h2>
          <p 
            ref={subHeaderAnimation.ref}
            className={`${subHeaderAnimation.animationClass} section-subtitle max-w-2xl mx-auto`}
          >
            Explore our handpicked properties that offer exceptional quality, location, and value.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProperties.map((property, index) => (
            <PropertyCard key={property.id} property={property} index={index} />
          ))}
        </div>

        {visibleProperties < properties.length && (
          <div className="text-center mt-12">
            <button 
              className="btn-outline"
              onClick={loadMore}
            >
              Load More Properties
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProperties;
