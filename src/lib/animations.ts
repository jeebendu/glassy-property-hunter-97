
import { useState, useEffect } from 'react';

export const useScrollFadeIn = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref);
        }
      },
      {
        threshold,
      }
    );
    
    observer.observe(ref);
    
    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [ref, threshold]);
  
  return { ref: setRef, isVisible };
};

export const useAnimationOnScroll = (direction: 'up' | 'down' | 'left' | 'right' = 'up', threshold = 0.1, delay = 0) => {
  const { ref, isVisible } = useScrollFadeIn(threshold);
  
  const getAnimationClass = () => {
    if (!isVisible) return 'opacity-0';
    
    const baseClass = 'opacity-100 transition-all duration-1000';
    const delayClass = delay ? `delay-[${delay}ms]` : '';
    
    switch (direction) {
      case 'up':
        return `${baseClass} animate-slide-up ${delayClass}`;
      case 'down':
        return `${baseClass} animate-slide-down ${delayClass}`;
      case 'left':
        return `${baseClass} animate-slide-in-left ${delayClass}`;
      case 'right':
        return `${baseClass} animate-slide-in-right ${delayClass}`;
      default:
        return `${baseClass} animate-fade-in ${delayClass}`;
    }
  };
  
  return { ref, animationClass: getAnimationClass() };
};

export const useProgressiveLoad = (items: any[], delay = 200) => {
  const [visibleItems, setVisibleItems] = useState<number>(0);
  
  useEffect(() => {
    let timeout: number;
    
    const showItems = () => {
      if (visibleItems < items.length) {
        timeout = window.setTimeout(() => {
          setVisibleItems(prev => prev + 1);
          showItems();
        }, delay);
      }
    };
    
    showItems();
    
    return () => {
      clearTimeout(timeout);
    };
  }, [items.length, delay, visibleItems]);
  
  return { visibleItems, isComplete: visibleItems >= items.length };
};

export const useLazyImage = (src: string, placeholderSrc = '/placeholder.svg') => {
  const [imageSrc, setImageSrc] = useState(placeholderSrc);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setImageLoaded(true);
    };
  }, [src]);
  
  return { imageSrc, imageLoaded };
};

export const useParallax = (speed = 0.5) => {
  const [offset, setOffset] = useState(0);
  const [ref, setRef] = useState<HTMLElement | null>(null);
  
  useEffect(() => {
    if (!ref) return;
    
    const handleScroll = () => {
      const element = ref as HTMLElement;
      const rect = element.getBoundingClientRect();
      const scrollTop = window.scrollY || window.pageYOffset;
      const elementTop = rect.top + scrollTop;
      const elementVisible = rect.top - window.innerHeight;
      
      if (elementVisible <= 0) {
        const distance = scrollTop - elementTop;
        const parallaxOffset = distance * speed;
        setOffset(parallaxOffset);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ref, speed]);
  
  return { ref: setRef, style: { transform: `translateY(${offset}px)` } };
};
