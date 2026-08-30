import headerLogo from '/assets/images/logo.svg'

export default function Header({currenciesLength}) {
  return (
    <header className="header container">
      <a className="header__home-link">
        <img className="header__logo" src={headerLogo}></img>
      </a>
      <ul className='header__info-list'>
        <li className='header__info-item'>
          {currenciesLength} Currencies
        </li>
        <li className='header__info-item'>
          EOD
        </li>
        <li className='header__info-item'>
          ECB DATA
        </li>
      </ul>
    </header>
  )
}