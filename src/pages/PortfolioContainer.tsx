import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import ProjectCard, { type Project } from "../components/ProjectCard";
import {
    FaChevronLeft,
    FaChevronRight,
    FaArrowLeft,
    FaGithub,
} from "react-icons/fa";
import InteractiveGridBackground from "../components/InteractiveGridBackground";
import mobileImage from "../assets/images/mobile.png";
import websiteImage from "../assets/images/website.png";
import biofaceImage from "../assets/images/bioface.png";
import gemfundImage from "../assets/images/gemfund.png";

// Sample Modern Projects
const projects: Project[] = [
    {
        id: 1,
        title: "Padira Mobile App",
        description:
            "Padira Mobile App is a Flutter-based agricultural distribution platform that connects farmers, rice mills, and distributors into a single integrated ecosystem.",
        image: mobileImage,
        tags: ["Flutter", "Firebase"],
        type: "personal",
        details: [
            "Developed a role-based mobile system for farmers, rice mills, and distributors",
            "Implemented real-time product trading for unhusked rice (gabah) and rice (beras)",
            "Built interactive maps and live location tracking between buyers and sellers",
            "Designed an order management system with payment and status tracking",
            "Integrated Midtrans payment gateway (BCA) alongside COD payments",
            "Implemented price recommendations and agricultural news for informed decision-making",
            "Built real-time notifications, including floating alerts for order updates",
            "Utilized Firebase services for authentication, database, and real-time synchronization"
        ],
        githubLink: "https://github.com/selverie/padira-mobile",
        liveLink: "",
    },
    {
        id: 2,
        title: "Padira Dashboard Admin",
        description:
            "Padira Dashboard Admin is a web-based monitoring dashboard designed for institutions to oversee agricultural production, distribution, and system operations.",
        image: websiteImage,
        tags: ["VueJs", "Firebase"],
        type: "personal",
        details: [
            "Developed a responsive admin dashboard using Vue.js 3",
            "Built monthly production analytics comparing gabah and rice outputs",
            "Implemented real-time monitoring of agricultural and milling data",
            "Enabled data export to Excel and PDF for reporting purposes",
            "Integrated live map visualization for product locations (farmers & rice mills)",
            "Developed price, news, and notification management modules",
            "Implemented user and role management for system access control",
            "•Built application maintenance controls for Android app management"
        ],
        githubLink: "https://github.com/selverie/padira-dashboard",
        liveLink: "https://padira-dashboard.vercel.app/",
    },
    {
        id: 3,
        title: "BioFace",
        description:
            "BioFace is a cloud-based skin disease prediction system designed to help users identify facial skin conditions and receive natural treatment recommendations using herbal ingredients.",
        image: biofaceImage,
        tags: [
            "Google Cloud Platform",
            "Kotlin",
            "Python",
            "JavaScipt",
            "Firebase",
        ],
        type: "collaboration",
        details: [
            "Developed a skin disease prediction REST API using Python Flask",
            "Integrated a TensorFlow-based machine learning model for image classification",
            "Implemented image upload and storage using Google Cloud Storage",
            "Designed user prediction history storage using Cloud SQL (PostgreSQL)",
            "Deployed containerized API to Google Cloud Run with auto-scaling support",
            "Configured CI/CD pipeline using Artifact Registry",
            "Integrated Firebase Authentication for secure API access",
            "Implemented API security features including rate limiting and API key management"
        ],
        githubLink: "https://github.com/Project-BioFace",
        liveLink: "",
    },
    {
        id: 4,
        title: "GemFund",
        description:
            "GemFund is a Flutter-based mobile crowdfunding application designed to improve user trust through a clean, intuitive, and transparent user experience.",
        image: gemfundImage,
        tags: [
            "Gemini3",
            "Flutter",
            "TypeScript",
            "Supabase"
        ],
        type: "collaboration",
        details: [
            "Developed the mobile application UI using Flutter",
            "Designed intuitive and user-friendly UI/UX for crowdfunding workflows",
            "Ensured consistent design and smooth user experience across the application"
        ],
        githubLink: "https://github.com/GemFund",
        liveLink: "",
    },
];

const variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? "100%" : "-100%",
        opacity: 0,
        zIndex: 0,
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? "100%" : "-100%",
        opacity: 0,
    }),
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

            if (e.key === "ArrowRight") {
                if (page < totalSlides - 1) paginate(1);
            } else if (e.key === "ArrowLeft") {
                if (page > 0) paginate(-1);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
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
                        opacity: { duration: 0.3 },
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
                                    Check out more of my work and open source contributions on
                                    GitHub
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
                            ? "border-slate-200 dark:border-slate-800 text-slate-300 dark:text-slate-700 cursor-not-allowed"
                            : "border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-900 dark:hover:bg-slate-100 hover:text-white dark:hover:text-slate-900 hover:border-slate-900 dark:hover:border-slate-100"
                            }`}
                        aria-label="Previous Project"
                    >
                        <FaChevronLeft className="mx-auto text-xs md:text-sm" />
                    </button>
                    <button
                        onClick={() => page < totalSlides - 1 && paginate(1)}
                        disabled={page === totalSlides - 1}
                        className={`w-10 h-10 md:w-12 md:h-12 rounded-full border transition-all duration-300 shadow-sm ${page === totalSlides - 1
                            ? "border-slate-200 dark:border-slate-800 text-slate-300 dark:text-slate-700 cursor-not-allowed"
                            : "border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-900 dark:hover:bg-slate-100 hover:text-white dark:hover:text-slate-900 hover:border-slate-900 dark:hover:border-slate-100"
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
                    {String(page + 1).padStart(2, "0")} /{" "}
                    {String(totalSlides).padStart(2, "0")}
                </div>
            )}
        </div>
    );
};

export default PortfolioContainer;