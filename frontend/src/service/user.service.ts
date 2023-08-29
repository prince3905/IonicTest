import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any[]> {
    const url = `${this.baseUrl}/users`;
    return this.http.get<any[]>(url);
  }

  deleteUser(userId: number): Observable<void> {
    const url = `${this.baseUrl}/users/${userId}`;
    return this.http.delete<void>(url);
  }

  addUser(data: any){
    return this.http.post(`${this.baseUrl}/users`, data);
  }
}
