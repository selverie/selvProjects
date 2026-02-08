import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaTimes } from "react-icons/fa";

export interface Project {
  id: number;
  title: string;
  description: string;
  detailedDescription?: string;
  details?: string[];
  image: string;
  tags: string[];
  type: "personal" | "collaboration";
  githubLink?: string;
  liveLink?: string;
}

interface ProjectCardProps {
  project: Project;
  onImageModalChange?: (isOpen: boolean) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onImageModalChange,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [clickStart, setClickStart] = useState({ x: 0, y: 0, time: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  const handleModalToggle = (isOpen: boolean) => {
    setIsImageModalOpen(isOpen);
    onImageModalChange?.(isOpen);
    if (!isOpen) {
      // Reset zoom and position when closing
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  };

  // Handle left click - zoom in (only if not dragging)
  const handleImageClick = (e: React.MouseEvent) => {
    if (e.button === 0) {
      const clickEnd = { x: e.clientX, y: e.clientY, time: Date.now() };
      const distance = Math.sqrt(
        Math.pow(clickEnd.x - clickStart.x, 2) + 
        Math.pow(clickEnd.y - clickStart.y, 2)
      );
      const timeDiff = clickEnd.time - clickStart.time;
      
      // Only zoom if it was a quick click (not a drag)
      // Distance < 5px and time < 200ms = click
      if (distance < 5 && timeDiff < 200) {
        e.stopPropagation();
        const newScale = Math.min(scale + 0.5, 5); // Max zoom 5x
        setScale(newScale);
      }
    }
  };

  // Handle right click - zoom out
  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newScale = Math.max(scale - 0.5, 1); // Min zoom 1x
    setScale(newScale);
    
    // Reset position if zoomed out to 1x
    if (newScale === 1) {
      setPosition({ x: 0, y: 0 });
    }
  };

  // Handle mouse wheel with Ctrl - zoom
  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey) {
      e.preventDefault();
      e.stopPropagation();
      
      const delta = -e.deltaY;
      const zoomIntensity = 0.1;
      const newScale = Math.min(
        Math.max(scale + delta * zoomIntensity * 0.01, 1),
        5
      );
      
      setScale(newScale);
      
      // Reset position if zoomed out to 1x
      if (newScale === 1) {
        setPosition({ x: 0, y: 0 });
      }
    }
  };

  // Handle mouse down - start dragging (works at any zoom level)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setClickStart({ x: e.clientX, y: e.clientY, time: Date.now() });
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  // Handle mouse move - dragging (works at any zoom level)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  // Handle mouse up - stop dragging
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Prevent context menu
  useEffect(() => {
    const preventContextMenu = (e: MouseEvent) => {
      if (isImageModalOpen) {
        e.preventDefault();
      }
    };

    const preventPageZoom = (e: WheelEvent) => {
      if (isImageModalOpen && e.ctrlKey) {
        e.preventDefault();
      }
    };

    if (isImageModalOpen) {
      document.addEventListener("contextmenu", preventContextMenu);
      document.addEventListener("wheel", preventPageZoom, { passive: false });
    }

    return () => {
      document.removeEventListener("contextmenu", preventContextMenu);
      document.removeEventListener("wheel", preventPageZoom);
    };
  }, [isImageModalOpen]);

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
            className={`absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            initial={{ scale: 1.05 }}
            animate={{ scale: imageLoaded ? 1 : 1.05 }}
            transition={{ duration: 0.8 }}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />

          {/* Overlay with hover hint */}
          <div
            className={`absolute inset-0 bg-gradient-to-b md:bg-gradient-to-br from-black/10 to-transparent group-hover:from-black/20 transition-all duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
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
            {/* Project Type Tag & Technology Tags */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Project Type Badge */}
              <span
                className={`px-3 py-1 rounded-full text-[10px] md:text-[11px] tracking-[0.1em] uppercase font-semibold transition-colors duration-500 ${
                  project.type === "collaboration"
                    ? "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700"
                    : "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800"
                }`}
              >
                {project.type === "collaboration" ? "Collaboration" : "Personal"}
              </span>

              {/* Divider */}
              <span className="text-slate-300 dark:text-slate-700">•</span>

              {/* Technology Tags */}
              {project.tags.map((tag) => (
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

            {/* Main Description - Subtle and Clean */}
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-light max-w-lg transition-colors duration-500">
              {project.description}
            </p>

            {/* Project Details List */}
            {project.details && project.details.length > 0 && (
              <div className="space-y-3 max-w-lg">
                <h3 className="text-xs md:text-sm uppercase tracking-[0.15em] text-slate-400 dark:text-slate-600 font-medium transition-colors duration-500">
                  What I Did
                </h3>
                <ul className="space-y-2">
                  {project.details.map((detail, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed transition-colors duration-500"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600 flex-shrink-0"></span>
                      <span className="flex-1">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

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

      {/* Image Modal/Lightbox with Zoom */}
      <AnimatePresence>
        {isImageModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8"
            onWheel={handleWheel}
          >
            {/* Close Button */}
            <button
              onClick={() => handleModalToggle(false)}
              className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white transition-all duration-300 flex items-center justify-center z-10"
              aria-label="Close"
            >
              <FaTimes className="text-lg md:text-xl" />
            </button>

            {/* Zoom Indicator */}
            {scale > 1 && (
              <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-2 rounded-lg text-sm z-10">
                {Math.round(scale * 100)}%
              </div>
            )}

            {/* Image Container */}
            <motion.div
              ref={imageRef}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center overflow-hidden"
              onContextMenu={handleRightClick}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onClick={handleImageClick}
              style={{
                cursor: isDragging ? 'grabbing' : 'grab'
              }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="max-w-full max-h-full object-contain select-none pointer-events-none"
                style={{
                  transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
                  transition: isDragging ? 'none' : 'transform 0.2s ease-out',
                }}
                draggable={false}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectCard;