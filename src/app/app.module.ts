import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {
  MatBottomSheetModule,
  MatButtonModule,
  MatChipsModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatRadioModule,
  MatSnackBarModule,
  MatToolbarModule
} from "@angular/material";
import {PetTrackingMapComponent} from "./components/pet-tracking-map/pet-tracking-map.component";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {DataService} from "./services/data.service";
import {FormsModule} from "@angular/forms";
import {PetOverviewComponent} from "./components/pet-overview/pet-overview.component";
import {PetRegistrationDialogComponent} from "./components/pet-registration-dialog/pet-registration-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    PetTrackingMapComponent,
    PetOverviewComponent,
    PetRegistrationDialogComponent,
  ],
  entryComponents: [
    PetOverviewComponent,
    PetRegistrationDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,

    LeafletModule.forRoot(),

    MatToolbarModule,
    MatSnackBarModule,
    MatBottomSheetModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatChipsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatRadioModule,
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
