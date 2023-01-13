export const fileFilter = (req: Express.Request, file: Express.Multer.File, callback) => {
    if (!file) {
        return callback(new Error(' file is empty'), false)
    }

    const fileExtension = file.mimetype.split('/')[1]
    const validExtentions = ['jpg', 'jpeg', 'png', 'pdf']

    if (validExtentions.includes(fileExtension)) {
        return callback(null, true)
    }
    callback(null, false)
}
