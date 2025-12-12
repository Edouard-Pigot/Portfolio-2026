import './NavBar.css'
import { useTranslation } from "react-i18next";

import NavButton from './NavButton.tsx';

function NavBar() {
	const { t, } = useTranslation();

	let buttons = [];
	let buttonIds = ["home", "about", "projects", "experience", "education", "contact"];
	for(let id of buttonIds) {
		buttons.push(<NavButton key={`${id}-nav`} id={`${id}-nav`} dataElement={id} isActive={id === "home"}>{t(`nav-${id}`)}</NavButton>);
	}

  return (
    <>
      <nav id="navbar">
				<ul id="menu">
					{buttons}
				</ul>
			</nav>
    </>
  )
}

export default NavBar;
