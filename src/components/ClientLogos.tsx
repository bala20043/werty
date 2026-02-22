import { useInView } from 'react-intersection-observer';

const logos = [
    'TechSolutions India', 'Future Innovators', 'Digital Dynamics', 'NextGen Ventures', 'Smart Systems', 'WebCrafters',
    'DataFlow Inc', 'CloudNine Studios', 'LogicWorks', 'Creative Coders',
];

export default function ClientLogos() {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

    return (
        <section className="py-14 border-y border-primary/5" ref={ref}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-center text-white/30 font-body text-xs uppercase tracking-[0.2em] mb-8">
                    Locally Trusted By
                </p>
                <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
                    {logos.map((name, i) => (
                        <div
                            key={i}
                            className={`text-white/20 hover:text-white/50 transition-all duration-500 ${inView ? 'opacity-100' : 'opacity-0'
                                }`}
                            style={{ transitionDelay: `${i * 80}ms` }}
                        >
                            <span className="font-heading text-lg font-bold tracking-wider">{name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
