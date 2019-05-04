import {circleMarker, CircleMarker, icon, LatLng, marker, Marker} from "leaflet";
import {LocationData} from "./pet.data";

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
  public name: string;
  public marker: Marker;
  public missing: boolean;
  public route: LocationData[];

  constructor() {
  }

  createMarker(lat: number, lng: number, type: string) {
    let iconUrl = type === 'cat' ? CAT_ICON_URL : DOG_ICON_URL;
    this.marker = marker([lat, lng], {
      icon: icon({
        iconSize: [25, 25],
        iconAnchor: [12, 12],
        tooltipAnchor: [20, 0],
        iconUrl: iconUrl,
      })
    });
    this.marker.bindTooltip(this.name);
  }

}

