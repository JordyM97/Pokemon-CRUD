import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  URL_API = environment.apiURL;

  constructor(private http: HttpClient) { }

  public apiCall(endpoint: string, method: any, data: any, data2 = null) {
    console.log(endpoint)
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    switch (method) {
      // case "GET":
      //   return this.http.get(this.URL_API + endpoint, { headers: headers, params: data })
      case "POST":
        return this.http.post(this.URL_API + endpoint, data, { headers: headers, params: data2 ? data2 : {} });

      case "PUT":
        return this.http.put(this.URL_API + endpoint, data, { headers: headers, params: data2 ? data2 : {} });

      case "DELETE":
        return this.http.delete(this.URL_API + endpoint, { headers: headers, params: data });
        
      default:
        return this.http.get(this.URL_API + endpoint, { headers: headers, params: data })
    }
  }
}
