import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, Scroll } from 'lucide-react';
import { websiteInfo } from '../data/website/info';
import { useLanguage } from '../contexts/LanguageContext';
import { colors } from '../data/colors/theme';

// Import language files statically
import enTerms from '../data/text/en/terms.json';
import zhTerms from '../data/text/zh/terms.json';
import jaTerms from '../data/text/ja/terms.json';
import esTerms from '../data/text/es/terms.json';

// Create a language map
const languageMap = {
  en: enTerms,
  zh: zhTerms,
  ja: jaTerms,
  es: esTerms,
};

interface TermsContent {
  title: string;
  subtitle: string;
  sections: {
    id: number;
    title: string;
    content: string;
  }[];
}

const Terms: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [expandedSection, setExpandedSection] = useState<number | null>(null);
  const [activeNav, setActiveNav] = useState<number | null>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Safely get page content with fallback to English
  const pageContent = languageMap[currentLanguage?.code as keyof typeof languageMap] ?? languageMap.en;

  // Intersection Observer for sticky sidebar navigation
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
        <div className="absolute inset-0 bg-[url('/images/terms-bg.jpg')] bg-cover bg-center opacity-15"></div>
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
            {pageContent?.title?.replace('{websiteName}', websiteInfo?.name ?? 'ArchaeoData') ?? 'Terms of Service'}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-100 max-w-3xl mx-auto">
            {pageContent?.subtitle?.replace('{websiteName}', websiteInfo?.name ?? 'ArchaeoData') ?? 'Our terms for using the platform'}
          </p>
        </motion.div>
      </section>

      {/* Content with Sticky Sidebar */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
          {/* Sticky Sidebar Navigation */}
          <aside className="lg:w-1/4">
            <nav className="sticky top-20 bg-white rounded-xl shadow-md p-4">
              <h2 className="text-lg font-semibold font-serif text-gray-800 mb-4 flex items-center">
                <Scroll size={20} className="text-rose-600 mr-2" />
                Sections
              </h2>
              <ul className="space-y-2">
                {pageContent?.sections && Array.isArray(pageContent.sections) && pageContent.sections.length > 0 ? (
                  pageContent.sections.map((section: { id: number; title: string }, index: number) => (
                    <li key={section?.id ?? index}>
                      <button
                        onClick={() => scrollToSection(index)}
                        className={`w-full text-left text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-300 ${
                          activeNav === index ? 'bg-rose-600 text-white' : 'text-gray-700 hover:bg-rose-100'
                        }`}
                      >
                        {section?.title ?? 'Section'}
                      </button>
                    </li>
                  ))
                ) : null}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {pageContent?.sections && Array.isArray(pageContent.sections) && pageContent.sections.length > 0 ? (
              pageContent.sections.map((section: { id: number; title: string; content: string }, index: number) => (
                <motion.div
                  key={section?.id ?? index}
                  ref={(el) => (sectionRefs.current[index] = el)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="mb-6 bg-white rounded-xl shadow-md border border-rose-100"
                >
                  <button
                    className="w-full flex items-center justify-between p-5 text-left focus:outline-none focus:ring-2 focus:ring-rose-500"
                    onClick={() => toggleSection(section?.id ?? index)}
                    aria-expanded={expandedSection === (section?.id ?? index)}
                    aria-controls={`section-content-${section?.id ?? index}`}
                  >
                    <div className="flex items-center space-x-3">
                      <Scale size={20} className="text-rose-600 flex-shrink-0" />
                      <h2 className="text-lg font-semibold font-serif text-gray-800">
                        {section?.title ?? 'Section'}
                      </h2>
                    </div>
                    <Scroll
                      size={20}
                      className={`text-rose-600 transform transition-transform duration-300 ${
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
                        <div className="p-5 pt-0 text-sm sm:text-base text-gray-600 bg-rose-50/50">
                          {section?.content?.replace('{websiteName}', websiteInfo?.name ?? 'ArchaeoData') ?? 'Content'}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-600 text-lg">No terms of service sections available at the moment.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;