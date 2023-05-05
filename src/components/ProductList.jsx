import { Product } from './Product'
import styles from './ProductList.module.css'

export const ProductList = ({
  products,
  handleDeleteClick,
  increaseQuantity,
  decreaseQuantity,
}) => {
  return (
    <div className={styles['product-list']}>
      {products.map((product, index) => (
        <Product
          key={product.name}
          {...product}
          handleDeleteClick={handleDeleteClick}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
        />
      ))}
    </div>
  )
}
