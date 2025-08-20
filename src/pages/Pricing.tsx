import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import { t } from "i18next";

const Pricing = () => {
  const colors = {
    primary: "#356AFF",
    secondary: "blue",
    background: "radial-gradient(circle, #054575 0.5%, #0F102A 100%)",
    text: "white",
    border: "#356AFF",
    buttonHover: "#2A4FD7",
  };

  const plans = [
    {
      id: "basic",
      name: t("Basic Plan"),
      price: 25,
      credits: 50,
      url: "/pricing/basic",
      features: [
        t("Email Content Generator"),
        t("Email Writing Assistant"),
      ],
    },
    {
      id: "pro",
      name: t("Pro Plan"),
      price: 100,
      credits: 250,
      url: "/pricing/pro",
      features: [
        t("Email Content Generator"),
        t("Email Writing Assistant"),
        t("Email Plagiarism Remover"),
        t("Email Enhancement Tools"),
      ],
      isPopular: true,
    },
    {
      id: "enterprise",
      name: t("Enterprise Plan"),
      price: 50,
      credits: 100,
      url: "/pricing/enterprise",
      features: [
        t("Email Content Generator"),
        t("Email Writing Assistant"),
        t("Email Plagiarism Remover"),
        t("Email Enhancement Tools"),
        t("AI-Powered Email Automation"),
        t("Priority Customer Support"),
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-24" style={{ background: colors.background }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-extrabold" style={{ color: colors.secondary }}>{t("Email AI")}</h1>
        <h2 className="text-3xl font-semibold text-white">{t("Ace of Grace, Email’s Showcase")}</h2>
        <p className="text-lg text-gray-300 mt-4 max-w-3xl mx-auto">
          {t("Enhance your email experience with AI-powered content generation, plagiarism removal, and writing assistance.")}
        </p>
      </motion.div>

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative border rounded-xl p-8 shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-2 ${
              plan.isPopular ? "ring-2 ring-[#7A9908]" : ""
            }`}
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              borderColor: colors.border,
            }}
          >
            {plan.isPopular && (
              <div className="absolute top-0 right-0 bg-[#7A9908] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                {t("Most Popular")}
              </div>
            )}

            <h3 className="text-2xl font-semibold text-[#062827] mb-3">{plan.name}</h3>
            <div className="flex items-baseline mb-3">
              <span className="text-4xl font-bold" style={{ color: colors.secondary }}>${plan.price}</span>
              <span className="text-gray-600 ml-2">{t("/month")}</span>
            </div>

            <p className="text-lg font-medium text-gray-700 mb-6">{t("Credits")}: {plan.credits}</p>

            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center text-[#062827]">
                  <FiCheck className="mr-2 flex-shrink-0" style={{ color: colors.secondary }} />
                  {feature}
                </li>
              ))}
            </ul>

            <button
              className="w-full text-lg px-6 py-3 rounded-lg font-bold hover:scale-105 transition-all"
              style={{ background: colors.primary, color: colors.text }}
              onClick={() => window.location.href = plan.url}
            >
              {t("Proceed")}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
