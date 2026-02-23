import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaPhone } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticWrapper from './MagneticWrapper';

const services = [
    { name: 'Website Development', slug: 'website-development' },
    { name: 'App Development', slug: 'app-development' },
    { name: 'Software Projects', slug: 'software-projects' },
    { name: 'Hardware Projects', slug: 'hardware-projects' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const isHomePage = location.pathname === '/';

        if (!isHomePage) {
            setScrolled(true);
            return;
        }

        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        // Check initial state
        handleScroll();

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname]);

    useEffect(() => {
        setMobileOpen(false);
    }, [location]);

    const handleLogoDoubleClick = () => {
        navigate('/admin-login');
    };

    if (location.pathname.startsWith('/admin')) {
        return null;
    }

    return (
        <motion.nav
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled
                ? 'bg-dark/95 backdrop-blur-xl shadow-lg shadow-primary/10 border-b border-white/5'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div
                        className="flex items-center cursor-pointer select-none"
                        onDoubleClick={handleLogoDoubleClick}
                    >
                        <span className="text-2xl font-heading font-bold text-white tracking-wider">
                            Alpha<span className="text-primary"> Solution</span>
                        </span>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            to="/"
                            className="relative text-white/80 hover:text-white font-body text-lg font-medium transition-colors duration-300 group"
                        >
                            Home
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <a
                            href="/#about"
                            className="relative text-white/80 hover:text-white font-body text-lg font-medium transition-colors duration-300 group"
                        >
                            About
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                        </a>

                        {/* Services Dropdown */}
                        <div
                            className="relative group"
                            onMouseEnter={() => setServicesOpen(true)}
                            onMouseLeave={() => setServicesOpen(false)}
                        >
                            <button className="relative text-white/80 hover:text-white font-body text-lg font-medium transition-colors duration-300 flex items-center gap-1 group">
                                Services
                                <svg
                                    className={`w-4 h-4 transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                            </button>

                            <AnimatePresence>
                                {servicesOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                        transition={{ duration: 0.2, type: "spring", stiffness: 300, damping: 20 }}
                                        className="absolute top-full left-0 mt-2 w-64 bg-dark-light/95 backdrop-blur-xl rounded-xl border border-primary/20 shadow-[-10px_10px_30px_rgba(0,87,255,0.1)] overflow-hidden origin-top-left"
                                    >
                                        {services.map((service) => (
                                            <Link
                                                key={service.slug}
                                                to={`/services/${service.slug}`}
                                                className="block px-5 py-3 text-white/80 hover:text-white hover:bg-primary/10 font-body text-base transition-all duration-200"
                                            >
                                                {service.name}
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Link
                            to="/projects"
                            className="relative text-white/80 hover:text-white font-body text-lg font-medium transition-colors duration-300 group"
                        >
                            Projects
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link
                            to="/contact"
                            className="relative text-white/80 hover:text-white font-body text-lg font-medium transition-colors duration-300 group"
                        >
                            Contact
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </div>

                    {/* Phone Number */}
                    <div className="hidden md:flex items-center">
                        <MagneticWrapper intensity={0.1}>
                            <a
                                href="tel:+919942712219"
                                className="flex items-center gap-2 text-primary font-body text-lg font-semibold animate-pulse-glow px-4 py-2 rounded-full border border-primary/30 hover:bg-primary/10 transition-colors"
                            >
                                <FaPhone className="text-sm" />
                                +91 99427 12219
                            </a>
                        </MagneticWrapper>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white text-2xl"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <HiX /> : <HiMenu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden absolute w-full bg-dark-light/95 backdrop-blur-md border-t border-primary/10 transition-all duration-300 overflow-hidden ${mobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="px-6 py-4 space-y-3">
                    <Link to="/" className="block text-white/80 hover:text-primary font-body text-lg py-2">
                        Home
                    </Link>
                    <a href="/#about" className="block text-white/80 hover:text-primary font-body text-lg py-2">
                        About
                    </a>
                    <div>
                        <button
                            onClick={() => setServicesOpen(!servicesOpen)}
                            className="w-full text-left text-white/80 hover:text-primary font-body text-lg py-2 flex items-center justify-between"
                        >
                            Services
                            <svg
                                className={`w-4 h-4 transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''
                                    }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <div className={`pl-4 space-y-1 overflow-hidden transition-all duration-300 ${servicesOpen ? 'max-h-48' : 'max-h-0'}`}>
                            {services.map((service) => (
                                <Link
                                    key={service.slug}
                                    to={`/services/${service.slug}`}
                                    className="block text-white/60 hover:text-primary font-body text-base py-1.5"
                                >
                                    {service.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <Link to="/projects" className="block text-white/80 hover:text-primary font-body text-lg py-2">
                        Projects
                    </Link>
                    <Link to="/contact" className="block text-white/80 hover:text-primary font-body text-lg py-2">
                        Contact
                    </Link>
                    <a href="tel:+919942712219" className="flex items-center gap-2 text-primary font-body text-lg py-2">
                        <FaPhone className="text-sm" /> +91 99427 12219
                    </a>
                </div>
            </div>
        </motion.nav>
    );
}
