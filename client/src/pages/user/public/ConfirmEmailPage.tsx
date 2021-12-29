import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { confirmEmail } from "../../../api/user/authApi";
import ResMessages from "../../../components/global/ErrorMessage";
import { removeUserData } from "../../../redux/actions/authActions";

const EmailConfirmationPage = () => {
    const { token } = useParams();
    const [resMsg, setRespondMsg] = useState<[string] | []>([]);
    const [status, setStatus] = useState(false);

    useEffect(() => {
        (async () => {
            const res = await confirmEmail(token);
            if (!res) return;
            if (res.data.status !== 200) return setRespondMsg(res.data.message);
            removeUserData();
            setStatus(true);
        })();
    }, [token]);
    return (
        <div>
            {status ? (
                <>
                    Success, you've confirmed your email
                    <Link to="/public/login">
                        <button>login</button>
                    </Link>
                </>
            ) : (
                <ResMessages messages={resMsg} />
            )}
        </div>
    );
};
export default EmailConfirmationPage;
