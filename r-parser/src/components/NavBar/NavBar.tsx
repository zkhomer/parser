import {FC,} from "react";
import {navProps} from "../../../type /interfaces.ts";
import {NavLink} from "react-router-dom";

const NavBar: FC<navProps> = ({ menuItems }) => {

    return(
        <nav className="nav">
            <ul className="nav-list flex">
                {
                    menuItems.length ? menuItems.map((navItem) => (
                            <li className="nav-list-item mr-2" key={Date.now() + Math.random()}>
                                <NavLink to={`/${navItem}`}>
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