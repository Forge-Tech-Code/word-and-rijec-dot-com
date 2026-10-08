/**
 * English — the root locale, and the reference shape. hr.js must mirror this
 * object key for key and array for array; src/i18n/index.jsx asserts it at
 * module load, so `npm run build` fails on drift rather than prerendering a
 * page with a hole in it.
 *
 * The copy here is the client's own, except for the testimonials (see the
 * note on them).
 */
export default {
  meta: {
    title: 'Word & Riječ — English and Croatian language services',
    description:
      'English and Croatian language services: tutoring, language lessons, editing, proofreading and copywriting.',
    ogDescription:
      'Tutoring, language lessons, editing, proofreading and copywriting in English and Croatian.',
  },

  // Facts that read differently in each language. The name, the email and the
  // canonical URL are NOT here — they are the same in both, and live in
  // src/siteInfo.js.
  site: {
    what: 'English and Croatian language services',
    location: 'Brač, online, worldwide',
    tagline: 'More language. More life.',
  },

  switcher: {
    label: 'Language',
    // What the control offers, named in the language it switches TO.
    toOther: 'Hrvatski',
    aria: 'Switch to Croatian',
  },

  nav: {
    services: 'Services',
    about: 'About',
    approach: 'How it works',
    testimonials: 'Testimonials',
    rates: 'Rates',
    faq: 'FAQ',
    contact: 'Get in touch',
    submenu: {
      lessons: 'Lessons',
      tutoring: 'Tutoring',
      editing: 'Editing & proofreading',
      copywriting: 'Copywriting',
    },
  },

  hero: {
    lede: 'More language. More life.',
    body: [
      'Sometimes you know exactly what you want to say — you just don’t have the words yet. Or you have the words, but not quite the confidence to use them.',
      'Learning a language can turn that frustration into freedom: more confidence, more ease, and more ways to connect, express yourself and build new worlds.',
    ],
    ctaPrimary: 'Get in touch',
    ctaSecondary: 'See what I offer',
    offer: ['Tutoring & lessons', 'Editing & proofreading', 'Copywriting'],
  },

  services: {
    heading: 'Services',
    sub: 'What I can help with',
    // Rendered in this order — language lessons first.
    items: {
      lessons: {
        title: 'Language lessons',
        audience: 'English and Croatian for real life, at your pace',
        body: 'Individual or small groups.',
      },
      tutoring: {
        title: 'Tutoring',
        audience: 'School and university students',
        body: 'Help with schoolwork, exam preparation and essay writing.',
      },
      editing: {
        title: 'Editing & proofreading',
        audience: 'Theses, articles, brochures',
        body: 'Catching those sneaky mistakes and typos. Making your writing clearer, without taking away your voice.',
      },
      copywriting: {
        title: 'Copywriting',
        audience: 'Websites, campaigns, brochures',
        body: 'Finding the words when you know what you want to say, but don’t quite know how to say it.',
      },
    },
  },

  about: {
    heading: 'About me',
    photoAlt: 'Portrait of Rebekah Berković',
    body: [
      'I grew up in Croatia speaking English at home with my British mother and Croatian with my father. Being bilingual has always felt natural to me, but it also made me aware from an early age of what language can do — how it can open doors to reading, writing, creativity, connection and new experiences. I currently live and work on Brač.',
      'For more than 15 years, I’ve taught English and Croatian to all kinds of learners, from complete beginners to advanced speakers. I’ve taught simple one-on-one conversational classes, school and university students, corporate groups and even members of parliament.',
      'I’ve also been on the other side of the language barrier. I learnt German and Thai from scratch while living in Austria and Thailand, so I know how frustrating it can be to have so much you want to say but not have the words. I also know the wonderful feeling when something finally clicks — when you can have a conversation, understand a joke, read a sign or write something yourself, and suddenly a place feels a little more like home.',
      'I believe language learning works best when you actually use the language, in a relaxed environment where you can make mistakes, ask questions and figure things out without feeling judged.',
      'And language isn’t only about speaking. I love working with words on the page, too. Whether it’s a website, essay, application, menu or something more personal, I’m here to help you make sure your words say what you want them to say — and say it well.',
    ],
  },

  approach: {
    heading: 'How it works',
    sub: 'From first message to first lesson',
    steps: [
      {
        title: 'Get in touch',
        body: 'Send me a message and tell me a little about what you’re looking for, what you need help with, and what you’d like to achieve.',
      },
      {
        title: 'Let’s meet',
        body: 'We’ll set up a quick call or meeting to talk things through. We’ll work out what kind of support would suit you, how often we’ll work together, and what that will cost. The first meeting is free.',
      },
      {
        title: 'Get started',
        body: 'Once we’ve agreed on a plan, we get to work. Everything is tailored to you — your needs, your goals and your way of working.',
      },
    ],
  },

  testimonials: {
    heading: 'Testimonials',
    sub: 'In their own words',
    quotes: [
      {
        quote:
          'I moved to Split knowing about four words of Croatian. A few months later I can chat with my neighbours and order at the market without panicking. Lessons never felt like homework — just conversations that kept getting easier.',
        name: 'Sarah M.',
        detail: 'Croatian lessons',
      },
      {
        quote:
          'My daughter was dreading her English exams. After a term of weekly sessions she went in calm, knew exactly how to structure her essay, and came out with a grade she was proud of.',
        name: 'Ivana K.',
        detail: 'Parent, school tutoring',
      },
      {
        quote:
          'Rebekah proofread my master’s thesis and caught things I had read past a hundred times. The writing came back clearer, and it still sounded like me.',
        name: 'Marko P.',
        detail: 'Thesis proofreading',
      },
    ],
  },

  rates: {
    heading: 'Rates',
    sub: 'What things cost',
    perHour: '/ hour',
    perSession: '/ session',
    from: 'from',
    perCard: 'per standard page',
    save: 'save',
    quote: 'Project-based — get in touch for a quote.',
    note: 'Your first call or meeting is free. It’s simply a chance to talk, see if we click, and figure out what you need.',
    packages: {
      single: 'Single session',
      five: '5-session block',
      ten: '10-session block',
      two: '2 people',
      threePlus: '3 or more',
    },
    // Rendered in this order. The figures are in src/sections/Rates.jsx,
    // keyed by the same ids.
    items: {
      tutoring: { name: 'School English or Croatian tutoring' },
      lessons: {
        name: 'Language lessons',
        sections: { individual: 'Individual language lessons', group: 'Group lessons' },
      },
      editing: { name: 'Proofreading & editing' },
      copywriting: { name: 'Writing & copy' },
    },
  },

  faq: {
    heading: 'FAQ',
    sub: 'Good to know',
    items: [
      {
        q: 'Do you teach online or in person?',
        a: 'Both or either! If there is a suitable location for both of us, we can meet in person. If not, we can meet online. We can also mix and match as we go.',
      },
      {
        q: 'How long is a lesson?',
        a: 'A good rule of thumb is 60 minutes. It gives us time to settle in, look at what needs to be done and get into it. 45-minute lessons are also possible, especially for school tutoring.',
      },
      {
        q: 'What level do I need to start?',
        a: 'You don’t. I have taught students who didn’t know more than ‘Hello’ and weren’t sure how to read or pronounce short words. I have also taught students who are advanced and wanted more technical ability. Everyone starts somewhere.',
      },
      {
        q: 'How quickly can you turn around editing work?',
        a: 'It depends on the length and complexity of the project, but I’ll always give you a clear timeframe before we start. If you’re working to a deadline, let me know and I’ll do my best to accommodate it.',
      },
      {
        q: 'What happens if I need to cancel?',
        a: 'Things come up! Just let me know as soon as you can. Cancellations with at least 24 hours’ notice are free of charge. If you cancel with less notice or don’t show up, the session may still be charged.',
      },
    ],
  },

  contact: {
    heading: 'Get in touch',
    body: 'Not sure exactly what you need? Just send me a message and tell me what you’re looking for. We can figure out the rest together.',
    form: {
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send message',
      subject: 'New enquiry from word-and-rijec.com',
    },
    orEmail: 'Or email me directly',
  },

  footer: {
    exploreLabel: 'Explore',
    contactLabel: 'Get in touch',
  },
}
