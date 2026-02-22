import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Hardcoded credentials — replace with Supabase Auth later
        await new Promise((r) => setTimeout(r, 800));

        if (username === 'admin' && password === ':A1pha@4271') {
            sessionStorage.setItem('alpha_admin_auth', 'true');
            navigate('/admin-dashboard');
        } else {
            setError('Invalid username or password');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-dark">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-heading font-bold text-white">
                        Alpha<span className="text-primary"> Solution</span>
                    </h1>
                    <p className="text-white/40 font-body text-sm mt-2">Admin Portal</p>
                </div>

                <div className="glass-card p-8">
                    <h2 className="text-xl font-heading font-semibold text-white mb-6 text-center">Sign In</h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-white/60 font-body text-sm mb-2">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-dark/60 border border-primary/10 rounded-xl text-white font-body placeholder-white/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                                placeholder="Enter username"
                            />
                        </div>
                        <div>
                            <label className="block text-white/60 font-body text-sm mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-dark/60 border border-primary/10 rounded-xl text-white font-body placeholder-white/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                                placeholder="Enter password"
                            />
                        </div>

                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 font-body text-sm text-center">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 bg-primary hover:bg-primary/80 disabled:opacity-50 text-white font-heading font-semibold text-sm rounded-xl transition-all duration-300"
                        >
                            {loading ? 'Signing in...' : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
