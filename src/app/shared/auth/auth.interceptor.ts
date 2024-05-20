import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError} from "rxjs";
import { AuthService } from "./auth.service";
import { StorageService } from "./storage.service";
import { environment } from "../../../environments/environment";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService, private token: StorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = this.addTokenHeader(req);

    return next.handle(authReq).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && this.isUnauthorizedRequest(error, authReq)) {
          this.token.removeToken();
          return this.handle401Error(authReq, next);
        }

        return throwError(() => new Error(error));
      })
    );
  }

  private addTokenHeader(request: HttpRequest<any>): HttpRequest<any> {
    const token = this.token.getToken();
    if (token && this.isApiUrl(request)) {
      return request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token.access) });
    }
    return request;
  }

  private isApiUrl(request: HttpRequest<any>): boolean {
    return request.url.startsWith(environment.apiUrl);
  }

  private isUnauthorizedRequest(error: HttpErrorResponse, request: HttpRequest<any>): boolean {
    return !request.url.includes('app/auth/login') && error.status === 401 && this.isApiUrl(request);
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      this.authService.refreshToken().then(() => {
        this.isRefreshing = false;
        return next.handle(this.addTokenHeader(req));
      }).catch(() => {
        this.isRefreshing = false;
        this.authService.logout();
      });
    }

    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap(() => next.handle(this.addTokenHeader(req)))
    );
  }
}
