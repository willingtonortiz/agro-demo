import { Injectable } from '@angular/core';
import * as Leaflet from "leaflet";
import { Store } from '@ngxs/store';
import { PolygonActions } from 'src/app/store/polygon/polygon.actions';

@Injectable({
  providedIn: 'root'
})
export class MakerService {

  constructor(private readonly store: Store) { }

  public makePolygon(map: Leaflet.DrawMap, drawItems: Leaflet.FeatureGroup, event): void {
    const layer = event.layer;

    drawItems.addLayer(layer);
    const id: number = drawItems.getLayerId(layer);

    const area: number = Leaflet.GeometryUtil.geodesicArea(layer.getLatLngs()[0]);
    drawItems.getLayer(id).bindPopup(this.makePopUp(area)).openPopup();

    const shape = layer.toGeoJSON();

    //Send data
    this.store.dispatch([new PolygonActions.SetProperty({ coordinates: shape.geometry.coordinates[0] })]);
  }

  private makePopUp(area: number): string {
    return `` +
      `<div>Area: ${(area / 10000).toFixed(2)} Hectareas</div> `
  }

  public drawImage(imgUrl: string, coordinates: any, map: Leaflet.DrawMap): void {

    const imgCoordinates = this.getCoordinatesImage(coordinates);
    Leaflet.imageOverlay(imgUrl, imgCoordinates).addTo(map);
    //Move towards the image
    //this.map.fitBounds()
  }

  private getCoordinatesImage(coordinates: Array<Array<number>>): Leaflet.LatLngBounds {

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

    const southWest = Leaflet.latLng(lonMax, latMax);
    const northEast = Leaflet.latLng(lonMin, latMin);

    return Leaflet.latLngBounds(southWest, northEast);

  }

}
