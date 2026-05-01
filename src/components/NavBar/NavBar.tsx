import styles from './NavBar.module.scss';

import { useContext, useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '@components/Button/Button';
import { ScrollHeightContext } from '@components/ScrollBridge/ScrollBridge';
import UtilityButtons from '../UtilityButtons/UtilityButtons';

function NavBar() {
  const { t } = useTranslation();

  const scrollContext = useContext(ScrollHeightContext);

  const burgerRef = useRef<HTMLDivElement>(null);
  const menuPopupRef = useRef<HTMLDivElement>(null);
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);

  const activeTab = scrollContext?.activeSection || 'home';

  const navItems = [
    { id: 'home', label: t('home.section_name') },
    { id: 'about', label: t('about.section_name') },
    { id: 'projects', label: t('projects.section_name') },
    { id: 'skills', label: t('skills.section_name') },
    { id: 'experience', label: t('experiences.section_name') },
    { id: 'schooling', label: t('schooling.section_name') },
    { id: 'contact', label: t('contact.section_name') }
  ];

  const activeItem = navItems.find(item => item.id === activeTab)?.label || '';

  const handleNavClick = (id: string) => {
    scrollContext?.scrollToSection(id);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (isMenuOpened &&
        menuPopupRef.current && !menuPopupRef.current.contains(event.target as Node) &&
        burgerRef.current && !burgerRef.current.contains(event.target as Node)
    ) {
      setIsMenuOpened(false);
    }
  };

  useEffect(() => {  
      if(isMenuOpened && burgerRef.current) {
        burgerRef.current.classList.add(styles['active']);
        document.addEventListener('mousedown', handleClickOutside);
      }
  
      return () => { 
        document.removeEventListener('mousedown', handleClickOutside);
        if(burgerRef.current)
          burgerRef.current.classList.remove(styles['active']);
      };
    }, [isMenuOpened]);

  return (
    <nav id={styles["nav-bar-content"]} className={styles.navBar}>
      <div id={styles["nav-items"]}>
        {navItems.map(item => (
          <Button 
            key={item.id}
            className={styles['nav-button']}
            isActive={activeTab === item.id}
            onClick={() => handleNavClick(item.id)}
          >
            {item.label}
          </Button>
        ))}
      </div>
      <div id={styles["mobile-nav-bar"]}>
        <Button 
          id={styles["mobile-burger"]} 
          onClick={() => setIsMenuOpened(!isMenuOpened)}
          ref={burgerRef} 
        >
          =
        </Button>
        <div id={styles["spacer"]}>
          <p className={styles["current-section"]}>
            {activeItem}
          </p>
        </div>
        <UtilityButtons id={styles["mobile-utility"]}/>
      </div>
      <div 
        id={styles["mobile-popup"]} 
        ref={menuPopupRef} 
        className={isMenuOpened ? styles.open : ''}
      >
        {navItems.map(item => (
          <Button 
            key={item.id}
            className={styles['nav-button']}
            isActive={activeTab === item.id}
            onClick={() => handleNavClick(item.id)}
          >
            {item.label}
          </Button>
        ))}
      </div>
    </nav>
  );
}

export default NavBar;
