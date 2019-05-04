import {Component, OnInit} from "@angular/core";
import {MatDialogRef} from "@angular/material";
import {DataService} from "../../services/data.service";
import {CAT_ICON_URL, DOG_ICON_URL} from "../../data/marker.data";

@Component({
  selector: 'app-pet-registration-dialog',
  templateUrl: './pet-registration-dialog.component.html',
})
export class PetRegistrationDialogComponent implements OnInit {

  public catIconUrl = CAT_ICON_URL;
  public dogIconUrl = DOG_ICON_URL;

  public name: string;
  public type: string;

  constructor(public dialogRef: MatDialogRef<PetRegistrationDialogComponent>,
              private dataService: DataService) {
  }

  ngOnInit() {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  registerPet() {
    if (this.name === "" || this.type === "") {
      return;
    }
    this.dataService.registerPet(this.name, this.type);
    this.closeDialog();
  }

}
