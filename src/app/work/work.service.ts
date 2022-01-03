import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {IWorkDTO} from "../entity/IWorkDTO";
import {ICreateDTO} from "../entity/ICreateDTO";
import {constants} from "../common/constants";


@Injectable({
  providedIn: 'root'
})
export class WorkService {
  private flagEdit: string = '';
  public API_LOCALHOST: string = "http://localhost:8088/api/v1/works/";
  public API_PUBLIC: string = "https://demo-springboot-nalsolution.herokuapp.com/api/v1/works/";
  public pageSize: number = 10;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
    this.flagEdit = "";
  }

  getAllWork(index: number, pageSize: number, sortBy: String, desc: String): Observable<IWorkDTO[]> {
    return this.http.get<IWorkDTO[]>(this.API_PUBLIC + '?pageNo=' + index + "&pageSize=" + pageSize + "&sortBy=" + sortBy + "&desc=" + desc)
  }

  getWorkById(id: string): Observable<IWorkDTO[]> {
    return this.http.get<IWorkDTO[]>(this.API_PUBLIC + id)
  }

  getAllWorkNotPagination(): Observable<IWorkDTO[]> {
    return this.http.get<IWorkDTO[]>(this.API_PUBLIC)
  }

  createWorkDTO(work: ICreateDTO): Observable<ICreateDTO> {
    return this.http.post<ICreateDTO>(this.API_PUBLIC + 'insert', JSON.stringify(work), this.httpOptions)
  }

  editWorkDTO(id: string, work: ICreateDTO): Observable<any> {
    return this.http.put(this.API_PUBLIC + id, work)
  }

  deleteWorkDTO(id: string) {
    return this.http.delete<any>(this.API_PUBLIC + id)
  }

  getFlagEdit(): string {
    let temp = this.flagEdit;
    this.clearData();
    return temp;
  }

  setFlagEdit(value: string) {
    this.flagEdit = value;
  }

  clearData(){
    this.flagEdit = '';
  }
}
