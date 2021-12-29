import { useEffect, useState } from "react";
import { setNewPassword, verifyResetPasswordToken } from "../../../api/user/authApi";
import { useParams } from "react-router-dom";
import { useForm } from "../../../hooks/useForm";
import ResMessages from "../../../components/global/ErrorMessage";

const SetNewPasswordPage = () => {
    const [resMsg, setResMsg] = useState<[string] | []>([]);
    const [body, changeBody] = useForm({ password: "password2", repeatPassword: "password2" });
    const { token } = useParams();
    useEffect(() => {
        (async () => {
            const res = await verifyResetPasswordToken(token);
            if (!res) return;
        })();
    }, [token]);

    const setNewPasswordHandler = async () => {
        const res = await setNewPassword(token, body);
        if (!res) return;
        setResMsg(res.data.message);
    };
    return (
        <div>
            {resMsg.length ? (
                <ResMessages messages={resMsg} />
            ) : (
                <>
                    {" "}
                    <div>set new password page</div>
                    <div>
                        password <input name="password" type="password" value={body.password} autoComplete="on" onChange={changeBody} />
                    </div>
                    <div>
                        repeat your password <input name="repeatPassword" type="password" value={body.repeatPassword} autoComplete="on" onChange={changeBody} />
                    </div>
                    <button onClick={setNewPasswordHandler}>submit</button>
                </>
            )}
        </div>
    );
};
export default SetNewPasswordPage;
