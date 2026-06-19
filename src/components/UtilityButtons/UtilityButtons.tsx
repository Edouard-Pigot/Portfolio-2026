import styles from './UtilityButtons.module.scss';

import Button from '@components/Button/Button';

import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

function UtilityButtons(props: React.HTMLAttributes<HTMLDivElement>) {

  const location = useLocation();

  const { i18n, t } = useTranslation();

  let moonSVG = "M12 1A11 11 0 1 0 23 12A7.78 7.78 0 0 1 12 1Z";
  let sunSVG = "M12 7C14.761 7 17 9.239 17 12C17 14.761 14.761 17 12 17C9.239 17 7 14.761 7 12C7 9.239 9.239 7 12 7Z M12 1V4 M12 20V23 M4 12H1 M23 12H20 M19.78 4.22L17.66 6.34 M6.34 17.66L4.22 19.78 M19.78 19.78L17.66 17.66 M6.34 6.34L4.22 4.22";

  const [theme, setTheme] = useState(() => {
    return document.documentElement.getAttribute('data-theme') || "light";
  });

  const applyTheme = useCallback((newTheme : string, save : boolean = false) => {
    document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);

    if (save) {
      localStorage.setItem("user-theme", newTheme);
    }
  }, []);

  const getSwitchPath = (targetLang: string) => {
    const segments = location.pathname.split('/');
    segments[1] = targetLang;
    return segments.join('/');
  };

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

  return (
    <div id={props.id} className={styles["utilities"]}>
      <Button 
        aria-label={theme === "dark" ? t('theme.toggle_aria_light') : t('theme.toggle_aria_dark')}
        onClick={toggleTheme}
        id={styles["theme-toggle"]}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" height="17px" width="17px">
          <path
            d={theme === "dark" ? sunSVG : moonSVG}
            strokeWidth="1" 
            strokeLinecap="round" 
            strokeLinejoin="round"/>
        </svg>
      </Button>
      <Button 
        aria-label={i18n.language === 'en' ? t('language.toggle_aria_fr') : t('language.toggle_aria_en')}
        id={styles["language-toggle"]}>
          <Link to={getSwitchPath(i18n.language === 'en' ? 'fr' : 'en')}>
            {i18n.language === 'en' ? 'fr' : 'en'}
          </Link>
      </Button>
    </div>
  );
}

export default UtilityButtons;