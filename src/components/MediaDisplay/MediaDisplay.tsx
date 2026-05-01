import { useEffect, useRef, useState } from 'react';

import './MediaDisplay.module.scss';

interface Props {
  item: { url: string; type: 'image' | 'video'; poster?: string };
  isPrioritary?: boolean;
}

function MediaDisplay({ item, isPrioritary = false }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const [shouldLoad, setShouldLoad] = useState(isPrioritary);

  useEffect(() => {
    const element = item.type === 'video' ? videoRef.current : imgRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !shouldLoad) {
          setShouldLoad(true);
        }

        if (item.type === 'video' && videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play().catch(() => {
              /* Handle autoplay blocks */
            });
          } else {
            videoRef.current.pause();
          }
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px'
       }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [item.type, shouldLoad]);

  if (item.type === 'video') {
    return (
      <video 
        ref={videoRef}
        // If not priority and not yet visible, src is undefined to prevent download
        src={shouldLoad ? item.url : undefined}
        muted 
        loop 
        playsInline
        poster={item.poster}
      />
    );
  }

  return (
    <img 
      ref={imgRef}
      src={shouldLoad ? item.url : "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"}
      loading={isPrioritary ? "eager" : "lazy"}
    />
  );
};

export default MediaDisplay;