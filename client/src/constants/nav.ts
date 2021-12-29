export interface navElement {
    text: string;
    path: string;
}
export const globalNavPaths = [{ text: "reset your password", path: "/special/sendResetPasswordEmail" }];

export const publicNavPaths = [{ text: "register", path: "/public/register" }, { text: "login", path: "/public/login" }, ...globalNavPaths];

export const authenticateNavPaths = [
    { text: "profile", path: "/requireUser/profile" },
    { text: "settings", path: "/requireUser/settings" },
    { text: "change password", path: "/requireUser/changePassword" },
    ...globalNavPaths,
    { text: "logout", path: "/requireUser/logout" },
    { text: "delete account", path: "/requireUser/deleteAccount" },
];

export const activeNavPaths = [...authenticateNavPaths, { text: "active profile", path: "/requireActiveUser/profile" }, { text: "all users", path: "/requireActiveUser/allUsers" }];
