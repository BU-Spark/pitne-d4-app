import { useState, useEffect } from 'react';

const ScrollDirection = () => {
    const [scrollDirection, setScrollDirection] = useState<'horizontal' | 'vertical'>('vertical');

    useEffect(() => {
        console.log('here');
        const updateScrollDirection = () => {
            const width = window.innerWidth;
            console.log(`Screen width: ${width}`); // Log screen width for debugging
            if (width <= 765) {
                console.log('Setting scroll direction to horizontal');
                setScrollDirection('horizontal');
            } else {
                console.log('Setting scroll direction to vertical');
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