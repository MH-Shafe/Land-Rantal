import React, { useContext } from "react";
import { useRouter } from "next/router";
import { ShopContext } from "./shop-context";
import { Products } from "./products";
import CartItem from "./CartItem";

const Cart = () => {
  const { cartItems, getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const router = useRouter();

  const backToTheShoping = () =>{
    router.push(`/Shop`);
  }
 

  return (
    <div className="cart">
      <div>
        <h1 className=" font-serif text-5xl">Your cart</h1>
      </div>
      <div className="cartItems">
        {Products.map((product) => {
          if (cartItems[product.id] !== 0) {
            return <CartItem data={product} />;
          }
        })}
      </div>
      <div className="checkout">
        <p>Total:{totalAmount} tk</p>
        <button onClick={backToTheShoping} > Continue shopping </button>
        <button> Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
