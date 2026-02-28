import styles from './ContentRow.module.scss';

interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}


function ContentRow(props: RowProps) {
  const { className, children, ...rest } = props;

  let combinedClassName = `${styles.contentRow}` + (className ? ` ${className}` : '');

  return (
    <div className={combinedClassName} {...rest}>
      {props.children}
    </div>
  );
}

export default ContentRow;