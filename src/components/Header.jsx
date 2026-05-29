import { Link } from 'react-router-dom'
import './Header.css'

export default function Header() {
  return (
    <header className="site-head">
      <div className="wrap site-head__inner">
        <Link to="/" className="site-head__mark" aria-label="Басты бет">
          <span className="site-head__mark-main">Түркістан</span>
          <span className="site-head__mark-sub">тұлғалары</span>
        </Link>
        <span className="label site-head__tag">Тарихи мұра</span>
      </div>
      <hr className="rule" />
    </header>
  )
}
