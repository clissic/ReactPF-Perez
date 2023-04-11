import { createContext, useState } from 'react';

export const CartContext = createContext()

export const CartProvider = ({children}) => {
  const [cart, setCart] = useState([])

  const cartAddItem = (productToAdd) => {
    if(!isInCart(productToAdd.id)) {
      setCart(prev => [...prev, productToAdd])
    }
  }

  const removeItem = () => {

  }

  const getTotalQuantity = () => {
    let totalQuantity = 0
    cart.forEach(prod => {
        totalQuantity += prod.count
    });
    return totalQuantity
  }
  const totalQuantity = getTotalQuantity()

  const isInCart = (id) => {
    return cart.some(prod => prod.id === id)
  }

  console.log(cart)


    return (
      <CartContext.Provider value={{cart, cartAddItem, removeItem, totalQuantity}}>
        {children}
      </CartContext.Provider>
    )
}