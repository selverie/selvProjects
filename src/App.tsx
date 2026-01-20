import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LoadingPage from './pages/LoadingPage';
import LandingPage from './pages/LandingPage';
import PortfolioContainer from './pages/PortfolioContainer';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

// Import all images that need to be preloaded
import mobileImage from './assets/images/mobile.png';
import websiteImage from './assets/images/website.png';
import biofaceImage from './assets/images/bioface.png';
// Add other images here if needed

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  // List all images to preload
  const imagesToPreload = [
    mobileImage,
    websiteImage,
    biofaceImage,
    // Add other images here
  ];

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {/* Loading Page */}
      {isLoading && (
        <LoadingPage 
          onLoadComplete={handleLoadComplete}
          imagesToPreload={imagesToPreload}
        />
      )}

      {/* Main App - Only render when loading is complete */}
      {!isLoading && (
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/projects" element={<PortfolioContainer />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </AnimatePresence>
      )}
    </>
  );
}

export default App;