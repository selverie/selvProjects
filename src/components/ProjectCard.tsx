import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';

export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    tags: string[];
    githubLink?: string;
    liveLink?: string;
}

interface ProjectCardProps {
    project: Project;
    onImageModalChange?: (isOpen: boolean) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onImageModalChange }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    const handleModalToggle = (isOpen: boolean) => {
        setIsImageModalOpen(isOpen);
        onImageModalChange?.(isOpen);
    };

    return (
        <>
            <div className="h-full w-full flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden transition-colors duration-500">
                {/* Image Section - Mobile: Full width top, Desktop: Half left */}
                <div
                    className="w-full h-[45vh] md:h-full md:w-1/2 md:absolute md:left-0 md:top-0 relative overflow-hidden group cursor-pointer"
                    onClick={() => handleModalToggle(true)}
                >
                    {/* Loading Skeleton */}
                    {!imageLoaded && (
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 animate-pulse transition-colors duration-500">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent animate-shimmer"></div>
                        </div>
                    )}

                    {/* Actual Image */}
                    <motion.img
                        src={project.image}
                        alt={project.title}
                        className={`absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                            }`}
                        initial={{ scale: 1.05 }}
                        animate={{ scale: imageLoaded ? 1 : 1.05 }}
                        transition={{ duration: 0.8 }}
                        onLoad={() => setImageLoaded(true)}
                        loading="lazy"
                    />

                    {/* Overlay with hover hint */}
                    <div className={`absolute inset-0 bg-gradient-to-b md:bg-gradient-to-br from-black/10 to-transparent group-hover:from-black/20 transition-all duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                        }`}>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs md:text-sm font-medium text-slate-900 dark:text-slate-100 tracking-wide">
                                Click to view full image
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section - Mobile: Scrollable bottom, Desktop: Fixed right */}
                <div className="w-full flex-1 md:w-1/2 md:h-full md:absolute md:right-0 md:top-0 flex flex-col justify-start md:justify-center px-6 py-8 md:px-12 lg:px-16 xl:px-20 relative z-10 bg-white dark:bg-slate-950 overflow-y-auto md:overflow-visible transition-colors duration-500">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="space-y-5 md:space-y-7 lg:space-y-8"
                    >
                        {/* Tags - Minimal Style */}
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map(tag => (
                                <span
                                    key={tag}
                                    className="text-[9px] md:text-[10px] tracking-[0.15em] uppercase text-slate-500 dark:text-slate-400 font-medium transition-colors duration-500"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Title - Large and Light */}
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 dark:text-slate-100 leading-[1.1] tracking-tight transition-colors duration-500">
                            {project.title}
                        </h2>

                        {/* Description - Subtle and Clean */}
                        <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-light max-w-lg transition-colors duration-500">
                            {project.description}
                        </p>

                        {/* Links - Minimalist */}
                        <div className="flex flex-wrap gap-3 md:gap-4 pt-2 md:pt-4">
                            {project.githubLink && (
                                <a
                                    href={project.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-900 dark:hover:bg-slate-100 hover:text-white dark:hover:text-slate-900 hover:border-slate-900 dark:hover:border-slate-100 transition-all duration-300 text-xs md:text-sm uppercase tracking-[0.15em] font-medium rounded-full"
                                >
                                    <FaGithub className="text-base md:text-lg" />
                                    <span>Code</span>
                                </a>
                            )}
                            {project.liveLink && (
                                <a
                                    href={project.liveLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-900 dark:hover:bg-slate-100 hover:text-white dark:hover:text-slate-900 hover:border-slate-900 dark:hover:border-slate-100 transition-all duration-300 text-xs md:text-sm uppercase tracking-[0.15em] font-medium rounded-full"
                                >
                                    <FaExternalLinkAlt className="text-sm md:text-base" />
                                    <span>Live</span>
                                </a>
                            )}
                        </div>
                    </motion.div>
                </div>

                <style>{`
                    @keyframes shimmer {
                        0% {
                            transform: translateX(-100%);
                        }
                        100% {
                            transform: translateX(100%);
                        }
                    }
                    .animate-shimmer {
                        animation: shimmer 2s infinite;
                    }
                `}</style>
            </div>

            {/* Image Modal/Lightbox */}
            <AnimatePresence>
                {isImageModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8"
                        onClick={() => handleModalToggle(false)}
                    >
                        {/* Close Button - Only button visible in modal */}
                        <button
                            onClick={() => handleModalToggle(false)}
                            className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white transition-all duration-300 flex items-center justify-center z-10"
                            aria-label="Close"
                        >
                            <FaTimes className="text-lg md:text-xl" />
                        </button>

                        {/* Image Container */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={project.image}
                                alt={project.title}
                                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ProjectCard;