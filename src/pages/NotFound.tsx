import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-dark">
            <div className="text-center">
                <h1 className="text-8xl sm:text-9xl font-heading font-bold text-primary/20">404</h1>
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mt-4">
                    Page Not Found
                </h2>
                <p className="text-white/50 font-body text-lg mt-4 max-w-md mx-auto">
                    The page you are looking for doesn't exist or has been moved.
                </p>
                <Link
                    to="/"
                    className="inline-block mt-8 px-8 py-3.5 bg-primary hover:bg-primary/80 text-white font-heading font-semibold text-sm rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
}
