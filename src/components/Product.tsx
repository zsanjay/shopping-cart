import { ProductType } from "../context/ProductsProvider"
import { ReducerActionType, ReducerAction } from "../context/CartProvider"
import { ReactElement, memo } from "react"

type ProductProps = {
    product : ProductType,
    dispatch : React.Dispatch<ReducerAction>,
    REDUCER_ACTIONS : ReducerActionType,
    inCart : boolean
}

const Product = ({product, dispatch, REDUCER_ACTIONS , inCart} : ProductProps) : ReactElement => {

   const relativePath = "../images/" + product.sku + '.jpg';
   const img: string = new URL(relativePath, import.meta.url).href

   const onAddToCart = () => dispatch({type : REDUCER_ACTIONS.ADD , payload : {...product , qty : 1}});

   const itemInCart = inCart ? ' Item in Cart ': null

   const content = <article className="product">
        <h3>{product.name}</h3>
        <img src={img} alt={product.name} className="product__img"/>
        <p>{new Intl.NumberFormat('en-US', { style : 'currency', currency : 'USD' }).format(product.price)}
        {itemInCart}</p>
        <button onClick={onAddToCart}>Add to Cart</button>
   </article>

  return content;
}

function areProductsEqual({product : prevProduct, inCart : prevInCart} : ProductProps, {product : nextProduct, inCart : nextInCart} : ProductProps) {
    return Object.keys(prevProduct).every(key => {
        return prevProduct[key as keyof ProductType] === nextProduct[key as keyof ProductType]
    }) && prevInCart === nextInCart
}

const MemoizedProduct = memo<typeof Product>(Product, areProductsEqual)

export default MemoizedProduct