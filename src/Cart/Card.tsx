import data from "../data.json";
import { RiAddFill, RiSubtractFill, RiDeleteBin5Fill } from "react-icons/ri";
import { useContext } from "react";
import { CartContext } from "./cartContext";
import { Cart } from "./Cart";

export default function CardShop(props: {
  id: number;
  qty: number;
}) {
  const product = data.find((d) => d.id === props.id);
  const { cart, setCart } = useContext(CartContext);

  // useEffect(()=>{

  // },[])

  return (
    <div className="flex p-2 w-full bg-slate-100 rounded-xl h-fit ">
      <div
        className=" bg-cover bg-center w-[150px] h-[100px] rounded-lg"
        style={{ backgroundImage: `url(${product?.image})` }}
      />
      
      <div className=" w-full ml-4 grid grid-cols-2 grid-rows-2 gap-2">
        <h2 className="text-xl font-kalam font-bold whitespace-nowrap">
          {product?.title}
        </h2>
        <h2 className="w-full text-right font-kalam font-bold text-xl">
          {(product!.price / 100).toFixed(2)}€
        </h2>

        <div className=" col-span-full   grid grid-cols-2">
          <div className=" w-fit h-fit grid grid-cols-3 border-2 rounded-full bg-slate-400">
            <div>
              <div
                className="border border-black w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-black text-white cursor-pointer text-center flex justify-center items-center"
                onClick={() => setCart(Cart.removeOneItem(props.id))}
              >
                <RiSubtractFill />
              </div>
            </div>
           
           <div className="grid content-center">
            <p className=" text-center flex justify-center items-center">
                {cart.filter((i) => i === props.id).length}
              </p>
           </div>
            
            <div className="flex justify-end">
              <div
                className="border border-black w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-black text-white cursor-pointer flex justify-center items-center"
                onClick={() => setCart([...cart, props.id])}
              >
                <RiAddFill />
              </div>
            </div>
          </div>


          <div className="flex justify-end">
            <div
              className="border border-black w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-black text-red-500 cursor-pointer text-center flex justify-center items-center"
              onClick={() => {
                setCart(Cart.removeItems(props.id));
              }}
            >
              <RiDeleteBin5Fill />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
