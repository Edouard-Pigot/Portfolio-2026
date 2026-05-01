import styles from './MediaCarousel.module.scss';

import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

import MediaDisplay from '@/components/MediaDisplay/MediaDisplay';

import { type ProjectMedia } from '@data/projects';

function MediaCarousel({ media }: { media: ProjectMedia[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({duration: 10});

  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const onSelect = useCallback((api: any) => {
    setActiveIndex(api.selectedScrollSnap());
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  if (media.length <= 1) return <MediaDisplay item={media[0]} isPrioritary={true} />;

  return (
    <div className={styles['carouselWrapper']} ref={emblaRef}>
      <div className={styles['scrollContainer']}>
        {media.map((item, i) => {
          const isFirst = i === 0;

          return (
            <div key={i} className={styles['carouselItem']}>
              <MediaDisplay item={item} isPrioritary={isFirst} />
            </div>
          );
        })}
      </div>

      <div className={styles['carouselControls']}>
        <button 
          className={`${styles['arrow']} ${styles['prev']} ${canScrollPrev && styles['shown']}`} 
          onClick={scrollPrev}>
          <svg className={styles.chevron} width="1rem" height="1rem" viewBox="0 0 100 200" xmlns="http://www.w3.org/2000/svg">
            <path d="M 100 0 L 0 100 L 100 200" fill='none' />
          </svg>
        </button>
        <button 
          className={`${styles['arrow']} ${styles['next']} ${canScrollNext && styles['shown']}`} 
          onClick={scrollNext}>
          <svg className={styles.chevron} width="1rem" height="1rem" viewBox="0 0 100 200" xmlns="http://www.w3.org/2000/svg">
            <path d="M 0 0 L 100 100 L 0 200" fill='none' />
          </svg>
        </button>
        <div className={styles['slide-counter']}>
          <p> {activeIndex + 1} / {media.length} </p>
        </div>
      </div>
    </div>
  );
}

export default MediaCarousel;