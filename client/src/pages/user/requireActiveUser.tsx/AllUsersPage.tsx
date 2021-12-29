import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { manyUsersType } from "../../../types/user";
import { getAllUsers, getUserProfilePhoto } from "./../../../api/user/profileApi";

const AllUsersPage = () => {
    const [users, setUsers] = useState<manyUsersType[] | []>([]);
    useEffect(() => {
        (async () => {
            const res = await getAllUsers();
            if (!res) return;
            setUsers(res.data.message);
        })();
    }, []);
    return (
        <div>
            <div></div>
            {users.length
                ? users.map((e: manyUsersType) => (
                      <Link key={e._id} to={`/requireActiveUser/publicProfile/${e._id}`}>
                          <div style={{ display: "flex", alignContent: "center", alignItems: "center", margin: "20px" }}>
                              <div
                                  style={{
                                      display: "inline-block",
                                      width: "56px",
                                      height: "56px",
                                      margin: "10px",
                                      backgroundSize: "contain",
                                      backgroundRepeat: "no-repeat",
                                      backgroundImage: `url(${getUserProfilePhoto("thumbnail", e.profilePhotoPath)})`,
                                  }}
                              ></div>
                              <div>
                                  {e.name} {e.surname}
                              </div>
                          </div>
                      </Link>
                  ))
                : "no users :("}
        </div>
    );
};
export default AllUsersPage;
