import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BoardService {

  constructor(private http: HttpClient) {
  }

  getAllBoards() {
    return this.http.get(`${environment.host}/api/v1/boards`);
  }
}
