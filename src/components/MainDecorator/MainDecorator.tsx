import styles from './MainDecorator.module.scss';
import NavBar from '../NavBar/NavBar';
import Button from '../Button/Button';
import Dropdown from '../Dropdown/Dropdown';
import VolumetricContainer from '../VolumetricContainer/VolumetricContainer';

import { useRef } from 'react';


function MainDecorator() {
  let moonSVG = "M12 1A11 11 0 1 0 23 12A7.78 7.78 0 0 1 12 1Z";
  let sunSVG = "M12 7C14.761 7 17 9.239 17 12C17 14.761 14.761 17 12 17C9.239 17 7 14.761 7 12C7 9.239 9.239 7 12 7Z M12 1V4 M12 20V23 M4 12H1 M23 12H20 M19.78 4.22L17.66 6.34 M6.34 17.66L4.22 19.78 M19.78 19.78L17.66 17.66 M6.34 6.34L4.22 4.22";

  let planetSVG = "M12 1 C18.075 1 23 5.925 23 12 C23 18.075 18.075 23 12 23 C5.925 23 1 18.075 1 12 C1 5.925 5.925 1 12 1 Z M1.9 8.3 H22.1 M1.9 15.7 H22.1 M12 1 A5 11 0 0 0 12 23 M12 1 A5 11 0 0 1 12 23";

  let themeToggleSVGPath = useRef<SVGPathElement>(null);

  const toggleTheme = () => {
    let currentTheme = document.body.getAttribute("data-theme");
    let switchToTheme = currentTheme === "dark" ? "light" : "dark";
    document.body.setAttribute("data-theme", switchToTheme);
    if (themeToggleSVGPath.current) {
      themeToggleSVGPath.current.setAttribute("d", switchToTheme === "dark" ? sunSVG : moonSVG);
    }
  };

  return (
    <>
      <div className={styles.base}>
        <div id={styles["top-left-corner"]} className="hashed-background">
          <button>=</button>
        </div>
        <div id={styles["top-navbar"]}>
          <NavBar />
        </div>
        <div id={styles["left-toolbar"]}>
          <div id={styles["nav-utilities"]}>
              <Button aria-label="Switch to dark theme"
                onClick={toggleTheme}
                id={styles["theme-toggle"]}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" >
                  <path
                    ref={themeToggleSVGPath}
                    d={moonSVG} 
                    strokeWidth="1" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"/>
                </svg>
              </Button>
              <Dropdown items={[
                  { label: "Français", onClick: () => toggleLanguage() },
                  { label: "English", onClick: () => toggleLanguage() }
                ]} id={styles["language-dropdown"]} aria-label="Choose language" displayArrow={false}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" >
                  <path d={planetSVG} fill="none"/>
                </svg>
              </Dropdown>
            </div>
        </div>
        <div id={styles["main-content-container"]}>
        </div>
      </div>
    </>
  )
}

export default MainDecorator;