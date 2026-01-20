import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaUser, FaEnvelope, FaMoon, FaSun } from 'react-icons/fa';
import { useDarkMode } from '../context/DarkModeContext';

const SlideUpMenu: React.FC = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [startY, setStartY] = useState(0);

    // Swipe up / scroll detection
    useEffect(() => {
        const handleTouchStart = (e: TouchEvent) => {
            setStartY(e.touches[0].clientY);
        };

        const handleTouchMove = (e: TouchEvent) => {
            const deltaY = startY - e.touches[0].clientY;
            if (deltaY > 50 && !isOpen) setIsOpen(true);
        };

        const handleWheel = (e: WheelEvent) => {
            if (e.deltaY < -30 && !isOpen) setIsOpen(true);
        };

        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('wheel', handleWheel);

        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('wheel', handleWheel);
        };
    }, [startY, isOpen]);

    const menuItems = [
        {
            name: 'ABOUT',
            icon: FaUser,
            angle: -60,
            action: () => {
                setIsOpen(false);
                setTimeout(() => navigate('/about'), 300);
            }
        },
        {
            name: isDarkMode ? 'LIGHT' : 'DARK',
            icon: isDarkMode ? FaSun : FaMoon,
            angle: 0,
            action: (e?: React.MouseEvent) => {
                e?.stopPropagation();
                toggleDarkMode();
            }
        },
        {
            name: 'CONTACT',
            icon: FaEnvelope,
            angle: 60,
            action: () => {
                setIsOpen(false);
                setTimeout(() => navigate('/contact'), 300);
            }
        }
    ];

    const radius = 120;

    return (
        <>
            {/* Swipe Up Indicator */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 1 }}
                        className="fixed inset-x-0 bottom-8 md:bottom-10 z-30 flex flex-col items-center justify-center gap-2"
                    >
                        <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                className="text-slate-400 dark:text-slate-400 mx-auto"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 15l7-7 7 7"
                                />
                            </svg>
                        </motion.div>
                        <div className="text-xs md:text-sm text-slate-400 dark:text-slate-400 uppercase tracking-[0.15em] font-light text-center">
                            Swipe Up
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Backdrop */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/20 dark:bg-black/60 backdrop-blur-sm z-40"
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Menu Container */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
                <div className="relative flex items-center justify-center">

                    {/* Menu Items */}
                    <AnimatePresence>
                        {isOpen &&
                            menuItems.map((item, index) => {
                                const rad = (item.angle * Math.PI) / 180;
                                const x = Math.sin(rad) * radius;
                                const y = -Math.cos(rad) * radius;

                                return (
                                    <motion.button
                                        key={item.name}
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0, opacity: 0 }}
                                        transition={{
                                            delay: index * 0.08,
                                            type: 'spring',
                                            stiffness: 260,
                                            damping: 20
                                        }}
                                        style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            item.action(e);
                                        }}
                                        whileHover={{ scale: 1.12 }}
                                        className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-white to-slate-100 dark:from-slate-700 dark:to-slate-900 border-4 border-slate-200 dark:border-white/10 shadow-xl flex flex-col items-center justify-center gap-1"
                                    >
                                        <item.icon className="text-slate-700 dark:text-white text-xl" />
                                        <span className="text-[10px] font-semibold tracking-widest text-slate-700 dark:text-slate-200">
                                            {item.name}
                                        </span>
                                    </motion.button>
                                );
                            })}
                    </AnimatePresence>

                    {/* Close Button */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.button
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1, rotate: 45 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                                whileHover={{ scale: 1.1 }}
                                onClick={() => setIsOpen(false)}
                                className="w-20 h-20 rounded-full bg-white dark:bg-slate-800 border-4 border-slate-200 dark:border-white/20 shadow-2xl flex items-center justify-center z-10"
                            >
                                <FaTimes className="text-2xl text-slate-700 dark:text-white" />
                            </motion.button>
                        )}
                    </AnimatePresence>

                </div>
            </div>
        </>
    );
};

export default SlideUpMenu;
