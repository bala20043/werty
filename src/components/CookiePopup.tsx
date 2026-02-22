import { useState, useEffect } from 'react';

export default function CookiePopup() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const accepted = localStorage.getItem('alpha_cookies_accepted');
        if (!accepted) {
            const timer = setTimeout(() => setShow(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const accept = () => {
        localStorage.setItem('alpha_cookies_accepted', 'true');
        setShow(false);
    };

    if (!show) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 animate-slide-up">
            <div className="max-w-4xl mx-auto bg-dark-light/95 backdrop-blur-md border border-primary/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4 shadow-xl">
                <p className="text-white/70 font-body text-sm flex-grow">
                    We use cookies to enhance your browsing experience and analyze site traffic. By continuing to use our site, you consent to our use of cookies.
                </p>
                <button
                    onClick={accept}
                    className="px-6 py-2.5 bg-primary hover:bg-primary/80 text-white font-heading font-semibold text-xs rounded-xl transition-all duration-300 whitespace-nowrap"
                >
                    Accept
                </button>
            </div>
        </div>
    );
}
