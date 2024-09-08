import React from 'react'
import DisplayImage from "../../public/Assets/discount.png";

const Discount = () => {
  return (
    <div>
        <div
        className="flex-shrink-0 w-full h-[80vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${DisplayImage.src})` }}></div>
    </div>
  )
}

export default Discount