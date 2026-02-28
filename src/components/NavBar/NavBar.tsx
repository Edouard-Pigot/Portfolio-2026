import styles from './NavBar.module.scss';

import Button from '@components/Button/Button';

import { useState } from 'react';

function NavBar() {
  const [activeTab, setActiveTab] = useState('home');

  const navItems = [
    { id: 'home', label: 'ACCUEIL' },
    { id: 'about', label: 'À PROPOS' },
    { id: 'projects', label: 'PROJETS' },
    { id: 'skills', label: 'COMPÉTENCES' },
    { id: 'experience', label: 'EXPÉRIENCE' },
    { id: 'education', label: 'PARCOURS' },
    { id: 'contact', label: 'CONTACT' }
  ];

  return (
    <nav id={styles["nav-bar-content"]} className={styles.navBar}>
      <div id={styles["nav-items"]}>
        {navItems.map(item => (
          <Button 
            key={item.id}
            className={styles['nav-button']}
            isActive={activeTab === item.id}
            onClick={() => setActiveTab(item.id)}
          >
            {item.label}
          </Button>
        ))}
      </div>
    </nav>
  )
}

export default NavBar
