// import { ICart } from "../interfaces/ICart";
import data from "../data.json";


export class Cart {

  static getCart() {
    let cart: number[] = JSON.parse(localStorage.getItem('cart')!)
    if (cart && cart.length > 0) {
      return cart;
    } else {
      return [];
    }
  }

  static addItem(id: number) {
    const cart = Cart.getCart();
    localStorage.setItem('cart', JSON.stringify([...cart,id]))
  }

  static removeOneItem(id: number) {
    const cart = Cart.getCart()
    cart.splice(cart.indexOf(id),1)
    localStorage.setItem('cart', JSON.stringify(cart))
    return cart.sort()
  }

  static removeItems(id: number) {
    const cart = Cart.getCart()
    return cart.filter(i => i !== id);
  }

  static display(carts: number[]) {
    const items: {id: number, qty: number,}[] = []
    carts.forEach(cart => {
      const item = items.find(item => item.id === cart);
      if (item) {
        item.qty += 1
      } else {
        items.push({
          id: cart,
          qty: 1,
        })
      }
    })
    return items.sort()
  }

  static getSum(cart: number[]){
    const items = Cart.display(cart);
    let sum = 0;

    items.forEach(i => {
      sum += data.find(d => d.id === i.id)!.price * i.qty;
    })

    return sum/100;
  }
  
}