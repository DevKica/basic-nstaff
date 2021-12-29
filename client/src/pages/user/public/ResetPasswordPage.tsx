import { useState } from "react";
import { resetPassword } from "../../../api/user/authApi";
import ResMessages from "../../../components/global/ErrorMessage";

const ResetPasswordPage = () => {
    const [email, setEmail] = useState("devKica777@gmail.com");
    const [resMsg, setResMsg] = useState<[string] | []>([]);
    const resetPasswordHandler = async () => {
        const res = await resetPassword({ email });
        if (!res) return;
        setResMsg(res.data.message);
    };
    return (
        <div>
            email <input value={email} onChange={(e) => setEmail(e.target.value)} />
            <div>
                <button onClick={resetPasswordHandler}>reset your password</button>
            </div>
            <ResMessages messages={resMsg} />
        </div>
    );
};
export default ResetPasswordPage;
