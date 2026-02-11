import React, { useState } from 'react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer'; // <-- Import Footer component
import { BookOpen, Users, Star, ChevronRight, Search, Map, ShieldCheck, Compass, Clock, ThumbsUp, Award } from 'lucide-react';

const Guide = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [email, setEmail] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const travelGuides = [
        {
            id: 1,
            title: "First-Timer's Guide to Palawan",
            author: "Maria Santos",
            category: "Beginner",
            rating: 4.9,
            readTime: "10 min read",
            likes: 1243,
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800",
            tips: ["Visit during dry season (Nov-May)", "Book island hopping in advance", "Try local kare-kare"]
        },
        {
            id: 2,
            title: "Exploring the Highlands of Sagada",
            author: "James Wilson",
            category: "Adventure",
            rating: 4.8,
            readTime: "15 min read",
            likes: 987,
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800",
            tips: ["Hanging Coffin early morning", "Try Sagada oranges", "Bring warm clothes"]
        },
        {
            id: 3,
            title: "Essential Cultural Etiquette in Japan",
            author: "Yuki Tanaka",
            category: "Culture",
            rating: 5.0,
            readTime: "12 min read",
            likes: 2156,
            image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800",
            tips: ["Remove shoes indoors", "Don't tip service staff", "Bow properly"]
        },
        {
            id: 4,
            title: "Bali on a Budget: Backpacker's Paradise",
            author: "Sarah Chen",
            category: "Beginner",
            rating: 4.7,
            readTime: "20 min read",
            likes: 876,
            image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800",
            tips: ["Stay in Canggu for budget options", "Eat at local warungs", "Use Gojek for transport"]
        },
        {
            id: 5,
            title: "Himalayan Trek: Annapurna Circuit",
            author: "Michael Roberts",
            category: "Adventure",
            rating: 4.9,
            readTime: "25 min read",
            likes: 1543,
            image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800",
            tips: ["Acclimatize properly", "Hire local guide", "Pack layers for temperature"]
        },
        {
            id: 6,
            title: "Street Food Secrets of Bangkok",
            author: "Somchai Prasert",
            category: "Culture",
            rating: 5.0,
            readTime: "18 min read",
            likes: 1892,
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800",
            tips: ["Try Pad Thai at Thip Samai", "Visit Chatuchak market", "Evening food tours best"]
        }
    ];

    const quickTips = [
        { icon: <Map className="text-blue-500" size={24} />, title: "Itineraries", desc: "Day-by-day plans for any budget", tip: "Always add buffer time for unexpected discoveries" },
        { icon: <ShieldCheck className="text-green-500" size={24} />, title: "Travel Safety", desc: "Local laws, scams & health tips", tip: "Register with embassy for long trips" },
        { icon: <Users className="text-purple-500" size={24} />, title: "Local Tips", desc: "Speak like a local, save money", tip: "Learn 5 key phrases before arrival" },
        { icon: <Clock className="text-orange-500" size={24} />, title: "Best Time", desc: "Seasonal guides & festivals", tip: "Avoid peak season for better rates" },
        { icon: <Award className="text-red-500" size={24} />, title: "Hidden Gems", desc: "Secret spots locals love", tip: "Ask hostel staff for favorites" },
        { icon: <BookOpen className="text-indigo-500" size={24} />, title: "Packing Tips", desc: "Weather-specific essentials", tip: "Roll clothes, not fold" }
    ];

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email && email.includes('@')) {
            setSubscribed(true);
            setEmail('');
            setTimeout(() => setSubscribed(false), 3000);
        }
    };

    const filteredGuides = travelGuides.filter(guide => 
        (activeTab === 'all' ? true : guide.category.toLowerCase() === activeTab.toLowerCase()) &&
        (searchTerm === '' ? true : 
            guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            guide.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            guide.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
            <Navbar />

            {/* Hero Section with Search */}
            <header className="relative pt-32 pb-24 px-5 bg-gradient-to-r from-[#1a2634] to-[#2d3436] text-white overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="max-w-[1200px] mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-[#ffcc00] text-sm font-bold mb-6 hover:bg-white/20 transition-all">
                        <Compass className="w-4 h-4" /> 50+ DESTINATIONS COVERED
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
                        Travel <span className="text-[#ffcc00] drop-shadow-lg">Guides</span>
                    </h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10">
                        Expert advice, local secrets, and step-by-step itineraries from travelers who've been there.
                    </p>
                    
                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto flex gap-3 bg-white p-1 rounded-2xl shadow-2xl">
                        <div className="flex-grow flex items-center px-4">
                            <Search className="w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search destinations, guides, or tips..."
                                className="w-full px-3 py-4 text-gray-800 placeholder-gray-400 focus:outline-none"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button className="px-8 py-4 bg-[#ffcc00] text-[#2d3436] font-bold rounded-xl hover:bg-[#ffd700] transition-all flex items-center gap-2">
                            <Search className="w-5 h-5" /> Search
                        </button>
                    </div>
                </div>
            </header>

            {/* Quick Tips Grid - Interactive */}
            <section className="py-16 px-5 bg-white">
                <div className="max-w-[1200px] mx-auto">
                    <div className="text-center mb-12">
                        <span className="text-[#ffcc00] font-bold text-sm uppercase tracking-wider">Essential Knowledge</span>
                        <h2 className="text-3xl md:text-4xl font-black text-[#2d3436] mt-2">Smart Travel Tips</h2>
                        <p className="text-gray-500 mt-2">Verified advice from our community of travelers</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {quickTips.map((item, i) => (
                            <div 
                                key={i} 
                                className="group bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#ffcc00] relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-20 h-20 bg-[#ffcc00]/5 rounded-bl-full group-hover:bg-[#ffcc00]/10 transition-all"></div>
                                <div className="flex items-start gap-4">
                                    <div className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-md group-hover:scale-110 transition-all">
                                        {item.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-[#2d3436] text-lg mb-1">{item.title}</h3>
                                        <p className="text-sm text-gray-500 mb-3">{item.desc}</p>
                                        <div className="bg-[#ffcc00]/10 p-3 rounded-lg border-l-4 border-[#ffcc00]">
                                            <p className="text-xs font-semibold text-[#2d3436]">
                                                <span className="text-[#ffcc00]">💡</span> {item.tip}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content - Travel Guides */}
            <main className="max-w-[1200px] w-full mx-auto px-5 py-16 flex-grow">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <span className="text-[#ffcc00] font-bold text-sm uppercase tracking-wider">Read & Explore</span>
                        <h2 className="text-3xl md:text-4xl font-black text-[#2d3436] mt-2">Featured Guides</h2>
                        <p className="text-gray-500 mt-2 max-w-md">
                            {filteredGuides.length} guides available • Updated weekly
                        </p>
                    </div>
                    
                    {/* Category Filter with Active State */}
                    <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
                        {['all', 'Beginner', 'Adventure', 'Culture'].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveTab(cat.toLowerCase())}
                                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                                    activeTab === cat.toLowerCase() 
                                    ? 'bg-[#ffcc00] text-[#2d3436] shadow-lg scale-105' 
                                    : 'bg-white text-gray-500 border-2 border-gray-100 hover:border-[#ffcc00]'
                                }`}
                            >
                                {cat === 'all' ? 'ALL GUIDES' : cat.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Guides Grid - Dynamic */}
                {filteredGuides.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredGuides.map((guide) => (
                            <div 
                                key={guide.id} 
                                className="bg-white rounded-3xl overflow-hidden border border-gray-100 group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                            >
                                <div className="relative h-56 overflow-hidden">
                                    <img 
                                        src={guide.image} 
                                        alt={guide.title} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                                    <div className="absolute bottom-4 left-4">
                                        <span className="bg-[#ffcc00] text-[#2d3436] px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider shadow-lg">
                                            {guide.category}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="p-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-full">
                                            <Star className="w-4 h-4 fill-[#ffcc00] text-[#ffcc00]" />
                                            <span className="text-xs font-bold text-[#2d3436]">{guide.rating}</span>
                                        </div>
                                        <span className="text-gray-300">•</span>
                                        <span className="text-xs font-bold text-gray-400 flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> {guide.readTime}
                                        </span>
                                    </div>
                                    
                                    <h3 className="text-xl font-black text-[#2d3436] mb-4 group-hover:text-[#ffcc00] transition-colors line-clamp-2">
                                        {guide.title}
                                    </h3>

                                    {/* Quick Tips Preview */}
                                    <div className="mb-6 bg-gray-50 p-4 rounded-xl">
                                        <p className="text-xs font-bold text-gray-500 mb-2 flex items-center gap-1">
                                            <ThumbsUp className="w-3 h-3" /> PRO TIPS
                                        </p>
                                        <ul className="space-y-1">
                                            {guide.tips.slice(0, 2).map((tip, idx) => (
                                                <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                                                    <span className="text-[#ffcc00] font-bold">•</span>
                                                    {tip}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ffcc00] to-[#ffd700] flex items-center justify-center font-bold text-sm text-[#2d3436] shadow-md">
                                                {guide.author.charAt(0)}
                                            </div>
                                            <div>
                                                <span className="text-sm font-black text-gray-700 block">{guide.author}</span>
                                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                                    <ThumbsUp className="w-3 h-3" /> {guide.likes.toLocaleString()} readers
                                                </span>
                                            </div>
                                        </div>
                                        <button className="p-3 bg-gray-50 rounded-xl group-hover:bg-[#ffcc00] transition-all group-hover:scale-110">
                                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-gray-50 rounded-3xl">
                        <Compass className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-gray-600 mb-2">No guides found</h3>
                        <p className="text-gray-400">Try adjusting your search or filter</p>
                        <button 
                            onClick={() => { setActiveTab('all'); setSearchTerm(''); }}
                            className="mt-6 px-6 py-3 bg-[#ffcc00] text-[#2d3436] font-bold rounded-xl hover:bg-[#ffd700] transition-all"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}

                {/* Enhanced Newsletter Box */}
                <div className="mt-20 bg-gradient-to-br from-[#ffcc00] to-[#ffd700] rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-20 -mb-20"></div>
                    
                    <div className="max-w-lg relative z-10">
                        <span className="text-[#2d3436]/70 font-bold text-sm uppercase tracking-wider">Free Newsletter</span>
                        <h2 className="text-3xl md:text-4xl font-black text-[#2d3436] mb-4">
                            Get the Weekly Explorer Guide
                        </h2>
                        <p className="text-[#2d3436]/80 font-medium flex items-center gap-2">
                            <Users className="w-5 h-5" /> Join 15,000+ travelers receiving free itineraries every Sunday.
                        </p>
                    </div>
                    
                    <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-3 relative z-10">
                        <input 
                            type="email" 
                            placeholder="Your email address" 
                            className="flex-grow md:w-80 px-6 py-4 rounded-2xl border-2 border-white focus:border-[#2d3436] focus:outline-none shadow-lg"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button 
                            type="submit"
                            className="px-8 py-4 bg-[#2d3436] text-white font-black rounded-2xl hover:bg-black hover:scale-105 transition-all shadow-lg"
                        >
                            SUBSCRIBE
                        </button>
                    </form>
                    
                    {subscribed && (
                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-[#2d3436] text-white px-6 py-3 rounded-full text-sm font-bold shadow-xl animate-bounce">
                            ✅ Thanks for subscribing! Check your email.
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Guide;