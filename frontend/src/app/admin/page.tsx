'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  getTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  getGalleryItems,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  getLeadershipMembers,
  createLeadershipMember,
  updateLeadershipMember,
  deleteLeadershipMember,
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
  const [activeTab, setActiveTab] = useState<'students' | 'teachers'>('students');
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [isBulkDeleteMode, setIsBulkDeleteMode] = useState(false);
  const [form, setForm] = useState({ 
    name: '', 
    nickname: '', 
    role: '', 
    subject: '', 
    gender: '', 
    phone: '', 
    whatsapp: '', 
    email: '', 
    profilePic: '', 
    bio: '' 
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function refresh() {
    setLoading(true);
    try {
      const endpoint = activeTab === 'students' ? '/api/students' : '/api/teachers';
      const res = await fetch(`https://web-xplc.onrender.com${endpoint}`, { cache: 'no-store' });
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

  useEffect(() => {
    refresh();
  }, [activeTab]);

  function startEdit(s: any) {
    setEditingId(s.id);
    setForm({ 
      name: s.name || '', 
      nickname: s.nickname || '', 
      role: s.role || '', 
      subject: s.subject || '', 
      gender: s.gender || '', 
      phone: s.phone || '', 
      whatsapp: s.whatsapp || '', 
      email: s.email || '', 
      profilePic: s.profilePic || '', 
      bio: s.bio || '' 
    });
    setIsModalOpen(true);
  }

  function startAdd() {
    setEditingId(null);
    setForm({ 
      name: '', 
      nickname: '', 
      role: '', 
      subject: '', 
      gender: '', 
      phone: '', 
      whatsapp: '', 
      email: '', 
      profilePic: '', 
      bio: '' 
    });
    setIsModalOpen(true);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { 
        name: form.name, 
        nickname: form.nickname || undefined, 
        role: form.role, 
        subject: form.subject || undefined,
        gender: form.gender || undefined, 
        phone: form.phone || undefined, 
        whatsapp: form.whatsapp || undefined, 
        email: form.email || undefined,
        profilePic: form.profilePic || undefined, 
        bio: form.bio || undefined 
      } as any;
      
      let r;
      if (activeTab === 'students') {
        r = editingId ? await updateStudent(editingId, payload) : await createStudent(payload);
      } else {
        r = editingId ? await updateTeacher(editingId, payload) : await createTeacher(payload);
      }
      
      if (r.success) {
        const itemType = activeTab === 'students' ? 'Student' : 'Teacher';
        toast.success(editingId ? `${itemType} updated successfully!` : `${itemType} created successfully!`);
        await refresh();
        setIsModalOpen(false);
        setEditingId(null);
        setForm({ 
          name: '', 
          nickname: '', 
          role: '', 
          subject: '', 
          gender: '', 
          phone: '', 
          whatsapp: '', 
          email: '', 
          profilePic: '', 
          bio: '' 
        });
      } else {
        const itemType = activeTab === 'students' ? 'student' : 'teacher';
        toast.error(r.error || `Failed to save ${itemType}`);
      }
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(id: string) {
    const itemType = activeTab === 'students' ? 'student' : 'teacher';
    if (!confirm(`Delete this ${itemType}?`)) return;
    
    const r = activeTab === 'students' ? await deleteStudent(id) : await deleteTeacher(id);
    if (r.success) {
      toast.success(`${itemType.charAt(0).toUpperCase() + itemType.slice(1)} deleted successfully!`);
      await refresh();
    } else {
      toast.error(r.error || `Failed to delete ${itemType}`);
    }
  }

  // Bulk delete functions
  function toggleItemSelection(id: string) {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  }

  function selectAllItems() {
    const allIds = new Set(items.map(item => item.id));
    setSelectedItems(allIds);
  }

  function clearSelection() {
    setSelectedItems(new Set());
  }

  async function bulkDelete() {
    if (selectedItems.size === 0) return;
    
    const itemType = activeTab === 'students' ? 'student' : 'teacher';
    if (!confirm(`Delete ${selectedItems.size} ${itemType}${selectedItems.size > 1 ? 's' : ''}?`)) return;
    
    setSaving(true);
    try {
      const deletePromises = Array.from(selectedItems).map(id => 
        activeTab === 'students' ? deleteStudent(id) : deleteTeacher(id)
      );
      
      const results = await Promise.all(deletePromises);
      const successCount = results.filter(r => r.success).length;
      const failCount = results.length - successCount;
      
      if (successCount > 0) {
        toast.success(`${successCount} ${itemType}${successCount > 1 ? 's' : ''} deleted successfully!`);
        await refresh();
        clearSelection();
        setIsBulkDeleteMode(false);
      }
      
      if (failCount > 0) {
        toast.error(`Failed to delete ${failCount} ${itemType}${failCount > 1 ? 's' : ''}`);
      }
    } catch (error) {
      toast.error('Bulk delete failed');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {activeTab === 'students' ? 'Students/Teachers' : 'Teachers'}
                </h2>
                <p className="text-gray-600">
                  Manage {activeTab === 'students' ? 'students and teachers' : 'teachers'} shown across the site
                </p>
              </div>
          <div className="flex items-center space-x-4">
            {/* Toggle Buttons */}
            <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setActiveTab('students')}
                    className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                      activeTab === 'students'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Students/Teachers
                  </button>
              <button
                onClick={() => setActiveTab('teachers')}
                className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  activeTab === 'teachers'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Teachers
              </button>
            </div>
            
            {/* Bulk Actions */}
            {!isBulkDeleteMode ? (
              <>
                <button
                  onClick={() => setIsBulkDeleteMode(true)}
                  className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors"
                >
                  Bulk Delete
                </button>
                <button
                  onClick={startAdd}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Add {activeTab === 'students' ? 'Student' : 'Teacher'}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={selectAllItems}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                >
                  Select All
                </button>
                <button
                  onClick={clearSelection}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                >
                  Clear ({selectedItems.size})
                </button>
                <button
                  onClick={bulkDelete}
                  disabled={selectedItems.size === 0 || saving}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? 'Deleting...' : `Delete Selected (${selectedItems.size})`}
                </button>
                <button
                  onClick={() => {
                    setIsBulkDeleteMode(false);
                    clearSelection();
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading {activeTab}...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-8">
            <UserGroupIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No {activeTab}</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by adding a new {activeTab === 'students' ? 'student' : 'teacher'}.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((student) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-gray-50 rounded-lg p-4 border hover:shadow-md transition-shadow ${
                  selectedItems.has(student.id) ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                }`}
              >
                <div className="flex items-center space-x-3 mb-3">
                  {/* Selection Checkbox */}
                  {isBulkDeleteMode && (
                    <input
                      type="checkbox"
                      checked={selectedItems.has(student.id)}
                      onChange={() => toggleItemSelection(student.id)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                  )}
                  
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
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{student.name}</h3>
                    {student.nickname && (
                      <p className="text-xs text-gray-500">"{student.nickname}"</p>
                    )}
                    <p className="text-sm text-gray-600">{student.role}</p>
                    {activeTab === 'teachers' && student.subject && (
                      <p className="text-xs text-gray-500">{student.subject}</p>
                    )}
                  </div>
                </div>
                
                {/* Contact Information */}
                <div className="space-y-1 mb-3">
                  {student.phone && (
                    <div className="flex items-center text-xs text-gray-600">
                      <svg className="w-3 h-3 mr-1 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>{student.phone}</span>
                    </div>
                  )}
                  
                  {student.whatsapp && (
                    <div className="flex items-center text-xs text-gray-600">
                      <svg className="w-3 h-3 mr-1 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                      <span>WhatsApp</span>
                    </div>
                  )}

                  {activeTab === 'teachers' && student.email && (
                    <div className="flex items-center text-xs text-gray-600">
                      <svg className="w-3 h-3 mr-1 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>{student.email}</span>
                    </div>
                  )}
                </div>
                
                {student.bio && (
                  <p className="text-sm text-gray-700 mb-3 line-clamp-2">{student.bio}</p>
                )}
                {!isBulkDeleteMode && (
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
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? `Edit ${activeTab === 'students' ? 'Student' : 'Teacher'}` : `Add ${activeTab === 'students' ? 'Student' : 'Teacher'}`}
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Nickname</label>
              <input
                type="text"
                value={form.nickname}
                onChange={(e) => setForm({ ...form, nickname: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Optional nickname"
              />
            </div>
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

          {activeTab === 'teachers' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <input
                type="text"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Mathematics, Physics, Chemistry"
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={form.gender === 'male'}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                  className="mr-2 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Male</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={form.gender === 'female'}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                  className="mr-2 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Female</span>
              </label>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="+233 XX XXX XXXX"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp</label>
              <input
                type="tel"
                value={form.whatsapp}
                onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="+233 XX XXX XXXX"
              />
            </div>
          </div>

          {activeTab === 'teachers' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="teacher@stjohns.edu.gh"
              />
            </div>
          )}
          
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
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [isBulkDeleteMode, setIsBulkDeleteMode] = useState(false);
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

  // Bulk delete functions
  function toggleItemSelection(id: string) {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  }

  function selectAllItems() {
    const allIds = new Set(paginatedItems.map(item => item.id));
    setSelectedItems(allIds);
  }

  function clearSelection() {
    setSelectedItems(new Set());
  }

  async function bulkDelete() {
    if (selectedItems.size === 0) return;
    
    if (!confirm(`Delete ${selectedItems.size} article${selectedItems.size > 1 ? 's' : ''}?`)) return;
    
    setSaving(true);
    try {
      const deletePromises = Array.from(selectedItems).map(id => deleteArticle(id));
      
      const results = await Promise.all(deletePromises);
      const successCount = results.filter(r => r.success).length;
      const failCount = results.length - successCount;
      
      if (successCount > 0) {
        toast.success(`${successCount} article${successCount > 1 ? 's' : ''} deleted successfully!`);
        await refresh();
        clearSelection();
        setIsBulkDeleteMode(false);
      }
      
      if (failCount > 0) {
        toast.error(`Failed to delete ${failCount} article${failCount > 1 ? 's' : ''}`);
      }
    } catch (error) {
      toast.error('Bulk delete failed');
    } finally {
      setSaving(false);
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
          
          {/* Bulk Actions */}
          {!isBulkDeleteMode ? (
            <>
              <button
                onClick={() => setIsBulkDeleteMode(true)}
                className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors"
              >
                Bulk Delete
              </button>
              <button
                onClick={startAdd}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Add Article
              </button>
            </>
          ) : (
            <>
              <button
                onClick={selectAllItems}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Select All
              </button>
              <button
                onClick={clearSelection}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Clear ({selectedItems.size})
              </button>
              <button
                onClick={bulkDelete}
                disabled={selectedItems.size === 0 || saving}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Deleting...' : `Delete Selected (${selectedItems.size})`}
              </button>
              <button
                onClick={() => {
                  setIsBulkDeleteMode(false);
                  clearSelection();
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors"
              >
                Cancel
              </button>
            </>
          )}
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
                  className={`bg-gray-50 rounded-lg p-4 border hover:shadow-md transition-shadow ${
                    selectedItems.has(article.id) ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    {/* Selection Checkbox */}
                    {isBulkDeleteMode && (
                      <input
                        type="checkbox"
                        checked={selectedItems.has(article.id)}
                        onChange={() => toggleItemSelection(article.id)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-1"
                      />
                    )}
                    
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
                    {!isBulkDeleteMode && (
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
                    )}
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
  const [items, setItems] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', position: '', profilePic: '', bio: '', order: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function refresh() {
    setLoading(true);
    try {
      const res = await getLeadershipMembers();
      if (res.success && res.data) {
        setItems(res.data);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  function startEdit(member: any) {
    setEditingId(member.id);
    setForm({ 
      name: member.name || '', 
      position: member.position || '', 
      profilePic: member.profilePic || '', 
      bio: member.bio || '',
      order: member.order || 0
    });
    setIsModalOpen(true);
  }

  function startAdd() {
    setEditingId(null);
    setForm({ name: '', position: '', profilePic: '', bio: '', order: 0 });
    setIsModalOpen(true);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { 
        name: form.name, 
        position: form.position, 
        profilePic: form.profilePic || undefined, 
        bio: form.bio || undefined,
        order: form.order
      };
      const r = editingId ? await updateLeadershipMember(editingId, payload) : await createLeadershipMember(payload);
      if (r.success) {
        toast.success(editingId ? 'Leadership member updated successfully!' : 'Leadership member created successfully!');
        await refresh();
        setIsModalOpen(false);
        setEditingId(null);
        setForm({ name: '', position: '', profilePic: '', bio: '', order: 0 });
      } else {
        toast.error(r.error || 'Failed to save leadership member');
      }
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(id: string) {
    if (!confirm('Delete this leadership member?')) return;
    const r = await deleteLeadershipMember(id);
    if (r.success) {
      toast.success('Leadership member deleted successfully!');
      await refresh();
    } else {
      toast.error('Failed to delete leadership member');
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Leadership Team</h2>
            <p className="text-gray-600">Manage the class leadership team members</p>
          </div>
          <button
            onClick={startAdd}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Add Member
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading leadership team...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-8">
            <UserGroupIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No leadership members</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by adding a new leadership member.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 rounded-lg p-4 border hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-3 mb-3">
                  {member.profilePic ? (
                    <img
                      src={member.profilePic}
                      alt={member.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                      <UserGroupIcon className="h-6 w-6 text-gray-600" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.position}</p>
                  </div>
                </div>
                {member.bio && (
                  <p className="text-sm text-gray-700 mb-3 line-clamp-2">{member.bio}</p>
                )}
                <div className="flex space-x-2">
                  <button
                    onClick={() => startEdit(member)}
                    className="flex-1 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(member.id)}
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
        title={editingId ? 'Edit Leadership Member' : 'Add Leadership Member'}
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
              <input
                type="text"
                value={form.position}
                onChange={(e) => setForm({ ...form, position: e.target.value })}
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
              placeholder="Tell us about this leadership member..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Order (for display sequence)</label>
            <input
              type="number"
              value={form.order}
              onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="0"
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
              {saving ? 'Saving...' : editingId ? 'Update Member' : 'Add Member'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}