import styles from './Section.module.scss';

interface BaseProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  title?: string, 
  children?: React.ReactNode
}

function Section(props: BaseProps) {

  let combinedClassName = styles.base;
  combinedClassName += props.className ? ` ${props.className}` : '';

  return (
    <>
      <section className={combinedClassName}>
        <div className={styles.container}>
          {props.title && <h2>{props.title}</h2>}
          <div className={styles.content}>
            {props.children}
          </div>
        </div>
      </section>
    </>
  )
}

export default Section
