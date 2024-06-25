import { useState, useEffect } from 'react';

const ScrollDirection = () => {
    const [scrollDirection, setScrollDirection] = useState<'horizontal' | 'vertical'>('vertical');

    useEffect(() => {
        const updateScrollDirection = () => {
            const width = window.innerWidth;
            if (width <= 765) {
                setScrollDirection('horizontal');
            } else {
                setScrollDirection('vertical');
            }
        };

        updateScrollDirection(); // Set initial value
        window.addEventListener('resize', updateScrollDirection); // Update on resize

        return () => {
            window.removeEventListener('resize', updateScrollDirection);
        };
    }, []);

    return scrollDirection;
};

export default ScrollDirection;