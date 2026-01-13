import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FooterNav: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="fixed bottom-8 right-8 z-50"
        >
            <div className="flex flex-col gap-4 text-sm uppercase tracking-[0.15em] items-end">
                <Link
                    to="/about"
                    className="text-slate-500 hover:text-slate-900 transition-colors font-normal group"
                >
                    About
                    <span className="block h-[1px] bg-slate-900 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right"></span>
                </Link>
                <Link
                    to="/contact"
                    className="text-slate-500 hover:text-slate-900 transition-colors font-normal group"
                >
                    Contact
                    <span className="block h-[1px] bg-slate-900 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right"></span>
                </Link>
            </div>
        </motion.div>
    );
};

export default FooterNav;