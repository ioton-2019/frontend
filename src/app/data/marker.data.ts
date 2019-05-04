import {circleMarker, CircleMarker, icon, LatLng, marker, Marker} from "leaflet";
import {LocationData} from "./pet.data";
import {DatePipe} from "@angular/common";

export class UserPosition {

  public marker: CircleMarker;

  constructor(public latLng: LatLng) {
    this.marker = circleMarker([latLng.lat, latLng.lng], {radius: 15});
    this.marker.bindTooltip("Here are you.");
  }

}

export const CAT_ICON_URL = './../../assets/cat.svg';
export const DOG_ICON_URL = './../../assets/dog.svg';

export class PetMarker {
  public id: string;
  public name: string;
  public marker: Marker;
  public isMissing: boolean;
  public route: LocationData[];
  public iconUrl: string;

  constructor() {
  }

  setIcon(type: string) {
    this.iconUrl = type === 'cat' ? CAT_ICON_URL : DOG_ICON_URL;
  }

  createMarker(lat: number, lng: number) {
    this.marker = marker([lat, lng], {
      icon: icon({
        iconSize: [25, 25],
        iconAnchor: [12, 12],
        tooltipAnchor: [20, 0],
        iconUrl: this.iconUrl,
      })
    });
    let tooltipText = "<b>" + this.name + "</b><br>";
    if (this.route.length > 0) {
      let pipe = new DatePipe("en-US");
      let formattedTimeStamp = pipe.transform(this.route[0].timestamp, 'medium');
      tooltipText = tooltipText.concat("<small>last seen at <br>", formattedTimeStamp, "</small><br>");
    }
    this.marker.bindTooltip(tooltipText);
  }

}

