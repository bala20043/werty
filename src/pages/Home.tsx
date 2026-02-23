import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaCode, FaMobileAlt, FaDesktop, FaMicrochip, FaPaintBrush, FaHeadset,
    FaClipboardList, FaCogs, FaRocket,
    FaReact, FaNodeJs, FaPython, FaWordpress,
    FaStar, FaQuoteLeft,
} from 'react-icons/fa';
import {
    SiFlutter, SiArduino, SiRaspberrypi, SiFirebase, SiTailwindcss,
    SiTypescript, SiMongodb, SiPostgresql,
} from 'react-icons/si';
import MagneticWrapper from '../components/MagneticWrapper';
import ImageSlider from '../components/ImageSlider';
import ServiceCard from '../components/ServiceCard';
import Footer from '../components/Footer';
import TypeWriter from '../components/TypeWriter';
import ClientLogos from '../components/ClientLogos';
import TrustBadges from '../components/TrustBadges';
import TeamSection from '../components/TeamSection';
import FreeConsultation from '../components/FreeConsultation';
import ComparisonTable from '../components/ComparisonTable';
import FAQ from '../components/FAQ';

const heroSlides = [
    { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&h=700&fit=crop', alt: 'Web Development' },
    { src: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1400&h=700&fit=crop', alt: 'App Development' },
    { src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&h=700&fit=crop', alt: 'Hardware Projects' },
    { src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1400&h=700&fit=crop', alt: 'Software Projects' },
];

const serviceNames = ['Website Development', 'App Development', 'Hardware Projects', 'Software Projects'];

const techSlides = [
    { src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1000&h=500&fit=crop', alt: 'Developer working' },
    { src: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1000&h=500&fit=crop', alt: 'Tech setup' },
    { src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1000&h=500&fit=crop', alt: 'Team working' },
    { src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1000&h=500&fit=crop', alt: 'Coding' },
];

const services = [
    { icon: <FaCode />, title: 'Website Development', description: 'Custom responsive websites built with modern frameworks and technologies.', price: '₹999', slug: 'website-development' },
    { icon: <FaMobileAlt />, title: 'App Development', description: 'Native & cross-platform mobile applications for iOS and Android.', price: '₹999', slug: 'app-development' },
    { icon: <FaDesktop />, title: 'Software Projects', description: 'Custom software solutions tailored to your business needs.', price: '₹999', slug: 'software-projects' },
    { icon: <FaMicrochip />, title: 'Hardware Projects', description: 'IoT, embedded systems, Arduino & Raspberry Pi based solutions.', price: '₹799', slug: 'hardware-projects' },
    { icon: <FaPaintBrush />, title: 'UI/UX Design', description: 'Beautiful, intuitive user interfaces and experience design.', price: '₹499', slug: 'website-development' },
    { icon: <FaHeadset />, title: 'IT Support', description: '24/7 technical support and maintenance for your digital assets.', price: '₹499/mo', slug: 'software-projects' },
];

const stats = [
    { value: 20, label: 'Projects Completed', suffix: '' },
    { value: 18, label: 'Happy Clients', suffix: '' },
    { value: 3, label: 'Years Experience', suffix: '+' },
    { value: 24, label: 'Support Available', suffix: '/7' },
];

const steps = [
    { icon: <FaClipboardList />, title: 'Submit Your Order', description: 'Tell us about your project requirements and goals.' },
    { icon: <FaCogs />, title: 'We Design & Build', description: 'Our expert team crafts your solution with precision.' },
    { icon: <FaRocket />, title: 'You Receive & Grow', description: 'Launch your project and watch your business grow.' },
];

const testimonials = [
    { name: 'Rahul Sharma', review: 'Alpha Solution delivered an amazing website for our business. Their attention to detail and professionalism is outstanding! The team was responsive throughout and made sure every requirement was met.', rating: 5 },
    { name: 'Priya Patel', review: 'The mobile app they developed exceeded our expectations. Fast delivery and excellent communication throughout. I highly recommend their services to anyone looking for quality tech solutions.', rating: 5 },
    { name: 'Amit Kumar', review: 'Their hardware solution for our IoT project was innovative and cost-effective. The team understood our business needs perfectly and delivered on time with great support.', rating: 5 },
    { name: 'Deepika Reddy', review: 'We needed a complete brand overhaul — website, app, and UI design. Alpha Solution handled everything flawlessly. Our customers love the new experience!', rating: 5 },
    { name: 'Vikash Singh', review: 'Professional service, transparent pricing, and no hidden costs. They kept us updated at every stage. Our software project was delivered exactly as promised.', rating: 4 },
    { name: 'Meera Joshi', review: 'The best tech partner we\'ve worked with. Their 24/7 support is genuinely available and helpful. They treat our project like their own. Truly trustworthy!', rating: 5 },
];

const techStack = [
    { icon: <FaReact />, name: 'React' },
    { icon: <FaNodeJs />, name: 'Node.js' },
    { icon: <SiFlutter />, name: 'Flutter' },
    { icon: <FaPython />, name: 'Python' },
    { icon: <SiArduino />, name: 'Arduino' },
    { icon: <SiRaspberrypi />, name: 'RPi' },
    { icon: <FaWordpress />, name: 'WordPress' },
    { icon: <SiFirebase />, name: 'Firebase' },
    { icon: <SiTailwindcss />, name: 'Tailwind' },
    { icon: <SiTypescript />, name: 'TypeScript' },
    { icon: <SiMongodb />, name: 'MongoDB' },
    { icon: <SiPostgresql />, name: 'PostgreSQL' },
];

export default function Home() {
    const { ref: statsRef, inView: statsInView } = useInView({ triggerOnce: true, threshold: 0.3 });
    const { ref: stepsRef } = useInView({ triggerOnce: true, threshold: 0.2 });
    const { ref: techRef, inView: techInView } = useInView({ triggerOnce: true, threshold: 0.2 });

    return (
        <div className="min-h-screen">


            {/* ============ SECTION 1: HERO SLIDER ============ */}
            <section className="relative overflow-hidden">
                {/* Animated Background Orbs */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse-glow z-0"></div>
                <div className="absolute bottom-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[80px] animate-float z-0"></div>

                <ImageSlider images={heroSlides} autoPlayInterval={3000} height="h-screen">
                    {(currentIndex) => (
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center relative z-10">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full">
                                <motion.div
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className="space-y-6"
                                >
                                    <div className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full hover:scale-105 transition-transform duration-300">
                                        <span className="text-primary font-body text-sm font-semibold">
                                            ⭐ Trusted by 50+ Clients Across India
                                        </span>
                                    </div>
                                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight">
                                        We Build <br />
                                        <TypeWriter />
                                    </h1>
                                    <p className="text-white/60 font-body text-lg max-w-lg">
                                        From idea to launch — professional websites, apps, software & hardware solutions with guaranteed satisfaction and on-time delivery.
                                    </p>
                                    <div className="flex flex-wrap gap-4 pt-2">
                                        <MagneticWrapper intensity={0.2}>
                                            <Link
                                                to="/contact"
                                                className="relative overflow-hidden group px-8 py-3.5 bg-primary text-white font-heading font-semibold text-sm rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(0,87,255,0.4)] hover:shadow-[0_0_30px_rgba(0,87,255,0.6)] block"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                                                <span className="relative z-10">Order Now — Free Quote</span>
                                            </Link>
                                        </MagneticWrapper>
                                        <MagneticWrapper intensity={0.1}>
                                            <Link
                                                to="/projects"
                                                className="block relative overflow-hidden px-8 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-heading font-semibold text-sm rounded-xl transition-all duration-300"
                                            >
                                                View Projects
                                            </Link>
                                        </MagneticWrapper>
                                    </div>
                                    <div className="flex items-center gap-6 pt-2">
                                        <div className="flex items-center gap-1 hover:scale-110 transition-transform duration-300">
                                            {[1, 2, 3, 4, 5].map(i => <FaStar key={i} className="text-yellow-400 text-sm" />)}
                                            <span className="text-white/50 font-body text-sm ml-1">4.9/5 Rating</span>
                                        </div>
                                        <div className="text-white/30 font-body text-sm">|  20 Projects Done</div>
                                    </div>
                                </motion.div>
                                <div className="hidden lg:flex justify-end" style={{ perspective: '1000px' }}>
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={currentIndex}
                                            initial={{ opacity: 0, rotateX: -90, y: 50 }}
                                            animate={{ opacity: 1, rotateX: 0, y: 0 }}
                                            exit={{ opacity: 0, rotateX: 90, y: -50 }}
                                            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                                            className="glass-card px-8 py-6 text-center shadow-2xl shadow-primary/20" style={{ background: 'rgba(0,87,255,0.08)' }}
                                        >
                                            <span className="text-primary font-body text-sm uppercase tracking-widest">Current Service</span>
                                            <h2 className="text-2xl font-heading font-bold text-white mt-2">
                                                {serviceNames[currentIndex]}
                                            </h2>
                                            <div className="mt-3 w-16 h-0.5 bg-primary mx-auto rounded-full" />
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    )}
                </ImageSlider>
            </section>

            {/* ============ CLIENT LOGOS STRIP ============ */}
            <ClientLogos />

            {/* ============ SECTION 2: TECH IMAGE SLIDER ============ */}
            <section className="py-20 bg-dark-light/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <span className="text-primary font-body text-sm font-semibold uppercase tracking-widest">Our Workspace</span>
                        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mt-3">
                            Where Innovation Happens
                        </h2>
                    </div>
                    <div className="rounded-2xl overflow-hidden border border-primary/10">
                        <ImageSlider images={techSlides} height="h-[400px]" showArrows={true} showDots={true} overlay={false} />
                    </div>
                </div>
            </section>

            {/* ============ SECTION 3: OUR SERVICES ============ */}
            <section id="about" className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <span className="text-primary font-body text-sm font-semibold uppercase tracking-widest">What We Offer</span>
                        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mt-3">
                            Our Services
                        </h2>
                        <p className="text-white/50 font-body text-lg mt-4 max-w-2xl mx-auto">
                            From web development to hardware solutions, we provide end-to-end technology services.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service, i) => (
                            <ServiceCard
                                key={i}
                                icon={service.icon}
                                title={service.title}
                                description={service.description}
                                price={service.price}
                                slug={service.slug}
                                index={i}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ FREE CONSULTATION BANNER ============ */}
            <FreeConsultation />

            {/* ============ SECTION 4: WHY CHOOSE US — STATS ============ */}
            <section className="py-20 bg-dark-light/30" ref={statsRef}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <span className="text-primary font-body text-sm font-semibold uppercase tracking-widest">Why Choose Us</span>
                        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mt-3">
                            Numbers Speak for Themselves
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1, type: "spring", stiffness: 120 }}
                                whileHover={{ y: -5, scale: 1.05 }}
                                className="glass-card p-8 text-center relative overflow-hidden group hover:border-primary/30 hover:shadow-[0_0_30px_rgba(0,87,255,0.15)] transition-all duration-500"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                                <div className="text-4xl sm:text-5xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#00a2ff] mb-2 relative z-10 drop-shadow-[0_0_15px_rgba(0,87,255,0.3)] transition-transform duration-300 group-hover:scale-110">
                                    {statsInView ? (
                                        <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} useEasing={true} />
                                    ) : (
                                        `0${stat.suffix}`
                                    )}
                                </div>
                                <p className="text-white/60 font-body text-base relative z-10 group-hover:text-white/90 transition-colors">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ TRUST BADGES ============ */}
            <TrustBadges />

            {/* ============ SECTION 5: HOW IT WORKS ============ */}
            <section className="py-20 bg-dark-light/30" ref={stepsRef}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <span className="text-primary font-body text-sm font-semibold uppercase tracking-widest">Simple Process</span>
                        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mt-3">
                            How It Works
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        {/* Connecting animated line */}
                        <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-[2px] bg-primary/10 overflow-hidden relative z-0">
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-primary to-transparent -translate-x-full animate-[shimmer_3s_infinite_linear]" />
                        </div>
                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: i * 0.2, type: "spring", stiffness: 100 }}
                                className="text-center relative group"
                            >
                                <div className="relative mx-auto w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-3xl mb-6 z-10 transition-transform duration-500 group-hover:scale-110 group-hover:bg-primary/20">
                                    {step.icon}
                                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-lg bg-primary text-white text-sm font-heading font-bold flex items-center justify-center shadow-lg shadow-primary/30 group-hover:animate-pulse-glow">
                                        {i + 1}
                                    </div>
                                </div>
                                <h3 className="text-xl font-heading font-semibold text-white mb-3 group-hover:text-primary transition-colors duration-300">{step.title}</h3>
                                <p className="text-white/50 font-body text-base">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ COMPARISON TABLE ============ */}
            <ComparisonTable />

            {/* ============ TEAM SECTION ============ */}
            <TeamSection />

            {/* ============ SECTION 6: TESTIMONIALS ============ */}
            <section className="py-20 bg-dark-light/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <span className="text-primary font-body text-sm font-semibold uppercase tracking-widest">Client Reviews</span>
                        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mt-3">
                            What Our Clients Say
                        </h2>
                        <p className="text-white/50 font-body text-lg mt-4 max-w-2xl mx-auto">
                            Don't just take our word for it — hear from our satisfied clients.
                        </p>
                    </div>
                    <div className="relative w-full overflow-hidden py-10" style={{ perspective: '1200px' }}>
                        {/* Gradient masks for smooth fade out on edges */}
                        <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none" />
                        <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none" />

                        <motion.div
                            className="flex gap-6 min-w-max w-max"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                            whileHover={{ animationPlayState: 'paused' }} /* Optional hover pause if not using GSAP */
                        >
                            {/* Render testimonials twice to create an infinite loop effect */}
                            {[1, 2].map((groupIndex) => (
                                <div key={groupIndex} className="flex gap-6">
                                    {testimonials.map((t, i) => (
                                        <motion.div
                                            key={`${groupIndex}-${i}`}
                                            whileHover={{ scale: 1.05, rotateY: 5, zIndex: 20 }}
                                            className="glass-card p-8 w-[350px] sm:w-[400px] flex-shrink-0 flex flex-col transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,87,255,0.15)] hover:border-primary/30 cursor-grab active:cursor-grabbing"
                                        >
                                            <FaQuoteLeft className="text-primary/30 text-3xl mb-4" />
                                            <p className="text-white/80 font-body text-sm leading-relaxed mb-6 flex-grow">
                                                "{t.review}"
                                            </p>
                                            <div className="flex items-center gap-1 mb-4">
                                                {Array.from({ length: 5 }).map((_, j) => (
                                                    <FaStar
                                                        key={j}
                                                        className={j < t.rating ? 'text-yellow-400 text-sm drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]' : 'text-white/20 text-sm'}
                                                    />
                                                ))}
                                            </div>
                                            <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/5">
                                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-heading font-bold text-sm shadow-inner shadow-primary/50">
                                                    {t.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-white font-heading font-semibold text-sm">{t.name}</p>
                                                    <p className="text-primary/70 font-body text-xs mt-0.5 tracking-wide">Verified Client</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ============ FAQ ============ */}
            <FAQ />

            {/* ============ SECTION 7: TECHNOLOGIES ============ */}
            <section className="py-20" ref={techRef}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <span className="text-primary font-body text-sm font-semibold uppercase tracking-widest">Our Stack</span>
                        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mt-3">
                            Technologies We Use
                        </h2>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
                        {techStack.map((tech, i) => (
                            <div
                                key={i}
                                className={`glass-card p-6 text-center transition-all duration-500 ${techInView ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                                    }`}
                                style={{ transitionDelay: `${i * 50}ms` }}
                            >
                                <div className="text-3xl text-primary mb-2">{tech.icon}</div>
                                <p className="text-white/60 font-body text-xs">{tech.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ SECTION 8: CTA BANNER ============ */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-3xl sm:text-5xl font-heading font-bold text-white mb-6">
                        Ready to Start Your <span className="text-primary inline-block animate-pulse-glow">Project</span>?
                    </h2>
                    <p className="text-white/60 font-body text-lg mb-4 max-w-2xl mx-auto">
                        Let's transform your ideas into reality. Get in touch today and let our experts build the perfect solution for you.
                    </p>
                    <p className="text-white/40 font-body text-sm mb-10">
                        ✅ Free Consultation  •  ✅ No Hidden Costs  •  ✅ 7-Day Money-Back Guarantee
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            to="/contact"
                            className="inline-block px-10 py-4 bg-primary text-white font-heading font-semibold text-base rounded-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(0,87,255,0.6)]"
                        >
                            Order Now
                        </Link>
                        <a
                            href="https://wa.me/91XXXXXXXXXX"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-10 py-4 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 font-heading font-semibold text-base rounded-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 hover:bg-[#25D366]/20 hover:shadow-[0_0_30px_rgba(37,211,102,0.4)]"
                        >
                            WhatsApp Us
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
