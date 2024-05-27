import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Pipe({
  standalone: true,
  name: 'imageSecureFile'
})
export class ImageSecurePipe implements PipeTransform {

  constructor(private http: HttpClient) { }

  transform(url: string) {

    return new Observable<string>((observer) => {
      this.http.get(url, {responseType: 'blob'}).subscribe(response => {
        const reader: FileReader = new FileReader();
        reader.readAsDataURL(response);
        reader.onloadend = function() {
          if(reader.result) {
            observer.next(reader.result.toString());
          }
        };
      });

      return {unsubscribe() {  }};
    });
  }
}
