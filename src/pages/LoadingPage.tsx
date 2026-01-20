import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoadingPageProps {
  onLoadComplete: () => void;
  imagesToPreload: string[];
}

const LoadingPage: React.FC<LoadingPageProps> = ({ onLoadComplete, imagesToPreload }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const preloadImages = async () => {
      const totalImages = imagesToPreload.length;
      let loadedCount = 0;

      // If no images to load, complete immediately
      if (totalImages === 0) {
        setProgress(100);
        setTimeout(onLoadComplete, 300);
        return;
      }

      // Create promises for all images
      const imagePromises = imagesToPreload.map((src) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          
          img.onload = () => {
            loadedCount++;
            const currentProgress = Math.round((loadedCount / totalImages) * 100);
            setProgress(currentProgress);
            console.log(`Loaded: ${src} (${currentProgress}%)`);
            resolve();
          };
          
          img.onerror = () => {
            loadedCount++;
            const currentProgress = Math.round((loadedCount / totalImages) * 100);
            setProgress(currentProgress);
            console.warn(`Failed to load: ${src}`);
            resolve();
          };
          
          img.src = src;
        });
      });

      // Wait for all images to load
      await Promise.all(imagePromises);

      // Ensure 100% is shown
      setProgress(100);
      
      // Complete loading - langsung tanpa delay
      setTimeout(onLoadComplete, 300);
    };

    preloadImages();
  }, [imagesToPreload, onLoadComplete]);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-slate-950 transition-colors duration-500">
      {/* Loading Content */}
      <div className="w-full px-0">
        {/* Loading Text - Centered above line */}
        <div className="mb-16 md:mb-20 text-center">
          <p className="text-xs md:text-sm uppercase tracking-[0.15em] text-slate-400 dark:text-slate-600 font-medium">
            Loading Assets
          </p>
        </div>

        {/* Progress Bar Container - Full Width */}
        <div className="relative w-full">
          {/* Background Line - Full Width */}
          <div className="w-full h-px bg-slate-200 dark:bg-slate-800 transition-colors duration-500" />
          
          {/* Active Progress Line */}
          <motion.div
            className="absolute top-0 left-0 h-px bg-slate-900 dark:bg-slate-100 transition-colors duration-500"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />

          {/* Percentage Moving with Line */}
          <motion.div
            className="absolute -top-10 md:-top-12"
            initial={{ left: '0%' }}
            animate={{ left: `${progress}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{ 
              transform: progress > 95 ? 'translateX(-100%)' : progress < 5 ? 'translateX(0%)' : 'translateX(-50%)'
            }}
          >
            <motion.div
              key={progress}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-lg md:text-xl font-light text-slate-900 dark:text-slate-100 tracking-tight tabular-nums whitespace-nowrap"
            >
              {progress}%
            </motion.div>
          </motion.div>

          {/* Small Circle at the end of line */}
          <motion.div
            className="absolute top-0 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-slate-900 dark:bg-slate-100 -translate-y-1/2 transition-colors duration-500"
            initial={{ left: '0%' }}
            animate={{ left: `${progress}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{ transform: 'translateX(-50%) translateY(-50%)' }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;