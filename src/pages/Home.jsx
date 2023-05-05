import axios from 'axios'
import styles from './Home.module.css'
import { useState, useEffect } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import { ProductList } from '../components/ProductList'
import { Browse } from '../components/Browse'
import { ZeroProductModal } from '../components/ZeroProductModal'

export const Home = () => {
  const [products, setProducts] = useState([])
  const [berryTypes, setBerryTypes] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [zeroBerry, setZeroBerry] = useState()

  const getBerrySelection = (quantity) => {
    const berryList = []

    while (berryList.length < quantity) {
      let berryNo = getRandomInt(1, 65)
      const berry = berryTypes[berryNo - 1]

      if (
        berryList.some((existingBerry) => existingBerry.name === berry.name)
      ) {
        continue
      }

      berryList.push({
        ...berry,
        quantity: getRandomInt(1, 100),
      })
    }

    console.log(berryList)
    return berryList
  }

  const fetchAllBerries = async () => {
    let newBerryTypes = []

    const response = await axios.get(
      'https://pokeapi.co/api/v2/berry/?limit=65'
    )

    response.data.results.forEach((berry) => {
      newBerryTypes.push({
        name: `${berry.name} berry`,
        sprite: `https://github.com/PokeAPI/sprites/blob/master/sprites/items/berries/${berry.name}-berry.png?raw=true`,
      })
    })

    setBerryTypes(newBerryTypes)
  }

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const increaseQuantity = (name) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product.name === name && product.quantity === 0) {
          setShowModal(false)
          return { ...product, quantity: product.quantity + 1 }
        } else if (product.name === name && product.quantity > 0) {
          return { ...product, quantity: product.quantity + 1 }
        }
        return product
      })
    )
  }

  const decreaseQuantity = (name) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product.name === name && product.quantity > 1) {
          return { ...product, quantity: product.quantity - 1 }
        } else if (product.name === name && product.quantity === 1) {
          setZeroBerry(product.name)
          setShowModal(true)
          console.log(zeroBerry)
          return { ...product, quantity: product.quantity - 1 }
        }
        return product
      })
    )
  }

  const handleDeleteClick = (name) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.name !== name)
    )
  }

  const handleAddBerry = (berry, quantityInput) => {
    const existingBerry = products.find((product) => {
      console.log(product)
      return product.name === berry.name
    })

    if (existingBerry) {
      setProducts((prevProducts) =>
        prevProducts.map((product) => {
          if (product.name === berry.name) {
            return {
              ...product,
              quantity: product.quantity + parseInt(quantityInput),
            }
          }
          return product
        })
      )
    } else {
      setProducts((prevProducts) => [
        ...prevProducts,
        {
          ...berry,
          quantity: parseInt(quantityInput),
        },
      ])
    }
  }

  useEffect(() => {
    const getInventory = async () => {
      const response = await fetchAllBerries()
    }
    getInventory()
  }, [])

  useEffect(() => {
    console.log(berryTypes)
    const getBerries = async () => {
      const berries = await getBerrySelection(5)
      setProducts(berries)
    }

    if (berryTypes.length > 0) {
      getBerries()
    }
  }, [berryTypes])

  return (
    <div>
      <header className={styles.header}>
        <h1>Berry Inventory</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Berry List</Link>
            </li>
            <li>
              <Link to="/browse">Browse all berries</Link>
            </li>
            <li className={styles.tooltip}>
              <div className={styles.tooltipText}>
                Thanks for checking out my product tracking app! I believe this
                application meets all the requirements for the React Rubric for
                the CTD labs apprenticeship assignment. This project utilizes
                PokeAPI, which has information about items from the Pokemon
                video games. It also uses the EmailJS service, which allows
                emails to be sent when a berry's quantity reaches 0.
                <br />
                <br />
                In the other pinned projects on my Github page, I utilize
                Express for building APIs, Mongoose for communicating with
                MongoDB, Redux toolkit for state management, and more. Please
                give them a look too if you have time!
                <br />
                <br />I appreciate the opportunity and would love to join the
                CTD team.
              </div>
              <span>About</span>
            </li>
          </ul>
        </nav>
      </header>
      {showModal && (
        <ZeroProductModal
          onClose={() => setShowModal(false)}
          zeroBerry={zeroBerry}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <ProductList
              products={products}
              handleDeleteClick={handleDeleteClick}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
            />
          }
        />
        <Route
          path="/browse"
          element={
            <Browse berryTypes={berryTypes} handleAddBerry={handleAddBerry} />
          }
        />
      </Routes>
    </div>
  )
}
