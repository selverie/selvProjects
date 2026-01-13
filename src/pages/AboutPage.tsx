import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import InteractiveGridBackground from '../components/InteractiveGridBackground';

const AboutPage: React.FC = () => {
    return (
        <div className="min-h-screen w-full bg-white relative overflow-hidden">
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
            <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 py-32 md:py-40">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-12"
                >
                    {/* Title */}
                    <h1 className="text-5xl md:text-7xl font-light text-slate-900 tracking-tight">
                        About Me
                    </h1>

                    {/* Content */}
                    <div className="space-y-6 text-slate-600 text-base md:text-lg leading-relaxed font-light">
                        <p>
                            Hello, everyone! I’m Kun, a motivated individual with a strong desire to become a Full Stack Web Developer. My journey in the world of web development has been a thrilling adventure, and I am eager to take on new challenges to craft innovative solutions. Equipped with a solid foundation in programming languages. I am committed to honing my skills and learning new technologies. Let's connect and collaborate to build web applications together!
                        </p>
                    </div>

                    {/* Skills/Tech Stack */}
                    <div className="pt-8">
                        <h3 className="text-sm uppercase tracking-[0.15em] text-slate-500 font-medium mb-6">
                            What I Do
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-slate-700 text-sm font-light">
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