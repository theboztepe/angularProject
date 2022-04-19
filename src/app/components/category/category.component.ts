import { Category } from './../../models/category';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  categoryLoaded: boolean = false;
  currentCategory: Category;
  constructor(private productService: CategoryService) {}

  ngOnInit(): void { //başlangıçta çalışır
    this.getProducts();
  }

  getProducts() { //data alma
    this.productService.getCategorys().subscribe((response) => {
      this.categories = response.data;
      this.categoryLoaded = true;
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

  }
  getAllCategoryClass(){
    if(!this.currentCategory){
      return "list-group-item active"
    }
    else{
      return "list-group-item"
    }
  }
}
