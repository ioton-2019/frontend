import {circleMarker, CircleMarker, LatLng} from "leaflet";
export class Position {

  public marker: CircleMarker;

  constructor(public latLng: LatLng) {
    this.marker = circleMarker([latLng.lat, latLng.lng], {radius: 15});
    this.marker.bindTooltip("Here are you.");
  }

}
