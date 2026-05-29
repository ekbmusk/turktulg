import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './FigureCard.css'

export default function FigureCard({ figure, index }) {
  return (
    <motion.article
      className="fig-card"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1], delay: index * 0.08 }}
    >
      <Link to={`/tulga/${figure.slug}`} className="fig-card__link">
        <div className="fig-card__frame">
          <img
            className="fig-card__img archival"
            src={figure.portrait}
            alt={figure.name}
            loading="lazy"
          />
          <span className="fig-card__years">{figure.born}</span>
        </div>
        <div className="fig-card__body">
          <h3 className="fig-card__name">{figure.name}</h3>
          <p className="fig-card__role">{figure.role}</p>
          <span className="fig-card__more label">Толығырақ →</span>
        </div>
      </Link>
    </motion.article>
  )
}
