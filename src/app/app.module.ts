import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {
  MatBottomSheetModule,
  MatButtonModule,
  MatIconModule,
  MatSnackBarModule,
  MatToolbarModule
} from "@angular/material";
import {PetTrackingMapComponent} from "./components/pet-tracking-map/pet-tracking-map.component";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {DataService} from "./services/data.service";
import {LoginService} from "./login.service";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    PetTrackingMapComponent
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
  ],
  providers: [DataService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
