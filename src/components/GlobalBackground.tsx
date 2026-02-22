import { motion } from 'framer-motion';

export default function GlobalBackground() {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0057FF05_1px,transparent_1px),linear-gradient(to_bottom,#0057FF05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

            <motion.div
                animate={{
                    x: [0, 100, 0, -100, 0],
                    y: [0, -100, 100, 50, 0],
                    scale: [1, 1.2, 0.8, 1.1, 1],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] mix-blend-screen opacity-50"
            />

            <motion.div
                animate={{
                    x: [0, -150, 0, 150, 0],
                    y: [0, 150, -50, -150, 0],
                    scale: [1, 0.9, 1.3, 0.8, 1],
                }}
                transition={{
                    duration: 35,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#00a2ff]/10 rounded-full blur-[150px] mix-blend-screen opacity-40"
            />
        </div>
    );
}
