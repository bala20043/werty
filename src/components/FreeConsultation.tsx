import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { FaGift, FaArrowRight } from 'react-icons/fa';
import MagneticWrapper from './MagneticWrapper';

export default function FreeConsultation() {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

    return (
        <section className="py-16" ref={ref}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    className={`relative overflow-hidden rounded-3xl border border-primary/20 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                >
                    {/* Background glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-dark-light to-primary/5" />
                    <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-56 h-56 bg-primary/5 rounded-full blur-[80px]" />

                    <div className="relative z-10 p-10 sm:p-14 flex flex-col lg:flex-row items-center gap-8">
                        <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                            <FaGift className="text-primary text-3xl" />
                        </div>
                        <div className="flex-grow text-center lg:text-left">
                            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-3">
                                Get a <span className="text-primary">Free Consultation</span>
                            </h3>
                            <p className="text-white/50 font-body text-base max-w-xl">
                                Not sure where to start? Talk to our experts for free — no commitment required.
                                We'll analyze your requirements and suggest the best solution for your budget.
                            </p>
                        </div>
                        <MagneticWrapper intensity={0.2}>
                            <Link
                                to="/contact"
                                className="relative overflow-hidden group flex items-center gap-3 px-8 py-4 bg-primary text-white font-heading font-semibold text-sm rounded-xl transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-[0_0_30px_rgba(0,87,255,0.6)] whitespace-nowrap block"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                                <span className="relative z-10 flex items-center gap-3">Book Free Call <FaArrowRight className="group-hover:translate-x-1 transition-transform" /></span>
                            </Link>
                        </MagneticWrapper>
                    </div>
                </div>
            </div>
        </section>
    );
}
