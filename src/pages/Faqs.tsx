import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, BookOpen } from 'lucide-react';
import { websiteInfo } from '../data/website/info';
import { useLanguage } from '../contexts/LanguageContext';
import { colors } from '../data/colors/theme';

// Import language files statically
import enFAQs from '../data/text/en/faqs.json';
import zhFAQs from '../data/text/zh/faqs.json';
import jaFAQs from '../data/text/ja/faqs.json';
import esFAQs from '../data/text/es/faqs.json';

// Create a language map
const languageMap = {
  en: enFAQs,
  zh: zhFAQs,
  ja: jaFAQs,
  es: esFAQs,
};

interface FAQContent {
  title: string;
  subtitle: string;
  faqs: {
    id: number;
    question: string;
    answer: string;
  }[];
}

const FAQs: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Safely get page content with fallback to English
  const pageContent = languageMap[currentLanguage?.code as keyof typeof languageMap] ?? languageMap.en;

  // Toggle FAQ expansion
  const toggleFAQ = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8 min-h-[50vh] bg-gradient-to-r from-green-800/90 to-green-600/90">
        <div className="absolute inset-0 bg-[url('/images/ancient-ruins-bg.jpg')] bg-cover bg-center opacity-20"></div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative text-center max-w-4xl mx-auto z-10"
        >
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 font-serif tracking-wide"
            aria-label={pageContent?.title?.replace('{websiteName}', websiteInfo?.name ?? 'ArchaeoData')}
          >
            {pageContent?.title?.replace('{websiteName}', websiteInfo?.name ?? 'ArchaeoData') ?? 'ArchaeoData FAQs'}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-100 max-w-2xl mx-auto">
            {pageContent?.subtitle?.replace('{websiteName}', websiteInfo?.name ?? 'ArchaeoData') ?? 'Your guide to our archaeological data platform'}
          </p>
        </motion.div>
      </section>

      {/* FAQs Section - Accordion Layout */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl font-bold text-center mb-10 font-serif text-gray-800"
          >
            Explore Common Questions
          </motion.h2>
          <div className="space-y-4">
            {pageContent?.faqs && Array.isArray(pageContent.faqs) && pageContent.faqs.length > 0 ? (
              pageContent.faqs.map((faq: { id: number; question: string; answer: string }, index: number) => (
                <motion.div
                  key={faq?.id ?? index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-amber-200"
                >
                  <button
                    className="w-full flex items-center justify-between p-5 text-left focus:outline-none focus:ring-2 focus:ring-amber-500"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={expandedIndex === index}
                    aria-controls={`faq-answer-${faq?.id ?? index}`}
                  >
                    <div className="flex items-center space-x-3">
                      <BookOpen size={20} className="text-amber-600 flex-shrink-0" />
                      <h3 className="text-base sm:text-lg font-semibold font-serif text-gray-800">
                        {faq?.question?.replace('{websiteName}', websiteInfo?.name ?? 'ArchaeoData') ?? 'Question'}
                      </h3>
                    </div>
                    <ChevronDown
                      size={20}
                      className={`text-amber-600 transform transition-transform duration-300 ${expandedIndex === index ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <motion.div
                    id={`faq-answer-${faq?.id ?? index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: expandedIndex === index ? 'auto' : 0, 
                      opacity: expandedIndex === index ? 1 : 0 
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 pt-0 text-sm sm:text-base text-gray-600 bg-amber-50/50">
                      {faq?.answer?.replace('{websiteName}', websiteInfo?.name ?? 'ArchaeoData') ?? 'Answer'}
                    </div>
                  </motion.div>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-600 text-lg">No FAQs available at the moment.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQs;