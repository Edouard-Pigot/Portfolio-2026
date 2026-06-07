import NavBar from '@components/NavBar/NavBar';
import MainContent from '@components/MainContent/MainContent';
import ScrollBridge from '@components/ScrollBridge/ScrollBridge';
import UtilityButtons from '../UtilityButtons/UtilityButtons';
import React, { forwardRef } from 'react';

import styles from './MainDecorator.module.scss';

const MainDecorator = forwardRef<HTMLDivElement, {}>((_props, ref) => {
  return (
    <ScrollBridge>
      <div ref={ref as React.Ref<HTMLDivElement>} className={`${styles.mainDecorator}`}>
        <div id={styles["top-left-corner"]} >
          EP
        </div>
        <div id={styles["top-navbar"]}>
          <NavBar />
        </div>
        <div id={styles["left-toolbar"]}>
          <div id={styles["spacer"]} className='hashed-background'/>
          <UtilityButtons id={styles["nav-utilities"]} />
        </div>
        <div id={styles["main-content-container"]} className="crossed-background">
          <MainContent />
        </div>
      </div>
    </ScrollBridge>
  )
});

export default MainDecorator;