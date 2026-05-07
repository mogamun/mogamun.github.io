import { useRef, useCallback } from 'react';

export function useTilt(intensity = 8) {
  const ref = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -intensity;
    const rotateY = ((x - cx) / cx) * intensity;
    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`;
  }, [intensity]);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    setTimeout(() => {
      if (el) el.style.transition = '';
    }, 500);
  }, []);

  const handleMouseEnter = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = 'transform 0.15s ease';
  }, []);

  return { ref, handleMouseMove, handleMouseLeave, handleMouseEnter };
}
