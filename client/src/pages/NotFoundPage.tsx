import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div>
            <div>Not found</div>
            <div>
                <Link to="/">
                    <button>go back</button>
                </Link>
            </div>
        </div>
    );
};
export default NotFoundPage;
