import { Product } from './../models/product';
import { Injectable } from '@angular/core';
import { CartItem } from '../models/cartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}

  addToCart(product: Product) {
    let LocalCartItems:CartItem[] = JSON.parse(localStorage.getItem("cartItem"));
    let item = LocalCartItems.find((c) => c.product.productId === product.productId);
    if (item) {
      item.quantity += 1;
      localStorage.setItem("cartItem", JSON.stringify(LocalCartItems))
    } else {
      let cartItem = new CartItem();
      cartItem.product = product;
      cartItem.quantity = 1;
      LocalCartItems.push(cartItem);
      localStorage.setItem("cartItem", JSON.stringify(LocalCartItems))
      this.list()
    }
  }

  removeFromCart(product: Product) {
    let LocalCartItems:CartItem[] = JSON.parse(localStorage.getItem("cartItem"));
    let item: CartItem = LocalCartItems.find(
      (cart) => cart.product.productId === product.productId
    )!;
    LocalCartItems.splice(LocalCartItems.indexOf(item), 1);
    localStorage.setItem("cartItem", JSON.stringify(LocalCartItems))
    this.list()
  }

  list(): CartItem[] {
    return JSON.parse(localStorage.getItem("cartItem"));
  }
}
