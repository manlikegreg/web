'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { getStudent, getTeacher } from '@/lib/api';
import { resolveMediaUrl } from '@/lib/media';

type ProfileType = 'student' | 'teacher';

export default function ProfileModalClient({ id, type }: { id: string; type: ProfileType }) {
  const router = useRouter();
  const search = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);

  // fall back to query param if provided
  const resolvedType: ProfileType = (search.get('type') as ProfileType) || type || 'student';

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = resolvedType === 'teacher' ? await getTeacher(id) : await getStudent(id);
        if (!res.success || !res.data) {
          setError('Profile not found');
        } else {
          setProfile(res.data);
        }
      } catch (e) {
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    })();
  }, [id, resolvedType]);

  const onClose = () => {
    router.push('/students');
  };

  const aka = (nickname?: string) => {
    if (!nickname) return '';
    return nickname.toLowerCase().startsWith('aka') ? nickname : `AKA ${nickname}`;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50">
        <motion.div
          className="absolute inset-0 bg-black/40 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        <motion.div
          className="absolute inset-0 flex items-center justify-center p-4"
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.25 }}
        >
          <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white hover:bg-black/80"
              aria-label="Close"
            >
              ×
            </button>

            {loading ? (
              <div className="p-10 text-center">Loading…</div>
            ) : error ? (
              <div className="p-10 text-center text-red-600">{error}</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                <div className="md:col-span-1 bg-gradient-to-b from-blue-50 to-blue-100 p-6 flex items-center justify-center">
                  <div className="w-40 h-40 rounded-full overflow-hidden shadow-lg border-4 border-white">
                    {profile?.profilePic ? (
                      <img src={resolveMediaUrl(profile.profilePic)} alt={profile.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-blue-200" />
                    )}
                  </div>
                </div>
                <div className="md:col-span-2 p-6 md:p-8">
                  <div className="mb-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{profile?.name}</h2>
                    {profile?.nickname ? (
                      <p className="text-sm text-gray-500 mt-1">{aka(profile.nickname)}</p>
                    ) : null}
                    <p className="text-blue-600 font-medium mt-2">{profile?.role}</p>
                  </div>

                  {profile?.bio ? (
                    <p className="text-gray-700 mb-4">{profile.bio}</p>
                  ) : null}

                  {(profile?.email || profile?.phone || profile?.whatsapp || profile?.contactInfo) ? (
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">Contact</h3>
                      <div className="space-y-1 text-sm text-gray-700">
                        {profile?.email ? (
                          <div>
                            Email: <a className="text-blue-600 hover:underline" href={`mailto:${profile.email}`}>{profile.email}</a>
                          </div>
                        ) : null}
                        {profile?.phone ? (
                          <div>
                            Phone: <a className="text-blue-600 hover:underline" href={`tel:${profile.phone}`}>{profile.phone}</a>
                          </div>
                        ) : null}
                        {profile?.whatsapp ? (
                          <div>
                            WhatsApp: <a className="text-blue-600 hover:underline" href={`https://wa.me/${String(profile.whatsapp).replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer">Chat</a>
                          </div>
                        ) : null}
                        {profile?.contactInfo ? (
                          <div className="break-words">{profile.contactInfo}</div>
                        ) : null}
                      </div>
                    </div>
                  ) : null}

                  {profile?.body ? (
                    <div className="prose max-w-none">
                      <h3 className="text-lg font-semibold mb-2">About</h3>
                      <p className="text-gray-700 whitespace-pre-wrap">{profile.body}</p>
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

