/**
 * Croatian. Mirrors en.js key for key — src/i18n/index.jsx asserts that at
 * module load, so a missing key fails `npm run build`.
 *
 * The copy here is the client's own Croatian, not a translation of her
 * English: the section headings, service texts, About, How it works, rates
 * and FAQ are hers word for word. about.body has four paragraphs to the
 * English five because that is how she wrote it; nothing was added to match,
 * and index.jsx allows that one list to differ in length.
 *
 * Not hers: the testimonials (see the note on them) and the short UI chrome
 * (form labels, switcher, section subtitles).
 */
export default {
  meta: {
    title: 'Word & Riječ — jezične usluge na engleskom i hrvatskom',
    description:
      'Jezične usluge na engleskom i hrvatskom: instrukcije, satovi jezika, uređivanje, lektura i pisanje tekstova.',
    ogDescription:
      'Instrukcije, satovi jezika, uređivanje, lektura i pisanje tekstova na engleskom i hrvatskom.',
  },

  site: {
    what: 'Jezične usluge na engleskom i hrvatskom',
    location: 'Brač, online, bilo gdje u svijetu',
    tagline: 'Više jezika. Više života.',
  },

  switcher: {
    label: 'Jezik',
    toOther: 'English',
    aria: 'Prebaci na engleski',
  },

  nav: {
    services: 'Usluge',
    about: 'O meni',
    approach: 'Kako funkcionira',
    testimonials: 'Preporuke',
    rates: 'Cjenik',
    faq: 'Česta pitanja',
    contact: 'Javite se',
    submenu: {
      lessons: 'Satovi',
      tutoring: 'Instrukcije',
      editing: 'Uređivanje i lektura',
      copywriting: 'Pisanje tekstova',
    },
  },

  hero: {
    lede: 'Više jezika. Više života.',
    body: [
      'Ponekad znate točno što želite reći — ali još nemate riječi kojima biste to rekli. Ili imate riječi, ali nemate dovoljno samopouzdanja da ih upotrijebite.',
      'Učenje jezika može tu frustraciju pretvoriti u slobodu: više samopouzdanja, više lakoće i više načina da se povežete, izrazite i stvarate nove svjetove.',
    ],
    ctaPrimary: 'Javite se',
    ctaSecondary: 'Pogledajte što nudim',
    offer: ['Instrukcije i satovi', 'Uređivanje i lektura', 'Pisanje tekstova'],
  },

  services: {
    heading: 'Usluge',
    sub: 'S čime vam mogu pomoći',
    items: {
      lessons: {
        title: 'Satovi engleskog ili hrvatskog',
        audience: 'Engleski i hrvatski za stvarni život, vašim tempom',
        body: 'Individualno ili u malim grupama.',
      },
      tutoring: {
        title: 'Instrukcije',
        audience: 'Za učenike i studente',
        body: 'Pomoć sa zadaćom, pripremama za ispite i pisanjem sastavaka.',
      },
      editing: {
        title: 'Uređivanje i lektura',
        audience: 'Završni i diplomski radovi, članci, brošure, meniji itd.',
        body: 'Hvatam one sitne greške, izraze koji baš ne zvuče prirodno i tipfelere koji lako promaknu. Činim vaš tekst jasnijim, a da pritom ostane vaš.',
      },
      copywriting: {
        title: 'Pisanje tekstova',
        audience: 'Web stranice, kampanje, brošure itd.',
        body: 'Pronalaženje pravih riječi kada znate što želite reći, ali ne znate baš kako to sročiti.',
      },
    },
  },

  about: {
    heading: 'O meni',
    photoAlt: 'Rebekah Berković, portret',
    body: [
      'Odrasla sam u Hrvatskoj, pričajući engleski kod kuće s majkom Engleskinjom, a hrvatski s ocem, prijateljima i u školi. Dvojezičnost mi je oduvijek bila potpuno prirodna, ali me istovremeno učinila vrlo svjesnom onoga što jezik može. Jezik mi je otvorio vrata čitanju, pisanju, kreativnosti i na kraju podučavanju.',
      'Bila sam i s druge strane jezične barijere. Učila sam njemački i tajlandski od nule dok sam živjela u Austriji i Tajlandu, i znam koliko je frustrirajuće imati toliko toga za reći, a ne imati riječi kojima biste to rekli. Ali znam i onaj nevjerojatan osjećaj kada nešto napokon klikne — kada možete s nekim popričati, razumjeti šalu, pročitati znak, sami nešto napisati i odjednom se neko mjesto počne osjećati malo više kao doma. Trenutno živim i radim na Braču.',
      'Znam da učenje jezika može djelovati zastrašujuće. Ne mislim da mora biti. Vjerujem u učenje kroz stvarnu upotrebu jezika, u opuštenom i ugodnom okruženju u kojem možete griješiti, postavljati pitanja i učiti bez straha da ćete biti osuđivani.',
      'A jezik nije samo govor. Volim ono što se događa kada riječi stavimo na papir. Pisanje nam može pomoći da razumijemo što mislimo i osjećamo. Ali naši tekstovi žive i u stvarnom svijetu. Ljudi čitaju naše web stranice, menije, e-mailove, prijave i eseje — i dobro pisanje čini razliku. Tu sam da vam pomognem da vaše riječi kažu ono što želite reći — i da to kažu dobro.',
    ],
  },

  approach: {
    heading: 'Kako funkcionira',
    sub: 'Od prve poruke do prvog sata',
    steps: [
      {
        title: 'Javite se',
        body: 'Pošaljite mi poruku i recite mi ukratko što tražite, oko čega vam treba pomoć i što želite postići.',
      },
      {
        title: 'Upoznajmo se',
        body: 'Dogovorit ćemo kratak poziv ili susret da prođemo kroz sve, vidimo što bi vam najbolje odgovaralo, koliko često bismo radili zajedno i koliko bi to koštalo. Prvi razgovor je besplatan.',
      },
      {
        title: 'Krenimo',
        body: 'Kad dogovorimo plan, krećemo. Sve je prilagođeno vama — vašim potrebama, ciljevima i načinu rada.',
      },
    ],
  },

  testimonials: {
    heading: 'Preporuke',
    sub: 'Njihovim riječima',
    quotes: [
      {
        quote:
          'Doselila sam se u Split znajući otprilike četiri riječi hrvatskog. Nekoliko mjeseci kasnije mogu popričati sa susjedima i naručiti na placu bez panike. Satovi nikad nisu djelovali kao domaća zadaća — samo kao razgovori koji su postajali sve lakši.',
        name: 'Sarah M.',
        detail: 'Satovi hrvatskog',
      },
      {
        quote:
          'Moja kći se jako bojala ispita iz engleskog. Nakon polugodišta tjednih instrukcija na ispit je otišla smirena, točno je znala kako složiti sastavak i dobila je ocjenu na koju je bila ponosna.',
        name: 'Ivana K.',
        detail: 'Roditeljica, školske instrukcije',
      },
      {
        quote:
          'Rebekah mi je lektorirala diplomski rad i uhvatila stvari preko kojih sam sto puta prešao. Tekst se vratio jasniji, a i dalje je zvučao kao ja.',
        name: 'Marko P.',
        detail: 'Lektura diplomskog rada',
      },
    ],
  },

  rates: {
    heading: 'Cjenik',
    sub: 'Koliko što košta',
    perHour: '/ sat',
    perSession: '/ sat',
    from: 'od',
    perCard: 'po kartici',
    save: 'ušteda',
    quote: 'Po dogovoru — javite se za ponudu.',
    note: 'Prvi poziv ili susret je besplatan. To je jednostavno prilika da popričamo, vidimo odgovaramo li si i zajedno ustanovimo što vam treba.',
    packages: {
      single: 'Pojedinačni sat',
      five: 'Paket od 5 sati',
      ten: 'Paket od 10 sati',
      two: '2 osobe',
      threePlus: '3 ili više osoba',
    },
    items: {
      tutoring: { name: 'Instrukcije iz engleskog ili hrvatskog' },
      lessons: {
        name: 'Satovi engleskog ili hrvatskog',
        sections: { individual: 'Individualni satovi', group: 'Grupni satovi' },
      },
      editing: { name: 'Uređivanje i lektura' },
      copywriting: { name: 'Pisanje tekstova' },
    },
  },

  faq: {
    heading: 'Česta pitanja',
    sub: 'Dobro je znati',
    items: [
      {
        q: 'Držite li nastavu online ili uživo?',
        a: 'Može i jedno i drugo! Ako možemo pronaći odgovarajuće mjesto, možemo se susresti uživo. Ako ne, možemo raditi online. Možemo ih i kombinirati, ovisno o tome što vam odgovara.',
      },
      {
        q: 'Koliko traje sat?',
        a: 'Dobro pravilo je 60 minuta. To nam daje dovoljno vremena da se smjestimo, vidimo što treba napraviti i stvarno se posvetimo radu. Mogući su i satovi od 45 minuta, posebno za školske instrukcije.',
      },
      {
        q: 'Koju razinu trebam imati za početak?',
        a: 'Nikakvu. Podučavala sam učenike koji nisu znali više od „Hello” i nisu bili sigurni kako pročitati ili izgovoriti ni kratke riječi. Radila sam i s naprednim učenicima koji su željeli dodatno usavršiti svoje jezične vještine. Svatko negdje počinje.',
      },
      {
        q: 'Koliko brzo možete završiti s uređivanjem teksta?',
        a: 'Ovisi o duljini i složenosti projekta, ali uvijek ću vam dati jasan rok prije početka rada. Ako imate određeni rok, recite mi i potrudit ću se prilagoditi mu se.',
      },
      {
        q: 'Što ako moram otkazati?',
        a: 'Događa se! Samo mi javite čim prije možete. Otkazivanje najmanje 24 sata unaprijed ne naplaćuje se. Ako otkažete u kraćem roku ili se ne pojavite, termin se može naplatiti.',
      },
    ],
  },

  contact: {
    heading: 'Javite se',
    body: 'Niste sigurni što vam točno treba? Samo mi pošaljite poruku i recite što tražite. Ostalo možemo zajedno dogovoriti.',
    form: {
      name: 'Ime',
      email: 'E-pošta',
      message: 'Poruka',
      send: 'Pošalji poruku',
      subject: 'Novi upit s word-and-rijec.com',
    },
    orEmail: 'Ili mi pišite izravno',
  },

  footer: {
    exploreLabel: 'Istražite',
    contactLabel: 'Kontakt',
  },
}
