import express from 'express';
import {
  getAllContactMessages,
  getContactMessageById,
  createContactMessage,
  updateContactMessage,
  deleteContactMessage,
  markAsRead,
} from '../controllers/contactController';

const router = express.Router();

// GET /api/contact - Get all contact messages
router.get('/', getAllContactMessages);

// GET /api/contact/:id - Get contact message by ID
router.get('/:id', getContactMessageById);

// POST /api/contact - Create new contact message
router.post('/', createContactMessage);

// PUT /api/contact/:id - Update contact message
router.put('/:id', updateContactMessage);

// PUT /api/contact/:id/read - Mark message as read
router.put('/:id/read', markAsRead);

// DELETE /api/contact/:id - Delete contact message
router.delete('/:id', deleteContactMessage);

export default router;
