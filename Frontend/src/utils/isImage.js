const isImageByContentType = (file) => {
    const allowedImageTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
    ];

    if (file.type && allowedImageTypes.includes(file.type)) {
        return true;
    } else return false;
}
export default isImageByContentType