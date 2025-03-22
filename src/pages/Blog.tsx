
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const featuredPost = {
  id: 1,
  title: "10 Tips for First-Time Home Buyers in 2023",
  excerpt: "Navigate the challenges of buying your first home with these expert tips that will save you time and money.",
  image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2573&auto=format&fit=crop",
  content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel justo eu mi scelerisque vulputate. Aliquam in metus eu lectus aliquet egestas.",
  date: "Jun 12, 2023",
  author: "Sarah Johnson",
  category: "Buying"
};

const blogPosts = [
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
  },
  {
    id: 4,
    title: "Understanding the Real Estate Market Cycles",
    excerpt: "Learn about the cyclical nature of real estate markets and how to time your investments for maximum returns.",
    image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=2670&auto=format&fit=crop",
    date: "Mar 20, 2023",
    author: "David Wilson",
    category: "Investing"
  },
  {
    id: 5,
    title: "How to Choose the Right Neighborhood for Your Family",
    excerpt: "Important factors to consider when selecting a neighborhood that will meet your family's needs for years to come.",
    image: "https://images.unsplash.com/photo-1625602812206-5ec545ca1231?q=80&w=2670&auto=format&fit=crop",
    date: "Feb 18, 2023",
    author: "Lisa Thompson",
    category: "Lifestyle"
  },
  {
    id: 6,
    title: "The Impact of Remote Work on Real Estate Trends",
    excerpt: "How the shift to remote work is changing where and how people choose to live, and what it means for property values.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop",
    date: "Jan 30, 2023",
    author: "Robert Garcia",
    category: "Trends"
  },
  {
    id: 7,
    title: "Navigating the Mortgage Process: A Step-by-Step Guide",
    excerpt: "Everything you need to know about securing a mortgage, from pre-approval to closing.",
    image: "https://images.unsplash.com/photo-1621091211034-53136cc1eb32?q=80&w=2573&auto=format&fit=crop",
    date: "Dec 15, 2022",
    author: "Jennifer Lee",
    category: "Finance"
  }
];

const categories = [
  "All", "Buying", "Selling", "Investing", "Finance", "Technology", "Lifestyle", "Trends"
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16">
        {/* Hero Header */}
        <div className="bg-primary/5 py-16">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Blog</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Insights, tips, and expert advice from our real estate professionals to help you make informed decisions.
            </p>
          </div>
        </div>

        {/* Featured Post */}
        <div className="container-custom py-16">
          <h2 className="text-2xl font-bold mb-8">Featured Article</h2>
          <div className="relative rounded-2xl overflow-hidden bg-white shadow-lg">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-64 lg:h-full object-cover"
                />
              </div>
              <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium inline-block mb-4 w-fit">
                  {featuredPost.category}
                </div>
                <h3 className="text-2xl font-bold mb-4">{featuredPost.title}</h3>
                <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center text-sm text-muted-foreground mb-6">
                  <span>{featuredPost.date}</span>
                  <span className="mx-2">•</span>
                  <span>{featuredPost.author}</span>
                </div>
                <Link to={`/blog/${featuredPost.id}`} className="btn-primary w-fit">
                  Read Article
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="container-custom mb-12">
          <div className="flex overflow-x-auto scrollbar-hide pb-4 gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                  category === 'All'
                    ? 'bg-primary text-white'
                    : 'bg-white hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* All Blog Posts */}
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div 
                key={post.id} 
                className="glass rounded-xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="h-48 relative">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
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
                  <Link to={`/blog/${post.id}`} className="text-primary font-medium hover:underline flex items-center">
                    Read more
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-16 flex justify-center">
            <div className="flex space-x-2">
              <button className="w-10 h-10 rounded-full border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                &laquo;
              </button>
              <button className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                1
              </button>
              <button className="w-10 h-10 rounded-full border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                2
              </button>
              <button className="w-10 h-10 rounded-full border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                3
              </button>
              <button className="w-10 h-10 rounded-full border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                &raquo;
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
