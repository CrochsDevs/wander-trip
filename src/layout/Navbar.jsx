import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../src/assets/logo/logo.png";
import {
    ChevronDown,
    Globe, Wallet,
    ShieldCheck,
    Briefcase
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    const languages = [
        { name: "English", code: "EN" },
        { name: "Tagalog", code: "TL" },
        { name: "Español", code: "ES" },
        { name: "Français", code: "FR" },
        { name: "Deutsch", code: "DE" },
        { name: "日本語", code: "JP" },
        { name: "한국어", code: "KR" },
        { name: "中文", code: "CN" },
        { name: "العربية", code: "AR" },
        { name: "Italiano", code: "IT" },
        { name: "Português", code: "PT" },
        { name: "Русский", code: "RU" },
        { name: "Tiếng Việt", code: "VN" },
        { name: "ไทย", code: "TH" },
        { name: "Bahasa Indonesia", code: "ID" },
        { name: "हिन्दी", code: "HI" },
        { name: "Türkçe", code: "TR" },
        { name: "Nederlands", code: "NL" }
    ];

    const [selectedLang, setSelectedLang] = useState(() => {
        const saved = localStorage.getItem('app_lang');
        if (saved) {
            const parsed = JSON.parse(saved);
            return languages.find(l => l.code === parsed.code) || languages[0];
        }
        return languages[0];
    });

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        localStorage.setItem('app_lang', JSON.stringify(selectedLang));
    }, [selectedLang]);

    return (
        <header
            className={`fixed top-0 w-full z-[9999] transition-all duration-300 flex items-center bg-white border-b ${isScrolled ? 'h-16 shadow-md border-gray-100' : 'h-20 shadow-none border-transparent'
                }`}
        >
            <nav className="max-w-[1200px] w-full mx-auto px-5 flex justify-between items-center h-full">


                <div className="flex items-center w-[150px] h-full">
                    <Link to="/home" className="flex items-center no-underline">
                        <img
                            src={logo}
                            alt="Logo"
                            className="w-auto object-contain transition-all duration-300"
                            style={{ height: isScrolled ? '45px' : '55px' }}
                        />
                    </Link>
                </div>

                <ul className="flex list-none gap-1 items-center m-0 p-0">
                    <li>
                        <Link to="/home" className="inline-flex items-center justify-center min-w-[80px] px-3 py-2 font-semibold text-sm rounded-lg transition-colors text-[#2d3436] hover:text-[#ffcc00]">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/destination" className="inline-flex items-center justify-center min-w-[100px] px-3 py-2 font-semibold text-sm rounded-lg transition-colors text-[#2d3436] hover:text-[#ffcc00]">
                            Destination
                        </Link>
                    </li>
                    <li>
                        <Link to="/guide" className="inline-flex items-center justify-center min-w-[80px] px-3 py-2 font-semibold text-sm rounded-lg transition-colors text-[#2d3436] hover:text-[#ffcc00]">
                            Guides
                        </Link>
                    </li>

                    <li>
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger className="inline-flex items-center justify-center gap-1.5 min-w-[110px] px-3 py-2 font-semibold text-sm rounded-lg transition-colors text-[#2d3436] hover:text-[#ffcc00] outline-none focus:ring-0 group">
                                <span className="whitespace-nowrap">Travel Tips</span>
                                <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180 shrink-0" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" sideOffset={12} className="w-52 bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-[9999]">
                                <DropdownMenuItem asChild>
                                    <Link to="/budget" className="flex items-center gap-3 px-3 py-2.5 text-sm cursor-pointer rounded-md hover:bg-gray-50 hover:text-[#ffcc00] outline-none border-none">
                                        <Wallet className="w-4 h-4 text-gray-500" /> Budget Tips
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link to="/safety" className="flex items-center gap-3 px-3 py-2.5 text-sm cursor-pointer rounded-md hover:bg-gray-50 hover:text-[#ffcc00] outline-none border-none">
                                        <ShieldCheck className="w-4 h-4 text-gray-500" /> Safety Tips
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link to="/packing" className="flex items-center gap-3 px-3 py-2.5 text-sm cursor-pointer rounded-md hover:bg-gray-50 hover:text-[#ffcc00] outline-none border-none">
                                        <Briefcase className="w-4 h-4 text-gray-500" /> Packing Tips
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </li>

                    <li>
                        <Link to="/about" className="inline-flex items-center justify-center min-w-[70px] px-3 py-2 font-semibold text-sm rounded-lg transition-colors text-[#2d3436] hover:text-[#ffcc00]">
                            About
                        </Link>
                    </li>


                    <li>
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger className="inline-flex items-center justify-center gap-2 min-w-[90px] px-3 py-2 font-semibold text-sm rounded-lg transition-colors text-[#2d3436] hover:text-[#ffcc00] outline-none focus:ring-0 group">
                                <Globe className="w-4 h-4 shrink-0" />
                                <span className="w-[25px] text-center font-bold tabular-nums uppercase">{selectedLang.code}</span>
                                <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180 shrink-0" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                sideOffset={12}
                                className="w-48 max-h-[280px] overflow-y-auto bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-[9999] scrollbar-thin scrollbar-thumb-gray-200"
                            >
                                {languages.map((lang, index) => (
                                    <DropdownMenuItem
                                        key={index}
                                        onClick={() => setSelectedLang(lang)}
                                        className={`flex items-center justify-between px-3 py-2.5 text-sm cursor-pointer rounded-md transition-colors outline-none border-none ${selectedLang.code === lang.code ? 'bg-gray-50 text-[#ffcc00]' : 'hover:bg-gray-50 hover:text-[#ffcc00]'
                                            }`}
                                    >
                                        <span className="font-medium">{lang.name}</span>
                                        <span className="text-[10px] text-gray-400 font-mono font-bold uppercase">{lang.code}</span>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;