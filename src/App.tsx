import React, { useEffect, useState } from "react";
import Card from "./Product/Card";
import data from "./data.json";
import { IProduct } from "./interfaces/IProduct";
import { RiShoppingBag2Fill, RiCloseCircleFill } from "react-icons/ri";
import { Cart } from "./Cart/Cart";
import CardShop from "./Cart/Card";
import { CartContext } from "./Cart/cartContext";

function App() {
  const [entre, setEntre] = useState(true);
  const [repas, setRepas] = useState(false);
  const [boisson, setBoisson] = useState(false);
  const [dessert, setDessert] = useState(false);
  const [displayShop, setDisplayShop] = useState(false);

  const storageCart = JSON.parse(localStorage.getItem("cart")!);
  const [cart, setCart] = useState(storageCart ? storageCart : []);

  const cartValue = { cart, setCart };

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const clearAll = () => {
    setEntre(false);
    setRepas(false);
    setBoisson(false);
    setDessert(false);
  };

  const clickRepas = () => {
    if (!repas) {
      clearAll();
      setRepas(true);
    }
  };

  const clickBoisson = () => {
    if (!boisson) {
      clearAll();
      setBoisson(true);
    }
  };

  const clickEntre = () => {
    if (!entre) {
      clearAll();
      setEntre(true);
    }
  };

  const clickDessert = () => {
    if (!dessert) {
      clearAll();
      setDessert(true);
    }
  };

  const dataResult = () => {
    switch (true) {
      case entre:
        return data.filter(
          (product: IProduct) => product.category === "entree"
        );

      case repas:
        return data.filter((product: IProduct) => product.category === "repas");

      case dessert:
        return data.filter(
          (product: IProduct) => product.category === "dessert"
        );
      case boisson:
        return data.filter(
          (product: IProduct) => product.category === "boisson"
        );

      default:
        return data;
    }
  };

  const currentSelected = () => {
    switch (true) {
      case entre:
        return "entre";
      case repas:
        return "repas";
      case dessert:
        return "dessert";
      case boisson:
        return "boisson";
      default:
        return "entre";
    }
  };

  const handleSelect = (selected: string) => {
    switch (selected) {
      case "entre":
        clickEntre();
        break;

      case "repas":
        clickRepas();
        break;

      case "dessert":
        clickRepas();
        break;

      case "boisson":
        clickBoisson();
        break;

      default:
        clickEntre();
        break;
    }
  };

  const handleDisplay = () => {
    setDisplayShop(!displayShop);
  };

  const displayShopsItem = () => {
    if (Cart.display(cart).length > 0 && cart.length > 0) {
      return Cart.display(cart).map((item) => {
        return <CardShop key={item.id} id={item.id} qty={item.qty} />;
      });
    } else {
      return (
        <div className="text-center font-anton text-3xl">Panier vide !</div>
      )
    }
  };

  return (
    <CartContext.Provider value={cartValue}>
      <div
        className=" min-h-screen bg-gradient-to-b from-cyan-300 to-blue-600"
        // style={{ backgroundImage: `url(${"./images/bg.jpg"})` }}
      >
        <div className=" backdrop-brightness-25 backdrop-blur-[2px]">
          <div className="flex flex-col max-h-screen w-full ">
            <div>
              <div className="grid grid-cols-3 justify-around content-center p-2 ">
                <h1 className="col-start-2 flex self-center justify-center text-4xl font-anton font-medium text-black">
                  Restaurant
                </h1>

                <div
                  className="col-start-3 flex justify-end text-4xl  font-anton font-medium cursor-pointer"
                  onClick={() => handleDisplay()}
                >
                  <RiShoppingBag2Fill />
                  <span
                    className={`${
                      cart.length > 0 ? "" : "invisible"
                    } w-4 h-4 rounded-full bg-red-600 text-xs text-white text-center
                relative right-3`}
                  >
                    {cart.length > 9 ? "9+" : cart.length}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-[5%] p-4">
              <div className="hidden sm:grid justify-center grid-cols-4 gap-2">
                <div
                  className={`${entre ? "bg-red-600 text-white" : "text-black"}
                  border rounded-lg border-black
                  cursor-pointer hover:bg-red-600 hover:text-white`}
                  onClick={() => clickEntre()}
                >
                  <h2 className="font-anton text-2xl text-center">Entrée</h2>
                </div>
                <div
                  className={`${repas ? "bg-red-600 text-white" : "text-black"}
                  border rounded-lg border-black cursor-pointer hover:bg-red-600 hover:text-white`}
                  onClick={() => clickRepas()}
                >
                  <h2 className="font-anton text-2xl text-center">Plat</h2>
                </div>
                <div
                  className={`${
                    dessert ? "bg-red-600 text-white" : "text-black"
                  }
                  border border-black rounded-lg
                  cursor-pointer hover:bg-red-600 hover:rounded-r-lg hover:text-white`}
                  onClick={() => clickDessert()}
                >
                  <h2 className="font-anton text-2xl text-center">Dessert</h2>
                </div>
                <div
                  className={`${
                    boisson ? "bg-red-600 text-white" : "text-black"
                  }
                  border rounded-lg border-black cursor-pointer hover:bg-red-600 hover:text-white`}
                  onClick={() => clickBoisson()}
                >
                  <h2 className="font-anton text-2xl text-center">Boissons</h2>
                </div>
              </div>

              <div className="sm:hidden">
                <select
                  className="w-full border border-black bg-red-600 
                text-white font-kalam text-2xl text-center font-bold rounded-xl"
                  name="category"
                  id=""
                  value={currentSelected()}
                  onChange={(e) => handleSelect(e.target.value)}
                >
                  <option value="entre">Entrées</option>
                  <option value="repas">Repas</option>
                  <option value="dessert">Déssert</option>
                  <option value="boisson">Boisson</option>
                </select>
              </div>
            </div>

            <div className="mt-[5%] h-[100%] m-4 grid grid-cols-1 xl:grid-cols-2 gap-2 overflow-y-auto rounded-lg">
              {dataResult().map((product: IProduct) => {
                return (
                  <Card
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    image={product.image}
                    description={product.description}
                    prices={product.price}
                  />
                );
              })}
            </div>
          </div>
          <div
            className={`${
              displayShop ? "block" : "hidden"
            }  h-[100%] min-w-full top-[10%] p-4 absolute`}
          >
            <div
              className=" h-[100%] border-black rounded-lg bg-orange-100"
              // style={{ backgroundImage: `url(${"./images/bg-cart.jpg"})` }}
            >
              <div className="h-full w-full p-2 ">
                <div className="flex">
                  <h3 className=" mt-4 font-kalam text-4xl w-full text-center">
                    Mon panier
                  </h3>
                  <div
                    className=" cursor-pointer hover:text-red-600 text-2xl"
                    onClick={handleDisplay}
                  >
                    <RiCloseCircleFill />
                  </div>
                </div>

                <div className="mt-[5%] flex flex-col sm:grid sm:grid-cols-5 sm:gap-2 w-full h-[90%] sm:h-[80%] ">
                  <div className="w-full sm:col-span-4  h-[90%] overflow-auto">
                    <div className="w-full overflow-auto h-full grid grid-cols-1 content-start gap-2 ">
                      {displayShopsItem()}
                    </div>
                  </div>
                  <div className="grid col-span-4 sm:col-span-1 h-fit grid-cols-2 gap-2 w-[100%] rounded-lg bg-slate-100 p-2">
                    <p className=" font-kalam text-xl font-bold">Total :</p>
                    <p className=" font-kalam text-xl font-bold flex justify-end">
                      {Cart.getSum(cart).toFixed(2)} €
                    </p>
                    <button className={`col-span-2 font-anton text-xl text-white rounded-lg bg-red-600 
                    ${cart.length > 0 ? '' : 'cursor-not-allowed'}`}>
                      Payer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CartContext.Provider>
  );
}

export default App;
