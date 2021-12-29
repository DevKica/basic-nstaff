import { Link } from "react-router-dom";

const NavLink = (props: { text: string; path: string; onClickHandler: any }) => {
    return (
        <div>
            <Link onClick={props.onClickHandler} to={props.path}>
                {props.text}
            </Link>
        </div>
    );
};

export default NavLink;
