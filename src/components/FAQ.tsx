import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

const faqs = [
    {
        q: 'How do I place an order for a project?',
        a: 'Simply fill out the order form on our website with your project details, or contact us via WhatsApp or email. We\'ll review your requirements and get back to you within 24 hours with a detailed proposal.',
    },
    {
        q: 'What is the typical timeline for a website project?',
        a: 'A standard business website takes 2-4 weeks. Complex projects like e-commerce or custom web apps may take 4-8 weeks. We\'ll provide an exact timeline after reviewing your requirements.',
    },
    {
        q: 'Do you provide post-delivery support?',
        a: 'Yes! Every project includes free support — Basic plans get 1 month, Standard plans get 3 months, and Premium plans get 6 months of dedicated support including bug fixes, minor updates, and technical assistance.',
    },
    {
        q: 'Can I see progress updates during development?',
        a: 'Absolutely! We believe in transparency. You\'ll receive regular progress updates with live preview links, and we welcome your feedback at every stage to ensure the final product matches your vision perfectly.',
    },
    {
        q: 'What if I\'m not satisfied with the final product?',
        a: 'We offer unlimited revisions during the development phase. If you\'re still not satisfied after delivery, our 7-day money-back guarantee ensures your investment is protected. Your satisfaction is our top priority.',
    },
    {
        q: 'Do you sign an NDA for project confidentiality?',
        a: 'Yes, we are happy to sign a Non-Disclosure Agreement before starting any project. Your ideas and business information are kept strictly confidential and secure with us.',
    },
    {
        q: 'What payment methods do you accept?',
        a: 'We accept UPI, bank transfers, PayPal, and major credit/debit cards. For larger projects, we offer flexible milestone-based payment plans — typically 50% upfront and 50% on completion.',
    },
    {
        q: 'Can you work with my existing website or app?',
        a: 'Yes! We can redesign, upgrade, or add new features to your existing website or application. Just share the details and we\'ll assess what\'s needed to improve it.',
    },
];

export default function FAQ() {
    const [open, setOpen] = useState<number | null>(0);

    return (
        <section className="py-20 bg-dark-light/30 relative overflow-hidden">
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] animate-float-delayed z-0"></div>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-14">
                    <span className="text-primary font-body text-sm font-semibold uppercase tracking-widest">
                        Got Questions?
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mt-3">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-white/50 font-body text-lg mt-4">
                        Everything you need to know before starting your project.
                    </p>
                </div>
                <div className="space-y-3">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                            className="glass-card overflow-hidden group hover:border-primary/30 transition-colors duration-300"
                        >
                            <button
                                onClick={() => setOpen(open === i ? null : i)}
                                className="w-full flex items-center justify-between p-5 text-left group-hover:bg-primary/5 transition-colors duration-300"
                            >
                                <span className="text-white font-body text-base font-semibold pr-4 group-hover:text-primary transition-colors duration-300">{faq.q}</span>
                                <FaChevronDown
                                    className={`text-primary flex-shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ${open === i ? 'max-h-48 pb-5' : 'max-h-0'
                                    }`}
                            >
                                <p className="px-5 text-white/50 font-body text-sm leading-relaxed">
                                    {faq.a}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
