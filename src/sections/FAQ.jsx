import { useState } from 'react'
import Reveal from '../components/Reveal'
import { useLang } from '../i18n'

// Questions and answers both live in src/i18n/.

function FAQItem({ q, a, id }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-line last:border-0">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={id}
        className="w-full flex items-center justify-between gap-6 py-6 text-left group"
      >
        <span className="font-title text-lg sm:text-xl text-ink leading-snug group-hover:text-pine transition-colors duration-300">
          {q}
        </span>
        <span
          aria-hidden="true"
          className={`shrink-0 w-8 h-8 rounded-full border border-line flex items-center justify-center transition-transform duration-500 ease-out ${
            open ? 'rotate-45 bg-dandelion/50 border-dandelion-deep' : ''
          }`}
        >
          <svg className="w-3.5 h-3.5 text-ink-soft" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
            <path strokeLinecap="round" d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>
      {/* Always in the HTML, only hidden while closed, so the prerendered
          page carries every answer for crawlers to read. */}
      <p id={id} hidden={!open} className="font-sans text-[15px] text-ink-soft leading-[1.85] pb-7 pr-12 -mt-1 max-w-2xl">
        {a}
      </p>
    </div>
  )
}

export default function FAQ() {
  const { t } = useLang()

  return (
    <section id="faq" className="bg-haze py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-16 items-start">
          <Reveal>
            <h2 className="section-heading mb-3">{t.faq.heading}</h2>
            <p className="section-sub">{t.faq.sub}</p>
          </Reveal>

          <Reveal delay={110}>
            <div>
              {t.faq.items.map(({ q, a }, i) => (
                <FAQItem key={q} q={q} a={a} id={`faq-answer-${i}`} />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
