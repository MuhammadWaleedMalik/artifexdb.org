import React from 'react';
import { motion } from 'framer-motion';
import { Users, Database, Globe } from 'lucide-react';
import { websiteInfo } from '../data/website/info';
import { useLanguage } from '../contexts/LanguageContext';
import { colors } from '../data/colors/theme';

// Import language files statically
import enAbout from '../data/text/en/about.json';
import zhAbout from '../data/text/zh/about.json';
import jaAbout from '../data/text/ja/about.json';
import esAbout from '../data/text/es/about.json';

// Create a language map
const languageMap = {
  en: enAbout,
  zh: zhAbout,
  ja: jaAbout,
  es: esAbout,
};

interface AboutContent {
  title: string;
  subtitle: string;
  mission: {
    title: string;
    description: string;
  };
  features: {
    title: string;
    items: { id: number; title: string; description: string }[];
  };
  team: {
    title: string;
    description: string;
  };
}

const AboutUs: React.FC = () => {
  const { currentLanguage } = useLanguage();

  // Safely get page content with fallback to English
  const pageContent = languageMap[currentLanguage?.code as keyof typeof languageMap] ?? languageMap.en;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center py-24 px-4 sm:px-6 lg:px-8 min-h-[60vh] bg-gradient-to-r from-green-900/90 to-green-700/90">
        <div className="absolute inset-0 bg-[url('/images/historical-map-bg.jpg')] bg-cover bg-center opacity-20"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative text-center max-w-5xl mx-auto z-10"
        >
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 font-serif tracking-wide"
            aria-label={pageContent?.title?.replace('{websiteName}', websiteInfo?.name ?? 'ArchaeoData')}
          >
            {pageContent?.title?.replace('{websiteName}', websiteInfo?.name ?? 'ArchaeoData') ?? 'About ArchaeoData'}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-100 max-w-3xl mx-auto">
            {pageContent?.subtitle?.replace('{websiteName}', websiteInfo?.name ?? 'ArchaeoData') ?? 'Discover our mission to revolutionize archaeological research'}
          </p>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <Globe size={32} className="text-indigo-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-gray-800 mb-4">
              {pageContent?.mission?.title ?? 'Our Mission'}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              {pageContent?.mission?.description?.replace('{websiteName}', websiteInfo?.name ?? 'ArchaeoData') ?? 'Empowering global research with open data.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl font-bold text-center font-serif text-gray-800 mb-10"
          >
            {pageContent?.features?.title ?? 'Why Choose Us'}
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pageContent?.features?.items && Array.isArray(pageContent.features.items) && pageContent.features.items.length > 0 ? (
              pageContent.features.items.map((feature: { id: number; title: string; description: string }, index: number) => (
                <motion.div
                  key={feature?.id ?? index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md p-6 border border-indigo-100 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <Database size={24} className="text-indigo-600 flex-shrink-0" />
                    <h3 className="text-lg font-semibold font-serif text-gray-800">
                      {feature?.title ?? 'Feature'}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    {feature?.description?.replace('{websiteName}', websiteInfo?.name ?? 'ArchaeoData') ?? 'Description'}
                  </p>
                </motion.div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-600">No features available at the moment.</p>
            )}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <Users size={32} className="text-indigo-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-gray-800 mb-4">
              {pageContent?.team?.title ?? 'Our Team'}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              {pageContent?.team?.description?.replace('{websiteName}', websiteInfo?.name ?? 'ArchaeoData') ?? 'A dedicated team of researchers and developers.'}
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;