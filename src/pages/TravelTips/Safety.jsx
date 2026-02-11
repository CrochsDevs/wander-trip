import React, { useState } from 'react';
import Navbar from '../../layout/Navbar';
import Footer from '../../layout/Footer';
import { 
    Shield, ShieldCheck, ShieldAlert, AlertTriangle, 
    Phone, MapPin, Heart, Users, Hotel, Car, Plane,
    Search, Filter, ChevronDown, ChevronRight, X,
    CheckCircle, AlertCircle, Info, BookOpen, Compass,
    ThumbsUp, Clock, Star, Share2, Globe, Lock,
    Wifi, Camera, FileText, Ambulance, Flame,
    Droplet, Wind, Battery, Smartphone, Briefcase,
    Key, CreditCard, Map, Umbrella, Sun, Moon
} from 'lucide-react';

const Safety = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedTip, setSelectedTip] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const [savedTips, setSavedTips] = useState([]);
    const [emergencyMode, setEmergencyMode] = useState(false);

    const categories = [
        'All', 'Health', 'Personal Security', 'Natural Disasters', 
        'Cyber Safety', 'Transportation', 'Accommodation', 'Documents', 'Women Safety'
    ];

    const safetyTips = [
        {
            id: 1,
            title: "Emergency Hotlines: Save These Numbers",
            category: "Personal Security",
            subcategory: "Emergency",
            priority: "Critical",
            description: "Save local emergency numbers immediately upon arrival. Know the universal emergency number and local police station contacts.",
            longDescription: "Before traveling to any destination, research and save emergency contacts. In the Philippines, dial 911 or 117. Save your country's embassy number, local police station, and nearest hospital. Keep a written backup in case your phone dies or gets lost.",
            tips: [
                "Save emergency numbers in your phone as 'ICE' (In Case of Emergency)",
                "Download offline maps with hospital locations",
                "Share your itinerary with family/friends",
                "Register with your embassy for travel alerts"
            ],
            emergency: "911 / 117 (Philippines)",
            icon: <Phone className="w-6 h-6" />,
            color: "bg-red-100",
            textColor: "text-red-600",
            saves: 3421,
            readTime: "4 min read",
            image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 2,
            title: "Food and Water Safety: Avoid Getting Sick",
            category: "Health",
            subcategory: "Food Safety",
            priority: "High",
            description: "Avoid tap water in developing countries. Eat freshly cooked food and avoid raw vegetables washed in tap water.",
            longDescription: "Traveler's diarrhea is the most common travel illness. Drink only bottled or purified water, avoid ice cubes in drinks, eat thoroughly cooked food, and peel fruits yourself. In high-risk areas, avoid street food unless it's cooked fresh in front of you.",
            tips: [
                "Carry water purification tablets or LifeStraw",
                "Avoid salads and raw vegetables",
                "Check bottled water seals are intact",
                "Use bottled water even for brushing teeth"
            ],
            emergency: "Bring oral rehydration salts",
            icon: <Droplet className="w-6 h-6" />,
            color: "bg-blue-100",
            textColor: "text-blue-600",
            saves: 2876,
            readTime: "6 min read",
            image: "https://images.unsplash.com/photo-1541187704-aa1df708dc8f?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 3,
            title: "Women Safety: Solo Female Travel Guide",
            category: "Women Safety",
            subcategory: "Personal Security",
            priority: "Critical",
            description: "Essential safety strategies for solo female travelers. Trust your instincts and research gender-specific risks.",
            longDescription: "Solo female travel is empowering but requires extra precautions. Research local customs regarding women's dress codes, avoid walking alone at night, share live location with trusted contacts, and choose accommodations in safe neighborhoods with 24/7 reception.",
            tips: [
                "Wear a fake wedding ring in certain countries",
                "Use 'Where's My App' for location sharing",
                "Book female-only dorms when available",
                "Learn to say 'No' firmly in local language"
            ],
            emergency: "Local women's crisis hotline",
            icon: <Heart className="w-6 h-6" />,
            color: "bg-pink-100",
            textColor: "text-pink-600",
            saves: 4567,
            readTime: "8 min read",
            image: "https://images.unsplash.com/photo-1486218119243-13883505764c?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 4,
            title: "Typhoon and Natural Disaster Preparedness",
            category: "Natural Disasters",
            subcategory: "Weather",
            priority: "Critical",
            description: "Know evacuation routes, keep emergency kit ready, and monitor weather updates daily during typhoon season.",
            longDescription: "The Philippines experiences 20+ typhoons annually. Before traveling, check the weather forecast. During your stay, monitor PAGASA updates, know your hotel's evacuation plan, and keep emergency supplies accessible. If a typhoon hits, stay indoors and away from windows.",
            tips: [
                "Pack an emergency kit: flashlight, power bank, whistle",
                "Know the nearest evacuation center",
                "Download Project NOAH app",
                "Keep important documents in waterproof bag"
            ],
            emergency: "NDRRMC Hotline: 911-1406",
            icon: <Wind className="w-6 h-6" />,
            color: "bg-gray-100",
            textColor: "text-gray-600",
            saves: 2134,
            readTime: "7 min read",
            image: "https://images.unsplash.com/photo-1611928482473-7b27d24eab80?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 5,
            title: "Secure Your Digital Life While Traveling",
            category: "Cyber Safety",
            subcategory: "Online Security",
            priority: "High",
            description: "Never use public WiFi for banking. Use VPN, enable 2FA, and disable auto-connect to WiFi networks.",
            longDescription: "Public WiFi in hotels and cafes are often unsecured and can be hacked. Always use a VPN, avoid accessing sensitive accounts on public networks, and turn off file sharing. Be cautious of 'Evil Twin' hotspots that mimic legitimate networks.",
            tips: [
                "Use a paid VPN service (NordVPN, ExpressVPN)",
                "Disable Bluetooth and WiFi when not in use",
                "Remove SIM card with sensitive data",
                "Use privacy screens on devices"
            ],
            emergency: "Change passwords immediately if compromised",
            icon: <Lock className="w-6 h-6" />,
            color: "bg-purple-100",
            textColor: "text-purple-600",
            saves: 1987,
            readTime: "5 min read",
            image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 6,
            title: "Hotel Safety: What to Check Upon Arrival",
            category: "Accommodation",
            subcategory: "Hotel Safety",
            priority: "High",
            description: "Check door locks, peephole, fire exits, and room safes immediately. Never open door to unverified staff.",
            longDescription: "Upon check-in, inspect your room thoroughly. Test door locks and deadbolts, check if peephole hasn't been tampered with, locate fire exits, and test the phone line. Keep the 'Do Not Disturb' sign when leaving to give impression room is occupied.",
            tips: [
                "Use portable door lock or door wedge",
                "Cover peephole from inside",
                "Take photos of room condition",
                "Avoid ground floor rooms when possible"
            ],
            emergency: "Call front desk immediately if door doesn't lock",
            icon: <Hotel className="w-6 h-6" />,
            color: "bg-amber-100",
            textColor: "text-amber-600",
            saves: 2765,
            readTime: "5 min read",
            image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 7,
            title: "Transportation Safety: Scams and Safe Rides",
            category: "Transportation",
            subcategory: "Ride Safety",
            priority: "Critical",
            description: "Only use accredited taxis or ride-hailing apps. Share trip details with someone. Beware of overpricing and rigged meters.",
            longDescription: "Transportation scams are common. Always use official airport taxis, check if meter is running, or agree on fare before departure. In ride-hailing apps, verify license plate and driver identity before getting in. Never share personal information with drivers.",
            tips: [
                "Screenshot ride details before starting",
                "Use Grab's 'Share My Trip' feature",
                "Keep small bills for exact fare",
                "Trust your gut - cancel if something feels off"
            ],
            emergency: "Grab Emergency Button or local police",
            icon: <Car className="w-6 h-6" />,
            color: "bg-green-100",
            textColor: "text-green-600",
            saves: 3122,
            readTime: "6 min read",
            image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 8,
            title: "Document Safety: Don't Lose Your Passport",
            category: "Documents",
            subcategory: "Travel Documents",
            priority: "Critical",
            description: "Carry photocopies of passport and visa. Leave original in hotel safe. Store digital copies in cloud.",
            longDescription: "Losing your passport abroad is stressful and time-consuming. Always keep passport in hotel safe, carry photocopy or digital scan while exploring. Take photos of passport, visa, and entry stamps. Keep separate digital copies in email and cloud storage.",
            tips: [
                "Carry 2 photocopies in different bags",
                "Email passport copy to yourself",
                "Know your embassy's location",
                "Get passport holder with RFID blocking"
            ],
            emergency: "Contact nearest embassy for replacement",
            icon: <FileText className="w-6 h-6" />,
            color: "bg-indigo-100",
            textColor: "text-indigo-600",
            saves: 2543,
            readTime: "4 min read",
            image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 9,
            title: "First Aid Kit Essentials",
            category: "Health",
            subcategory: "Medical",
            priority: "High",
            description: "Pack a comprehensive travel first aid kit. Include prescription meds plus common over-the-counter remedies.",
            longDescription: "A well-stocked first aid kit can prevent a minor issue from ruining your trip. Include prescription medications in original packaging, plus pain relievers, antihistamines, anti-diarrheal, motion sickness tablets, bandages, antiseptic wipes, and rehydration salts.",
            tips: [
                "Pack meds in carry-on luggage",
                "Bring doctor's prescription for controlled substances",
                "Include thermometer and tweezers",
                "Learn basic first aid before traveling"
            ],
            emergency: "Know the location of nearest hospital/clinic",
            icon: <Ambulance className="w-6 h-6" />,
            color: "bg-red-100",
            textColor: "text-red-600",
            saves: 1876,
            readTime: "6 min read",
            image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&q=80&w=800"
        }
    ];

    const emergencyContacts = [
        { country: "Philippines", police: "117", ambulance: "117", fire: "160", universal: "911" },
        { country: "USA", police: "911", ambulance: "911", fire: "911", universal: "911" },
        { country: "Japan", police: "110", ambulance: "119", fire: "119", universal: "911" },
        { country: "Thailand", police: "191", ambulance: "1669", fire: "199", universal: "911" },
        { country: "Singapore", police: "999", ambulance: "995", fire: "995", universal: "911" }
    ];

    const filteredTips = safetyTips.filter(tip => {
        const matchesSearch = tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            tip.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            tip.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            tip.subcategory.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || tip.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const toggleSave = (tipId) => {
        if (savedTips.includes(tipId)) {
            setSavedTips(savedTips.filter(id => id !== tipId));
        } else {
            setSavedTips([...savedTips, tipId]);
        }
    };

    const getPriorityColor = (priority) => {
        switch(priority) {
            case 'Critical': return 'bg-red-500 text-white';
            case 'High': return 'bg-orange-500 text-white';
            case 'Medium': return 'bg-yellow-500 text-white';
            case 'Low': return 'bg-green-500 text-white';
            default: return 'bg-gray-500 text-white';
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
            <Navbar />

            {/* Emergency Mode Banner - Shows when emergency mode is active */}
            {emergencyMode && (
                <div className="fixed top-20 left-0 right-0 z-50 bg-red-600 text-white py-3 px-5 animate-pulse">
                    <div className="max-w-[1200px] mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <AlertTriangle className="w-6 h-6" />
                            <span className="font-black">EMERGENCY MODE ACTIVE</span>
                        </div>
                        <div className="flex items-center gap-6">
                            <span className="text-sm">PHILIPPINES: 911</span>
                            <span className="text-sm">POLICE: 117</span>
                            <button 
                                onClick={() => setEmergencyMode(false)}
                                className="px-4 py-1.5 bg-white text-red-600 font-bold rounded-full text-sm hover:bg-red-100"
                            >
                                DISABLE
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <section className="relative pt-32 pb-24 px-5 bg-gradient-to-r from-[#8B1E3F] to-[#5C1329] overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-red-500 rounded-full filter blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500 rounded-full filter blur-3xl"></div>
                </div>
                
                <div className="max-w-[1200px] mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-[#ffcc00] text-sm font-bold mb-6 backdrop-blur-sm">
                        <ShieldCheck className="w-4 h-4" /> YOUR SAFETY COMES FIRST
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
                        Travel <span className="text-[#ffcc00] drop-shadow-lg">Safe</span>
                    </h1>
                    <p className="text-gray-200 text-lg max-w-2xl mx-auto mb-10">
                        Essential safety tips, emergency contacts, and survival strategies 
                        for worry-free travel around the world.
                    </p>
                    
                    {/* Emergency Button and Search */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-3xl mx-auto">
                        <button 
                            onClick={() => setEmergencyMode(true)}
                            className="px-8 py-6 bg-red-600 text-white font-black rounded-2xl hover:bg-red-700 transition-all flex items-center gap-3 shadow-2xl text-lg"
                        >
                            <AlertTriangle className="w-6 h-6" />
                            EMERGENCY MODE
                        </button>
                        
                        <div className="relative flex-grow">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search safety tips..."
                                className="w-full pl-14 pr-6 py-6 rounded-2xl border-2 border-white/20 bg-white/95 backdrop-blur focus:bg-white focus:border-[#ffcc00] focus:ring-4 focus:ring-[#ffcc00]/20 transition-all text-lg shadow-2xl"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex justify-center gap-8 md:gap-16 mt-12">
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-black text-white">24/7</div>
                            <div className="text-sm text-gray-300">Emergency Support</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-black text-white">{safetyTips.length}+</div>
                            <div className="text-sm text-gray-300">Safety Guides</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-black text-white">9.8/10</div>
                            <div className="text-sm text-gray-300">Safety Rating</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Emergency Contacts Banner */}
            <section className="bg-red-600 py-4 px-5 text-white overflow-x-auto">
                <div className="max-w-[1200px] mx-auto flex items-center gap-8 justify-between min-w-max">
                    <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5" />
                        <span className="font-black text-sm">EMERGENCY HOTLINES:</span>
                    </div>
                    {emergencyContacts.map((contact, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-sm">
                            <span className="font-bold">{contact.country}:</span>
                            <span className="bg-white/20 px-2 py-1 rounded font-mono">{contact.police}</span>
                            <span className="bg-white/20 px-2 py-1 rounded font-mono">{contact.ambulance}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Main Content */}
            <main className="max-w-[1200px] w-full mx-auto px-5 py-16 flex-grow">
                {/* Header with Filters */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <span className="text-[#ffcc00] font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                            <Shield className="w-4 h-4" /> STAY PROTECTED
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-[#2d3436] mt-2">Essential Safety Tips</h2>
                        <p className="text-gray-500 mt-2">
                            {filteredTips.length} verified safety guides • Updated weekly
                        </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                        <button 
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ffcc00] to-[#ffd700] text-[#2d3436] font-bold rounded-xl hover:shadow-lg transition-all"
                        >
                            <Filter className="w-5 h-5" /> Categories
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
                                    className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                                        selectedCategory === cat 
                                        ? 'bg-[#ffcc00] text-[#2d3436] shadow-md scale-105' 
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Safety Tips Grid */}
                {filteredTips.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredTips.map((tip) => (
                            <div 
                                key={tip.id} 
                                className="group bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                            >
                                {/* Image Section */}
                                <div className="relative h-48 overflow-hidden">
                                    <img 
                                        src={tip.image} 
                                        alt={tip.title} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                    
                                    {/* Priority Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className={`px-4 py-1.5 rounded-full text-xs font-black shadow-lg ${getPriorityColor(tip.priority)}`}>
                                            {tip.priority.toUpperCase()}
                                        </span>
                                    </div>

                                    {/* Save Button */}
                                    <button 
                                        onClick={() => toggleSave(tip.id)}
                                        className="absolute top-4 right-4 p-2.5 bg-white/95 backdrop-blur rounded-full hover:scale-110 transition-all shadow-lg"
                                    >
                                        <Shield 
                                            className={`w-4 h-4 ${
                                                savedTips.includes(tip.id) 
                                                ? 'fill-[#ffcc00] text-[#ffcc00]' 
                                                : 'text-gray-600'
                                            }`} 
                                        />
                                    </button>

                                    {/* Category Icon */}
                                    <div className="absolute bottom-4 left-4">
                                        <div className={`p-2.5 ${tip.color} rounded-xl shadow-lg`}>
                                            {tip.icon}
                                        </div>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
                                            {tip.category}
                                        </span>
                                        <span className="text-xs text-gray-400 flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> {tip.readTime}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-black text-[#2d3436] mb-2 group-hover:text-[#ffcc00] transition-colors line-clamp-2">
                                        {tip.title}
                                    </h3>
                                    
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                        {tip.description}
                                    </p>

                                    {/* Emergency Contact Preview */}
                                    <div className="bg-red-50 p-4 rounded-xl mb-4 border-l-4 border-red-500">
                                        <p className="text-xs font-bold text-red-600 mb-1 flex items-center gap-1">
                                            <AlertCircle className="w-3 h-3" /> EMERGENCY
                                        </p>
                                        <p className="text-sm font-bold text-gray-700">{tip.emergency}</p>
                                    </div>

                                    {/* Quick Tips Preview */}
                                    <div className="bg-gray-50 p-4 rounded-xl mb-4">
                                        <p className="text-xs font-bold text-gray-500 mb-2 flex items-center gap-1">
                                            <CheckCircle className="w-3 h-3 text-green-500" /> QUICK SAFETY TIPS
                                        </p>
                                        <ul className="space-y-1.5">
                                            {tip.tips.slice(0, 2).map((t, idx) => (
                                                <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                                                    <span className="text-[#ffcc00] font-bold">•</span>
                                                    {t}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Engagement */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-1">
                                                <Users className="w-4 h-4 text-gray-400" />
                                                <span className="text-xs font-bold text-gray-600">{tip.saves.toLocaleString()}</span>
                                            </div>
                                            <span className="text-gray-300">•</span>
                                            <div className="flex items-center gap-1">
                                                <ShieldCheck className="w-4 h-4 text-green-500" />
                                                <span className="text-xs font-bold text-gray-600">Verified</span>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => setSelectedTip(tip)}
                                            className="p-2 bg-gray-100 rounded-lg group-hover:bg-[#ffcc00] transition-all group-hover:scale-110"
                                        >
                                            <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-lg">
                        <ShieldAlert className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                        <h3 className="text-2xl font-black text-gray-700 mb-3">No safety tips found</h3>
                        <p className="text-gray-500 mb-8">Try adjusting your search or category filter</p>
                        <button 
                            onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                            className="px-8 py-4 bg-[#ffcc00] text-[#2d3436] font-bold rounded-xl hover:bg-[#ffd700] transition-all"
                        >
                            View All Tips
                        </button>
                    </div>
                )}

                {/* Safety Pledge Section */}
                <section className="mt-20 bg-gradient-to-r from-[#8B1E3F] to-[#5C1329] rounded-[3rem] p-12 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-20 -mb-20"></div>
                    
                    <div className="relative z-10 text-center max-w-3xl mx-auto">
                        <ShieldCheck className="w-16 h-16 mx-auto mb-6 text-[#ffcc00]" />
                        <h2 className="text-3xl md:text-4xl font-black mb-4">Take the Safety Pledge</h2>
                        <p className="text-gray-200 text-lg mb-8">
                            I commit to prioritizing my safety and the safety of others while traveling. 
                            I will stay informed, prepared, and vigilant wherever I go.
                        </p>
                        <button className="px-10 py-5 bg-[#ffcc00] text-[#2d3436] font-black rounded-2xl hover:bg-[#ffd700] hover:scale-105 transition-all text-lg">
                            I PLEDGE TO TRAVEL SAFELY
                        </button>
                    </div>
                </section>
            </main>

            {/* Modal */}
            {selectedTip && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 animate-fadeIn">
                    <div className="absolute inset-0 bg-[#2d3436]/95 backdrop-blur-md" onClick={() => setSelectedTip(null)}></div>
                    
                    <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl animate-slideUp">
                        <button 
                            onClick={() => setSelectedTip(null)} 
                            className="absolute top-6 right-6 z-20 p-3 bg-white/20 hover:bg-red-500 hover:text-white backdrop-blur-sm rounded-full transition-all group"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            {/* Modal Image */}
                            <div className="relative h-[300px] lg:h-full min-h-[400px]">
                                <img 
                                    src={selectedTip.image} 
                                    alt={selectedTip.title} 
                                    className="w-full h-full object-cover" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                                
                                <div className="absolute bottom-6 left-6">
                                    <span className={`px-4 py-2 rounded-full text-xs font-black shadow-lg mb-3 inline-block ${getPriorityColor(selectedTip.priority)}`}>
                                        {selectedTip.priority.toUpperCase()} PRIORITY
                                    </span>
                                    <div className={`p-3 ${selectedTip.color} rounded-xl shadow-lg inline-block`}>
                                        {selectedTip.icon}
                                    </div>
                                </div>
                            </div>

                            {/* Modal Details */}
                            <div className="p-8 lg:p-10">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-sm font-bold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
                                        {selectedTip.category}
                                    </span>
                                    <span className="text-xs text-gray-400">{selectedTip.subcategory}</span>
                                </div>

                                <h2 className="text-3xl lg:text-4xl font-black text-[#2d3436] mb-4">
                                    {selectedTip.title}
                                </h2>

                                {/* Emergency Box */}
                                <div className="bg-red-600 text-white p-5 rounded-2xl mb-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <AlertTriangle className="w-5 h-5" />
                                        <span className="font-black">EMERGENCY CONTACT</span>
                                    </div>
                                    <p className="text-xl font-bold">{selectedTip.emergency}</p>
                                </div>

                                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                    {selectedTip.longDescription}
                                </p>

                                {/* Detailed Tips */}
                                <div className="bg-gray-50 p-6 rounded-2xl mb-6">
                                    <h3 className="font-black text-[#2d3436] mb-4 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-600" /> ESSENTIAL TIPS
                                    </h3>
                                    <ul className="space-y-3">
                                        {selectedTip.tips.map((tip, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-sm">
                                                <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-xs">
                                                    {idx + 1}
                                                </span>
                                                <span className="text-gray-700">{tip}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="flex gap-4">
                                    <button className="flex-1 py-4 bg-[#ffcc00] text-[#2d3436] font-black rounded-xl hover:bg-[#ffd700] transition-all active:scale-95">
                                        SAVE TO SAFETY KIT
                                    </button>
                                    <button className="p-4 border-2 border-gray-200 rounded-xl hover:border-[#ffcc00] transition-all">
                                        <Share2 className="w-5 h-5 text-gray-500" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
    `   </div>
            )}

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Safety;