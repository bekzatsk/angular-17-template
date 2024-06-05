import {inject, Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {StorageService} from "./storage.service";
import {environment} from "../../../environments/environment";
import {lastValueFrom} from "rxjs";

@Injectable()
export class AuthService {
  private http: HttpClient = inject(HttpClient);
  private storage: StorageService = inject(StorageService);

  async signIn(username: string, password: string, rememberMe: boolean = false) {
    try {
      const token: any = await lastValueFrom(this.http.post(`${environment.apiUrl}/app/auth/login`, {email: username, password: password}))
      this.storage.saveToken({
        access: token['accessToken'].toString(),
        refresh: rememberMe ? token['refreshToken'].toString() : '',
        expiresAt: token['expiresAt'].toString()
      })
    } catch (e) {
      console.error('Failed to login', e);
      throw new Error('Failed to login');
    }
  }

  logout() {
    this.storage.clear();
  }

  async refreshToken() {
    const token = this.storage.getToken();
    if (token?.refresh) {
      try {
        const refresh: any = await lastValueFrom(this.http.post('http://localhost:3000/refresh', {refreshToken: token?.refresh}));
        this.storage.saveToken({
          access: refresh['accessToken'].toString(),
          refresh: refresh['refreshToken'].toString(),
          expiresAt: refresh['expiresAt'].toString()
        })
        return refresh['refreshToken'].toString()
      } catch (e) {
        console.error(e);
        throw new Error('Failed to refresh token');
      }
    }
    throw new Error('Refresh token is empty');
  }
}
