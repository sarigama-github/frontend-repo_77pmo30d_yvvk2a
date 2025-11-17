export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center">Simple pricing</h2>
        <p className="text-slate-600 text-center mt-2">Start free, upgrade as you grow.</p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Plan
            name="Free"
            price="$0"
            cta="Generate"
            href="#create"
            features={["Up to 20 seconds", "Basic template", "Watermark"]}
          />
          <Plan
            name="Premium"
            price="$19/mo"
            cta="Upgrade"
            href="https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-6EB31958C8033350MNB72GPQ"
            features={["Advanced styles", "No watermark", "Priority rendering"]}
          />
          <Plan
            name="Pro"
            price="$39/mo"
            cta="Go Pro"
            href="https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-3T754046CH3263111NB72RVI"
            features={["QR code", "Download enabled", "All Premium features"]}
            highlight
          />
        </div>
      </div>
    </section>
  );
}

function Plan({ name, price, features, href, cta, highlight }) {
  return (
    <div className={`rounded-2xl p-6 border ${highlight ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-slate-200'} bg-white shadow-sm`}>
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="mt-2 text-3xl font-bold">{price}</p>
      <ul className="mt-4 space-y-2 text-slate-700 text-sm">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
            {f}
          </li>
        ))}
      </ul>
      <a href={href} className={`mt-6 inline-flex justify-center w-full rounded-md px-4 py-2 font-semibold ${highlight ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-slate-900 text-white hover:bg-slate-800'}`}>
        {cta}
      </a>
    </div>
  );
}
