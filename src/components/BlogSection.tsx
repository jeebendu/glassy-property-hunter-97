
import React from 'react';
import { useAnimationOnScroll } from '@/lib/animations';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    id: 1,
    title: "10 Tips for First-Time Home Buyers in 2023",
    excerpt: "Navigate the challenges of buying your first home with these expert tips that will save you time and money.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2573&auto=format&fit=crop",
    date: "Jun 12, 2023",
    author: "Sarah Johnson",
    category: "Buying"
  },
  {
    id: 2,
    title: "How to Increase Your Property's Value Before Selling",
    excerpt: "Learn which home improvements offer the best return on investment when preparing to sell your property.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2670&auto=format&fit=crop",
    date: "May 28, 2023",
    author: "Michael Chen",
    category: "Selling"
  },
  {
    id: 3,
    title: "The Rise of Smart Homes: Technology Trends in Real Estate",
    excerpt: "Discover how smart home technology is transforming the real estate market and what buyers are looking for.",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2670&auto=format&fit=crop",
    date: "Apr 15, 2023",
    author: "Emma Rodriguez",
    category: "Technology"
  }
];

const BlogSection = () => {
  const animation = useAnimationOnScroll('up');

  return (
    <section className="py-20">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="section-title">Latest From Our Blog</h2>
            <p className="section-subtitle">Insights and advice from our real estate experts</p>
          </div>
          <Link to="/blog" className="hidden md:flex items-center text-primary font-medium hover:underline">
            View all articles
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>

        <div 
          ref={animation.ref}
          className={`${animation.animationClass} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`}
        >
          {blogPosts.map((post, index) => (
            <div 
              key={post.id} 
              className={`${animation.animationClass} animate-delay-${index * 100} glass rounded-xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1`}
            >
              <div className="h-48 relative">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                  {post.category}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.author}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <Link to={`/blog/${post.id}`} className="text-primary font-medium hover:underline">
                  Read more
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Link to="/blog" className="btn-outline">
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
