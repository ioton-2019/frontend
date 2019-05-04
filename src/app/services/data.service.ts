import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs/index";
import {HttpClient} from "@angular/common/http";
import {UserData} from "../data/user.data";
import {PetData} from "../data/pet.data";
import {LampData} from "../data/lamp.data";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private BASE_URL = "http://10.100.31.246:8081/api/v1/";

  private USER_URL = "owners/";
  private PET_URL = "pets/";
  private LAMP_URL = "lamps/";

  private USER_ID = "5ccdac304fa5ca4fe5ab372f";

  private petRegisteredSubject: Subject<PetData> = new Subject<PetData>();

  constructor(private http: HttpClient) {
  }

  public getUserID(): string {
    return this.USER_ID;
  }

  public requestUserData(userID: string): Observable<UserData> {
    let url = `${this.BASE_URL}${this.USER_URL}${userID}`;
    return this.http.get<UserData>(url);
  }

  public requestPetData(petID: string): Observable<PetData> {
    let url = `${this.BASE_URL}${this.PET_URL}${petID}`;
    return this.http.get<PetData>(url);
  }

  public requestLampData(lampID: string): Observable<LampData> {
    let url = `${this.BASE_URL}${this.LAMP_URL}${lampID}`;
    return this.http.get<LampData>(url);
  }

  public changeMissingStatusOfPet(petID: string, missingStatus: boolean) {
    let url = `${this.BASE_URL}${this.PET_URL}${petID}`;
    this.http.patch(url, {"id": petID, "isMissing": missingStatus.toString()}).subscribe();
  }

  public registerPet(name: string, type: string) {
    let url = `${this.BASE_URL}${this.PET_URL}`;
    this.http.post(url, {
      "name": name,
      "ownerID": this.USER_ID,
      "type": type,
      "isMissing": false,
      "lastSeen": []
    }).subscribe((response: PetData) => {
      this.addPetToOwner(response._id, this.USER_ID);
      this.petRegisteredSubject.next(response);
    });

  }

  public addPetToOwner(petID: string, userID: string) {
    let url = `${this.BASE_URL}${this.USER_URL}${userID}`;
    this.http.patch(url, {"id": userID, "petID": petID}).subscribe();
  }

  public getPetRegisteredObservable(): Observable<PetData> {
    return this.petRegisteredSubject.asObservable();
  }


}
