import { useForm } from "../../../hooks/useForm";
import { googleLogin, loginUser } from "../../../api/user/authApi";
import { useState } from "react";
import { useNavigate } from "react-router";
import ResMessages from "../../../components/global/ErrorMessage";
import { GoogleLogin } from "react-google-login";
import { GOOGLE_CLIENT_ID } from "../../../config/default";
import { googleRegister } from "../../../api/user/authApi";
import { GOOGLE_REGISTER } from "../../../helpers/errors/errorMessages";
import { setUserData } from "../../../redux/actions/authActions";

const LoginPage = () => {
    const navigate = useNavigate();
    const [body, changeBody] = useForm({ email: "devKica777@gmail.com", password: "password1" });
    const [googleBody, changeGoogleBody] = useForm({ password: "password1", repeatPassword: "password1" });
    const [googleToken, setGoogleToken] = useState("");
    const [loginError, setLoginError] = useState<[string] | []>([]);
    const [googleOAuthStatus, setGoogleOAuthStatus] = useState<boolean>(false);

    const handleFormSubmit = async () => {
        const res = await loginUser(body);
        if (!res) return;
        if (res.data.status !== 200) return setLoginError(res.data.message);
        setUserData(res.data.message);
        navigate("/");
    };
    const onGoogleSuccess = async (resGoogle: any) => {
        setGoogleToken(resGoogle.tokenId);
        const res = await googleLogin(resGoogle.tokenId);
        if (!res) return;
        if (res.data.status === 200) {
            setUserData(res.data.message);
            navigate("/");
            return;
        }
        if (res.data.message[0] === GOOGLE_REGISTER.message[0]) {
            setGoogleOAuthStatus(true);
        }
        setLoginError(res.data.message);
    };

    const handleGoogleRegister = async () => {
        const res = await googleRegister(googleToken, googleBody);
        if (!res) return;
        if (res.data.status !== 200) return setLoginError(res.data.message);
        setUserData(res.data.message);
        navigate("/");
    };
    const onGoogleFailure = (res: any) => {
        setLoginError([res]);
    };
    return (
        <div>
            <div>Login</div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleFormSubmit();
                }}
            >
                <div>
                    email <input name="email" type="email" value={body.email} autoComplete="on" onChange={changeBody} />
                </div>
                <div>
                    password <input name="password" type="password" value={body.password} autoComplete="on" onChange={changeBody} />
                </div>
                <button>submit</button>
            </form>
            <div>
                <GoogleLogin clientId={GOOGLE_CLIENT_ID} buttonText="Sign up/in with Google" onSuccess={onGoogleSuccess} onFailure={onGoogleFailure} />
            </div>

            {googleOAuthStatus && (
                <div>
                    <div>
                        password <input name="password" type="password" value={googleBody.password} autoComplete="on" onChange={changeGoogleBody} />
                    </div>
                    <div>
                        repeat your password <input name="repeatPassword" type="password" value={googleBody.repeatPassword} autoComplete="on" onChange={changeGoogleBody} />
                    </div>
                    <button onClick={handleGoogleRegister}>submit</button>
                </div>
            )}

            <ResMessages messages={loginError} />
        </div>
    );
};
export default LoginPage;
