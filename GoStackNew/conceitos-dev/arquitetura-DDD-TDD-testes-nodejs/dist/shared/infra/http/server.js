"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express_1 = __importStar(require("express"));
var cors_1 = __importDefault(require("cors"));
require("express-async-errors");
var routes_1 = __importDefault(require("./routes"));
var upload_1 = __importDefault(require("@config/upload"));
var error_1 = __importDefault(require("@modules/users/infra/http/middlewares/error"));
require("../typeorm/database");
require("@shared/container");
var server = express_1.default();
server.use(cors_1.default());
server.use(express_1.json());
server.use('/files', express_1.default.static(upload_1.default.uploadsFolder));
server.use(routes_1.default);
server.use(error_1.default);
server.listen(3333, function () { return console.log('Server started on port 3333.'); });
exports.default = server;
