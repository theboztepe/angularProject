import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryResponseModel } from '../models/categoryResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiUrl: string = 'https://localhost:44335/api/categories/getall';
  constructor(private httpClient: HttpClient) {}

  getCategorys(): Observable<CategoryResponseModel> {
    return this.httpClient.get<CategoryResponseModel>(this.apiUrl);
  }
}
