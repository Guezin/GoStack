import File from '../models/File'

class FileController {
    static async store(req, res) {
        const { originalname: name, filename } = req.file

        const files = await File.create({
            name,
            filename
        })

        return res.json(files)
    }
}

export default FileController