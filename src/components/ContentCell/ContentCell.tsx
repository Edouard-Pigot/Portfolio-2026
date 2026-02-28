import styles from './ContentCell.module.scss';

interface CellProps extends React.HTMLAttributes<HTMLDivElement> {
  width: 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100;
  children: React.ReactNode;
}

function ContentCell(props: CellProps) {
  const { className, children, ...rest } = props;

  let combinedClassName = styles[`cell-${props.width}`] + ` ${styles.contentCell}` + (className ? ` ${className}` : '');

  return (
    <div className={combinedClassName} {...rest}>
      {props.children}
    </div>
  );
}

export default ContentCell;