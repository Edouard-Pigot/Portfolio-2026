import styles from './NavBar.module.scss';

import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '@components/Button/Button';
import { ScrollHeightContext } from '@components/ScrollBridge/ScrollBridge';

function NavBar() {
  const { t } = useTranslation();

  const scrollContext = useContext(ScrollHeightContext);

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

  const handleNavClick = (id: string) => {
    scrollContext?.scrollToSection(id);
  };

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
    </nav>
  );
}

export default NavBar;
