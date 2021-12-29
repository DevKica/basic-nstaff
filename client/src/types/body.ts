export interface PasswordCheckBody {
    password: string;
}
export interface PasswordsBody extends PasswordCheckBody {
    repeatPassword: string;
}

export interface ChangePasswordBody extends PasswordsBody {
    oldPassword: string;
}
export interface GeneralUpdateBody {
    name: string;
    surname: string;
}
export interface EmailBody {
    email: string;
}
export interface LoginBody extends EmailBody, PasswordCheckBody {}

export interface RegisterBody extends EmailBody, PasswordsBody, GeneralUpdateBody {}
