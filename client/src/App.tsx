import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import { Routes, Route, Link } from "react-router-dom";
import { FaBars, FaArrowLeft, FaHome } from "react-icons/fa";
import { activeNavPaths, authenticateNavPaths, navElement, publicNavPaths } from "./constants/nav";
import { useDispatch, useSelector } from "react-redux";
import { stateType } from "./redux/reducers/mainReducer";
import { getUserDataLocalStorage } from "./helpers/localStorage";
import { AUTH } from "./redux/actionTypes/auth";
import { deepAuthActiveUser, getUserData } from "./api/user/authApi";
import PublicMainPage from "./pages/user/public/PublicMain";
import RequireUserPage from "./pages/user/requireUser/RequireUserMain";
import RequireActiveUserPage from "./pages/user/requireActiveUser.tsx/RequireActiveUserMain";
import RedirectPage from "./pages/Redirect";
import NavLink from "./components/main/navLink";
import axios from "axios";
import { CONFIRM_EMAIL } from "./helpers/errors/errorMessages";
import EmailConfirmationPage from "./pages/user/public/ConfirmEmailPage";
import SetNewPasswordPage from "./pages/user/public/SetNewPasswordPage";
import ResetPasswordPage from "./pages/user/public/ResetPasswordPage";
import ErrorsRouter from "./pages/errors/ErrorsRouter";

axios.defaults.withCredentials = true;

const App = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const [loaded, setIsLoaded] = useState(false);
    const [navVisibility, setNavVisibility] = useState(false);
    const { isAuthenticated, isActive } = useSelector((state: stateType) => state.auth);
    useEffect(() => {
        (async () => {
            if (isAuthenticated === null) {
                try {
                    const authenticationResult = await deepAuthActiveUser();
                    const resActive = authenticationResult.data.status === 200;
                    if (resActive || authenticationResult.data.message[0] === CONFIRM_EMAIL.message[0]) {
                        const user = getUserDataLocalStorage();
                        if (user) {
                            if (resActive) {
                                dispatch({ type: AUTH.SET_ACTIVE_USER, payload: JSON.parse(user) });
                            } else {
                                dispatch({ type: AUTH.SET_USER, payload: JSON.parse(user) });
                            }
                        } else {
                            const { data } = await getUserData();
                            if (resActive) {
                                dispatch({ type: AUTH.SET_ACTIVE_USER, payload: data.message });
                            } else {
                                dispatch({ type: AUTH.SET_USER, payload: data.message });
                            }
                        }
                    } else {
                        dispatch({ type: AUTH.REMOVE_USER });
                    }
                } catch (e) {
                    dispatch({ type: AUTH.REMOVE_USER });
                    navigate("/errors/network");
                }
            }
            setIsLoaded(true);
        })();
    }, [location, dispatch, isAuthenticated, navigate]);
    const changeNavVisibility = () => setNavVisibility(!navVisibility);

    return (
        <main>
            <header className="mainAppHeader">your dream frontend {`<3`}</header>
            <div>
                <nav className={navVisibility ? "mainNav" : "mainNav Show"}>
                    <div className="homeIcon">
                        <Link to="/">
                            <FaHome onClick={changeNavVisibility} />
                        </Link>
                    </div>
                    {isAuthenticated
                        ? isActive
                            ? activeNavPaths.map((e: navElement, index) => <NavLink key={index} text={e.text} path={e.path} onClickHandler={changeNavVisibility} />)
                            : authenticateNavPaths.map((e: navElement, index) => <NavLink key={index} text={e.text} path={e.path} onClickHandler={changeNavVisibility} />)
                        : publicNavPaths.map((e: navElement, index) => <NavLink key={index} text={e.text} path={e.path} onClickHandler={changeNavVisibility} />)}
                    <div className="arrowLeft">
                        <FaArrowLeft onClick={changeNavVisibility} />
                    </div>
                </nav>
                <FaBars onClick={changeNavVisibility} />
            </div>
            {loaded ? (
                <div>
                    <Routes>
                        <Route path="/special/confirmEmail/:token" element={<EmailConfirmationPage />} />
                        <Route path="/special/sendResetPasswordEmail" element={<ResetPasswordPage />} />
                        <Route path="/special/resetPassword/:token" element={<SetNewPasswordPage />} />

                        <Route path="/" element={<RedirectPage />} />

                        <Route path="/errors/*" element={<ErrorsRouter />} />
                        {/* public */}
                        <Route path="/public/*" element={<PublicMainPage />} />
                        {/* requireUser */}
                        <Route path="/requireUser/*" element={<RequireUserPage />} />

                        {/* requireActiveUser */}
                        <Route path="/requireActiveUser/*" element={<RequireActiveUserPage />} />

                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </div>
            ) : (
                "loading"
            )}
        </main>
    );
};
export default App;
