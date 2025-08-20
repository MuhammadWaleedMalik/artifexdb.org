import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Settings, Shield, Globe } from 'lucide-react';
import { websiteInfo } from '../data/website/info';
import { useLanguage } from '../contexts/LanguageContext';
import { colors } from '../data/colors/theme';

// Import language files statically
import enCookies from '../data/text/en/cookies.json';
import zhCookies from '../data/text/zh/cookies.json';
import jaCookies from '../data/text/ja/cookies.json';
import esCookies from '../data/text/es/cookies.json';

// Create a language map
const languageMap = {
  en: enCookies,
  zh: zhCookies,
  ja: jaCookies,
  es: esCookies,
};

interface CookiesContent {
  title: string;
  subtitle: string;
  content: string[];
  sections: {
    title: string;
    content: string;
  }[];
}

const Cookies: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [visibleSections, setVisibleSections] = useState<boolean[]>(new Array(4).fill(true));

  // Get page content directly, default to English
  const pageContent = languageMap[currentLanguage.code as keyof typeof languageMap] || languageMap.en;

  // Section icons
  const sectionIcons = [
    <Cookie size={30} className="text-[${colors.primaryColor1}]" />,
    <Settings size={30} className="text-[${colors.primaryColor1}]" />,
    <Shield size={30} className="text-[${colors.primaryColor1}]" />,
    <Globe size={30} className="text-[${colors.primaryColor1}]" />,
  ];

  // Handle dismissing a section
  const handleDismiss = (index: number) => {
    setVisibleSections((prev) => {
      const newVisible = [...prev];
      newVisible[index] = false;
      return newVisible;
    });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.backgroundLight }}>
      {/* Hero Section */}
      <section 
        className="relative min-h-[50vh] flex items-center justify-center px-6 py-20 bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('/images/archaeology-cookies-bg.jpg')`
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="text-center max-w-5xl mx-auto"
        >
          <h1
            className="text-4xl md:text-6xl font-extrabold text-white mb-5 tracking-tight"
            style={{ textShadow: '2px 2px 10px rgba(0, 0, 0, 0.9)' }}
            aria-label={pageContent.title.replace('{websiteName}', websiteInfo.name)}
          >
            {pageContent.title.replace('{websiteName}', websiteInfo.name)}
          </h1>
          <p
            className="text-lg md:text-xl text-gray-100 font-medium max-w-3xl mx-auto"
            style={{ textShadow: '1px 1px 5px rgba(0, 0, 0, 0.7)' }}
          >
            {pageContent.subtitle.replace('{websiteName}', websiteInfo.name)}
          </p>
        </motion.div>
      </section>

      {/* Cookies Sections - Timeline Style */}
      <section className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[${colors.primaryColor1}] opacity-30"></div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-center mb-20"
            style={{ color: colors.textPrimary }}
          >
            Cookie Policies for {websiteInfo.name}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-16 relative z-10 border"
            style={{ borderColor: colors.primaryColor1 }}
          >
            {pageContent.content.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="text-base mb-5 leading-relaxed"
                style={{ color: colors.textSecondary }}
              >
                {paragraph.replace('{websiteName}', websiteInfo.name)}
              </motion.p>
            ))}
          </motion.div>
          <AnimatePresence>
            {pageContent.sections.map((section, index) => (
              visibleSections[index] && (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, transition: { duration: 0.4 } }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative bg-white rounded-2xl shadow-lg p-6 mb-8 border z-10 ${index % 2 === 0 ? 'mr-auto' : 'ml-auto'} w-full md:w-5/12`}
                  style={{ borderColor: colors.primaryColor1 }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[${colors.primaryColor1}] rounded-full z-20" style={{ [index % 2 === 0 ? 'right' : 'left']: '-1rem' }}></div>
                  <button
                    onClick={() => handleDismiss(index)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-[${colors.primaryColor1}] transition-colors"
                    aria-label="Dismiss section"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="flex items-start space-x-4">
                    {sectionIcons[index]}
                    <div>
                      <h3 className="text-lg font-semibold mb-2" style={{ color: colors.textPrimary }}>
                        {section.title.replace('{websiteName}', websiteInfo.name)}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: colors.textSecondary }}>
                        {section.content.replace('{websiteName}', websiteInfo.name)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
          {/* Cookies Consent Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 bg-white rounded-2xl shadow-lg p-8 relative z-10 border"
            style={{ borderColor: colors.primaryColor1 }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-base md:text-lg font-medium" style={{ color: colors.textPrimary }}>
                {currentLanguage.code === 'ja'
                  ? 'クッキーポリシーに同意することで、{websiteName}のサービスを最適に利用できます。'
                  : currentLanguage.code === 'zh'
                  ? '同意我们的Cookie政策以优化使用{websiteName}的服务。'
                  : `Agree to our Cookie Policy to enhance your experience on ${websiteInfo.name}.`}
              </p>
              <div className="flex space-x-4">
                <button
                  className="px-6 py-2 rounded-lg border font-medium transition-colors hover:bg-[${colors.primaryColor1}20]"
                  style={{ borderColor: colors.primaryColor1, color: colors.primaryColor1 }}
                >
                  {currentLanguage.code === 'ja' ? '詳細' : currentLanguage.code === 'zh' ? '详情' : 'Details'}
                </button>
                <button
                  className="px-6 py-2 rounded-lg text-white font-medium transition-opacity hover:opacity-90"
                  style={{ backgroundColor: colors.primaryColor1 }}
                >
                  {currentLanguage.code === 'ja' ? '同意する' : currentLanguage.code === 'zh' ? '接受' : 'Accept'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Cookies;