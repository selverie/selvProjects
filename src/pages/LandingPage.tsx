import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import InteractiveGridBackground from '../components/InteractiveGridBackground';
import FooterNav from '../components/FooterNav';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-white overflow-hidden relative">
            {/* Interactive Background */}
            <InteractiveGridBackground />

            {/* Main Content */}
            <div className="z-10 flex flex-col items-center gap-8 px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="py-4"
                >
                    <h1 className="text-6xl md:text-8xl font-light text-slate-900 tracking-tight leading-[1.1]">
                        Selv Projects.
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                    className="text-base md:text-lg text-slate-600 max-w-lg font-light"
                >
                    Exploring digital experiences through code and design.
                </motion.p>

                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                    onClick={() => navigate('/projects')}
                    className="group relative flex items-center gap-3 px-8 py-4 mt-4 bg-slate-900 text-white rounded-full font-normal text-sm uppercase tracking-[0.15em] shadow-lg hover:shadow-xl hover:bg-slate-700 transition-all duration-300"
                >
                    <span>Explore Work</span>
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform text-xs" />
                </motion.button>
            </div>

            {/* Footer Navigation - Bottom Right */}
            <FooterNav />
        </div>
    );
};

export default LandingPage;