import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getFigure } from '../data/figures.js'
import Seo from '../seo/Seo.jsx'
import { SITE_NAME, SITE_URL, abs } from '../seo/config.js'
import './Figure.css'

function buildJsonLd(figure, path) {
  const url = abs(path)
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${url}#person`,
        name: figure.name,
        url,
        jobTitle: figure.role,
        description: figure.lead,
        image: abs(figure.portrait),
        birthDate: figure.birthDateISO,
        birthPlace: { '@type': 'Place', name: figure.birthplaceFull || figure.birthplace },
        nationality: figure.nationality,
        award: figure.awards,
        knowsAbout: ['Мақта шаруашылығы', 'Агрономия', 'Түркістан тарихы'],
      },
      {
        '@type': 'ProfilePage',
        url,
        name: `${figure.name} — ${figure.role}`,
        about: { '@id': `${url}#person` },
        isPartOf: { '@id': `${SITE_URL}/#website` },
        inLanguage: 'kk',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: SITE_NAME, item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: figure.name, item: url },
        ],
      },
    ],
  }
}

const rise = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}
const ease = [0.22, 0.61, 0.36, 1]

export default function Figure() {
  const { slug } = useParams()
  const figure = getFigure(slug)

  if (!figure) return <Navigate to="/" replace />

  const path = `/tulga/${figure.slug}`
  const metaDesc = `${figure.name} — ${figure.role}. ${figure.lead} Туған жылы: ${figure.bornFull}, ${figure.birthplace}.`

  return (
    <article className="fig">
      <Seo
        title={`${figure.name} — ${figure.role}`}
        description={metaDesc}
        path={path}
        image={figure.portrait}
        type="profile"
        keywords={figure.keywords}
        jsonLd={buildJsonLd(figure, path)}
      />
      <div className="wrap">
        <motion.div {...rise} transition={{ duration: 0.5, ease }}>
          <Link to="/" className="fig__back label">
            ← Тұлғалар
          </Link>
        </motion.div>

        <header className="fig__head">
          <div className="fig__head-text">
            <motion.span className="label" {...rise} transition={{ duration: 0.6, ease }}>
              {figure.role}
            </motion.span>
            <motion.h1
              className="fig__name"
              {...rise}
              transition={{ duration: 0.8, delay: 0.08, ease }}
            >
              {figure.name}
            </motion.h1>
            <motion.p
              className="fig__lead"
              {...rise}
              transition={{ duration: 0.8, delay: 0.16, ease }}
            >
              {figure.lead}
            </motion.p>
            <motion.dl
              className="fig__facts"
              {...rise}
              transition={{ duration: 0.8, delay: 0.24, ease }}
            >
              <div>
                <dt className="label">Туған күні</dt>
                <dd>
                  <time dateTime={figure.birthDateISO}>{figure.bornFull}</time>
                </dd>
              </div>
              <div>
                <dt className="label">Туған жері</dt>
                <dd>{figure.birthplace}</dd>
              </div>
            </motion.dl>
          </div>

          <motion.figure
            className="fig__portrait"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
          >
            <img className="archival" src={figure.portrait} alt={figure.name} />
            <span className="fig__portrait-year">{figure.born}</span>
          </motion.figure>
        </header>

        <hr className="rule" />

        <div className="fig__body">
          <section className="fig__bio">
            <span className="label fig__section-label">Өмірбаяны</span>
            {figure.biography.map((para, i) => (
              <p key={i} className="fig__para">
                {para}
              </p>
            ))}
          </section>

          <aside className="fig__aside">
            <div className="fig__panel">
              <span className="label fig__section-label">Марапаттары</span>
              <ul className="fig__awards">
                {figure.awards.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>

            <div className="fig__panel">
              <span className="label fig__section-label">Өмір жолы</span>
              <ol className="fig__timeline">
                {figure.timeline.map((t, i) => (
                  <li key={i} className="fig__tl-item">
                    <span className="fig__tl-year">{t.year}</span>
                    <span className="fig__tl-text">{t.text}</span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>

        {figure.gallery?.length > 0 && (
          <section className="fig__gallery">
            <span className="label fig__section-label">Архив</span>
            {figure.gallery.map((g, i) => (
              <motion.figure
                key={i}
                className="fig__photo"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease }}
              >
                <img className="archival" src={g.src} alt={g.caption} loading="lazy" />
                <figcaption className="fig__caption">{g.caption}</figcaption>
              </motion.figure>
            ))}
          </section>
        )}
      </div>
    </article>
  )
}
