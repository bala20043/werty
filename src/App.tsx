import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import Projects from './pages/Projects';
import ServiceDetail from './pages/ServiceDetail';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';
import AdminRoute from './components/AdminRoute';
import FloatingButtons from './components/FloatingButtons';
import ScrollProgress from './components/ScrollProgress';
import CookiePopup from './components/CookiePopup';
import LoadingScreen from './components/LoadingScreen';
import SocialProof from './components/SocialProof';
import CustomCursor from './components/CustomCursor';
import GlobalBackground from './components/GlobalBackground';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ filter: "blur(20px)", opacity: 0, y: 40, scale: 0.95 }}
        animate={{ filter: "blur(0px)", opacity: 1, y: 0, scale: 1 }}
        exit={{ filter: "blur(10px)", opacity: 0, y: -40, scale: 0.95 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route
            path="/admin-dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Router>
        <CustomCursor />
        <GlobalBackground />
        <ScrollToTop />
        <LoadingScreen />
        <ScrollProgress />
        <Navbar />
        <AnimatedRoutes />
        <FloatingButtons />
        <SocialProof />
        <CookiePopup />
      </Router>
    </>
  );
}
