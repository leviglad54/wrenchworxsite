import { useState } from 'react'
import { useForm } from '@formspree/react'
import './App.css'

const PHONE = '(717) 331-2590'
const PHONE_LINK = 'tel:+17173312590'
const FORMSPREE_FORM_ID = import.meta.env.VITE_FORMSPREE_FORM_ID || 'configure-form-id'
const assetUrl = (path) => `${import.meta.env.BASE_URL}${path}`

const services = [
  {
    number: '01',
    image: assetUrl('assets/service-diagnostics.png'),
    icon: '⌕',
    title: 'Diagnostics',
    text: 'No-starts, check-engine lights, electrical problems, and mechanical troubleshooting.',
  },
  {
    number: '02',
    image: assetUrl('assets/service-maintenance.png'),
    icon: '⚙',
    title: 'Maintenance',
    text: 'Oil changes, brakes, batteries, fluids, filters, and routine vehicle maintenance.',
  },
  {
    number: '03',
    image: assetUrl('assets/service-repairs.png'),
    icon: '🔧',
    title: 'Mechanical Repairs',
    text: 'Practical repair solutions for the problems keeping your vehicle off the road.',
  },
  {
    number: '04',
    image: assetUrl('assets/service-mobile-service.png'),
    icon: '⌁',
    title: 'Mobile Service',
    text: 'Convenient repairs at your home, workplace, or another suitable location.',
  },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [{ errors, submitting, succeeded }, handleSubmit, reset] = useForm(FORMSPREE_FORM_ID)

  const nav = [
    { label: 'Services', id: 'services' },
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'Contact', id: 'contact' },
  ]

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
    })

    setMenuOpen(false)
  }

  return (
    <main style={{ '--process-bg-image': `url("${assetUrl('assets/process-background.png')}")` }}>
      {/* HEADER */}

      <header className="site-header" id="top">
        <a
          className="logo"
          href="#top"
          aria-label="WrenchWorx home"
        >
          <img
            src={assetUrl('wrenchworx-logo.png')}
            alt="WrenchWorx Mobile Mechanic"
            className="logo-image"
          />
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        <nav className={menuOpen ? 'open' : ''}>
          {nav.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
            >
              {item.label}
            </button>
          ))}

          <a className="nav-phone" href={PHONE_LINK}>
            Call Now <span>↗</span>
          </a>
        </nav>
      </header>

      {/* HERO */}

      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow">
            MOBILE AUTO REPAIR
            <span className="eyebrow-divider">///</span>
            WAYNESBORO, PA
          </p>

          <h1>
            YOUR DRIVEWAY.
            <br />
            <em>OUR WORKSHOP.</em>
          </h1>

          <p className="lede">
            Professional mechanical repairs and practical
            troubleshooting, brought directly to you.
            No shop waiting room. No unnecessary runaround.
          </p>

          <div className="hero-actions">
            <a
              className="button button-primary"
              href="#contact"
            >
              REQUEST SERVICE <span>→</span>
            </a>

            <a className="text-link" href={PHONE_LINK}>
              <span className="phone-symbol">☎</span>
              {PHONE}
            </a>
          </div>

          <div className="trust">
            <span>
              <b>+</b> On-site repairs
            </span>

            <span>
              <b>+</b> Straightforward pricing
            </span>

            <span>
              <b>+</b> Practical expertise
            </span>
          </div>
        </div>

        <div className="hero-art" aria-label="Distressed steel gear, crossed wrenches, and piston artwork">
          <img className="hero-illustration" src={assetUrl('assets/hero-workshop.png')} alt="" />
        </div>

        <div className="hero-bottom-line">
          <span>WRENCHWORX MOBILE MECHANIC</span>
          <span>BUILT AROUND THE WAY YOU WORK.</span>
        </div>
      </section>

      {/* SERVICES */}

      <section className="services section" id="services">
        <div className="section-heading">
          <div>
            <p className="eyebrow">WHAT WE DO</p>

            <h2>
              REAL REPAIRS.
              <br />
              <span>NO RUNAROUND.</span>
            </h2>
          </div>

          <p className="section-description">
            From finding the problem to fixing it, get
            practical mechanical help where you need it.
          </p>
        </div>

        <div className="service-grid">
          {services.map((service) => (
            <article
              className="service"
              key={service.number}
            >
              <div
                className="service-image"
                role="img"
                aria-label={`${service.title} service photo`}
              >
                <img className="service-photo" src={service.image} alt="" />
                <span className="service-number">{service.number}</span>
                <span className="service-icon" aria-hidden="true">{service.icon}</span>
              </div>

              <h3>{service.title}</h3>

              <p>{service.text}</p>

              <button
                className="service-link"
                onClick={() => scrollTo('contact')}
              >
                ASK ABOUT THIS SERVICE <span>↗</span>
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}

      <section className="process" id="how-it-works">
        <div className="process-inner">
          <div className="process-copy">
            <p className="eyebrow">STRAIGHTFORWARD FROM START TO FINISH</p>

            <h2>
              LESS HASSLE.
              <br />
              <span>MORE WRENCHING.</span>
            </h2>

            <p>
              Tell us what's going on with your vehicle.
              We'll discuss the job, establish the price,
              and arrange a time to come to you.
            </p>

            <a
              className="button button-light"
              href="#contact"
            >
              GET A QUOTE <span>→</span>
            </a>
          </div>

          <ol className="process-list">
            <li>
              <strong>01</strong>

              <div>
                <h3>Tell us the problem.</h3>

                <p>
                  Describe your vehicle, the symptoms,
                  and where the work needs to happen.
                </p>
              </div>
            </li>

            <li>
              <strong>02</strong>

              <div>
                <h3>Get a clear estimate.</h3>

                <p>
                  We'll discuss the repair, parts,
                  pricing, and appointment details.
                </p>
              </div>
            </li>

            <li>
              <strong>03</strong>

              <div>
                <h3>We come to you.</h3>

                <p>
                  Get the agreed-upon work done at
                  your location whenever the job is suitable
                  for mobile service.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* CONTACT */}

      <section className="contact section" id="contact">
        <div className="contact-intro">
          <p className="eyebrow">LET'S GET YOU MOVING</p>

          <h2>
            GOT A PROBLEM?
            <br />
            <span>LET'S FIX IT.</span>
          </h2>

          <p>
            Tell us what you're driving and what's going
            wrong. We'll get back to you to discuss the
            repair and next steps.
          </p>

          <div className="contact-details">
            <div className="contact-detail">
              <span className="detail-label">CALL OR TEXT</span>

              <a href={PHONE_LINK}>{PHONE}</a>
            </div>

            <div className="contact-detail">
              <span className="detail-label">SERVICE AREA</span>

              <span>Waynesboro and surrounding areas</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {succeeded ? (
            <div className="success">
              <span className="success-icon">✓</span>

              <h3>Thanks for reaching out.</h3>

              <p>
                Your service request was sent. We’ll get back to you as soon as we can.
              </p>

              <a className="button button-primary" href={PHONE_LINK}>
                CALL {PHONE} <span>↗</span>
              </a>

              <button
                type="button"
                className="send-another"
                onClick={reset}
              >
                Start another request
              </button>
            </div>
          ) : (
            <>
              <div className="form-heading">
                <span>01 / SERVICE REQUEST</span>

                <p>Tell us a little about the job.</p>
              </div>

              <label>
                YOUR NAME

                <input
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  required
                />
              </label>

              <label>
                PHONE NUMBER

                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="Your best contact number"
                  required
                />
              </label>

              <label>
                VEHICLE & PROBLEM

                <textarea
                  name="message"
                  placeholder="Year, make, model, and what's happening..."
                  required
                />
              </label>

              {errors && (
                <p className="form-error" role="alert">
                  {errors.getFormErrors().map((error) => error.message).join(' ') ||
                    'We couldn’t send your request. Please check the details and try again.'}
                </p>
              )}

              <button
                className="button button-primary submit-button"
                type="submit"
                disabled={submitting || !import.meta.env.VITE_FORMSPREE_FORM_ID}
              >
                {submitting ? 'SENDING…' : 'REQUEST A CALLBACK'} <span>→</span>
              </button>

              <p className="form-note">
                {!import.meta.env.VITE_FORMSPREE_FORM_ID
                  ? 'Form setup is almost complete. Add your Formspree form ID to .env.local to enable requests.'
                  : `Your request will be sent securely. Need help sooner? Call or text ${PHONE}.`}
              </p>
            </>
          )}
        </form>
      </section>

      {/* FOOTER */}

      <footer>
        <a
          className="logo footer-logo"
          href="#top"
          aria-label="WrenchWorx home"
        >
          <img
            src={assetUrl('wrenchworx-logo.png')}
            alt="WrenchWorx Mobile Mechanic"
            className="logo-image"
          />
        </a>

        <p>
          If it has moving parts that no longer move,
          give me a call.
        </p>

        <div className="footer-contact">
          <a href={PHONE_LINK}>{PHONE}</a>

          <span>
            © {new Date().getFullYear()} WrenchWorx
          </span>
        </div>
      </footer>
    </main>
  )
}

export default App
