import styles from './Dropdown.module.scss';

import Button from '@components/Button/Button';

import { useState, useRef, useEffect, type ReactElement } from 'react';

type Item = {
  label: string;
  icon: string;
}

interface DropdownProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  items: Item[]; 
  onItemSelect?: (item: Item) => void;
  displayArrow?: boolean;
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
    if (isOpen && dropdownMenu.current && dropdownButton.current) {
      const buttonRect = dropdownButton.current.getBoundingClientRect();
      const menuRect = dropdownMenu.current.getBoundingClientRect();

      dropdownButton.current.classList.add('active');

      if (buttonRect) {
        dropdownMenu.current.style.top = `${buttonRect.bottom + window.scrollY}px`;
        dropdownMenu.current.style.left = `${buttonRect.right - buttonRect.width/2 - menuRect.width/2}px`;
      }

      dropdownMenu.current.addEventListener('blur', handleClickOutside);
      return () => { 
        if(dropdownMenu.current)
          dropdownMenu.current.removeEventListener('blur', handleClickOutside);
        if(dropdownButton.current)
          dropdownButton.current.classList.remove('active');
      };
    }
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
        </div>
      )}
    </>
  );
}

export default Dropdown;