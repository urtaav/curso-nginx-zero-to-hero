import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class TaskService {

  private api = 'http://localhost:8080/api/v1/tasks';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>(this.api);
  }

  search(q: string) {
    return this.http.get<any[]>(`${this.api}/search?title=${q}`);
  }
}