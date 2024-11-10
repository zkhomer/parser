import {FC, useState,} from "react";
import {navProps} from "../../../type /interfaces.ts";
import {NavLink} from "react-router-dom";

const NavBar: FC<navProps> = ({ menuItems }) => {
const [burgerToggle, setBurgerToggle] = useState(false)

const burgerToggles = ()=>{
    setBurgerToggle(!burgerToggle)
}

    return(
        <nav className="nav nav-burger">
            <button className={`burger-btn`} onClick={burgerToggles}>{ !burgerToggle ? 'open' : 'close'}</button>
            <ul className={`nav-list flex ${ burgerToggle ? 'nav-list--open' : ''}`}>
                {
                    menuItems.length ? menuItems.map((navItem) => (
                            <li className={`nav-list-item mr-2`} key={Date.now() + Math.random()}>
                                <NavLink to={`/${navItem.toLowerCase()}`}>
                                    { navItem }
                                </NavLink>
                            </li>

                        ))
                        : 'no props'
                }
            </ul>
        </nav>
    );
}

export default NavBar;