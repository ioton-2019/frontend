import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs/index";
import {LocationData, PetData} from "../data/pet.data";
import {UserData} from "../data/user.data";
import {LampData} from "../data/lamp.data";

@Injectable({
  providedIn: 'root'
})
export class FakeDataService {

  private subjectPetData = new Subject<PetData>();
  private subjectUserData = new Subject<UserData>();
  private subjectLampData = new Subject<LampData>();


  constructor() {
  }

  public requestPetData(petID: string): Observable<PetData> {
    return this.subjectPetData;
  }

  public requestUserData(userID: string): Observable<UserData> {
    return this.subjectUserData;
  }

  public requestLampData(lampID: string): Observable<LampData> {
    return this.subjectLampData;
  }

  public pushUserData() {
    this.subjectUserData.next({
      id: "U1",
      name: "Anna Müller",
      petIDs: ["P1", "P2"],
      mailAddr: "",
      postAddr: "",
    });
  }

  public pushPetData() {
    let route: LocationData = {
      lampID: "L1",
      timeStamp: Date.now(),
    };

    let route2: LocationData = {
      lampID: "L2",
      timeStamp: Date.now(),
    };

    let pet: PetData =
      {
        id: "P1",
        name: "Susi",
        ownerID: "U1",
        route: [route],
        missing: false,
        type: "cat",
      };

    let pet2: PetData =
      {
        id: "P2",
        name: "Karl",
        ownerID: "U1",
        route: [route2],
        missing: false,
        type: "dog",
      };

    this.subjectPetData.next(pet);
    this.subjectPetData.next(pet2);
  }

  public pushLampData() {
    this.subjectLampData.next({
      id: "L1",
      lat: 60.185681,
      lng: 24.8276,
    });

    this.subjectLampData.next({
      id: "L2",
      lat: 60.184998,
      lng: 24.823008,
    });

  }

}
