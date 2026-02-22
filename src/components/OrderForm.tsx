import { useState } from 'react';
import { supabase } from '../lib/supabase';
import MagneticWrapper from './MagneticWrapper';

interface OrderFormProps {
    preSelectedService?: string;
}

const serviceOptions = [
    'Website Development',
    'App Development',
    'Software Projects',
    'Hardware Projects',
    'UI/UX Design',
    'IT Support',
    'Other',
];

export default function OrderForm({ preSelectedService }: OrderFormProps) {
    const [form, setForm] = useState({
        client_name: '',
        phone: '',
        email: '',
        service: preSelectedService || '',
        budget: '',
        timeline: '',
        description: '',
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const { error: dbError } = await supabase.from('orders').insert([
                {
                    client_name: form.client_name,
                    phone: form.phone,
                    email: form.email,
                    service: form.service,
                    budget: form.budget,
                    timeline: form.timeline,
                    description: form.description,
                    status: 'pending',
                },
            ]);

            if (dbError) throw dbError;

            setSuccess(true);
            setForm({
                client_name: '',
                phone: '',
                email: '',
                service: preSelectedService || '',
                budget: '',
                timeline: '',
                description: '',
            });
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    const inputClass =
        'peer w-full px-4 pt-6 pb-2 bg-dark-light/50 border border-white/5 rounded-xl text-white font-body text-base placeholder-transparent focus:bg-dark-light focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all duration-300 shadow-inner';

    const labelClass =
        'absolute left-4 top-4 text-white/40 text-base font-body transition-all duration-300 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-primary peer-[&:not(:placeholder-shown)]:top-1.5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-primary/70 font-semibold tracking-wide';

    const selectClass =
        'w-full px-4 py-4 bg-dark-light/50 border border-white/5 rounded-xl text-white/70 font-body text-base appearance-none focus:bg-dark-light focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all duration-300 shadow-inner cursor-pointer';

    return (
        <form onSubmit={handleSubmit} className="space-y-6 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative group">
                    <input
                        type="text"
                        name="client_name"
                        id="client_name"
                        placeholder="Full Name *"
                        value={form.client_name}
                        onChange={handleChange}
                        required
                        className={inputClass}
                    />
                    <label htmlFor="client_name" className={labelClass}>Full Name *</label>
                </div>
                <div className="relative group">
                    <input
                        type="tel"
                        name="phone"
                        id="phone"
                        placeholder="Phone Number *"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        className={inputClass}
                    />
                    <label htmlFor="phone" className={labelClass}>Phone Number *</label>
                </div>
            </div>

            <div className="relative group">
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email Address *"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className={inputClass}
                />
                <label htmlFor="email" className={labelClass}>Email Address *</label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <div className="relative">
                    <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        required
                        className={selectClass}
                    >
                        <option value="" disabled className="text-white/30 hidden">Select Service *</option>
                        {serviceOptions.map((s) => (
                            <option key={s} value={s} className="bg-dark text-white">
                                {s}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="relative border-t border-transparent">
                    <select
                        name="budget"
                        value={form.budget}
                        onChange={handleChange}
                        className={selectClass}
                    >
                        <option value="" disabled className="text-white/30 hidden">Budget Range</option>
                        <option value="Under ₹10,000" className="bg-dark text-white">Under ₹10,000</option>
                        <option value="₹10,000 - ₹25,000" className="bg-dark text-white">₹10,000 - ₹25,000</option>
                        <option value="₹25,000 - ₹50,000" className="bg-dark text-white">₹25,000 - ₹50,000</option>
                        <option value="₹50,000 - ₹1,00,000" className="bg-dark text-white">₹50,000 - ₹1,00,000</option>
                        <option value="₹1,00,000+" className="bg-dark text-white">₹1,00,000+</option>
                    </select>
                </div>
            </div>

            <div className="relative relative z-0 border-t border-transparent">
                <select
                    name="timeline"
                    value={form.timeline}
                    onChange={handleChange}
                    className={selectClass}
                >
                    <option value="" disabled className="text-white/30 hidden">Project Timeline</option>
                    <option value="1-2 weeks" className="bg-dark text-white">1-2 weeks</option>
                    <option value="2-4 weeks" className="bg-dark text-white">2-4 weeks</option>
                    <option value="1-2 months" className="bg-dark text-white">1-2 months</option>
                    <option value="2-3 months" className="bg-dark text-white">2-3 months</option>
                    <option value="3+ months" className="bg-dark text-white">3+ months</option>
                </select>
            </div>

            <div className="relative group">
                <textarea
                    name="description"
                    id="description"
                    placeholder="Tell us about your project..."
                    value={form.description}
                    onChange={handleChange}
                    rows={4}
                    className={`${inputClass} resize-none`}
                />
                <label htmlFor="description" className={labelClass}>Project Description</label>
            </div>

            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 font-body text-sm animate-fade-in">
                    {error}
                </div>
            )}

            {success && (
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 font-body text-sm flex items-center gap-3 animate-fade-in">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">✓</div>
                    <span>Order submitted successfully! We'll contact you soon.</span>
                </div>
            )}

            <MagneticWrapper intensity={0.1} className="w-full mt-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="relative overflow-hidden w-full py-4 bg-primary text-white font-heading font-semibold text-lg tracking-wide rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(0,87,255,0.4)] disabled:opacity-70 group"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                    <span className="relative z-10 drop-shadow-md">
                        {loading ? 'Submitting...' : 'Submit Order'}
                    </span>
                </button>
            </MagneticWrapper>
        </form>
    );
}
