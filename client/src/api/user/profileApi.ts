import { PROFILE_USER_URL } from "../../config/default";
import { GeneralUpdateBody } from "../../types/body";
import { userProfileAccessInstance } from "./userInstance";

export const getUserProfilePhoto = (size: string, photoName: string) => `${PROFILE_USER_URL}/userProfilePhoto/${size}/${photoName}`;
export const changeUserProfilePhoto = (updateBody: any) => userProfileAccessInstance.patch(`/profilePhotoUpdate`, updateBody);

export const changeUserGeneralInfo = (body: GeneralUpdateBody) => userProfileAccessInstance.patch(`/generalUpdate`, body);

export const getUserPrivateInfo = () => userProfileAccessInstance.get(`/privateInfo`);
export const getAllUsers = () => userProfileAccessInstance.get("/allUsers");
export const getUserPublicInfo = (userId: string | undefined) => userProfileAccessInstance.get(`/publicInfo/${userId}`);
