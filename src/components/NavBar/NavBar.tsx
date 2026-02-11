import styles from './NavBar.module.scss';

import Button from '../Button/Button';
import { useState } from 'react';

function NavBar() {
  const [activeTab, setActiveTab] = useState('home');

  let navButtonOnClick = (label: HTMLButtonElement) => {
    console.log(`Navigating to ${label}`);
  }

  return (
    <>
      <nav id={styles["nav-bar-content"]} className={styles.base}>
        <div id={styles["nav-items"]}>
          <Button 
            className={styles['nav-button']}
            isActive={activeTab === 'home'} 
            onClick={() => setActiveTab('home')}>
            ACCUEIL</Button>
          <Button 
            className={styles['nav-button']}
            isActive={activeTab === 'about'} 
            onClick={() => setActiveTab('about')}>
            À&nbsp;PROPOS</Button>
          <Button 
            className={styles['nav-button']}
            isActive={activeTab === 'projects'} 
            onClick={() => setActiveTab('projects')}>
            PROJETS</Button>
          <Button 
            className={styles['nav-button']}
            isActive={activeTab === 'experience'} 
            onClick={() => setActiveTab('experience')}>
            EXPERIENCE</Button>
          <Button 
            className={styles['nav-button']}
            isActive={activeTab === 'education'} 
            onClick={() => setActiveTab('education')}>
            PARCOURS</Button>
          <Button 
            className={styles['nav-button']}
            isActive={activeTab === 'contact'} 
            onClick={() => setActiveTab('contact')}>
            CONTACT</Button>
        </div>
			</nav>
    </>
  )
}

export default NavBar
