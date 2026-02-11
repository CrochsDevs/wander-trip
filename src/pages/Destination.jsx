import React, { useState, useEffect } from 'react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer'; 
import { MapPin, Search, Filter, X, Calendar, Users, Info, ArrowRight, Compass, Clock, Coffee, Camera, Heart, Share2, ChevronDown, Star, Sunset, Tent, Waves, Landmark, Mountain, DollarSign } from 'lucide-react';

const Destination = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDest, setSelectedDest] = useState(null);
    const [visibleCount, setVisibleCount] = useState(6);
    const [showFilters, setShowFilters] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [likedDestinations, setLikedDestinations] = useState([]);

    const categories = ["All", "Beach", "Nature", "Surfing", "Mountains", "Diving", "History"];

    const destinations = [
        {
            id: 1,
            name: "El Nido, Palawan",
            category: "Beach",
            image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&q=80&w=800",
            description: "Crystal clear waters and limestone cliffs.",
            longDescription: "El Nido is a Philippine municipality on Palawan Island. It's known for white-sand beaches, coral reefs and as the gateway to the Bacuit Archipelago, a group of islands with steep karst cliffs. Home to hidden lagoons, secret beaches, and incredible marine biodiversity.",
            bestTime: "December to May",
            budget: "₱2,500 - ₱5,000",
            rating: 4.9,
            reviews: 1243,
            coordinates: "11.1955° N, 119.4081° E",
            activities: ["Island Hopping", "Kayaking", "Snorkeling", "Cliff Diving"],
            tips: ["Book tours in advance", "Bring reef-safe sunscreen", "Try the local lobster"],
            nearby: ["Nacpan Beach", "Big Lagoon", "Secret Lagoon", "Shimizu Island"]
        },
        {
            id: 2,
            name: "Batanes",
            category: "Nature",
            image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&q=80&w=800",
            description: "Breathtaking rolling hills and lighthouse views.",
            longDescription: "Batanes is the northernmost province in the Philippines. It is famous for its dramatic landscapes, stone houses, and peaceful Ivatan culture. Experience the unique blend of rolling hills, rugged coastlines, and the warm hospitality of the Ivatans.",
            bestTime: "March to June",
            budget: "₱3,000 - ₱6,000",
            rating: 4.8,
            reviews: 876,
            coordinates: "20.4484° N, 121.9698° E",
            activities: ["Sightseeing", "Cycling", "Hiking", "Cultural Tours"],
            tips: ["Book flights early", "Rent a tricycle for tours", "Try vunes (seaweed)"],
            nearby: ["Basco Lighthouse", "Marlboro Hills", "Rakuh-a-Payaman", "Valugan Boulder Beach"]
        },
        {
            id: 3,
            name: "Siargao",
            category: "Surfing",
            image: "https://images.unsplash.com/photo-1533744266213-925208620857?auto=format&fit=crop&q=80&w=800",
            description: "The surfing capital of the Philippines.",
            longDescription: "Home to the famous Cloud 9, Siargao offers more than just surfing. Discover lagoons, rock pools, and an endless sea of coconut trees. This tear-drop shaped island is paradise for surfers, adventurers, and digital nomads alike.",
            bestTime: "August to November",
            budget: "₱1,500 - ₱4,000",
            rating: 4.9,
            reviews: 2156,
            coordinates: "9.8549° N, 126.0435° E",
            activities: ["Surfing", "Lagoon Tours", "Island Hopping", "Magentos Rock Pools"],
            tips: ["Rent a scooter", "Visit during surfing season", "Try the coconut pikelets"],
            nearby: ["Cloud 9", "Sugba Lagoon", "Magpupungko", "Daku Island"]
        },
        {
            id: 4,
            name: "Baguio City",
            category: "Mountains",
            image: "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?auto=format&fit=crop&q=80&w=800",
            description: "The Summer Capital with pine trees and cold breeze.",
            longDescription: "Enjoy the cool climate, visit the strawberry farms in La Trinidad, and explore the creative parks of the Cordillera region. Baguio is a haven for artists, foodies, and those seeking respite from tropical heat.",
            bestTime: "November to February",
            budget: "₱1,000 - ₱3,000",
            rating: 4.6,
            reviews: 1543,
            coordinates: "16.4023° N, 120.5960° E",
            activities: ["Strawberry Picking", "Museum Hopping", "Food Trips", "Park Hopping"],
            tips: ["Avoid weekend crowds", "Bring jackets", "Try strawberry taho"],
            nearby: ["Burnham Park", "Mines View", "Camp John Hay", "Strawberry Farm"]
        },
        {
            id: 5,
            name: "Boracay",
            category: "Beach",
            image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&q=80&w=800",
            description: "World-famous white sand beaches.",
            longDescription: "Boracay is a small island known for its resorts and beaches. Along the west coast, White Beach is backed by palm trees, bars, and restaurants. Recently rehabilitated, it's now cleaner and more sustainable than ever.",
            bestTime: "January to May",
            budget: "₱2,000 - ₱7,000",
            rating: 4.7,
            reviews: 3241,
            coordinates: "11.9674° N, 121.9248° E",
            activities: ["Swimming", "Sunset Sailing", "Helmet Diving", "Zipline"],
            tips: ["Book accredited hotels", "Avoid peak season", "Try Jonah's shakes"],
            nearby: ["White Beach", "Puka Beach", "Willy's Rock", "Ariel's Point"]
        },
        {
            id: 6,
            name: "Chocolate Hills, Bohol",
            category: "Nature",
            image: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?auto=format&fit=crop&q=80&w=800",
            description: "Over 1,200 symmetrical brown-colored hills.",
            longDescription: "A unique geological formation in Bohol. These hills turn brown during the dry season, looking like giant chocolate kisses. A UNESCO-recognized site that's one of the Philippines' most iconic landscapes.",
            bestTime: "December to May",
            budget: "₱1,200 - ₱3,500",
            rating: 4.8,
            reviews: 987,
            coordinates: "9.8297° N, 124.1392° E",
            activities: ["Sightseeing", "ATV Rides", "Photography", "Hiking"],
            tips: ["Go early morning", "Visit the viewing deck", "Combine with Tarsier tour"],
            nearby: ["Tarsier Sanctuary", "Loboc River", "Man-made Forest", "Baclayon Church"]
        },
        {
            id: 7,
            name: "Coron, Palawan",
            category: "Diving",
            image: "https://images.unsplash.com/photo-1544085311-11a028465b03?auto=format&fit=crop&q=80&w=800",
            description: "Wreck diving and emerald-green lakes.",
            longDescription: "Coron is world-renowned for its World War II shipwrecks and the cleanest lake in the country, Kayangan Lake. Experience world-class diving, pristine beaches, and stunning limestone karsts.",
            bestTime: "February to June",
            budget: "₱2,500 - ₱5,500",
            rating: 4.9,
            reviews: 1876,
            coordinates: "11.9993° N, 120.2049° E",
            activities: ["Wreck Diving", "Lake Swimming", "Island Hopping", "Snorkeling"],
            tips: ["Get dive certified", "Visit Kayangan Lake early", "Try the seafood"],
            nearby: ["Kayangan Lake", "Barracuda Lake", "Twin Lagoon", "Siete Pecados"]
        },
        {
            id: 8,
            name: "Vigan City",
            category: "History",
            image: "https://images.unsplash.com/photo-1520116468816-95b69f847357?auto=format&fit=crop&q=80&w=800",
            description: "A UNESCO World Heritage colonial town.",
            longDescription: "Established in the 16th century, Vigan is the best-preserved example of a planned Spanish colonial town in Asia. Walk through cobblestone streets, ride a kalesa, and step back in time.",
            bestTime: "November to February",
            budget: "₱1,500 - ₱3,000",
            rating: 4.7,
            reviews: 765,
            coordinates: "17.5748° N, 120.3868° E",
            activities: ["Kalesa Rides", "Heritage Tours", "Pottery Making", "Food Crawl"],
            tips: ["Try Vigan longganisa", "Ride kalesa at sunset", "Buy burnay jars"],
            nearby: ["Calle Crisologo", "Bantay Bell Tower", "Syquia Mansion", "Pagburnayan"]
        }
    ];

    useEffect(() => {
        if (selectedDest) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
    }, [selectedDest]);

    const filtered = destinations.filter(dest => {
        const matchesSearch = dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            dest.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            dest.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "All" || dest.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleViewMore = () => setVisibleCount(prev => prev + 3);
    const handleViewLess = () => setVisibleCount(6);

    const toggleLike = (destId) => {
        if (likedDestinations.includes(destId)) {
            setLikedDestinations(likedDestinations.filter(id => id !== destId));
        } else {
            setLikedDestinations([...likedDestinations, destId]);
        }
    };

    const getCategoryIcon = (category) => {
        switch(category) {
            case "Beach": return <Waves className="w-4 h-4" />;
            case "Nature": return <Tent className="w-4 h-4" />;
            case "Surfing": return <Sunset className="w-4 h-4" />;
            case "Mountains": return <Mountain className="w-4 h-4" />;
            case "Diving": return <Camera className="w-4 h-4" />;
            case "History": return <Landmark className="w-4 h-4" />;
            default: return <MapPin className="w-4 h-4" />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white font-sans">
            <Navbar />

            {/* Hero Section with Enhanced Search */}
            <section className="relative pt-32 pb-24 px-5 bg-gradient-to-r from-[#1a2634] to-[#2d3436] overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-[#ffcc00] rounded-full filter blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
                </div>
                
                <div className="max-w-[1200px] mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-[#ffcc00] text-sm font-bold mb-6 backdrop-blur-sm">
                        <Compass className="w-4 h-4" /> EXPLORE PARADISE
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
                        Find Your Next <span className="text-[#ffcc00] drop-shadow-lg">Escape</span>
                    </h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10">
                        Discover hidden gems, popular hotspots, and local favorites across the Philippines.
                    </p>
                    
                    <div className="relative max-w-3xl mx-auto">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by destination, activity, or vibe..."
                            className="w-full pl-14 pr-40 py-6 rounded-2xl border-2 border-white/20 bg-white/95 backdrop-blur focus:bg-white focus:border-[#ffcc00] focus:ring-4 focus:ring-[#ffcc00]/20 transition-all text-lg shadow-2xl"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="absolute right-3 top-1/2 -translate-y-1/2 px-8 py-3 bg-[#ffcc00] text-[#2d3436] font-bold rounded-xl hover:bg-[#ffd700] transition-all flex items-center gap-2 shadow-lg">
                            <Search className="w-5 h-5" /> Search
                        </button>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex justify-center gap-8 mt-12">
                        <div className="text-center">
                            <div className="text-3xl font-black text-white">50+</div>
                            <div className="text-sm text-gray-400">Destinations</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-black text-white">15k+</div>
                            <div className="text-sm text-gray-400">Travelers</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-black text-white">4.9</div>
                            <div className="text-sm text-gray-400">Avg Rating</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <main className="max-w-[1200px] w-full mx-auto px-5 py-16">
                {/* Header with Filters */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <span className="text-[#ffcc00] font-bold text-sm uppercase tracking-wider">Curated for you</span>
                        <h2 className="text-3xl md:text-4xl font-black text-[#2d3436] mt-2">Popular Destinations</h2>
                        <p className="text-gray-500 mt-2">{filtered.length} paradise spots available</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                        <button 
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ffcc00] to-[#ffd700] text-[#2d3436] font-bold rounded-xl hover:shadow-lg transition-all"
                        >
                            <Filter className="w-5 h-5" /> Filters
                            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                        </button>
                    </div>
                </div>

                {/* Category Filters */}
                {showFilters && (
                    <div className="mb-12 p-6 bg-white rounded-2xl shadow-lg border border-gray-100 animate-slideDown">
                        <div className="flex flex-wrap gap-3">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                                        selectedCategory === cat 
                                        ? 'bg-[#ffcc00] text-[#2d3436] shadow-md scale-105' 
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    {getCategoryIcon(cat)}
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Destinations Grid */}
                {filtered.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filtered.slice(0, visibleCount).map((dest) => (
                                <div 
                                    key={dest.id} 
                                    className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                                >
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <img 
                                            src={dest.image} 
                                            alt={dest.name} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                                        
                                        {/* Category Badge */}
                                        <div className="absolute top-5 left-5">
                                            <span className="flex items-center gap-1.5 bg-white/95 backdrop-blur px-4 py-2 rounded-full text-xs font-black text-[#2d3436] shadow-lg">
                                                {getCategoryIcon(dest.category)}
                                                {dest.category.toUpperCase()}
                                            </span>
                                        </div>

                                        {/* Like Button */}
                                        <button 
                                            onClick={() => toggleLike(dest.id)}
                                            className="absolute top-5 right-5 p-3 bg-white/95 backdrop-blur rounded-full hover:scale-110 transition-all shadow-lg"
                                        >
                                            <Heart 
                                                className={`w-5 h-5 ${
                                                    likedDestinations.includes(dest.id) 
                                                    ? 'fill-red-500 text-red-500' 
                                                    : 'text-gray-600'
                                                }`} 
                                            />
                                        </button>

                                        {/* Rating Badge */}
                                        <div className="absolute bottom-5 left-5 flex items-center gap-1.5 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full shadow-lg">
                                            <Star className="w-4 h-4 fill-[#ffcc00] text-[#ffcc00]" />
                                            <span className="text-sm font-bold text-[#2d3436]">{dest.rating}</span>
                                            <span className="text-xs text-gray-500">({dest.reviews})</span>
                                        </div>
                                    </div>
                                    
                                    <div className="p-8">
                                        <h3 className="text-2xl font-bold text-[#2d3436] mb-2 group-hover:text-[#ffcc00] transition-colors line-clamp-1">
                                            {dest.name}
                                        </h3>
                                        
                                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                            <MapPin className="w-4 h-4" />
                                            <span className="text-xs">{dest.coordinates}</span>
                                        </div>
                                        
                                        <p className="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed">
                                            {dest.description}
                                        </p>

                                        {/* Quick Info */}
                                        <div className="flex items-center gap-4 mb-6 text-sm">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-4 h-4 text-[#ffcc00]" />
                                                <span className="text-xs font-medium text-gray-700">{dest.bestTime.split(" ")[0]}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <DollarSign className="w-4 h-4 text-green-500" />
                                                <span className="text-xs font-medium text-gray-700">Est. {dest.budget.split(" - ")[0]}</span>
                                            </div>
                                        </div>
                                        
                                        <button 
                                            onClick={() => setSelectedDest(dest)}
                                            className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-[#2d3436] to-[#1a2634] text-white font-bold rounded-xl hover:from-[#ffcc00] hover:to-[#ffd700] hover:text-[#2d3436] transition-all group/btn"
                                        >
                                            Explore Destination <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* View More / View Less Controls */}
                        <div className="flex justify-center items-center gap-4 mt-16">
                            {visibleCount < filtered.length && (
                                <button 
                                    onClick={handleViewMore}
                                    className="px-10 py-4 bg-[#2d3436] text-white font-black rounded-xl hover:bg-[#ffcc00] hover:text-[#2d3436] transition-all flex items-center gap-2 shadow-lg"
                                >
                                    LOAD MORE DESTINATIONS <ChevronDown className="w-5 h-5" />
                                </button>
                            )}
                            {visibleCount > 6 && (
                                <button 
                                    onClick={handleViewLess}
                                    className="px-8 py-4 border-2 border-gray-300 text-gray-600 font-bold rounded-xl hover:border-[#ffcc00] hover:text-[#ffcc00] transition-all"
                                >
                                    SHOW LESS
                                </button>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-lg">
                        <Compass className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                        <h3 className="text-2xl font-black text-gray-700 mb-3">No destinations found</h3>
                        <p className="text-gray-500 mb-8">Try adjusting your search or filters</p>
                        <button 
                            onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}
                            className="px-8 py-4 bg-[#ffcc00] text-[#2d3436] font-bold rounded-xl hover:bg-[#ffd700] transition-all"
                        >
                            Reset All Filters
                        </button>
                    </div>
                )}
            </main>

            {/* Enhanced Modal */}
            {selectedDest && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 animate-fadeIn">
                    <div className="absolute inset-0 bg-[#2d3436]/95 backdrop-blur-md" onClick={() => setSelectedDest(null)}></div>
                    
                    <div className="relative bg-white w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl animate-slideUp">
                        {/* Close Button */}
                        <button 
                            onClick={() => setSelectedDest(null)} 
                            className="absolute top-6 right-6 z-20 p-3 bg-white/20 hover:bg-red-500 hover:text-white backdrop-blur-sm rounded-full transition-all group"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            {/* Modal Image Gallery */}
                            <div className="relative h-[400px] lg:h-full min-h-[500px]">
                                <img 
                                    src={selectedDest.image} 
                                    alt={selectedDest.name} 
                                    className="w-full h-full object-cover" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                
                                {/* Share Button */}
                                <button className="absolute top-6 left-6 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 transition-all">
                                    <Share2 className="w-5 h-5 text-white" />
                                </button>

                                {/* Destination Badge */}
                                <div className="absolute bottom-6 left-6">
                                    <span className="flex items-center gap-2 px-4 py-2 bg-white/95 backdrop-blur rounded-full text-sm font-bold text-[#2d3436]">
                                        {getCategoryIcon(selectedDest.category)}
                                        {selectedDest.category}
                                    </span>
                                </div>
                            </div>

                            {/* Modal Details */}
                            <div className="p-10 lg:p-12 overflow-y-auto max-h-[600px] lg:max-h-none">
                                <div className="flex items-start justify-between mb-6">
                                    <div>
                                        <span className="text-[#ffcc00] font-black tracking-widest uppercase text-xs">
                                            PHILIPPINES
                                        </span>
                                        <h2 className="text-4xl lg:text-5xl font-black text-[#2d3436] mt-2 mb-3">
                                            {selectedDest.name}
                                        </h2>
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-5 h-5 fill-[#ffcc00] text-[#ffcc00]" />
                                                <span className="font-bold text-[#2d3436]">{selectedDest.rating}</span>
                                            </div>
                                            <span className="text-gray-300">•</span>
                                            <span className="text-gray-500">{selectedDest.reviews.toLocaleString()} reviews</span>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-gray-600 text-lg leading-relaxed mb-8 italic border-l-4 border-[#ffcc00] pl-6">
                                    "{selectedDest.longDescription}"
                                </p>

                                {/* Key Information Grid */}
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="bg-gray-50 p-4 rounded-xl">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-2 bg-yellow-100 rounded-lg">
                                                <Calendar className="w-5 h-5 text-[#ffcc00]" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-gray-400 uppercase">Best Time</p>
                                                <p className="font-bold text-[#2d3436]">{selectedDest.bestTime}</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-gray-50 p-4 rounded-xl">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-2 bg-green-100 rounded-lg">
                                                <DollarSign className="w-5 h-5 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-gray-400 uppercase">Budget</p>
                                                <p className="font-bold text-[#2d3436]">{selectedDest.budget}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Activities */}
                                <div className="mb-8">
                                    <h3 className="font-black text-[#2d3436] mb-4 flex items-center gap-2">
                                        <Camera className="w-5 h-5 text-[#ffcc00]" /> TOP ACTIVITIES
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedDest.activities.map((activity, idx) => (
                                            <span key={idx} className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700 hover:bg-[#ffcc00] hover:text-[#2d3436] transition-all">
                                                {activity}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Pro Tips */}
                                <div className="mb-8 bg-gradient-to-r from-[#ffcc00]/10 to-transparent p-6 rounded-2xl border border-[#ffcc00]/20">
                                    <h3 className="font-black text-[#2d3436] mb-3 flex items-center gap-2">
                                        <Info className="w-5 h-5 text-[#ffcc00]" /> LOCAL TIPS
                                    </h3>
                                    <ul className="space-y-2">
                                        {selectedDest.tips.map((tip, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-sm">
                                                <span className="text-[#ffcc00] font-bold">•</span>
                                                <span className="text-gray-700">{tip}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Nearby Attractions */}
                                <div className="mb-10">
                                    <h3 className="font-black text-[#2d3436] mb-3 flex items-center gap-2">
                                        <MapPin className="w-5 h-5 text-[#ffcc00]" /> NEARBY ATTRACTIONS
                                    </h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        {selectedDest.nearby.map((place, idx) => (
                                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                                                <span className="w-1.5 h-1.5 bg-[#ffcc00] rounded-full"></span>
                                                {place}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <button className="w-full py-5 bg-gradient-to-r from-[#ffcc00] to-[#ffd700] text-[#2d3436] font-black rounded-2xl text-lg hover:shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-3">
                                    <Calendar className="w-5 h-5" /> PLAN YOUR TRIP NOW
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Footer - Imported from layout */}
            <Footer />
        </div>
    );
};

export default Destination;