import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Order } from '../types/order';
import { FaClipboardList, FaClock, FaSpinner, FaCheckCircle, FaTrash, FaSearch, FaSignOutAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminDashboard() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const navigate = useNavigate();

    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        try {
            let query = supabase.from('orders').select('*').order('created_at', { ascending: false });
            if (filter !== 'all') query = query.eq('status', filter);

            // Add a timeout to the fetch request
            const fetchPromise = query;
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Connection timeout')), 10000)
            );

            const { data, error } = await Promise.race([fetchPromise, timeoutPromise]) as any;

            if (error) throw error;
            setOrders((data as Order[]) || []);
        } catch (err) {
            console.error('Error fetching orders:', err);

            const isTimeout = err instanceof Error && err.message.includes('timeout');
            const isFetchError = err instanceof Error && err.message.includes('fetch');

            if (isTimeout || isFetchError) {
                showToast('Database connection error. Using demo data.', 'error');
            } else if (typeof err === 'object' && err !== null && 'code' in err && (err as any).code === 'PGRST301') {
                showToast('Table "orders" not found. Using demo data.', 'error');
            }

            // Demo data for when Supabase is not configured or reachable
            setOrders([
                { id: '1', client_name: 'Demo User', phone: '+91 98765 43210', email: 'demo@example.com', service: 'Website Development', budget: '₹25,000 - ₹50,000', timeline: '2-4 weeks', description: 'Need a business website', status: 'pending', created_at: new Date().toISOString() },
                { id: '2', client_name: 'Test Client', phone: '+91 12345 67890', email: 'test@example.com', service: 'App Development', budget: '₹50,000 - ₹1,00,000', timeline: '1-2 months', description: 'Mobile app for e-commerce', status: 'in_progress', created_at: new Date(Date.now() - 86400000).toISOString() },
                { id: '3', client_name: 'John Smith', phone: '+91 55555 55555', email: 'john@example.com', service: 'Hardware Projects', budget: '₹10,000 - ₹25,000', timeline: '2-4 weeks', description: 'IoT automation project', status: 'finished', created_at: new Date(Date.now() - 172800000).toISOString() },
            ]);
        } finally {
            setLoading(false);
        }
    }, [filter]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const updateStatus = async (id: string, status: string) => {
        try {
            await supabase.from('orders').update({ status }).eq('id', id);
            showToast('Order status updated successfully');
        } catch {
            showToast('Failed to update status', 'error');
        }
        setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: status as Order['status'] } : o)));
    };

    const deleteOrder = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this order?')) return;
        try {
            await supabase.from('orders').delete().eq('id', id);
            showToast('Order deleted successfully');
        } catch {
            showToast('Failed to delete order', 'error');
        }
        setOrders((prev) => prev.filter((o) => o.id !== id));
    };

    const logout = async () => {
        await supabase.auth.signOut();
        navigate('/admin-login');
    };

    const filteredOrders = orders.filter((o) => {
        if (search) {
            const q = search.toLowerCase();
            return o.client_name.toLowerCase().includes(q) || o.email.toLowerCase().includes(q) || o.service.toLowerCase().includes(q);
        }
        return true;
    });

    const counts = {
        total: orders.length,
        pending: orders.filter((o) => o.status === 'pending').length,
        in_progress: orders.filter((o) => o.status === 'in_progress').length,
        finished: orders.filter((o) => o.status === 'finished').length,
    };

    const summaryCards = [
        { label: 'Total Orders', count: counts.total, icon: <FaClipboardList />, color: 'text-primary', bg: 'bg-primary/10' },
        { label: 'Pending', count: counts.pending, icon: <FaClock />, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
        { label: 'In Progress', count: counts.in_progress, icon: <FaSpinner />, color: 'text-blue-400', bg: 'bg-blue-400/10' },
        { label: 'Finished', count: counts.finished, icon: <FaCheckCircle />, color: 'text-green-400', bg: 'bg-green-400/10' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
    };

    return (
        <div className="min-h-screen bg-dark p-4 sm:p-8 relative">
            {/* Toast Notifications */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                        className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-2xl font-body text-sm font-semibold flex items-center gap-3 backdrop-blur-md ${toast.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}
                    >
                        {toast.type === 'success' ? <FaCheckCircle /> : <FaSpinner />}
                        {toast.message}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-heading font-bold text-white">
                        Admin <span className="text-primary">Dashboard</span>
                    </h1>
                    <p className="text-white/40 font-body text-sm mt-1">Manage all orders</p>
                </div>
                <button
                    onClick={logout}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 text-white/60 hover:text-red-400 rounded-xl font-body text-sm transition-all duration-300"
                >
                    <FaSignOutAlt /> Logout
                </button>
            </div>

            {/* Summary Cards */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
            >
                {summaryCards.map((card, i) => (
                    <motion.div variants={itemVariants} key={i} className="glass-card p-6 flex items-center gap-4 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(0,87,255,0.15)] transition-all cursor-default">
                        <div className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center ${card.color} text-xl`}>
                            {card.icon}
                        </div>
                        <div>
                            <p className="text-2xl font-heading font-bold text-white">{card.count}</p>
                            <p className="text-white/50 font-body text-xs">{card.label}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Filters */}
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-grow">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                    <input
                        type="text"
                        placeholder="Search orders..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-dark-light/80 border border-primary/10 rounded-xl text-white font-body text-sm placeholder-white/30 focus:outline-none focus:border-primary/50 transition-all"
                    />
                </div>
                <div className="flex gap-2">
                    {['all', 'pending', 'in_progress', 'finished'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-3 rounded-xl font-body text-sm transition-all duration-300 ${filter === f
                                ? 'bg-primary text-white'
                                : 'bg-dark-light/80 text-white/50 hover:text-white border border-primary/10'
                                }`}
                        >
                            {f === 'all' ? 'All' : f === 'in_progress' ? 'In Progress' : f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Orders Table */}
            <div className="max-w-7xl mx-auto glass-card overflow-hidden">
                {loading ? (
                    <div className="p-16 text-center">
                        <div className="loader-ring mx-auto" />
                        <p className="text-white/40 font-body text-sm mt-4">Loading orders...</p>
                    </div>
                ) : filteredOrders.length === 0 ? (
                    <div className="p-16 text-center text-white/40 font-body">No orders found.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-primary/10">
                                    {['Client', 'Phone', 'Email', 'Service', 'Budget', 'Timeline', 'Status', 'Date', 'Actions'].map((h) => (
                                        <th key={h} className="px-4 py-4 text-left text-xs font-heading font-semibold text-white/40 uppercase tracking-wider whitespace-nowrap">
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <motion.tbody
                                variants={containerVariants}
                                initial="hidden"
                                animate="show"
                            >
                                {filteredOrders.map((order) => (
                                    <motion.tr variants={itemVariants} key={order.id} className="border-b border-primary/5 hover:bg-primary/10 transition-colors">
                                        <td className="px-4 py-4 text-white font-body text-sm whitespace-nowrap">{order.client_name}</td>
                                        <td className="px-4 py-4 text-white/60 font-body text-sm whitespace-nowrap">{order.phone}</td>
                                        <td className="px-4 py-4 text-white/60 font-body text-sm whitespace-nowrap">{order.email}</td>
                                        <td className="px-4 py-4 text-white/60 font-body text-sm whitespace-nowrap">{order.service}</td>
                                        <td className="px-4 py-4 text-white/60 font-body text-sm whitespace-nowrap">{order.budget || '-'}</td>
                                        <td className="px-4 py-4 text-white/60 font-body text-sm whitespace-nowrap">{order.timeline || '-'}</td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <select
                                                value={order.status}
                                                onChange={(e) => updateStatus(order.id, e.target.value)}
                                                className={`px-3 py-1.5 rounded-lg font-body text-xs font-semibold badge-${order.status} bg-transparent cursor-pointer focus:outline-none hover:brightness-125 transition-all`}
                                            >
                                                <option value="pending" className="bg-dark text-white">Pending</option>
                                                <option value="in_progress" className="bg-dark text-white">In Progress</option>
                                                <option value="finished" className="bg-dark text-white">Finished</option>
                                            </select>
                                        </td>
                                        <td className="px-4 py-4 text-white/40 font-body text-xs whitespace-nowrap">
                                            {new Date(order.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <button
                                                onClick={() => deleteOrder(order.id)}
                                                className="p-2 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-400/10 transition-all duration-300"
                                                title="Delete order"
                                            >
                                                <FaTrash className="text-sm" />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </motion.tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
