import { Link } from 'react-router-dom';
import { FaCode, FaMobileAlt, FaDesktop, FaMicrochip, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Footer from '../components/Footer';
import ImageSlider from '../components/ImageSlider';
import { motion } from 'framer-motion';
import MagneticWrapper from '../components/MagneticWrapper';

const portfolioSlides = [
    { src: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=1400&h=500&fit=crop', alt: 'Portfolio 1' },
    { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&h=500&fit=crop', alt: 'Portfolio 2' },
    { src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1400&h=500&fit=crop', alt: 'Portfolio 3' },
];

const projects = [
    { name: 'E-Commerce Platform', type: 'Website Development', desc: 'A fully responsive online store with payment integration and inventory management.', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop' },
    { name: 'Fitness Tracker App', type: 'App Development', desc: 'Cross-platform mobile app for tracking workouts, nutrition, and health metrics.', image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=600&h=400&fit=crop' },
    { name: 'Smart Home System', type: 'Hardware Projects', desc: 'IoT-based home automation system using Arduino and Raspberry Pi.', image: 'https://images.unsplash.com/photo-1519558260268-cde7e03a0152?w=600&h=400&fit=crop' },
    { name: 'Inventory Manager', type: 'Software Projects', desc: 'Desktop application for managing warehouse inventory with barcode scanning.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop' },
    { name: 'Restaurant Website', type: 'Website Development', desc: 'Modern restaurant website with online ordering and table reservation system.', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop' },
    { name: 'Learning Platform', type: 'Software Projects', desc: 'Online education platform with video courses, quizzes, and progress tracking.', image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=400&fit=crop' },
];

const servicesSummary = [
    { icon: <FaCode />, title: 'Website Development', slug: 'website-development' },
    { icon: <FaMobileAlt />, title: 'App Development', slug: 'app-development' },
    { icon: <FaDesktop />, title: 'Software Projects', slug: 'software-projects' },
    { icon: <FaMicrochip />, title: 'Hardware Projects', slug: 'hardware-projects' },
];

export default function Projects() {
    return (
        <div className="min-h-screen">


            {/* Hero Section */}
            <div className="pt-20">
                <ImageSlider images={portfolioSlides} height="h-[400px]" />
            </div>

            {/* Portfolio Grid */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <span className="text-primary font-body text-sm font-semibold uppercase tracking-widest">Our Work</span>
                        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mt-3">Projects</h2>
                        <p className="text-white/50 font-body text-lg mt-4 max-w-2xl mx-auto">
                            Explore a selection of projects we've delivered for our clients.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: i * 0.15, type: "spring", stiffness: 100 }}
                                className="glass-card overflow-hidden group relative cursor-pointer hover:shadow-[0_0_40px_rgba(0,87,255,0.2)] hover:border-primary/30 transition-shadow duration-500"
                            >
                                <div className="relative h-[320px] overflow-hidden">
                                    <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />
                                    <img
                                        src={project.image}
                                        alt={project.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-dark via-dark/80 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                                    <span className="absolute top-4 right-4 px-3 py-1 bg-dark/50 backdrop-blur-md text-white text-xs font-body font-semibold rounded-full z-20 shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-white/10 group-hover:bg-primary/80 group-hover:border-primary/50 transition-colors duration-300">
                                        {project.type}
                                    </span>

                                    {/* Dark overlay info slide up */}
                                    <div className="absolute inset-x-0 bottom-0 p-6 translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] z-20 flex flex-col justify-end h-full">
                                        <h3 className="text-2xl font-heading font-semibold text-white mb-2 group-hover:text-primary transition-colors duration-300">{project.name}</h3>
                                        <p className="text-white/70 font-body text-sm mb-4 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{project.desc}</p>
                                        <button className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white font-body font-semibold text-sm hover:tracking-wider transition-all duration-300 flex items-center gap-2 group/btn">
                                            View Project <span className="text-primary group-hover/btn:translate-x-2 transition-transform duration-300">→</span>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Services Summary */}
            <section className="py-20 bg-dark-light/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl font-heading font-bold text-white">Our Services</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {servicesSummary.map((s, i) => (
                            <Link
                                key={i}
                                to={`/services/${s.slug}`}
                                className="glass-card p-6 text-center group"
                            >
                                <div className="text-3xl text-primary mb-3 group-hover:scale-110 transition-transform duration-300 inline-block">
                                    {s.icon}
                                </div>
                                <p className="text-white/80 font-body text-sm font-semibold">{s.title}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-heading font-bold text-white mb-8">Get In Touch</h2>
                    <div className="flex flex-wrap justify-center gap-8 mb-10">
                        <div className="flex items-center gap-3 text-white/60 font-body">
                            <FaPhone className="text-primary" /> +91 XXXXX XXXXX
                        </div>
                        <div className="flex items-center gap-3 text-white/60 font-body">
                            <FaEnvelope className="text-primary" /> info@alphasolution.in
                        </div>
                        <div className="flex items-center gap-3 text-white/60 font-body">
                            <FaMapMarkerAlt className="text-primary" /> India
                        </div>
                    </div>
                    <MagneticWrapper intensity={0.2} className="mt-4">
                        <Link
                            to="/contact"
                            className="relative overflow-hidden group inline-block px-10 py-4 bg-primary text-white font-heading font-semibold text-base rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(0,87,255,0.4)] hover:shadow-[0_0_30px_rgba(0,87,255,0.6)]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                            <span className="relative z-10">Order Now</span>
                        </Link>
                    </MagneticWrapper>
                </div>
            </section>

            <Footer />
        </div>
    );
}
