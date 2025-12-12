import './ScrollingBanner.css'

import { useEffect, useRef } from 'react';

function ScrollingBanner(props: { text: string, textJP: string, direction: number }) {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bannerRef.current;
    if (!el) return;
    let direction = props.direction === 1 ? 'scroll-right' : 'scroll-left';
    bannerRef.current?.style.setProperty('--scroll-direction', direction);
  }, [props.direction]);
  
  return (
    <>
      <div className="scrolling-banner" ref={bannerRef}>
        <div className="scrolling-banner-section">
          <p>{props.text}</p>
          <p className='banner-slash-decorator'>///////////</p>
        </div>
        <div className="scrolling-banner-section">
          <p>{props.text}</p>
          <p className='banner-slash-decorator'>///////////</p>
        </div>
        <div className="scrolling-banner-section">
          <p>{props.text}</p>
          <p className='banner-slash-decorator'>///////////</p>
        </div>
        <div className="scrolling-banner-section">
          <p>{props.text}</p>
          <p className='banner-slash-decorator'>///////////</p>
        </div>
        <div className="scrolling-banner-section">
          <p>{props.text}</p>
          <p className='banner-slash-decorator'>///////////</p>
        </div>
        <div className="scrolling-banner-section">
          <p>{props.text}</p>
          <p className='banner-slash-decorator'>///////////</p>
        </div>
        <div className="scrolling-banner-section">
          <p>{props.text}</p>
          <p className='banner-slash-decorator'>///////////</p>
        </div>
        <div className="scrolling-banner-section">
          <p>{props.text}</p>
          <p className='banner-slash-decorator'>///////////</p>
        </div>
      </div>
    </>
  )
}

export default ScrollingBanner;
