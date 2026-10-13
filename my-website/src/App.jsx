import { useState } from 'react'
import './App.css'

const services = [
  { icon: '⌁', title: 'Diagnostics', text: 'Check-engine lights, no-starts, electrical issues, and honest answers before repairs begin.' },
  { icon: '◒', title: 'Maintenance', text: 'Oil changes, brakes, batteries, tune-ups, fluids, filters, and seasonal checkups.' },
  { icon: '✦', title: 'Repairs at your door', text: 'Reliable repairs at home, work, or roadside—without the shop waiting room.' },
]

function App() {
  const [sent, setSent] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const phone = '(717)-331-2590'
  const nav = ['Services', 'How it works', 'Contact']
  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false) }
  const submit = (event) => { event.preventDefault(); setSent(true); event.currentTarget.reset() }

  return (
    <main>
      <header className="site-header">
        <a className="logo" href="#top" aria-label="WrenchWorx Mobile Mechanic home">
  <img
    src="/wrenchworx-logo.png"
    alt="WrenchWorx Mobile Mechanic"
    className="logo-image"
  />
</a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">☰</button>
        <nav className={menuOpen ? 'open' : ''}>{nav.map((item) => <button key={item} onClick={() => scrollTo(item.toLowerCase().replaceAll(' ', '-'))}>{item}</button>)}<a className="nav-phone" href="tel:5558675309">Call now</a></nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">MOBILE AUTO REPAIR · WAYNESBORO, PA</p>
          <h1>WHEN MOVING PARTS JUST DONT MOVE RIGHT,<br /><em>CALL</em></h1>
          <p className="lede">Convenient, straightforward auto care that comes to your driveway, office, or wherever you’re parked.</p>
          <div className="hero-actions"><a className="button button-primary" href="#contact">Request service <span>→</span></a><a className="text-link" href={`tel:7173312590`}>Call {phone}</a></div>
          <div className="trust"><span>✓ Experienced</span><span>✓ Upfront pricing</span><span>✓ We come to you</span></div>
        </div>
          

      </section>

      <section className="services section" id="services">
        <div className="section-heading"><p className="eyebrow">WHAT WE DO</p><h2>Real repairs.<br />Right where you are.</h2></div>
        <div className="service-grid">{services.map((service, index) => <article className="service" key={service.title}><span className="service-number">0{index + 1}</span><div className="service-icon">{service.icon}</div><h3>{service.title}</h3><p>{service.text}</p><a href="#contact">Book this service →</a></article>)}</div>
      </section>

      <section className="process" id="how-it-works"><div className="process-inner"><div><p className="eyebrow">SIMPLE FROM START TO FINISH</p><h2>Skip the shop.<br />Keep your day.</h2><p>Tell us what’s going on. We’ll confirm the job, come to you, and get you back on the road with no surprises.</p><a className="button button-light" href="#contact">Get a quote <span>→</span></a></div><ol><li><strong>01</strong><span>Tell us about your car and where you need us.</span></li><li><strong>02</strong><span>Get a clear quote and appointment window.</span></li><li><strong>03</strong><span>We handle the repair while you get on with life.</span></li></ol></div></section>

      <section className="contact section" id="contact"><div className="contact-intro"><p className="eyebrow">LET’S GET YOU MOVING</p><h2>Need a mechanic?</h2><p>Send a quick note with your vehicle and the issue. We’ll get back to you as soon as possible.</p><div className="contact-details"><a href={`tel:5558675309`}>{phone}</a><a href="mailto:hello@roadreadymechanic.com">hello@roadreadymechanic.com</a><span>Mon–Sat · 8am–6pm</span></div></div><form onSubmit={submit}>{sent ? <div className="success"><span>✓</span><h3>Thanks — we got it!</h3><p>We’ll be in touch shortly to confirm your service.</p><button type="button" onClick={() => setSent(false)}>Send another request</button></div> : <><label>Your name<input required placeholder="Jane Smith" /></label><label>Phone number<input required type="tel" placeholder="(555) 000-0000" /></label><label>What can we help with?<textarea required placeholder="Vehicle year/make/model and a short description of the issue"></textarea></label><button className="button button-primary" type="submit">Send request <span>→</span></button></>}</form></section>

      <footer><a className="logo" href="#top"><span className="logo-mark">R</span><span>ROAD READY<small>MOBILE MECHANIC</small></span></a><p>Reliable auto care, wherever you are.</p><span>© {new Date().getFullYear()} Road Ready Mobile Mechanic</span></footer>
    </main>
  )
}

export default App

