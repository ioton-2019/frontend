import {Component, OnDestroy, OnInit} from "@angular/core";
import {circleMarker, LatLng, MapOptions, tileLayer} from "leaflet";
import {PetData} from "../../data/pet.data";
import {PetMarker, UserPosition} from "../../data/marker.data";
import {UserData} from "../../data/user.data";
import {LampData} from "../../data/lamp.data";
import {FakeDataService} from "../../services/fake-data.service";
import {Subscription} from "rxjs/index";
import {LoginService} from "../../login.service";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-pet-tracking-map',
  templateUrl: './pet-tracking-map.component.html',
  styleUrls: ['./pet-tracking-map.component.css']
})
export class PetTrackingMapComponent implements OnInit, OnDestroy {

  public isDataLoading: boolean = true;
  public userPosition: UserPosition;
  public mapOptions: MapOptions = {};
  public layers = [];

  private tileLayer =
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    });
  private pets: PetMarker[] = [];

  private userSubscription: Subscription;
  private petSubscriptionList: Subscription[] = [];
  private lampSubscriptionList: Subscription[] = [];


  constructor(private dataService: FakeDataService,
              private loginService: LoginService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.initMapLayer();
    this.requestCurrentPosition();
    this.requestUserAndPetData();
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }

    this.petSubscriptionList.forEach(petSubscription => {
      if (petSubscription) {
        petSubscription.unsubscribe();
      }
    });

    this.lampSubscriptionList.forEach(lampSubscription => {
      if (lampSubscription) {
        lampSubscription.unsubscribe();
      }
    });
  }

  private initMapLayer() {
    this.mapOptions = {
      layers: [],
      zoom: 15,
    };
    this.layers.push(this.tileLayer);
  }

  private requestCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        let currentPos = new LatLng(position.coords.latitude, position.coords.longitude);
        this.userPosition = new UserPosition(currentPos);
        this.drawMarkers();
      });
    }
  }

  private requestUserAndPetData() {
    let id = "U1";//this.loginService.getLoggedInUserID();
    this.userSubscription = this.dataService.requestUserData(id).subscribe(
      (userData: UserData) => {
        userData.petIDs.forEach(id => this.requestPetData(id));
      }
    );
    this.dataService.pushUserData();
  }

  private requestPetData(petID: string) {
    let petSubscription = this.dataService.requestPetData(petID).subscribe(
      (petData: PetData) => this.mapPetData(petData));
    this.petSubscriptionList.push(petSubscription);
    this.dataService.pushPetData();
  }

  private mapPetData(petData: PetData) {
    let petMarker = new PetMarker();
    petMarker.name = petData.name;
    petMarker.route = petData.route;
    petMarker.missing = petData.missing;
    this.pets.push(petMarker);

    if (petData.route.length > 0) {
      let lampSubscription = this.dataService.requestLampData(petData.route[0].lampID).subscribe(
        (lampData: LampData) => {
          petMarker.createMarker(lampData.lat, lampData.lng, petData.type);
          this.drawMarkers();
        }
      );
      this.lampSubscriptionList.push(lampSubscription);
    }

    this.dataService.pushLampData();
  }

  private drawMarkers() {
    this.layers = [];
    this.layers.push(this.tileLayer);

    if (this.userPosition) {
      this.layers.push(this.userPosition.marker);
    }

    if (this.pets.length > 0) {
      let trackedPets = this.pets.filter(p => p.marker != null);
      trackedPets.forEach(pet => {
        this.layers.push(circleMarker(pet.marker.getLatLng(), {radius: 15, color: 'purple'}));
        this.layers.push(pet.marker);
      });

      if (this.pets.length > trackedPets.length) {
        this.handleUntrackedPets();
      }
    }
  }


  public handleUntrackedPets(): string[] {
    let untrackedPets = this.pets.filter(p => p.route.length === 0);
    if (untrackedPets.length === 0) {
      return;
    }

    let message = "";
    if (untrackedPets.length === 1) {
      message = message.concat("Your pet ", untrackedPets[0].name, " is recently not tracked.")
    } else {
      message = "Some of your pets are not tracked recently.";

    }
    this.snackBar.open(message, "X");
  }

}
