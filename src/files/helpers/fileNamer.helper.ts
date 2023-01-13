import { v4 as uuid } from 'uuid'

export const fileNamer = (req: Express.Request, file: Express.Multer.File, callback) => {
    if (!file) {
        return callback(new Error(' file is empty'), false)
    }

    const fileExtension = file.mimetype.split('/')[1]
    const filename = `${uuid()}.${fileExtension}`
    callback(null, filename)
}
