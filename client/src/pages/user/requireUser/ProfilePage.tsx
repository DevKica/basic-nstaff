import { useEffect, useState } from "react";
import { changeUserProfilePhoto, getUserPrivateInfo } from "../../../api/user/profileApi";
import ResMessages from "../../../components/global/ErrorMessage";
import { getUserProfilePhoto } from "../../../api/user/profileApi";
import { setUserData } from "../../../redux/actions/authActions";
import { userPrivateDataType } from "./../../../types/user";

const ProfilePage = () => {
    const [resMsg, setResMsg] = useState<[string] | []>([]);
    const [file, setFile] = useState<File>();
    const [privateUser, setPrivateUser] = useState<userPrivateDataType | null>(null);

    useEffect(() => {
        (async () => {
            const res = await getUserPrivateInfo();
            if (!res) return;
            setPrivateUser(res.data.message);
            setUserData(res.data.message);
        })();
    }, []);
    const changeProfilePhotoHandler = async () => {
        if (!file) return setResMsg(["Select file"]);
        const formData = new FormData();
        formData.append("profilePhoto", file, file.name);

        const res = await changeUserProfilePhoto(formData);
        if (!res) return;
        if (res.data.status !== 200) return setResMsg(res.data.message);

        setPrivateUser(res.data.message);
        setUserData(res.data.message);
    };
    return (
        <div>
            {privateUser && (
                <div>
                    <div>Profile</div>
                    <div>name: {privateUser.name}</div>
                    <div>surname: {privateUser.surname}</div>
                    <div>email: {privateUser.email}</div>
                    <div>updatedAt: {privateUser.updatedAt.replace("T", " ").slice(0, 19)}</div>
                    <div>createdAt: {privateUser.createdAt.replace("T", " ").slice(0, 19)}</div>
                    <div
                        style={{
                            width: "200px",
                            height: "200px",
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            backgroundImage: `url(${getUserProfilePhoto("medium", privateUser.profilePhotoPath)})`,
                        }}
                    ></div>
                    <div>
                        File to upload{" "}
                        <input
                            type="file"
                            onChange={(e) => {
                                if (e.target.files) {
                                    setFile(e.target.files[0]);
                                }
                            }}
                            accept="image/png, image/jpeg, image/jpg"
                        />
                    </div>
                    <button onClick={changeProfilePhotoHandler}>change profile photo</button>

                    <ResMessages messages={resMsg} />
                </div>
            )}
        </div>
    );
};
export default ProfilePage;
