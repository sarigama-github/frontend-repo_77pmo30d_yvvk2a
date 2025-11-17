import { useState } from 'react';

const BACKEND = import.meta.env.VITE_BACKEND_URL || '';

export default function VideoForm({ onCreated }) {
  const [form, setForm] = useState({
    full_name: '',
    target_role: '',
    duration_sec: 20,
    style: 'modern',
    tone: 'professional',
    colors: 'indigo, purple, orange',
    resume_text: '',
    plan: 'free',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: name === 'duration_sec' ? Number(value) : value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${BACKEND}/api/videos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error((await res.json()).detail || 'Failed to create video');
      const data = await res.json();
      onCreated?.(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="create" className="py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-slate-900">Describe your video</h2>
        <p className="text-slate-600 mt-1">We’ll tailor the visuals to your goal. Free plan is limited to 20s with watermark.</p>

        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700">Full name</label>
            <input name="full_name" value={form.full_name} onChange={handleChange} className="mt-1 w-full rounded-md border-slate-300 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Alex Doe" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Target role</label>
            <input name="target_role" required value={form.target_role} onChange={handleChange} className="mt-1 w-full rounded-md border-slate-300 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Product Manager" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Duration (sec)</label>
            <input type="number" min={5} max={120} name="duration_sec" value={form.duration_sec} onChange={handleChange} className="mt-1 w-full rounded-md border-slate-300 focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Style</label>
            <input name="style" value={form.style} onChange={handleChange} className="mt-1 w-full rounded-md border-slate-300 focus:ring-indigo-500 focus:border-indigo-500" placeholder="modern, minimal" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Tone</label>
            <input name="tone" value={form.tone} onChange={handleChange} className="mt-1 w-full rounded-md border-slate-300 focus:ring-indigo-500 focus:border-indigo-500" placeholder="professional" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700">Brand colors</label>
            <input name="colors" value={form.colors} onChange={handleChange} className="mt-1 w-full rounded-md border-slate-300 focus:ring-indigo-500 focus:border-indigo-500" placeholder="indigo, purple, orange" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700">Resume highlights</label>
            <textarea rows={4} name="resume_text" value={form.resume_text} onChange={handleChange} className="mt-1 w-full rounded-md border-slate-300 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Top achievements, skills, and metrics" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700">Plan</label>
            <select name="plan" value={form.plan} onChange={handleChange} className="mt-1 w-full rounded-md border-slate-300 focus:ring-indigo-500 focus:border-indigo-500">
              <option value="free">Free</option>
              <option value="premium">Premium</option>
              <option value="pro">Pro</option>
            </select>
          </div>

          {error && <div className="sm:col-span-2 text-red-600 text-sm">{error}</div>}

          <div className="sm:col-span-2">
            <button disabled={loading} className="w-full rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 transition disabled:opacity-50">
              {loading ? 'Generating…' : 'Generate video'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
