import './GridSection.css'

function GridSection(props: { children: React.ReactNode, className?: string }) {
  return (
    <>
      <section className={`grid-section ${props.className ? props.className : ""}`}>
        {props.children}
      </section>
    </>
  )
}

export default GridSection;
