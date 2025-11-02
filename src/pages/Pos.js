import { useState, useEffect } from "react";
import Products from "../components/Products/Products";
import Basket from "../components/Cart/Cart";
import { useDefaultRateDiscount } from "../hooks/useDefaultRateDiscount";

function Pos() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const hold = JSON.parse(localStorage.getItem("holdOrder"));
    if (hold && hold.length > 0) {
      setCartItems(hold);
    }
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("holdOrder", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  //apply discount and vat for once
  useDefaultRateDiscount();

  const resetCartItems = () => {
    setCartItems([]);
    localStorage.removeItem("holdOrder");
  };

  // add+
  const onAdd = (product) => {
    const exist = cartItems.find((item) => item.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...item, qty: exist.qty + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  // remove-
  const onRemove = (product) => {
    const exist = cartItems.find((item) => item.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((item) => item.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...item, qty: exist.qty - 1 } : item
        )
      );
    }
  };

  return (
    <>
      <div className="flex h-full">
        <div className="w-[56%] h-full scroll-left">
          <Products onAdd={onAdd} />
        </div>

        <Basket
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          resetCartItems={resetCartItems}
        />
      </div>
    </>
  );
}

export default Pos;
