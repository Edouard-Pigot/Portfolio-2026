import styles from './NavBar.module.scss';

import { useContext, useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';

import Button from '@components/Button/Button';
import { ScrollHeightContext } from '@components/ScrollBridge/ScrollBridge';
import UtilityButtons from '../UtilityButtons/UtilityButtons';

function NavBar() {
  const { t } = useTranslation();

  const scrollContext = useContext(ScrollHeightContext);

  const burgerRef = useRef<HTMLButtonElement >(null);
  const menuPopupRef = useRef<HTMLDivElement>(null);
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const activeTab = scrollContext?.activeSection || 'home';

  const navItems = [
    { id: 'home', label: t('home.section_name') },
    { id: 'about', label: t('about.section_name') },
    { id: 'projects', label: t('projects.section_name') },
    { id: 'skills', label: t('skills.section_name') },
    { id: 'experience', label: t('experiences.section_name') },
    { id: 'education', label: t('education.section_name') },
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

  const updateMenuPosition = () => {
    if (!menuPopupRef.current) return;

    const isMobilePortrait = window.innerWidth < 850;
    const isMobileLandscape = window.innerHeight < 500;

    let finalPosition = {};
    if(isMobileLandscape){
      const menuWidth = menuPopupRef.current.offsetWidth;
      finalPosition = {right: `calc(-${menuWidth}px - 1px)`};
    } else if(isMobilePortrait) {
      const menuHeight = menuPopupRef.current.offsetHeight;
      finalPosition = {right: 'auto', bottom: `calc(-${menuHeight}px - 1px)`};
    }

    //Move panel
    gsap.to(menuPopupRef.current, { 
      ...finalPosition,
      duration: 0.1, 
      ease: 'power2.out'
    });
  };

  const updateMenuClosePosition = () => {
    if (!menuPopupRef.current) return;

    const isMobilePortrait = window.innerWidth < 850;
    const isMobileLandscape = window.innerHeight < 500;

    let finalPosition = {};
    if(isMobileLandscape)
      finalPosition = {right: '-1px'};
    else if(isMobilePortrait)
      finalPosition = {bottom: '-1px', right: 'auto'};

    gsap.to(menuPopupRef.current, { 
      ...finalPosition,
      duration: 0.1, 
      ease: 'power2.out'
    });
  };

  useEffect(() => {  
    if(isMenuOpened && burgerRef.current) {
      burgerRef.current.classList.add(styles['active']);
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('resize', updateMenuPosition);

      tlRef.current?.kill();
      tlRef.current = gsap.timeline();

      if(menuPopupRef.current) {
        const buttons = menuPopupRef.current.querySelectorAll(`.${styles['nav-button']}`);

        const isMobilePortrait = window.innerWidth < 850;
        const isMobileLandscape = window.innerHeight < 500;

        let finalPosition = {};
        if(isMobileLandscape){
          const menuWidth = menuPopupRef.current.offsetWidth;
          finalPosition = {right: `calc(-${menuWidth}px - 1px)`};
        } else if(isMobilePortrait) {
          const menuHeight = menuPopupRef.current.offsetHeight;
          finalPosition = {bottom: `calc(-${menuHeight}px - 1px)`, right: 'auto'};
        }

        // Menu panel opening
        tlRef.current.to(menuPopupRef.current, { 
          ...finalPosition,
          duration: 0.2, 
          ease: 'power2.out'
        });

        // Buttons fade in
        tlRef.current.to(buttons, { 
          opacity: 1, 
          y: 0, 
          duration: 0.1, 
          stagger: 0.05, 
          ease: 'power2.out' 
        });
      }
    } else if(!isMenuOpened && menuPopupRef.current) {
      tlRef.current?.kill();
      tlRef.current = gsap.timeline({
        onComplete: () => {
          if(burgerRef.current)
            burgerRef.current.classList.remove(styles['active']);
        }
      });

      const buttons = menuPopupRef.current.querySelectorAll(`.${styles['nav-button']}`);

      // Buttons fade out
      tlRef.current.to(buttons, { 
        opacity: 0, 
        y: -10, 
        duration: 0.1, 
        stagger: 0.05, 
        ease: 'power2.in' 
      });

      const isMobilePortrait = window.innerWidth < 850;
      const isMobileLandscape = window.innerHeight < 500;

      let finalPosition = {};
      if(isMobileLandscape)
        finalPosition = {right: '-1px'};
      else if(isMobilePortrait)
        finalPosition = {bottom: '-1px'};


      // Menu panel closing
      tlRef.current.to(menuPopupRef.current, { 
        ...finalPosition,
        duration: 0.2, 
        ease: 'power2.out'
      });
      

      if(burgerRef.current)
        burgerRef.current.classList.remove(styles['active']);
      
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', updateMenuPosition);
      window.addEventListener('resize', updateMenuClosePosition);
    }

    return () => { 
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', updateMenuPosition);
      window.removeEventListener('resize', updateMenuClosePosition);
      if(burgerRef.current)
        burgerRef.current.classList.remove(styles['active']);
    };
  }, [isMenuOpened]);

  useEffect(() => {
    return () => {
      tlRef.current?.kill();
    };
  }, []);

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
