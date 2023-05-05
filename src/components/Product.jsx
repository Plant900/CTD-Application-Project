import styles from './Product.module.css'

export const Product = ({
  name,
  quantity,
  sprite,
  handleDeleteClick,
  increaseQuantity,
  decreaseQuantity,
}) => {
  return (
    <div className={styles.product}>
      <img src={sprite} alt={name} />
      <div>
        <h2>{name}</h2>
        <p>{quantity} in stock</p>
      </div>
      <div>
        <button onClick={() => decreaseQuantity(name)}>-</button>
        <button onClick={() => increaseQuantity(name)}>+</button>
      </div>
      <button onClick={() => handleDeleteClick(name)}>Delete</button>
    </div>
  )
}
