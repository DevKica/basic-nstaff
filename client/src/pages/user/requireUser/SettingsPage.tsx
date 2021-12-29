import { useForm } from "../../../hooks/useForm";
import { changeUserGeneralInfo } from "../../../api/user/profileApi";
import { useState } from "react";
import { getStoreUserAuthData, setUserData } from "../../../redux/actions/authActions";
import { userDataType } from "../../../types/user";
import ResMessages from "../../../components/global/ErrorMessage";
import { changeEmail, resendEmail } from "../../../api/user/authApi";

const SettingsPage = () => {
    const authData: userDataType = getStoreUserAuthData();
    const [generalUpdateBody, changeGeneralUpdateBody] = useForm({ name: authData.name, surname: authData.surname });
    const [emailUpdateBody, changeEmailUpdateBody] = useForm({ email: "pkica123@gmail.com", password: "password1" });
    const [resMsg, setResMsg] = useState<[string] | []>([]);

    const changeGeneralHandler = async () => {
        const res = await changeUserGeneralInfo(generalUpdateBody);
        if (!res) return;
        if (res.data.status !== 200) return setResMsg(res.data.message);
        setUserData(res.data.message);
    };
    const changeEmailHandler = async () => {
        const res = await changeEmail(emailUpdateBody);
        if (!res) return;
        setResMsg(res.data.message);
    };
    const resendEmailHandler = async () => {
        const res = await resendEmail();
        if (!res) return;
        setResMsg(res.data.message);
    };
    return (
        <div>
            <div>Settings</div>
            <div>
                name <input name="name" type="text" value={generalUpdateBody.name} autoComplete="on" onChange={changeGeneralUpdateBody} />
            </div>
            <div>
                surname <input name="surname" type="text" value={generalUpdateBody.surname} autoComplete="on" onChange={changeGeneralUpdateBody} />
            </div>
            <button onClick={changeGeneralHandler}>change name and surname</button>
            <div>
                email <input name="email" type="email" value={emailUpdateBody.email} autoComplete="on" onChange={changeEmailUpdateBody} />
            </div>
            <div>
                your password <input name="password" type="password" value={emailUpdateBody.password} autoComplete="on" onChange={changeEmailUpdateBody} />
            </div>
            <button onClick={changeEmailHandler}>change email</button>
            <div>
                <button onClick={resendEmailHandler}>resend email confirmation</button>
            </div>
            <ResMessages messages={resMsg} />
        </div>
    );
};
export default SettingsPage;
