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
import UploadButton from '@/components/UploadButton';
import { Modal } from '@/components/Modal';
import { ToastContainer, useToast } from '@/components/Toast';
import { RichTextEditor } from '@/components/RichTextEditor';
import { DragDropGallery } from '@/components/DragDropGallery';
import { Pagination } from '@/components/Pagination';
import {
  HomeIcon,
  UserGroupIcon,
  DocumentTextIcon,
  PhotoIcon,
  InformationCircleIcon,
  ChatBubbleLeftRightIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

type TabKey = 'home' | 'about' | 'students' | 'articles' | 'gallery' | 'contact' | 'leadership';

const tabs: { key: TabKey; label: string; icon: any }[] = [
  { key: 'home', label: 'Home', icon: HomeIcon },
  { key: 'about', label: 'About', icon: InformationCircleIcon },
  { key: 'students', label: 'Students', icon: UserGroupIcon },
  { key: 'articles', label: 'Articles', icon: DocumentTextIcon },
  { key: 'gallery', label: 'Gallery', icon: PhotoIcon },
  { key: 'leadership', label: 'Leadership Team', icon: UserGroupIcon },
  { key: 'contact', label: 'Contact', icon: ChatBubbleLeftRightIcon },
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
  const [active, setActive] = useState<TabKey>('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toast = useToast();

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer toasts={toast.toasts} onRemove={toast.removeToast} />
      
      {/* Mobile header */}
      <div className="lg:hidden bg-white shadow-sm border-b">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold text-gray-900">Science 1B Admin</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            {sidebarOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between p-6 border-b">
            <h1 className="text-xl font-bold text-gray-900">Science 1B Admin</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
          
          <nav className="p-4 space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActive(tab.key);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    active === tab.key
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 lg:ml-0">
          <div className="p-6">
            <HealthBanner />
            
            <AnimatePresence mode="wait">
              {active === 'home' && (
                <motion.div key="home" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                  <HomeAdmin toast={toast} />
                </motion.div>
              )}
              {active === 'about' && (
                <motion.div key="about" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                  <AboutAdmin toast={toast} />
                </motion.div>
              )}
              {active === 'students' && (
                <motion.div key="students" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                  <StudentsAdmin toast={toast} />
                </motion.div>
              )}
              {active === 'articles' && (
                <motion.div key="articles" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                  <ArticlesAdmin toast={toast} />
                </motion.div>
              )}
              {active === 'gallery' && (
                <motion.div key="gallery" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                  <GalleryAdmin toast={toast} />
                </motion.div>
              )}
              {active === 'leadership' && (
                <motion.div key="leadership" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                  <LeadershipAdmin toast={toast} />
                </motion.div>
              )}
              {active === 'contact' && (
                <motion.div key="contact" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                  <ContactAdmin toast={toast} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
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

// Home Admin Component
function HomeAdmin({ toast }: { toast: any }) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    'home.title': '',
    'home.subtitle': '',
    'home.cta': '',
    'home.heroImage': '',
  });

  async function loadData() {
    setLoading(true);
    try {
      const res = await fetch('https://web-xplc.onrender.com/api/settings/home', { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        setForm(json?.data || {});
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadData(); }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('https://web-xplc.onrender.com/api/settings/home', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success('Home content updated successfully!');
        await loadData();
      } else {
        toast.error('Failed to update home content');
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Home Page Content</h2>
        <p className="text-gray-600 mb-6">Manage the hero section and main call-to-action content</p>
        
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hero Title</label>
              <input
                type="text"
                value={form['home.title']}
                onChange={(e) => setForm({ ...form, 'home.title': e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Welcome to Science 1B"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hero Subtitle</label>
              <input
                type="text"
                value={form['home.subtitle']}
                onChange={(e) => setForm({ ...form, 'home.subtitle': e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Exploring the wonders of science"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Call-to-Action Button Text</label>
            <input
              type="text"
              value={form['home.cta']}
              onChange={(e) => setForm({ ...form, 'home.cta': e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Learn More"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hero Background Image URL</label>
            <div className="flex gap-4">
              <input
                type="url"
                value={form['home.heroImage']}
                onChange={(e) => setForm({ ...form, 'home.heroImage': e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com/image.jpg"
              />
              <UploadButton onComplete={(url) => setForm({ ...form, 'home.heroImage': url })} />
            </div>
            {form['home.heroImage'] && (
              <div className="mt-2">
                <img src={form['home.heroImage']} alt="Hero preview" className="w-32 h-20 object-cover rounded border" />
              </div>
            )}
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// About Admin Component
function AboutAdmin({ toast }: { toast: any }) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    'about.history': '',
    'about.achievements': '',
    'about.motto': '',
    'about.image': '',
  });

  async function loadData() {
    setLoading(true);
    try {
      const res = await fetch('https://web-xplc.onrender.com/api/settings/about', { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        setForm(json?.data || {});
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadData(); }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('https://web-xplc.onrender.com/api/settings/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success('About content updated successfully!');
        await loadData();
      } else {
        toast.error('Failed to update about content');
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">About Page Content</h2>
        <p className="text-gray-600 mb-6">Manage the class history, achievements, and motto</p>
        
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Class History</label>
            <RichTextEditor
              value={form['about.history']}
              onChange={(value) => setForm({ ...form, 'about.history': value })}
              placeholder="Tell the story of Science 1B..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Achievements</label>
            <RichTextEditor
              value={form['about.achievements']}
              onChange={(value) => setForm({ ...form, 'about.achievements': value })}
              placeholder="List notable achievements and awards..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Class Motto</label>
            <input
              type="text"
              value={form['about.motto']}
              onChange={(e) => setForm({ ...form, 'about.motto': e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Our inspiring motto"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">About Section Image URL</label>
            <div className="flex gap-4">
              <input
                type="url"
                value={form['about.image']}
                onChange={(e) => setForm({ ...form, 'about.image': e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com/image.jpg"
              />
              <UploadButton onComplete={(url) => setForm({ ...form, 'about.image': url })} />
            </div>
            {form['about.image'] && (
              <div className="mt-2">
                <img src={form['about.image']} alt="About preview" className="w-32 h-20 object-cover rounded border" />
              </div>
            )}
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Contact Admin Component
function ContactAdmin({ toast }: { toast: any }) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    'contact.description': '',
    'contact.email': '',
    'contact.phone': '',
    'contact.socials': '',
  });

  async function loadData() {
    setLoading(true);
    try {
      const res = await fetch('https://web-xplc.onrender.com/api/settings/contact', { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        setForm(json?.data || {});
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadData(); }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('https://web-xplc.onrender.com/api/settings/contact', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success('Contact information updated successfully!');
        await loadData();
      } else {
        toast.error('Failed to update contact information');
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Contact Information</h2>
        <p className="text-gray-600 mb-6">Manage contact details and social media links</p>
        
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Description</label>
            <RichTextEditor
              value={form['contact.description']}
              onChange={(value) => setForm({ ...form, 'contact.description': value })}
              placeholder="Describe how people can get in touch..."
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={form['contact.email']}
                onChange={(e) => setForm({ ...form, 'contact.email': e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="contact@science1b.edu"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                value={form['contact.phone']}
                onChange={(e) => setForm({ ...form, 'contact.phone': e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Social Media Links (JSON format)</label>
            <textarea
              value={form['contact.socials']}
              onChange={(e) => setForm({ ...form, 'contact.socials': e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24"
              placeholder='{"facebook": "https://facebook.com/science1b", "twitter": "https://twitter.com/science1b"}'
            />
            <p className="text-sm text-gray-500 mt-1">Enter social media links as JSON object</p>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function StudentsAdmin({ toast }: { toast: any }) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', role: '', profilePic: '', bio: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function refresh() {
    setLoading(true);
    try {
      const res = await fetch('https://web-xplc.onrender.com/api/students', { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        setItems(json?.data || []);
      }
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
    setIsModalOpen(true);
  }

  function startAdd() {
    setEditingId(null);
    setForm({ name: '', role: '', profilePic: '', bio: '' });
    setIsModalOpen(true);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { name: form.name, role: form.role, profilePic: form.profilePic || undefined, bio: form.bio || undefined } as any;
      const r = editingId ? await updateStudent(editingId, payload) : await createStudent(payload);
      if (r.success) {
        toast.success(editingId ? 'Student updated successfully!' : 'Student created successfully!');
        await refresh();
        setIsModalOpen(false);
        setEditingId(null);
        setForm({ name: '', role: '', profilePic: '', bio: '' });
      } else {
        toast.error(r.error || 'Failed to save student');
      }
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(id: string) {
    if (!confirm('Delete this student?')) return;
    const r = await deleteStudent(id);
    if (r.success) {
      toast.success('Student deleted successfully!');
      await refresh();
    } else {
      toast.error('Failed to delete student');
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Students</h2>
            <p className="text-gray-600">Manage students shown across the site</p>
          </div>
          <button
            onClick={startAdd}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Add Student
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading students...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-8">
            <UserGroupIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No students</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by adding a new student.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((student) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 rounded-lg p-4 border hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-3 mb-3">
                  {student.profilePic ? (
                    <img
                      src={student.profilePic}
                      alt={student.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                      <UserGroupIcon className="h-6 w-6 text-gray-600" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium text-gray-900">{student.name}</h3>
                    <p className="text-sm text-gray-600">{student.role}</p>
                  </div>
                </div>
                {student.bio && (
                  <p className="text-sm text-gray-700 mb-3 line-clamp-2">{student.bio}</p>
                )}
                <div className="flex space-x-2">
                  <button
                    onClick={() => startEdit(student)}
                    className="flex-1 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(student.id)}
                    className="flex-1 px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Student' : 'Add Student'}
        size="md"
      >
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <input
                type="text"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
            <div className="flex gap-2">
              <input
                type="url"
                value={form.profilePic}
                onChange={(e) => setForm({ ...form, profilePic: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com/image.jpg"
              />
              <UploadButton onComplete={(url) => setForm({ ...form, profilePic: url })} />
            </div>
            {form.profilePic && (
              <div className="mt-2">
                <img src={form.profilePic} alt="Preview" className="w-16 h-16 rounded object-cover border" />
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
            <textarea
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24"
              placeholder="Tell us about this student..."
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? 'Saving...' : editingId ? 'Update Student' : 'Add Student'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

function ArticlesAdmin({ toast }: { toast: any }) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: '', content: '', authorId: '', coverImageUrl: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  async function refresh() {
    setLoading(true);
    try {
      const [aRes, sRes] = await Promise.all([
        fetch('https://web-xplc.onrender.com/api/articles?page=1&limit=50', { cache: 'no-store' }),
        fetch('https://web-xplc.onrender.com/api/students', { cache: 'no-store' }),
      ]);
      if (aRes.ok) {
        const a = await aRes.json();
        setItems(a?.data || []);
      }
      if (sRes.ok) {
        const s = await sRes.json();
        setStudents(s?.data || []);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { refresh(); }, []);

  function startEdit(a: any) {
    setEditingId(a.id);
    setForm({ title: a.title || '', content: a.content || '', authorId: a.authorId || a.author?.id || '', coverImageUrl: a.coverImageUrl || '' });
    setIsModalOpen(true);
  }

  function startAdd() {
    setEditingId(null);
    setForm({ title: '', content: '', authorId: '', coverImageUrl: '' });
    setIsModalOpen(true);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload: any = { 
        title: form.title, 
        content: form.content, 
        authorId: form.authorId,
        coverImageUrl: form.coverImageUrl || undefined
      };
      const r = editingId ? await updateArticle(editingId, payload) : await createArticle(payload);
      if (r.success) {
        toast.success(editingId ? 'Article updated successfully!' : 'Article created successfully!');
        await refresh();
        setIsModalOpen(false);
        setEditingId(null);
        setForm({ title: '', content: '', authorId: '', coverImageUrl: '' });
      } else {
        toast.error(r.error || 'Failed to save article');
      }
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(id: string) {
    if (!confirm('Delete this article?')) return;
    const r = await deleteArticle(id);
    if (r.success) {
      toast.success('Article deleted successfully!');
      await refresh();
    } else {
      toast.error('Failed to delete article');
    }
  }

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.author?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Articles</h2>
            <p className="text-gray-600">Manage blog articles and content</p>
          </div>
          <button
            onClick={startAdd}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Add Article
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading articles...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-8">
            <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No articles</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by adding a new article.</p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {paginatedItems.map((article) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-50 rounded-lg p-4 border hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    {article.coverImageUrl && (
                      <div className="flex-shrink-0">
                        <img
                          src={article.coverImageUrl}
                          alt={article.title}
                          className="w-20 h-20 object-cover rounded border"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 mb-1">{article.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">By {article.author?.name || 'Unknown'}</p>
                      <p className="text-sm text-gray-700 line-clamp-2">{article.content}</p>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => startEdit(article)}
                        className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(article.id)}
                        className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                itemsPerPage={itemsPerPage}
                totalItems={filteredItems.length}
              />
            )}
          </>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Article' : 'Add Article'}
        size="xl"
      >
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
              <select
                value={form.authorId}
                onChange={(e) => setForm({ ...form, authorId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select author...</option>
                {students.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image URL</label>
            <div className="flex gap-2 mb-4">
              <input
                type="url"
                value={form.coverImageUrl}
                onChange={(e) => setForm({ ...form, coverImageUrl: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com/cover-image.jpg"
              />
              <UploadButton onComplete={(url) => setForm({ ...form, coverImageUrl: url })} />
            </div>
            {form.coverImageUrl && (
              <div className="mb-4">
                <img src={form.coverImageUrl} alt="Cover preview" className="w-32 h-20 object-cover rounded border" />
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
            <RichTextEditor
              value={form.content}
              onChange={(value) => setForm({ ...form, content: value })}
              placeholder="Write your article content..."
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? 'Saving...' : editingId ? 'Update Article' : 'Add Article'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

function GalleryAdmin({ toast }: { toast: any }) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ imageUrl: '', caption: '', category: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  async function refresh() {
    setLoading(true);
    try {
      const res = await fetch('https://web-xplc.onrender.com/api/gallery?page=1&limit=100', { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        setItems(json?.data || []);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { refresh(); }, []);

  function startEdit(g: any) {
    setEditingId(g.id);
    setForm({ imageUrl: g.imageUrl || '', caption: g.caption || '', category: (g as any).category || '' });
    setIsModalOpen(true);
  }

  function startAdd() {
    setEditingId(null);
    setForm({ imageUrl: '', caption: '', category: '' });
    setIsModalOpen(true);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload: any = { imageUrl: form.imageUrl, caption: form.caption || undefined };
      const r = editingId ? await updateGalleryItem(editingId, payload) : await createGalleryItem(payload);
      if (r.success) {
        toast.success(editingId ? 'Gallery item updated successfully!' : 'Gallery item created successfully!');
        await refresh();
        setIsModalOpen(false);
        setEditingId(null);
        setForm({ imageUrl: '', caption: '', category: '' });
      } else {
        toast.error(r.error || 'Failed to save gallery item');
      }
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(id: string) {
    if (!confirm('Delete this item?')) return;
    const r = await deleteGalleryItem(id);
    if (r.success) {
      toast.success('Gallery item deleted successfully!');
      await refresh();
    } else {
      toast.error('Failed to delete gallery item');
    }
  }

  const filteredItems = items.filter(item =>
    item.caption?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.imageUrl?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleReorder = async (newItems: any[]) => {
    // Update local state immediately for better UX
    setItems(newItems);
    
    try {
      const res = await fetch('https://web-xplc.onrender.com/api/gallery/reorder', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: newItems }),
      });
      
      if (res.ok) {
        toast.success('Gallery order updated successfully!');
      } else {
        toast.error('Failed to update gallery order');
        // Revert local state on error
        await refresh();
      }
    } catch (error) {
      toast.error('Failed to update gallery order');
      // Revert local state on error
      await refresh();
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Gallery</h2>
            <p className="text-gray-600">Manage photos and videos for the gallery</p>
          </div>
          <button
            onClick={startAdd}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Add Item
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search gallery items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading gallery...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-8">
            <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No gallery items</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by adding a new item.</p>
          </div>
        ) : (
          <>
            <DragDropGallery
              items={paginatedItems}
              onReorder={handleReorder}
              onEdit={startEdit}
              onDelete={onDelete}
            />
            
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                itemsPerPage={itemsPerPage}
                totalItems={filteredItems.length}
              />
            )}
          </>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Gallery Item' : 'Add Gallery Item'}
        size="md"
      >
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image/Video URL</label>
            <div className="flex gap-2">
              <input
                type="url"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com/image.jpg"
                required
              />
              <UploadButton onComplete={(url) => setForm({ ...form, imageUrl: url })} />
            </div>
            {form.imageUrl && (
              <div className="mt-2">
                <img src={form.imageUrl} alt="Preview" className="w-32 h-20 object-cover rounded border" />
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Caption</label>
            <input
              type="text"
              value={form.caption}
              onChange={(e) => setForm({ ...form, caption: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe this image or video..."
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? 'Saving...' : editingId ? 'Update Item' : 'Add Item'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

// Leadership Team Admin Component
function LeadershipAdmin({ toast }: { toast: any }) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    'leadership.title': '',
    'leadership.description': '',
    'leadership.image': '',
    'leadership.team': '',
  });

  async function loadData() {
    setLoading(true);
    try {
      const res = await fetch('https://web-xplc.onrender.com/api/settings/leadership', { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        setForm(json?.data || {});
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadData(); }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('https://web-xplc.onrender.com/api/settings/leadership', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success('Leadership team content updated successfully!');
        await loadData();
      } else {
        toast.error('Failed to update leadership team content');
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Leadership Team</h2>
        <p className="text-gray-600 mb-6">Manage the leadership team section content</p>
        
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
            <input
              type="text"
              value={form['leadership.title']}
              onChange={(e) => setForm({ ...form, 'leadership.title': e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Our Leadership Team"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <RichTextEditor
              value={form['leadership.description']}
              onChange={(value) => setForm({ ...form, 'leadership.description': value })}
              placeholder="Describe the leadership team and their roles..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Team Image URL</label>
            <div className="flex gap-4">
              <input
                type="url"
                value={form['leadership.image']}
                onChange={(e) => setForm({ ...form, 'leadership.image': e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com/team-image.jpg"
              />
              <UploadButton onComplete={(url) => setForm({ ...form, 'leadership.image': url })} />
            </div>
            {form['leadership.image'] && (
              <div className="mt-2">
                <img src={form['leadership.image']} alt="Team preview" className="w-32 h-20 object-cover rounded border" />
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Team Members (JSON format)</label>
            <textarea
              value={form['leadership.team']}
              onChange={(e) => setForm({ ...form, 'leadership.team': e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
              placeholder='[{"name": "John Doe", "position": "Class President", "image": "https://example.com/john.jpg"}, {"name": "Jane Smith", "position": "Vice President", "image": "https://example.com/jane.jpg"}]'
            />
            <p className="text-sm text-gray-500 mt-1">Enter team members as JSON array with name, position, and image fields</p>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}