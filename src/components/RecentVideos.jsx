import { useEffect, useState } from 'react';

const BACKEND = import.meta.env.VITE_BACKEND_URL || '';

export default function RecentVideos() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${BACKEND}/api/videos`)
      .then((r) => r.json())
      .then((d) => setItems(d.items || []))
      .catch(() => {});
  }, []);

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-slate-900">Recent videos</h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it, idx) => (
            <article key={idx} className="bg-white rounded-xl shadow overflow-hidden">
              <div className="aspect-video bg-slate-100">
                <video src={it.video_url} controls className="w-full h-full object-cover"></video>
              </div>
              <div className="p-4 text-sm">
                <p className="text-slate-700">Plan: <span className="font-medium">{it.plan}</span></p>
                {it.qr_available && (
                  <img alt="QR" className="mt-2 h-28 w-28" src={`${BACKEND}/api/qr?url=${encodeURIComponent(it.video_url || '')}`} />
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
