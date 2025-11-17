import { useState } from 'react';
import Hero from './components/Hero';
import VideoForm from './components/VideoForm';
import RecentVideos from './components/RecentVideos';
import Pricing from './components/Pricing';

function App() {
  const [lastCreated, setLastCreated] = useState(null);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Hero />
      <VideoForm onCreated={setLastCreated} />

      {lastCreated && (
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-6">
            <h3 className="text-xl font-semibold">Your video</h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <video src={lastCreated.video_url} controls className="w-full rounded-lg shadow"></video>
              <div className="space-y-3 text-sm">
                <p>Plan: <b>{lastCreated.plan}</b></p>
                {lastCreated.qr_available ? (
                  <div>
                    <p className="font-medium">QR code</p>
                    <img alt="QR" className="mt-2 h-36 w-36" src={`${import.meta.env.VITE_BACKEND_URL || ''}/api/qr?url=${encodeURIComponent(lastCreated.video_url || '')}`} />
                  </div>
                ) : (
                  <p className="text-slate-600">QR code is available on Pro.</p>
                )}
                {lastCreated.downloadable ? (
                  <a className="inline-flex rounded-md bg-indigo-600 text-white px-4 py-2" href={lastCreated.video_url} download>
                    Download
                  </a>
                ) : (
                  <p className="text-slate-600">Download is available on Pro.</p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      <RecentVideos />
      <Pricing />

      <footer className="py-10 text-center text-slate-500 text-sm">Made with ❤️ for job-seekers</footer>
    </div>
  );
}

export default App;
