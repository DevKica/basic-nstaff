import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserProfilePhoto, getUserPublicInfo } from "../../../api/user/profileApi";
import { publicUserDataType } from "../../../types/user";

const PublicProfilePage = () => {
    const { userId } = useParams();
    const [publicUser, setPublicUser] = useState<publicUserDataType | null>(null);

    useEffect(() => {
        (async () => {
            const res = await getUserPublicInfo(userId);
            if (!res) return;
            setPublicUser(res.data.message);
        })();
    }, [userId]);
    return (
        <div>
            <div>Public Profile</div>
            {publicUser && (
                <div>
                    <div>name: {publicUser.name}</div>
                    <div>surname: {publicUser.surname}</div>
                    <div>email: {publicUser.email}</div>
                    <div>created at: {publicUser.createdAt.replace("T", " ").slice(0, 19)}</div>
                    <div
                        style={{
                            width: "200px",
                            height: "200px",
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            backgroundImage: `url(${getUserProfilePhoto("medium", publicUser.profilePhotoPath)})`,
                        }}
                    ></div>
                </div>
            )}
        </div>
    );
};
export default PublicProfilePage;
