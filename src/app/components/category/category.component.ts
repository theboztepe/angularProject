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
    this.getCategories();
  }

  getCategories() { //data alma
    this.productService.getCategories().subscribe((response) => {
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
}
