import styles from './Button.module.scss';

import type { ReactElement, ReactNode, ForwardedRef } from 'react';
import { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
  children: React.ReactNode;
};

function ButtonComponent(props: ButtonProps, ref: ForwardedRef<HTMLDivElement>) {
  const { className, children, isActive, 'aria-label': ariaLabel, ...rest } = props;

  let combinedClassName = styles.button;

  if (isActive) combinedClassName += ` ${styles.active}`;
  
  if (className) combinedClassName += ` ${className}`;

  return (
    <>
      <div 
        className={combinedClassName} 
        aria-label={ariaLabel} // Accessibility
        title={ariaLabel}      // Visual Tooltip (matches label)
        ref={ref}
        data-active={isActive}
        {...rest}              // Spread remaining props (onClick, type, etc.)
      >
        <div className={styles["button-text"]}>
          {children}
        </div>
      </div>
    </>
  )
};

const Button = forwardRef(ButtonComponent);

export default Button;
