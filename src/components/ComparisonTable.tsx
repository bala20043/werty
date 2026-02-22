import { motion } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const features = [
    { feature: 'Modern Tech Stack', us: true, others: false },
    { feature: 'Dedicated Project Manager', us: true, others: false },
    { feature: 'Free Consultation', us: true, others: false },
    { feature: 'Unlimited Revisions', us: true, others: false },
    { feature: '7-Day Money-Back Guarantee', us: true, others: false },
    { feature: 'Post-Launch Support', us: true, others: true },
    { feature: 'Transparent Pricing', us: true, others: false },
    { feature: 'Source Code Ownership', us: true, others: true },
    { feature: 'NDA & Confidentiality', us: true, others: false },
    { feature: 'On-Time Delivery', us: true, others: false },
];

export default function ComparisonTable() {
    return (
        <section className="py-20 relative overflow-hidden">
            <div className="absolute top-1/4 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] animate-float z-0"></div>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-14">
                    <span className="text-primary font-body text-sm font-semibold uppercase tracking-widest">
                        Compare & Decide
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mt-3">
                        Alpha Solution vs <span className="text-white/30">Others</span>
                    </h2>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
                    className="glass-card overflow-hidden hover:shadow-[0_0_30px_rgba(0,87,255,0.1)] transition-shadow duration-500"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-primary/10">
                                    <th className="px-6 py-5 text-left text-sm font-heading font-semibold text-white/60">Feature</th>
                                    <th className="px-6 py-5 text-center text-sm font-heading font-semibold text-primary">
                                        Alpha Solution
                                    </th>
                                    <th className="px-6 py-5 text-center text-sm font-heading font-semibold text-white/30">
                                        Others
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {features.map((row, i) => (
                                    <motion.tr
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: i * 0.05 }}
                                        className="border-b border-primary/5 hover:bg-primary/10 transition-colors group"
                                    >
                                        <td className="px-6 py-4 text-white/70 font-body text-sm">{row.feature}</td>
                                        <td className="px-6 py-4 text-center">
                                            <FaCheckCircle className="text-green-400 mx-auto" />
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {row.others ? (
                                                <FaCheckCircle className="text-white/20 mx-auto group-hover:text-white/40 transition-colors" />
                                            ) : (
                                                <FaTimesCircle className="text-red-400/50 mx-auto group-hover:text-red-400 transition-colors" />
                                            )}
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
