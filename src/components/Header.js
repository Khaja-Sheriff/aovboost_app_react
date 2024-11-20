import { NavLink } from "react-router-dom"

export default function Header(){

    return(
        <div className="header">
            <div className="navlinks">
                <NavLink to={"/"}><i className="bi bi-columns"></i>Dashboard</NavLink>
                <NavLink to={"/Offers"}><i className="bi bi-tag"></i>Offers</NavLink>
            </div>
            <div className="navlinks">
                <NavLink to={"/AppDemo"}><i className="bi bi-info-circle"></i>App demo</NavLink>|
                <NavLink to={"/Contact"}><i className="bi bi-envelope"></i>Contact us</NavLink>|
                <NavLink to={"/"} className="logo"><img src="/logoipsum.svg" alt="" /></NavLink>
            </div>
        </div>
    );
}