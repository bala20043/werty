import { useState, useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const notifications = [
    { name: 'Rahul from Mumbai', service: 'Website Development', time: '2 minutes ago' },
    { name: 'Sneha from Bangalore', service: 'App Development', time: '5 minutes ago' },
    { name: 'Vikram from Delhi', service: 'Software Projects', time: '12 minutes ago' },
    { name: 'Ananya from Pune', service: 'Hardware Projects', time: '18 minutes ago' },
    { name: 'Arjun from Chennai', service: 'UI/UX Design', time: '25 minutes ago' },
    { name: 'Priya from Hyderabad', service: 'Website Development', time: '32 minutes ago' },
];

export default function SocialProof() {
    const [current, setCurrent] = useState(-1);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const showNext = () => {
            setCurrent((prev) => (prev + 1) % notifications.length);
            setVisible(true);
            setTimeout(() => setVisible(false), 4000);
        };

        const initialDelay = setTimeout(showNext, 8000);
        const interval = setInterval(showNext, 12000);

        return () => {
            clearTimeout(initialDelay);
            clearInterval(interval);
        };
    }, []);

    if (current < 0) return null;
    const notif = notifications[current];

    return (
        <div
            className={`fixed bottom-24 left-6 z-50 max-w-xs transition-all duration-500 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8 pointer-events-none'
                }`}
        >
            <div className="bg-dark-light/95 backdrop-blur-md border border-primary/15 rounded-2xl p-4 shadow-xl shadow-black/30 flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                    <FaCheckCircle className="text-green-400 text-lg" />
                </div>
                <div>
                    <p className="text-white font-body text-sm font-semibold leading-tight">{notif.name}</p>
                    <p className="text-white/50 font-body text-xs mt-0.5">
                        ordered <span className="text-primary">{notif.service}</span>
                    </p>
                    <p className="text-white/30 font-body text-[10px] mt-1">{notif.time}</p>
                </div>
            </div>
        </div>
    );
}
