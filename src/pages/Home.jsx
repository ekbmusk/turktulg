import { motion } from 'framer-motion'
import { figures } from '../data/figures.js'
import FigureCard from '../components/FigureCard.jsx'
import Seo from '../seo/Seo.jsx'
import { SITE_NAME, SITE_DESC, SITE_URL, abs } from '../seo/config.js'
import './Home.css'

const fade = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
}

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESC,
      inLanguage: 'kk',
    },
    {
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}/#collection`,
      name: SITE_NAME,
      url: SITE_URL,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: figures.map((f, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: abs(`/tulga/${f.slug}`),
          name: f.name,
        })),
      },
    },
  ],
}

export default function Home() {
  return (
    <div className="home">
      <Seo
        title="Түркістан топырағында дүниеге келген тұлғалар"
        description={SITE_DESC}
        path="/"
        image={figures[0]?.portrait}
        jsonLd={homeJsonLd}
      />
      <section className="wrap home__hero">
        <motion.span
          className="label"
          {...fade}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
        >
          Тарихи тұлғалар жинағы
        </motion.span>

        <motion.h1
          className="home__title"
          {...fade}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 0.61, 0.36, 1] }}
        >
          Түркістан топырағында
          <br />
          дүниеге келген тұлғалар
        </motion.h1>

        <motion.p
          className="home__intro"
          {...fade}
          transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 0.61, 0.36, 1] }}
        >
          Қасиетті өлкеде туып, ел игілігі үшін еңбек еткен ұрпақтардың өмірбаяны
          мен мұрасына арналған жинақ. Әр тұлға — туған жердің тарихи жадының бір
          парағы.
        </motion.p>
      </section>

      <section className="wrap home__list">
        <div className="home__list-head">
          <span className="label">Тұлғалар</span>
          <span className="label">{String(figures.length).padStart(2, '0')}</span>
        </div>
        <hr className="rule" />

        {figures.map((figure, i) => (
          <div key={figure.slug}>
            <FigureCard figure={figure} index={i} />
            <hr className="rule" />
          </div>
        ))}
      </section>
    </div>
  )
}
