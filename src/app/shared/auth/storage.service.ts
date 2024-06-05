import {inject, Injectable} from "@angular/core";
import {CookieService, SameSite} from "ngx-cookie-service";
import {JwtToken} from "./jwt.metadata";
import {environment} from "../../../environments/environment";
import CryptoJS from "crypto-js";

const TOKEN = '_session.kilt';

@Injectable({
  providedIn: "root"
})
export class StorageService {
  public cookieService: CookieService = inject(CookieService);
  path: string = '/';

  clear(): void {
    console.log('clear cookies')
    this.cookieService.deleteAll(this.path);
  }

  saveToken(jwt: JwtToken): void {
    const token = JSON.stringify(jwt);
    this.saveCookie(TOKEN, CryptoJS.AES.encrypt(token, environment.keyCrypto).toString());
  }

  getToken(): JwtToken | null {
    const token = this.getCookie(TOKEN);
    if (token) {
      const bytes = CryptoJS.AES.decrypt(token, environment.keyCrypto);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
    return null;
  }

  removeToken() {
    this.cookieService.delete(TOKEN);
  }

  private saveCookie(
    name: string,
    value: string,
    sameSite: SameSite = 'None',
  ) {
    if (this.cookieService.check(name)) {
      this.cookieService.delete(name);
    }
    this.cookieService.set(name, value, undefined, this.path)
  }

  private getCookie(name: string): string | null {
    return this.cookieService.check(name) ? this.cookieService.get(name) : null
  }
}
