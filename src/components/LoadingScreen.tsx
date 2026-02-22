import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[99999] bg-dark flex items-center justify-center overflow-hidden"
                >
                    {/* Subtle grid background */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#0057FF10_1px,transparent_1px),linear-gradient(to_bottom,#0057FF10_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

                    <div className="relative flex flex-col items-center gap-8">
                        {/* Animated Tech Circles */}
                        <div className="relative w-24 h-24">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 border-t-2 border-r-2 border-primary rounded-full"
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-2 border-l-2 border-b-2 border-white/20 rounded-full"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    className="w-4 h-4 bg-primary rounded-full shadow-[0_0_15px_#0057FF]"
                                />
                            </div>
                        </div>

                        {/* Logo Text */}
                        <motion.span
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="text-2xl font-heading font-bold text-white tracking-[0.3em] uppercase relative z-10"
                        >
                            Alpha<span className="text-primary"> Solution</span>
                        </motion.span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
