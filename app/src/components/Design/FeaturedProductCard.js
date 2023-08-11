import { Link, Routes } from "react-router-dom"
import { route } from "core/routing"


const FeaturedProductCard = ({
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
              <figure style={{cursor:"pointer"}}>
                <img draggable="false" className="large"src={`${product.case_image ? product.case_image : "/no-image.svg" }`} alt='Case preview'/>
                <div>
                  <img draggable="false" src={`${product.cpu_image ? product.cpu_image : "/no-image.svg" }`} alt='Cpu preview'/>
                  <img draggable="false" src={`${product.gpu_image ? product.gpu_image : "/no-image.svg" }`} alt='Gpu preview'/>
                </div>
              </figure>
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

export default FeaturedProductCard