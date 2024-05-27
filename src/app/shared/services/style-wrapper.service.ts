import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable({
    providedIn: "root"
})
export class StyleWrapperService {
    private wrapper = new Subject<any>();
    wrapper$ = this.wrapper.asObservable();

    typeWrapper(value: any) {
        this.wrapper.next(value);
    }
}
