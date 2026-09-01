import { getPreviousDay, formatDate } from '../helpers/functions'
import { useCurrencies } from '../helpers/hooks'
import Error from './Error'
import Loading from './Loading'
import companyIcon from '/assets/images/logo.svg'


export default function Header({PROVIDER, currencies}) {

  return (
    <>
      <div className="header container">
        <img src={companyIcon}></img>
        <div className='header__source-data'>
          <span className='header__currency-count'>
            {currencies.length} CURRENCIES </span>
          <span className='header__sponsor'>· EOD ·</span>
          <span className='header__provided'> {PROVIDER}</span>
        </div>
      </div>
    </>
  )
}