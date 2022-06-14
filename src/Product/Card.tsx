import React, { useContext } from "react";
import { CartContext } from "../Cart/cartContext";

import { ICard } from "../interfaces/ICard";


export default function Card(props: ICard) {

  const { cart, setCart } = useContext(CartContext);
  
  return (
    <div className="w-full cursor-pointer grid grid-rows-4 sm:flex sm:content-center bg-orange-100 rounded-lg p-1">
      <div
        className=" row-span-2 bg-cover bg-center min-w-[150px] rounded-lg"
        style={{ backgroundImage: `url(${props.image})` }}
      />

      <div className="p-4">
        <h3 className="font-kalam font-bold text-2xl">{props.title}</h3>
        <div className="h-full">
          <h3 className="font-kalam font-medium text-xl underline">
            Description :
          </h3>
          <div className="w-full sm:w-[250px] ">
            <p>{props.description}</p>
          </div>
        </div>
      </div>

      <div className="w-full sm:h-[150px] sm:col-start-2 grid grid-cols-1 gap-1 items-center content-center p-2">
        <h2 className="font-anton text-3xl text-center ">
          {(props.prices / 100).toFixed(2)} €
        </h2>
        <div className="w-full flex justify-center">
          <div
            className="btnshop xl:w-full hover:bg-red-600 font-anton cursor-pointer text-red-600
                hover:text-white font-bold rounded-full p-2 border-2 
                border-red-600 hover:border-2 text-center"
            onClick={(e)=> {
              e.preventDefault()
              setCart([...cart, props.id])
            }}
          >
            Commander
          </div>
        </div>
      </div>
    </div>
  );
}
