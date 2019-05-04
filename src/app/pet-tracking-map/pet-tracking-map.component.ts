import {Component, OnInit} from "@angular/core";
import {circleMarker, LatLng, MapOptions, tileLayer} from "leaflet";

@Component({
  selector: 'app-pet-tracking-map',
  templateUrl: './pet-tracking-map.component.html',
  styleUrls: ['./pet-tracking-map.component.css']
})
export class PetTrackingMapComponent implements OnInit {

  public mapOptions: MapOptions = {};
  public layers = [];

  private tileLayer =
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    });
  public currentPos: LatLng;

  constructor() {
  }

  ngOnInit() {
    this.initCurrentPosition();
    this.initMapLayer();
  }

  private initCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position);
        this.currentPos = new LatLng(position.coords.latitude, position.coords.longitude);
        let currentPosMarker = circleMarker([this.currentPos.lat, this.currentPos.lng], {radius: 15});
        currentPosMarker.bindTooltip("Here are you.");
        this.layers.push(currentPosMarker)
      });
    }
  }

  private initMapLayer() {
    this.mapOptions = {
      layers: [],
      zoom: 15,
    };

    this.layers.push(this.tileLayer);
  }

}
