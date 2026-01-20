import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import InteractiveGridBackground from '../components/InteractiveGridBackground';
import SlideUpMenu from '../components/SlideUpMenu';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-white dark:bg-slate-950 overflow-hidden relative transition-colors duration-500">
            {/* Interactive Background */}
            <InteractiveGridBackground />

            {/* Main Content - Adjusted for visual centering */}
            <div className="z-10 flex flex-col items-center gap-6 md:gap-8 px-6 text-center mb-16 md:mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="py-4"
                >
                    <h1 className="text-5xl sm:text-6xl md:text-8xl font-light text-slate-900 dark:text-slate-100 tracking-tight leading-[1.1] transition-colors duration-500">
                        Selv Projects.
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                    className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-md md:max-w-lg font-light px-4 transition-colors duration-500"
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
                    className="group relative flex items-center gap-3 px-7 py-3.5 md:px-8 md:py-4 mt-4 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-full font-normal text-xs md:text-sm uppercase tracking-[0.15em] shadow-lg hover:shadow-xl hover:bg-slate-700 dark:hover:bg-slate-300 transition-all duration-300"
                >
                    <span>Explore Work</span>
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform text-xs" />
                </motion.button>
            </div>

            {/* Slide Up Menu Component */}
            <SlideUpMenu />
        </div>
    );
};

export default LandingPage;