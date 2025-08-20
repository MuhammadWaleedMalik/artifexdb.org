import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Database,
  ThumbsUp,
  FileText,
  CheckCircle,
  Search,
  Filter,
} from "lucide-react";
import { colors } from "../../data/colors/theme";
import { useLanguage } from "../../contexts/LanguageContext";

// Import all language files statically
import enData from "../data/text/en/data.json";
import zhData from "../data/text/zh/data.json";
import jaData from "../data/text/ja/data.json";
import esData from "../data/text/es/data.json";

// Create a language map
const languageMap = {
  en: enData,
  zh: zhData,
  ja: jaData,
  es: esData,
};

type DataEntry = {
  id: string;
  title: string;
  description: string;
  contributor?: string;
  date?: string;
  tags: string[];
  downloads?: number;
  verified?: boolean;
};

const RefinedDataPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const { primaryColor1, textPrimary, textSecondary, accent, backgroundLight } =
    colors;

  const [dataEntries, setDataEntries] = useState<DataEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Page content based on current language
  const pageContent =
    languageMap[currentLanguage?.code as keyof typeof languageMap] ??
    languageMap.en;

  // Categories with icons
  const filters = useMemo(() => {
    return [
      {
        id: "all",
        name: pageContent?.filters?.all ?? "All Data",
        icon: <Database size={18} />,
      },
      {
        id: "verified",
        name: pageContent?.filters?.verified ?? "Verified",
        icon: <CheckCircle size={18} />,
      },
      {
        id: "popular",
        name: pageContent?.filters?.popular ?? "Popular",
        icon: <ThumbsUp size={18} />,
      },
      {
        id: "recent",
        name: pageContent?.filters?.recent ?? "Recent",
        icon: <FileText size={18} />,
      },
    ];
  }, [pageContent]);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/data/get`
        );
        if (!response.ok) throw new Error("Failed to fetch data");

        const result = await response.json();
        setDataEntries(result.data || result); // depends on API shape
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter + search
  const filteredEntries = dataEntries.filter((entry) => {
    const matchesSearch =
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.tags?.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    if (activeFilter === "all") return matchesSearch;
    if (activeFilter === "verified")
      return matchesSearch && entry.verified === true;
    if (activeFilter === "popular")
      return matchesSearch && (entry.downloads || 0) > 100;
    if (activeFilter === "recent") {
      const entryDate = new Date(entry.date || "");
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      return matchesSearch && entryDate > oneMonthAgo;
    }
    return matchesSearch;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: backgroundLight }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-bold" style={{ color: textPrimary }}>
              {pageContent?.title ?? "Refined Data Repository"}
            </h1>
            <p className="mt-1" style={{ color: textSecondary }}>
              {pageContent?.subtitle ??
                "Verified archaeological and historical datasets"}
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search
            size={18}
            className="absolute left-3 top-3"
            style={{ color: textSecondary }}
          />
          <input
            type="text"
            placeholder={pageContent?.searchPlaceholder ?? "Search datasets..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border rounded-lg"
            style={{
              backgroundColor: backgroundLight,
              borderColor: accent,
            }}
          />
        </div>

        {/* Error / Loading */}
        {loading && <p style={{ color: textSecondary }}>Loading data...</p>}
        {error && (
          <p className="text-red-500 font-medium">❌ {error}</p>
        )}

        {/* Data List */}
        <div className="grid gap-4">
          {filteredEntries.map((entry) => (
            <div
              key={entry.id}
              className="p-4 rounded-lg shadow-md bg-white"
              style={{ borderColor: accent }}
            >
              <h2 className="text-xl font-semibold" style={{ color: textPrimary }}>
                {entry.title}
              </h2>
              <p className="mt-1" style={{ color: textSecondary }}>
                {entry.description}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {entry.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-sm rounded-md"
                    style={{
                      backgroundColor: `${primaryColor1}20`,
                      color: primaryColor1,
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {!loading && filteredEntries.length === 0 && (
            <p style={{ color: textSecondary }}>No data found.</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default RefinedDataPage;
