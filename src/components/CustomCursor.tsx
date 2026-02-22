import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);

    // Position of the mouse
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring physics configuration for the glowing dot (fast but smooth)
    const springConfigDot = { damping: 25, stiffness: 700, mass: 0.5 };
    const dotX = useSpring(mouseX, springConfigDot);
    const dotY = useSpring(mouseY, springConfigDot);

    // Spring physics for the trailing ring (slower, more lag)
    const springConfigRing = { damping: 40, stiffness: 150, mass: 1 };
    const ringX = useSpring(mouseX, springConfigRing);
    const ringY = useSpring(mouseY, springConfigRing);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [mouseX, mouseY, isVisible]);

    // Don't render on mobile devices
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches) {
        return null;
    }

    return (
        <div className="pointer-events-none fixed inset-0 z-[100000] overflow-hidden">
            <motion.div
                className="absolute w-2 h-2 bg-primary rounded-full"
                style={{
                    x: dotX,
                    y: dotY,
                    translateX: '-50%',
                    translateY: '-50%',
                    opacity: isVisible ? 1 : 0,
                    boxShadow: '0 0 10px #0057FF, 0 0 20px #0057FF',
                }}
            />
            <motion.div
                className="absolute w-10 h-10 border border-primary/40 rounded-full mix-blend-screen"
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: '-50%',
                    translateY: '-50%',
                    opacity: isVisible ? 1 : 0,
                }}
            />
        </div>
    );
}
