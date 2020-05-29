"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var AppointmentsController_1 = __importDefault(require("../controller/AppointmentsController"));
var appointmentsRouter = express_1.Router();
var appointmentsController = new AppointmentsController_1.default();
appointmentsRouter.get('/', appointmentsController.index);
appointmentsRouter.post('/', appointmentsController.create);
exports.default = appointmentsRouter;
