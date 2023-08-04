import { Link, Routes } from "react-router-dom"
import DeleteButton from "./DeleteButton"
import { route } from "core/routing"

const BuilderProductCard = ({
  setProductInfo=null,
  product, 
  subtitle, 
  link, 
  id, 
  img=true, 
  children
}) => {

  return (
    <div className='productCard mt-4 mb-4' >
        {
          img && (
            <>
              <img onClick={() => setProductInfo(id)} style={{cursor:"pointer"}}src={`${product.image ? product.image : "../no-image.svg" }`} alt='Product preview'/>
              <section>
                  {
                    product && <p onClick={() => setProductInfo(id)} className='coverTitle mt-0 mb-0, productTitle' title="Click for more info">{product.modelName}</p>
                  }
                  {
                    subtitle && <h6 onClick={() => setProductInfo(id)} style={{cursor:"pointer"}} className='subTitle mt-1 mb-2'>{subtitle}</h6>
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
                  {
                    product && <p className='coverTitle mt-0 mb-0'>{product.modelName}</p>
                  }
                  
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