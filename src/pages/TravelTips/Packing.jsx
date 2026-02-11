import React, { useState } from 'react';
import Navbar from '../../layout/Navbar';
import Footer from '../../layout/Footer';
import { 
    Luggage, Backpack, ShoppingBag, Briefcase, 
    Shirt, Footprints, Umbrella, Sun, Moon, 
    Battery, Smartphone, Wifi, Camera, Map,
    Droplet, Pill, Scissors, Watch, Glasses,
    Search, Filter, ChevronDown, ChevronRight, X,
    CheckCircle, AlertCircle, Info, Compass,
    ThumbsUp, Clock, Star, Share2, Plus, Minus,
    Calendar, Users, Weight, Thermometer, Wind,
    Cloud, Coffee, Gift, CreditCard, Key, Lock,
    FileText // <- MISSING IMPORT ITO
} from 'lucide-react';

const Packing = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedClimate, setSelectedClimate] = useState('All');
    const [selectedDuration, setSelectedDuration] = useState('All');
    const [showFilters, setShowFilters] = useState(false);
    const [packingList, setPackingList] = useState([]);
    const [checklist, setChecklist] = useState({});

    const categories = [
        'All', 'Clothing', 'Toiletries', 'Electronics', 
        'Documents', 'First Aid', 'Accessories', 'Miscellaneous'
    ];

    const climates = ['All', 'Tropical', 'Cold Weather', 'Urban', 'Beach', 'Mountain', 'Business'];
    const durations = ['All', 'Weekend (1-3 days)', 'Week (4-7 days)', 'Extended (8-14 days)', 'Long-term (15+ days)'];

    const packingItems = [
        {
            id: 1,
            name: "Passport and Visa",
            category: "Documents",
            climate: "All",
            essential: true,
            weight: "50g",
            notes: "Check expiration date. Make photocopies and store separately from originals.",
            tips: ["Carry in waterproof pouch", "Email digital copy to yourself", "Store in hotel safe"],
            icon: <Briefcase className="w-5 h-5" />,
            color: "bg-red-100",
            textColor: "text-red-600",
            image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 2,
            name: "Quick-Dry Towel",
            category: "Clothing",
            climate: "Tropical",
            essential: true,
            weight: "200g",
            notes: "Microfiber towels dry 3x faster than cotton and take minimal space.",
            tips: ["Buy dark colors to hide stains", "Hang immediately after use", "Great for beach trips"],
            icon: <Umbrella className="w-5 h-5" />,
            color: "bg-blue-100",
            textColor: "text-blue-600",
            image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 3,
            name: "Power Bank",
            category: "Electronics",
            climate: "All",
            essential: true,
            weight: "250g",
            notes: "20,000mAh capacity can charge phone 4-5 times. Essential for long flights and day trips.",
            tips: ["Check airline regulations (must be in carry-on)", "Bring multiple cables", "Label with your name"],
            icon: <Battery className="w-5 h-5" />,
            color: "bg-green-100",
            textColor: "text-green-600",
            image: "https://images.unsplash.com/photo-1609592424823-4c7cb9ed4c42?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 4,
            name: "First Aid Kit",
            category: "First Aid",
            climate: "All",
            essential: true,
            weight: "300g",
            notes: "Customize based on destination. Include prescription meds, pain relievers, and allergy medicine.",
            tips: ["Keep meds in original packaging", "Bring doctor's note for controlled substances", "Add rehydration salts for tropical trips"],
            icon: <Pill className="w-5 h-5" />,
            color: "bg-red-100",
            textColor: "text-red-600",
            image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 5,
            name: "Packing Cubes",
            category: "Accessories",
            climate: "All",
            essential: false,
            weight: "150g",
            notes: "Organize clothes by category. Compress items to save 30% more space.",
            tips: ["Use different colors for each person", "Roll clothes, don't fold", "Store dirty clothes separately"],
            icon: <Luggage className="w-5 h-5" />,
            color: "bg-purple-100",
            textColor: "text-purple-600",
            image: "https://images.unsplash.com/photo-1586395006135-3b79c7f6a7a8?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 6,
            name: "Universal Travel Adapter",
            category: "Electronics",
            climate: "All",
            essential: true,
            weight: "150g",
            notes: "One adapter with multiple plug types and USB ports. Essential for international travel.",
            tips: ["Choose with surge protection", "Test before leaving home", "Bring a power strip for multiple devices"],
            icon: <Wifi className="w-5 h-5" />,
            color: "bg-yellow-100",
            textColor: "text-yellow-600",
            image: "https://images.unsplash.com/photo-1555529771-835f59fc5efe?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 7,
            name: "Merino Wool Base Layers",
            category: "Clothing",
            climate: "Cold Weather",
            essential: true,
            weight: "180g",
            notes: "Merino wool is odor-resistant, breathable, and warm. Can be worn 3-4 days without washing.",
            tips: ["Avoid fabric softener", "Air dry only", "Great for hiking and cold climates"],
            icon: <Shirt className="w-5 h-5" />,
            color: "bg-indigo-100",
            textColor: "text-indigo-600",
            image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 8,
            name: "Reef-Safe Sunscreen",
            category: "Toiletries",
            climate: "Beach",
            essential: true,
            weight: "100g",
            notes: "Regular sunscreen damages coral reefs. Use mineral-based, oxybenzone-free sunscreen.",
            tips: ["SPF 50+ for tropical destinations", "Apply 15 mins before sun exposure", "Reapply every 2 hours"],
            icon: <Sun className="w-5 h-5" />,
            color: "bg-orange-100",
            textColor: "text-orange-600",
            image: "https://images.unsplash.com/photo-1556909211-36987daf7b4d?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 9,
            name: "Travel Insurance Documents",
            category: "Documents",
            climate: "All",
            essential: true,
            weight: "10g",
            notes: "Never travel without insurance. Keep digital and physical copies of policy.",
            tips: ["Save emergency contact numbers", "Know coverage limits", "Check COVID-19 coverage"],
            icon: <FileText className="w-5 h-5" />, // Fixed: Now using imported FileText
            color: "bg-blue-100",
            textColor: "text-blue-600",
            image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 10,
            name: "Comfortable Walking Shoes",
            category: "Clothing",
            climate: "Urban",
            essential: true,
            weight: "800g",
            notes: "Break in shoes before your trip. Waterproof recommended for rainy destinations.",
            tips: ["Wear heaviest shoes on plane", "Bring blister bandages", "Alternate shoes daily"],
            icon: <Footprints className="w-5 h-5" />,
            color: "bg-gray-100",
            textColor: "text-gray-600",
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 11,
            name: "Reusable Water Bottle",
            category: "Accessories",
            climate: "All",
            essential: true,
            weight: "300g",
            notes: "Collapsible bottles save space. Filtered bottles are great for countries with unsafe tap water.",
            tips: ["Empty before security", "Wide mouth for ice cubes", "Insulated for hot/cold"],
            icon: <Droplet className="w-5 h-5" />,
            color: "bg-cyan-100",
            textColor: "text-cyan-600",
            image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 12,
            name: "Travel Pillow",
            category: "Accessories",
            climate: "All",
            essential: false,
            weight: "350g",
            notes: "Inflatable pillows save space. Memory foam offers better neck support.",
            tips: ["Try before buying", "Consider travel pillowcase", "Clip to backpack when not in use"],
            icon: <Coffee className="w-5 h-5" />,
            color: "bg-pink-100",
            textColor: "text-pink-600",
            image: "https://images.unsplash.com/photo-1590642916589-592b004b1ee4?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 13,
            name: "Rain Jacket",
            category: "Clothing",
            climate: "Tropical",
            essential: true,
            weight: "400g",
            notes: "Packable rain jacket is better than an umbrella. Look for breathable waterproof fabric.",
            tips: ["Test waterproofing before trip", "Pack in outside pocket", "Great for windy cities"],
            icon: <Cloud className="w-5 h-5" />,
            color: "bg-blue-100",
            textColor: "text-blue-600",
            image: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 14,
            name: "Camera",
            category: "Electronics",
            climate: "All",
            essential: false,
            weight: "500g",
            notes: "Phone cameras are sufficient for most. Bring DSLR only if photography is priority.",
            tips: ["Bring extra memory cards", "Charge all batteries", "Use camera strap"],
            icon: <Camera className="w-5 h-5" />,
            color: "bg-gray-100",
            textColor: "text-gray-600",
            image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 15,
            name: "Laundry Kit",
            category: "Miscellaneous",
            climate: "All",
            essential: false,
            weight: "150g",
            notes: "Ziploc with laundry sheets, sink stopper, and travel clothesline.",
            tips: ["Use hotel shampoo for hand wash", "Roll clothes in towel to dry", "Pack quick-dry fabrics"],
            icon: <Droplet className="w-5 h-5" />,
            color: "bg-teal-100",
            textColor: "text-teal-600",
            image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&q=80&w=800"
        }
    ];

    const essentialChecklist = [
        { id: 'passport', name: 'Passport & Visa', category: 'Documents' },
        { id: 'tickets', name: 'Flight Tickets/Itinerary', category: 'Documents' },
        { id: 'insurance', name: 'Travel Insurance', category: 'Documents' },
        { id: 'cash', name: 'Local Currency', category: 'Documents' },
        { id: 'cards', name: 'Credit/Debit Cards', category: 'Documents' },
        { id: 'phone', name: 'Phone & Charger', category: 'Electronics' },
        { id: 'powerbank', name: 'Power Bank', category: 'Electronics' },
        { id: 'adapter', name: 'Travel Adapter', category: 'Electronics' },
        { id: 'meds', name: 'Prescription Meds', category: 'First Aid' },
        { id: 'firstaid', name: 'First Aid Kit', category: 'First Aid' },
        { id: 'underwear', name: 'Underwear (1 per day)', category: 'Clothing' },
        { id: 'socks', name: 'Socks (1 per day)', category: 'Clothing' },
        { id: 'toothbrush', name: 'Toothbrush & Toothpaste', category: 'Toiletries' },
        { id: 'deodorant', name: 'Deodorant', category: 'Toiletries' },
        { id: 'sunscreen', name: 'Sunscreen', category: 'Toiletries' }
    ];

    const packingHacks = [
        "Roll clothes instead of folding - saves 30% space and prevents wrinkles",
        "Put dry cleaning bags between clothes to prevent wrinkles",
        "Stuff socks inside shoes to save space and maintain shoe shape",
        "Use shower caps to cover shoe soles when packing",
        "Pack a empty tote bag for souvenirs",
        "Use binder clips to protect razor blades",
        "Store necklaces through straws to prevent tangling",
        "Put cotton balls in makeup powders to prevent mess",
        "Use contact lens cases for small amounts of skincare",
        "Wrap belts around shirt collars to maintain shape"
    ];

    // Fixed: Added empty state handling
    const filteredItems = packingItems.filter(item => {
        const matchesSearch = searchTerm === '' ? true : 
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.notes.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        const matchesClimate = selectedClimate === 'All' || item.climate === selectedClimate || item.climate === 'All';
        return matchesSearch && matchesCategory && matchesClimate;
    });

    const toggleChecklistItem = (itemId) => {
        setChecklist(prev => ({
            ...prev,
            [itemId]: !prev[itemId]
        }));
    };

    const addToPackingList = (item) => {
        if (!packingList.find(i => i.id === item.id)) {
            setPackingList([...packingList, item]);
        }
    };

    const removeFromPackingList = (itemId) => {
        setPackingList(packingList.filter(item => item.id !== itemId));
    };

    // Fixed: parseInt with radix 10 and handle NaN
    const calculateTotalWeight = () => {
        const total = packingList.reduce((acc, item) => {
            const weight = parseInt(item.weight, 10) || 0;
            return acc + weight;
        }, 0);
        return total;
    };

    const getProgressPercentage = () => {
        if (essentialChecklist.length === 0) return 0;
        const checkedCount = Object.values(checklist).filter(Boolean).length;
        return (checkedCount / essentialChecklist.length) * 100;
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-24 px-5 bg-gradient-to-r from-[#2E5C4E] to-[#1D3B33] overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-[#ffcc00] rounded-full filter blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-500 rounded-full filter blur-3xl"></div>
                </div>
                
                <div className="max-w-[1200px] mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-[#ffcc00] text-sm font-bold mb-6 backdrop-blur-sm">
                        <Luggage className="w-4 h-4" /> PACK SMARTER, TRAVEL BETTER
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
                        Ultimate <span className="text-[#ffcc00] drop-shadow-lg">Packing</span> Guide
                    </h1>
                    <p className="text-gray-200 text-lg max-w-2xl mx-auto mb-10">
                        Expert packing strategies, essential gear recommendations, and 
                        interactive checklists for every type of traveler and destination.
                    </p>
                    
                    {/* Search Bar */}
                    <div className="relative max-w-3xl mx-auto">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search packing items, gear, or tips..."
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
                            <div className="text-3xl md:text-4xl font-black text-white">50+</div>
                            <div className="text-sm text-gray-300">Packing Items</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-black text-white">30%</div>
                            <div className="text-sm text-gray-300">More Space</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-black text-white">10k+</div>
                            <div className="text-sm text-gray-300">Travelers Helped</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <main className="max-w-[1200px] w-full mx-auto px-5 py-16 flex-grow">
                {/* Interactive Packing Checklist */}
                <section className="mb-16 bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-[#2E5C4E] to-[#1D3B33] p-8 text-white">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-black mb-2">Essential Packing Checklist</h2>
                                <p className="text-gray-200">Don't forget the basics. {Object.values(checklist).filter(Boolean).length}/{essentialChecklist.length} items packed</p>
                            </div>
                            <div className="w-full md:w-64 bg-white/20 rounded-full h-4 overflow-hidden">
                                <div 
                                    className="bg-[#ffcc00] h-full rounded-full transition-all duration-500"
                                    style={{ width: `${getProgressPercentage()}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {essentialChecklist.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => toggleChecklistItem(item.id)}
                                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                                        checklist[item.id]
                                            ? 'border-green-500 bg-green-50'
                                            : 'border-gray-200 hover:border-[#ffcc00]'
                                    }`}
                                >
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                        checklist[item.id]
                                            ? 'border-green-500 bg-green-500'
                                            : 'border-gray-400'
                                    }`}>
                                        {checklist[item.id] && <CheckCircle className="w-4 h-4 text-white" />}
                                    </div>
                                    <div className="text-left">
                                        <p className={`text-sm font-bold ${
                                            checklist[item.id] ? 'text-green-700 line-through' : 'text-gray-700'
                                        }`}>
                                            {item.name}
                                        </p>
                                        <p className="text-xs text-gray-400">{item.category}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* My Packing List Builder */}
                <section className="mb-16">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                        <div>
                            <span className="text-[#ffcc00] font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                                <ShoppingBag className="w-4 h-4" /> BUILD YOUR LIST
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black text-[#2d3436] mt-2">My Packing List</h2>
                            <p className="text-gray-500 mt-2">
                                {packingList.length} items selected • Estimated weight: {calculateTotalWeight()}g
                            </p>
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

                    {/* Advanced Filters */}
                    {showFilters && (
                        <div className="mb-12 p-6 bg-white rounded-2xl shadow-lg border border-gray-100 animate-slideDown">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Category</label>
                                    <div className="flex flex-wrap gap-2">
                                        {categories.map((cat) => (
                                            <button
                                                key={cat}
                                                onClick={() => setSelectedCategory(cat)}
                                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                                    selectedCategory === cat 
                                                    ? 'bg-[#ffcc00] text-[#2d3436] shadow-md' 
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Climate/Destination</label>
                                    <div className="flex flex-wrap gap-2">
                                        {climates.map((climate) => (
                                            <button
                                                key={climate}
                                                onClick={() => setSelectedClimate(climate)}
                                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                                    selectedClimate === climate 
                                                    ? 'bg-[#ffcc00] text-[#2d3436] shadow-md' 
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                            >
                                                {climate}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Trip Duration</label>
                                    <div className="flex flex-wrap gap-2">
                                        {durations.map((duration) => (
                                            <button
                                                key={duration}
                                                onClick={() => setSelectedDuration(duration)}
                                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                                    selectedDuration === duration 
                                                    ? 'bg-[#ffcc00] text-[#2d3436] shadow-md' 
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                            >
                                                {duration}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Packing Items Grid - Fixed empty state */}
                    {filteredItems.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {filteredItems.map((item) => (
                                <div 
                                    key={item.id} 
                                    className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-xl transition-all group"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`p-3 ${item.color} rounded-xl`}>
                                            {item.icon}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="font-black text-[#2d3436] group-hover:text-[#ffcc00] transition-colors">
                                                        {item.name}
                                                    </h3>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                                                            {item.category}
                                                        </span>
                                                        <span className="text-xs text-gray-400">
                                                            {item.weight}
                                                        </span>
                                                    </div>
                                                </div>
                                                {item.essential && (
                                                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-bold">
                                                        ESSENTIAL
                                                    </span>
                                                )}
                                            </div>
                                            
                                            <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                                                {item.notes}
                                            </p>

                                            <div className="flex items-center justify-between mt-4">
                                                <span className="text-xs text-gray-400">
                                                    {item.climate}
                                                </span>
                                                {packingList.find(i => i.id === item.id) ? (
                                                    <button
                                                        onClick={() => removeFromPackingList(item.id)}
                                                        className="px-4 py-1.5 bg-red-500 text-white text-xs font-bold rounded-lg hover:bg-red-600 transition-all"
                                                    >
                                                        REMOVE
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => addToPackingList(item)}
                                                        className="px-4 py-1.5 bg-[#ffcc00] text-[#2d3436] text-xs font-bold rounded-lg hover:bg-[#ffd700] transition-all flex items-center gap-1"
                                                    >
                                                        <Plus className="w-3 h-3" /> ADD
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-white rounded-2xl border border-gray-200 mb-8">
                            <Luggage className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-gray-700 mb-2">No items found</h3>
                            <p className="text-sm text-gray-500 mb-4">Try adjusting your search or filters</p>
                            <button 
                                onClick={() => {
                                    setSearchTerm('');
                                    setSelectedCategory('All');
                                    setSelectedClimate('All');
                                    setSelectedDuration('All');
                                }}
                                className="px-6 py-2 bg-[#ffcc00] text-[#2d3436] font-bold rounded-xl hover:bg-[#ffd700] transition-all text-sm"
                            >
                                Reset Filters
                            </button>
                        </div>
                    )}

                    {/* Current Packing List */}
                    {packingList.length > 0 && (
                        <div className="bg-gradient-to-br from-[#2E5C4E] to-[#1D3B33] rounded-3xl p-8 text-white">
                            <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                                <Luggage className="w-5 h-5" /> Your Packing List ({packingList.length} items)
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {packingList.map((item) => (
                                    <div key={item.id} className="bg-white/10 backdrop-blur p-3 rounded-xl flex items-center justify-between">
                                        <span className="text-sm font-bold">{item.name}</span>
                                        <button
                                            onClick={() => removeFromPackingList(item.id)}
                                            className="p-1 hover:bg-white/20 rounded-full transition-all"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 pt-6 border-t border-white/20 flex justify-between items-center">
                                <span className="text-sm">Total Estimated Weight: {calculateTotalWeight()}g</span>
                                <button className="px-6 py-2 bg-[#ffcc00] text-[#2d3436] font-bold rounded-xl hover:bg-[#ffd700] transition-all">
                                    EXPORT LIST
                                </button>
                            </div>
                        </div>
                    )}
                </section>

                {/* Packing Hacks */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <span className="text-[#ffcc00] font-bold text-sm uppercase tracking-wider">PRO TIPS</span>
                        <h2 className="text-3xl md:text-4xl font-black text-[#2d3436] mt-2">Packing Hacks</h2>
                        <p className="text-gray-500 mt-2">10 genius tricks to pack like a pro</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {packingHacks.map((hack, index) => (
                            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:border-[#ffcc00] transition-all group">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-[#ffcc00]/10 rounded-xl flex items-center justify-center font-black text-[#ffcc00]">
                                        {index + 1}
                                    </div>
                                    <p className="text-sm text-gray-700 group-hover:text-[#2d3436] transition-colors">
                                        {hack}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Packing by Climate Guide */}
                <section className="bg-gradient-to-r from-[#ffcc00] to-[#ffd700] rounded-3xl p-10 text-[#2d3436]">
                    <h2 className="text-2xl md:text-3xl font-black mb-6 text-center">Packing Guide by Climate</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-white/90 backdrop-blur p-6 rounded-2xl">
                            <Sun className="w-8 h-8 text-orange-500 mb-3" />
                            <h3 className="font-black mb-2">Tropical</h3>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center gap-2">• Lightweight clothing</li>
                                <li className="flex items-center gap-2">• Reef-safe sunscreen</li>
                                <li className="flex items-center gap-2">• Rain jacket</li>
                                <li className="flex items-center gap-2">• Insect repellent</li>
                            </ul>
                        </div>
                        <div className="bg-white/90 backdrop-blur p-6 rounded-2xl">
                            <Moon className="w-8 h-8 text-blue-500 mb-3" />
                            <h3 className="font-black mb-2">Cold Weather</h3>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center gap-2">• Thermal base layers</li>
                                <li className="flex items-center gap-2">• Insulated jacket</li>
                                <li className="flex items-center gap-2">• Warm socks</li>
                                <li className="flex items-center gap-2">• Gloves & beanie</li>
                            </ul>
                        </div>
                        <div className="bg-white/90 backdrop-blur p-6 rounded-2xl">
                            <Umbrella className="w-8 h-8 text-blue-400 mb-3" />
                            <h3 className="font-black mb-2">Urban</h3>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center gap-2">• Comfortable walking shoes</li>
                                <li className="flex items-center gap-2">• Daypack</li>
                                <li className="flex items-center gap-2">• Versatile outfits</li>
                                <li className="flex items-center gap-2">• Power bank</li>
                            </ul>
                        </div>
                        <div className="bg-white/90 backdrop-blur p-6 rounded-2xl">
                            <Map className="w-8 h-8 text-green-500 mb-3" />
                            <h3 className="font-black mb-2">Beach</h3>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center gap-2">• Swimwear</li>
                                <li className="flex items-center gap-2">• Cover-up</li>
                                <li className="flex items-center gap-2">• Flip flops</li>
                                <li className="flex items-center gap-2">• Dry bag</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Packing;