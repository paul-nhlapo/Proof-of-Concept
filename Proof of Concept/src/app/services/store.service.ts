import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private baseUrl = 'http://localhost:5240/api/Store';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  // Retrieves a list of products from the server
  getProducts(): Observable<Product[]> {
    return this.http.get<any>(`${this.baseUrl}/ProductListing`, this.httpOptions).pipe(
      tap(response => {
        return response;
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  // Adds a new product to the server
  addProduct(product: Product): Observable<any> {
    console.log(product);
    return this.http.post<any>(`${this.baseUrl}/AddProduct`, product, this.httpOptions).pipe(
      tap(response => {
        return response;
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  // Retrieves a list of product types from the server
  getProductTypes(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/ProductTypes`, this.httpOptions).pipe(
      tap(response => {
        return response;
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  // Retrieves a list of brands from the server
  getBrands(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Brands`, this.httpOptions).pipe(
      tap(response => {
        return response;
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  // Retrieves a specific product from the server based on its ID
  getProduct(productId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Product/${productId}`, this.httpOptions).pipe(
      tap(response => {
        console.log(response);
        return response;
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Product } from '../models/product.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class StoreService {
//   private apiUrl = 'http://localhost:5240/api/store';

//   constructor(private http: HttpClient) {}

//   getBrands(): Observable<any> {
//     return this.http.get(`${this.apiUrl}/Brands`);
//   }

//   getProductTypes(): Observable<any> {
//     return this.http.get(`${this.apiUrl}/ProductTypes`);
//   }

//   getProductById(id: number): Observable<Product> {
//     return this.http.get<Product>(`${this.apiUrl}/ProductById/${id}`);
//   }

//   getProductListing(): Observable<Product[]> {
//     return this.http.get<Product[]>(`${this.apiUrl}/ProductListing`);
//   }

//   addProduct(product: any): Observable<Product> {
//     return this.http.post<Product>(`${this.apiUrl}/AddProduct`, product);
//   }
// }
