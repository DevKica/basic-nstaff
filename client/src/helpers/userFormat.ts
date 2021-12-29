export const USER_LS_FORMAT = (data: any) => {
    try {
        const { _id, email, name, surname, profilePhotoPath } = data;
        return { _id, email, name, surname, profilePhotoPath };
    } catch (e) {
        return null;
    }
};
