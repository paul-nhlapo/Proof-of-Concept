// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class ReportService {
//   private apiUrl = 'http://localhost:5000/api/Report/GenerateReport';
//
//   constructor(private http: HttpClient) { }
//
//   getReportData(): Observable<any> {
//     return this.http.get<any>(this.apiUrl);
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'http://localhost:5240/api/report';

  constructor(private http: HttpClient) {}

  generateReport(): Observable<any> {
    return this.http.get(`${this.apiUrl}/GenerateReport`);
  }
}
