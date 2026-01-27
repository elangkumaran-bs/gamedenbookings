import { useEffect, useRef } from 'react';

export default function SnowfallBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create snowflakes
    const snowflakes: HTMLDivElement[] = [];
    for (let i = 0; i < 50; i++) {
      const snowflake = document.createElement('div');
      snowflake.className = 'snowflake';
      
      // Random properties
      const size = Math.random() * 5 * 0.2;
      const leftIni = (Math.random() * 20 - 10);
      const leftEnd = (Math.random() * 20 - 10);
      const left = Math.random() * 100;
      const duration = 5 + Math.random() * 10;
      const delay = -(Math.random() * 10);
      
      snowflake.style.setProperty('--size', `${size}vw`);
      snowflake.style.setProperty('--left-ini', `${leftIni}vw`);
      snowflake.style.setProperty('--left-end', `${leftEnd}vw`);
      snowflake.style.left = `${left}vw`;
      snowflake.style.animationDuration = `${duration}s`;
      snowflake.style.animationDelay = `${delay}s`;
      
      // Add blur to every 6th snowflake
      if ((i + 1) % 6 === 0) {
        snowflake.style.filter = 'blur(1px)';
      }
      
      containerRef.current.appendChild(snowflake);
      snowflakes.push(snowflake);
    }

    // Cleanup
    return () => {
      snowflakes.forEach(snowflake => snowflake.remove());
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-gradient-to-b from-[#112233] to-[#111111]"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
}
