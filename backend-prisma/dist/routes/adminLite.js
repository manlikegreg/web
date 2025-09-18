import express from 'express';
import { prisma } from '../server.js';
import { basicAuth } from '../middleware/basicAuth.js';
const router = express.Router();
router.use(basicAuth);
router.get('/', async (req, res) => {
    res.type('html').send(`
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Admin Lite</title>
    <style>
      body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif; margin: 24px; }
      h1 { font-size: 20px; }
      input, textarea, select { padding: 8px; border: 1px solid #d1d5db; border-radius: 6px; width: 100%; }
      button { padding: 8px 12px; border-radius: 6px; border: 1px solid #d1d5db; background: #111827; color: white; }
      table { border-collapse: collapse; width: 100%; }
      th, td { text-align: left; border-bottom: 1px solid #e5e7eb; padding: 8px; }
      .card { border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin-bottom: 16px; }
    </style>
  </head>
  <body>
    <h1>Admin Lite</h1>
    <p>Students, Articles, Gallery</p>
    <ul>
      <li><a href="/admin-lite/students">Students</a></li>
      <li><a href="/admin-lite/articles">Articles</a></li>
      <li><a href="/admin-lite/gallery">Gallery</a></li>
    </ul>
  </body>
</html>`);
});
router.get('/students', async (req, res) => {
    const students = await prisma.student.findMany({ orderBy: { createdAt: 'desc' } });
    res.type('html').send(`
<!doctype html><html><head><meta charset="utf-8" /><title>Students</title></head>
<body>
  <a href="/admin-lite">← Back</a>
  <h2>Students</h2>
  <div class="card">
    <form method="post" action="/admin-lite/students">
      <div><label>Name<br/><input name="name" required /></label></div>
      <div><label>Role<br/><input name="role" required /></label></div>
      <div><label>Profile Pic URL<br/><input name="profilePic" /></label></div>
      <div><label>Bio<br/><textarea name="bio"></textarea></label></div>
      <div style="margin-top:8px"><button type="submit">Create</button></div>
    </form>
  </div>
  <table>
    <thead><tr><th>Name</th><th>Role</th><th>Actions</th></tr></thead>
    <tbody>
      ${students.map(s => `<tr><td>${s.name}</td><td>${s.role}</td><td>
        <form method="post" action="/admin-lite/students/${s.id}?_method=delete" style="display:inline">
          <button type="submit">Delete</button>
        </form>
      </td></tr>`).join('')}
    </tbody>
  </table>
</body></html>`);
});
router.post('/students', express.urlencoded({ extended: true }), async (req, res) => {
    const { name, role, profilePic, bio } = req.body;
    await prisma.student.create({ data: { name, role, profilePic: profilePic || null, bio: bio || null } });
    res.redirect('/admin-lite/students');
});
router.post('/students/:id', express.urlencoded({ extended: true }), async (req, res) => {
    const { id } = req.params;
    const method = (req.query._method || '').toString().toLowerCase();
    if (method === 'delete') {
        await prisma.student.delete({ where: { id } });
    }
    res.redirect('/admin-lite/students');
});
export default router;
//# sourceMappingURL=adminLite.js.map