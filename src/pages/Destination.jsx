import React, { useState, useEffect } from 'react';
import Navbar from '../layout/Navbar';
import { MapPin, Search, Filter, X, Calendar, Users, Info, ArrowRight } from 'lucide-react';

const Destination = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDest, setSelectedDest] = useState(null);
    const [visibleCount, setVisibleCount] = useState(6); // Kontrol sa "View More"

    const destinations = [
        {
            id: 1,
            name: "El Nido, Palawan",
            category: "Beach",
            image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&q=80&w=800",
            description: "Crystal clear waters and limestone cliffs.",
            longDescription: "El Nido is a Philippine municipality on Palawan Island. It's known for white-sand beaches, coral reefs and as the gateway to the Bacuit Archipelago, a group of islands with steep karst cliffs.",
            bestTime: "December to May",
            budget: "₱2,500 - ₱5,000"
        },
        {
            id: 2,
            name: "Batanes",
            category: "Nature",
            image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&q=80&w=800",
            description: "Breathtaking rolling hills and lighthouse views.",
            longDescription: "Batanes is the northernmost province in the Philippines. It is famous for its dramatic landscapes, stone houses, and peaceful Ivatan culture.",
            bestTime: "March to June",
            budget: "₱3,000 - ₱6,000"
        },
        {
            id: 3,
            name: "Siargao",
            category: "Surfing",
            image: "https://images.unsplash.com/photo-1533744266213-925208620857?auto=format&fit=crop&q=80&w=800",
            description: "The surfing capital of the Philippines.",
            longDescription: "Home to the famous Cloud 9, Siargao offers more than just surfing. Discover lagoons, rock pools, and an endless sea of coconut trees.",
            bestTime: "August to November",
            budget: "₱1,500 - ₱4,000"
        },
        {
            id: 4,
            name: "Baguio City",
            category: "Mountains",
            image: "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?auto=format&fit=crop&q=80&w=800",
            description: "The Summer Capital with pine trees and cold breeze.",
            longDescription: "Enjoy the cool climate, visit the strawberry farms in La Trinidad, and explore the creative parks of the Cordillera region.",
            bestTime: "November to February",
            budget: "₱1,000 - ₱3,000"
        },
        {
            id: 5,
            name: "Boracay",
            category: "Beach",
            image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&q=80&w=800",
            description: "World-famous white sand beaches.",
            longDescription: "Boracay is a small island known for its resorts and beaches. Along the west coast, White Beach is backed by palm trees, bars, and restaurants.",
            bestTime: "January to May",
            budget: "₱2,000 - ₱7,000"
        },
        {
            id: 6,
            name: "Chocolate Hills, Bohol",
            category: "Nature",
            image: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?auto=format&fit=crop&q=80&w=800",
            description: "Over 1,200 symmetrical brown-colored hills.",
            longDescription: "A unique geological formation in Bohol. These hills turn brown during the dry season, looking like giant chocolate kisses.",
            bestTime: "December to May",
            budget: "₱1,200 - ₱3,500"
        },
        {
            id: 7,
            name: "Coron, Palawan",
            category: "Diving",
            image: "https://images.unsplash.com/photo-1544085311-11a028465b03?auto=format&fit=crop&q=80&w=800",
            description: "Wreck diving and emerald-green lakes.",
            longDescription: "Coron is world-renowned for its World War II shipwrecks and the cleanest lake in the country, Kayangan Lake.",
            bestTime: "February to June",
            budget: "₱2,500 - ₱5,500"
        },
        {
            id: 8,
            name: "Vigan City",
            category: "History",
            image: "https://images.unsplash.com/photo-1520116468816-95b69f847357?auto=format&fit=crop&q=80&w=800",
            description: "A UNESCO World Heritage colonial town.",
            longDescription: "Established in the 16th century, Vigan is the best-preserved example of a planned Spanish colonial town in Asia.",
            bestTime: "November to February",
            budget: "₱1,500 - ₱3,000"
        }
    ];

    useEffect(() => {
        if (selectedDest) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
    }, [selectedDest]);

    const filtered = destinations.filter(dest =>
        dest.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleViewMore = () => setVisibleCount(prev => prev + 3);

    return (
        <div className="min-h-screen flex flex-col bg-white font-sans">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-16 px-5 bg-gradient-to-b from-[#f8f9fa] to-white">
                <div className="max-w-[1200px] mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-black text-[#2d3436] mb-6">
                        Find Your Next <span className="text-[#ffcc00]">Escape</span>
                    </h1>
                    <div className="relative max-w-2xl mx-auto">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
                        <input
                            type="text"
                            placeholder="Where do you want to go?"
                            className="w-full pl-14 pr-6 py-5 rounded-2xl border-none shadow-xl focus:ring-4 focus:ring-[#ffcc00]/20 transition-all text-lg"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <main className="max-w-[1200px] w-full mx-auto px-5 py-12">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-[#2d3436]">Popular Places</h2>
                        <p className="text-gray-500">Handpicked destinations for your soul.</p>
                    </div>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 rounded-xl font-bold text-gray-700 hover:bg-[#ffcc00] hover:text-white transition-all">
                        <Filter className="w-5 h-5" /> Filters
                    </button>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filtered.slice(0, visibleCount).map((dest) => (
                        <div key={dest.id} className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500">
                            {/* Fixed Image Aspect Ratio */}
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <img 
                                    src={dest.image} 
                                    alt={dest.name} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                />
                                <div className="absolute top-5 left-5">
                                    <span className="bg-white/95 backdrop-blur px-4 py-1.5 rounded-full text-xs font-black text-[#2d3436] shadow-sm uppercase tracking-tighter">
                                        {dest.category}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-[#2d3436] mb-3 group-hover:text-[#ffcc00] transition-colors line-clamp-1">
                                    {dest.name}
                                </h3>
                                <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                                    {dest.description}
                                </p>
                                <button 
                                    onClick={() => setSelectedDest(dest)}
                                    className="flex items-center justify-center gap-2 w-full py-4 bg-[#2d3436] text-white font-bold rounded-2xl hover:bg-[#ffcc00] transition-all"
                                >
                                    Explore <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View More Button */}
                {visibleCount < filtered.length && (
                    <div className="flex justify-center mt-16">
                        <button 
                            onClick={handleViewMore}
                            className="px-10 py-4 border-2 border-[#2d3436] text-[#2d3436] font-black rounded-2xl hover:bg-[#2d3436] hover:text-white transition-all"
                        >
                            VIEW MORE DESTINATIONS
                        </button>
                    </div>
                )}
            </main>

            {/* Modal */}
            {selectedDest && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-[#2d3436]/90 backdrop-blur-md" onClick={() => setSelectedDest(null)}></div>
                    
                    <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl">
                        <button onClick={() => setSelectedDest(null)} className="absolute top-6 right-6 z-20 p-3 bg-white/20 hover:bg-red-500 text-black rounded-full transition-all">
                            <X className="w-6 h-6" />
                        </button>

                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            {/* Modal Image */}
                            <div className="h-[300px] lg:h-full min-h-[400px]">
                                <img src={selectedDest.image} alt={selectedDest.name} className="w-full h-full object-cover" />
                            </div>

                            {/* Modal Details */}
                            <div className="p-10 lg:p-14">
                                <span className="text-[#ffcc00] font-black tracking-widest uppercase text-xs">Philippines</span>
                                <h2 className="text-4xl font-black text-[#2d3436] mt-2 mb-6">{selectedDest.name}</h2>
                                
                                <div className="space-y-6 mb-10">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-yellow-50 rounded-xl"><Calendar className="w-6 h-6 text-[#ffcc00]" /></div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase">Best Season</p>
                                            <p className="font-bold text-[#2d3436]">{selectedDest.bestTime}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-blue-50 rounded-xl"><Info className="w-6 h-6 text-blue-400" /></div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase">Est. Budget</p>
                                            <p className="font-bold text-[#2d3436]">{selectedDest.budget}</p>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-gray-600 leading-relaxed mb-10 italic">"{selectedDest.longDescription}"</p>

                                <button className="w-full py-5 bg-[#ffcc00] text-[#2d3436] font-black rounded-2xl text-lg hover:shadow-xl transition-all active:scale-95">
                                    BOOK THIS TRIP NOW
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            {/* CTA */}
            <section className="bg-[#ffcc00] py-20 px-5 text-center">
                <h2 className="text-4xl font-black text-[#2d3436] mb-4">Don't miss the adventure.</h2>
                <p className="text-[#2d3436]/70 font-bold mb-8">Join our community of 50,000+ travelers.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
                    <input type="email" placeholder="Your email address" className="px-6 py-4 rounded-2xl border-none flex-grow shadow-lg" />
                    <button className="px-8 py-4 bg-[#2d3436] text-white font-black rounded-2xl hover:scale-105 transition-all">JOIN NOW</button>
                </div>
            </section>
        </div>
    );
};

export default Destination;