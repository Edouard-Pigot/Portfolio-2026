import styles from './Button.module.scss';

import type { ReactElement, ReactNode, ForwardedRef } from 'react';
import { forwardRef } from 'react';

interface BaseProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
};

type Button = BaseProps & {
  shape?: 'rectangle' | 'rounded';
  children: React.ReactNode; // Allows text, numbers, elements, etc.
};

type RoundButton = BaseProps & {
  shape: 'round';
  children: ReactElement; // Strictly requires a React element (SVG, img, etc.), NOT raw text
  'aria-label': string; // Force a label for icon-only buttons
};

type ButtonProps = Button | RoundButton;

function ButtonComponent(props: ButtonProps, ref: ForwardedRef<HTMLDivElement>) {
  const { className, children, isActive, 'aria-label': ariaLabel, ...rest } = props;

  const shape = props.shape || 'rectangle';

  let combinedClassName = styles.button;

  if (isActive) combinedClassName += ` ${styles.active}`;

  if (shape == 'round') combinedClassName += ` ${styles.round}`;
  else if( shape == 'rounded') combinedClassName += ` ${styles.rounded}`;
  
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
