import CtaButton from 'components/Design/CtaButton'
import { PossibleRoutes } from 'core/routing'

const Banner = () => {
  return (
    <div className="background">
        <div className="gradient"></div>
        <div className='bannerParent'>
          {/* Screen reader optimizing */}
          <h1 aria-hidden="true">PC&nbsp;<div style={{position:"relative"}}><span>BUILD</span></div>ER</h1>
          <h1 style={{display:"none"}}>PC BUILDER</h1>
          <CtaButton to={PossibleRoutes.Builder} className='CTA btn btn-big'>Start building</CtaButton>
        </div>
    </div>
  )
}

export default Banner