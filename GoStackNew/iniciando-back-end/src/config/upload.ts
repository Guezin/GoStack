import multer from 'multer'
import crypto from 'crypto'
import { resolve } from 'path'

const directory = resolve(__dirname, '..', '..', 'tmp')

export default {
  directory,
  storage: multer.diskStorage({
    destination: directory,
    filename: (request, file, callback) => {
      const hash = crypto.randomBytes(10).toString('HEX')
      const fileHash = `${hash}-${file.originalname}`

      return callback(null, fileHash)
    }
  })
}
