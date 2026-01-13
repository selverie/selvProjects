import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

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
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    return (
        <div className="h-full w-full flex flex-col md:flex-row bg-white text-slate-900 overflow-hidden">
            {/* Image Section */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden group">
                <motion.img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    initial={{ scale: 1.05, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent"></div>
            </div>

            {/* Content Section - Minimalist Design */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center px-8 py-12 md:px-16 lg:px-20 relative z-10 bg-white">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="space-y-8"
                >
                    {/* Tags - Minimal Style */}
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                            <span
                                key={tag}
                                className="text-[10px] tracking-[0.15em] uppercase text-slate-500 font-medium"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Title - Large and Light */}
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 leading-[1.1] tracking-tight">
                        {project.title}
                    </h2>

                    {/* Description - Subtle and Clean */}
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed font-light max-w-lg">
                        {project.description}
                    </p>

                    {/* Links - Minimalist */}
                    <div className="flex gap-6 pt-4">
                        {project.githubLink && (
                            <a
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-slate-900 hover:text-slate-600 transition-colors text-xs uppercase tracking-[0.15em] group/link font-medium"
                            >
                                <FaGithub className="text-lg group-hover/link:translate-x-0.5 transition-transform" />
                                <span>Code</span>
                            </a>
                        )}
                        {project.liveLink && (
                            <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-slate-900 hover:text-slate-600 transition-colors text-xs uppercase tracking-[0.15em] group/link font-medium"
                            >
                                <FaExternalLinkAlt className="text-sm group-hover/link:translate-x-0.5 transition-transform" />
                                <span>Live</span>
                            </a>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ProjectCard;