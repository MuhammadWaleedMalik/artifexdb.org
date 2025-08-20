import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { colors } from '../data/colors/theme';
import { websiteInfo } from '../data/website/info';
import { useLanguage } from '../contexts/LanguageContext';

// Lazy load image component
const LazyImage = lazy(() => import('../components/LazyImage.tsx'));

// Import all language files statically
import enContact from '../data/text/en/contact.json';
import jaContact from '../data/text/ja/contact.json';
import zhContact from '../data/text/zh/contact.json';

// Create a language map
const languageMap = {
  en: enContact,
  ja: jaContact,
  zh: zhContact,
};

interface ContactContent {
  title: string;
  subtitle: string;
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
  form: {
    title: string;
    nameLabel: string;
    emailLabel: string;
    subjectLabel: string;
    messageLabel: string;
    submitButton: string;
  };
}

const Contact: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [pageContent, setPageContent] = useState<ContactContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = () => {
      setIsLoading(true);
      try {
        console.log(`Loading content for language: ${currentLanguage.code}`);
        const content = languageMap[currentLanguage.code as keyof typeof languageMap];
        setPageContent(content);
      } catch (err) {
        console.error(`Failed to load ${currentLanguage.code} content:`, err);
        setPageContent(languageMap.en);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [currentLanguage]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-gray-800 to-gray-900">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="rounded-full h-12 w-12 border-t-2 border-b-2"
          style={{ borderColor: colors.primaryColor1 }}
        ></motion.div>
      </div>
    );
  }

  if (!pageContent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-gray-800 to-gray-900">
        <p className="text-lg font-semibold text-white">
          Content not available
        </p>
      </div>
    );
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-900"></div>}>
      <div className="relative">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center px-4 py-20 overflow-hidden">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-0"
          >
            <LazyImage 
              src="https://rightstrade.com/wp-content/themes/yootheme/cache/b5/home-top-hero-img-b5150a70.webp"
              alt="Contact Hero Background"
              placeholder="https://via.placeholder.com/1920x1080?text=Contact+Background"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center max-w-4xl mx-auto"
          >
            <h1 
              className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight"
              style={{ textShadow: '2px 2px 6px rgba(0, 0, 0, 0.7)' }}
              aria-label={pageContent.title}
            >
              {pageContent.title}
            </h1>
            <p 
              className="text-xl md:text-2xl text-white font-light max-w-3xl mx-auto"
              style={{ textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)' }}
            >
              {pageContent.subtitle}
            </p>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <h2 
                className="text-2xl font-bold mb-6"
                style={{ color: colors.textPrimary }}
              >
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="w-6 h-6 mr-3" style={{ color: colors.primaryColor1 }} />
                  <p className="text-sm" style={{ color: colors.textSecondary }}>
                    {pageContent.contactInfo.email}
                  </p>
                </div>
                <div className="flex items-center">
                  <Phone className="w-6 h-6 mr-3" style={{ color: colors.primaryColor1 }} />
                  <p className="text-sm" style={{ color: colors.textSecondary }}>
                    {pageContent.contactInfo.phone}
                  </p>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 mr-3" style={{ color: colors.primaryColor1 }} />
                  <p className="text-sm" style={{ color: colors.textSecondary }}>
                    {pageContent.contactInfo.address}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <h2 
                className="text-2xl font-bold mb-6"
                style={{ color: colors.textPrimary }}
              >
                {pageContent.form.title}
              </h2>
              <div className="space-y-4">
                <div>
                  <label 
                    htmlFor="name" 
                    className="block text-sm font-medium mb-1"
                    style={{ color: colors.textSecondary }}
                  >
                    {pageContent.form.nameLabel}
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="John Doe"
                    className="w-full p-2 border rounded-lg"
                    style={{ borderColor: colors.textSecondary }}
                    aria-label={pageContent.form.nameLabel}
                    disabled
                  />
                </div>
                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-medium mb-1"
                    style={{ color: colors.textSecondary }}
                  >
                    {pageContent.form.emailLabel}
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="john.doe@example.com"
                    className="w-full p-2 border rounded-lg"
                    style={{ borderColor: colors.textSecondary }}
                    aria-label={pageContent.form.emailLabel}
                    disabled
                  />
                </div>
                <div>
                  <label 
                    htmlFor="subject" 
                    className="block text-sm font-medium mb-1"
                    style={{ color: colors.textSecondary }}
                  >
                    {pageContent.form.subjectLabel}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    placeholder="Festival Inquiry"
                    className="w-full p-2 border rounded-lg"
                    style={{ borderColor: colors.textSecondary }}
                    aria-label={pageContent.form.subjectLabel}
                    disabled
                  />
                </div>
                <div>
                  <label 
                    htmlFor="message" 
                    className="block text-sm font-medium mb-1"
                    style={{ color: colors.textSecondary }}
                  >
                    {pageContent.form.messageLabel}
                  </label>
                  <textarea
                    id="message"
                    placeholder="Your message here..."
                    className="w-full p-2 border rounded-lg"
                    style={{ borderColor: colors.textSecondary }}
                    rows={4}
                    aria-label={pageContent.form.messageLabel}
                    disabled
                  ></textarea>
                </div>
                <button
                  className="w-full py-2 px-4 rounded-lg text-white font-medium transition-all duration-300 hover:scale-105"
                  style={{ backgroundColor: colors.primaryColor1 }}
                  aria-label={pageContent.form.submitButton}
                  disabled
                >
                  {pageContent.form.submitButton}
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </Suspense>
  );
};

export default Contact;