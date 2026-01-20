import React, { useEffect, useRef } from 'react';
import { useDarkMode } from '../context/DarkModeContext';

const InteractiveGridBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { isDarkMode } = useDarkMode();
    const mousePos = useRef({ x: 0, y: 0 });
    const animationFrameId = useRef<number | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const updateCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        updateCanvasSize();
        window.addEventListener('resize', updateCanvasSize);

        // Mouse move handler
        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Grid settings
        const gridSize = 40;
        const maxDistance = 150;

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Colors based on dark mode
            const lineColor = isDarkMode ? 'rgba(148, 163, 184, 0.15)' : 'rgba(203, 213, 225, 0.4)';
            const glowColor = isDarkMode ? 'rgba(100, 116, 139, 0.3)' : 'rgba(148, 163, 184, 0.5)';

            // Draw grid
            for (let x = 0; x < canvas.width; x += gridSize) {
                for (let y = 0; y < canvas.height; y += gridSize) {
                    const dx = mousePos.current.x - x;
                    const dy = mousePos.current.y - y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        const opacity = 1 - distance / maxDistance;
                        
                        // Draw glowing dot
                        ctx.beginPath();
                        ctx.arc(x, y, 2, 0, Math.PI * 2);
                        ctx.fillStyle = glowColor.replace('0.3)', `${opacity * 0.3})`).replace('0.5)', `${opacity * 0.5})`);
                        ctx.fill();

                        // Draw connecting lines to nearby points
                        if (x + gridSize < canvas.width) {
                            const dxNext = mousePos.current.x - (x + gridSize);
                            const distanceNext = Math.sqrt(dxNext * dxNext + dy * dy);
                            if (distanceNext < maxDistance) {
                                ctx.beginPath();
                                ctx.moveTo(x, y);
                                ctx.lineTo(x + gridSize, y);
                                ctx.strokeStyle = lineColor.replace('0.15)', `${opacity * 0.15})`).replace('0.4)', `${opacity * 0.4})`);
                                ctx.lineWidth = 1;
                                ctx.stroke();
                            }
                        }

                        if (y + gridSize < canvas.height) {
                            const dyNext = mousePos.current.y - (y + gridSize);
                            const distanceNext = Math.sqrt(dx * dx + dyNext * dyNext);
                            if (distanceNext < maxDistance) {
                                ctx.beginPath();
                                ctx.moveTo(x, y);
                                ctx.lineTo(x, y + gridSize);
                                ctx.strokeStyle = lineColor.replace('0.15)', `${opacity * 0.15})`).replace('0.4)', `${opacity * 0.4})`);
                                ctx.lineWidth = 1;
                                ctx.stroke();
                            }
                        }
                    } else {
                        // Draw subtle static grid
                        ctx.beginPath();
                        ctx.arc(x, y, 1, 0, Math.PI * 2);
                        ctx.fillStyle = isDarkMode ? 'rgba(71, 85, 105, 0.1)' : 'rgba(203, 213, 225, 0.2)';
                        ctx.fill();
                    }
                }
            }

            animationFrameId.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', updateCanvasSize);
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [isDarkMode]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ pointerEvents: 'none' }}
        />
    );
};

export default InteractiveGridBackground;