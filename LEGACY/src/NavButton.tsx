import './NavButton.css'

function NavButton(props: { id: string; dataElement: string; isActive: boolean; children: React.ReactNode }) {
  return (
    <>
        <li id={props.id} className={`nav-item ${props.isActive ? "active" : ""}`} data-element={props.dataElement}><p>{props.children}</p></li>
    </>
  )
}

export default NavButton;
