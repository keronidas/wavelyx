import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClient);
  private url = environment.apiUrl;
  private apiUrl = `${this.url}/productos`
  constructor() { }
  getProductos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

}
