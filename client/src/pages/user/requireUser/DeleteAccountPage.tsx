import { useState } from "react";
import { removeUserData } from "../../../redux/actions/authActions";
import ResMessages from "./../../../components/global/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { deleteUserAccount } from "../../../api/user/authApi";

const DeleteAccountPage = () => {
    const navigate = useNavigate();
    const [resMsg, setResMsg] = useState<[string] | []>([]);
    const [password, setPassword] = useState<string>("password1");

    const deleteAccountHandler = async () => {
        const res = await deleteUserAccount({ password });
        if (!res) return;
        if (res.data.status !== 200) return setResMsg(res.data.message);
        removeUserData();
        navigate("/");
    };
    return (
        <div>
            <div>Delete Account</div>
            <div>
                your password <input name="password" type="password" value={password} autoComplete="on" onChange={(e) => setPassword(e.target.value)} />{" "}
                <button onClick={deleteAccountHandler}>delete account</button>
            </div>
            <ResMessages messages={resMsg} />
        </div>
    );
};
export default DeleteAccountPage;
