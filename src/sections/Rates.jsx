import Reveal from '../components/Reveal'
import { useLang } from '../i18n'

// The client's own prices.
//
// Only the FIGURES are here. The names, the package labels and "/ hour" are in
// src/i18n/, keyed by the same ids, because a price is the same number in both
// languages and the words around it are not.
//
// `hourly: null` means the service is quoted per project. `from` is a starting
// price per standard page (kartica) rather than an hourly one. `sections`
// splits one service into sub-rates, each with its own `hourly` and packages.
// A package's `per` and `saving` are optional — tutoring blocks carry neither —
// and `hourly: true` on a package marks its price as a rate per hour.
const prices = {
  tutoring: {
    hourly: '€15',
    packages: [
      { id: 'single', price: '€15' },
      { id: 'five', price: '€70' },
      { id: 'ten', price: '€135' },
    ],
  },
  lessons: {
    sections: [
      {
        id: 'individual',
        hourly: '€30',
        packages: [
          { id: 'single', price: '€30' },
          { id: 'five', price: '€140', per: '€28', saving: '€10' },
          { id: 'ten', price: '€270', per: '€27', saving: '€30' },
        ],
      },
      {
        id: 'group',
        packages: [
          { id: 'two', price: '€20', hourly: true },
          { id: 'threePlus', price: '€15', hourly: true },
        ],
      },
    ],
  },
  editing: { from: '€7' },
  copywriting: { hourly: null },
}

function Packages({ packages, t }) {
  return (
    <ul className="mt-3 space-y-1.5">
      {packages.map(({ id, price, hourly, per, saving }) => (
        <li key={id} className="flex flex-wrap items-baseline justify-between gap-x-4 font-sans text-[14px] text-ink-soft">
          <span>{t.rates.packages[id]}</span>
          <span className="text-right">
            <span className="font-bold text-ink">{price}</span>
            {hourly && <span className="text-ink-soft/80"> {t.rates.perHour}</span>}
            {per && (
              <span className="text-ink-soft/80">
                {' '}
                ({per} {t.rates.perSession})
              </span>
            )}
            {saving && (
              <span className="ml-2 inline-block rounded-full bg-dandelion/60 px-2 py-0.5 text-[12px] font-bold text-ink">
                {t.rates.save} {saving}
              </span>
            )}
          </span>
        </li>
      ))}
    </ul>
  )
}

function Hourly({ price, t }) {
  return (
    <p className="font-display text-2xl text-dandelion-deep whitespace-nowrap">
      {price} <span className="font-sans text-[13px] text-ink-soft/80">{t.rates.perHour}</span>
    </p>
  )
}

export default function Rates() {
  const { t } = useLang()

  return (
    <section id="rates" className="bg-haze pt-24 sm:pt-32">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-16 items-start">
          <Reveal>
            <h2 className="section-heading mb-3">{t.rates.heading}</h2>
            <p className="section-sub">{t.rates.sub}</p>
          </Reveal>

          <Reveal delay={110}>
            <div className="soft-card sm:p-10">
              <ul>
                {Object.entries(t.rates.items).map(([id, item]) => {
                  const { hourly, from, packages, sections } = prices[id]
                  return (
                    <li key={id} className="py-5 border-b border-line last:border-0 first:pt-0">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                        <p className="font-title text-xl text-ink">{item.name}</p>
                        {hourly && <Hourly price={hourly} t={t} />}
                        {from && (
                          <p className="font-display text-2xl text-dandelion-deep whitespace-nowrap">
                            <span className="font-sans text-[13px] text-ink-soft/80">{t.rates.from}</span> {from}{' '}
                            <span className="font-sans text-[13px] text-ink-soft/80">{t.rates.perCard}</span>
                          </p>
                        )}
                      </div>
                      {hourly === null && <p className="font-sans text-[14px] text-ink-soft mt-1">{t.rates.quote}</p>}
                      {packages && <Packages packages={packages} t={t} />}
                      {sections?.map((section) => (
                        <div key={section.id} className="mt-4">
                          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                            <p className="font-sans text-[15px] font-bold text-ink">{item.sections[section.id]}</p>
                            {section.hourly && <Hourly price={section.hourly} t={t} />}
                          </div>
                          <Packages packages={section.packages} t={t} />
                        </div>
                      ))}
                    </li>
                  )
                })}
              </ul>
              <p className="font-sans text-[14px] text-ink-soft leading-[1.8] mt-1 pt-6 border-t border-line">
                {t.rates.note}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
