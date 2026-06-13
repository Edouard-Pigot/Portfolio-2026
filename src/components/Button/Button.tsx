import styles from './Button.module.scss';

import type { ForwardedRef } from 'react';
import { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  children: React.ReactNode;
};

function ButtonComponent(props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) {
  const { className, children, isActive, 'aria-label': ariaLabel, ...rest } = props;

  let combinedClassName = styles.button;

  if (isActive) combinedClassName += ` ${styles.active}`;
  
  if (className) combinedClassName += ` ${className}`;

  return (
    <>
      <button 
        className={combinedClassName} 
        aria-label={ariaLabel}
        title={ariaLabel}
        ref={ref}
        data-active={isActive}
        {...rest}
      >
        <div className={styles["button-text"]}>
          {children}
        </div>
      </button>
    </>
  )
};

const Button = forwardRef(ButtonComponent);

export default Button;
