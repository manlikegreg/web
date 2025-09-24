import { Request, Response, NextFunction } from 'express';

export function basicAuth(req: Request, res: Response, next: NextFunction): void {
  const expectedUser = process.env.ADMIN_LITE_USER || '';
  const expectedPass = process.env.ADMIN_LITE_PASS || '';

  if (!expectedUser || !expectedPass) {
    res.status(503).send('Admin Lite not configured. Set ADMIN_LITE_USER and ADMIN_LITE_PASS.');
    return;
  }

  const header = req.headers.authorization || '';
  if (!header.startsWith('Basic ')) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Admin Lite"');
    res.status(401).send('Authentication required');
    return;
  }

  const base64 = header.slice(6).trim();
  const [user, pass] = Buffer.from(base64, 'base64').toString('utf8').split(':');

  if (user === expectedUser && pass === expectedPass) {
    next();
    return;
  }

  res.setHeader('WWW-Authenticate', 'Basic realm="Admin Lite"');
  res.status(401).send('Invalid credentials');
}

