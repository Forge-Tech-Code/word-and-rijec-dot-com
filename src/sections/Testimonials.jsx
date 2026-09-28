import Reveal from '../components/Reveal'
import { useLang } from '../i18n'

export default function Testimonials() {
  const { t } = useLang()

  return (
    <section id="testimonials" className="bg-mint py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <Reveal>
          <div className="max-w-2xl mb-14">
            <h2 className="section-heading mb-3">{t.testimonials.heading}</h2>
            <p className="section-sub">{t.testimonials.sub}</p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-3 gap-6 lg:gap-8">
          {t.testimonials.quotes.map(({ quote, name, detail }, i) => (
            <Reveal key={i} delay={i * 90} className="h-full">
              <figure className="soft-card h-full flex flex-col gap-5">
                <blockquote className="font-sans font-light text-[17px] text-ink-soft leading-[1.6]">
                  “{quote}”
                </blockquote>
                <figcaption className="mt-auto font-sans text-[13px] text-ink-soft">
                  <span className="text-dandelion-deep font-bold">{name}</span> · {detail}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
