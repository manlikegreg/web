import { Request, Response } from 'express';
import { query } from '../utils/database';
import { ContactMessage, ApiResponse } from '../types';
import nodemailer from 'nodemailer';

// Email transporter configuration
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// Get all contact messages
export const getAllContactMessages = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = 'created_at',
      sortOrder = 'desc',
      is_read,
    } = req.query;

    const offset = (Number(page) - 1) * Number(limit);
    let whereClause = 'WHERE 1=1';
    const queryParams: any[] = [];
    let paramCount = 0;

    if (is_read !== undefined) {
      paramCount++;
      whereClause += ` AND is_read = $${paramCount}`;
      queryParams.push(is_read === 'true');
    }

    // Get total count
    const countQuery = `SELECT COUNT(*) FROM contact_messages ${whereClause}`;
    const countResult = await query(countQuery, queryParams);
    const total = parseInt(countResult.rows[0].count);

    // Get contact messages
    const messagesQuery = `
      SELECT * FROM contact_messages 
      ${whereClause}
      ORDER BY ${sortBy} ${sortOrder}
      LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}
    `;
    
    const queryParamsWithLimit = [...queryParams, Number(limit), offset];
    const result = await query(messagesQuery, queryParamsWithLimit);

    const totalPages = Math.ceil(total / Number(limit));

    const response: ApiResponse<ContactMessage[]> = {
      success: true,
      data: result.rows,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages,
      },
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch contact messages',
    });
  }
};

// Get contact message by ID
export const getContactMessageById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await query('SELECT * FROM contact_messages WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        error: 'Contact message not found',
      });
      return;
    }

    const response: ApiResponse<ContactMessage> = {
      success: true,
      data: result.rows[0],
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching contact message:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch contact message',
    });
  }
};

// Create new contact message
export const createContactMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      res.status(400).json({
        success: false,
        error: 'All fields are required',
      });
      return;
    }

    // Insert message into database
    const result = await query(
      `INSERT INTO contact_messages (name, email, subject, message, is_read)
       VALUES ($1, $2, $3, $4, false)
       RETURNING *`,
      [name, email, subject, message]
    );

    // Send email notification
    try {
      const transporter = createTransporter();
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: process.env.SMTP_USER, // Send to admin email
        subject: `New Contact Message: ${subject}`,
        html: `
          <h2>New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      });

      // Send confirmation email to user
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: 'Thank you for contacting Science 1B',
        html: `
          <h2>Thank you for your message!</h2>
          <p>Dear ${name},</p>
          <p>Thank you for contacting Science 1B - St. John's Grammar SHS, Achimota. We have received your message and will get back to you as soon as possible.</p>
          <p><strong>Your message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <p>Best regards,<br>Science 1B Team</p>
        `,
      });
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // Don't fail the request if email fails
    }

    const response: ApiResponse<ContactMessage> = {
      success: true,
      data: result.rows[0],
      message: 'Message sent successfully',
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Error creating contact message:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send message',
    });
  }
};

// Update contact message
export const updateContactMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, email, subject, message, is_read } = req.body;

    const result = await query(
      `UPDATE contact_messages 
       SET name = $1, email = $2, subject = $3, message = $4, is_read = $5
       WHERE id = $6
       RETURNING *`,
      [name, email, subject, message, is_read, id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        error: 'Contact message not found',
      });
      return;
    }

    const response: ApiResponse<ContactMessage> = {
      success: true,
      data: result.rows[0],
      message: 'Contact message updated successfully',
    };

    res.json(response);
  } catch (error) {
    console.error('Error updating contact message:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update contact message',
    });
  }
};

// Mark message as read
export const markAsRead = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await query(
      'UPDATE contact_messages SET is_read = true WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        error: 'Contact message not found',
      });
      return;
    }

    const response: ApiResponse<ContactMessage> = {
      success: true,
      data: result.rows[0],
      message: 'Message marked as read',
    };

    res.json(response);
  } catch (error) {
    console.error('Error marking message as read:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update message status',
    });
  }
};

// Delete contact message
export const deleteContactMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM contact_messages WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        error: 'Contact message not found',
      });
      return;
    }

    const response: ApiResponse<null> = {
      success: true,
      message: 'Contact message deleted successfully',
    };

    res.json(response);
  } catch (error) {
    console.error('Error deleting contact message:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete contact message',
    });
  }
};
