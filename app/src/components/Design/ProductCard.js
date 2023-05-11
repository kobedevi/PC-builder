import { Link, Routes } from "react-router-dom"
import DeleteButton from "./DeleteButton"
import { route, PossibleRoutes } from "core/routing"

const ProductCard = ({product, id, deleter}) => {
  return (
    <div className='movieCard mt-4 mb-4'>
        <DeleteButton deleter={() => deleter(product)}/>
        <Link to={route(PossibleRoutes.CpuDetail, {id})}>
            <img src={`${product.image ? product.image : "./no-image.svg" }`} alt='Product preview'/>
        </Link>
        <Link to={route(PossibleRoutes.CpuDetail, {id})}>
            <section>
                <p className='coverTitle mt-2 mb-0'>{product.modelName}</p>
            </section>
        </Link>
    </div>
  )
}

export default ProductCard