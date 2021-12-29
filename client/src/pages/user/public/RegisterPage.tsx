import { useForm } from "../../../hooks/useForm";
import { registerUser } from "../../../api/user/authApi";
import { useState } from "react";
import { useNavigate } from "react-router";
import ResMessages from "../../../components/global/ErrorMessage";
import { setUserData } from "../../../redux/actions/authActions";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [body, changeBody] = useForm({ name: "heheName", surname: "heheSurname", email: "devKica777@gmail.com", password: "password1", repeatPassword: "password1" });
    const [registerError, setRegisterError] = useState<[string] | []>([]);

    const handleFormSubmit = async () => {
        const res = await registerUser(body);
        if (!res) return;
        if (res.data.status !== 200) return setRegisterError(res.data.message);
        setUserData(res.data.message);
        navigate("/");
    };

    return (
        <div>
            <div>Register</div>
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
                    name <input name="name" type="text" value={body.name} autoComplete="on" onChange={changeBody} />
                </div>
                <div>
                    surname <input name="surname" type="text" value={body.surname} autoComplete="on" onChange={changeBody} />
                </div>
                <div>
                    password <input name="password" type="password" value={body.password} autoComplete="on" onChange={changeBody} />
                </div>
                <div>
                    repeat your password <input name="repeatPassword" type="password" value={body.repeatPassword} autoComplete="on" onChange={changeBody} />
                </div>
                <ResMessages messages={registerError} />
                <button>submit</button>
            </form>
        </div>
    );
};
export default RegisterPage;
