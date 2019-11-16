import multer from 'multer'
import crypto from 'crypto'
import { resolve, extname } from 'path'

export default {
    storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
        filename: (req, file, callback) => {
            crypto.randomBytes(16, (err, result) => {
                if(err) return callback(err)
                console.log(req)
                console.log('=========')
                console.log('=========')
                console.log('=========')
                console.log(file)
                return callback(null, result.toString('hex') + extname(file.originalname))
            })
        }
    })
}