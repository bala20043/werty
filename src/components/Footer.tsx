import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-dark-light border-t border-primary/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-xl font-heading font-bold text-white mb-4">
                            Alpha<span className="text-primary"> Solution</span>
                        </h3>
                        <p className="text-white/60 font-body text-base leading-relaxed mb-6">
                            Transforming ideas into reality with cutting-edge technology solutions. Your trusted partner for web, app, software & hardware development.
                        </p>
                        <div className="flex gap-3">
                            {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
                                >
                                    <Icon className="text-sm" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-heading font-semibold text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2.5">
                            {['Home', 'About', 'Portfolio', 'Contact'].map((link) => (
                                <li key={link}>
                                    <Link
                                        to={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                                        className="text-white/60 hover:text-primary font-body text-base transition-colors duration-300 flex items-center gap-2"
                                    >
                                        <span className="w-1.5 h-1.5 bg-primary/50 rounded-full" />
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-heading font-semibold text-white mb-4">Our Services</h4>
                        <ul className="space-y-2.5">
                            {[
                                { name: 'Website Development', slug: 'website-development' },
                                { name: 'App Development', slug: 'app-development' },
                                { name: 'Software Projects', slug: 'software-projects' },
                                { name: 'Hardware Projects', slug: 'hardware-projects' },
                            ].map((service) => (
                                <li key={service.slug}>
                                    <Link
                                        to={`/services/${service.slug}`}
                                        className="text-white/60 hover:text-primary font-body text-base transition-colors duration-300 flex items-center gap-2"
                                    >
                                        <span className="w-1.5 h-1.5 bg-primary/50 rounded-full" />
                                        {service.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-heading font-semibold text-white mb-4">Contact Us</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-white/60 font-body text-base">
                                <FaMapMarkerAlt className="text-primary mt-1 flex-shrink-0" />
                                India
                            </li>
                            <li>
                                <a href="tel:+919942712219" className="flex items-center gap-3 text-white/60 hover:text-primary font-body text-base transition-colors">
                                    <FaPhone className="text-primary flex-shrink-0" />
                                    +91 99427 12219
                                </a>
                            </li>
                            <li>
                                <a href="mailto:alphaxheros@gmail.com" className="flex items-center gap-3 text-white/60 hover:text-primary font-body text-base transition-colors">
                                    <FaEnvelope className="text-primary flex-shrink-0" />
                                    alphaxheros@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-primary/10 py-6">
                <p className="text-center text-white/40 font-body text-sm">
                    © {new Date().getFullYear()} Alpha Solution. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
