import { motion } from 'framer-motion';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';

const team = [
    {
        name: 'Alpha Solution Team',
        role: 'Full-Stack Developers',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=400&fit=crop&crop=faces',
        bio: 'Expert developers building modern web & mobile solutions.',
    },
    {
        name: 'Design Studio',
        role: 'UI/UX Design Team',
        image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=400&fit=crop&crop=faces',
        bio: 'Creative designers crafting beautiful user experiences.',
    },
    {
        name: 'Hardware Lab',
        role: 'IoT & Embedded Team',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=faces',
        bio: 'Electronics experts bringing hardware ideas to life.',
    },
    {
        name: 'Support Desk',
        role: '24/7 Support Team',
        image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=400&fit=crop&crop=faces',
        bio: 'Dedicated support ensuring your project runs smoothly.',
    },
];

export default function TeamSection() {
    return (
        <section className="py-20 relative overflow-hidden">
            <div className="absolute top-1/3 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] animate-pulse-glow z-0"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-14">
                    <span className="text-primary font-body text-sm font-semibold uppercase tracking-widest">
                        Meet Our Experts
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mt-3">
                        The Team Behind Your <span className="text-primary">Success</span>
                    </h2>
                    <p className="text-white/50 font-body text-lg mt-4 max-w-2xl mx-auto">
                        Skilled professionals passionate about delivering excellence.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {team.map((member, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: i * 0.1, type: "spring", stiffness: 100 }}
                            whileHover={{ y: -10 }}
                            className="glass-card overflow-hidden group hover:shadow-[0_0_20px_rgba(0,87,255,0.15)] transition-all duration-300"
                        >
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent" />
                                <div className="absolute bottom-3 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                    <a href="#" className="w-8 h-8 rounded-lg bg-primary/80 flex items-center justify-center text-white text-xs hover:bg-primary transition-colors">
                                        <FaLinkedinIn />
                                    </a>
                                    <a href="#" className="w-8 h-8 rounded-lg bg-primary/80 flex items-center justify-center text-white text-xs hover:bg-primary transition-colors">
                                        <FaGithub />
                                    </a>
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="text-base font-heading font-semibold text-white">{member.name}</h3>
                                <p className="text-primary font-body text-xs font-semibold mt-1">{member.role}</p>
                                <p className="text-white/40 font-body text-sm mt-2 leading-relaxed">{member.bio}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
