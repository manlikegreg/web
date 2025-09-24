'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, PhoneIcon, EnvelopeIcon, ChatBubbleLeftRightIcon, UserIcon } from '@heroicons/react/24/outline';

interface ProfileData {
  id: string;
  name: string;
  nickname?: string;
  role: string;
  subject?: string;
  gender?: 'male' | 'female';
  phone?: string;
  whatsapp?: string;
  email?: string;
  profilePic?: string;
  bio?: string;
  body?: string;
  contactInfo?: string;
  createdAt: string;
  updatedAt: string;
}

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData | null;
  type: 'student' | 'teacher';
}

export default function ProfileModal({ isOpen, onClose, profile, type }: ProfileModalProps) {
  if (!profile) return null;

  const contactInfo = profile.contactInfo ? JSON.parse(profile.contactInfo) : {};

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {profile.profilePic ? (
                      <img
                        src={profile.profilePic}
                        alt={profile.name}
                        className="w-16 h-16 rounded-full object-cover border-4 border-white/20"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                        <UserIcon className="w-8 h-8" />
                      </div>
                    )}
                    <div>
                      <h2 className="text-2xl font-bold">{profile.name}</h2>
                      {profile.nickname && (
                        <p className="text-blue-100 text-lg">"{profile.nickname}"</p>
                      )}
                      <p className="text-blue-200">{profile.role}</p>
                      {type === 'teacher' && profile.subject && (
                        <p className="text-blue-200 text-sm">{profile.subject}</p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column - Bio and Description */}
                  <div className="space-y-6">
                    {profile.bio && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
                        <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
                      </div>
                    )}

                    {profile.body && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Detailed Profile</h3>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{profile.body}</p>
                      </div>
                    )}
                  </div>

                  {/* Right Column - Contact Information */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                    
                    <div className="space-y-4">
                      {profile.phone && (
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <PhoneIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-600">Phone</p>
                            <a 
                              href={`tel:${profile.phone}`}
                              className="text-gray-900 hover:text-green-600 transition-colors"
                            >
                              {profile.phone}
                            </a>
                          </div>
                        </div>
                      )}

                      {profile.whatsapp && (
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <ChatBubbleLeftRightIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-600">WhatsApp</p>
                            <a 
                              href={`https://wa.me/${profile.whatsapp.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-900 hover:text-green-600 transition-colors"
                            >
                              {profile.whatsapp}
                            </a>
                          </div>
                        </div>
                      )}

                      {profile.email && (
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <EnvelopeIcon className="w-5 h-5 text-blue-600 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-600">Email</p>
                            <a 
                              href={`mailto:${profile.email}`}
                              className="text-gray-900 hover:text-blue-600 transition-colors"
                            >
                              {profile.email}
                            </a>
                          </div>
                        </div>
                      )}

                      {/* Additional Contact Info */}
                      {Object.keys(contactInfo).length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-gray-700">Additional Contact</h4>
                          {Object.entries(contactInfo).map(([key, value]) => (
                            <div key={key} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                              <div className="w-5 h-5 bg-gray-400 rounded-full flex-shrink-0"></div>
                              <div>
                                <p className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                                <p className="text-gray-900">{value as string}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Profile Stats */}
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-blue-900 mb-2">Profile Information</h4>
                      <div className="space-y-1 text-sm text-blue-700">
                        <p>Gender: {profile.gender || 'Not specified'}</p>
                        <p>Member since: {new Date(profile.createdAt).toLocaleDateString()}</p>
                        <p>Last updated: {new Date(profile.updatedAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-6 py-4 flex justify-end">
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}