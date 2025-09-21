"use client";
import { useState } from "react";
import { 
  ChevronDown, 
  Search, 
  Leaf, 
  Calendar, 
  Droplets,
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle,
  Info,
  Zap,
  Beaker,
  Target,
  Activity
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type GrowthStage =
  | "Seeding Stage"
  | "Vegetative Stage"
  | "Flowering Stage"
  | "Harvest Stage"
  | "";

interface FertilizerSchedule {
  id: number;
  title: string;
  details: string;
  type: "primary" | "secondary" | "micronutrient" | "organic" | "irrigation" | "warning";
  icon: string;
  timing: string;
  dosage: string;
  priority: "high" | "medium" | "low";
}

interface CropSuggestion {
  name: string;
  category: string;
  popularity: number;
}

const AdvancedLoader = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center py-8"
    >
      {/* Main loader animation */}
      <div className="relative mb-6">
        <motion.div 
          className="w-20 h-20 border-4 border-[#EBEBE6] rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute top-1 left-1 w-18 h-18 border-4 border-[#465A54]/40 border-t-[#465A54] rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute top-3 left-3 w-14 h-14 bg-gradient-to-br from-[#465A54] to-emerald-600 rounded-full flex items-center justify-center"
          animate={{ 
            scale: [1, 1.1, 1],
            boxShadow: [
              "0 0 0 0 rgba(70, 90, 84, 0.4)",
              "0 0 0 15px rgba(70, 90, 84, 0)",
              "0 0 0 0 rgba(70, 90, 84, 0)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            animate={{ rotate: [0, 180, 360] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Beaker className="w-7 h-7 text-[#FAFAF9]" />
          </motion.div>
        </motion.div>
        
        {/* Floating molecules */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-emerald-400 rounded-full"
            style={{
              top: "50%",
              left: "50%",
              transformOrigin: `${25 + i * 3}px center`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [0.3, 1, 0.3],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2.5 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Status text */}
      <motion.div className="text-center">
        <motion.h3 
          className="text-lg font-bold text-[#465A54] mb-2"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Analyzing Crop Requirements...
        </motion.h3>
        <motion.p 
          className="text-sm text-gray-600 mb-4"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Generating personalized fertilizer schedule
        </motion.p>
        
        {/* Progress indicators */}
        <div className="flex space-x-2 justify-center">
          {["Soil Analysis", "Nutrient Mapping", "Schedule Creation"].map((step, i) => (
            <motion.div
              key={i}
              className="flex items-center space-x-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.5, duration: 0.5 }}
            >
              <motion.div
                className="w-2 h-2 rounded-full"
                animate={{ 
                  backgroundColor: ["#EBEBE6", "#465A54", "#EBEBE6"] 
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  delay: i * 0.5 
                }}
              />
              <span className="text-xs text-gray-500">{step}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function FertilizerPage() {
  const [crop, setCrop] = useState("");
  const [stage, setStage] = useState<GrowthStage>("");
  const [schedule, setSchedule] = useState<FertilizerSchedule[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const cropSuggestions: CropSuggestion[] = [
    { name: "Rice", category: "Cereal", popularity: 95 },
    { name: "Wheat", category: "Cereal", popularity: 90 },
    { name: "Maize", category: "Cereal", popularity: 85 },
    { name: "Cotton", category: "Cash Crop", popularity: 80 },
    { name: "Sugarcane", category: "Cash Crop", popularity: 75 },
    { name: "Soybean", category: "Pulse", popularity: 70 },
    { name: "Potato", category: "Tuber", popularity: 65 },
    { name: "Tomato", category: "Vegetable", popularity: 60 },
  ];

  const mockSchedules: Record<Exclude<GrowthStage, "">, FertilizerSchedule[]> = {
    "Seeding Stage": [
      {
        id: 1,
        title: "Base Fertilizer Application",
        details: "Apply NPK (10:26:26) at 100kg per acre as basal dose before sowing for strong root development.",
        type: "primary",
        icon: "🌱",
        timing: "Before sowing",
        dosage: "100kg/acre",
        priority: "high"
      },
      {
        id: 2,
        title: "Organic Matter Integration",
        details: "Incorporate 3-4 tons of well-decomposed FYM per acre to improve soil structure and water retention.",
        type: "organic",
        icon: "🌿",
        timing: "15 days before sowing",
        dosage: "3-4 tons/acre",
        priority: "high"
      },
      {
        id: 3,
        title: "Zinc Sulphate Application",
        details: "Apply 25kg ZnSO4 per acre to prevent zinc deficiency and promote healthy seedling growth.",
        type: "micronutrient",
        icon: "⚡",
        timing: "With basal fertilizer",
        dosage: "25kg/acre",
        priority: "medium"
      },
      {
        id: 4,
        title: "Seed Treatment",
        details: "Treat seeds with Azotobacter and PSB biofertilizers to enhance nutrient uptake efficiency.",
        type: "secondary",
        icon: "🧪",
        timing: "Before sowing",
        dosage: "10g/kg seed",
        priority: "medium"
      },
      {
        id: 5,
        title: "Initial Irrigation",
        details: "Maintain 2-3cm water depth for first 15 days to ensure uniform germination and establishment.",
        type: "irrigation",
        icon: "💧",
        timing: "After sowing",
        dosage: "2-3cm depth",
        priority: "high"
      },
      {
        id: 6,
        title: "Soil pH Management",
        details: "Monitor soil pH (6.0-7.0). Apply lime if pH <6.0 or gypsum if pH >8.0 for optimal nutrient availability.",
        type: "warning",
        icon: "⚠️",
        timing: "Pre-sowing",
        dosage: "As per soil test",
        priority: "medium"
      }
    ],
    "Vegetative Stage": [
      {
        id: 1,
        title: "First Nitrogen Top Dressing",
        details: "Apply 40kg Urea per acre at 20-25 DAS to support active tillering and leaf development.",
        type: "primary",
        icon: "🌾",
        timing: "20-25 DAS",
        dosage: "40kg/acre",
        priority: "high"
      },
      {
        id: 2,
        title: "Potassium Boost",
        details: "Apply 30kg Muriate of Potash (MOP) per acre to strengthen stems and improve disease resistance.",
        type: "primary",
        icon: "💪",
        timing: "25-30 DAS",
        dosage: "30kg/acre",
        priority: "high"
      },
      {
        id: 3,
        title: "Foliar Nutrition Spray",
        details: "Spray 2% Urea + 1% KCl solution during evening hours for rapid nutrient absorption.",
        type: "secondary",
        icon: "🌿",
        timing: "30-35 DAS",
        dosage: "500L/acre",
        priority: "medium"
      },
      {
        id: 4,
        title: "Micronutrient Cocktail",
        details: "Apply chelated micronutrient mixture (Fe, Mn, B, Cu) to prevent hidden hunger and boost growth.",
        type: "micronutrient",
        icon: "🧬",
        timing: "35-40 DAS",
        dosage: "2.5kg/acre",
        priority: "medium"
      },
      {
        id: 5,
        title: "Water Management",
        details: "Maintain saturated soil conditions. Avoid continuous flooding to prevent root rot and nutrient loss.",
        type: "irrigation",
        icon: "💧",
        timing: "Throughout stage",
        dosage: "Saturated soil",
        priority: "high"
      },
      {
        id: 6,
        title: "Split Nitrogen Application",
        details: "Apply remaining 30kg Urea per acre at maximum tillering stage for sustained growth.",
        type: "primary",
        icon: "🌱",
        timing: "45-50 DAS",
        dosage: "30kg/acre",
        priority: "high"
      }
    ],
    "Flowering Stage": [
      {
        id: 1,
        title: "Panicle Initiation Nutrition",
        details: "Apply 25kg Urea per acre at panicle initiation to support reproductive growth and grain formation.",
        type: "primary",
        icon: "🌸",
        timing: "Panicle initiation",
        dosage: "25kg/acre",
        priority: "high"
      },
      {
        id: 2,
        title: "Boron & Zinc Foliar Spray",
        details: "Spray 0.5% Boric acid + 0.5% ZnSO4 solution to improve pollen viability and grain setting.",
        type: "micronutrient",
        icon: "🎯",
        timing: "50% flowering",
        dosage: "500L/acre",
        priority: "high"
      },
      {
        id: 3,
        title: "Potassium Enhancement",
        details: "Apply 20kg SOP (Sulphate of Potash) per acre to improve grain quality and reduce lodging risk.",
        type: "primary",
        icon: "⭐",
        timing: "Early flowering",
        dosage: "20kg/acre",
        priority: "medium"
      },
      {
        id: 4,
        title: "Calcium Supplementation",
        details: "Foliar spray of 1% Calcium chloride to strengthen cell walls and prevent grain chalkiness.",
        type: "secondary",
        icon: "🔬",
        timing: "Grain filling",
        dosage: "1% solution",
        priority: "medium"
      },
      {
        id: 5,
        title: "Critical Water Management",
        details: "Maintain 5cm water depth continuously during flowering. Water stress severely affects grain yield.",
        type: "irrigation",
        icon: "🌊",
        timing: "Flowering period",
        dosage: "5cm depth",
        priority: "high"
      },
      {
        id: 6,
        title: "Silicon Application",
        details: "Apply soluble silica (200g/acre) to strengthen plant structure and improve disease resistance.",
        type: "micronutrient",
        icon: "🛡️",
        timing: "Pre-flowering",
        dosage: "200g/acre",
        priority: "low"
      }
    ],
    "Harvest Stage": [
      {
        id: 1,
        title: "Fertilizer Application Stop",
        details: "Completely stop all nitrogen fertilizers 15 days before harvest to ensure proper grain maturity.",
        type: "warning",
        icon: "🛑",
        timing: "15 days before harvest",
        dosage: "Zero application",
        priority: "high"
      },
      {
        id: 2,
        title: "Field Drainage",
        details: "Drain the field 10-15 days before harvest to facilitate easy harvesting and reduce grain moisture.",
        type: "irrigation",
        icon: "🚰",
        timing: "10-15 days before harvest",
        dosage: "Complete drainage",
        priority: "high"
      },
      {
        id: 3,
        title: "Grain Quality Enhancement",
        details: "Optional foliar spray of 2% DAP solution to improve grain protein content and market value.",
        type: "secondary",
        icon: "🌟",
        timing: "Milk stage",
        dosage: "2% solution",
        priority: "low"
      },
      {
        id: 4,
        title: "Stubble Management Prep",
        details: "Plan for residue incorporation with decomposer culture (5L/acre) for next season soil health.",
        type: "organic",
        icon: "♻️",
        timing: "Post harvest",
        dosage: "5L/acre",
        priority: "medium"
      },
      {
        id: 5,
        title: "Final Pest & Disease Check",
        details: "Monitor for storage pests and apply eco-friendly treatments if needed before harvesting.",
        type: "warning",
        icon: "🔍",
        timing: "Pre-harvest",
        dosage: "As required",
        priority: "medium"
      },
      {
        id: 6,
        title: "Harvest Timing Optimization",
        details: "Harvest when grain moisture is 20-25% for maximum yield and quality. Use moisture meter.",
        type: "primary",
        icon: "⏰",
        timing: "At maturity",
        dosage: "20-25% moisture",
        priority: "high"
      }
    ],
  };

  const handleGetRecommendations = () => {
    setLoading(true);
    setSchedule([]);

    setTimeout(() => {
      if (stage) {
        setSchedule(mockSchedules[stage as Exclude<GrowthStage, "">]);
      }
      setLoading(false);
    }, 2500);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-700 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "low": return "bg-green-100 text-green-700 border-green-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "primary": return <Target className="w-4 h-4" />;
      case "secondary": return <Activity className="w-4 h-4" />;
      case "micronutrient": return <Zap className="w-4 h-4" />;
      case "organic": return <Leaf className="w-4 h-4" />;
      case "irrigation": return <Droplets className="w-4 h-4" />;
      case "warning": return <AlertTriangle className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const filteredSuggestions = cropSuggestions.filter(suggestion =>
    suggestion.name.toLowerCase().includes(crop.toLowerCase()) && crop.length > 0
  );

  return (
    <div className="min-h-screen bg-[#FAFAF9] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <pattern id="fertilizer-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1.5" fill="#465A54"/>
            <circle cx="5" cy="15" r="1" fill="#465A54"/>
            <circle cx="15" cy="5" r="1" fill="#465A54"/>
          </pattern>
          <rect width="100" height="100" fill="url(#fertilizer-pattern)"/>
        </svg>
      </div>

      <div className="relative z-10 max-w-sm mx-auto p-6">
        {/* Header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-[#465A54] to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <Beaker className="w-8 h-8 text-[#FAFAF9]" />
          </div>
          <h1 className="text-2xl font-bold text-[#465A54] mb-2">Fertilizer Guidance</h1>
          <p className="text-gray-600">Smart nutrition planning for optimal yield</p>
        </motion.div>

        {/* Input Section */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-6 shadow-lg border border-[#EBEBE6] mb-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center">
              <Info className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-[#465A54]">Crop Details</h2>
              <p className="text-sm text-gray-500">Enter your crop information</p>
            </div>
          </div>

          {/* Crop Name */}
          <div className="mb-4 relative">
            <label className="block text-sm font-semibold text-[#465A54] mb-2">Crop Name</label>
            <div className="relative">
              <div className="flex items-center space-x-3 bg-[#FAFAF9] rounded-2xl p-4 border-2 border-[#EBEBE6] focus-within:border-[#465A54] transition-colors">
                <Leaf className="w-5 h-5 text-[#465A54]" />
                <input
                  type="text"
                  placeholder="Enter crop name (e.g., Rice, Wheat)"
                  value={crop}
                  onChange={(e) => {
                    setCrop(e.target.value);
                    setShowSuggestions(e.target.value.length > 0);
                  }}
                  onFocus={() => setShowSuggestions(crop.length > 0)}
                  className="flex-1 bg-transparent font-semibold text-[#465A54] placeholder-gray-500 focus:outline-none"
                />
              </div>

              {/* Crop Suggestions */}
              <AnimatePresence>
                {showSuggestions && filteredSuggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 bg-white rounded-2xl shadow-lg border border-[#EBEBE6] mt-2 max-h-48 overflow-y-auto z-20"
                  >
                    {filteredSuggestions.map((suggestion, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ backgroundColor: "#FAFAF9" }}
                        onClick={() => {
                          setCrop(suggestion.name);
                          setShowSuggestions(false);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-[#FAFAF9] transition-colors border-b border-[#EBEBE6] last:border-b-0"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-semibold text-[#465A54]">{suggestion.name}</span>
                            <span className="text-sm text-gray-500 ml-2">({suggestion.category})</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            <span className="text-xs text-gray-500">{suggestion.popularity}%</span>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Growth Stage */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#465A54] mb-2">Growth Stage</label>
            <div className="relative">
              <div className="flex items-center space-x-3 bg-[#FAFAF9] rounded-2xl p-4 border-2 border-[#EBEBE6] focus-within:border-[#465A54] transition-colors">
                <Calendar className="w-5 h-5 text-[#465A54]" />
                <select
                  value={stage}
                  onChange={(e) => setStage(e.target.value as GrowthStage)}
                  className="flex-1 bg-transparent font-semibold text-[#465A54] focus:outline-none"
                >
                  <option value="">Select Growth Stage</option>
                  <option value="Seeding Stage">🌱 Seeding Stage</option>
                  <option value="Vegetative Stage">🌿 Vegetative Stage</option>
                  <option value="Flowering Stage">🌸 Flowering Stage</option>
                  <option value="Harvest Stage">🌾 Harvest Stage</option>
                </select>
                <ChevronDown className="w-5 h-5 text-gray-500" />
              </div>
            </div>
          </div>

          {/* Get Recommendations Button */}
          <motion.button
            onClick={handleGetRecommendations}
            disabled={!crop || !stage || loading}
            whileHover={!(!crop || !stage || loading) ? { scale: 1.02, y: -2 } : {}}
            whileTap={!(!crop || !stage || loading) ? { scale: 0.98 } : {}}
            className={`w-full py-4 rounded-2xl font-semibold flex items-center justify-center space-x-3 transition-all duration-300 ${
              !crop || !stage || loading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-[#465A54] to-emerald-600 text-white shadow-lg hover:shadow-xl"
            }`}
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Generating Recommendations...</span>
              </div>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span>Get Smart Recommendations</span>
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Schedule Section */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl p-6 shadow-lg border border-[#EBEBE6]"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-[#465A54]">Fertilizer Schedule</h2>
              <p className="text-sm text-gray-500">
                {stage ? `Recommendations for ${stage}` : "Select crop and stage above"}
              </p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {loading ? (
              <AdvancedLoader />
            ) : schedule.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-[#EBEBE6] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 mb-2">No recommendations yet</p>
                <p className="text-sm text-gray-400">Fill in the details above to get started</p>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                {schedule.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-r from-[#FAFAF9] to-white rounded-2xl p-4 border border-[#EBEBE6] hover:shadow-md transition-all duration-200 relative overflow-hidden group"
                  >
                    {/* Priority indicator */}
                    <div className={`absolute top-0 right-0 px-2 py-1 rounded-bl-lg text-xs font-bold ${getPriorityColor(item.priority)}`}>
                      {item.priority.toUpperCase()}
                    </div>

                    <div className="flex items-start space-x-4 pt-2">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#465A54] to-emerald-600 rounded-2xl flex items-center justify-center text-white text-lg">
                          {item.icon}
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-bold text-[#465A54] group-hover:text-emerald-600 transition-colors">
                            {item.title}
                          </h3>
                          <div className="flex items-center space-x-1 text-[#465A54]">
                            {getTypeIcon(item.type)}
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 leading-relaxed mb-3">
                          {item.details}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="bg-blue-50 rounded-lg p-2">
                            <div className="flex items-center space-x-1 mb-1">
                              <Clock className="w-3 h-3 text-blue-600" />
                              <span className="font-semibold text-blue-700">Timing</span>
                            </div>
                            <span className="text-blue-600">{item.timing}</span>
                          </div>
                          <div className="bg-green-50 rounded-lg p-2">
                            <div className="flex items-center space-x-1 mb-1">
                              <Target className="w-3 h-3 text-green-600" />
                              <span className="font-semibold text-green-700">Dosage</span>
                            </div>
                            <span className="text-green-600">{item.dosage}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Hover effect overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#465A54]/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                      initial={false}
                    />
                  </motion.div>
                ))}

                {/* Summary Card */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: schedule.length * 0.1 + 0.3 }}
                  className="bg-gradient-to-r from-[#465A54] to-emerald-600 rounded-2xl p-6 text-white mt-6"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <CheckCircle className="w-6 h-6" />
                    <h3 className="font-bold text-lg">Schedule Summary</h3>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="text-2xl font-bold">
                        {schedule.filter(item => item.priority === 'high').length}
                      </div>
                      <div className="text-sm opacity-80">High Priority</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="text-2xl font-bold">
                        {schedule.filter(item => item.type === 'primary').length}
                      </div>
                      <div className="text-sm opacity-80">Primary Tasks</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="text-2xl font-bold">
                        {schedule.length}
                      </div>
                      <div className="text-sm opacity-80">Total Actions</div>
                    </div>
                  </div>

                  <motion.div 
                    className="mt-4 p-3 bg-white/10 rounded-lg"
                    animate={{ opacity: [1, 0.7, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="flex items-center space-x-2">
                      <Info className="w-4 h-4" />
                      <span className="text-sm font-medium">Pro Tip:</span>
                    </div>
                    <p className="text-sm opacity-90 mt-1">
                      Focus on high-priority tasks first. Monitor soil moisture and weather conditions before applying fertilizers.
                    </p>
                  </motion.div>
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: schedule.length * 0.1 + 0.5 }}
                  className="grid grid-cols-2 gap-3 mt-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold py-3 px-4 rounded-2xl transition-colors flex items-center justify-center space-x-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Set Reminders</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-green-50 hover:bg-green-100 text-green-700 font-semibold py-3 px-4 rounded-2xl transition-colors flex items-center justify-center space-x-2"
                  >
                    <TrendingUp className="w-4 h-4" />
                    <span>Track Progress</span>
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Additional Tips Section */}
        {schedule.length > 0 && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-3xl p-6 shadow-lg border border-[#EBEBE6] mt-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-[#465A54]">Important Guidelines</h3>
                <p className="text-sm text-gray-500">Best practices for optimal results</p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                {
                  icon: "🌡️",
                  title: "Weather Monitoring",
                  tip: "Avoid fertilizer application before heavy rain or during extreme temperatures"
                },
                {
                  icon: "🧪",
                  title: "Soil Testing",
                  tip: "Conduct soil tests every 6 months to adjust fertilizer recommendations"
                },
                {
                  icon: "⏰",
                  title: "Timing is Key",
                  tip: "Apply fertilizers during cooler parts of the day (early morning or evening)"
                },
                {
                  icon: "💧",
                  title: "Water Management",
                  tip: "Ensure proper irrigation after fertilizer application for better absorption"
                },
                {
                  icon: "📱",
                  title: "Record Keeping",
                  tip: "Maintain detailed records of applications for future reference and optimization"
                }
              ].map((guideline, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="flex items-start space-x-3 p-3 bg-[#FAFAF9] rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="text-xl">{guideline.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-[#465A54] text-sm">{guideline.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{guideline.tip}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}