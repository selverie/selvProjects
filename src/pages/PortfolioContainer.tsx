import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProjectCard, { type Project } from '../components/ProjectCard';
import { FaChevronLeft, FaChevronRight, FaArrowLeft, FaGithub } from 'react-icons/fa';
import InteractiveGridBackground from '../components/InteractiveGridBackground';
import mobileImage from '../assets/images/mobile.png';
import websiteImage from '../assets/images/website.png';
import biofaceImage from '../assets/images/bioface.png';

// Sample Modern Projects
const projects: Project[] = [
    {
        id: 1,
        title: "Padira Mobile App",
        description: "A Flutter-based mobile application for a rice distribution system that connects farmers, millers, and distributors in one integrated ecosystem.",
        image: mobileImage,
        tags: ["Flutter", "Firebase"],
        githubLink: "https://github.com/selverie/padira-mobile",
        liveLink: ""
    },
    {
        id: 2,
        title: "Padira Dashboard Admin",
        description: "Admin dashboard to monitor farmer, miller, and distributor data in the agricultural ecosystem.",
        image: websiteImage,
        tags: ["VueJs", "Firebase"],
        githubLink: "https://github.com/selverie/padira-dashboard",
        liveLink: "https://padira-dashboard.vercel.app/"
    },
    {
        id: 3,
        title: "Skin Disease Prediction API",
        description: "API for skin disease prediction, deployed on Google Cloud Run and integrated with Cloud Storage, Cloud SQL and Firebase.",
        image: biofaceImage,
        tags: ["Python", "Firebase", "Cloud SQL", "Cloud Run", "Cloud Storage", "Artifact Registry"],
        githubLink: "https://github.com/selverie/Bioface-Model-API",
        liveLink: ""
    }
];

const variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? '100%' : '-100%',
        opacity: 0,
        zIndex: 0
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? '100%' : '-100%',
        opacity: 0,
    })
};

const PortfolioContainer: React.FC = () => {
    const [[page, direction], setPage] = useState([0, 0]);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const totalSlides = projects.length + 1; // +1 for the final slide

    const paginate = (newDirection: number) => {
        const newIndex = page + newDirection;
        if (newIndex >= 0 && newIndex < totalSlides) {
            setPage([newIndex, newDirection]);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Disable keyboard navigation when modal is open
            if (isImageModalOpen) return;
            
            if (e.key === 'ArrowRight') {
                if (page < totalSlides - 1) paginate(1);
            } else if (e.key === 'ArrowLeft') {
                if (page > 0) paginate(-1);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [page, isImageModalOpen]);

    return (
        <div className="h-screen w-full relative bg-white dark:bg-slate-950 overflow-hidden transition-colors duration-500">
            {/* Interactive Background */}
            <InteractiveGridBackground />

            {/* Back to Home Button - Hidden when modal is open */}
            {!isImageModalOpen && (
                <Link
                    to="/"
                    className="fixed top-4 left-4 md:top-8 md:left-8 z-50 w-10 h-10 md:w-12 md:h-12 rounded-full border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-900 dark:hover:bg-slate-100 hover:text-white dark:hover:text-slate-900 hover:border-slate-900 dark:hover:border-slate-100 transition-all duration-300 flex items-center justify-center shadow-sm"
                >
                    <FaArrowLeft className="text-xs md:text-sm" />
                </Link>
            )}

            {/* Project Cards */}
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                    key={page}
                    custom={direction}
                    variants={variants as any}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 280, damping: 32 },
                        opacity: { duration: 0.3 }
                    }}
                    className="absolute inset-0 w-full h-full"
                >
                    {page < projects.length ? (
                        <ProjectCard 
                            project={projects[page]} 
                            onImageModalChange={setIsImageModalOpen}
                        />
                    ) : (
                        // Final Slide - More Projects on GitHub
                        <div className="h-full w-full flex items-center justify-center bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                                className="text-center px-6 max-w-2xl"
                            >
                                <div className="mb-8 md:mb-12">
                                    <FaGithub className="text-6xl md:text-7xl lg:text-8xl mx-auto text-slate-900 dark:text-slate-100 mb-6" />
                                </div>
                                
                                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-slate-900 dark:text-slate-100 leading-[1.1] tracking-tight mb-6 md:mb-8">
                                    More Projects
                                </h2>
                                
                                <p className="text-base md:text-lg lg:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-light mb-8 md:mb-12">
                                    Check out more of my work and open source contributions on GitHub
                                </p>
                                
                                <a
                                    href="https://github.com/selverie"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 px-8 py-4 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-900 dark:hover:bg-slate-100 hover:text-white dark:hover:text-slate-900 hover:border-slate-900 dark:hover:border-slate-100 transition-all duration-300 text-sm md:text-base uppercase tracking-[0.15em] font-medium rounded-full"
                                >
                                    <FaGithub className="text-lg md:text-xl" />
                                    <span>Visit GitHub</span>
                                </a>
                            </motion.div>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Navigation Controls - Hidden when modal is open */}
            {!isImageModalOpen && (
                <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 flex gap-2 md:gap-3 z-50">
                    <button
                        onClick={() => page > 0 && paginate(-1)}
                        disabled={page === 0}
                        className={`w-10 h-10 md:w-12 md:h-12 rounded-full border transition-all duration-300 shadow-sm ${page === 0
                            ? 'border-slate-200 dark:border-slate-800 text-slate-300 dark:text-slate-700 cursor-not-allowed'
                            : 'border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-900 dark:hover:bg-slate-100 hover:text-white dark:hover:text-slate-900 hover:border-slate-900 dark:hover:border-slate-100'
                            }`}
                        aria-label="Previous Project"
                    >
                        <FaChevronLeft className="mx-auto text-xs md:text-sm" />
                    </button>
                    <button
                        onClick={() => page < totalSlides - 1 && paginate(1)}
                        disabled={page === totalSlides - 1}
                        className={`w-10 h-10 md:w-12 md:h-12 rounded-full border transition-all duration-300 shadow-sm ${page === totalSlides - 1
                            ? 'border-slate-200 dark:border-slate-800 text-slate-300 dark:text-slate-700 cursor-not-allowed'
                            : 'border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-900 dark:hover:bg-slate-100 hover:text-white dark:hover:text-slate-900 hover:border-slate-900 dark:hover:border-slate-100'
                            }`}
                        aria-label="Next Project"
                    >
                        <FaChevronRight className="mx-auto text-xs md:text-sm" />
                    </button>
                </div>
            )}

            {/* Counter - Hidden when modal is open */}
            {!isImageModalOpen && (
                <div className="fixed bottom-4 left-4 md:bottom-8 md:left-8 text-slate-400 dark:text-slate-600 font-light text-xs md:text-sm z-50 tracking-wider transition-colors duration-500">
                    {String(page + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
                </div>
            )}
        </div>
    );
};

export default PortfolioContainer;