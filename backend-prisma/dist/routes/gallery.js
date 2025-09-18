"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const galleryController_1 = require("../controllers/galleryController");
const validation_1 = require("../middleware/validation");
const router = express_1.default.Router();
router.get('/', galleryController_1.getAllGalleryItems);
router.get('/:id', galleryController_1.getGalleryItemById);
router.post('/', validation_1.validateGallery, validation_1.handleValidationErrors, galleryController_1.createGalleryItem);
router.put('/:id', validation_1.validateGallery, validation_1.handleValidationErrors, galleryController_1.updateGalleryItem);
router.delete('/:id', galleryController_1.deleteGalleryItem);
exports.default = router;
//# sourceMappingURL=gallery.js.map