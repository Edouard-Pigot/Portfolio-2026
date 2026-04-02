import styles from './MediaCarousel.module.scss';

import { useRef, useState } from 'react';

import MediaDisplay from '@/components/MediaDisplay/MediaDisplay';

import { type ProjectMedia } from '@data/projects';

function MediaCarousel({ media }: { media: ProjectMedia[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);

  const [showLeftArrow, setshowLeftArrow] = useState(false);
  const [showRightArrow, setshowRightArrow] = useState(true);

  const handleScroll = () => {
    if (!userInteracted) setUserInteracted(true);

    if (scrollRef.current) {
      const { scrollLeft, offsetWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / offsetWidth);
      setActiveIndex(index);
      setshowRightArrow(index !== media.length - 1);
      setshowLeftArrow(index !== 0);
    }
  };

  const slide = (direction: 'next' | 'prev') => {
    if (!userInteracted) setUserInteracted(true);
    if (scrollRef.current) {
      const width = scrollRef.current?.offsetWidth || 0;
      scrollRef.current.scrollBy({
        left: direction === 'next' ? width : -width,
        behavior: 'smooth',
      });
    }
  };

  const scrollTo = (index: number) => {
  if (!userInteracted) setUserInteracted(true);
    if (scrollRef.current) {
      const width = scrollRef.current?.offsetWidth || 0;
      scrollRef.current.scrollTo({
        left: width * index,
        behavior: 'smooth',
      });
    }
  };

  if (media.length <= 1) return <MediaDisplay item={media[0]} isPrioritary={true} />;

  return (
    <div className={styles['carouselWrapper']}>
      <div 
        className={styles['scrollContainer']} 
        ref={scrollRef} 
        onScroll={handleScroll}
      >
        {media.map((item, i) => {
          const isFirst = i === 0;
          if (!isFirst && !userInteracted) {
            return <div key={i} className={styles['carouselItem']} />;
          }

          return (
            <div key={i} className={styles['carouselItem']}>
              <MediaDisplay item={item} isPrioritary={isFirst} />
            </div>
          );
        })}
      </div>
      <div className={styles['carouselControls']}>
        <button 
          className={`${styles['arrow']} ${styles['prev']} ${showLeftArrow && styles['shown']}`} 
          onClick={() => slide('prev')}>
          <svg className={styles.chevron} width="1rem" height="1rem" viewBox="0 0 100 200" xmlns="http://www.w3.org/2000/svg">
            <path d="M 100 0 L 0 100 L 100 200" fill='none' />
          </svg>
        </button>

        <div className={styles['position-indicators']}>
          {media.map((_, i) => (
            <button 
              key={i} 
              className={`${styles['position-indicator']} ${i === activeIndex ? styles['active'] : ''}`}
              onClick={() => scrollTo(i)}
            />
          ))}
        </div>

        <button 
          className={`${styles['arrow']} ${styles['next']} ${showRightArrow && styles['shown']}`} 
          onClick={() => slide('next')}>
          <svg className={styles.chevron} width="1rem" height="1rem" viewBox="0 0 100 200" xmlns="http://www.w3.org/2000/svg">
            <path d="M 0 0 L 100 100 L 0 200" fill='none' />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default MediaCarousel;