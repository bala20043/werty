import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ServiceCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    price: string;
    slug: string;
    index: number;
}

export default function ServiceCard({ icon, title, description, price, slug, index }: ServiceCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 100 }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="glass-card p-8 flex flex-col group relative overflow-hidden cursor-pointer hover:shadow-[0_10px_40px_-10px_rgba(0,87,255,0.3)] hover:border-primary/30 transition-all duration-500"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>

            {/* Animated border glow line */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent -translate-x-full group-hover:animate-shimmer opacity-0 group-hover:opacity-100 z-0" />

            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-2xl mb-5 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 relative z-10 group-hover:shadow-[0_0_20px_rgba(0,87,255,0.4)] group-hover:bg-primary/20">
                {icon}
            </div>
            <h3 className="text-xl font-heading font-semibold text-white mb-3 group-hover:text-primary transition-colors duration-300 relative z-10">{title}</h3>
            <p className="text-white/60 font-body text-base leading-relaxed flex-grow mb-5 relative z-10">{description}</p>
            <div className="flex items-center justify-between relative z-10">
                <span className="text-primary font-heading font-semibold text-sm">Starting {price}</span>
                <Link
                    to={`/services/${slug}`}
                    className="text-sm font-body font-semibold text-white/70 group-hover:text-primary transition-colors duration-300 flex items-center gap-1 group-hover:translate-x-1"
                >
                    Learn More →
                </Link>
            </div>
        </motion.div>
    );
}
