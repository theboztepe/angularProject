import { CartService } from './../../services/cart.service';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  productLoaded: boolean = false;
  filterText:string = '';
  productsLength:number = 0;

  categories: Category[] = [];
  categoryLoaded: boolean = false;
  currentCategory: Category;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private cartService:CartService,
  ) {}

  ngOnInit(): void {
    //başlangıçta çalışır
    this.activatedRoute.params.subscribe((params) => {
      //route bilgilerine göre işlem yapacak
      if(!this.categoryLoaded){
        this.getCategories();
      }
      
      if (params['categoryId']) {
        //categoryId si varsa
        this.getProductsByCategory(params['categoryId']);
      } else {
        this.getProducts();
      }
    });
  }

  getCategories() { //data alma
    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response.data;
      this.categoryLoaded = true;
      console.log(this.categoryLoaded)
    });
  }

  setCurrentCategory(category: Category) { //seçili kategori üzerinden işlem
    this.currentCategory = category;
  }

  getCurrentCategoryClass(category:Category){
    if(category==this.currentCategory){
      return "list-group-item active"
    }
    else{
      return "list-group-item"
    }
  }
  setAllCategory(){
    this.currentCategory = {categoryId: 0, categoryName: ''};
  }
  getAllCategoryClass(){
    if(!this.currentCategory){
      return "list-group-item active"
    }
    else{
      if(this.currentCategory.categoryId > 0){
        return "list-group-item"
      }
      else{
        return "list-group-item active"
      }
    }
  }

  getProducts() {
    //tüm listeyi alma
    this.productService.getProducts().subscribe((response) => {
      this.products = response.data;
      this.productLoaded = true;
      this.productsLength = response.data.length;
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
        this.productsLength = response.data.length;
      });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.toastrService.success(product.productName + " sepete eklendi!")
  }
}
