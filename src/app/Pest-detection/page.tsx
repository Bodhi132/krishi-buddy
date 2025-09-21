"use client";
import React, { useState, useRef } from 'react';
import { Camera, Upload, Search, ArrowLeft, MoreVertical, Leaf, Droplets, Bug, Shield, X, Check } from 'lucide-react';

interface PestData {
  id: string;
  name: string;
  category: string;
  severity: 'Low' | 'Medium' | 'High';
  confidence: number;
  infestation: string;
  affectedPart: string;
  image: string;
}

interface ActionItem {
  title: string;
  description: string;
}

interface PreventiveTip {
  title: string;
  description: string;
}

const mockPestData: PestData = {
  id: '1',
  name: 'Green fly',
  category: 'Aphids',
  severity: 'Medium',
  confidence: 87.5,
  infestation: 'Approximately 30%',
  affectedPart: 'Leaves',
  image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150"%3E%3Crect fill="%2348a855" width="200" height="150"/%3E%3Cpath fill="%2334d399" d="M20 30 Q100 10 180 30 Q180 70 100 75 Q20 70 20 30z"/%3E%3Ccircle fill="%23fbbf24" cx="60" cy="50" r="3"/%3E%3Ccircle fill="%23fbbf24" cx="80" cy="45" r="2"/%3E%3Ccircle fill="%23fbbf24" cx="95" cy="55" r="2.5"/%3E%3Ccircle fill="%23fbbf24" cx="120" cy="40" r="2"/%3E%3Ccircle fill="%23fbbf24" cx="140" cy="52" r="3"/%3E%3C/svg%3E'
};

const mockActions: ActionItem[] = [
  {
    title: 'Mechanical Removal',
    description: 'For light infestations, spray a strong jet of water to dislodge the aphids from the plants.'
  },
  {
    title: 'Neem Oil Spray',
    description: 'Mix 5 ml of cold-pressed neem oil with 1 liter of water and a few drops of mild soap. Spray thoroughly on all parts of the plant, especially the undersides of leaves.'
  },
  {
    title: 'Beneficial Insects',
    description: 'Release ladybugs or lacewing oil solution every 7 days until the pest is no longer visible.'
  }
];

const mockPreventiveTips: PreventiveTip[] = [
  {
    title: 'Encourage Natural Predators',
    description: 'Attract ladybugs, lacewings, and hoverflies to your farm, as they are natural enemies of aphids.'
  },
  {
    title: 'Companion Planting',
    description: 'Plant chives, garlic, or marigolds near your main crops to act as natural repellents. These plants emit strong odors that deter aphids.'
  },
  {
    title: 'Regular Monitoring',
    description: 'Check plants weekly for early signs of pest problems, which is highly attractive to aphids.'
  }
];

const mockInsights = {
  title: 'Aphids',
  description: 'are small sap-sucking insects that can multiply rapidly. They are attracted to young, succulent plant growth. They reproduce very quickly. They also excrete honeydew, which attracts ants and can lead to sooty mold growth on plant tissue.'
};

export default function PestDetectionApp() {
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setShowResults(true);
    }, 3000);
  };

  const handleBack = () => {
    setShowResults(false);
    setUploadedImage(null);
    setShowCamera(false);
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setShowCamera(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      alert('Camera access denied or not available');
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const dataURL = canvas.toDataURL('image/png');
        setUploadedImage(dataURL);
        setShowCamera(false);
        
        // Stop camera stream
        const stream = videoRef.current.srcObject as MediaStream;
        stream?.getTracks().forEach(track => track.stop());
      }
    }
  };

  const closeCamera = () => {
    setShowCamera(false);
    const stream = videoRef.current?.srcObject as MediaStream;
    stream?.getTracks().forEach(track => track.stop());
  };

  if (isSearching) {
    return (
      <div className="w-full h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center font-sans">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-24 h-24 mx-auto">
              <div className="w-full h-full border-4 border-gray-200 rounded-full animate-pulse"></div>
              <div className="absolute top-0 left-0 w-full h-full border-4 border-t-transparent rounded-full animate-spin" style={{borderColor: '#465A54', borderTopColor: 'transparent'}}></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Search className="w-8 h-8" style={{color: '#465A54'}} />
            </div>
          </div>
          
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-gray-800">Analyzing Image</h2>
            <p className="text-gray-600">Our AI is identifying pests and diseases...</p>
            
            <div className="flex justify-center space-x-2 mt-4">
              <div className="w-2 h-2 rounded-full animate-bounce" style={{backgroundColor: '#465A54', animationDelay: '0ms'}}></div>
              <div className="w-2 h-2 rounded-full animate-bounce" style={{backgroundColor: '#465A54', animationDelay: '150ms'}}></div>
              <div className="w-2 h-2 rounded-full animate-bounce" style={{backgroundColor: '#465A54', animationDelay: '300ms'}}></div>
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 max-w-sm mx-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{backgroundColor: '#465A54'}}></div>
              <span>Processing image features...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-gray-50 font-sans flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center justify-between shadow-sm flex-shrink-0">
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Pest Detection</h1>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <MoreVertical className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Camera Modal */}
      {showCamera && (
        <div className="fixed inset-0 z-50 bg-black">
          <div className="relative w-full h-full">
            <video 
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4">
              <button
                onClick={closeCamera}
                className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <button
                onClick={capturePhoto}
                className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
              >
                <div className="w-14 h-14 bg-white border-4 border-gray-300 rounded-full"></div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {!showResults ? (
          <div className="p-6 space-y-6 min-h-full">
            {/* Image Preview */}
            {uploadedImage && (
              <div className="bg-white rounded-xl shadow-sm p-4 animate-fadeIn">
                <h2 className="text-sm font-medium text-gray-700 mb-3">Selected Image</h2>
                <div className="relative">
                  <img 
                    src={uploadedImage} 
                    alt="Uploaded" 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => setUploadedImage(null)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={handleCamera}
                className="bg-white hover:bg-gray-50 active:bg-gray-100 transition-all duration-200 rounded-xl p-8 flex flex-col items-center space-y-3 group shadow-sm border border-gray-100 hover:shadow-md transform hover:scale-105"
              >
                <div className="bg-blue-100 group-hover:bg-blue-200 transition-colors duration-200 rounded-xl p-4">
                  <Camera className="w-8 h-8 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Camera</span>
              </button>
              
              <button 
                onClick={handleUpload}
                className="bg-white hover:bg-gray-50 active:bg-gray-100 transition-all duration-200 rounded-xl p-8 flex flex-col items-center space-y-3 group shadow-sm border border-gray-100 hover:shadow-md transform hover:scale-105"
              >
                <div className="bg-purple-100 group-hover:bg-purple-200 transition-colors duration-200 rounded-xl p-4">
                  <Upload className="w-8 h-8 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Upload</span>
              </button>
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              disabled={!uploadedImage}
              className={`w-full rounded-xl px-6 py-4 flex items-center justify-center space-x-2 text-white font-medium transition-all duration-200 ${
                uploadedImage 
                  ? 'hover:scale-105 shadow-lg hover:shadow-xl transform' 
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
              style={{
                backgroundColor: uploadedImage ? '#465A54' : undefined
              }}
            >
              <Search className="w-5 h-5" />
              <span>Analyze Image</span>
            </button>

            {!uploadedImage && (
              <div className="text-center py-8">
                <Leaf className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Upload or capture an image to get started</p>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        ) : (
          <div className="p-4 space-y-6 animate-fadeInUp pb-24">
            {/* Pest Identified */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              <h2 className="text-sm font-medium text-gray-500 mb-4">Pest Identified</h2>
              <div className="flex space-x-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-200 flex-shrink-0">
                  <img 
                    src={uploadedImage || mockPestData.image} 
                    alt="Detected pest" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1 text-lg">{mockPestData.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{mockPestData.category}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500 mb-2">
                    <span className={`px-3 py-1 rounded-full font-medium ${
                      mockPestData.severity === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      mockPestData.severity === 'High' ? 'bg-red-100 text-red-700' :
                      'text-white'
                    }`}
                    style={{
                      backgroundColor: mockPestData.severity === 'Low' ? '#465A54' : undefined
                    }}>
                      {mockPestData.severity}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 space-y-1">
                    <div>Infestation: <span className="font-medium">{mockPestData.infestation}</span></div>
                    <div>Affected Part: <span className="font-medium">{mockPestData.affectedPart}</span></div>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${mockPestData.confidence}%`, backgroundColor: '#465A54' }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium" style={{color: '#465A54'}}>{mockPestData.confidence}%</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Confidence Level</p>
              </div>
            </div>

            {/* Recommended Actions */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              <h2 className="text-base font-semibold text-gray-700 mb-4">Recommended Actions</h2>
              <div className="space-y-4">
                {mockActions.map((action, index) => (
                  <div key={index} className="pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                    <div className="flex space-x-3">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{backgroundColor: '#465A54'}}>
                        <span className="text-xs font-semibold text-white">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 text-sm mb-2">{action.title}</h3>
                        <p className="text-xs text-gray-600 leading-relaxed">{action.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Preventive Tips */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              <h2 className="text-base font-semibold text-gray-700 mb-4">Preventive Tips</h2>
              <div className="space-y-4">
                {mockPreventiveTips.map((tip, index) => (
                  <div key={index} className="flex space-x-3">
                    <Shield className="w-4 h-4 mt-1 flex-shrink-0" style={{color: '#465A54'}} />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm mb-1">{tip.title}</h3>
                      <p className="text-xs text-gray-600 leading-relaxed">{tip.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pest Insights */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              <h2 className="text-base font-semibold text-gray-700 mb-4">Pest Insights</h2>
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border-l-4" style={{borderLeftColor: '#465A54'}}>
                <div className="flex space-x-3">
                  <Bug className="w-5 h-5 mt-0.5 flex-shrink-0" style={{color: '#465A54'}} />
                  <p className="text-sm text-gray-700 leading-relaxed">
                    <span className="font-semibold" style={{color: '#465A54'}}>{mockInsights.title}</span> {mockInsights.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      
      {/* Bottom Navigation */}
<div className="px-4 py-3 flex-shrink-0">
  <div 
    className="flex items-center justify-between max-w-sm mx-auto px-4 py-3"
    style={{
      backgroundColor: '#465A54',
      borderRadius: '9999px' // fully rounded pill shape
    }}
  >
    {/* Home Button */}
    <button 
      onClick={() => window.location.href = '/'}
      className="bg-white px-6 py-3 rounded-full hover:bg-gray-100 transition-colors shadow-sm"
    >
      <svg className="w-6 h-6" style={{color: '#465A54'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    </button>
    
    {/* Profile/Farmer Dashboard Button */}
    <button 
      onClick={() => window.location.href = '/dashboard'}
      className="bg-white px-6 py-3 rounded-full hover:bg-gray-100 transition-colors shadow-sm"
    >
      <svg className="w-6 h-6" style={{color: '#465A54'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    </button>
    
    {/* Search Button (Current Page - Active) */}
    <button className="bg-white px-6 py-3 rounded-full shadow-sm">
      <Search className="w-6 h-6" style={{color: '#465A54'}} />
    </button>
    
    {/* Favorites/Heart Button */}
    <button className="px-6 py-3 hover:bg-white/20 rounded-full transition-colors">
      <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    </button>
  </div>
</div>


      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');
        
        .font-sans {
          font-family: 'DM Sans', system-ui, -apple-system, sans-serif;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}