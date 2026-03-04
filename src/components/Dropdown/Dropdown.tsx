import styles from './Dropdown.module.scss';

import Button from '@components/Button/Button';

import { useState, useRef, useEffect, type ReactElement } from 'react';
import { createPortal } from 'react-dom';

export type Item = {
  label: string;
  value: string;
  icon?: string;
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
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const dropdownMenu = useRef<HTMLDivElement>(null);
  const dropdownButton = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: FocusEvent) => {
    if (dropdownMenu.current && !dropdownMenu.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
    setIsOpen(false);
    props.onItemSelect?.(item);
  };

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

        dropdownMenu.current.style.top = `${top}px`;
        dropdownMenu.current.style.left = `${left}px`;
      }
    }

    if(isOpen && dropdownMenu.current) {
      updatePosition();
      dropdownMenu.current.addEventListener('blur', handleClickOutside);
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
    }

    return () => { 
      if(dropdownMenu.current)
        dropdownMenu.current.removeEventListener('blur', handleClickOutside);
      if(dropdownButton.current)
        dropdownButton.current.classList.remove('active');
    };
  }, [isOpen]);

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
        className={styles.dropdown} 
        ref={dropdownButton}
      >
          {props.children}
          {arrowIcon}
      </Button>
      {isOpen && (
        createPortal(
          <div ref={dropdownMenu} className={styles.menu}>
            {props.items.map((item, index) => (
              <button 
                key={index} 
                className={styles.menuItem} 
                onClick={() => handleItemClick(item)}
              >
                {item.label}
              </button>
            ))}
          </div>,
          document.body
        )
      )}
    </>
  );
}

export default Dropdown;