import { Link } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaCode, FaMobileAlt, FaDesktop, FaMicrochip, FaPaintBrush, FaHeadset } from 'react-icons/fa';
import Footer from '../components/Footer';
import OrderForm from '../components/OrderForm';

const contactServices = [
    { icon: <FaCode />, name: 'Website Development', slug: 'website-development' },
    { icon: <FaMobileAlt />, name: 'App Development', slug: 'app-development' },
    { icon: <FaDesktop />, name: 'Software Projects', slug: 'software-projects' },
    { icon: <FaMicrochip />, name: 'Hardware Projects', slug: 'hardware-projects' },
    { icon: <FaPaintBrush />, name: 'UI/UX Design', slug: 'website-development' },
    { icon: <FaHeadset />, name: 'IT Support', slug: 'software-projects' },
];

export default function Contact() {
    return (
        <div className="min-h-screen">


            {/* Hero */}
            <section className="pt-32 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="text-primary font-body text-sm font-semibold uppercase tracking-widest">Get in Touch</span>
                    <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mt-3">Contact Us</h1>
                    <p className="text-white/50 font-body text-lg mt-4 max-w-2xl mx-auto">
                        Have a project in mind? Fill out the form below or reach out to us directly.
                    </p>
                </div>
            </section>

            <section className="py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Contact Info */}
                        <div className="space-y-6">
                            <div className="glass-card p-8">
                                <h3 className="text-xl font-heading font-semibold text-white mb-6">
                                    Alpha<span className="text-primary"> Solution</span>
                                </h3>
                                <ul className="space-y-5">
                                    <li className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                            <FaMapMarkerAlt />
                                        </div>
                                        <div>
                                            <p className="text-white font-body font-semibold text-sm">Address</p>
                                            <p className="text-white/50 font-body text-sm">India</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                            <FaPhone />
                                        </div>
                                        <div>
                                            <p className="text-white font-body font-semibold text-sm">Phone</p>
                                            <a href="tel:+919942712219" className="text-white/50 hover:text-primary font-body text-sm transition-colors">+91 99427 12219</a>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                            <FaEnvelope />
                                        </div>
                                        <div>
                                            <p className="text-white font-body font-semibold text-sm">Email</p>
                                            <a href="mailto:alphaxheros@gmail.com" className="text-white/50 hover:text-primary font-body text-sm transition-colors">alphaxheros@gmail.com</a>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* Services List */}
                            <div className="glass-card p-8">
                                <h3 className="text-lg font-heading font-semibold text-white mb-4">Our Services</h3>
                                <ul className="space-y-2.5">
                                    {contactServices.map((s, i) => (
                                        <li key={i}>
                                            <Link
                                                to={`/services/${s.slug}`}
                                                className="flex items-center gap-3 text-white/60 hover:text-primary font-body text-sm transition-colors duration-300"
                                            >
                                                <span className="text-primary text-xs">{s.icon}</span>
                                                {s.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Order Form */}
                        <div className="lg:col-span-2">
                            <div className="glass-card p-8">
                                <h3 className="text-xl font-heading font-semibold text-white mb-6">Send Us a Message</h3>
                                <OrderForm />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="rounded-2xl overflow-hidden border border-primary/10 h-[400px]">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671886.722767893!2d76.36312695!3d22.3511148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                            allowFullScreen
                            loading="lazy"
                            title="Location"
                        />
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
