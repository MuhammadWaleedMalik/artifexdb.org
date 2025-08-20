import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Book, Search } from 'lucide-react';
import { websiteInfo } from '../data/website/info';
import { useLanguage } from '../contexts/LanguageContext';
import { colors } from '../data/colors/theme';

// Import language files statically
import enBlogs from '../data/text/en/blogs.json';
import zhBlogs from '../data/text/zh/blogs.json';
import jaBlogs from '../data/text/ja/blogs.json';
import esBlogs from '../data/text/es/blogs.json';

// Create a language map
const languageMap = {
  en: enBlogs,
  zh: zhBlogs,
  ja: jaBlogs,
  es: esBlogs,
};

interface BlogContent {
  title: string;
  subtitle: string;
  blogs: {
    id: number;
    title: string;
    excerpt: string;
    date: string;
    category: string;
  }[];
}

const Blogs: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleBlogs, setVisibleBlogs] = useState(3);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // Safely get page content with fallback to English
  const pageContent = languageMap[currentLanguage?.code as keyof typeof languageMap] ?? languageMap.en;

  // Filter blogs based on search term
  const filteredBlogs = pageContent?.blogs?.filter(
    (blog) =>
      blog?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog?.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog?.category?.toLowerCase().includes(searchTerm.toLowerCase())
  ) ?? [];

  // Infinite scroll logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleBlogs < filteredBlogs.length) {
          setVisibleBlogs((prev) => Math.min(prev + 3, filteredBlogs.length));
        }
      },
      { threshold: 0.1 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [filteredBlogs.length, visibleBlogs]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8 min-h-[50vh] bg-gradient-to-r from-green-900/90 to-green-700/90">
        <div className="absolute inset-0 bg-[url('/images/blog-bg.jpg')] bg-cover bg-center opacity-15"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative text-center max-w-5xl mx-auto z-10"
        >
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 font-serif tracking-tight"
            aria-label={pageContent?.title?.replace('{websiteName}', websiteInfo?.name ?? 'ArchaeoData')}
          >
            {pageContent?.title?.replace('{websiteName}', websiteInfo?.name ?? 'ArchaeoData') ?? 'Blog'}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-100 max-w-3xl mx-auto">
            {pageContent?.subtitle?.replace('{websiteName}', websiteInfo?.name ?? 'ArchaeoData') ?? 'Insights on archaeological data management'}
          </p>
        </motion.div>
      </section>

      {/* Search Bar */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="relative max-w-xl mx-auto">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
              aria-label="Search blogs"
            />
          </div>
        </div>
      </section>

      {/* Blogs Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.slice(0, visibleBlogs).map((blog: { id: number; title: string; excerpt: string; date: string; category: string }, index: number) => (
              <motion.div
                key={blog?.id ?? index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md p-6 border border-purple-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <Book size={20} className="text-purple-600 flex-shrink-0" />
                  <h2 className="text-lg font-semibold font-serif text-gray-800">
                    {blog?.title?.replace('{websiteName}', websiteInfo?.name ?? 'ArchaeoData') ?? 'Blog Post'}
                  </h2>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {blog?.excerpt?.replace('{websiteName}', websiteInfo?.name ?? 'ArchaeoData') ?? 'Excerpt'}
                </p>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{blog?.date ?? 'Date'}</span>
                  <span>{blog?.category ?? 'Category'}</span>
                </div>
              </motion.div>
            ))}
          </div>
          {visibleBlogs < filteredBlogs.length && (
            <div ref={loaderRef} className="text-center mt-8">
              <div className="inline-block w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          {filteredBlogs.length === 0 && (
            <p className="text-center text-gray-600 text-lg mt-8">No blogs found matching your search.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blogs;