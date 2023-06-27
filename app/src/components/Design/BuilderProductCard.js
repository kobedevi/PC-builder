import { Link, Routes } from "react-router-dom"
import DeleteButton from "./DeleteButton"
import { route } from "core/routing"

const BuilderProductCard = ({product, subtitle, link, id, img=true, children}) => {

  return (
    <div className='productCard mt-4 mb-4'>
        {
          img && (
            <>
              <img src={`${product.image ? product.image : "../no-image.svg" }`} alt='Product preview'/>
              <section>
                  <p className='coverTitle mt-2 mb-0'>{product.modelName}</p>
                  {
                    subtitle && <h6 className='subTitle mt-1 mb-2'>{subtitle}</h6>
                  }
                  {
                    children && <>{children}</>
                  }
              </section>
            </>
          )
        }
        {
          !img && (
            <>
              <Link to={route(link, {id})}>
                <section className="noImg">
                  <p className='coverTitle mt-0 mb-0'>{product.modelName}</p>
                  {
                    children && <p className="coverYear mb-0">{children}</p>
                  }
                </section>
              </Link>
            </>
          )
        }

    </div>
  )
}

export default BuilderProductCard