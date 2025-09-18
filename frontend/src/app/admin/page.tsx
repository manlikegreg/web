'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  getGalleryItems,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  checkApiHealth,
  getApiUrl,
} from '@/lib/api';

type TabKey = 'students' | 'articles' | 'gallery';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'students', label: 'Students' },
  { key: 'articles', label: 'Articles' },
  { key: 'gallery', label: 'Gallery' },
];

function HealthBanner() {
  const [ok, setOk] = useState<boolean | null>(null);
  useEffect(() => {
    let mounted = true;
    checkApiHealth().then((r) => { if (mounted) setOk(!!r); }).catch(() => setOk(false));
    return () => { mounted = false; };
  }, []);
  const apiUrl = getApiUrl();
  return (
    <div className={`mb-4 rounded-md border px-3 py-2 text-sm ${ok === false ? 'border-red-300 bg-red-50 text-red-700' : ok === true ? 'border-green-300 bg-green-50 text-green-700' : 'border-yellow-300 bg-yellow-50 text-yellow-700'}`}>
      <div className="flex items-center justify-between gap-2">
        <span>Backend: {apiUrl}</span>
        <span>Status: {ok === null ? 'Checking…' : ok ? 'Online' : 'Offline'}</span>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [active, setActive] = useState<TabKey>('students');

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <HealthBanner />
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 w-full">
            <nav className="card p-4 space-y-2">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActive(t.key)}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    active === t.key
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-secondary-700 hover:bg-secondary-100'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </nav>
          </aside>

          <main className="flex-1">
            <AnimatePresence mode="wait">
              {active === 'students' && (
                <motion.div key="students" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                  <StudentsAdmin />
                </motion.div>
              )}
              {active === 'articles' && (
                <motion.div key="articles" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                  <ArticlesAdmin />
                </motion.div>
              )}
              {active === 'gallery' && (
                <motion.div key="gallery" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                  <GalleryAdmin />
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-secondary-900">{title}</h2>
      {subtitle ? <p className="text-secondary-600 mt-1">{subtitle}</p> : null}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block mb-3">
      <div className="text-sm text-secondary-700 mb-1">{label}</div>
      {children}
    </label>
  );
}

function ActionBar({ onReset, saving }: { onReset: () => void; saving: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <button type="submit" className="btn-primary" disabled={saving}>
        {saving ? 'Saving…' : 'Save'}
      </button>
      <button type="button" className="btn-secondary" onClick={onReset}>
        Reset
      </button>
    </div>
  );
}

function StudentsAdmin() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', role: '', profilePic: '', bio: '' });

  async function refresh() {
    setLoading(true);
    try {
      const r = await getStudents();
      if (r.success) setItems(r.data || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  function startEdit(s: any) {
    setEditingId(s.id);
    setForm({ name: s.name || '', role: s.role || '', profilePic: s.profilePic || '', bio: s.bio || '' });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = { name: form.name, role: form.role, profilePic: form.profilePic || undefined, bio: form.bio || undefined } as any;
    const r = editingId ? await updateStudent(editingId, payload) : await createStudent(payload);
    setSaving(false);
    if (r.success) {
      await refresh();
      setEditingId(null);
      setForm({ name: '', role: '', profilePic: '', bio: '' });
    } else {
      alert(r.error || 'Failed');
    }
  }

  async function onDelete(id: string) {
    if (!confirm('Delete this student?')) return;
    const r = await deleteStudent(id);
    if (r.success) refresh();
  }

  return (
    <div className="space-y-6">
      <SectionHeader title="Students" subtitle="Manage students shown across the site" />
      <form onSubmit={onSubmit} className="card p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Name"><input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></Field>
        <Field label="Role"><input className="input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required /></Field>
        <Field label="Profile Image URL"><input className="input" value={form.profilePic} onChange={(e) => setForm({ ...form, profilePic: e.target.value })} /></Field>
        <Field label="Bio"><textarea className="textarea" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} /></Field>
        <div className="md:col-span-2 flex items-center gap-4">
          {form.profilePic ? <img src={form.profilePic} alt="preview" className="w-16 h-16 rounded object-cover border" /> : null}
          <ActionBar onReset={() => { setEditingId(null); setForm({ name: '', role: '', profilePic: '', bio: '' }); }} saving={saving} />
        </div>
      </form>

      <div className="card p-0 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-secondary-50 text-secondary-700">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="px-4 py-3" colSpan={3}>Loading…</td></tr>
            ) : items.length === 0 ? (
              <tr><td className="px-4 py-3" colSpan={3}>No students yet</td></tr>
            ) : items.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="px-4 py-2">{s.name}</td>
                <td className="px-4 py-2">{s.role}</td>
                <td className="px-4 py-2 text-right space-x-2">
                  <button className="btn-secondary" onClick={() => startEdit(s)}>Edit</button>
                  <button className="btn-danger" onClick={() => onDelete(s.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ArticlesAdmin() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: '', content: '', authorId: '', imageUrl: '' });

  async function refresh() {
    setLoading(true);
    try {
      const [a, s] = await Promise.all([getArticles(1, 50), getStudents()]);
      if (a.success) setItems(a.data || []);
      if (s.success) setStudents(s.data || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { refresh(); }, []);

  function startEdit(a: any) {
    setEditingId(a.id);
    setForm({ title: a.title || '', content: a.content || '', authorId: a.authorId || a.author?.id || '', imageUrl: a.coverImageUrl || '' });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload: any = { title: form.title, content: form.content, authorId: form.authorId };
    const r = editingId ? await updateArticle(editingId, payload) : await createArticle(payload);
    setSaving(false);
    if (r.success) {
      await refresh();
      setEditingId(null);
      setForm({ title: '', content: '', authorId: '', imageUrl: '' });
    } else {
      alert(r.error || 'Failed');
    }
  }

  async function onDelete(id: string) {
    if (!confirm('Delete this article?')) return;
    const r = await deleteArticle(id);
    if (r.success) refresh();
  }

  return (
    <div className="space-y-6">
      <SectionHeader title="Articles" subtitle="Manage articles; use public image URLs inside content if needed" />
      <form onSubmit={onSubmit} className="card p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Title"><input className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></Field>
        <Field label="Author">
          <select className="input" value={form.authorId} onChange={(e) => setForm({ ...form, authorId: e.target.value })} required>
            <option value="">Select author…</option>
            {students.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </Field>
        <Field label="Content (Markdown or plain text)"><textarea className="textarea min-h-[160px]" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required /></Field>
        <div className="md:col-span-2"><ActionBar onReset={() => { setEditingId(null); setForm({ title: '', content: '', authorId: '', imageUrl: '' }); }} saving={saving} /></div>
      </form>

      <div className="card p-0 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-secondary-50 text-secondary-700">
            <tr>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Author</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="px-4 py-3" colSpan={3}>Loading…</td></tr>
            ) : items.length === 0 ? (
              <tr><td className="px-4 py-3" colSpan={3}>No articles yet</td></tr>
            ) : items.map((a) => (
              <tr key={a.id} className="border-t">
                <td className="px-4 py-2">{a.title}</td>
                <td className="px-4 py-2">{a.author?.name || '—'}</td>
                <td className="px-4 py-2 text-right space-x-2">
                  <button className="btn-secondary" onClick={() => startEdit(a)}>Edit</button>
                  <button className="btn-danger" onClick={() => onDelete(a.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function GalleryAdmin() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ imageUrl: '', caption: '', category: '' });

  async function refresh() {
    setLoading(true);
    try {
      const r = await getGalleryItems(1, 100);
      if (r.success) setItems(r.data || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { refresh(); }, []);

  function startEdit(g: any) {
    setEditingId(g.id);
    setForm({ imageUrl: g.imageUrl || '', caption: g.caption || '', category: (g as any).category || '' });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload: any = { imageUrl: form.imageUrl, caption: form.caption || undefined };
    const r = editingId ? await updateGalleryItem(editingId, payload) : await createGalleryItem(payload);
    setSaving(false);
    if (r.success) {
      await refresh();
      setEditingId(null);
      setForm({ imageUrl: '', caption: '', category: '' });
    } else {
      alert(r.error || 'Failed');
    }
  }

  async function onDelete(id: string) {
    if (!confirm('Delete this item?')) return;
    const r = await deleteGalleryItem(id);
    if (r.success) refresh();
  }

  return (
    <div className="space-y-6">
      <SectionHeader title="Gallery" subtitle="Paste public image/video URLs; backend stores only the URL" />
      <form onSubmit={onSubmit} className="card p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Image/Video URL"><input className="input" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} required /></Field>
        <Field label="Caption"><input className="input" value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })} /></Field>
        <div className="md:col-span-2 flex items-center gap-4">
          {form.imageUrl ? <img src={form.imageUrl} alt="preview" className="w-24 h-16 object-cover border rounded" /> : null}
          <ActionBar onReset={() => { setEditingId(null); setForm({ imageUrl: '', caption: '', category: '' }); }} saving={saving} />
        </div>
      </form>

      <div className="card p-0 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-secondary-50 text-secondary-700">
            <tr>
              <th className="px-4 py-2 text-left">Preview</th>
              <th className="px-4 py-2 text-left">Caption</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="px-4 py-3" colSpan={3}>Loading…</td></tr>
            ) : items.length === 0 ? (
              <tr><td className="px-4 py-3" colSpan={3}>No items yet</td></tr>
            ) : items.map((g) => (
              <tr key={g.id} className="border-t">
                <td className="px-4 py-2">
                  <img src={g.imageUrl} alt={g.caption || ''} className="w-24 h-16 object-cover rounded border" />
                </td>
                <td className="px-4 py-2">{g.caption || '—'}</td>
                <td className="px-4 py-2 text-right space-x-2">
                  <button className="btn-secondary" onClick={() => startEdit(g)}>Edit</button>
                  <button className="btn-danger" onClick={() => onDelete(g.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}