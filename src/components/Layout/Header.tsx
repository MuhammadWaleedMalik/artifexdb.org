import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Globe, LogOut } from 'lucide-react';
import { colors } from '../../data/colors/theme';

import { useLanguage } from '../../contexts/LanguageContext';
import { websiteInfo } from '../../data/website/info';

// Import language files statically
import enHeader from './en/header.json';
import zhHeader from './zh/header.json';
import jaHeader from './ja/header.json';
import esHeader from './es/header.json';

// Create a language map
const languageMap = {
  en: enHeader,
  zh: zhHeader,
  ja: jaHeader,
  es: esHeader,
};

interface HeaderContent {
  logoAlt: string;
  nav: {
    searchData: string;
    refineFindings: string;
    andThatIsIt: string;
    login: string;
    signup: string;
    logout: string;
  };
  languageSelector: {
    heading: string;
    changeLanguageLabel: string;
  };
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [pageContent, setPageContent] = useState<HeaderContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
 
  const { currentLanguage, changeLanguage, availableLanguages } = useLanguage();
  const navigate = useNavigate();

  const user = localStorage.getItem("token")

  // Set favicon dynamically
  useEffect(() => {
    const setFavicon = () => {
      let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = websiteInfo?.favicon ?? '/favicon.ico';
    };

    setFavicon();
  }, []);

  // Load language content
  useEffect(() => {
    const loadContent = () => {
      setIsLoading(true);
      try {
        const content = languageMap[currentLanguage?.code as keyof typeof languageMap] ?? languageMap.en;
        setPageContent(content);
      } catch (err) {
        console.error(`Failed to load ${currentLanguage?.code} content:`, err);
        setPageContent(languageMap.en);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [currentLanguage]);

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate('/');
    setIsMenuOpen(false);
  };

  const handleLanguageChange = (languageCode: string) => {
    changeLanguage(languageCode);
    setTimeout(() => setIsLanguageOpen(false), 200);
  };

  if (isLoading) {
    return (
      <div className="h-16 flex items-center justify-center" style={{ backgroundColor: colors.backgroundLight }}>
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2" style={{ borderColor: colors.primaryColor1 }}></div>
      </div>
    );
  }

  if (!pageContent) {
    return (
      <div className="h-16 flex items-center justify-center" style={{ backgroundColor: colors.backgroundLight }}>
        <p className="text-sm font-semibold" style={{ color: colors.textPrimary }}>
          Content not available
        </p>
      </div>
    );
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-white shadow-lg sticky top-0 z-50"
      style={{ borderBottom: `2px solid ${colors.primaryColor1}` }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Side - Logo and Website Name */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src={websiteInfo?.logo ?? '/logo.png'}
                alt={pageContent.logoAlt.replace('{websiteName}', websiteInfo?.name ?? 'ArchaeoData')}
                className="w-8 h-8 rounded"
              />
              <span
                className="text-xl font-bold"
                style={{ color: colors.primaryColor1 }}
              >
                {websiteInfo?.name ?? 'ArchaeoData'}
              </span>
            </Link>
          </div>

          {/* Right Side - All other elements */}
          <div className="flex items-center space-x-6">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to="/searchdata"
                className="text-sm font-medium hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors"
                style={{ color: colors.textPrimary }}
              >
                {pageContent.nav.searchData}
              </Link>
              <Link
                to="/refine-findings"
                className="text-sm font-medium hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors"
                style={{ color: colors.textPrimary }}
              >
                {pageContent.nav.refineFindings}
              </Link>
              <Link
                to="/blogs"
                className="text-sm font-medium hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors"
                style={{ color: colors.textPrimary }}
              >
                {pageContent.nav.andThatIsIt}
              </Link>
            </nav>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-1 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label={pageContent.languageSelector.changeLanguageLabel}
              >
                <Globe size={16} style={{ color: colors.textSecondary }} />
                <span className="text-sm">{currentLanguage?.flag ?? '🌐'}</span>
              </button>
              {isLanguageOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg border py-2 w-36 z-50"
                  style={{ borderColor: colors.secondaryColor1 }}
                >
                  <div className="px-4 py-2 text-sm font-semibold border-b" style={{ color: colors.textPrimary, borderColor: colors.secondaryColor1 }}>
                    {pageContent.languageSelector.heading}
                  </div>
                  {availableLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-2 transition-colors ${
                        currentLanguage?.code === lang.code ? 'bg-gray-50' : ''
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span
                        className="text-sm"
                        style={{
                          color: currentLanguage?.code === lang.code
                            ? colors.primaryColor1
                            : colors.textPrimary,
                        }}
                      >
                        {lang.name}
                      </span>
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* User Actions */}
            {user? (
              <div className="flex items-center space-x-2">
                <span
                  className="text-sm hidden sm:inline-block"
                  style={{ color: colors.textSecondary }}
                >
                  
                </span>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  title={pageContent.nav.logout}
                >
                  <LogOut size={16} style={{ color: colors.textSecondary }} />
                </button>
              </div>
            ) : (
              <div className="hidden md:flex space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg border hover:bg-gray-50 transition-colors"
                  style={{
                    borderColor: colors.primaryColor1,
                    color: colors.primaryColor1,
                  }}
                >
                  {pageContent.nav.login}
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-lg text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: colors.primaryColor1 }}
                >
                  {pageContent.nav.signup}
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X size={24} style={{ color: colors.textPrimary }} />
              ) : (
                <Menu size={24} style={{ color: colors.textPrimary }} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t py-4 space-y-4"
            style={{ borderColor: colors.secondaryColor1 }}
          >
            <Link
              to="/search-data"
              className="block px-4 py-2 hover:bg-gray-50 transition-colors"
              style={{ color: colors.textPrimary }}
              onClick={() => setIsMenuOpen(false)}
            >
              {pageContent.nav.searchData}
            </Link>
            <Link
              to="/refine-findings"
              className="block px-4 py-2 hover:bg-gray-50 transition-colors"
              style={{ color: colors.textPrimary }}
              onClick={() => setIsMenuOpen(false)}
            >
              {pageContent.nav.refineFindings}
            </Link>
            <Link
              to="/and-that-is-it"
              className="block px-4 py-2 hover:bg-gray-50 transition-colors"
              style={{ color: colors.textPrimary }}
              onClick={() => setIsMenuOpen(false)}
            >
              {pageContent.nav.andThatIsIt}
            </Link>
            {!user && (
              <div className="flex space-x-2 pt-4 px-4">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg border flex-1 text-center hover:bg-gray-50 transition-colors"
                  style={{
                    borderColor: colors.primaryColor1,
                    color: colors.primaryColor1,
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {pageContent.nav.login}
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-lg text-white flex-1 text-center hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: colors.primaryColor1 }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {pageContent.nav.signup}
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;  