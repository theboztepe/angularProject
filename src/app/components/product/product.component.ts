import { CartService } from './../../services/cart.service';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  productLoaded: boolean = false;
  filterText = '';
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private cartService:CartService,
  ) {}

  ngOnInit(): void {
    //başlangıçta çalışır
    this.activatedRoute.params.subscribe((params) => {
      //route bilgilerine göre işlem yapacak
      if (params['categoryId']) {
        //categoryId si varsa
        this.getProductsByCategory(params['categoryId']);
      } else {
        this.getProducts();
      }
    });
  }

  getProducts() {
    //tüm listeyi alma
    this.productService.getProducts().subscribe((response) => {
      this.products = response.data;
      this.productLoaded = true;
    });
  }

  getProductsByCategory(categoryId: number) {
    //kategoriye göre data alma
    this.productService
      .getProductsByCategory(categoryId)
      .subscribe((response) => {
        this.productLoaded = false;
        this.products = response.data;
        this.productLoaded = true;
      });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.toastrService.success(product.productName + " sepete eklendi!")
  }
}
