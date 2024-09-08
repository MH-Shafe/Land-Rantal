// pages/details/[id].js
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Products } from "../products";

const Details = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    console.log("ID:", id); // Add this line
  const fetchedProduct = Products.find(
    (product) => product.id === parseInt(id, 10)
  );

    if (fetchedProduct) {
      setProduct(fetchedProduct);
    } else {
      console.error(`Product with ID ${id} not found.`);
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-10">
      <div className="flex flex-col items-center bg-gradient-to-b from-gray-200 to-gray-300 text-gray-700 w-80 max-w-500 mx-auto rounded-md shadow-md overflow-hidden transition-transform  ease-in-out duration-300 hover:transform hover:scale-102 hover:shadow-lg">
        <img
          src={product.productImage}
          alt={product.productName}
          className="w-full rounded-t-md overflow-hidden"
        />
        <div className="p-20 text-center">
          <h1 className="text-3xl mb-4 text-gray-800">{product.productName}</h1>
          <p className="text-2xl mb-2 text-red-600">Price: ${product.Price}</p>
          <p className="text-lg leading-6 text-gray-700">
            Description: {product.productDescription}
          </p>
          {/* Add more details as needed */}
        </div>
      </div>
    </div>
  );
};

export default Details;
