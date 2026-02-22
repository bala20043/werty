import { useState, useEffect, useCallback } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageSliderProps {
    images: { src: string; alt: string }[];
    autoPlayInterval?: number;
    showArrows?: boolean;
    showDots?: boolean;
    overlay?: boolean;
    height?: string;
    children?: (currentIndex: number) => React.ReactNode;
}

export default function ImageSlider({
    images,
    autoPlayInterval = 3000,
    showArrows = true,
    showDots = true,
    overlay = true,
    height = 'h-[600px]',
    children,
}: ImageSliderProps) {
    const [current, setCurrent] = useState(0);

    const next = useCallback(() => {
        setCurrent((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const prev = () => {
        setCurrent((prev) => (prev - 1 + images.length) % images.length);
    };

    useEffect(() => {
        if (autoPlayInterval <= 0) return;
        const timer = setInterval(next, autoPlayInterval);
        return () => clearInterval(timer);
    }, [next, autoPlayInterval]);

    if (images.length === 0) return null;

    return (
        <div className={`relative w-full ${height} overflow-hidden`}>
            <AnimatePresence initial={false}>
                <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute inset-0"
                >
                    <motion.img
                        src={images[current].src}
                        alt={images[current].alt}
                        className="w-full h-full object-cover will-change-transform"
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{
                            duration: (autoPlayInterval || 5000) / 1000 + 1,
                            ease: "easeOut"
                        }}
                    />
                </motion.div>
            </AnimatePresence>

            {/* Static Overlay (Prevents blinking/stuttering on mobile) */}
            {overlay && (
                <div className="absolute inset-0 bg-gradient-to-r from-dark/95 via-dark/70 to-transparent pointer-events-none z-1" />
            )}

            {/* Content overlay */}
            {children && (
                <div className="absolute inset-0 z-10">{children(current)}</div>
            )}

            {/* Arrows */}
            {showArrows && images.length > 1 && (
                <>
                    <button
                        onClick={prev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-dark/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-primary/80 transition-all duration-300"
                    >
                        <FaChevronLeft />
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-dark/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-primary/80 transition-all duration-300"
                    >
                        <FaChevronRight />
                    </button>
                </>
            )}

            {/* Dots */}
            {showDots && images.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrent(index)}
                            className={`slider-dot ${index === current ? 'active' : ''}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
