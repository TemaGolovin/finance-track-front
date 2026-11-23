import { useEffect, useState } from 'react';

const EDGE_GAP_PX = 8;
const HEADER_GAP_PX = 4;

export const useBannerTop = () => {
  const [top, setTop] = useState(64);

  useEffect(() => {
    const header = document.querySelector('header');

    const update = () => {
      const headerBottom = header?.getBoundingClientRect().bottom ?? 0;
      setTop(Math.max(EDGE_GAP_PX, headerBottom + HEADER_GAP_PX));
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return top;
};
