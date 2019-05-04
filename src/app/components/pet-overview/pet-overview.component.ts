import {Component, Inject} from "@angular/core";
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef, MatDialog} from "@angular/material";
import {PetMarker} from "../../data/marker.data";
import {BottomSheetCommunicationService} from "../../services/bottom-sheet-communication.service";
import {DataService} from "../../services/data.service";
import {PetRegistrationDialogComponent} from "../pet-registration-dialog/pet-registration-dialog.component";

@Component({
  selector: 'app-pet-overview',
  templateUrl: './pet-overview.component.html',
  styleUrls: ['./pet-overview.component.css']
})
export class PetOverviewComponent {

  public pets: PetMarker[] = [];

  constructor(public dialog: MatDialog,
              private bottomSheetCommunicationService: BottomSheetCommunicationService,
              private dataService: DataService,
              private bottomSheetRef: MatBottomSheetRef<PetOverviewComponent>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
    this.pets = data.pets;
  }

  public zoomToPet(event: MouseEvent, pet: PetMarker): void {
    let target = event.target || event.srcElement || event.currentTarget;
    let idAttr = target.attributes.id;
    if (idAttr == "on" || idAttr == "off") {
      this.switchMissingStatusOfPet(pet);
    } else {
      this.bottomSheetCommunicationService.zoomToPet(pet.id);
      this.closeBottomSheet(event);
    }
  }

  public switchMissingStatusOfPet(pet: PetMarker): void {
    pet.isMissing = !pet.isMissing;
    this.dataService.changeMissingStatusOfPet(pet.id, pet.isMissing);
  }

  public registerPet(event: MouseEvent): void {
    this.closeBottomSheet(event);
    this.dialog.open(PetRegistrationDialogComponent);
  }

  private closeBottomSheet(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

}
