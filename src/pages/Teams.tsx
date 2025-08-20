import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Briefcase, Globe2 } from 'lucide-react';
import { websiteInfo } from '../data/website/info';
import { useLanguage } from '../contexts/LanguageContext';
import { colors } from '../data/colors/theme';

// Lazy load images for performance
const LazyImage = ({ src, alt, className }: { src: string; alt: string; className: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref]);

  return (
    <figure ref={setRef} className={className}>
      {isVisible ? (
        <img src={src} alt={alt} className="w-full h-full object-cover rounded-full" />
      ) : (
        <div className="w-full h-full bg-gray-200 rounded-full animate-pulse" />
      )}
    </figure>
  );
};

// Import language files statically
import enTeam from '../data/text/en/team.json';
import zhTeam from '../data/text/zh/team.json';
import jaTeam from '../data/text/ja/team.json';
import esTeam from '../data/text/es/team.json';

// Create a language map
const languageMap = {
  en: enTeam,
  zh: zhTeam,
  ja: jaTeam,
  es: esTeam,
};

interface TeamContent {
  title: string;
  subtitle: string;
  introduction: {
    title: string;
    description: string;
  };
  members: {
    id: number;
    name: string;
    role: string;
    bio: string;
    image: string;
  }[];
}

const Team: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Safely get page content with fallback to English
  const pageContent = languageMap[currentLanguage?.code as keyof typeof languageMap] ?? languageMap.en;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8 min-h-[50vh] bg-gradient-to-r from-teal-800/90 to-teal-600/90">
        <div className="absolute inset-0 bg-[url('/images/ancient-artifacts-bg.jpg')] bg-cover bg-center opacity-15"></div>
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
            {pageContent?.title?.replace('{websiteName}', websiteInfo?.name ?? 'ArchaeoData') ?? 'Meet Our Team'}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-100 max-w-3xl mx-auto">
            {pageContent?.subtitle?.replace('{websiteName}', websiteInfo?.name ?? 'ArchaeoData') ?? 'The minds behind our archaeological data platform'}
          </p>
        </motion.div>
      </section>

      {/* Introduction Section */}
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
              <Globe2 size={32} className="text-teal-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-gray-800 mb-4">
              {pageContent?.introduction?.title ?? 'Who We Are'}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              {pageContent?.introduction?.description?.replace('{websiteName}', websiteInfo?.name ?? 'ArchaeoData') ?? 'A global team dedicated to open research.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl font-bold text-center font-serif text-gray-800 mb-12"
          >
            Our Team Members
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pageContent?.members && Array.isArray(pageContent.members) && pageContent.members.length > 0 ? (
              pageContent.members.map((member: { id: number; name: string; role: string; bio: string; image: string }, index: number) => (
                <motion.div
                  key={member?.id ?? index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative bg-white rounded-xl shadow-md overflow-hidden border border-teal-100 group"
                  onMouseEnter={() => setHoveredId(member?.id ?? index)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <LazyImage
                    src={member?.image ?? '/images/placeholder-avatar.jpg'}
                    alt={member?.name ?? 'Team Member'}
                    className="w-32 h-32 mx-auto mt-6"
                  />
                  <div className="p-6 text-center">
                    <h3 className="text-lg font-semibold font-serif text-gray-800">
                      {member?.name ?? 'Team Member'}
                    </h3>
                    <p className="text-sm text-teal-600 font-medium mb-2 flex items-center justify-center">
                      <Briefcase size={16} className="mr-1" />
                      {member?.role ?? 'Role'}
                    </p>
                    <AnimatePresence>
                      {hoveredId === (member?.id ?? index) && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-sm text-gray-600"
                        >
                          {member?.bio?.replace('{websiteName}', websiteInfo?.name ?? 'ArchaeoData') ?? 'Bio'}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  <div
                    className="absolute inset-0 bg-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-hidden="true"
                  />
                </motion.div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-600 text-lg">No team members available at the moment.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;