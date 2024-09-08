import React, { useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { ShopContext } from "../shop-context";

const Product = (props) => {
  const { id, productName, Price, productImage, productDescription } = props.data;
  const router = useRouter();
  const { addToCart } = useContext(ShopContext);

  const handleDetailsClick = () => {
    console.log(id);
    router.push(`./details/${id}`);
  };

  return (
    <div className="product max-h-[300px] flex items-start text-left">
  <div className="image-container">
    <Image src={productImage} alt={productName} width={150} height={150} className="object-cover w-full h-full" />
  </div>

  <div className="description leading-tight mt-0">
    <span className="text-[#273c75] font-bold text-md mb-0">
      {Price} Tk
    </span>
    <span className="text-sm font-semibold mb-0 block overflow-hidden whitespace-nowrap">
      {productName}
    </span>
    <span className="text-xs overflow-hidden whitespace-nowrap">
      {productDescription}
    </span>

    <div className="button w-[160px]">
  <button className="addToCartBtn text-sm mt-0 mb-0 w-[160px] h-6 flex items-center" onClick={() => addToCart(id)}>
    <span className="mx-auto">Add To Cart</span>
  </button>

  <button className="addToCartBtn text-sm mt-0 mb-0 w-[160px] h-6 flex items-center" onClick={handleDetailsClick}>
    <span className="mx-auto">Details</span>
  </button>
</div>
  </div>

  
</div>


  );
};

export default Product;
