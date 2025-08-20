import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  currentLanguage: Language;
  changeLanguage: (languageCode: string) => void;
  availableLanguages: Language[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const availableLanguages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code :'es', name: 'Spanish',flag: '🇪🇸' },
];

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    // Get saved language from localStorage or use browser language if available
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      return availableLanguages.find(lang => lang.code === savedLanguage) || availableLanguages[0];
    }
    
    // Try to use browser language
    const browserLanguage = navigator.language.split('-')[0];
    return availableLanguages.find(lang => lang.code === browserLanguage) || availableLanguages[0];
  });

  const changeLanguage = (languageCode: string) => {
    const newLanguage = availableLanguages.find(lang => lang.code === languageCode);
    if (newLanguage) {
      setCurrentLanguage(newLanguage);
      localStorage.setItem('selectedLanguage', languageCode);
    }
  };

  // Debug effect
  useEffect(() => {
    console.log('Current language changed to:', currentLanguage.code);
  }, [currentLanguage]);

  return (
    <LanguageContext.Provider value={{ 
      currentLanguage, 
      changeLanguage, 
      availableLanguages 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};