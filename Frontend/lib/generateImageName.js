export const generateImageName = (image) => {
    const imageNewName = Date.now() + '-' + image.name
    return imageNewName
}