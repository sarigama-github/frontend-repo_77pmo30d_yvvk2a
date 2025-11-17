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
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState('');

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

  async function handleFileUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');
    setUploadMsg('');
    setUploading(true);
    try {
      // Basic validations
      const maxSize = 10 * 1024 * 1024; // 10MB
      const allowed = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        '.pdf', '.doc', '.docx'
      ];
      const ext = file.name.toLowerCase().slice(file.name.lastIndexOf('.'));
      if (file.size > maxSize) throw new Error('File is too large (max 10MB).');
      if (!allowed.includes(file.type) && !allowed.includes(ext)) {
        throw new Error('Unsupported file type. Please upload PDF or DOCX.');
      }

      // Send RAW bytes to match backend expectations (no multipart)
      const buf = await file.arrayBuffer();
      const res = await fetch(`${BACKEND}/api/upload-resume?filename=${encodeURIComponent(file.name)}`, {
        method: 'POST',
        headers: { 'Content-Type': file.type || 'application/octet-stream' },
        body: buf,
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.detail || 'Failed to read resume. Please try a PDF or DOCX.');
      }
      const data = await res.json();
      setForm((f) => ({ ...f, resume_text: data.text || '' }));
      setUploadMsg(`Imported ${file.name}${data.truncated ? ' (truncated)' : ''}`);
    } catch (err) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
      // reset input value so same file can be chosen again if needed
      e.target.value = '';
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
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-slate-700">Resume highlights</label>
              <span className="text-xs text-slate-500">Or upload PDF, DOC, DOCX</span>
            </div>
            <textarea rows={4} name="resume_text" value={form.resume_text} onChange={handleChange} className="mt-1 w-full rounded-md border-slate-300 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Top achievements, skills, and metrics" />
            <div className="mt-3 flex items-center gap-3">
              <label className="inline-flex items-center px-3 py-2 rounded-md border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 cursor-pointer">
                <input type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="hidden" onChange={handleFileUpload} />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-4.5-4.5v-6a4.5 4.5 0 014.5-4.5h10.5a4.5 4.5 0 014.5 4.5v6a4.5 4.5 0 01-4.5 4.5H6.75z"/></svg>
                {uploading ? 'Importing…' : 'Upload resume'}
              </label>
              {uploadMsg && <span className="text-xs text-green-600">{uploadMsg}</span>}
            </div>
            <p className="text-xs text-slate-500 mt-1">We extract text only. Large files are truncated for faster processing.</p>
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
