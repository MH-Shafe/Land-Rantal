import React, { useContext } from "react";
import { ShopContext } from "./shop-context";
import Image from "next/image";

const CartItem = (props) => {
  const { id, productName, Price, productImage } = props.data;
  console.log(props.data);
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } =
    useContext(ShopContext); 
  
  return (
    <div className="cartItem bg-white w-56 h-20 flex items-center shadow-md rounded-sm my-8 mx-4 p-2">
      <Image src={productImage} className="w-48 ml-4" alt={productName}width={200} height={200} />
      <div className="description flex-1 text-lg ml-8">
        <p className="font-bold">{productName}</p>
        <p className="mt-2 mb-2">{Price} tk</p>
        <div className="countHandler flex items-center">
          <button onClick={() => removeFromCart(id)} className="px-2 py-1 border">
            -
          </button>
          <input
            value={cartItems[id]}
            onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
            className="w-12 text-center font-bold"
          />
          <button onClick={() => addToCart(id)} className="px-2 py-1 border">
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
