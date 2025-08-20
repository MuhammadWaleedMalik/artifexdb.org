import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, FileText } from 'lucide-react';
import { websiteInfo } from '../data/website/info';
import { useLanguage } from '../contexts/LanguageContext';

// Import language files statically
import enPrivacy from '../data/text/en/privacy.json';
import zhPrivacy from '../data/text/zh/privacy.json';
import jaPrivacy from '../data/text/ja/privacy.json';
import esPrivacy from '../data/text/es/privacy.json';

// Create a language map
const languageMap = {
  en: enPrivacy,
  zh: zhPrivacy,
  ja: jaPrivacy,
  es: esPrivacy,
};

  const Privacy: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [expandedSection, setExpandedSection] = useState<number | null>(null);
  const [activeNav, setActiveNav] = useState<number | null>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Safely get page content with fallback to English
  const pageContent = languageMap[currentLanguage?.code as keyof typeof languageMap] ?? languageMap.en;

  // Intersection Observer for sticky navigation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.findIndex((ref) => ref === entry.target);
            if (index !== -1) setActiveNav(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, [pageContent]);

  // Toggle section expansion
  const toggleSection = (id: number) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  // Scroll to section
  const scrollToSection = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8 min-h-[50vh] bg-gradient-to-r from-green-900/90 to-green-700/90">
        <div className="absolute inset-0 bg-[url('/images/privacy-bg.jpg')] bg-cover bg-center opacity-15"></div>
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
            {pageContent?.title?.replace('{websiteName}', websiteInfo?.name ?? 'ArchaeoData') ?? 'Privacy Policy'}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-100 max-w-3xl mx-auto">
            {pageContent?.subtitle?.replace('{websiteName}', websiteInfo?.name ?? 'ArchaeoData') ?? 'Our commitment to protecting your data'}
          </p>
        </motion.div>
      </section>

      {/* Sticky Navigation */}
      <nav className="sticky top-0 bg-white shadow-md z-20 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex flex-wrap gap-4 justify-center">
          {pageContent?.sections && Array.isArray(pageContent.sections) && pageContent.sections.length > 0 ? (
            pageContent.sections.map((section: { id: number; title: string }, index: number) => (
              <button
                key={section?.id ?? index}
                onClick={() => scrollToSection(index)}
                className={`text-sm font-medium px-3 py-1 rounded-full transition-colors duration-300 ${
                  activeNav === index ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
                }`}
              >
                {section?.title ?? 'Section'}
              </button>
            ))
          ) : null}
        </div>
      </nav>

      {/* Privacy Sections */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {pageContent?.sections && Array.isArray(pageContent.sections) && pageContent.sections.length > 0 ? (
            pageContent.sections.map((section: { id: number; title: string; content: string }, index: number) => (
              <motion.div
                key={section?.id ?? index}
                ref={(el) => (sectionRefs.current[index] = el)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="mb-6 bg-white rounded-xl shadow-md border border-blue-100"
              >
                <button
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => toggleSection(section?.id ?? index)}
                  aria-expanded={expandedSection === (section?.id ?? index)}
                  aria-controls={`section-content-${section?.id ?? index}`}
                >
                  <div className="flex items-center space-x-3">
                    <Lock size={20} className="text-blue-600 flex-shrink-0" />
                    <h2 className="text-lg font-semibold font-serif text-gray-800">
                      {section?.title ?? 'Section'}
                    </h2>
                  </div>
                  <FileText
                    size={20}
                    className={`text-blue-600 transform transition-transform duration-300 ${
                      expandedSection === (section?.id ?? index) ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {expandedSection === (section?.id ?? index) && (
                    <motion.div
                      id={`section-content-${section?.id ?? index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 pt-0 text-sm sm:text-base text-gray-600 bg-blue-50/50">
                        {section?.content?.replace('{websiteName}', websiteInfo?.name ?? 'ArchaeoData') ?? 'Content'}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-600 text-lg">No privacy policy sections available at the moment.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Privacy;