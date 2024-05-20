import {Injectable} from "@angular/core";
import {CookieService} from "ngx-cookie-service";
import {JwtToken} from "./jwt.metadata";
import {environment} from "../../../environments/environment";
import CryptoJS from "crypto-js";

const TOKEN = '_session.kilt';

@Injectable({
  providedIn: "root"
})
export class StorageService {

  constructor(public cookieService: CookieService) {
  }

  clear(): void {
    console.log('clear cookies')
    this.cookieService.deleteAll();
  }

  saveToken(jwt: JwtToken): void {
    const token = JSON.stringify(jwt);
    this.cookieService.delete(TOKEN)
    this.cookieService.set(TOKEN, CryptoJS.AES.encrypt(token, environment.keyCrypto).toString());
  }

  getToken(): JwtToken | null {
    const token = this.cookieService.get(TOKEN);
    if (token) {
      const bytes = CryptoJS.AES.decrypt(token, environment.keyCrypto);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
    return null;
  }

  removeToken() {
    this.cookieService.delete(TOKEN);
  }
}
