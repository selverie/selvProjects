import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import InteractiveGridBackground from '../components/InteractiveGridBackground';

const AboutPage: React.FC = () => {
    return (
        <div className="min-h-screen w-full bg-white dark:bg-slate-950 relative overflow-hidden transition-colors duration-500">
            {/* Interactive Background */}
            <InteractiveGridBackground />

            {/* Back Button - Bottom Right */}
            <Link
                to="/"
                className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 w-11 h-11 md:w-12 md:h-12 rounded-full border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-900 dark:hover:bg-slate-100 hover:text-white dark:hover:text-slate-900 hover:border-slate-900 dark:hover:border-slate-100 transition-all duration-300 flex items-center justify-center shadow-sm"
            >
                <FaArrowLeft className="text-xs md:text-sm" />
            </Link>

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 py-20 md:py-32 lg:py-40">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-10 md:space-y-12"
                >
                    {/* Title */}
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-light text-slate-900 dark:text-slate-100 tracking-tight transition-colors duration-500">
                        About Me
                    </h1>

                    {/* Content */}
                    <div className="space-y-5 md:space-y-6 text-slate-600 dark:text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed font-light transition-colors duration-500">
                        <p>
                            Hello, everyone! I'm Kun, a motivated individual with a strong desire to become a Full Stack Web Developer. My journey in the world of web development has been a thrilling adventure, and I am eager to take on new challenges to craft innovative solutions. Equipped with a solid foundation in programming languages. I am committed to honing my skills and learning new technologies. Let's connect and collaborate to build web applications together!
                        </p>
                    </div>

                    {/* Skills/Tech Stack */}
                    <div className="pt-6 md:pt-8">
                        <h3 className="text-xs md:text-sm uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 font-medium mb-5 md:mb-6 transition-colors duration-500">
                            What I Do
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 text-slate-700 dark:text-slate-300 text-sm md:text-base font-light transition-colors duration-500">
                            <div>Web Development</div>
                            <div>Frontend Engineering</div>
                            <div>Backend Development</div>
                            <div>Interactive Experiences</div>
                            <div>UI Implementation</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AboutPage;