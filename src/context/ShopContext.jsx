import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();

  async function addToCart(itemId, size) {
    if (!size) {
      toast.error("Please Select Product Size", {
        hideProgressBar: true,
        autoClose: 3000,
      });
      return;
    }

    setCartItems((cartItems) => {
      // Create a copy of the current cart items
      const updatedCartItems = { ...cartItems };

      // Check if the item already exists in the cart
      if (!updatedCartItems[itemId]) updatedCartItems[itemId] = {};

      // Check if the size exists for this item and update the count
      updatedCartItems[itemId][size] =
        (updatedCartItems[itemId][size] || 0) + 1;

      // Return the updated cart items
      return updatedCartItems;
    });
  }

  function getCartCount() {
    return Object.values(cartItems).reduce(
      (total, sizes) =>
        total + Object.values(sizes).reduce((sum, qty) => sum + qty, 0),
      0
    );
  }

  async function updateQuantity(itemId, size, quantity) {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
  }

  function getCartAmount() {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      let itemInfo = products.find((product) => product._id === itemId);
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0)
          totalAmount += itemInfo.price * cartItems[itemId][size];
      }
    }
    return totalAmount;
  }

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    addToCart,
    cartItems,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
