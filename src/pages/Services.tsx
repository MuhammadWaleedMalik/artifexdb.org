import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Calculator, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { colors } from '../data/colors/theme';
import { useLanguage } from '../contexts/LanguageContext';

// Import all language files statically
import enServices from '../data/text/en/services.json';
import jaServices from '../data/text/ja/services.json';
import zhServices from '../data/text/zh/services.json';

// Create a language map
const languageMap = {
  en: enServices,
  ja: jaServices,
  zh: zhServices
};

interface ServicesContent {
  title: string;
  subtitle: string;
  content: string[];
  sections: {
    title: string;
    content: string;
  }[];
}

const Services: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [pageContent, setPageContent] = useState<ServicesContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = () => {
      setIsLoading(true);
      try {
        // Get content from our pre-loaded language map
        const content = languageMap[currentLanguage.code as keyof typeof languageMap];
        setPageContent(content);
      } catch (err) {
        console.error(`Failed to load ${currentLanguage.code} content:`, err);
        // Fallback to English if current language fails
        setPageContent(languageMap.en);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [currentLanguage]);

  const icons = [Zap, Shield, Calculator, Globe];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" 
           style={{ backgroundColor: colors.backgroundLight }}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" 
             style={{ borderColor: colors.primaryColor1 }}></div>
      </div>
    );
  }

  if (!pageContent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" 
           style={{ backgroundColor: colors.backgroundLight }}>
        <p className="text-lg font-semibold" 
           style={{ color: colors.textPrimary }}>
          Content not available
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8" 
         style={{ backgroundColor: colors.backgroundLight }}>
      <div className="max-w-4xl mx-auto">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <h1 
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: colors.textPrimary }}
          >
            {pageContent.title}
          </h1>
          <p 
            className="text-lg sm:text-xl"
            style={{ color: colors.textSecondary }}
          >
            {pageContent.subtitle}
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white rounded-lg shadow-lg p-6 sm:p-8 mb-8"
          style={{ borderColor: colors.secondaryColor1 }}
        >
          <div className="prose max-w-none">
            {pageContent.content.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="mb-4 text-base sm:text-lg"
                style={{ color: colors.textSecondary }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </motion.div>

        {/* Services Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {pageContent.sections.map((section, index) => {
            const IconComponent = icons[index % icons.length];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                style={{ borderColor: colors.secondaryColor1 }}
              >
                <div className="flex items-center mb-4">
                  <div
                    className="p-3 rounded-full mr-4"
                    style={{ backgroundColor: colors.primaryColor1 }}
                  >
                    <IconComponent className="text-white" size={24} />
                  </div>
                  <h3 
                    className="text-lg sm:text-xl font-semibold"
                    style={{ color: colors.textPrimary }}
                  >
                    {section.title}
                  </h3>
                </div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="text-base sm:text-lg"
                  style={{ color: colors.textSecondary }}
                >
                  {section.content}
                </motion.p>
                <Link
                  to={`/services/${section.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-flex items-center text-sm font-semibold hover:opacity-80 mt-4"
                  style={{ color: colors.primaryColor1 }}
                >
                  Learn More
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Services Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 bg-white rounded-lg shadow-lg p-6"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <p className="mb-4 sm:mb-0 text-base sm:text-lg" style={{ color: colors.textPrimary }}>
              {currentLanguage.code === 'ja' 
                ? 'あなたのビジネスに最適なサービスをご覧ください。' 
                : 'Explore our services tailored for your business.'}
            </p>
            <div className="flex space-x-4">
      
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;