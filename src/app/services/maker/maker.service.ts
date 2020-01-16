import { Injectable } from '@angular/core';
import * as Leaflet from "leaflet";
import { Store } from '@ngxs/store';
import { PolygonActions } from 'src/app/store/polygon/polygon.actions';

@Injectable({
  providedIn: 'root'
})
export class MakerService {

  private mapT: Leaflet.DrawMap;
  constructor(private readonly store: Store) { }

  public async makePolygon(map: Leaflet.DrawMap, drawItems: Leaflet.FeatureGroup, event): Promise<void> {
    this.mapT = map;
    const layer = event.layer;

    drawItems.addLayer(layer);
    const id: number = drawItems.getLayerId(layer);

    const area: number = Leaflet.GeometryUtil.geodesicArea(layer.getLatLngs()[0]);
    drawItems.getLayer(id).bindPopup(this.makePopUp(area)).openPopup();

    const shape = layer.toGeoJSON();
    
    var coordinates = shape.geometry.coordinates[0];

    //Send data
    await this.store.dispatch([new PolygonActions.SetProperty({ coordinates: shape.geometry.coordinates[0] })]).toPromise();
    
  }

  private makePopUp(area: number): string {
    return `` +
      `<div>Area: ${(area / 10000).toFixed(2)} Hectareas</div> `
  }

  public drawImage(imgUrl: string, coordinates: any): void {

    const imgCoordinates = this.getCoordinatesImage(coordinates);
    Leaflet.imageOverlay(imgUrl, imgCoordinates).addTo(this.mapT)
    //Move towards the image
    this.mapT.fitBounds(imgCoordinates);
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

    const southWest = Leaflet.latLng(latMax, lonMax);
    const northEast = Leaflet.latLng(latMin, lonMin);

    return Leaflet.latLngBounds(southWest, northEast);

  }

}
