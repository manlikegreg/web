"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildAdmin = buildAdmin;
const adminjs_1 = __importDefault(require("adminjs"));
const prisma_1 = require("@adminjs/prisma");
adminjs_1.default.registerAdapter({ Database: prisma_1.Database, Resource: prisma_1.Resource });
function buildAdmin(prisma) {
    const admin = new adminjs_1.default({
        rootPath: '/admin',
        databases: [prisma],
        branding: {
            companyName: "Science 1B Admin",
            withMadeWithLove: false,
        },
    });
    return admin;
}
//# sourceMappingURL=admin.js.map