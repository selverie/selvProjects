import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import InteractiveGridBackground from '../components/InteractiveGridBackground';

const ContactPage: React.FC = () => {
    return (
        <div className="min-h-screen w-full bg-white dark:bg-slate-950 relative overflow-hidden flex items-center justify-center transition-colors duration-500">
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
            <div className="relative z-10 max-w-2xl mx-auto px-6 md:px-8 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-10 md:space-y-12 text-center"
                >
                    {/* Title */}
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-light text-slate-900 dark:text-slate-100 tracking-tight transition-colors duration-500">
                        Get in Touch
                    </h1>

                    {/* Description */}
                    <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-light max-w-lg mx-auto px-4 transition-colors duration-500">
                        Working on something interesting? Need help with a project?
                        Feel free to reach out—I'm always open to discussing new ideas.
                    </p>

                    {/* Email */}
                    <div className="pt-2 md:pt-4 px-4">
                        <a
                            href="mailto:selverie.schugle@gmail.com"
                            className="inline-flex items-center gap-2 md:gap-3 text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-slate-900 dark:text-slate-100 hover:text-slate-600 dark:hover:text-slate-400 transition-colors group break-all"
                        >
                            <FaEnvelope className="text-base md:text-xl flex-shrink-0 group-hover:scale-110 transition-transform" />
                            <span className="break-all">selverie.schugle@gmail.com</span>
                        </a>
                    </div>

                    {/* Social Links */}
                    <div className="pt-6 md:pt-8">
                        <p className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 font-medium mb-5 md:mb-6 transition-colors duration-500">
                            Find Me Online
                        </p>
                        <div className="flex justify-center gap-6 md:gap-8">
                            <a
                                href="https://github.com/selverie"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                                aria-label="GitHub"
                            >
                                <FaGithub className="text-xl md:text-2xl hover:scale-110 transition-transform" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/ikhwan-kuncoro-yakti/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin className="text-xl md:text-2xl hover:scale-110 transition-transform" />
                            </a>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="pt-8 md:pt-12 text-xs md:text-sm text-slate-500 dark:text-slate-400 font-light space-y-2 transition-colors duration-500">
                        <p>Based in Yogyakarta, Indonesia</p>
                        <p>Open to freelance opportunities</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ContactPage;