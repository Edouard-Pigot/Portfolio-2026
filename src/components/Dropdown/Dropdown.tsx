import styles from './Dropdown.module.scss';

import Button from '@components/Button/Button';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

export type Item = {
  label: string;
  value: string;
  icon?: string;
  isActive?: boolean;
}

type MenuPosition = 'below' | 'right' | 'left' | 'top';
type DropDirection = 'down' | 'up';

interface DropdownProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  items: Item[]; 
  onItemSelect?: (item: Item) => void;
  displayArrow?: boolean;
  forcedMenuPosition?: MenuPosition;
  dropDirection?: DropDirection;
}

function Dropdown(props: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const dropdownMenu = useRef<HTMLDivElement>(null);
  const dropdownButton = useRef<HTMLButtonElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (isOpen &&
        dropdownMenu.current && !dropdownMenu.current.contains(event.target as Node) &&
        dropdownButton.current && !dropdownButton.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    for(let i = 0; i < props.items.length; i++) {
      if(props.items[i].isActive)
        setActiveIndex(i);
    }
  }, []);

  useEffect(() => {
    const updatePosition = () => {
      if (isOpen && dropdownMenu.current && dropdownButton.current) {
        dropdownButton.current.classList.add('active');

        const buttonRect = dropdownButton.current.getBoundingClientRect();
        const menuRect = dropdownMenu.current.getBoundingClientRect();

        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;

        let top = 0, left = buttonRect.left;

        let finalPos: MenuPosition;
        const direction = props.dropDirection || 'down';

        if (props.forcedMenuPosition) {
          finalPos = props.forcedMenuPosition;
        } else {
          if (buttonRect.bottom + menuRect.height <= viewportHeight) finalPos = 'below';
          else if (buttonRect.right + menuRect.width <= viewportWidth) finalPos = 'right';
          else if (buttonRect.left - menuRect.width >= 0) finalPos = 'left';
          else finalPos = 'top';
        }

        switch (finalPos) {
          case 'below':
            top = buttonRect.bottom + scrollY;
            break;
          case 'top':
            top = buttonRect.top + scrollY - menuRect.height;
            break;
          case 'right':
          case 'left':
            left = finalPos === 'right' ? buttonRect.right : buttonRect.left - menuRect.width;
        
            if (direction === 'down') {
              top = buttonRect.top + scrollY; 
            } else {
              top = buttonRect.bottom - menuRect.height + scrollY;
            }
            break;
          default:
            top = Math.max(0, (viewportHeight - menuRect.height) / 2) + scrollY;
            left = Math.max(0, (viewportWidth - menuRect.width) / 2);
            break;
        }

        if(finalPos === 'below' || finalPos === 'top') {
          if (buttonRect.left + menuRect.width >= viewportWidth) {
            left = buttonRect.right - menuRect.width;
          }
        }

        dropdownMenu.current.style.top = `${top}px`;
        dropdownMenu.current.style.left = `${left}px`;
      }
    }

    if(isOpen && dropdownMenu.current) {
      updatePosition();
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
    }

    return () => { 
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
      if(dropdownButton.current)
        dropdownButton.current.classList.remove('active');
    };
  }, [isOpen]);

  const handleItemClick = (item: Item, index: number) => {
    setIsOpen(false);
    setActiveIndex(index);
    props.onItemSelect?.(item);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex(prev => (prev < props.items.length - 1 ? prev + 1 : 0));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex(prev => (prev > 0 ? prev - 1 : props.items.length - 1));
          break;
        case 'Enter':
          if (activeIndex >= 0) {
            handleItemClick(props.items[activeIndex], activeIndex);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          break;
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.addEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, props.items]);

  let arrowIcon;
  if(props.displayArrow) {
    arrowIcon = isOpen ? 
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 -960 960 960" ><path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z"/></svg> 
          : <svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 -960 960 960" ><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>;
  }

  return (
    <>
      <Button
        isActive={isOpen} 
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-label={props['aria-label'] || ''}
        aria-expanded={isOpen}
        className={`${styles.dropdown} ${isOpen ? styles.active : ''}`}
        ref={dropdownButton}
      >
        {props.children}
        {arrowIcon}
      </Button>
      {isOpen && (
        createPortal(
          <div ref={dropdownMenu} className={styles.menu} role="listbox">
            {props.items.map((item, index) => {
              const isSelected = activeIndex === index;

              return (
                <button 
                  key={item.value} 
                  role="option"
                  aria-selected={isSelected}
                  className={`${styles.menuItem} ${isSelected ? styles.selected : ''}`}
                  onClick={() => handleItemClick(item, index)}
                >
                  <div className={styles.itemContent}>
                    {item.icon && <span className={styles.icon}>{item.icon}</span>}
                    <span>{item.label}</span>
                  </div>
                </button>
              )
            })}
          </div>,
          document.body
        )
      )}
    </>
  );
}

export default Dropdown;