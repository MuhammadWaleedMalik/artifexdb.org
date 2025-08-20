import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Youtube, Linkedin, ChevronRight, Mail } from 'lucide-react';
import { websiteInfo } from '../../data/website/info';
import { colors } from '../../data/colors/theme';
import { useLanguage } from '../../contexts/LanguageContext';

// Import all language files statically
import enFooter from './en/footer.json';
import jaFooter from './ja/footer.json';
import zhFooter from './zh/footer.json';
import esFooter from './es/footer.json';

// Create a language map
const languageMap = {
  en: enFooter,
  ja: jaFooter,
  zh: zhFooter,
  es: esFooter
};

interface FooterContent {
  brand: {
    nameAlt: string;
    slogan: string;
  };
  sections: {
    title: string;
    links: {
      path: string;
      label: string;
    }[];
  }[];
  social: {
    links: {
      name: string;
      link: string;
    }[];
  };
  copyright: {
    text: string;
    privacy: string;
    cookies: string;
    terms: string;
  };
}

const Footer: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const { textPrimary, textSecondary, accent } = colors;

  // Get page content directly from languageMap, default to English if not found
  const pageContent: FooterContent = languageMap[currentLanguage.code as keyof typeof languageMap] || languageMap.en;

  // Memoize social links to avoid recomputing on every render
  const socialLinks = useMemo(() => {
    return pageContent.social.links.map(social => ({
      ...social,
      icon: (
        social.name === 'Facebook' ? <Facebook size={20} /> :
        social.name === 'Twitter' ? <Twitter size={20} /> :
        social.name === 'Youtube' ? <Youtube size={20} /> :
        social.name === 'LinkedIn' ? <Linkedin size={20} /> : null
      ),
      link: social.link === 'd' ? websiteInfo[social.name.toLowerCase() as keyof typeof websiteInfo] || '#' : social.link
    }));
  }, [pageContent]);

  // Partner images data
  const partners = [
    { img: "https://assets.tdar.org/images/logos/Mellon.png", alt: "Partner 1" },
    { img: "https://assets.tdar.org/images/logos/aia.png", alt: "Partner 2" },
    { img: "https://assets.tdar.org/images/logos/neh_logo_stckd.jpg", alt: "Partner 3" },
    { img: "https://assets.tdar.org/images/logos/asu_veritcal.png", alt: "Partner 4" }
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-white dark:bg-gray-900"
      style={{ borderTop: `1px solid ${accent}` }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Left Column - Navigation Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pageContent.sections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-lg font-semibold" style={{ color: textPrimary }}>
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link 
                        to={link.path} 
                        className="flex items-center text-sm hover:underline transition-colors group"
                        style={{ color: textSecondary }}
                      >
                        <ChevronRight size={14} className="mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Right Column - Brand Info */}
          <div className="flex flex-col items-center lg:items-end space-y-6">
            <div className="flex flex-col items-center lg:items-end space-y-4">
              <img 
                src={websiteInfo.logo} 
                alt={pageContent.brand.nameAlt} 
                className="h-16 w-auto"
              />
              <h2 className="text-2xl font-bold text-center lg:text-right" style={{ color: textPrimary }}>
                {websiteInfo.name}
              </h2>
              <p className="text-sm text-center lg:text-right" style={{ color: textSecondary }}>
                {pageContent.brand.slogan}
              </p>
            </div>

            <div className="flex flex-col items-center lg:items-end space-y-3">
              <a 
                href={`mailto:${websiteInfo.mail}`}
                className="flex items-center text-sm hover:underline"
                style={{ color: textPrimary }}
              >
                <Mail size={16} className="mr-2" />
                {websiteInfo.mail}
              </a>
              
      
            </div>
          </div>
        </div>

   
   
   
      </div>
    </motion.footer>
  );
};

export default Footer;