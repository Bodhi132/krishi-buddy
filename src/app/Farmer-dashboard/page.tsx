"use client";
import { useState, useEffect } from "react";
import { Menu, MapPin, FileText, Newspaper, Video, CheckSquare, Home, User, Search, Heart, ClipboardCheck, ClipboardList, ArrowLeft, Play, Calendar, TrendingUp, Droplets, ChevronLeft } from "lucide-react";

export default function Dashboard() {
    const [openPlots, setOpenPlots] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [currentPage, setCurrentPage] = useState('dashboard'); // 'dashboard', 'records', 'videos', 'addplot'
    const [plots, setPlots] = useState(['Plot 1', 'Plot 2']); // Dynamic plots list
    const [weatherLoaded, setWeatherLoaded] = useState(false);

    // Function to save new plot
    const savePlot = () => {
        const newPlotNumber = plots.length + 1;
        const newPlotName = `Plot ${newPlotNumber}`;
        setPlots([...plots, newPlotName]);
        setCurrentPage('dashboard');
        setOpenPlots(false); // Close the dropdown
    };

    useEffect(() => {
        // Trigger weather card animation after component mounts
        const timer = setTimeout(() => {
            setWeatherLoaded(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    // Mock records data
    const mockRecords = [
        {
            id: 1,
            date: "2025-09-20",
            activity: "Seed Sowing",
            crop: "Rice",
            area: "2.5 acres",
            notes: "Used high-quality seeds from local supplier",
            weather: "Sunny, 28°C"
        },
        {
            id: 2,
            date: "2025-09-18",
            activity: "Fertilizer Application",
            crop: "Wheat",
            area: "3.0 acres",
            notes: "Applied NPK fertilizer as per soil test recommendations",
            weather: "Cloudy, 25°C"
        },
        {
            id: 3,
            date: "2025-09-15",
            activity: "Irrigation",
            crop: "Rice",
            area: "2.5 acres",
            notes: "First irrigation after transplanting",
            weather: "Clear, 30°C"
        },
        {
            id: 4,
            date: "2025-09-12",
            activity: "Pest Control",
            crop: "Cotton",
            area: "1.8 acres",
            notes: "Applied organic pesticide for aphid control",
            weather: "Humid, 27°C"
        }
    ];

    // Mock video data
    const mockVideos = [
        {
            id: 1,
            title: "Modern Rice Cultivation Techniques",
            duration: "12:34",
            category: "Crop Management",
            thumbnail: "🌾",
            description: "Learn the latest methods for rice cultivation to maximize yield"
        },
        {
            id: 2,
            title: "Organic Pest Control Methods",
            duration: "8:45",
            category: "Pest Management",
            thumbnail: "🐛",
            description: "Natural and effective ways to control pests without chemicals"
        },
        {
            id: 3,
            title: "Soil Health and Testing",
            duration: "15:20",
            category: "Soil Management",
            thumbnail: "🌱",
            description: "Understanding soil composition and how to improve fertility"
        },
        {
            id: 4,
            title: "Water Management in Agriculture",
            duration: "10:15",
            category: "Irrigation",
            thumbnail: "💧",
            description: "Efficient irrigation techniques to conserve water"
        },
        {
            id: 5,
            title: "Crop Rotation Benefits",
            duration: "9:30",
            category: "Crop Planning",
            thumbnail: "🔄",
            description: "How to plan crop rotation for better soil health and yield"
        }
    ];

    if (currentPage === 'addplot') {
        return (
            <div className="w-full min-h-screen bg-gray-100 flex flex-col">
                {/* Header */}
                <div className="relative w-full bg-white shadow flex items-center justify-between px-4 py-3">
                    <button 
                        onClick={() => setCurrentPage('dashboard')}
                        className="p-3 rounded-full bg-gray-100 hover:bg-gray-200"
                    >
                        <ChevronLeft className="w-8 h-8 text-gray-800" />
                    </button>
                    <h1 className="text-xl font-semibold text-[#000000]">Select plot location</h1>
                    <div className="w-20"></div>
                </div>

                {/* Search Bar */}
                <div className="p-4 bg-white">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search Location"
                            className="w-full px-4 py-3 bg-gray-100 rounded-xl text-gray-700 pr-12"
                            defaultValue=""
                        />
                        <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                    </div>
                </div>

                {/* Map Section */}
                <div className="flex-1 bg-white mx-4 rounded-t-2xl overflow-hidden shadow-sm">
                    {/* Mock Map */}
                    <div className="h-80 bg-gradient-to-b from-blue-100 to-green-100 relative">
                        {/* Mock map content */}
                        <div className="absolute inset-0 bg-gray-200 opacity-50"></div>
                        
                        {/* Mock road lines */}
                        <div className="absolute top-8 left-4 right-16 h-0.5 bg-gray-400 transform rotate-12"></div>
                        <div className="absolute top-16 left-8 right-8 h-0.5 bg-gray-400 transform -rotate-6"></div>
                        <div className="absolute bottom-20 left-12 right-4 h-0.5 bg-gray-400 transform rotate-3"></div>
                        
                        {/* Location markers */}
                        <div className="absolute top-20 left-16 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                        <div className="absolute top-32 right-20 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                        <div className="absolute bottom-24 left-20 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                        
                        {/* Main location pin */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                                <div className="w-4 h-4 bg-white rounded-full"></div>
                            </div>
                            <div className="w-1 h-4 bg-red-500 mx-auto"></div>
                        </div>
                        
                        {/* Use current location button */}
                        <div className="absolute bottom-4 left-4">
                            <button className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg shadow-md text-red-500 text-sm">
                                <MapPin className="w-4 h-4" />
                                <span>Use current location</span>
                            </button>
                        </div>
                        
                        {/* Road labels */}
                        <div className="absolute top-4 left-8 text-xs text-gray-600 transform rotate-12">Dhalua Border Rd</div>
                        <div className="absolute top-12 right-12 text-xs text-gray-600 transform -rotate-6">Dhalua Border Rd</div>
                    </div>
                </div>

                {/* Address Form Section */}
                <div className="bg-white mx-4 rounded-b-2xl p-6 shadow-sm">
                    {/* Location Info */}
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <p className="font-semibold text-gray-800">Srinagar</p>
                            <p className="text-sm text-gray-600">Panchipara, Baruipur</p>
                        </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Address Details</h3>

                    <div className="space-y-4">
                        {/* Plot Number and Registry Number */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Plot number*</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 bg-gray-100 rounded-lg text-gray-700"
                                    placeholder="Enter plot number"
                                    defaultValue=""
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Registry number*</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 bg-gray-100 rounded-lg text-gray-700"
                                    placeholder="Enter registry number"
                                    defaultValue=""
                                />
                            </div>
                        </div>

                        {/* Plot Owner Name */}
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Plot Owner Name*</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 bg-gray-100 rounded-lg text-gray-700"
                                placeholder="Enter owner name"
                                defaultValue=""
                            />
                        </div>

                        {/* Khatian Number */}
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Khatian number*</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 bg-gray-100 rounded-lg text-gray-700"
                                placeholder="Enter khatian number"
                                defaultValue=""
                            />
                        </div>
                    </div>

                    {/* Save Button */}
                    <button 
                        onClick={savePlot}
                        className="w-full bg-red-500 text-white py-4 rounded-xl font-semibold text-lg mt-6 hover:bg-red-600 transition-colors"
                    >
                        Save address
                    </button>
                </div>

                {/* Bottom spacing for safe area */}
                <div className="h-20"></div>
            </div>
        );
    }

    if (currentPage === 'records') {
        return (
            <div className="w-full min-h-screen bg-white flex flex-col">
                {/* Header */}
                <div className="relative w-full bg-white shadow flex items-center justify-between px-4 py-3">
                    <button 
                        onClick={() => setCurrentPage('dashboard')}
                        className="p-3 rounded-full bg-gray-100 hover:bg-gray-200"
                    >
                        <ArrowLeft className="w-8 h-8 text-gray-800" />
                    </button>
                    <h1 className="text-2xl font-semibold text-[#000000]">Farm Records</h1>
                    <div className="w-20"></div>
                </div>

                {/* Records Content */}
                <div className="flex-1 p-4">
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">Recent Activities</h2>
                        <p className="text-sm text-gray-600">Track your farming activities and progress</p>
                    </div>

                    <div className="space-y-4">
                        {mockRecords.map((record) => (
                            <div key={record.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800">{record.activity}</h3>
                                            <p className="text-sm text-gray-600">{record.crop} - {record.area}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-gray-800">{record.date}</p>
                                        <p className="text-xs text-gray-500">{record.weather}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{record.notes}</p>
                            </div>
                        ))}
                    </div>

                    {/* Add Record Button */}
                    <div className="mt-6">
                        <button className="w-full bg-[#465A54] text-white py-3 px-4 rounded-xl font-medium hover:bg-[#3a4a45] transition-colors">
                            + Add New Record
                        </button>
                    </div>
                </div>

                {/* Bottom Navigation */}
                <div className="fixed bottom-[4px] left-[4px] right-[4px] z-[99999] bg-[#465A54] py-4 px-vh flex justify-around rounded-4xl pointer-events-auto select-none">
                    <button 
                        onClick={() => setCurrentPage('dashboard')}
                        className="bg-[#EBEBE6] py-2 px-4 mr-1 rounded-full hover:bg-gray-300 transition"
                    >
                        <Home className="w-6 h-6 text-gray-700" />
                    </button>
                    <button 
                        onClick={() => setCurrentPage('dashboard')}
                        className="bg-[#EBEBE6] py-2 px-4 mr-1 rounded-full hover:bg-gray-300 transition"
                    >
                        <User className="w-6 h-6 text-gray-700" />
                    </button>
                    <button className="bg-[#EBEBE6] py-2 px-4 mr-1 rounded-full hover:bg-gray-300 transition">
                        <Search className="w-6 h-6 text-gray-700" />
                    </button>
                    <button className="bg-[#EBEBE6] py-2 px-4 mr-1 rounded-full hover:bg-gray-300 transition">
                        <Heart className="w-6 h-6 text-gray-700" />
                    </button>
                </div>
            </div>
        );
    }

    if (currentPage === 'videos') {
        return (
            <div className="w-full min-h-screen bg-white flex flex-col">
                {/* Header */}
                <div className="relative w-full bg-white shadow flex items-center justify-between px-4 py-3">
                    <button 
                        onClick={() => setCurrentPage('dashboard')}
                        className="p-3 rounded-full bg-gray-100 hover:bg-gray-200"
                    >
                        <ArrowLeft className="w-8 h-8 text-gray-800" />
                    </button>
                    <h1 className="text-2xl font-semibold text-[#000000]">Video Guides</h1>
                    <div className="w-20"></div>
                </div>

                {/* Videos Content */}
                <div className="flex-1 p-4">
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">Learning Resources</h2>
                        <p className="text-sm text-gray-600">Educational videos to improve your farming practices</p>
                    </div>

                    <div className="space-y-4">
                        {mockVideos.map((video) => (
                            <div key={video.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                                <div className="flex items-center p-4">
                                    <div className="w-20 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center mr-4">
                                        <span className="text-2xl">{video.thumbnail}</span>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Play className="w-6 h-6 text-white opacity-70" />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-800 mb-1">{video.title}</h3>
                                        <p className="text-sm text-gray-600 mb-2">{video.description}</p>
                                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{video.category}</span>
                                            <span>{video.duration}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Navigation */}
                <div className="fixed bottom-[4px] left-[4px] right-[4px] z-[99999] bg-[#465A54] py-4 px-vh flex justify-around rounded-4xl pointer-events-auto select-none">
                    <button 
                        onClick={() => setCurrentPage('dashboard')}
                        className="bg-[#EBEBE6] py-2 px-4 mr-1 rounded-full hover:bg-gray-300 transition"
                    >
                        <Home className="w-6 h-6 text-gray-700" />
                    </button>
                    <button 
                        onClick={() => setCurrentPage('dashboard')}
                        className="bg-[#EBEBE6] py-2 px-4 mr-1 rounded-full hover:bg-gray-300 transition"
                    >
                        <User className="w-6 h-6 text-gray-700" />
                    </button>
                    <button className="bg-[#EBEBE6] py-2 px-4 mr-1 rounded-full hover:bg-gray-300 transition">
                        <Search className="w-6 h-6 text-gray-700" />
                    </button>
                    <button className="bg-[#EBEBE6] py-2 px-4 mr-1 rounded-full hover:bg-gray-300 transition">
                        <Heart className="w-6 h-6 text-gray-700" />
                    </button>
                </div>
            </div>
        );
    }

    // Dashboard page (default)
    return (
        <div className="w-full min-h-screen bg-white flex flex-col">
            {/* Top Bar */}
            <div className="relative w-full bg-white shadow flex items-center justify-between px-4 py-3">
                <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200">
                    <Menu className="w-8 h-8 text-gray-800" />
                </button>

                <h1 className="text-2xl font-semibold text-[#000000]">
                    Ram Prasadh
                </h1>

                <div className="relative">
                    <button
                        onClick={() => setOpenPlots(!openPlots)}
                        className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                    >
                        <img 
                            src='./icons/dashboard/plotlogo.svg'
                            alt="Button Icon" 
                            className="w-15 h-15 object-contain"
                        />
                    </button>

                    {/* Floating Dropdown */}
                    {openPlots && (
                        <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-xl border z-50">
                            <ul className="flex flex-col">
                                <li className="px-4 py-2 text-black hover:bg-gray-100 cursor-pointer">Plot 1</li>
                                <li className="px-4 py-2 text-black hover:bg-gray-100 cursor-pointer">Plot 2</li>
                                <li 
                                    onClick={() => setCurrentPage('addplot')}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-green-600 font-medium"
                                >
                                    + Add Plot
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Weather Card with Animation */}
            <div className={`m-4 rounded-2xl p-4 text-white shadow-md bg-[linear-gradient(to_bottom,_#465A54,_#8FCAD9,_#73BCA6)] transition-all duration-700 transform ${
                weatherLoaded 
                    ? 'translate-y-0 opacity-100 scale-100' 
                    : 'translate-y-8 opacity-0 scale-95'
            }`}>
                
                {/* Header with Animation */}
                <div className={`flex items-center justify-center space-x-8 transition-all duration-500 delay-200 ${
                    weatherLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}>
                    <span className="text-4xl font-bold">बूँद बरसाइए</span>
                    <div className={`transition-all duration-500 delay-300 ${
                        weatherLoaded ? 'opacity-100 rotate-0' : 'opacity-0 rotate-45'
                    }`}>
                        <Droplets className="w-20 h-20 text-blue-200" />
                    </div>
                </div>

                {/* Weather Info with Staggered Animation */}
                <div className="flex items-center mt-0 mb-4">
                    
                    {/* Main Weather Icon + City */}
                    <div className={`flex flex-col items-center transition-all duration-600 delay-400 ${
                        weatherLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                    }`}>
                        <div className="w-[160px] h-[160px] bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <div className="text-8xl">☁️</div>
                        </div>
                        <h2 className="text-2xl font-semibold mt-2">Kolkata</h2>
                    </div>

                    {/* Weather Metrics with Individual Animations */}
                    <div className="ml-8 mt-10 space-y-1">
                        
                        {/* Temperature */}
                        <div className={`flex items-center transition-all duration-500 delay-500 ${
                            weatherLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                        }`}>
                            <div className="w-10 h-10 mr-4 bg-orange-400 rounded-lg flex items-center justify-center">
                                <span className="text-white text-lg">🌡️</span>
                            </div>
                            <div className="flex flex-col leading-tight">
                                <p className="text-xl font-bold">28°C</p>
                                <p className="text-sm">Temperature</p>
                            </div>
                        </div>

                        {/* Wind Speed */}
                        <div className={`flex items-center transition-all duration-500 delay-600 ${
                            weatherLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                        }`}>
                            <div className="w-10 h-10 mr-4 bg-blue-400 rounded-lg flex items-center justify-center">
                                <span className="text-white text-lg">💨</span>
                            </div>
                            <div className="flex flex-col leading-tight">
                                <p className="text-xl font-bold">3.6 km/h</p>
                                <p className="text-sm">Wind Speed</p>
                            </div>
                        </div>

                        {/* Humidity */}
                        <div className={`flex items-center transition-all duration-500 delay-700 ${
                            weatherLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                        }`}>
                            <div className="w-10 h-10 mr-4 bg-teal-400 rounded-lg flex items-center justify-center">
                                <span className="text-white text-lg">💧</span>
                            </div>
                            <div className="flex flex-col leading-tight">
                                <p className="text-xl font-bold">94%</p>
                                <p className="text-sm">Humidity</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Today's Task */}
            <div className="mx-4 mt-4">
                <p className="text-xs text-gray-500 mb-2">Today's task</p>
                <div className="flex items-center justify-between rounded-xl bg-gray-200 px-4 py-4 hover:bg-gray-300 transition-colors duration-200">
                    <p className="text-lg font-medium text-black">Sowing seed day</p>
                    <button
                        onClick={() => setCompleted(!completed)}
                        className={`transition-all duration-200 hover:scale-110 ${
                            completed 
                                ? 'text-green-600 hover:text-green-700' 
                                : 'text-gray-800 hover:text-green-600'
                        }`}
                    >
                        {completed ? (
                            <ClipboardCheck className="w-8 h-8" />
                        ) : (
                            <ClipboardList className="w-8 h-8" />
                        )}
                    </button>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 bg-gray-100 rounded-xl p-6 mb-4 mt-4 mx-4">
                {/* Records Tile */}
                <button 
                    onClick={() => setCurrentPage('records')}
                    className="flex items-center gap-4 rounded-xl bg-white shadow-md px-4 py-5 w-full hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
                >
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-base font-medium text-gray-800">Records</span>
                </button>

                {/* Market Updates Tile */}
                <button className="flex items-center gap-4 rounded-xl bg-white shadow-md px-4 py-5 w-full hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                    <span className="text-base font-medium text-gray-800">Market Updates</span>
                </button>

                {/* Video Guides Tile */}
                <button 
                    onClick={() => setCurrentPage('videos')}
                    className="flex items-center gap-4 rounded-xl bg-white shadow-md px-4 py-5 w-full hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
                >
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <Video className="w-6 h-6 text-red-600" />
                    </div>
                    <span className="text-base font-medium text-gray-800">Video Guides</span>
                </button>
            </div>

            {/* Bottom Navigation */}
            <div className="fixed bottom-[4px] left-[4px] right-[4px] z-[99999] bg-[#465A54] py-4 px-vh flex justify-around rounded-4xl pointer-events-auto select-none">
                <button className="bg-[#EBEBE6] py-2 px-4 mr-1 rounded-full hover:bg-gray-300 transition-all duration-200 hover:scale-110">
                    <Home className="w-6 h-6 text-gray-700" />
                </button>
                <button className="bg-[#EBEBE6] py-2 px-4 mr-1 rounded-full hover:bg-gray-300 transition-all duration-200 hover:scale-110">
                    <User className="w-6 h-6 text-gray-700" />
                </button>
                <button className="bg-[#EBEBE6] py-2 px-4 mr-1 rounded-full hover:bg-gray-300 transition-all duration-200 hover:scale-110">
                    <Search className="w-6 h-6 text-gray-700" />
                </button>
                <button className="bg-[#EBEBE6] py-2 px-4 mr-1 rounded-full hover:bg-gray-300 transition-all duration-200 hover:scale-110">
                    <Heart className="w-6 h-6 text-gray-700" />
                </button>
            </div>
        </div>
    );
}