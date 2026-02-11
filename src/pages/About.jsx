import React from 'react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import { 
    Compass, Heart, Users, Globe, Map, Award, 
    Coffee, Camera, Ship, Mountain, TreeDeciduous,
    CheckCircle, Star, Mail, Phone, MapPin,
    Facebook, Twitter, Instagram, Youtube,
    Quote, ChevronRight, Target, Eye, Zap
} from 'lucide-react';

const About = () => {
    const teamMembers = [
        {
            id: 1,
            name: "Maria Santos",
            role: "Founder & CEO",
            bio: "Former travel journalist with 10+ years of experience exploring Southeast Asia. Passionate about sustainable tourism and authentic local experiences.",
            image: "https://images.unsplash.com/photo-1494790108755-5da3efb88d45?auto=format&fit=crop&q=80&w=800",
            social: { twitter: "#", linkedin: "#", instagram: "#" }
        },
        {
            id: 2,
            name: "James Wilson",
            role: "Head of Content",
            bio: "Adventure traveler who's visited 45+ countries. Expert in budget travel and off-the-beaten-path destinations.",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800",
            social: { twitter: "#", linkedin: "#", instagram: "#" }
        },
        {
            id: 3,
            name: "Yuki Tanaka",
            role: "Destination Specialist",
            bio: "Cultural immersion expert specializing in Japanese and Southeast Asian heritage sites. Speaks 5 languages.",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
            social: { twitter: "#", linkedin: "#", instagram: "#" }
        },
        {
            id: 4,
            name: "Sarah Chen",
            role: "Budget Travel Expert",
            bio: "Digital nomad who's been traveling full-time for 6 years. Helps travelers maximize experiences while minimizing costs.",
            image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800",
            social: { twitter: "#", linkedin: "#", instagram: "#" }
        }
    ];

    const milestones = [
        { year: "2020", title: "WanderTrip Founded", description: "Started as a small blog sharing travel tips", icon: <Compass className="w-6 h-6" /> },
        { year: "2021", title: "50,000 Monthly Readers", description: "Reached 50k monthly active users", icon: <Users className="w-6 h-6" /> },
        { year: "2022", title: "Launched Mobile App", description: "iOS and Android apps released", icon: <Globe className="w-6 h-6" /> },
        { year: "2023", title: "100+ Destinations", description: "Covered 100+ destinations worldwide", icon: <Map className="w-6 h-6" /> },
        { year: "2024", title: "Travel Community", description: "10,000+ active community members", icon: <Heart className="w-6 h-6" /> },
        { year: "2025", title: "Sustainability Award", description: "Recognized for eco-tourism initiatives", icon: <Award className="w-6 h-6" /> }
    ];

    const values = [
        {
            icon: <Target className="w-8 h-8" />,
            title: "Authentic Experiences",
            description: "We believe in real, unfiltered travel experiences. No tourist traps, just genuine connections with places and cultures."
        },
        {
            icon: <Heart className="w-8 h-8" />,
            title: "Sustainable Tourism",
            description: "Committed to responsible travel that protects environments, supports local communities, and preserves cultural heritage."
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Community First",
            description: "Built by travelers, for travelers. Our community's insights and experiences shape everything we do."
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Innovation",
            description: "Constantly evolving to make travel planning smarter, easier, and more accessible for everyone."
        }
    ];

    const testimonials = [
        {
            id: 1,
            name: "Michael Rodriguez",
            location: "Manila, Philippines",
            text: "WanderTrip completely changed how I travel. Their guides helped me discover hidden gems in Palawan I never would have found on my own.",
            rating: 5,
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 2,
            name: "Lisa Thompson",
            location: "Sydney, Australia",
            text: "The budget tips alone have saved me thousands of pesos. I've recommended WanderTrip to all my friends who love to travel.",
            rating: 5,
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 3,
            name: "Kenji Watanabe",
            location: "Tokyo, Japan",
            text: "As a solo traveler, safety is my priority. WanderTrip's safety guides are comprehensive and gave me peace of mind during my Philippines trip.",
            rating: 5,
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"
        }
    ];

    const stats = [
        { value: "200+", label: "Destinations Covered", icon: <Map className="w-6 h-6" /> },
        { value: "500k+", label: "Monthly Readers", icon: <Users className="w-6 h-6" /> },
        { value: "50k+", label: "Community Members", icon: <Heart className="w-6 h-6" /> },
        { value: "4.9", label: "User Rating", icon: <Star className="w-6 h-6" /> }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-24 px-5 bg-gradient-to-r from-[#1a2634] to-[#2d3436] overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-[#ffcc00] rounded-full filter blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
                </div>
                
                <div className="max-w-[1200px] mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-[#ffcc00] text-sm font-bold mb-6 backdrop-blur-sm">
                        <Compass className="w-4 h-4" /> OUR STORY
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
                        About <span className="text-[#ffcc00] drop-shadow-lg">WanderTrip</span>
                    </h1>
                    <p className="text-gray-200 text-lg max-w-2xl mx-auto">
                        We're on a mission to help travelers discover authentic experiences, 
                        save money, and explore the world with confidence. Since 2020, we've 
                        been your trusted travel companion.
                    </p>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 px-5 bg-white border-b border-gray-100">
                <div className="max-w-[1200px] mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="flex justify-center mb-3">
                                    <div className="p-3 bg-[#ffcc00]/10 rounded-2xl text-[#ffcc00]">
                                        {stat.icon}
                                    </div>
                                </div>
                                <div className="text-3xl md:text-4xl font-black text-[#2d3436] mb-1">
                                    {stat.value}
                                </div>
                                <p className="text-sm text-gray-500">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-20 px-5 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-[1200px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-[#ffcc00] font-bold text-sm uppercase tracking-wider flex items-center gap-2 mb-4">
                                <Compass className="w-4 h-4" /> OUR JOURNEY
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black text-[#2d3436] mb-6">
                                From a Simple Blog to a Travel Community
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                WanderTrip started in 2020 as a passion project during the pandemic. 
                                Founder Maria Santos wanted to share her travel experiences and help 
                                others plan their future adventures. What began as a small blog quickly 
                                grew into one of the Philippines' most trusted travel resources.
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                Today, we're a team of 15+ travel enthusiasts, content creators, and 
                                tech innovators working together to make travel planning easier, more 
                                affordable, and more sustainable for everyone.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-[#ffcc00]" />
                                    <span className="text-sm font-semibold text-gray-700">500k+ Monthly Readers</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-[#ffcc00]" />
                                    <span className="text-sm font-semibold text-gray-700">200+ Destinations</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-[#ffcc00]" />
                                    <span className="text-sm font-semibold text-gray-700">4.9/5 Rating</span>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <img 
                                    src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&q=80&w=800" 
                                    alt="Team meeting"
                                    className="rounded-2xl shadow-xl w-full h-48 object-cover"
                                />
                                <img 
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" 
                                    alt="Team collaboration"
                                    className="rounded-2xl shadow-xl w-full h-56 object-cover"
                                />
                            </div>
                            <div className="space-y-4 pt-8">
                                <img 
                                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800" 
                                    alt="Planning session"
                                    className="rounded-2xl shadow-xl w-full h-56 object-cover"
                                />
                                <img 
                                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800" 
                                    alt="Office life"
                                    className="rounded-2xl shadow-xl w-full h-48 object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 px-5 bg-white">
                <div className="max-w-[1200px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-gradient-to-br from-[#ffcc00] to-[#ffd700] p-10 rounded-3xl text-[#2d3436]">
                            <Target className="w-12 h-12 mb-6" />
                            <h3 className="text-2xl md:text-3xl font-black mb-4">Our Mission</h3>
                            <p className="text-lg leading-relaxed">
                                To empower travelers with authentic, practical, and up-to-date information 
                                that transforms how they explore the world. We believe everyone deserves 
                                to experience the joy of travel, regardless of budget or experience level.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-[#2d3436] to-[#1a2634] p-10 rounded-3xl text-white">
                            <Eye className="w-12 h-12 mb-6" />
                            <h3 className="text-2xl md:text-3xl font-black mb-4">Our Vision</h3>
                            <p className="text-lg leading-relaxed text-gray-200">
                                To become the world's most trusted travel community, where travelers 
                                can find everything they need to plan meaningful, sustainable, and 
                                unforgettable journeys across the globe.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-20 px-5 bg-gray-50">
                <div className="max-w-[1200px] mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-[#ffcc00] font-bold text-sm uppercase tracking-wider">WHAT WE STAND FOR</span>
                        <h2 className="text-3xl md:text-4xl font-black text-[#2d3436] mt-2">Our Core Values</h2>
                        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                            These principles guide everything we do at WanderTrip, from content creation to community engagement.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all group">
                                <div className="p-4 bg-[#ffcc00]/10 rounded-2xl w-fit mb-6 group-hover:bg-[#ffcc00] transition-all">
                                    <div className="text-[#ffcc00] group-hover:text-[#2d3436] transition-all">
                                        {value.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-black text-[#2d3436] mb-3">{value.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-20 px-5 bg-white">
                <div className="max-w-[1200px] mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-[#ffcc00] font-bold text-sm uppercase tracking-wider">OUR HISTORY</span>
                        <h2 className="text-3xl md:text-4xl font-black text-[#2d3436] mt-2">The WanderTrip Journey</h2>
                        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                            From a simple idea to a thriving travel community — here's how we grew.
                        </p>
                    </div>
                    
                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[#ffcc00]/20 hidden lg:block"></div>
                        
                        <div className="space-y-12">
                            {milestones.map((milestone, index) => (
                                <div key={index} className={`flex flex-col lg:flex-row ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''} items-center gap-8 lg:gap-16`}>
                                    <div className="flex-1 lg:text-right">
                                        {index % 2 === 0 ? (
                                            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                                                <span className="text-[#ffcc00] font-black text-sm">{milestone.year}</span>
                                                <h3 className="text-xl font-black text-[#2d3436] mt-1 mb-2">{milestone.title}</h3>
                                                <p className="text-gray-600">{milestone.description}</p>
                                            </div>
                                        ) : (
                                            <div className="hidden lg:block"></div>
                                        )}
                                    </div>
                                    
                                    <div className="relative z-10">
                                        <div className="w-16 h-16 bg-[#ffcc00] rounded-2xl flex items-center justify-center text-[#2d3436] shadow-xl">
                                            {milestone.icon}
                                        </div>
                                    </div>
                                    
                                    <div className="flex-1">
                                        {index % 2 !== 0 ? (
                                            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                                                <span className="text-[#ffcc00] font-black text-sm">{milestone.year}</span>
                                                <h3 className="text-xl font-black text-[#2d3436] mt-1 mb-2">{milestone.title}</h3>
                                                <p className="text-gray-600">{milestone.description}</p>
                                            </div>
                                        ) : (
                                            <div className="hidden lg:block"></div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 px-5 bg-gray-50">
                <div className="max-w-[1200px] mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-[#ffcc00] font-bold text-sm uppercase tracking-wider">THE TEAM</span>
                        <h2 className="text-3xl md:text-4xl font-black text-[#2d3436] mt-2">Meet the Wanderers</h2>
                        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                            Passionate travelers, writers, and tech enthusiasts working together to help you explore the world.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member) => (
                            <div key={member.id} className="group">
                                <div className="relative mb-4 overflow-hidden rounded-3xl">
                                    <img 
                                        src={member.image} 
                                        alt={member.name}
                                        className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform">
                                        <div className="flex gap-3 justify-center">
                                            <a href={member.social.twitter} className="p-2 bg-white/20 backdrop-blur rounded-full hover:bg-[#ffcc00] transition-all">
                                                <Twitter className="w-4 h-4 text-white" />
                                            </a>
                                            <a href={member.social.instagram} className="p-2 bg-white/20 backdrop-blur rounded-full hover:bg-[#ffcc00] transition-all">
                                                <Instagram className="w-4 h-4 text-white" />
                                            </a>
                                            <a href={member.social.linkedin} className="p-2 bg-white/20 backdrop-blur rounded-full hover:bg-[#ffcc00] transition-all">
                                                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-xl font-black text-[#2d3436] mb-1">{member.name}</h3>
                                <p className="text-[#ffcc00] font-bold text-sm mb-2">{member.role}</p>
                                <p className="text-gray-500 text-sm">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 px-5 bg-white">
                <div className="max-w-[1200px] mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-[#ffcc00] font-bold text-sm uppercase tracking-wider">LOVE FROM OUR COMMUNITY</span>
                        <h2 className="text-3xl md:text-4xl font-black text-[#2d3436] mt-2">What Travelers Say</h2>
                        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                            Don't take our word for it — hear from travelers who've used WanderTrip to plan their adventures.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.map((testimonial) => (
                            <div key={testimonial.id} className="bg-gray-50 p-8 rounded-3xl relative hover:shadow-xl transition-all">
                                <Quote className="absolute top-6 right-6 w-10 h-10 text-[#ffcc00]/20" />
                                <div className="flex items-center gap-4 mb-6">
                                    <img 
                                        src={testimonial.image} 
                                        alt={testimonial.name}
                                        className="w-16 h-16 rounded-2xl object-cover"
                                    />
                                    <div>
                                        <h4 className="font-black text-[#2d3436]">{testimonial.name}</h4>
                                        <p className="text-sm text-gray-500">{testimonial.location}</p>
                                        <div className="flex gap-1 mt-1">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 fill-[#ffcc00] text-[#ffcc00]" />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-600 italic">"{testimonial.text}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 px-5 bg-gradient-to-br from-[#ffcc00] to-[#ffd700]">
                <div className="max-w-[1200px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="text-[#2d3436]">
                            <span className="font-bold text-sm uppercase tracking-wider bg-white/20 px-4 py-2 rounded-full">GET IN TOUCH</span>
                            <h2 className="text-3xl md:text-4xl font-black mt-6 mb-4">We'd Love to Hear From You</h2>
                            <p className="text-lg mb-8 opacity-90">
                                Have questions, suggestions, or just want to say hello? Our team is always ready to help.
                            </p>
                            
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-white/20 rounded-xl">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold opacity-70">Email Us</p>
                                        <p className="font-black">hello@wandertrip.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-white/20 rounded-xl">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold opacity-70">Call Us</p>
                                        <p className="font-black">+63 (2) 8123 4567</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-white/20 rounded-xl">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold opacity-70">Visit Us</p>
                                        <p className="font-black">123 Travel Street, Makati City, Philippines</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex gap-4 mt-8">
                                <a href="#" className="p-3 bg-[#2d3436] text-white rounded-xl hover:bg-black transition-all">
                                    <Facebook className="w-5 h-5" />
                                </a>
                                <a href="#" className="p-3 bg-[#2d3436] text-white rounded-xl hover:bg-black transition-all">
                                    <Twitter className="w-5 h-5" />
                                </a>
                                <a href="#" className="p-3 bg-[#2d3436] text-white rounded-xl hover:bg-black transition-all">
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a href="#" className="p-3 bg-[#2d3436] text-white rounded-xl hover:bg-black transition-all">
                                    <Youtube className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                        
                        <div className="bg-white p-8 rounded-3xl shadow-2xl">
                            <h3 className="text-2xl font-black text-[#2d3436] mb-6">Send Us a Message</h3>
                            <form className="space-y-4">
                                <div>
                                    <input 
                                        type="text" 
                                        placeholder="Your Name"
                                        className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:border-[#ffcc00] focus:outline-none focus:ring-2 focus:ring-[#ffcc00]/20 transition-all"
                                    />
                                </div>
                                <div>
                                    <input 
                                        type="email" 
                                        placeholder="Your Email"
                                        className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:border-[#ffcc00] focus:outline-none focus:ring-2 focus:ring-[#ffcc00]/20 transition-all"
                                    />
                                </div>
                                <div>
                                    <textarea 
                                        rows="4"
                                        placeholder="Your Message"
                                        className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:border-[#ffcc00] focus:outline-none focus:ring-2 focus:ring-[#ffcc00]/20 transition-all resize-none"
                                    ></textarea>
                                </div>
                                <button className="w-full py-4 bg-gradient-to-r from-[#ffcc00] to-[#ffd700] text-[#2d3436] font-black rounded-xl hover:shadow-xl transition-all active:scale-95">
                                    SEND MESSAGE
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-5 bg-[#2d3436]">
                <div className="max-w-[1200px] mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                        Ready to Start Your Journey?
                    </h2>
                    <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                        Join thousands of travelers who trust WanderTrip for their adventures.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-10 py-5 bg-[#ffcc00] text-[#2d3436] font-black rounded-2xl hover:bg-[#ffd700] transition-all flex items-center gap-2 justify-center">
                            Explore Destinations <ChevronRight className="w-5 h-5" />
                        </button>
                        <button className="px-10 py-5 bg-transparent border-2 border-white text-white font-black rounded-2xl hover:bg-white hover:text-[#2d3436] transition-all">
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default About;