/* ============================================================
   Contact.jsx — Parchment scroll contact form with animated
   quill icon and golden glow styling
   ============================================================ */
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Mail, User, MessageSquare } from 'lucide-react';

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3500);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" style={{ position: 'relative', zIndex: 2 }}>
      <div className="section-container" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <div className="ornament">
            <div className="ornament-line" />
            <span className="ornament-star">✉</span>
            <div className="ornament-line right" />
          </div>
          <h2 className="section-title">Send a Message</h2>
          <div className="section-divider" />
          <p className="section-subtitle">Dispatch a scroll — I shall respond with haste</p>
        </motion.div>

        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start' }}>

          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2 }}
          >
            {/* Animated quill */}
            <motion.div
              style={{ fontSize: '3.5rem', marginBottom: '1.5rem', display: 'inline-block' }}
              animate={{ rotate: [0, -8, 5, 0], y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              🪶
            </motion.div>

            <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.1rem', color: '#D4AF37', marginBottom: '1rem' }}>
              Open to Opportunities
            </h3>
            <p style={{ color: '#A1A1AA', lineHeight: 1.8, fontFamily: 'Crimson Text, serif', fontSize: '1.05rem', marginBottom: '1.5rem' }}>
              I am open to internships, software development opportunities, freelance projects, and collaboration on
              full-stack or DevOps-based projects.
            </p>

            {/* Email */}
            <motion.a
              href="mailto:dinuanandcr.23cse@kongu.edu"
              whileHover={{ scale: 1.04 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '1rem 1.25rem',
                background: 'rgba(212,175,55,0.07)',
                border: '1px solid rgba(212,175,55,0.3)',
                borderRadius: '8px',
                color: '#D4AF37',
                textDecoration: 'none',
                fontFamily: 'Cinzel, serif',
                fontSize: '0.78rem',
                letterSpacing: '0.05em',
                cursor: 'none',
                transition: 'box-shadow 0.3s',
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 20px rgba(212,175,55,0.3)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
            >
              <Mail size={16} />
              dinuanandcr.23cse@kongu.edu
            </motion.a>

            {/* Decorative rune row */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', opacity: 0.4 }}>
              {['✦','⌬','⚡','◈','✧'].map((r, i) => (
                <motion.span
                  key={i}
                  style={{ color: '#D4AF37', fontSize: '1rem' }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.35 }}
                >
                  {r}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Right — Parchment form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.35 }}
          >
            <div className="parchment-card" style={{ padding: '2rem' }}>
              {/* Scroll top ornament */}
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{
                  width: '40px', height: '4px',
                  background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
                  margin: '0 auto',
                }} />
              </div>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: 'center', padding: '2rem 0' }}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                    style={{ fontSize: '3rem', marginBottom: '1rem' }}
                  >
                    ✦
                  </motion.div>
                  <p style={{ fontFamily: 'Cinzel, serif', color: '#22C55E', fontSize: '1rem' }}>
                    Your scroll has been dispatched!
                  </p>
                  <p style={{ color: '#71717A', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                    I will respond at the earliest.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {/* Name */}
                  <div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#D4AF37', fontFamily: 'Cinzel, serif', fontSize: '0.7rem', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                      <User size={13} /> NAME
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = '#D4AF37'}
                      onBlur={e => e.target.style.borderColor = 'rgba(212,175,55,0.25)'}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#D4AF37', fontFamily: 'Cinzel, serif', fontSize: '0.7rem', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                      <Mail size={13} /> EMAIL
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = '#D4AF37'}
                      onBlur={e => e.target.style.borderColor = 'rgba(212,175,55,0.25)'}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#D4AF37', fontFamily: 'Cinzel, serif', fontSize: '0.7rem', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                      <MessageSquare size={13} /> MESSAGE
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Write your message here..."
                      style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
                      onFocus={e => e.target.style.borderColor = '#D4AF37'}
                      onBlur={e => e.target.style.borderColor = 'rgba(212,175,55,0.25)'}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="btn-magic btn-magic-filled"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem' }}
                  >
                    <Send size={15} /> Send Message
                  </motion.button>
                </form>
              )}

              {/* Scroll bottom ornament */}
              <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                <div style={{
                  width: '40px', height: '4px',
                  background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
                  margin: '0 auto',
                }} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const inputStyle = {
  width: '100%',
  padding: '0.75rem 1rem',
  background: 'rgba(11,15,25,0.7)',
  border: '1px solid rgba(212,175,55,0.25)',
  borderRadius: '6px',
  color: '#F9FAFB',
  fontSize: '0.9rem',
  outline: 'none',
  transition: 'border-color 0.3s, box-shadow 0.3s',
  fontFamily: 'Inter, sans-serif',
};
