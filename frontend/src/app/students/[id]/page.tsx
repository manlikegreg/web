import ProfileModalClient from './ProfileModalClient';

export async function generateStaticParams() {
  try {
    const base = 'https://web-xplc.onrender.com/api';
    const [sRes, tRes] = await Promise.all([
      fetch(`${base}/students`, { next: { revalidate: 300 } }),
      fetch(`${base}/teachers`, { next: { revalidate: 300 } }),
    ]);
    const sJson = sRes.ok ? await sRes.json() : { data: [] };
    const tJson = tRes.ok ? await tRes.json() : { data: [] };
    const students = (sJson?.data || []).map((s: any) => ({ id: s.id }));
    const teachers = (tJson?.data || []).map((t: any) => ({ id: t.id }));
    return [...students, ...teachers];
  } catch {
    return [] as { id: string }[];
  }
}

export default function Page({ params }: { params: { id: string } }) {
  return <ProfileModalClient id={params.id} type={'student'} />;
}

