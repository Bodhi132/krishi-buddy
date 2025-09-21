"use client";
import React, { useState,useRef } from "react";
import {
  ChevronLeft,
  Info,
  Home,
  User,
  Search,
  Settings,
  Upload,
  MapPin,
  Leaf,
  Droplets,
  TrendingUp,
  Award,
  Zap,
  Activity,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SoilParameter {
  parameter: string;
  value: string;
  rating: string;
  idealRange: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SoilHealthModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Actual Upload Handler
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      console.log("Mock uploading file:", file.name);

      setIsLoading(true);
      setUploadProgress(0);

      // Simulated progressive upload (mock)
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
              setIsLoading(false);
              onClose();
            }, 500);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 150);
    }
  };

  // Trigger the hidden input
  const triggerFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Keep location mock upload as before
  const handleLocationUpload = () => {
    setIsLoading(true);
    setUploadProgress(0);

    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setIsLoading(false);
            onClose();
          }, 500);
          return 100;
        }
        return prev + Math.random() * 12;
      });
    }, 180);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 100 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="w-11/12 max-w-sm bg-[#FAFAF9] rounded-3xl p-8 flex flex-col items-center shadow-2xl border border-[#EBEBE6] relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <pattern
                id="soil-pattern"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="10" cy="10" r="2" fill="#465A54" />
              </pattern>
              <rect width="100" height="100" fill="url(#soil-pattern)" />
            </svg>
          </div>

          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center py-8 relative z-10"
            >
              {/* Loader */}
              <div className="relative mb-8">
                <motion.div
                  className="w-24 h-24 border-4 border-[#EBEBE6] rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute top-2 left-2 w-20 h-20 border-4 border-[#465A54]/30 border-t-[#465A54] rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute top-4 left-4 w-16 h-16 bg-gradient-to-br from-[#465A54] to-[#5a6b5f] rounded-full flex items-center justify-center"
                  animate={{
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(70, 90, 84, 0.4)",
                      "0 0 0 20px rgba(70, 90, 84, 0)",
                      "0 0 0 0 rgba(70, 90, 84, 0)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <motion.div
                    animate={{ rotate: [0, 180, 360] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Leaf className="w-8 h-8 text-[#FAFAF9]" />
                  </motion.div>
                </motion.div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[#EBEBE6] rounded-full h-2 mb-4 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#465A54] to-emerald-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Dynamic Text */}
              <motion.div className="text-center">
                <motion.h3
                  className="text-xl font-bold text-[#465A54] mb-2"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {uploadProgress < 30
                    ? "Analyzing Soil Sample..."
                    : uploadProgress < 60
                      ? "Processing Nutrients..."
                      : uploadProgress < 90
                        ? "Generating Recommendations..."
                        : "Almost Ready!"}
                </motion.h3>
                <motion.p
                  className="text-sm text-gray-600 mb-4"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {Math.round(uploadProgress)}% Complete
                </motion.p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full relative z-10"
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    damping: 20,
                    stiffness: 300,
                    delay: 0.2,
                  }}
                  className="w-20 h-20 bg-gradient-to-br from-[#465A54] to-[#5a6b5f] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                >
                  <Leaf className="w-10 h-10 text-[#FAFAF9]" />
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl font-bold text-[#465A54] mb-3"
                >
                  Soil Health Analysis
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-gray-600"
                >
                  Get personalized recommendations for optimal soil health
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {/* Hidden input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUpload}
                />

                {/* Upload button triggers input click */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={triggerFilePicker}
                  className="w-full bg-[#465A54] text-[#FAFAF9] py-4 rounded-2xl font-semibold flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    animate={{ x: [-100, 300] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                  />
                  <Upload className="w-5 h-5" />
                  <span>Upload Soil Health Report</span>
                </motion.button>

                <div className="flex items-center w-full my-8">
                  <motion.div
                    className="flex-1 h-px bg-[#EBEBE6]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.7 }}
                  />
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className="px-4 text-gray-500 text-sm font-medium bg-[#FAFAF9]"
                  >
                    OR
                  </motion.span>
                  <motion.div
                    className="flex-1 h-px bg-[#EBEBE6]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.7 }}
                  />
                </div>

                <motion.button
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  onClick={handleLocationUpload}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-4 rounded-2xl font-semibold flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: [-100, 300] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 4,
                    }}
                  />
                  <MapPin className="w-5 h-5" />
                  <span>Use Current Location</span>
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const SoilCareRecommendation: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const soilParameters: SoilParameter[] = [
    { parameter: "Organic Carbon (%)", value: "0.5", rating: "Low", idealRange: "> 0.75" },
    { parameter: "Nitrogen (kg/ha)", value: "280", rating: "Medium", idealRange: "280 - 560" },
    { parameter: "Phosphorus (kg/ha)", value: "8", rating: "Medium", idealRange: "20 - 40" },
    { parameter: "Potassium (kg/ha)", value: "108", rating: "Medium", idealRange: "110 - 280" },
    { parameter: "pH", value: "6.1", rating: "Medium", idealRange: "6.0 - 7.5" },
    { parameter: "Zinc (ppm)", value: "0.6", rating: "Deficient", idealRange: "> 1.0" },
    { parameter: "Boron (ppm)", value: "0.3", rating: "Deficient", idealRange: "> 0.5" },
  ];

  const getRatingColor = (rating: string) => {
    switch (rating.toLowerCase()) {
      case "low":
      case "deficient":
        return "text-red-600 bg-red-50 border-red-200";
      case "medium":
        return "text-amber-600 bg-amber-50 border-amber-200";
      case "high":
        return "text-emerald-600 bg-emerald-50 border-emerald-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <>
      {/* Modal */}
      <SoilHealthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Show main content only after modal closes */}
      <AnimatePresence>
        {!isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen bg-[#FAFAF9] max-w-sm mx-auto relative overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-3">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <pattern id="bg-pattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                  <circle cx="5" cy="5" r="1" fill="#465A54" />
                </pattern>
                <rect width="100" height="100" fill="url(#bg-pattern)" />
              </svg>
            </div>

            {/* Status Bar */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-[#465A54] text-[#FAFAF9] px-4 py-2 flex justify-between items-center text-sm relative z-10"
            >
              <span className="font-medium">9:30</span>
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`w-1 h-1 rounded-full ${i < 3 ? 'bg-[#FAFAF9]' : 'bg-[#EBEBE6]'}`}
                      animate={{ scale: i < 3 ? [1, 1.2, 1] : 1 }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </div>
                <span>📶</span>
                <span>🔋</span>
              </div>
            </motion.div>

            {/* Header */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-r from-[#465A54] to-[#5a6b5f] text-[#FAFAF9] px-6 py-5 flex items-center justify-between shadow-lg relative z-10"
            >
              <div className="flex items-center space-x-3">
                <motion.button
                  whileHover={{ scale: 1.1, x: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-1 rounded-full hover:bg-white/10 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>
                <div>
                  <h1 className="text-lg font-bold">Soil Care</h1>
                  <p className="text-xs opacity-80">Recommendation</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              >
                <div className="grid grid-cols-3 gap-0.5">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="w-1 h-1 bg-[#FAFAF9] rounded-full" />
                  ))}
                </div>
              </motion.button>
            </motion.div>

            <div className="p-6 space-y-6 relative z-10">
              {/* Soil Condition Card */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-3xl p-6 shadow-lg border border-[#EBEBE6] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#465A54]/5 to-transparent rounded-full -translate-y-16 translate-x-16" />

                <div className="flex items-start justify-between relative z-10">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#465A54] to-[#5a6b5f] rounded-2xl flex items-center justify-center">
                        <Activity className="w-6 h-6 text-[#FAFAF9]" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-[#465A54]">Soil Condition</h2>
                        <p className="text-sm text-gray-500">Current Status</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                          <Droplets className="w-3 h-3 text-white" />
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-gray-700">pH: Slightly Acidic</span>
                          <p className="text-xs text-gray-500">6.1 level</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center">
                          <Leaf className="w-3 h-3 text-white" />
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-gray-700">Organic Carbon</span>
                          <p className="text-xs text-gray-500">Low (0.5%)</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#465A54] text-[#FAFAF9] px-4 py-3 rounded-2xl text-xs font-semibold flex items-center space-x-2 shadow-md hover:shadow-lg transition-all"
                  >
                    <span>Quick Tips</span>
                    <div className="w-6 h-6 bg-[#FAFAF9] rounded-full flex items-center justify-center">
                      <Info className="w-3 h-3 text-[#465A54]" />
                    </div>
                  </motion.button>
                </div>
              </motion.div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-3xl p-6 shadow-lg border border-[#EBEBE6] relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-100 rounded-full -translate-y-10 translate-x-10" />
                  <div className="relative z-10">
                    <div className="w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center mb-3">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-[#465A54] mb-1">Suggested Crops</h3>
                    <div className="space-y-1">
                      {["Rice", "Maize", "Pulses"].map((crop, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          className="inline-block bg-emerald-50 text-emerald-700 px-2 py-1 rounded-lg text-xs font-medium mr-1 mb-1"
                        >
                          {crop}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-3xl p-6 shadow-lg border border-[#EBEBE6] relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-blue-100 rounded-full -translate-y-10 translate-x-10" />
                  <div className="relative z-10">
                    <div className="w-10 h-10 bg-blue-500 rounded-2xl flex items-center justify-center mb-3">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-[#465A54] mb-2">Expected Benefits</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">Higher Yield</span>
                        <span className="font-bold text-green-600">+25%</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">Cost Reduction</span>
                        <span className="font-bold text-blue-600">-15%</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Detailed Soil Report */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-r from-[#465A54] to-[#5a6b5f] text-[#FAFAF9] rounded-3xl p-6 shadow-xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
                <div className="relative z-10 text-center">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <Leaf className="w-8 h-8" />
                  </motion.div>
                  <h2 className="text-2xl font-bold mb-2">Detailed Analysis</h2>
                  <p className="text-sm opacity-80">Comprehensive soil parameters</p>
                </div>
              </motion.div>

              {/* Parameters Table */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-3xl shadow-lg overflow-hidden border border-[#EBEBE6]"
              >
                <div className="bg-gradient-to-r from-[#EBEBE6] to-[#FAFAF9] px-6 py-4">
                  <div className="grid grid-cols-4 gap-2 text-xs font-bold text-[#465A54] uppercase tracking-wide">
                    <span>Parameter</span>
                    <span className="text-center">Value</span>
                    <span className="text-center">Rating</span>
                    <span className="text-center">Ideal</span>
                  </div>
                </div>
                <div className="divide-y divide-[#EBEBE6]">
                  {soilParameters.map((param, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.7 + index * 0.05 }}
                      className="px-6 py-4 hover:bg-[#FAFAF9] transition-all duration-200"
                    >
                      <div className="grid grid-cols-4 gap-2 text-sm items-center">
                        <span className="text-[#465A54] font-semibold text-xs">{param.parameter}</span>
                        <span className="text-center font-bold text-gray-800">{param.value}</span>
                        <div className="flex justify-center">
                          <motion.span
                            whileHover={{ scale: 1.05 }}
                            className={`px-3 py-1 rounded-full text-xs font-bold border ${getRatingColor(param.rating)}`}
                          >
                            {param.rating}
                          </motion.span>
                        </div>
                        <span className="text-center text-gray-600 text-xs">{param.idealRange}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Nutrient Recommendations */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="bg-white rounded-3xl p-6 shadow-lg border border-[#EBEBE6] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-100 to-transparent rounded-full -translate-y-12 translate-x-12" />
                <div className="relative z-10">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-[#465A54]">Nutrient Plan</h2>
                      <p className="text-sm text-gray-500">Recommended applications</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        nutrient: "Nitrogen (N)",
                        recommendation: "Apply 50~150 kg/ha using split doses of urea.",
                        icon: "💚",
                        color: "from-green-400 to-emerald-500"
                      },
                      {
                        nutrient: "Phosphorus (P)",
                        recommendation: "Apply 25~40 kg/ha as SSP/DAP. Remove defect due to high aluminum content.",
                        icon: "🔵",
                        color: "from-blue-400 to-cyan-500"
                      },
                      {
                        nutrient: "Potassium (K)",
                        recommendation: "Apply 40~50 kg/ha as MoP.",
                        icon: "🟡",
                        color: "from-yellow-400 to-orange-500"
                      },
                      {
                        nutrient: "Sulphur",
                        recommendation: "20~30 kg/ha basal application.",
                        icon: "🟠",
                        color: "from-orange-400 to-red-500"
                      },
                      {
                        nutrient: "Zinc",
                        recommendation: "25 kg/ha Zinc Sulphate (Zn 25~30 kg/ha).",
                        icon: "⚪",
                        color: "from-gray-400 to-slate-500"
                      },
                      {
                        nutrient: "Organic Carbon",
                        recommendation: "15~30 tons/ha or green manuring.",
                        icon: "🟤",
                        color: "from-amber-600 to-yellow-700"
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.9 + index * 0.1 }}
                        className="bg-gradient-to-r from-[#FAFAF9] to-white p-4 rounded-2xl border-l-4 border-[#465A54] hover:shadow-md transition-all duration-200 group"
                      >
                        <div className="flex items-start space-x-3">
                          <motion.div
                            className={`w-8 h-8 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center text-white font-bold text-xs`}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            {item.icon}
                          </motion.div>
                          <div className="flex-1">
                            <h4 className="font-bold text-[#465A54] mb-1 group-hover:text-[#5a6b5f] transition-colors">
                              {item.nutrient}
                            </h4>
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {item.recommendation}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Benefits */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="bg-white rounded-3xl p-6 shadow-lg border border-[#EBEBE6] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-green-100 to-transparent rounded-full -translate-y-14 translate-x-14" />
                <div className="relative z-10">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-[#465A54]">Expected Benefits</h2>
                      <p className="text-sm text-gray-500">Projected improvements</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {[
                      {
                        title: "Current Yield",
                        value: "25 tons/ha",
                        icon: "📊",
                        trend: "baseline"
                      },
                      {
                        title: "Projected Yield",
                        value: "3.5-4.0 tons/ha",
                        icon: "📈",
                        trend: "increase"
                      },
                      {
                        title: "Nutrient Efficiency",
                        value: "N,P,K improved",
                        icon: "⚡",
                        trend: "optimized"
                      },
                      {
                        title: "Fertilizer Cost",
                        value: "₹1500-1800",
                        icon: "💰",
                        trend: "balanced"
                      },
                      {
                        title: "Long-term Impact",
                        value: "Enhanced soil fertility",
                        icon: "🌱",
                        trend: "sustainable"
                      }
                    ].map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1.1 + index * 0.1 }}
                        className="flex items-center space-x-4 p-3 rounded-2xl bg-gradient-to-r from-[#FAFAF9] to-white hover:from-green-50 hover:to-emerald-50 transition-all duration-200 group"
                      >
                        <motion.div
                          className="text-2xl"
                          whileHover={{ scale: 1.2, rotate: 10 }}
                        >
                          {benefit.icon}
                        </motion.div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-[#465A54] group-hover:text-green-700 transition-colors">
                              {benefit.title}
                            </span>
                            <span className={`text-sm font-bold px-2 py-1 rounded-full ${benefit.trend === 'increase' ? 'bg-green-100 text-green-700' :
                              benefit.trend === 'optimized' ? 'bg-blue-100 text-blue-700' :
                                benefit.trend === 'balanced' ? 'bg-yellow-100 text-yellow-700' :
                                  benefit.trend === 'sustainable' ? 'bg-purple-100 text-purple-700' :
                                    'bg-gray-100 text-gray-700'
                              }`}>
                              {benefit.value}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom Navigation */}
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, type: "spring", damping: 25, stiffness: 300 }}
              className="bg-gradient-to-r from-[#465A54] to-[#5a6b5f] text-[#FAFAF9] p-6 shadow-2xl relative z-10"
            >
              <div className="flex justify-between items-center max-w-xs mx-auto">
                {[
                  { icon: Home, active: true },
                  { icon: User, active: false },
                  { icon: Search, active: false },
                  { icon: Settings, active: false }
                ].map((item, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.15, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-4 rounded-2xl transition-all duration-300 ${item.active
                      ? 'bg-white/20 backdrop-blur-sm shadow-lg'
                      : 'hover:bg-white/10'
                      }`}
                  >
                    <item.icon className="w-6 h-6" />
                    {item.active && (
                      <motion.div
                        className="w-1 h-1 bg-[#FAFAF9] rounded-full mx-auto mt-1"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.5 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SoilCareRecommendation;