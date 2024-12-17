import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
  })

export class SharedService {

     readonly APIUrl = 'http://172.16.18.25:3030/api/';

     constructor(private http: HttpClient) {}

     createNews(data:any):Observable<any[]> {
        return this.http.post<any>(this.APIUrl+'news', data);
    }

    getNewsList(): Observable<any> {
        return this.http.get<any>(this.APIUrl + 'news').pipe(
            tap(data => console.log(data))  
        );
    }


}
