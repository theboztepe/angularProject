import { Category } from './../models/category';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiUrl: string = 'https://localhost:44314/api/categories/getall';
  constructor(private httpClient: HttpClient) {}

  getCategorys(): Observable<ListResponseModel<Category>> {
    return this.httpClient.get<ListResponseModel<Category>>(this.apiUrl);
  }
}
