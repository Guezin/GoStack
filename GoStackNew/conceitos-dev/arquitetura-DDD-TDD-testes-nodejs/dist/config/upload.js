"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
var crypto_1 = __importDefault(require("crypto"));
var path_1 = require("path");
var directory = path_1.resolve(__dirname, '..', '..', 'tmp');
exports.default = {
    directory: directory,
    uploadsFolder: path_1.resolve(directory, 'uploads'),
    storage: multer_1.default.diskStorage({
        destination: directory,
        filename: function (request, file, callback) {
            var hash = crypto_1.default.randomBytes(10).toString('HEX');
            var fileHash = hash + "-" + file.originalname;
            return callback(null, fileHash);
        },
    }),
};
