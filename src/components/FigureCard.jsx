import { Link } from 'react-router-dom'
import './FigureCard.css'

export default function FigureCard({ figure }) {
  return (
    <article className="fig-card">
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
    </article>
  )
}
