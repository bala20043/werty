import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import ImageSlider from '../components/ImageSlider';
import OrderForm from '../components/OrderForm';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ServiceData {
    title: string;
    description: string;
    features: string[];
    images: { src: string; alt: string }[];
    pricing: {
        basic: { price: string; features: string[] };
        standard: { price: string; features: string[] };
        premium: { price: string; features: string[] };
    };
}

const servicesData: Record<string, ServiceData> = {
    'website-development': {
        title: 'Website Development',
        description: 'We create stunning, responsive, and high-performing websites tailored to your business needs. From simple landing pages to complex e-commerce platforms, our team delivers exceptional web experiences using the latest technologies like React, Next.js, and modern CSS frameworks.',
        features: ['Responsive Design', 'SEO Optimized', 'Fast Loading Speed', 'Custom CMS', 'E-Commerce Integration', 'SSL Security', 'Analytics Dashboard', 'Social Media Integration'],
        images: [
            { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=500&fit=crop', alt: 'Web Dev 1' },
            { src: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&h=500&fit=crop', alt: 'Web Dev 2' },
            { src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=500&fit=crop', alt: 'Web Dev 3' },
        ],
        pricing: {
            basic: { price: '₹499', features: ['5 Pages', 'Responsive Design', 'Contact Form', 'Basic SEO', '1 Month Support'] },
            standard: { price: '₹799', features: ['10 Pages', 'Custom Design', 'CMS Integration', 'Advanced SEO', 'Analytics', '3 Months Support'] },
            premium: { price: '₹999', features: ['Unlimited Pages', 'E-Commerce', 'Custom Features', 'Full SEO Suite', 'Priority Support', '6 Months Support'] },
        },
    },
    'app-development': {
        title: 'App Development',
        description: 'Build powerful mobile applications for iOS and Android with our expert app development services. We use Flutter and React Native for cross-platform development, ensuring your app reaches the widest audience with a single codebase while maintaining native-like performance.',
        features: ['Cross-Platform', 'Native Performance', 'Push Notifications', 'Offline Mode', 'Payment Integration', 'API Integration', 'App Store Publishing', 'User Analytics'],
        images: [
            { src: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=500&fit=crop', alt: 'App Dev 1' },
            { src: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=500&fit=crop', alt: 'App Dev 2' },
            { src: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=1200&h=500&fit=crop', alt: 'App Dev 3' },
        ],
        pricing: {
            basic: { price: '₹499', features: ['3 Screens', 'Basic UI', 'API Integration', 'Android Only', '1 Month Support'] },
            standard: { price: '₹799', features: ['8 Screens', 'Custom UI/UX', 'Push Notifications', 'iOS + Android', 'Payment Gateway', '3 Months Support'] },
            premium: { price: '₹999', features: ['Unlimited Screens', 'Advanced Features', 'Admin Panel', 'Full Analytics', 'Store Publishing', '6 Months Support'] },
        },
    },
    'software-projects': {
        title: 'Software Projects',
        description: 'From desktop applications to enterprise solutions, we develop custom software that streamlines your business operations. Our team specializes in scalable, secure, and maintainable software using Python, Node.js, and modern development frameworks.',
        features: ['Custom Solutions', 'Database Design', 'API Development', 'Cloud Deployment', 'Security First', 'Scalable Architecture', 'Documentation', 'Training'],
        images: [
            { src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=500&fit=crop', alt: 'Software 1' },
            { src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=500&fit=crop', alt: 'Software 2' },
            { src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=500&fit=crop', alt: 'Software 3' },
        ],
        pricing: {
            basic: { price: '₹499', features: ['Basic Features', 'Single User', 'Local Setup', 'Basic Support', '1 Month Support'] },
            standard: { price: '₹799', features: ['Full Features', 'Multi-User', 'Cloud Deploy', 'Admin Panel', 'Database', '3 Months Support'] },
            premium: { price: '₹999', features: ['Enterprise Grade', 'Unlimited Users', 'Custom Integrations', 'Full Security Audit', 'Priority Support', '6 Months Support'] },
        },
    },
    'hardware-projects': {
        title: 'Hardware Projects',
        description: 'We bring your hardware ideas to life with Arduino, Raspberry Pi, and custom electronics. From IoT devices to automation systems, our team handles PCB design, prototyping, firmware development, and final product assembly.',
        features: ['Arduino / ESP32', 'Raspberry Pi', 'PCB Design', 'IoT Solutions', 'Sensor Integration', 'Wireless Communication', 'Firmware Development', 'Prototype to Product'],
        images: [
            { src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=500&fit=crop', alt: 'Hardware 1' },
            { src: 'https://images.unsplash.com/photo-1519558260268-cde7e03a0152?w=1200&h=500&fit=crop', alt: 'Hardware 2' },
            { src: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=1200&h=500&fit=crop', alt: 'Hardware 3' },
        ],
        pricing: {
            basic: { price: '₹499', features: ['Basic Circuit', 'Single Sensor', 'Arduino Based', 'Basic Code', '1 Month Support'] },
            standard: { price: '₹799', features: ['Custom PCB', 'Multi-Sensor', 'WiFi/Bluetooth', 'Mobile App', 'Cloud Dashboard', '3 Months Support'] },
            premium: { price: '₹999', features: ['Full Product', 'Industrial Grade', 'Custom Enclosure', 'Mass Production Ready', 'Full Documentation', '6 Months Support'] },
        },
    },
};

const tierLabels = ['Basic', 'Standard', 'Premium'] as const;
const tierKeys = ['basic', 'standard', 'premium'] as const;
const tierColors = ['border-white/10', 'border-primary', 'border-white/10'];

export default function ServiceDetail() {
    const { id } = useParams<{ id: string }>();
    const service = servicesData[id || ''];

    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 150]);

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-white/50 font-body text-xl">Service not found.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen">


            {/* Hero Slider Parallax Container */}
            <div className="relative h-[600px] overflow-hidden">
                <motion.div style={{ y }} className="absolute inset-x-0 -top-[20%] h-[140%]">
                    <ImageSlider images={service.images} height="h-full">
                        {() => (
                            <div className="flex items-center justify-center h-full mt-20 px-4">
                                <motion.h1
                                    initial={{ opacity: 0, y: 40, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                    className="text-4xl sm:text-5xl lg:text-7xl font-heading font-bold text-white text-center drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]"
                                >
                                    {service.title}
                                </motion.h1>
                            </div>
                        )}
                    </ImageSlider>
                </motion.div>
                {/* Dark gradient fade at the bottom to blend into the next section */}
                <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-dark to-transparent z-10" />
            </div>

            {/* Description & Features */}
            <section className="py-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="glass-card p-10">
                        <h2 className="text-2xl font-heading font-bold text-white mb-6">{service.title}</h2>
                        <p className="text-white/60 font-body text-lg leading-relaxed mb-8">
                            {service.description}
                        </p>
                        <h3 className="text-lg font-heading font-semibold text-primary mb-4">Key Features</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {service.features.map((f, i) => (
                                <div key={i} className="flex items-center gap-2 text-white/70 font-body text-sm">
                                    <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                                    {f}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Table */}
            <section className="py-20 bg-dark-light/30">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <span className="text-primary font-body text-sm font-semibold uppercase tracking-widest">Pricing</span>
                        <h2 className="text-3xl font-heading font-bold text-white mt-3">Choose Your Plan</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ perspective: '1200px' }}>
                        {tierKeys.map((tier, i) => (
                            <motion.div
                                key={tier}
                                initial={{ opacity: 0, rotateY: 90 }}
                                whileInView={{ opacity: 1, rotateY: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.8, delay: i * 0.2, type: "spring", stiffness: 70 }}
                                className={`glass-card p-8 border-2 transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,87,255,0.15)] hover:-translate-y-2 ${tierColors[i]} ${i === 1 ? 'relative scale-105 z-10 shadow-[0_0_30px_rgba(0,87,255,0.1)]' : ''
                                    }`}
                            >
                                {i === 1 && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white font-heading text-xs font-bold rounded-full">
                                        Popular
                                    </div>
                                )}
                                <h3 className="text-lg font-heading font-semibold text-white mb-2">{tierLabels[i]}</h3>
                                <div className="text-3xl font-heading font-bold text-primary mb-6">
                                    {service.pricing[tier].price}
                                </div>
                                <ul className="space-y-3 mb-8">
                                    {service.pricing[tier].features.map((f, j) => (
                                        <li key={j} className="flex items-center gap-2 text-white/60 font-body text-sm">
                                            <span className="text-primary">✓</span> {f}
                                        </li>
                                    ))}
                                </ul>
                                <motion.a
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    href="#order-form"
                                    className={`block text-center py-3 rounded-xl font-heading font-semibold text-sm transition-all duration-300 ${i === 1
                                        ? 'bg-primary hover:bg-primary/80 text-white shadow-lg shadow-primary/30'
                                        : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                                        }`}
                                >
                                    Get Started
                                </motion.a>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Order Form */}
            <section id="order-form" className="py-20">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-heading font-bold text-white">Place Your Order</h2>
                        <p className="text-white/50 font-body text-base mt-3">Fill in the details below and we'll get started on your project.</p>
                    </div>
                    <div className="glass-card p-8">
                        <OrderForm preSelectedService={service.title} />
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
