// components/layout/Footer.jsx
import React, { useState } from 'react';
import { Compass, Heart, Mail, MapPin, Phone, Send, Facebook, Twitter, Instagram, Youtube, ChevronRight } from 'lucide-react';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email && email.includes('@')) {
            setSubscribed(true);
            setEmail('');
            setTimeout(() => setSubscribed(false), 3000);
        }
    };

    const quickLinks = [
        { name: 'Home', href: '/' },
        { name: 'Destinations', href: '/destinations' },
        { name: 'Travel Guides', href: '/guides' },
        { name: 'Blog', href: '/blog' },
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' }
    ];

    const categories = [
        { name: 'Beach Destinations', href: '/destinations?category=beach' },
        { name: 'Mountain Escapes', href: '/destinations?category=mountain' },
        { name: 'Cultural Tours', href: '/destinations?category=culture' },
        { name: 'Adventure Travel', href: '/destinations?category=adventure' },
        { name: 'Budget Travel', href: '/destinations?category=budget' },
        { name: 'Luxury Getaways', href: '/destinations?category=luxury' }
    ];

    const socialLinks = [
        { icon: <Facebook className="w-5 h-5" />, name: 'Facebook', href: 'https://facebook.com/wandertrip', color: 'hover:bg-[#1877f2]' },
        { icon: <Instagram className="w-5 h-5" />, name: 'Instagram', href: 'https://instagram.com/wandertrip', color: 'hover:bg-[#e4405f]' },
        { icon: <Twitter className="w-5 h-5" />, name: 'Twitter', href: 'https://twitter.com/wandertrip', color: 'hover:bg-[#1da1f2]' },
        { icon: <Youtube className="w-5 h-5" />, name: 'YouTube', href: 'https://youtube.com/wandertrip', color: 'hover:bg-[#ff0000]' }
    ];

    const contactInfo = [
        { icon: <MapPin className="w-4 h-4" />, text: '123 Travel Street, Makati City, Philippines' },
        { icon: <Phone className="w-4 h-4" />, text: '+63 (2) 8123 4567' },
        { icon: <Mail className="w-4 h-4" />, text: 'hello@wandertrip.com' }
    ];

    return (
        <footer className="w-full bg-gradient-to-b from-white to-gray-50 border-t border-gray-200">
            {/* Newsletter Section */}
            <div className="bg-gradient-to-r from-[#ffcc00] to-[#ffd700] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-20 -mb-20"></div>
                
                <div className="max-w-[1200px] mx-auto px-5 py-16 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
                        <div className="max-w-xl text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-[#2d3436] text-sm font-bold mb-4 backdrop-blur-sm">
                                <Mail className="w-4 h-4" /> NEVER MISS AN ADVENTURE
                            </div>
                            <h3 className="text-3xl lg:text-4xl font-black text-[#2d3436] mb-3">
                                Get Weekly Travel Inspiration
                            </h3>
                            <p className="text-[#2d3436]/80 font-medium text-lg">
                                Join <span className="font-black">50,000+ travelers</span> receiving free itineraries, 
                                exclusive deals, and travel tips every Sunday.
                            </p>
                        </div>
                        
                        <form onSubmit={handleSubscribe} className="w-full lg:w-auto">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="relative flex-grow">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        placeholder="Enter your email address"
                                        className="w-full lg:w-80 pl-12 pr-6 py-4 rounded-2xl border-2 border-white/50 focus:border-[#2d3436] focus:outline-none shadow-xl text-gray-800 placeholder-gray-400"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="px-8 py-4 bg-[#2d3436] text-white font-black rounded-2xl hover:bg-black transition-all shadow-xl flex items-center justify-center gap-2 group"
                                >
                                    SUBSCRIBE <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                            {subscribed && (
                                <div className="mt-4 text-center lg:text-left">
                                    <span className="inline-block bg-[#2d3436] text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg animate-bounce">
                                        ✅ Thanks for subscribing! Check your inbox.
                                    </span>
                                </div>
                            )}
                            <p className="text-xs text-[#2d3436]/60 mt-4 text-center lg:text-left">
                                By subscribing, you agree to our Privacy Policy and consent to receive updates.
                            </p>
                        </form>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="max-w-[1200px] mx-auto px-5 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-4">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 bg-[#ffcc00] rounded-xl shadow-lg transform hover:rotate-12 transition-transform">
                                <Compass className="w-6 h-6 text-[#2d3436]" />
                            </div>
                            <span className="font-black text-[#2d3436] text-2xl tracking-tight">
                                WanderTrip
                            </span>
                        </div>
                        
                        <p className="text-gray-500 mb-6 leading-relaxed">
                            Your ultimate travel companion for discovering the best destinations, 
                            hidden gems, and authentic experiences across the Philippines and beyond. 
                            We've helped <span className="font-bold text-[#ffcc00]">50,000+ travelers</span> explore smarter.
                        </p>
                        
                        {/* Contact Info */}
                        <div className="space-y-3 mb-6">
                            {contactInfo.map((item, index) => (
                                <div key={index} className="flex items-center gap-3 text-sm text-gray-500 hover:text-[#2d3436] transition-colors">
                                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-[#ffcc00]">
                                        {item.icon}
                                    </div>
                                    <span>{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-2">
                        <h4 className="font-black text-[#2d3436] text-lg mb-6 relative inline-block">
                            Quick Links
                            <span className="absolute bottom-0 left-0 w-12 h-1 bg-[#ffcc00] rounded-full -mb-2"></span>
                        </h4>
                        <ul className="space-y-4">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <a 
                                        href={link.href}
                                        className="text-gray-500 hover:text-[#ffcc00] transition-colors flex items-center gap-2 group"
                                    >
                                        <ChevronRight className="w-4 h-4 text-[#ffcc00] opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <span className="group-hover:translate-x-1 transition-transform">
                                            {link.name}
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Categories */}
                    <div className="lg:col-span-3">
                        <h4 className="font-black text-[#2d3436] text-lg mb-6 relative inline-block">
                            Explore by Category
                            <span className="absolute bottom-0 left-0 w-12 h-1 bg-[#ffcc00] rounded-full -mb-2"></span>
                        </h4>
                        <ul className="grid grid-cols-2 gap-x-4 gap-y-4">
                            {categories.map((category, index) => (
                                <li key={index}>
                                    <a 
                                        href={category.href}
                                        className="text-gray-500 hover:text-[#ffcc00] transition-colors text-sm flex items-center gap-1.5"
                                    >
                                        <span className="w-1.5 h-1.5 bg-[#ffcc00] rounded-full"></span>
                                        {category.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social & App */}
                    <div className="lg:col-span-3">
                        <h4 className="font-black text-[#2d3436] text-lg mb-6 relative inline-block">
                            Connect With Us
                            <span className="absolute bottom-0 left-0 w-12 h-1 bg-[#ffcc00] rounded-full -mb-2"></span>
                        </h4>
                        
                        {/* Social Links */}
                        <div className="flex gap-3 mb-8">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-3 bg-gray-100 rounded-xl text-gray-600 hover:text-white ${social.color} transition-all hover:scale-110 hover:shadow-lg`}
                                    aria-label={social.name}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>

                        {/* App Store Badges */}
                        <div>
                            <p className="text-sm font-bold text-gray-600 mb-3">Download our app</p>
                            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                                <button className="flex items-center gap-3 bg-[#2d3436] text-white px-5 py-3 rounded-xl hover:bg-black transition-all group">
                                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                                    </svg>
                                    <div className="text-left">
                                        <p className="text-xs">Download on the</p>
                                        <p className="text-sm font-bold">App Store</p>
                                    </div>
                                </button>
                                <button className="flex items-center gap-3 bg-[#2d3436] text-white px-5 py-3 rounded-xl hover:bg-black transition-all group">
                                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M3 20.5L20.5 12L3 3.5v7l11 1.5l-11 1.5v7z"/>
                                    </svg>
                                    <div className="text-left">
                                        <p className="text-xs">Get it on</p>
                                        <p className="text-sm font-bold">Google Play</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-200 bg-white/50 backdrop-blur-sm">
                <div className="max-w-[1200px] mx-auto px-5 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4 text-sm">
                            <p className="text-gray-400 font-medium">
                                © {new Date().getFullYear()} WanderTrip | CrochsDevs. All rights reserved.
                            </p>
                            <span className="text-gray-300 hidden md:inline">|</span>
                        </div>
                        
                        <div className="flex items-center gap-6 text-xs">
                            <a href="/privacy" className="text-gray-400 hover:text-[#ffcc00] transition-colors font-medium">
                                Privacy Policy
                            </a>
                            <a href="/terms" className="text-gray-400 hover:text-[#ffcc00] transition-colors font-medium">
                                Terms of Service
                            </a>
                            <a href="/cookies" className="text-gray-400 hover:text-[#ffcc00] transition-colors font-medium">
                                Cookie Policy
                            </a>
                            <span className="text-gray-200 text-xs font-bold px-3 py-1.5 bg-gray-100 rounded-full">
                                v2.0.0
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;