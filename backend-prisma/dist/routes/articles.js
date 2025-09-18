"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const articleController_1 = require("../controllers/articleController");
const validation_1 = require("../middleware/validation");
const router = express_1.default.Router();
router.get('/', articleController_1.getAllArticles);
router.get('/:id', articleController_1.getArticleById);
router.post('/', validation_1.validateArticle, validation_1.handleValidationErrors, articleController_1.createArticle);
router.put('/:id', validation_1.validateArticle, validation_1.handleValidationErrors, articleController_1.updateArticle);
router.delete('/:id', articleController_1.deleteArticle);
exports.default = router;
//# sourceMappingURL=articles.js.map