
import React, { useState, useEffect } from 'react';
import { ICONS } from '../constants';

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const mainContent = document.querySelector('main');
    if(mainContent){
        mainContent.addEventListener('scroll', toggleVisibility);
    }
    return () => {
        if(mainContent){
            mainContent.removeEventListener('scroll', toggleVisibility);
        }
    };
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`fixed bottom-5 right-5 z-40 p-3 rounded-full bg-primary text-primary-foreground shadow-lg transition-opacity duration-300 hover:bg-primary/90 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {ICONS.chevronUp}
    </button>
  );
};

export default ScrollToTopButton;
