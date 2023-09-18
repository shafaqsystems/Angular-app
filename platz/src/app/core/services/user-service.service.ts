import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, map } from 'rxjs';
import { API_ROUTES } from '../constants/api-routes';
import { ApiService } from './api-service.service';
import { JwtService } from './jwt-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<any>({});
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();
  
  constructor( private apiService: ApiService,
    private jwtService: JwtService) { }
    
  login(credentials: any): Observable<any> {
    let url = API_ROUTES.LOGIN;
    return this.apiService.post(url, credentials).pipe(
      map((data) => {
        if (data) {
          this.setAuth(data);
          return data;
        } else {
          return null;
        }
      })
    );
  }
  getProducts(offset: number, limit: number){
    return this.apiService.get(API_ROUTES.PRODUCT_LIST + `?offset=${offset}&limit=${limit}`).pipe(
      map((data) => {
        if (data) {
          return data;
        } else {
          return null;
        }
      })
    );
  }
  getProductDetail(id?:number){
    return this.apiService.get(API_ROUTES.PRODUCT_LIST + id).pipe(
      map((data) => {
        if (data) {
          return data;
        } else {
          return null;
        }
      })
    );
  }
  getCategoryList(){
    return this.apiService.get(API_ROUTES.CATEGORY_LIST).pipe(
      map((data) => {
        if (data) {
          return data;
        } else {
          return null;
        }
      })
    );
  }
  getCategoryDetails(id:number){
    return this.apiService.get(API_ROUTES.CATEGORY_LIST + id).pipe(
      map((data) => {
        if (data) {
          return data;
        } else {
          return null;
        }
      })
    );
  }
  createCategory(payload: any) {
    return this.apiService.post(API_ROUTES.CREATE_CATEGORY, payload).pipe(
      map((data) => {
        if (data) {
          return data;
        } else {
          return null;
        }
      })
    );
  }
  updateCategory(id:number,payload: any) {
    return this.apiService.put(API_ROUTES.CREATE_CATEGORY + `${id}`, payload).pipe(
      map((data) => {
        if (data) {
          return data;
        } else {
          return null;
        }
      })
    );
  }
  createProduct(payload:any){
    return this.apiService.post(API_ROUTES.CREATE_PRODUCT, payload).pipe(
      map((data) => {
        if (data) {
          return data;
        } else {
          return null;
        }
      })
    );
  }
  updateProduct(id:number,payload: any){
    return this.apiService.put(API_ROUTES.CREATE_PRODUCT + `${id}`, payload).pipe(
      map((data) => {
        if (data) {
          return data;
        } else {
          return null;
        }
      })
    );
  }
  getUsers(){
    return this.apiService.get(API_ROUTES.USERS).pipe(
      map((data) => {
        if (data) {
          return data;
        } else {
          return null;
        }
      })
    );
  }
  getUserDetail(id:number){
    return this.apiService.get(API_ROUTES.USERS + `${id}`).pipe(
      map((data) => {
        if (data) {
          return data;
        } else {
          return null;
        }
      })
    );
  }
  createUser(payload:any){
    return this.apiService.post(API_ROUTES.USERS, payload).pipe(
      map((data) => {
        if (data) {
          return data;
        } else {
          return null;
        }
      })
    );
  }
  updateUser(id:number,payload: any){
    return this.apiService.put(API_ROUTES.USERS + `${id}`, payload).pipe(
      map((data) => {
        if (data) {
          return data;
        } else {
          return null;
        }
      })
    );
  }
  userAvailability(payload:any){
    return this.apiService.post(API_ROUTES.IS_AVAILABLE , payload).pipe(
      map((data) => {
        if (data) {
          return data;
        } else {
          return null;
        }
      })
    );
  }
  setAuth(user:any) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user?.access_token);
    this.isAuthenticatedSubject.next(true);
    this.currentUserSubject.next(user);
  }

  getCurrentUser() {
    return this.currentUserSubject.value;
  }
}
