import { Link } from "react-router-dom"

const CtaButton = ({children, to:givenRoute = null, className = null}) => {
  return (
    <Link to={givenRoute} className={className}>
        {children}
    </Link>
  )
}

export default CtaButton