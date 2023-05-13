import { Link, Routes } from "react-router-dom"
import DeleteButton from "./DeleteButton"
import { route } from "core/routing"

const ProductCard = ({product, link, id, deleter, children}) => {
  return (
    <div className='movieCard mt-4 mb-4'>
        <DeleteButton deleter={() => deleter(product)}/>
        <Link to={route(link, {id})}>
            <img src={`${product.image ? product.image : "./no-image.svg" }`} alt='Product preview'/>
        </Link>
        <Link to={route(link, {id})}>
            <section>
                <p className='coverTitle mt-2 mb-0'>{product.modelName}</p>
                {
                  children && <p className="coverYear mb-0">{children}</p>
                }
            </section>
        </Link>
    </div>
  )
}

export default ProductCard