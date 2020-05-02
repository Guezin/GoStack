import multer from 'multer'
import crypto from 'crypto'
import { resolve } from 'path'

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp'),
    filename: (request, file, callback) => {
      const hash = crypto.randomBytes(10).toString('HEX')
      const fileHash = `${hash}-${file.originalname}`

      return callback(null, fileHash)
    }
  })
}
