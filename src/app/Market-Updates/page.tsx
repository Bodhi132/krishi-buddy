"use client";
import React, { useState, useEffect } from "react";
import { 
  Home, 
  User, 
  Search, 
  Heart, 
  ChevronLeft, 
  MoreVertical, 
  MapPin, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Star, 
  Filter, 
  Bell 
} from "lucide-react";

interface Commodity {
  id: number;
  name: string;
  price: number;
  unit: string;
  msp: number;
  change: string;
  image: string;
  trend: "up" | "down" | "neutral";
}

interface Market {
  id: number;
  name: string;
  priceRange: string;
  distance: string;
  pincode: string;
  rating: number;
  type: string;
}

// Mock Data
const commodityPrices: Commodity[] = [
  {
    id: 1,
    name: "Wheat",
    price: 2300,
    unit: "Quintal",
    msp: 2275,
    change: "+2.5%",
    image: "🌾",
    trend: "up",
  },
  {
    id: 2,
    name: "Rice",
    price: 3100,
    unit: "Quintal",
    msp: 2900,
    change: "-1.2%",
    image: "🌾",
    trend: "down",
  },
  {
    id: 3,
    name: "Maize",
    price: 1850,
    unit: "Quintal",
    msp: 1750,
    change: "+0.8%",
    image: "🌽",
    trend: "up",
  },
  {
    id: 4,
    name: "Potato",
    price: 1500,
    unit: "Quintal",
    msp: 1200,
    change: "-0.6%",
    image: "🥔",
    trend: "down",
  },
  {
    id: 5,
    name: "Onion",
    price: 2200,
    unit: "Quintal",
    msp: 2000,
    change: "+3.2%",
    image: "🧅",
    trend: "up",
  },
  {
    id: 6,
    name: "Tomato",
    price: 1800,
    unit: "Quintal",
    msp: 1600,
    change: "+1.5%",
    image: "🍅",
    trend: "up",
  },
];

const allMarkets: Market[] = [
  {
    id: 1,
    name: "Koley Market, Sealdah",
    priceRange: "₹2290 – ₹3300",
    distance: "5.7 km",
    pincode: "700014",
    rating: 4.2,
    type: "Wholesale",
  },
  {
    id: 2,
    name: "Baithakkhana Market",
    priceRange: "₹1200 – ₹3700",
    distance: "7.3 km",
    pincode: "700006",
    rating: 3.8,
    type: "Retail",
  },
  {
    id: 3,
    name: "Burra Bazar, Dharamtalla",
    priceRange: "₹2190 – ₹3900",
    distance: "2.3 km",
    pincode: "700073",
    rating: 4.5,
    type: "Wholesale",
  },
  {
    id: 4,
    name: "Howrah Wholesale Market",
    priceRange: "₹2200 – ₹3150",
    distance: "8.5 km",
    pincode: "711101",
    rating: 4.0,
    type: "Wholesale",
  },
  {
    id: 5,
    name: "New Market, Esplanade",
    priceRange: "₹1800 – ₹3500",
    distance: "3.2 km",
    pincode: "700001",
    rating: 4.1,
    type: "Retail",
  },
  {
    id: 6,
    name: "Shyambazar Sabzi Market",
    priceRange: "₹1500 – ₹3200",
    distance: "6.8 km",
    pincode: "700004",
    rating: 3.9,
    type: "Retail",
  },
  {
    id: 7,
    name: "Hatibagan Market",
    priceRange: "₹1700 – ₹3000",
    distance: "4.5 km",
    pincode: "700003",
    rating: 3.7,
    type: "Retail",
  },
  {
    id: 8,
    name: "Gariahat Market",
    priceRange: "₹2000 – ₹3400",
    distance: "9.2 km",
    pincode: "700029",
    rating: 4.3,
    type: "Retail",
  },
  {
    id: 9,
    name: "Lake Market",
    priceRange: "₹2100 – ₹3600",
    distance: "7.9 km",
    pincode: "700029",
    rating: 4.0,
    type: "Retail",
  },
  {
    id: 10,
    name: "Maniktala Market",
    priceRange: "₹1600 – ₹2900",
    distance: "5.4 km",
    pincode: "700054",
    rating: 3.6,
    type: "Retail",
  },
  {
    id: 11,
    name: "Mechua Bazar",
    priceRange: "₹2300 – ₹3800",
    distance: "1.8 km",
    pincode: "700073",
    rating: 4.4,
    type: "Wholesale",
  },
  {
    id: 12,
    name: "Jorasanko Market",
    priceRange: "₹1400 – ₹2800",
    distance: "3.7 km",
    pincode: "700007",
    rating: 3.5,
    type: "Retail",
  },
  {
    id: 13,
    name: "Belgachhia Wholesale Market",
    priceRange: "₹2400 – ₹3700",
    distance: "11.3 km",
    pincode: "700037",
    rating: 4.2,
    type: "Wholesale",
  },
  {
    id: 14,
    name: "Sovabazar Market",
    priceRange: "₹1900 – ₹3100",
    distance: "4.1 km",
    pincode: "700005",
    rating: 3.8,
    type: "Retail",
  },
  {
    id: 15,
    name: "Ultadanga Market",
    priceRange: "₹1700 – ₹3000",
    distance: "8.7 km",
    pincode: "700067",
    rating: 3.9,
    type: "Retail",
  },
  {
    id: 16,
    name: "Bagbazar Market",
    priceRange: "₹1800 – ₹3200",
    distance: "4.8 km",
    pincode: "700003",
    rating: 3.7,
    type: "Retail",
  },
  {
    id: 17,
    name: "Posta Market",
    priceRange: "₹2000 – ₹3500",
    distance: "2.9 km",
    pincode: "700007",
    rating: 4.0,
    type: "Wholesale",
  },
  {
    id: 18,
    name: "Entally Market",
    priceRange: "₹1600 – ₹2900",
    distance: "6.2 km",
    pincode: "700014",
    rating: 3.6,
    type: "Retail",
  },
  {
    id: 19,
    name: "Bara Bazar Central",
    priceRange: "₹2200 – ₹4000",
    distance: "2.1 km",
    pincode: "700007",
    rating: 4.6,
    type: "Wholesale",
  },
  {
    id: 20,
    name: "Park Street Market",
    priceRange: "₹2500 – ₹3900",
    distance: "5.3 km",
    pincode: "700016",
    rating: 4.1,
    type: "Retail",
  },
];

const MarketUpdates: React.FC = () => {
  const [commodity, setCommodity] = useState("Wheat");
  const [selectedCommodity, setSelectedCommodity] = useState<Commodity | null>(null);
  const [pincode, setPincode] = useState("");
  const [filteredMarkets, setFilteredMarkets] = useState<Market[]>([]);
  const [currentDate, setCurrentDate] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    setCurrentDate(date.toLocaleDateString("en-US", options));
    setIsVisible(true);
  }, []);

  // Update commodity details based on input
  useEffect(() => {
    const found = commodityPrices.find(
      (c) => c.name.toLowerCase() === commodity.toLowerCase()
    );
    setSelectedCommodity(found || null);
  }, [commodity]);

  // Search nearby markets by pincode
  const handleSearchMarkets = () => {
    setIsSearching(true);
    setTimeout(() => {
      if (pincode.trim() === "") {
        // If no pincode, show random selection of markets
        const shuffled = [...allMarkets].sort(() => 0.5 - Math.random());
        setFilteredMarkets(shuffled.slice(0, 12));
      } else {
        // Filter by pincode and show nearby ones
        const exactMatches = allMarkets.filter((m) => m.pincode.includes(pincode.trim()));
        const nearbyMatches = allMarkets.filter((m) => 
          !m.pincode.includes(pincode.trim()) && 
          Math.abs(parseInt(m.pincode.slice(0, 3)) - parseInt(pincode.slice(0, 3))) <= 1
        );
        
        const combinedResults = [...exactMatches, ...nearbyMatches.slice(0, 8)];
        setFilteredMarkets(combinedResults.slice(0, 15));
      }
      setIsSearching(false);
      setHasSearched(true);
    }, 1200);
  };

  const getSuggestions = () => {
    return commodityPrices.filter(c => 
      c.name.toLowerCase().includes(commodity.toLowerCase()) && 
      c.name.toLowerCase() !== commodity.toLowerCase()
    );
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gradient-to-br from-[#FAFAF9] via-[#EBEBE6] to-[#FAFAF9]">
      <style jsx>{`
        @keyframes slideDown {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0);
          }
          40%, 43% {
            transform: translate3d(0, -10px, 0);
          }
          70% {
            transform: translate3d(0, -5px, 0);
          }
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.5s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.4s ease-out;
        }
        
        .animate-bounce {
          animation: bounce 2s infinite;
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .stagger-1 {
          animation-delay: 0.1s;
        }
        
        .stagger-2 {
          animation-delay: 0.2s;
        }
        
        .stagger-3 {
          animation-delay: 0.3s;
        }
        
        .glass-effect {
          backdrop-filter: blur(12px);
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(70, 90, 84, 0.15);
        }
        
        .gradient-border {
          background: linear-gradient(135deg, #FAFAF9 0%, #EBEBE6 100%);
          padding: 2px;
          border-radius: 16px;
        }
        
        .gradient-border-inner {
          background: white;
          border-radius: 14px;
          height: 100%;
          width: 100%;
        }
      `}</style>

      {/* Header */}
      <div className={`flex items-center justify-between p-4 glass-effect rounded-b-2xl shadow-lg border-b border-[#EBEBE6]/50 ${isVisible ? 'animate-slideDown' : ''}`}>
        <button className="p-3 rounded-full hover:bg-[#EBEBE6]/50 transition-all duration-300 hover:scale-110 active:scale-95">
          <ChevronLeft className="text-[#465A54]" size={24} />
        </button>
        
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-xl text-[#465A54]">Market Updates</h1>
          <div className={`flex items-center gap-1 mt-1 ${isVisible ? 'animate-fadeIn stagger-1' : ''}`}>
            <Clock size={12} className="text-[#465A54]/60" />
            <span className="text-xs text-[#465A54]/60">Live prices</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse ml-1"></div>
          </div>
        </div>

        <button className="p-3 rounded-full hover:bg-[#EBEBE6]/50 transition-all duration-300 hover:scale-110 active:scale-95 relative">
          <Bell className="text-[#465A54]" size={24} />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-bounce"></div>
        </button>
      </div>

      <div className="flex-1 pb-20">
        {/* Date */}
        <p className={`px-6 pt-4 text-sm text-[#465A54]/70 font-medium ${isVisible ? 'animate-slideUp stagger-1' : ''}`}>
          {currentDate}
        </p>

        {/* Commodity Card */}
        <div className={`mx-4 mt-4 glass-effect rounded-2xl p-4 sm:p-6 shadow-lg hover-lift ${isVisible ? 'animate-scaleIn stagger-1' : ''}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-[#465A54] flex items-center gap-2">
              <span className="text-xl sm:text-2xl">📈</span>
              <span className="truncate">Commodity Price</span>
            </h2>
            <button className="p-2 rounded-full bg-[#EBEBE6]/50 hover:bg-[#465A54]/10 transition-all duration-300 hover:scale-110 active:scale-95 flex-shrink-0">
              <Filter size={16} className="text-[#465A54] sm:w-[18px] sm:h-[18px]" />
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search commodity..."
              value={commodity}
              onChange={(e) => {
                setCommodity(e.target.value);
                setShowSuggestions(e.target.value.length > 0);
              }}
              onFocus={() => setShowSuggestions(commodity.length > 0)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              className="w-full rounded-xl border-2 border-[#EBEBE6] px-4 py-3 text-[#465A54] bg-[#FAFAF9]/50 focus:border-[#465A54] focus:outline-none transition-all duration-300 placeholder-[#465A54]/50 focus:scale-[1.02] text-sm sm:text-base"
            />
            
            {showSuggestions && getSuggestions().length > 0 && (
              <div className="absolute top-full left-0 right-0 glass-effect rounded-xl shadow-lg border border-[#EBEBE6] mt-2 z-10 max-h-48 overflow-y-auto animate-slideDown">
                {getSuggestions().map((suggestion) => (
                  <button
                    key={suggestion.id}
                    onClick={() => {
                      setCommodity(suggestion.name);
                      setShowSuggestions(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-[#EBEBE6]/50 transition-colors flex items-center gap-3 first:rounded-t-xl last:rounded-b-xl text-sm sm:text-base"
                  >
                    <span className="text-lg sm:text-xl flex-shrink-0">{suggestion.image}</span>
                    <span className="text-[#465A54] truncate">{suggestion.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {selectedCommodity ? (
            <div key={selectedCommodity.id} className="mt-6 animate-fadeIn">
              {/* Commodity Info */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="text-4xl bg-gradient-to-br from-[#EBEBE6] to-[#FAFAF9] p-3 rounded-2xl animate-bounce flex-shrink-0">
                  {selectedCommodity.image}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-lg sm:text-xl text-[#465A54] truncate">
                    {selectedCommodity.name}
                  </p>
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <p className="text-2xl sm:text-3xl font-bold text-[#465A54]">
                      ₹{selectedCommodity.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-[#465A54]/60">/{selectedCommodity.unit}</p>
                  </div>
                  
                  <div className={`inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full text-sm font-medium animate-fadeIn stagger-2 ${
                    selectedCommodity.change.startsWith("+")
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}>
                    {selectedCommodity.trend === "up" ? (
                      <TrendingUp size={14} />
                    ) : (
                      <TrendingDown size={14} />
                    )}
                    {selectedCommodity.change}
                  </div>
                </div>
              </div>

              {/* MSP Card - Now below commodity info */}
              <div className="bg-gradient-to-br from-[#465A54] to-[#465A54]/80 p-4 rounded-2xl shadow-lg animate-slideUp stagger-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">🏛️</div>
                    <div>
                      <p className="text-white/90 text-sm font-medium mb-1">Minimum Support Price (MSP)</p>
                      <div className="flex items-baseline gap-2">
                        <p className="font-bold text-2xl text-white">
                          ₹{selectedCommodity.msp.toLocaleString()}
                        </p>
                        <p className="text-white/70 text-sm">/{selectedCommodity.unit}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-white/70 text-xs mb-1">Price vs MSP</p>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      selectedCommodity.price > selectedCommodity.msp
                        ? "bg-green-500/20 text-green-200"
                        : selectedCommodity.price < selectedCommodity.msp
                        ? "bg-red-500/20 text-red-200"
                        : "bg-yellow-500/20 text-yellow-200"
                    }`}>
                      {selectedCommodity.price > selectedCommodity.msp
                        ? `+₹${(selectedCommodity.price - selectedCommodity.msp).toLocaleString()}`
                        : selectedCommodity.price < selectedCommodity.msp
                        ? `-₹${(selectedCommodity.msp - selectedCommodity.price).toLocaleString()}`
                        : "At MSP"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-[#465A54]/60 animate-fadeIn">
              <div className="text-4xl mb-2">🔍</div>
              <p className="text-sm">No data found for this commodity</p>
            </div>
          )}

          <p className="text-xs text-[#465A54]/50 mt-4 flex items-center gap-2 animate-fadeIn stagger-3 px-1">
            <MapPin size={10} className="flex-shrink-0" />
            <span className="leading-relaxed">Based on your location: Kolkata, West Bengal</span>
          </p>
        </div>

        {/* Find Nearby Markets */}
        <div className={`mx-4 mt-6 glass-effect rounded-2xl p-4 sm:p-6 shadow-lg hover-lift ${isVisible ? 'animate-scaleIn stagger-2' : ''}`}>
          <h3 className="font-bold text-lg text-[#465A54] mb-4 flex items-center gap-2">
            <span className="text-xl">🏪</span>
            Find Nearby Markets
          </h3>
          
          <div className="relative">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-[#465A54]/50" size={18} />
            <input
              type="text"
              placeholder="Enter Pincode (optional)"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="w-full rounded-xl border-2 border-[#EBEBE6] pl-10 sm:pl-12 pr-4 py-3 text-[#465A54] bg-[#FAFAF9]/50 focus:border-[#465A54] focus:outline-none transition-all duration-300 placeholder-[#465A54]/50 focus:scale-[1.02] text-sm sm:text-base"
            />
          </div>
          
          <p className="text-xs text-[#465A54]/60 mt-2 flex items-start gap-1">
            <span className="text-sm flex-shrink-0">💡</span>
            <span className="leading-relaxed">Search for nearby mandis and marketplaces to sell your goods. Leave pincode empty to see popular markets.</span>
          </p>
          
          <button
            onClick={handleSearchMarkets}
            disabled={isSearching}
            className="mt-4 w-full bg-gradient-to-r from-[#465A54] to-[#465A54]/80 text-white py-3 px-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-98 disabled:opacity-70 text-sm sm:text-base"
          >
            {isSearching ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Search size={18} />
                Search Markets
              </>
            )}
          </button>
        </div>

        {/* Market List - Only show after search */}
        {hasSearched && (
          <div className="px-4 mt-6 space-y-4 pb-4">
            <h3 className="font-bold text-lg text-[#465A54] flex items-center gap-2 animate-slideUp">
              <span className="text-xl">📍</span>
              {filteredMarkets.length > 0 ? `Found ${filteredMarkets.length} Markets` : 'No Markets Found'}
            </h3>
            
            {filteredMarkets.length > 0 ? (
              filteredMarkets.map((market, index) => (
                <div
                  key={market.id}
                  className={`glass-effect rounded-2xl p-4 shadow-lg hover-lift cursor-pointer transition-all duration-300 hover:scale-[1.02] animate-slideUp stagger-${index % 3 + 1}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start space-x-3 flex-1 min-w-0">
                      <div className="bg-gradient-to-br from-[#465A54] to-[#465A54]/80 p-2.5 rounded-xl flex-shrink-0">
                        <MapPin className="text-white" size={18} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-2 mb-2 flex-wrap">
                          <h4 className="font-bold text-[#465A54] text-sm sm:text-base leading-tight flex-1 min-w-0">{market.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                            market.type === 'Wholesale' 
                              ? 'bg-blue-100 text-blue-600' 
                              : 'bg-green-100 text-green-600'
                          }`}>
                            {market.type}
                          </span>
                        </div>
                        
                        <p className="text-sm font-medium text-[#465A54]/80 mb-2 leading-tight">
                          {market.priceRange}
                        </p>
                        
                        <div className="flex items-center gap-4 text-xs text-[#465A54]/60 flex-wrap">
                          <span className="flex items-center gap-1">
                            <MapPin size={10} />
                            <span className="whitespace-nowrap">{market.distance}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <Star size={10} className="fill-yellow-400 text-yellow-400" />
                            <span>{market.rating}</span>
                          </span>
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                            {market.pincode}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <button className="p-2 rounded-full hover:bg-[#EBEBE6]/50 transition-all duration-300 hover:scale-110 active:scale-95 flex-shrink-0">
                      <ChevronLeft className="rotate-180 text-[#465A54]" size={18} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-[#465A54]/60 animate-fadeIn">
                <div className="text-4xl mb-2">🔍</div>
                <p className="text-sm text-center">No markets found for the specified pincode.<br />Try searching without pincode or use a different pincode.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className={`fixed bottom-0 left-0 right-0 glass-effect border-t border-[#EBEBE6]/50 rounded-t-2xl shadow-xl z-50 ${isVisible ? 'animate-slideUp stagger-3' : ''}`}>
        <div className="flex justify-around p-4">
          {[
            { icon: Home, active: true, label: "Home" },
            { icon: User, active: false, label: "Profile" },
            { icon: Search, active: false, label: "Search" },
            { icon: Heart, active: false, label: "Favorites" },
          ].map(({ icon: Icon, active, label }, index) => (
            <button
              key={label}
              className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 relative ${
                active 
                  ? 'bg-[#465A54] text-white shadow-lg' 
                  : 'text-[#465A54]/60 hover:text-[#465A54] hover:bg-[#EBEBE6]/30'
              }`}
            >
              <Icon size={24} />
              <span className="text-xs mt-1 font-medium">{label}</span>
              {active && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-pulse" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
export default MarketUpdates;