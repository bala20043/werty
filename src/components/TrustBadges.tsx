import { motion } from 'framer-motion';
import { FaShieldAlt, FaUndoAlt, FaBolt, FaLock, FaHeadset, FaMedal } from 'react-icons/fa';

const badges = [
    { icon: <FaShieldAlt />, title: '100% Secure', desc: 'Your data & project details are fully protected' },
    { icon: <FaUndoAlt />, title: 'Money-Back Guarantee', desc: 'Not satisfied? Get a full refund within 7 days' },
    { icon: <FaBolt />, title: 'Fast Delivery', desc: 'On-time delivery every single project guaranteed' },
    { icon: <FaLock />, title: 'NDA Protection', desc: 'Your ideas stay confidential with signed NDA' },
    { icon: <FaHeadset />, title: '24/7 Support', desc: 'Round-the-clock assistance whenever you need' },
    { icon: <FaMedal />, title: 'Quality Assured', desc: 'Rigorous QA testing before every delivery' },
];

export default function TrustBadges() {
    return (
        <section className="py-20 relative overflow-hidden">
            <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] animate-float z-0"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-14">
                    <span className="text-primary font-body text-sm font-semibold uppercase tracking-widest">
                        Your Trust Matters
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mt-3">
                        Why Clients <span className="text-primary">Trust</span> Us
                    </h2>
                    <p className="text-white/50 font-body text-lg mt-4 max-w-2xl mx-auto">
                        We go the extra mile to ensure your project is in safe hands.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {badges.map((badge, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: i * 0.1, type: "spring", stiffness: 120 }}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className="glass-card p-7 flex items-start gap-5 group cursor-pointer relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-xl flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 relative z-10">
                                {badge.icon}
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-base font-heading font-semibold text-white mb-1 group-hover:text-primary transition-colors duration-300">
                                    {badge.title}
                                </h3>
                                <p className="text-white/50 font-body text-sm leading-relaxed">
                                    {badge.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
