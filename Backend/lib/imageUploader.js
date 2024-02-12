const fs = require('fs');

const imageUploader = (image, uploadedPath) => {
    //Rename the default image with new one
    const imageNewName = Date.now() + '-' + Math.random() * 3642 + '-' + image.originalFilename

    image.originalFilename = imageNewName
    uploadImagePath = uploadedPath + `${image.originalFilename}`
    uploadedImgName = image.originalFilename
    //Upload the image into directory
    fs.copyFile(image.filepath, uploadImagePath, (err) => {
        if (err) {
            return res.status(500).json({
                message: err.message
            })
        }
    })

    return uploadedImgName

}

const deleteImage = (directory, image) => {
    if (directory && image) {
        fs.unlink(directory + image, (err) => {
            if (err) return res.status(500).json({
                error: "Server error with unlink image"
            })
        })
    }
}

module.exports = {
    imageUploader,
    deleteImage
}