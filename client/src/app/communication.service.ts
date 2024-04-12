import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
// tslint:disable-next-line:ordered-imports
import { of, Observable, Subject } from "rxjs";
import { catchError } from "rxjs/operators";
import { Bird } from "../../../common/tables/Bird"

@Injectable()
export class CommunicationService {
  private readonly BASE_URL: string = "http://localhost:3000/database";
  public constructor(private http: HttpClient) {}

  private _listners: any = new Subject<any>();

  public listen(): Observable<any> {
    return this._listners.asObservable();
  }

  public filter(filterBy: string): void {
    this._listners.next(filterBy);
  }

  public getBirds(): Observable<Bird[]> {
    return this.http
      .get<Bird[]>(this.BASE_URL + "/oiseau")
      .pipe(catchError(this.handleError<Bird[]>("getBirds")));
  }

  public insertBird(bird: Bird): Observable<number> {
    return this.http
      .post<number>(this.BASE_URL + "/oiseau", bird)
      .pipe(catchError(this.handleError<number>("insertBird")));
  }

  public updateBird(bird: Bird, oldBirdID: string): Observable<number> {
    return this.http
      .put<number>(this.BASE_URL + `/oiseau/update/${oldBirdID}`, bird)
      .pipe(catchError(this.handleError<number>("updateBird")));
  }

  public deleteBird(birdID: string): Observable<number> {
    return this.http
      .post<number>(this.BASE_URL + "/oiseau/" + birdID, {})
      .pipe(catchError(this.handleError<number>("deleteBird")));
  }


  private handleError<T>(
    request: string,
    result?: T
  ): (error: Error) => Observable<T> {
    return (error: Error): Observable<T> => {
      return of(result as T);
    };
  }
}
