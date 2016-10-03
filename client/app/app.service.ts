import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AppService {
  constructor(private http: Http) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  apiUrl = 'http://localhost:3003';

   getMessage(): Promise<string> {
     return this.http.get(this.apiUrl).toPromise()
            .then(response => response.json().message as string)
            .catch(this.handleError);
   }
}
