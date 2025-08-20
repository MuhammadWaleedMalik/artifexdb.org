import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Zap, Target, Layers } from 'lucide-react';
import { colors } from '../data/colors/theme';
import { useLanguage } from '../contexts/LanguageContext';
import { PageContent } from '../types';

const Explore: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [pageContent, setPageContent] = useState<PageContent | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const content = await import(`../data/text/${currentLanguage.code}/explore.json`);
        setPageContent(content.default);
      } catch (error) {
        const content = await import('../data/text/en/explore.json');
        setPageContent(content.default);
      }
    };
    
    loadContent();
  }, [currentLanguage]);

  if (!pageContent) {
    return <div>Loading...</div>;
  }

  const exploreItems = [
    {
      title: 'Technology Solutions',
      description: 'Advanced technology solutions for modern businesses',
      icon: Zap,
      path: '/explore/technology',
      color: colors.primaryColor1
    },
    {
      title: 'Strategy & Planning', 
      description: 'Strategic planning and business development',
      icon: Target,
      path: '/explore/strategy',
      color: colors.primaryColor2
    },
    {
      title: 'Implementation',
      description: 'End-to-end implementation services',
      icon: Layers,
      path: '/explore/implementation', 
      color: colors.primaryColor3
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4" style={{ backgroundColor: colors.backgroundLight }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div
              className="p-4 rounded-full"
              style={{ backgroundColor: colors.primaryColor1 }}
            >
              <Compass className="text-white" size={48} />
            </div>
          </div>
          <h1 
            className="text-4xl font-bold mb-4"
            style={{ color: colors.textPrimary }}
          >
            {pageContent.title}
          </h1>
          <p 
            className="text-xl max-w-3xl mx-auto"
            style={{ color: colors.textSecondary }}
          >
            {pageContent.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 
                className="text-2xl font-bold mb-4"
                style={{ color: colors.textPrimary }}
              >
                What You'll Discover
              </h2>
              {pageContent.content.map((item, index) => (
                <p key={index} className="mb-4" style={{ color: colors.textSecondary }}>
                  {item}
                </p>
              ))}
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 
                className="text-xl font-semibold mb-4"
                style={{ color: colors.textPrimary }}
              >
                Explore Categories
              </h3>
              <div className="space-y-3">
                {pageContent.sections?.map((section, index) => (
                  <div key={index} className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-3"
                      style={{ backgroundColor: colors.accent }}
                    />
                    <span style={{ color: colors.textSecondary }}>
                      {section.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {exploreItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div 
                  className="p-6 text-white"
                  style={{ backgroundColor: item.color }}
                >
                  <IconComponent size={32} className="mb-4" />
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                </div>
                <div className="p-6">
                  <p 
                    className="mb-4"
                    style={{ color: colors.textSecondary }}
                  >
                    {item.description}
                  </p>
                  <Link
                    to={item.path}
                    className="inline-flex items-center font-semibold hover:opacity-80 transition-opacity"
                    style={{ color: item.color }}
                  >
                    Explore Now
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="max-w-2xl mx-auto">
            <h2 
              className="text-3xl font-bold mb-4"
              style={{ color: colors.textPrimary }}
            >
              Ready to Get Started?
            </h2>
            <p 
              className="text-lg mb-8"
              style={{ color: colors.textSecondary }}
            >
              Join thousands of satisfied customers who have transformed their businesses with our solutions.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
              style={{ backgroundColor: colors.primaryColor1 }}
            >
              Contact Us Today
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Explore;