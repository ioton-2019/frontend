import {Injectable} from "@angular/core";
import {Observable} from "rxjs/index";
import {HttpClient, HttpParams} from "@angular/common/http";
import {UserData} from "../data/user.data";
import {PetData} from "../data/pet.data";
import {LampData} from "../data/lamp.data";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private USER_URL = "api/v1/owners/";
  private PET_URL = "api/v1/pets/";
  private LAMP_URL = "api/v1/lamps/";

  constructor(private http: HttpClient) {
  }

  public requestUserData(userID: string): Observable<UserData> {
    const options = {params: new HttpParams().set('id', userID)};
    return this.http.get<UserData>(this.USER_URL, options);
  }

  public requestPetData(petID: string): Observable<PetData> {
    const options = {params: new HttpParams().set('id', petID)};
    return this.http.get<PetData>(this.PET_URL, options);
  }

  public requestLampData(lampID: string): Observable<LampData> {
    const options = {params: new HttpParams().set('id', lampID)};
    return this.http.get<LampData>(this.LAMP_URL, options);
  }

}
