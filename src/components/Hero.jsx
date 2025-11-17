import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 sm:py-28">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-indigo-500 to-orange-400">
            AI VidCV
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-slate-700 max-w-2xl mx-auto">
            Transform your resume into a stunning 20-second video with AI. Share via QR code and download when you upgrade.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <a href="#create" className="rounded-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 font-semibold shadow-lg transition">
              Create your video
            </a>
            <a href="#pricing" className="rounded-full bg-white/80 backdrop-blur text-indigo-700 px-6 py-3 font-semibold shadow border border-indigo-200 hover:border-indigo-300 transition">
              View plans
            </a>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white/80"></div>
    </section>
  );
}
