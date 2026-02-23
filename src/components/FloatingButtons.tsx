import { useState, useEffect } from 'react';
import { FaWhatsapp, FaArrowUp } from 'react-icons/fa';

export default function FloatingButtons() {
    const [showTop, setShowTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => setShowTop(window.scrollY > 400);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* WhatsApp */}
            <a
                href="https://whatsapp.com/channel/0029VbCdar0BPzjSmNc4jN2x"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center text-white text-2xl shadow-lg shadow-[#25D366]/30 hover:scale-110 transition-all duration-300"
            >
                <FaWhatsapp />
            </a>

            {/* Back to Top */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className={`fixed bottom-6 right-24 z-50 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-lg shadow-primary/30 hover:scale-110 transition-all duration-300 ${showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                    }`}
            >
                <FaArrowUp />
            </button>
        </>
    );
}
