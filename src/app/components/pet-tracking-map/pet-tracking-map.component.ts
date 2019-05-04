import {Component, OnDestroy, OnInit} from "@angular/core";
import {circleMarker, LatLng, MapOptions, tileLayer} from "leaflet";
import {PetData} from "../../data/pet.data";
import {PetMarker, UserPosition} from "../../data/marker.data";
import {UserData} from "../../data/user.data";
import {LampData} from "../../data/lamp.data";
import {Subscription} from "rxjs/index";
import {MatBottomSheet, MatBottomSheetConfig, MatDialog, MatSnackBar, MatSnackBarConfig} from "@angular/material";
import {PetOverviewComponent} from "../pet-overview/pet-overview.component";
import {DataService} from "../../services/data.service";
import {BottomSheetCommunicationService} from "../../services/bottom-sheet-communication.service";
import {PetRegistrationDialogComponent} from "../pet-registration-dialog/pet-registration-dialog.component";

@Component({
  selector: 'app-pet-tracking-map',
  templateUrl: './pet-tracking-map.component.html',
  styleUrls: ['./pet-tracking-map.component.css']
})
export class PetTrackingMapComponent implements OnInit, OnDestroy {

  public LOGO_URL = './../../assets/logo.jpg';
  public isLoading: boolean = true;
  public zoomLatLng: LatLng;
  public mapOptions: MapOptions = {};
  public layers = [];
  private tileLayer =
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    });


  private userPosition: UserPosition;
  private pets: PetMarker[] = [];

  private zoomSubscription: Subscription;
  private petRegistrationSubscription: Subscription;
  private userSubscription: Subscription;
  private petSubscriptionList: Subscription[] = [];
  private lampSubscriptionList: Subscription[] = [];


  constructor(private dataService: DataService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog,
              private bottomSheet: MatBottomSheet,
              private bottomSheetCommunicationService: BottomSheetCommunicationService) {
  }

  ngOnInit() {
    this.initMapLayer();
    this.requestCurrentPosition();
    this.requestUserAndPetData();

    setTimeout(() => {
      this.isLoading = false;
    }, 1500);

    this.zoomSubscription = this.bottomSheetCommunicationService.getZoomToPetObservable().subscribe(
      (petID) => {
        let pet = this.pets.find(p => p.id === petID);
        if (pet !== undefined && pet.marker !== undefined)
          this.zoomLatLng = pet.marker.getLatLng();
      }
    );

    this.petRegistrationSubscription = this.dataService.getPetRegisteredObservable().subscribe(
      (petData) => this.mapPetData(petData)
    )
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

    if (this.zoomSubscription) {
      this.zoomSubscription.unsubscribe();
    }

    if (this.petRegistrationSubscription) {
      this.petRegistrationSubscription.unsubscribe();
    }
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
        this.zoomLatLng = currentPos;
        this.drawMarkers();
      });
    }
  }

  private requestUserAndPetData() {
    let id = this.dataService.getUserID();
    this.userSubscription = this.dataService.requestUserData(id).subscribe(
      (userData: UserData) => {
        userData.pets.forEach(id => this.requestPetData(id));
      }
    );
  }

  private requestPetData(petID: string) {
    let petSubscription = this.dataService.requestPetData(petID).subscribe(
      (petData: PetData) => this.mapPetData(petData));
    this.petSubscriptionList.push(petSubscription);
  }

  private mapPetData(petData: PetData) {
    let petMarker = new PetMarker();
    petMarker.id = petData._id;
    petMarker.name = petData.name;
    petMarker.route = petData.lastSeen;
    petMarker.isMissing = petData.isMissing;
    petMarker.setIcon(petData.type);
    this.pets.push(petMarker);

    if (petData.lastSeen.length > 0) {
      let lampSubscription = this.dataService.requestLampData(petData.lastSeen[0].lampID).subscribe(
        (lampData: LampData) => {
          petMarker.createMarker(lampData.coordinates.lat, lampData.coordinates.lng);
          this.drawMarkers();
        }
      );
      this.lampSubscriptionList.push(lampSubscription);
    }
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

      if (!this.isLoading) {
        if (this.pets.length > trackedPets.length) {
          this.handleUntrackedPets();
        }

        this.handleMissingPets();
      }
    }
  }


  public handleUntrackedPets() {
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
    let config: MatSnackBarConfig = new MatSnackBarConfig();
    config.panelClass = 'snackbar';
    this.snackBar.open(message, "X", config);
  }


  public handleMissingPets() {
    let missingPets = this.pets.filter(p => p.isMissing);
    if (missingPets.length === 0) {
      return;
    }

    let message = "";
    if (missingPets.length === 1) {
      message = message.concat("Is ", missingPets[0].name, " still missing?")
    } else {
      message = "Are your pets still missing?";
    }

    let config: MatSnackBarConfig = new MatSnackBarConfig();
    config.panelClass = 'snackbar';
    let missingPetSnackbar = this.snackBar.open(message, "No", config);
    missingPetSnackbar.onAction().subscribe(() => {
      missingPets[0].isMissing = false;
      this.dataService.changeMissingStatusOfPet(missingPets[0].id, false);
    });
  }


  public showPetOverview() {
    if (this.pets.length === 0) {
      this.dialog.open(PetRegistrationDialogComponent);
    } else {

      let config: MatBottomSheetConfig = new MatBottomSheetConfig();
      config.data = {pets: this.pets};
      this.bottomSheet.open(PetOverviewComponent, config);
    }
  }

}

