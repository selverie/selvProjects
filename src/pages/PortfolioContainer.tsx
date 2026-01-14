import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProjectCard, { type Project } from '../components/ProjectCard';
import { FaChevronLeft, FaChevronRight, FaArrowLeft } from 'react-icons/fa';
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

    const paginate = (newDirection: number) => {
        const newIndex = page + newDirection;
        if (newIndex >= 0 && newIndex < projects.length) {
            setPage([newIndex, newDirection]);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') {
                if (page < projects.length - 1) paginate(1);
            } else if (e.key === 'ArrowLeft') {
                if (page > 0) paginate(-1);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [page]);

    return (
        <div className="h-screen w-full relative bg-white overflow-hidden">
            {/* Interactive Background */}
            <InteractiveGridBackground />

            {/* Back to Home Button - Responsive Position */}
            <Link
                to="/"
                className="fixed top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 z-50 w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-slate-300 text-slate-900 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300 flex items-center justify-center shadow-sm"
            >
                <FaArrowLeft className="text-xs" />
            </Link>

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
                    <ProjectCard project={projects[page]} />
                </motion.div>
            </AnimatePresence>

            {/* Navigation Controls - Responsive Position */}
            <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 lg:bottom-12 lg:right-12 flex gap-2 sm:gap-3 z-50">
                <button
                    onClick={() => page > 0 && paginate(-1)}
                    disabled={page === 0}
                    className={`w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full border transition-all duration-300 shadow-sm ${page === 0
                        ? 'border-slate-200 text-slate-300 cursor-not-allowed'
                        : 'border-slate-300 text-slate-900 hover:bg-slate-900 hover:text-white hover:border-slate-900'
                        }`}
                    aria-label="Previous Project"
                >
                    <FaChevronLeft className="mx-auto text-xs sm:text-sm" />
                </button>
                <button
                    onClick={() => page < projects.length - 1 && paginate(1)}
                    disabled={page === projects.length - 1}
                    className={`w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full border transition-all duration-300 shadow-sm ${page === projects.length - 1
                        ? 'border-slate-200 text-slate-300 cursor-not-allowed'
                        : 'border-slate-300 text-slate-900 hover:bg-slate-900 hover:text-white hover:border-slate-900'
                        }`}
                    aria-label="Next Project"
                >
                    <FaChevronRight className="mx-auto text-xs sm:text-sm" />
                </button>
            </div>

            {/* Counter - Responsive Position */}
            <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 lg:bottom-10 lg:left-8 text-slate-400 font-light text-xs sm:text-sm z-50 tracking-wider">
                {String(page + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </div>
        </div>
    );
};

export default PortfolioContainer;