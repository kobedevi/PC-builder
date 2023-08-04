import { PossibleRoutes } from 'core/routing'
import React from 'react'
import { Link } from 'react-router-dom'

const Banner = () => {
  return (
    <div className="background">
        <div className="gradient"></div>
        <div className='bannerParent'>
          {/* Screen reader optimising */}
          <h1 aria-hidden="true">PC&nbsp;<div style={{position:"relative"}}><span>BUILD</span></div>ER</h1>
          <h1 style={{display:"none"}}>PC BUILDER</h1>
          <Link to={PossibleRoutes.Builder} className='CTA btn btn-outline-light'>Start building</Link>
        </div>
    </div>
  )
}

export default Banner