import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  public taskData =  new BehaviorSubject<any>('');
  constructor(private http: HttpClient) { }

createQuery(data: any) {
  return this.http.post("http://localhost:3000/query", data)
  .pipe(map( (res)=> {
    this.taskData.next(res);
    console.log(res);
  }));
}

AnswerSubmit(data: any) {
  return this.http.post("http://localhost:3000/answers", data)
  .pipe(map( (res)=> {
    this.taskData.next(res);
    console.log(res);
  }));
}

getAllQuestions() {
  return this.http.get<any>('http://localhost:3000/query')
  .pipe(map((res ) => {
    // console.log(res);
    return res;
  }));
}
getAllAnswers(id:any) {
  return this.http.get<any>('http://localhost:3000/answers',id)
  .pipe(map((res ) => {
    // console.log(res);
    return res;
  }));
}

}
