'use client';

import { useState } from 'react';
import { uploadFile } from '@/lib/api';

export default function UploadButton({ onComplete }: { onComplete: (url: string) => void }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError('');
    const res = await uploadFile(file);
    setBusy(false);
    if (res.success && res.data?.url) {
      onComplete(res.data.url);
    } else {
      setError(res.error || 'Upload failed');
    }
  }

  return (
    <div className="flex items-center gap-3">
      <label className="btn-secondary cursor-pointer">
        <input type="file" className="hidden" onChange={onPick} disabled={busy} />
        {busy ? 'Uploading…' : 'Upload'}
      </label>
      {error ? <span className="text-sm text-red-600">{error}</span> : null}
    </div>
  );
}

