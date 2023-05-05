import { useState } from 'react'
import styles from './Browse.module.css'

export const Browse = ({ berryTypes, handleAddBerry }) => {
  const [quantityInput, setQuantityInput] = useState(0)
  const [openFields, setOpenFields] = useState([])

  const handleInputChange = (event) => {
    setQuantityInput(event.target.value)
  }

  const handleOpenFieldClick = (index) => {
    setOpenFields((prevOpenFields) => {
      if (prevOpenFields.includes(index)) {
        return prevOpenFields.filter((i) => i !== index)
      } else {
        return [index]
      }
    })
    setQuantityInput(0)
  }

  const handleAddClick = (berry, index) => {
    if (quantityInput == 0) {
      return
    }
    handleAddBerry(berry, quantityInput)
    setOpenFields((prevOpenFields) => prevOpenFields.filter((i) => i !== index))
    setQuantityInput(0)
  }

  const handleCloseFieldClick = (index) => {
    setOpenFields((prevOpenFields) => prevOpenFields.filter((i) => i !== index))
    setQuantityInput(0)
  }

  return (
    <div className={styles.browse}>
      {berryTypes.map((berry, index) => (
        <div key={index} className={styles['browse-item']}>
          <img src={berry.sprite} alt={berry.name} />
          <h2>{berry.name}</h2>
          {openFields.includes(index) ? (
            <div className={styles.open}>
              <input
                type="number"
                value={quantityInput}
                onChange={handleInputChange}
                min="0"
                onKeyPress={(event) => {
                  const keyValue = event.key
                  if (!/^\d+$/.test(keyValue)) {
                    event.preventDefault()
                  }
                }}
              />
              <button onClick={() => handleAddClick(berry, index)}>Add</button>
              <button onClick={() => handleCloseFieldClick(index)}>
                Close
              </button>
            </div>
          ) : (
            <button onClick={() => handleOpenFieldClick(index)}>+</button>
          )}
        </div>
      ))}
    </div>
  )
}
