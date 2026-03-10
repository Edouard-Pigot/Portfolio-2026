import styles from './MainDecorator.module.scss';

import NavBar from '@components/NavBar/NavBar';
import Button from '@components/Button/Button';
import Dropdown, { type Item } from '@components/Dropdown/Dropdown';
import MainContent from '@components/MainContent/MainContent';
import ScrollBridge from '@components/ScrollBridge/ScrollBridge';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';


function MainDecorator() {

  const { i18n, t } = useTranslation();

  let moonSVG = "M12 1A11 11 0 1 0 23 12A7.78 7.78 0 0 1 12 1Z";
  let sunSVG = "M12 7C14.761 7 17 9.239 17 12C17 14.761 14.761 17 12 17C9.239 17 7 14.761 7 12C7 9.239 9.239 7 12 7Z M12 1V4 M12 20V23 M4 12H1 M23 12H20 M19.78 4.22L17.66 6.34 M6.34 17.66L4.22 19.78 M19.78 19.78L17.66 17.66 M6.34 6.34L4.22 4.22";

  let planetSVG = "M12 1 C18.075 1 23 5.925 23 12 C23 18.075 18.075 23 12 23 C5.925 23 1 18.075 1 12 C1 5.925 5.925 1 12 1 Z M1.9 8.3 H22.1 M1.9 15.7 H22.1 M12 1 A5 11 0 0 0 12 23 M12 1 A5 11 0 0 1 12 23";

  const [theme, setTheme] = useState(() => {
    return document.documentElement.getAttribute('data-theme') || "light";
  });
  const [themeToggleAriaText, setThemeToggleAriaText] = useState("");

  const applyTheme = useCallback((newTheme : string, save : boolean = false) => {
    document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);

    if (save) {
      localStorage.setItem("user-theme", newTheme);
    }
  }, []);

  useEffect(() => {
    const newThemeToggleAriaText = theme === "dark" 
      ? t('theme.toggle_aria_light') 
      : t('theme.toggle_aria_dark');
      
    setThemeToggleAriaText(newThemeToggleAriaText);
  }, [theme, t, i18n.language]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const savedTheme = localStorage.getItem("user-theme");
    const systemTheme = mediaQuery.matches ? "dark" : "light";
    
    applyTheme(savedTheme || systemTheme);

    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("user-theme")) {
        applyTheme(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [applyTheme]);

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const switchToTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(switchToTheme, true);
  };

  const languageOptions = [
    { label: 'English', value: 'en'},
    { label: 'Français', value: 'fr'},
  ];

  const handleSelect = (item: Item) => {
    i18n.changeLanguage(item.value);
    console.log(`System language updated to: ${item.value}`);
  };

  return (
    <ScrollBridge>
      <div className={styles.mainDecorator}>
        <div id={styles["top-left-corner"]} >
          <div>EP</div>
        </div>
        <div id={styles["top-navbar"]}>
          <NavBar />
        </div>
        <div id={styles["left-toolbar"]}>
          <div id={styles["spacer"]} className='hashed-background'>
          </div>
          <div id={styles["nav-utilities"]}>
              <Button 
                aria-label={themeToggleAriaText}
                onClick={toggleTheme}
                id={styles["theme-toggle"]}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" >
                  <path
                    d={theme === "dark" ? sunSVG : moonSVG}
                    strokeWidth="1" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"/>
                </svg>
              </Button>
              <Dropdown 
                items={languageOptions} 
                onItemSelect={handleSelect} 
                id={styles["language-dropdown"]} aria-label={t('language.dropdown_aria')} displayArrow={false}
                forcedMenuPosition='right'
                dropDirection='up'
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" >
                  <path d={planetSVG} fill="none"/>
                </svg>
              </Dropdown>
            </div>
        </div>
        <div id={styles["main-content-container"]} className="dotted-background">
          <MainContent />
        </div>
      </div>
    </ScrollBridge>
  )
}

export default MainDecorator;