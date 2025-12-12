import { useEffect } from 'react';
import './Cursor.css'

function Cursor() {
 
  useEffect(() => {
    const vertical = document.querySelector('.cursor-vertical') as HTMLElement | null;
    const horizontal = document.querySelector('.cursor-horizontal') as HTMLElement | null;
    const center = document.querySelector('.cursor-center') as HTMLElement | null;
    const centerVertical = document.querySelector('.cursor-center-vertical') as HTMLElement | null;
    const centerHorizontal = document.querySelector('.cursor-center-horizontal') as HTMLElement | null;

    if (!vertical || !horizontal || !center || !centerVertical || !centerHorizontal) return;

    let mouseX = 0;
    let mouseY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // subtract half the inner size to center it on the pointer
      vertical.style.transform = `translate(${mouseX}px, calc(${mouseY}px - 50%))`;
      horizontal.style.transform = `translate(calc(${mouseX}px - 50%), ${mouseY}px)`;
      center.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    };

    const onScroll = () => {
      requestAnimationFrame(() => {
        vertical.style.transform = `translate(${mouseX}px, calc(${mouseY}px - 50%))`;
        horizontal.style.transform = `translate(calc(${mouseX}px - 50%), ${mouseY}px)`;
        center.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const onMouseDown = () => {
      requestAnimationFrame(() => {
        centerHorizontal.style.width = '32px';
        centerVertical.style.height = '32px';
        centerHorizontal.style.backgroundColor = 'rgba(255, 255, 255, 1)';
        centerVertical.style.backgroundColor = 'rgba(255, 255, 255, 1)';
      });
    };

    const onMouseUp = () => {      
      requestAnimationFrame(() => {
        centerHorizontal.style.width = '24px';
        centerVertical.style.height = '24px';
        centerHorizontal.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
        centerVertical.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
      });
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <>
      <div className="custom-cursor">
        <div className="cursor-line cursor-vertical"></div>
        <div className="cursor-line cursor-horizontal"></div>
        <div className="cursor-center">
          <div className="cursor-line cursor-center-vertical"></div>
          <div className="cursor-line cursor-center-horizontal"></div>
        </div>
      </div>
    </>
  )
}

export default Cursor;
