export interface userDataType {
    _id: string;
    email: string;
    name: string;
    surname: string;
    profilePhotoPath: string;
}
export interface publicUserDataType extends userDataType {
    createdAt: string;
}

export interface userPrivateDataType extends publicUserDataType {
    updatedAt: string;
}
export interface manyUsersType {
    _id: string;
    name: string;
    surname: string;
    profilePhotoPath: string;
}
