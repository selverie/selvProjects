import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import InteractiveGridBackground from '../components/InteractiveGridBackground';

const ContactPage: React.FC = () => {
    return (
        <div className="min-h-screen w-full bg-white relative overflow-hidden flex items-center justify-center">
            {/* Interactive Background */}
            <InteractiveGridBackground />

            {/* Back Button - Bottom Right */}
            <Link
                to="/"
                className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full border border-slate-300 text-slate-900 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300 flex items-center justify-center"
            >
                <FaArrowLeft className="text-sm" />
            </Link>

            {/* Content */}
            <div className="relative z-10 max-w-2xl mx-auto px-6 md:px-8 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-12 text-center"
                >
                    {/* Title */}
                    <h1 className="text-5xl md:text-7xl font-light text-slate-900 tracking-tight">
                        Get in Touch
                    </h1>

                    {/* Description */}
                    <p className="text-base md:text-lg text-slate-600 leading-relaxed font-light max-w-lg mx-auto">
                        Working on something interesting? Need help with a project?
                        Feel free to reach out—I'm always open to discussing new ideas.
                    </p>

                    {/* Email */}
                    <div className="pt-4">
                        <a
                            href="mailto:hello@selvprojects.com"
                            className="inline-flex items-center gap-3 text-2xl md:text-3xl font-light text-slate-900 hover:text-slate-600 transition-colors group"
                        >
                            <FaEnvelope className="text-xl group-hover:scale-110 transition-transform" />
                            <span>selverie.schugle@gmail.com</span>
                        </a>
                    </div>

                    {/* Social Links */}
                    <div className="pt-8">
                        <p className="text-xs uppercase tracking-[0.15em] text-slate-500 font-medium mb-6">
                            Find Me Online
                        </p>
                        <div className="flex justify-center gap-8">
                            <a
                                href="https://github.com/selverie"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-600 hover:text-slate-900 transition-colors"
                                aria-label="GitHub"
                            >
                                <FaGithub className="text-2xl hover:scale-110 transition-transform" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/ikhwan-kuncoro-yakti/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-600 hover:text-slate-900 transition-colors"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin className="text-2xl hover:scale-110 transition-transform" />
                            </a>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="pt-12 text-sm text-slate-500 font-light space-y-2">
                        <p>Based in Yogyakarta, Indonesia</p>
                        <p>Open to freelance opportunities</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ContactPage;