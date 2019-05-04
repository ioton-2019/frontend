import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class BottomSheetCommunicationService {

  private zoomToPetSubject: Subject<string> = new Subject<string>();

  constructor() {
  }

  public getZoomToPetObservable(): Observable<string> {
    return this.zoomToPetSubject.asObservable();
  }

  public zoomToPet(petID: string) {
    this.zoomToPetSubject.next(petID);
  }


}
