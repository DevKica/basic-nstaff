import { useForm } from "../../../hooks/useForm";
import { useState } from "react";
import ResMessages from "../../../components/global/ErrorMessage";
import { changePassword } from "../../../api/user/authApi";

const ChangePasswordPage = () => {
    const [body, changeBody] = useForm({ oldPassword: "password1", password: "password2", repeatPassword: "password2" });
    const [resMsg, setResMsg] = useState<[string] | []>([]);

    const handleFormSubmit = async () => {
        const res = await changePassword(body);
        if (!res) return;
        setResMsg(res.data.message);
    };
    return (
        <div>
            <div>Change password</div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleFormSubmit();
                }}
            >
                <div>
                    old password <input name="oldPassword" type="password" value={body.oldPassword} autoComplete="on" onChange={changeBody} />
                </div>
                <div>
                    password <input name="password" type="password" value={body.password} autoComplete="on" onChange={changeBody} />
                </div>
                <div>
                    repeat your password <input name="repeatPassword" type="password" value={body.repeatPassword} autoComplete="on" onChange={changeBody} />
                </div>
                <ResMessages messages={resMsg} />
                <button>submit</button>
            </form>
        </div>
    );
};
export default ChangePasswordPage;
