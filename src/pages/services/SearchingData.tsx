import React, { useState } from "react";
import { motion } from "framer-motion";
import { Database, CheckCircle, XCircle } from "lucide-react";
import { colors } from "../../data/colors/theme";
import { useLanguage } from "../../contexts/LanguageContext";

// Language files
import enSearch from "../data/text/en/search.json";
import zhSearch from "../data/text/zh/search.json";
import jaSearch from "../data/text/ja/search.json";
import esSearch from "../data/text/es/search.json";

const languageMap = { en: enSearch, zh: zhSearch, ja: jaSearch, es: esSearch };

const SearchingData: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const { primaryColor1, textPrimary, accent } = colors;

  const [newSearch, setNewSearch] = useState({
    title: "",
    description: "",
    tags: "",
  });

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const pageContent =
    languageMap[currentLanguage?.code as keyof typeof languageMap] ??
    languageMap.en;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setNotification(null);

    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    if (!apiUrl) {
      setNotification({
        type: "error",
        message: "❌ API URL is missing. Check your .env file!",
      });
      setLoading(false);
      return;
    }

    try {
      const payload = {
        title: newSearch.title,
        description: newSearch.description,
        tags: newSearch.tags
          ? newSearch.tags.split(",").map((tag) => tag.trim())
          : [],
      };

      console.log("🔹 Sending to API:", `${apiUrl}/api/v1/data/post`, payload);

      const response = await fetch(`${apiUrl}/api/v1/data/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));
      console.log("🔹 API Response:", response.status, data);

      if (!response.ok) {
        throw new Error(data?.message || `Failed with ${response.status}`);
      }

      setNotification({
        type: "success",
        message: "✅ Data saved successfully!",
      });

      // clear only after success
      setNewSearch({ title: "", description: "", tags: "" });
    } catch (err: any) {
      setNotification({
        type: "error",
        message: `❌ ${err.message}`,
      });
    } finally {
      setLoading(false);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex justify-center items-center px-4"
      style={{ backgroundColor: colors.backgroundLight }}
    >
      <div className="w-full max-w-2xl p-6 rounded-xl shadow-lg bg-white">
        {/* Title */}
        <h1
          className="text-2xl font-bold mb-6 text-center"
          style={{ color: textPrimary }}
        >
          {pageContent?.addDataTitle ?? "Add New Data Entry"}
        </h1>

        {/* Notification */}
        {notification && (
          <div
            className={`flex items-center mb-4 px-4 py-3 rounded-lg text-white shadow-md ${
              notification.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {notification.type === "success" ? (
              <CheckCircle className="mr-2" />
            ) : (
              <XCircle className="mr-2" />
            )}
            {notification.message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder={pageContent?.formFields?.title ?? "Data Title"}
            value={newSearch.title}
            onChange={(e) => setNewSearch({ ...newSearch, title: e.target.value })}
            className="w-full p-3 border rounded-md"
            style={{ borderColor: accent }}
            required
          />

          <textarea
            placeholder={
              pageContent?.formFields?.description ?? "Data Description"
            }
            value={newSearch.description}
            onChange={(e) =>
              setNewSearch({ ...newSearch, description: e.target.value })
            }
            rows={4}
            className="w-full p-3 border rounded-md"
            style={{ borderColor: accent }}
            required
          />

          <input
            type="text"
            placeholder={
              pageContent?.formFields?.tags ?? "Tags (comma-separated)"
            }
            value={newSearch.tags}
            onChange={(e) => setNewSearch({ ...newSearch, tags: e.target.value })}
            className="w-full p-3 border rounded-md"
            style={{ borderColor: accent }}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center px-6 py-3 rounded-md font-medium"
            style={{ backgroundColor: primaryColor1, color: "white" }}
          >
            <Database size={18} className="mr-2" />
            {loading ? "Saving..." : pageContent?.submitData ?? "Submit Data"}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default SearchingData;
