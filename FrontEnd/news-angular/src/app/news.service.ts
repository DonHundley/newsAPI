import { Injectable } from '@angular/core';
import {Article} from './article';
import {Observable, of} from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService} from "./message.service";
@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private newsAPI = 'http://localhost:5000';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getArticle(id: number): Observable<Article>{
    const url = `${this.newsAPI}/api/articles/${id}`;
    return this.http.get<Article>(url).pipe(
      tap(_ => this.log(`fetched article id=${id}`)),
      catchError(this.handleError<Article>(`getArticle id=${id}`))
    );
  }

  getArticles(): Observable<Article[]>{
    const url = `${this.newsAPI}/api/feed`
    return this.http.get<Article[]>(url)
      .pipe(
        tap(_ => this.log('fetched articles')),
        catchError(this.handleError<Article[]>('getArticles', []))
      );
  }

  updateArticle(article: Article): Observable<any>{
    return this.http.put(this.newsAPI, article, this.httpOptions).pipe(
      tap(_ => this.log(`updated article id=${article.id}`)),
      catchError(this.handleError<any>(`updateArticle`))
    );
  }

  addArticle(article: Article): Observable<Article>{
    return this.http.post<Article>(this.newsAPI, article, this.httpOptions).pipe(
      tap((newArticle: Article) => this.log(`added article w/ id=${newArticle.id}`)),
      catchError(this.handleError<Article>('addArticle'))
    );
  }

  deleteArticle(id: number): Observable<Article>{
    const url = `${this.newsAPI}/${id}`;

    return this.http.delete<Article>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted article id=${id}`)),
      catchError(this.handleError<Article>('deleteArticle'))
    );
  }

  searchArticles(term: string): Observable<Article[]>{
    if (!term.trim()){
      return of([]);
    }
    return this.http.get<Article[]>(`${this.newsAPI}/?name=${term}`).pipe(
      tap(x => x.length ?
      this.log(`found articles matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Article[]>('searchArticles',[]))
    );
  }


}
