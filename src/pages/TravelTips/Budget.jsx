import React, { useState } from 'react';
import Navbar from '../../layout/Navbar';
import Footer from '../../layout/Footer';
import { 
    DollarSign, Wallet, PiggyBank, TrendingDown, CreditCard, 
    Coffee, Plane, Hotel, MapPin, Utensils, Car, Camera, 
    ShoppingBag, Gift, Search, Filter, ChevronDown, ChevronRight,
    CheckCircle, AlertCircle, BookOpen, Users, Compass, Star,
    ThumbsUp, Calendar, Clock, Award, Heart, Share2, X
} from 'lucide-react';

const Badget = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedTip, setSelectedTip] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const [likedTips, setLikedTips] = useState([]);
    const [savedAmount, setSavedAmount] = useState(0);

    const categories = [
        'All', 'Transportation', 'Accommodation', 'Food', 
        'Activities', 'Shopping', 'Packing', 'General'
    ];

    const budgetTips = [
        {
            id: 1,
            title: "Book Flights on Tuesday Afternoon",
            category: "Transportation",
            subcategory: "Flights",
            savings: "₱1,500 - ₱3,000",
            description: "Airlines often release discounted fares on Tuesday afternoons. Avoid weekend bookings when prices are typically 20-30% higher.",
            longDescription: "Studies show that Tuesday afternoons (specifically 3 PM EST) are when airlines release their sales and competitors match prices. Wednesday is also good, but avoid Friday-Sunday when leisure travelers drive up prices.",
            tips: [
                "Use incognito mode when searching",
                "Clear your browser cookies",
                "Compare prices across at least 3 platforms",
                "Set price alerts on Google Flights"
            ],
            icon: <Plane className="w-6 h-6" />,
            color: "bg-blue-100",
            textColor: "text-blue-600",
            likes: 2341,
            readTime: "3 min read",
            difficulty: "Easy",
            image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 2,
            title: "Stay in Hostels with Free Breakfast",
            category: "Accommodation",
            subcategory: "Hostels",
            savings: "₱500 - ₱1,200/day",
            description: "Choose hostels that include free breakfast. You'll save ₱300-500 daily on food alone.",
            longDescription: "Free breakfast can save you ₱500+ per day. Look for hostels that offer more than just bread and coffee - some include eggs, fruits, and cereal. This also saves time searching for breakfast spots.",
            tips: [
                "Check Hostelworld and Booking.com reviews",
                "Look for 'included breakfast' filter",
                "Contact hostel directly for long-stay discounts",
                "Consider hostels with kitchen access"
            ],
            icon: <Hotel className="w-6 h-6" />,
            color: "bg-purple-100",
            textColor: "text-purple-600",
            likes: 1876,
            readTime: "4 min read",
            difficulty: "Easy",
            image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 3,
            title: "Eat Where Locals Eat",
            category: "Food",
            subcategory: "Dining",
            savings: "₱200 - ₱500/meal",
            description: "Avoid tourist trap restaurants. Eat at carinderias, local markets, and street food stalls.",
            longDescription: "Tourist restaurants mark up prices 3-5x. Follow locals to small eateries, wet markets, and food courts. Not only cheaper but more authentic. In Southeast Asia, street food is often safer and cleaner than restaurants.",
            tips: [
                "Look for long queues of locals",
                "Visit public markets for lunch",
                "Use food delivery apps for local spots",
                "Ask hotel staff for their favorite carinderia"
            ],
            icon: <Utensils className="w-6 h-6" />,
            color: "bg-orange-100",
            textColor: "text-orange-600",
            likes: 3210,
            readTime: "5 min read",
            difficulty: "Easy",
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 4,
            title: "Use Public Transport Like a Pro",
            category: "Transportation",
            subcategory: "Local Transport",
            savings: "₱300 - ₱800/day",
            description: "Master the local transport system. Avoid taxis and Grab during peak hours.",
            longDescription: "Jeepneys, buses, and trains are 80% cheaper than ride-hailing apps. In Manila, a jeepney ride costs ₱13 vs Grab's ₱150+ minimum. Learn routes using Google Maps or ask locals.",
            tips: [
                "Buy reloadable transport cards",
                "Avoid commuting 7-9 AM and 5-8 PM",
                "Walk 15 mins instead of short rides",
                "Share rides with fellow travelers"
            ],
            icon: <Car className="w-6 h-6" />,
            color: "bg-green-100",
            textColor: "text-green-600",
            likes: 1543,
            readTime: "4 min read",
            difficulty: "Moderate",
            image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 5,
            title: "Free Walking Tours",
            category: "Activities",
            subcategory: "Tours",
            savings: "₱800 - ₱1,500/tour",
            description: "Join free walking tours in major cities. Tip only what you can afford.",
            longDescription: "Free walking tours operate on tip-based model. You get 2-3 hours of expert local knowledge for any amount you want to pay. Available in Manila, Vigan, Cebu, and many Asian cities.",
            tips: [
                "Book online in advance",
                "Tip ₱200-500 if you enjoyed it",
                "Ask for restaurant recommendations",
                "Combine with food tour spots"
            ],
            icon: <MapPin className="w-6 h-6" />,
            color: "bg-red-100",
            textColor: "text-red-600",
            likes: 987,
            readTime: "3 min read",
            difficulty: "Easy",
            image: "https://images.unsplash.com/photo-1551632811-561732d353eb?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 6,
            title: "Pack Light, Avoid Checked Bag Fees",
            category: "Packing",
            subcategory: "Luggage",
            savings: "₱800 - ₱2,000/flight",
            description: "Master the art of carry-on only packing. Avoid checked baggage fees.",
            longDescription: "Most budget airlines charge ₱800-2,000 for checked bags. Learn to pack 7-10 days in a carry-on. Use packing cubes, roll clothes, and wear your heaviest items on the plane.",
            tips: [
                "Use 3-1-1 liquids rule",
                "Choose quick-dry fabrics",
                "Wear jacket with large pockets",
                "Limit shoes to 2-3 pairs"
            ],
            icon: <ShoppingBag className="w-6 h-6" />,
            color: "bg-indigo-100",
            textColor: "text-indigo-600",
            likes: 2134,
            readTime: "6 min read",
            difficulty: "Moderate",
            image: "https://images.unsplash.com/photo-1586395006135-3b79c7f6a7a8?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 7,
            title: "Travel During Shoulder Season",
            category: "General",
            subcategory: "Timing",
            savings: "30-50% on everything",
            description: "Book trips between peak and off-peak seasons. Best weather, lowest prices.",
            longDescription: "Shoulder season (April-May, October-November in PH) offers 30-50% discounts on flights and hotels. You avoid crowds but still get good weather. Research destination-specific shoulder months.",
            tips: [
                "Book 2-3 months in advance",
                "Check school vacation calendars",
                "Follow airlines for flash sales",
                "Consider weekday travel"
            ],
            icon: <Calendar className="w-6 h-6" />,
            color: "bg-yellow-100",
            textColor: "text-yellow-600",
            likes: 3456,
            readTime: "4 min read",
            difficulty: "Easy",
            image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 8,
            title: "Student Discounts Everywhere",
            category: "General",
            subcategory: "Discounts",
            savings: "10-50% off",
            description: "Always carry your student ID. Many attractions offer 50% off for students.",
            longDescription: "Even if you graduated, some places accept old IDs. Museums, historical sites, and some restaurants offer student discounts. International Student Identity Card (ISIC) works globally.",
            tips: [
                "Get ISIC card for international travel",
                "Ask before buying tickets",
                "Check website for student rates",
                "Some airlines have student fares"
            ],
            icon: <BookOpen className="w-6 h-6" />,
            color: "bg-pink-100",
            textColor: "text-pink-600",
            likes: 1876,
            readTime: "2 min read",
            difficulty: "Easy",
            image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 9,
            title: "Cook Your Own Meals",
            category: "Food",
            subcategory: "Self-Catering",
            savings: "₱400 - ₱800/day",
            description: "Book accommodations with kitchen. Cook breakfast and some dinners.",
            longDescription: "Airbnbs and hostels with kitchen access save you ₱400-800 daily. Visit local markets for fresh ingredients. Cook big batches for multiple meals. Great for dietary restrictions too.",
            tips: [
                "Filter 'kitchen' on Booking/Airbnb",
                "Visit markets 30 mins before closing",
                "Cook with other travelers",
                "Bring reusable containers"
            ],
            icon: <Coffee className="w-6 h-6" />,
            color: "bg-amber-100",
            textColor: "text-amber-600",
            likes: 1432,
            readTime: "5 min read",
            difficulty: "Moderate",
            image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&q=80&w=800"
        }
    ];

    const savingsTracker = [
        { month: "Jan", saved: 3400 },
        { month: "Feb", saved: 4200 },
        { month: "Mar", saved: 3800 },
        { month: "Apr", saved: 5100 },
        { month: "May", saved: 6300 },
        { month: "Jun", saved: 5900 }
    ];

    const filteredTips = budgetTips.filter(tip => {
        const matchesSearch = tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            tip.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            tip.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            tip.subcategory.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || tip.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const toggleLike = (tipId) => {
        if (likedTips.includes(tipId)) {
            setLikedTips(likedTips.filter(id => id !== tipId));
        } else {
            setLikedTips([...likedTips, tipId]);
        }
    };

    const calculateTotalSavings = () => {
        const total = savingsTracker.reduce((acc, curr) => acc + curr.saved, 0);
        return total.toLocaleString();
    };

    const getDifficultyColor = (difficulty) => {
        switch(difficulty) {
            case 'Easy': return 'bg-green-100 text-green-700';
            case 'Moderate': return 'bg-yellow-100 text-yellow-700';
            case 'Hard': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-24 px-5 bg-gradient-to-r from-[#0B4F3C] to-[#1C6E4F] overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-[#ffcc00] rounded-full filter blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-500 rounded-full filter blur-3xl"></div>
                </div>
                
                <div className="max-w-[1200px] mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-[#ffcc00] text-sm font-bold mb-6 backdrop-blur-sm">
                        <PiggyBank className="w-4 h-4" /> SAVE MONEY, TRAVEL MORE
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
                        Smart <span className="text-[#ffcc00] drop-shadow-lg">Budget</span> Tips
                    </h1>
                    <p className="text-gray-200 text-lg max-w-2xl mx-auto mb-10">
                        Expert advice to stretch your travel budget further. 
                        Save thousands on flights, accommodation, food, and activities.
                    </p>
                    
                    {/* Search Bar */}
                    <div className="relative max-w-3xl mx-auto">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search budget tips, categories, or destinations..."
                            className="w-full pl-14 pr-40 py-6 rounded-2xl border-2 border-white/20 bg-white/95 backdrop-blur focus:bg-white focus:border-[#ffcc00] focus:ring-4 focus:ring-[#ffcc00]/20 transition-all text-lg shadow-2xl"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="absolute right-3 top-1/2 -translate-y-1/2 px-8 py-3 bg-[#ffcc00] text-[#2d3436] font-bold rounded-xl hover:bg-[#ffd700] transition-all flex items-center gap-2 shadow-lg">
                            <Search className="w-5 h-5" /> Search
                        </button>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex justify-center gap-8 md:gap-16 mt-12">
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-black text-white">₱{calculateTotalSavings()}+</div>
                            <div className="text-sm text-gray-300">Average Savings</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-black text-white">{budgetTips.length}+</div>
                            <div className="text-sm text-gray-300">Money-Saving Tips</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-black text-white">9/10</div>
                            <div className="text-sm text-gray-300">Travelers Recommend</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Savings Tracker Banner */}
            <section className="py-8 px-5 bg-white border-b border-gray-200">
                <div className="max-w-[1200px] mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-[#ffcc00]/10 rounded-2xl">
                                <TrendingDown className="w-8 h-8 text-[#ffcc00]" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">You can save</p>
                                <p className="text-3xl md:text-4xl font-black text-[#2d3436]">₱{calculateTotalSavings()}</p>
                                <p className="text-sm text-gray-500">in 6 months using these tips</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="flex -space-x-2">
                                {[1,2,3,4].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ffcc00] to-[#ffd700] border-2 border-white flex items-center justify-center font-bold text-sm text-[#2d3436]">
                                        {String.fromCharCode(64 + i)}
                                    </div>
                                ))}
                            </div>
                            <div className="text-left">
                                <p className="text-sm font-bold text-gray-700">Join 25,000+ budget travelers</p>
                                <p className="text-xs text-gray-500">Already saving on their trips</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <main className="max-w-[1200px] w-full mx-auto px-5 py-16 flex-grow">
                {/* Header with Filters */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <span className="text-[#ffcc00] font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                            <Wallet className="w-4 h-4" /> TRAVEL HACKS
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-[#2d3436] mt-2">Money-Saving Tips</h2>
                        <p className="text-gray-500 mt-2">
                            {filteredTips.length} proven ways to save • Updated weekly
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

                {/* Budget Tips Grid */}
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
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                                    
                                    {/* Savings Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className="flex items-center gap-1.5 bg-white/95 backdrop-blur px-4 py-2 rounded-full text-xs font-black text-[#2d3436] shadow-lg">
                                            <DollarSign className="w-3 h-3" /> SAVE {tip.savings}
                                        </span>
                                    </div>

                                    {/* Like Button */}
                                    <button 
                                        onClick={() => toggleLike(tip.id)}
                                        className="absolute top-4 right-4 p-2.5 bg-white/95 backdrop-blur rounded-full hover:scale-110 transition-all shadow-lg"
                                    >
                                        <Heart 
                                            className={`w-4 h-4 ${
                                                likedTips.includes(tip.id) 
                                                ? 'fill-red-500 text-red-500' 
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
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${getDifficultyColor(tip.difficulty)}`}>
                                            {tip.difficulty}
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

                                    {/* Category Tag */}
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className={`text-xs font-bold ${tip.textColor} bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100`}>
                                            {tip.category}
                                        </span>
                                        <span className="text-xs text-gray-400">•</span>
                                        <span className="text-xs text-gray-500">{tip.subcategory}</span>
                                    </div>

                                    {/* Quick Tips Preview */}
                                    <div className="bg-gray-50 p-4 rounded-xl mb-4">
                                        <p className="text-xs font-bold text-gray-500 mb-2 flex items-center gap-1">
                                            <CheckCircle className="w-3 h-3 text-green-500" /> QUICK WINS
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

                                    {/* Author & Engagement */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-1">
                                                <ThumbsUp className="w-4 h-4 text-gray-400" />
                                                <span className="text-xs font-bold text-gray-600">{tip.likes.toLocaleString()}</span>
                                            </div>
                                            <span className="text-gray-300">•</span>
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 text-[#ffcc00] fill-[#ffcc00]" />
                                                <span className="text-xs font-bold text-gray-600">4.9</span>
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
                        <PiggyBank className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                        <h3 className="text-2xl font-black text-gray-700 mb-3">No budget tips found</h3>
                        <p className="text-gray-500 mb-8">Try adjusting your search or category filter</p>
                        <button 
                            onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                            className="px-8 py-4 bg-[#ffcc00] text-[#2d3436] font-bold rounded-xl hover:bg-[#ffd700] transition-all"
                        >
                            View All Tips
                        </button>
                    </div>
                )}
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
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                
                                <div className="absolute bottom-6 left-6">
                                    <div className={`p-3 ${selectedTip.color} rounded-xl shadow-lg inline-block mb-3`}>
                                        {selectedTip.icon}
                                    </div>
                                    <span className="flex items-center gap-2 px-4 py-2 bg-white/95 backdrop-blur rounded-full text-sm font-bold text-[#2d3436]">
                                        Save {selectedTip.savings}
                                    </span>
                                </div>
                            </div>

                            {/* Modal Details */}
                            <div className="p-8 lg:p-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${getDifficultyColor(selectedTip.difficulty)}`}>
                                        {selectedTip.difficulty}
                                    </span>
                                    <span className="text-xs text-gray-400 flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> {selectedTip.readTime}
                                    </span>
                                </div>

                                <h2 className="text-3xl lg:text-4xl font-black text-[#2d3436] mb-4">
                                    {selectedTip.title}
                                </h2>

                                <div className="flex items-center gap-4 mb-6">
                                    <span className="text-sm font-bold text-gray-700 bg-gray-100 px-4 py-2 rounded-full">
                                        {selectedTip.category}
                                    </span>
                                    <span className="text-sm text-gray-500">•</span>
                                    <span className="text-sm text-gray-600">{selectedTip.subcategory}</span>
                                </div>

                                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                    {selectedTip.longDescription}
                                </p>

                                {/* Pro Tips */}
                                <div className="bg-gradient-to-r from-[#ffcc00]/10 to-transparent p-6 rounded-2xl border border-[#ffcc00]/20 mb-6">
                                    <h3 className="font-black text-[#2d3436] mb-3 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-[#ffcc00]" /> PRO TIPS
                                    </h3>
                                    <ul className="space-y-3">
                                        {selectedTip.tips.map((tip, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-sm">
                                                <span className="w-5 h-5 bg-[#ffcc00] rounded-full flex items-center justify-center text-white font-bold text-xs">
                                                    {idx + 1}
                                                </span>
                                                <span className="text-gray-700">{tip}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Savings Calculator */}
                                <div className="bg-gray-900 text-white p-6 rounded-2xl mb-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-sm font-bold text-gray-400">Potential Savings</span>
                                        <span className="text-xs px-3 py-1 bg-green-500 rounded-full">per trip</span>
                                    </div>
                                    <p className="text-4xl font-black text-[#ffcc00]">{selectedTip.savings}</p>
                                    <p className="text-xs text-gray-400 mt-2">Based on average traveler usage</p>
                                </div>

                                <div className="flex gap-4">
                                    <button className="flex-1 py-4 bg-[#ffcc00] text-[#2d3436] font-black rounded-xl hover:bg-[#ffd700] transition-all active:scale-95">
                                        SAVE THIS TIP
                                    </button>
                                    <button className="p-4 border-2 border-gray-200 rounded-xl hover:border-[#ffcc00] transition-all">
                                        <Share2 className="w-5 h-5 text-gray-500" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Newsletter Section */}
            <section className="bg-gradient-to-br from-[#0B4F3C] to-[#1C6E4F] py-20 px-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-20 -mb-20"></div>
                
                <div className="max-w-[1200px] mx-auto text-center relative z-10">
                    <span className="text-[#ffcc00] font-bold text-sm uppercase tracking-wider mb-4 block">Budget Travel Newsletter</span>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                        Get Weekly Money-Saving Tips
                    </h2>
                    <p className="text-gray-200 font-medium text-lg mb-8 max-w-2xl mx-auto">
                        Join 25,000+ travelers saving thousands on flights, hotels, and experiences every month.
                    </p>
                    
                    <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
                        <input 
                            type="email" 
                            placeholder="Your email address" 
                            className="px-8 py-5 rounded-2xl border-2 border-white/20 focus:border-[#ffcc00] focus:outline-none shadow-xl flex-grow text-lg bg-white/95 backdrop-blur"
                            required
                        />
                        <button className="px-10 py-5 bg-[#ffcc00] text-[#2d3436] font-black rounded-2xl hover:bg-[#ffd700] hover:scale-105 transition-all shadow-xl whitespace-nowrap">
                            SUBSCRIBE FREE
                        </button>
                    </form>
                    
                    <p className="text-xs text-gray-300 mt-6">
                        No spam, only travel hacks. Unsubscribe anytime.
                    </p>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Badget;