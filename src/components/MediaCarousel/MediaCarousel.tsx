import { useRef, useState } from 'react';
import styles from './MediaCarousel.module.scss';
import ProjectMediaDisplay from '@components/ProjectMediaDisplay/ProjectMediaDisplay';
import { type ProjectMedia } from '@data/projects';

function MediaCarousel({ media }: { media: ProjectMedia[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, offsetWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / offsetWidth);
      setActiveIndex(index);
      if(index === media.length - 1) {
        setShowRight(false);
      } else {
        setShowRight(true);
      }
      if(index === 0) {
        setShowLeft(false);
      } else {
        setShowLeft(true);
      }
    }
  };

  const slide = (direction: 'next' | 'prev') => {
    if (scrollRef.current) {
      const width = scrollRef.current.offsetWidth;
      scrollRef.current.scrollBy({
        left: direction === 'next' ? width : -width,
        behavior: 'smooth',
      });
    }
  };

  const scrollTo = (index: number) => {
    if (scrollRef.current) {
      const width = scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({
        left: width * index,
        behavior: 'smooth',
      });
    }
  };

  if (media.length <= 1) return <ProjectMediaDisplay item={media[0]} />;

  return (
    <div className={styles['carouselWrapper']}>
      <div 
        className={styles['scrollContainer']} 
        ref={scrollRef} 
        onScroll={handleScroll}
      >
        {media.map((item, i) => (
          <div key={i} className={styles['carouselItem']}>
            <ProjectMediaDisplay item={item} />
          </div>
        ))}
      </div>
      <div className={styles['carouselControls']}>
        <button className={`${styles['arrow']} ${styles['prev']} ${showLeft && styles['shown']}`} onClick={() => slide('prev')}>
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

        <button className={`${styles['arrow']} ${styles['next']} ${showRight && styles['shown']}`} onClick={() => slide('next')}>
          <svg className={styles.chevron} width="1rem" height="1rem" viewBox="0 0 100 200" xmlns="http://www.w3.org/2000/svg">
            <path d="M 0 0 L 100 100 L 0 200" fill='none' />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default MediaCarousel;