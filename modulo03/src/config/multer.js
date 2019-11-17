import multer from 'multer'
import crypto from 'crypto'
import { resolve, extname } from 'path'

export default {
    storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
        filename: (req, file, callback) => {
            crypto.randomBytes(8, (err, result) => {
                if(err) throw err

                return callback(null, result.toString('hex') + extname(file.originalname))
            })
        }
    })
}