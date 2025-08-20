import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Key, FileCheck } from 'lucide-react';
import { websiteInfo } from '../data/website/info';
import { useLanguage } from '../contexts/LanguageContext';
import { colors } from '../data/colors/theme';

// Import language files statically
import enAccess from '../data/text/en/access.json';
import zhAccess from '../data/text/zh/access.json';
import jaAccess from '../data/text/ja/access.json';
import esAccess from '../data/text/es/access.json';

// Create a language map
const languageMap = {
  en: enAccess,
  zh: zhAccess,
  ja: jaAccess,
  es: esAccess,
};

interface AccessContent {
  title: string;
  subtitle: string;
  tabs: {
    id: number;
    title: string;
    sections: {
      id: number;
      title: string;
      content: string;
    }[];
  }[];
}

const Accessanduse: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState<number>(0);

  // Safely get page content with fallback to English
  const pageContent = languageMap[currentLanguage?.code as keyof typeof languageMap] ?? languageMap.en;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8 min-h-[50vh] bg-gradient-to-r from-emerald-900/90 to-emerald-700/90">
        <div className="absolute inset-0 bg-[url('/images/access-bg.jpg')] bg-cover bg-center opacity-15"></div>
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
            {pageContent?.title?.replace('{websiteName}', websiteInfo?.name ?? 'ArchaeoData') ?? 'Access and Use'}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-100 max-w-3xl mx-auto">
            {pageContent?.subtitle?.replace('{websiteName}', websiteInfo?.name ?? 'ArchaeoData') ?? 'Guidelines for accessing and using our platform'}
          </p>
        </motion.div>
      </section>

      {/* Tab Navigation */}
      <nav className="bg-white shadow-md py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex flex-wrap gap-4 justify-center">
          {pageContent?.tabs && Array.isArray(pageContent.tabs) && pageContent.tabs.length > 0 ? (
            pageContent.tabs.map((tab: { id: number; title: string }, index: number) => (
              <button
                key={tab?.id ?? index}
                onClick={() => setActiveTab(index)}
                className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-300 ${
                  activeTab === index
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-emerald-100'
                }`}
                aria-selected={activeTab === index}
                role="tab"
              >
                {tab?.title ?? 'Tab'}
              </button>
            ))
          ) : null}
        </div>
      </nav>

      {/* Tab Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {pageContent?.tabs && Array.isArray(pageContent.tabs) && pageContent.tabs[activeTab] ? (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
                role="tabpanel"
              >
                {pageContent.tabs[activeTab].sections?.map(
                  (section: { id: number; title: string; content: string }, index: number) => (
                    <motion.div
                      key={section?.id ?? index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white rounded-xl shadow-md p-6 border border-emerald-100"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <FileCheck size={20} className="text-emerald-600 flex-shrink-0" />
                        <h2 className="text-lg font-semibold font-serif text-gray-800">
                          {section?.title ?? 'Section'}
                        </h2>
                      </div>
                      <p className="text-sm sm:text-base text-gray-600">
                        {section?.content?.replace('{websiteName}', websiteInfo?.name ?? 'ArchaeoData') ?? 'Content'}
                      </p>
                    </motion.div>
                  )
                )}
              </motion.div>
            ) : (
              <p className="text-center text-gray-600 text-lg">No access and use policies available at the moment.</p>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default Accessanduse;