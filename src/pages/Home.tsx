import React, { useMemo, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { websiteInfo } from '../data/website/info';
import { colors } from '../data/colors/theme';

const LazyImage = lazy(() => import('../components/LazyImage'));

// Import language files
import enHome from '../data/text/en/home.json';
import zhHome from '../data/text/zh/home.json';
import jaHome from '../data/text/ja/home.json';
import esHome from '../data/text/es/home.json';

const languageMap = {
  en: enHome,
  zh: zhHome,
  ja: jaHome,
  es: esHome,
};

interface HomeContent {
  page1?: {
    title?: string;
    description?: string;
    links?: Array<{ text?: string; to?: string }>;
  };
  page2?: {
    title?: string;
    description?: string;
  };
  page3?: {
    title?: string;
    description?: string;
  };
  page4?: {
    title?: string;
    description?: string;
  };
  page5?: {
    title?: string;
    description?: string;
  };
  page6?: {
    title?: string;
    description?: string;
  };
  page7?: {
    title?: string;
    partners?: Array<{ name?: string; logo?: string }>;
  };
}

const processText = (text?: string): string => {
  if (!text) return '';
  return text.replace(/\{website\.name\}/g, websiteInfo?.name || '');
};

const Home: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const defaultContent = languageMap.en as HomeContent;

  const pageContent = useMemo(() => {
    return languageMap[currentLanguage?.code as keyof typeof languageMap] || defaultContent;
  }, [currentLanguage?.code]);

  const processedContent = useMemo(() => {
    return {
      page1: {
        title: processText(pageContent.page1?.title) || processText(defaultContent.page1?.title),
        description: processText(pageContent.page1?.description) || processText(defaultContent.page1?.description),
        links: pageContent.page1?.links || defaultContent.page1?.links || []
      },
      page2: {
        title: processText(pageContent.page2?.title) || processText(defaultContent.page2?.title),
        description: processText(pageContent.page2?.description) || processText(defaultContent.page2?.description)
      },
      page3: {
        title: processText(pageContent.page3?.title) || processText(defaultContent.page3?.title),
        description: processText(pageContent.page3?.description) || processText(defaultContent.page3?.description)
      },
      page4: {
        title: processText(pageContent.page4?.title) || processText(defaultContent.page4?.title),
        description: processText(pageContent.page4?.description) || processText(defaultContent.page4?.description)
      },
      page5: {
        title: processText(pageContent.page5?.title) || processText(defaultContent.page5?.title),
        description: processText(pageContent.page5?.description) || processText(defaultContent.page5?.description)
      },
      page6: {
        title: processText(pageContent.page6?.title) || processText(defaultContent.page6?.title),
        description: processText(pageContent.page6?.description) || processText(defaultContent.page6?.description)
      },
      page7: {
        title: processText(pageContent.page7?.title) || processText(defaultContent.page7?.title),
        partners: pageContent.page7?.partners || defaultContent.page7?.partners || []
      }
    };
  }, [pageContent, defaultContent]);

  const images = {
    page1: 'https://openatlas.eu/static/images/layout/hero_image.jpg',
    page5: 'https://openatlas.eu/static/images/layout/openatlas_schema.png',
    page6: 'https://openatlas.eu/static/images/layout/map.jpg',
    partners: [
      'https://openatlas.eu/static/images/institutes/oeaw.png',
      'https://openatlas.eu/static/images/institutes/oeai.png',
      'https://openatlas.eu/static/images/institutes/imafo.png',
      'https://openatlas.eu/static/images/institutes/jgu.png',
      'https://openatlas.eu/static/images/institutes/lbi.jpg',
      'https://openatlas.eu/static/images/institutes/uni_vienna.png',
      'https://openatlas.eu/static/images/institutes/erc.png',
      'https://openatlas.eu/static/images/institutes/fwf.png',
    ]
  };

  return (
    <div className="min-h-screen">
      {/* Page 1 */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row items-center justify-between p-4 md:p-8 min-h-screen"
      >
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ color: colors.primaryColor3 }}>
            {processedContent.page1.title}
          </h1>
          <p className="text-base md:text-lg mb-6">{processedContent.page1.description}</p>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            {processedContent.page1.links.map((link, index) => (
              <Link
                key={index}
                to={link.to || '#'}
                className="px-4 py-2 rounded-md text-center transition-colors hover:opacity-90"
                style={{ backgroundColor: colors.primaryColor1, color: 'white' }}
              >
                {link.text}
              </Link>
            ))}
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <Suspense fallback={<div className="w-full h-64 bg-gray-200 rounded-lg animate-pulse" />}>
            <LazyImage 
              src={images.page1} 
              alt="Research Data Management" 
              className="rounded-lg shadow-lg"
            />
          </Suspense>
        </div>
      </motion.section>

      {/* Page 2 */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
        className="p-4 md:p-10 min-h-screen flex items-center"
      >
        <div className="w-full max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 md:mb-12" style={{ color: colors.primaryColor1 }}>
            {processedContent.page2.title}
          </h1>
          <p className="text-base md:text-lg">{processedContent.page2.description}</p>
        </div>
      </motion.section>

      {/* Page 3 */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
        className="p-4 md:p-8 min-h-screen flex items-center justify-center bg-gray-50"
      >
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ color: colors.primaryColor1 }}>
            {processedContent.page3.title}
          </h1>
          <p className="text-base md:text-lg">{processedContent.page3.description}</p>
        </div>
      </motion.section>

      {/* Page 4 */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
        className="p-4 md:p-8  flex items-center justify-center"
        style={{ backgroundColor: colors.secondaryColor2, color: 'white' }}
      >
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{processedContent.page4.title}</h1>
          <p className="text-xl md:text-2xl">{processedContent.page4.description}</p>
        </div>
      </motion.section>

      {/* Page 5 */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col md:flex-row items-center justify-between p-4 md:p-8 "
      >
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-3xl font-bold mb-4" style={{ color: colors.primaryColor1 }}>
            {processedContent.page5.title}
          </h1>
          <p className="text-base md:text-lg whitespace-pre-line">{processedContent.page5.description}</p>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <Suspense fallback={<div className="w-full h-64 bg-gray-200 rounded-lg animate-pulse" />}>
            <LazyImage 
              src={images.page5} 
              alt="Model" 
              className="rounded-lg shadow-lg"
            />
          </Suspense>
        </div>
      </motion.section>

      {/* Page 6 */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col md:flex-row-reverse items-center justify-between p-4 md:p-8 min-h-screen bg-gray-50"
      >
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-3xl font-bold mb-4" style={{ color: colors.primaryColor1 }}>
            {processedContent.page6.title}
          </h1>
          <p className="text-base md:text-lg">{processedContent.page6.description}</p>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <Suspense fallback={<div className="w-full h-64 bg-gray-200 rounded-lg animate-pulse" />}>
            <LazyImage 
              src={images.page6} 
              alt="Interactive Map" 
              className="rounded-lg shadow-lg"
            />
          </Suspense>
        </div>
      </motion.section>

      {/* Page 7 */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
        className="p-4 md:p-8 min-h-screen flex flex-col items-center justify-center"
      >
        <div className="w-full max-w-6xl">
          <h1 className="text-3xl font-bold mb-8 text-center" style={{ color: colors.primaryColor1 }}>
            {processedContent.page7.title}
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {images.partners.map((partner, index) => (
              <div key={index} className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm">
                <Suspense fallback={<div className="w-32 h-16 bg-gray-200 animate-pulse" />}>
                  <LazyImage 
                    src={partner} 
                    alt={`Partner ${index + 1}`} 
                    className="max-h-16 object-contain"
                  />
                </Suspense>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;