import { Injectable } from '@angular/core';
import * as Leaflet from "leaflet";

@Injectable({
  providedIn: 'root'
})
export class CoordinateConverterService {

  constructor() { }

  public coordinatesToLatLngBounds(coordinates: Array<Array<number>>): Leaflet.LatLngBounds {
    let lonMin: number = coordinates[0][0];
    let lonMax: number = coordinates[0][0];
    let latMin: number = coordinates[0][1];
    let latMax: number = coordinates[0][1];

    coordinates.forEach((coordinate) => {
      lonMax = Math.max(lonMax, coordinate[0]);
      lonMin = Math.min(lonMin, coordinate[0]);
      latMax = Math.max(latMax, coordinate[1]);
      latMin = Math.min(latMin, coordinate[1]);
    });

    const southWest = Leaflet.latLng(latMax, lonMax);
    const northEast = Leaflet.latLng(latMin, lonMin);

    return Leaflet.latLngBounds(southWest, northEast);
  }

  public coordinatesToArrayLatLngExpression(coordinates: Array<Array<number>>): Array<Leaflet.LatLngExpression> {
    let lCoordinates: Array<Leaflet.LatLngExpression> = new Array<Leaflet.LatLngExpression>();

    coordinates.forEach(cnd => {
      lCoordinates.push(Leaflet.latLng(cnd[1], cnd[0]));
    });

    return lCoordinates;
  }

  public coordinatesToArrayLatLng(coordinates): Array<Leaflet.LatLng> {
    let lCoordinates: Array<Leaflet.LatLng> = new Array<Leaflet.LatLng>();

    coordinates.forEach(cnd => {
      lCoordinates.push(Leaflet.latLng(cnd[1], cnd[0]));
    });
    
    return lCoordinates;
  }
}
