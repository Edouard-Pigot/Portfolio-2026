import styles from './MainDecorator.module.scss';

import NavBar from '@components/NavBar/NavBar';
import MainContent from '@components/MainContent/MainContent';
import ScrollBridge from '@components/ScrollBridge/ScrollBridge';
import UtilityButtons from '../UtilityButtons/UtilityButtons';


function MainDecorator() {

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
          <UtilityButtons id={styles["nav-utilities"]} />
        </div>
        <div id={styles["main-content-container"]} className="dotted-background">
          <MainContent />
        </div>
      </div>
    </ScrollBridge>
  )
}

export default MainDecorator;