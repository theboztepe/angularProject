import { Category } from './../../models/category';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  categoryLoaded:boolean = false;
  constructor(private productService: CategoryService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getCategorys().subscribe((response) => {
      this.categories = response.data;
      this.categoryLoaded = true;
    });
  }
}
