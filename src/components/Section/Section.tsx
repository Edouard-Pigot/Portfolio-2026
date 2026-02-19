import styles from './Section.module.scss';

interface BaseProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  index: string,
  title?: string, 
  children?: React.ReactNode
}

function Section(props: BaseProps) {

  let combinedClassName = styles.section;
  combinedClassName += props.className ? ` ${props.className}` : '';

  return (
    <>
      <section id={props.index} className={combinedClassName}>
        {props.children}
      </section>
    </>
  )
}

export default Section
