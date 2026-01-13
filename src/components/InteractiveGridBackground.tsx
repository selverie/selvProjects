import React, { useEffect, useRef } from 'react';

const InteractiveGridBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouse = useRef({ x: -1000, y: -1000 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        let dpi = window.devicePixelRatio || 1;

        // Grid configuration - Minimalist
        const spacing = 50;
        const dotSize = 1.2;
        const influenceRadius = 180;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width * dpi;
            canvas.height = height * dpi;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.scale(dpi, dpi);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };

        const handleMouseLeave = () => {
            mouse.current = { x: -1000, y: -1000 };
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseLeave);

        resize();

        let animationFrameId: number;

        const render = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw Grid
            const cols = Math.ceil(width / spacing);
            const rows = Math.ceil(height / spacing);

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const x = i * spacing;
                    const y = j * spacing;

                    // Calculate distance to mouse
                    const dx = mouse.current.x - x;
                    const dy = mouse.current.y - y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    // Calculate effect - More subtle
                    let currentDotSize = dotSize;
                    let alpha = 0.08; // More subtle base opacity

                    if (distance < influenceRadius) {
                        const factor = 1 - distance / influenceRadius;
                        currentDotSize = dotSize + (factor * 3);
                        alpha = 0.08 + (factor * 0.3);
                    }

                    ctx.fillStyle = `rgba(15, 23, 42, ${alpha})`;
                    ctx.beginPath();
                    ctx.arc(x, y, currentDotSize, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
        />
    );
};

export default InteractiveGridBackground;