import { Injectable } from '@angular/core';
import * as Leaflet from "leaflet";
import { Store } from '@ngxs/store';
import { PolygonActions } from 'src/app/store/polygon/polygon.actions';

@Injectable({
  providedIn: 'root'
})
export class MakerService {

  private map: Leaflet.DrawMap;
  private drawItems: Leaflet.FeatureGroup;
  constructor(private readonly store: Store) { }

  public async makePolygon(event): Promise<void> {
    const layer = event.layer;

    this.drawItems.addLayer(layer);
    const id: number = this.drawItems.getLayerId(layer);

    const area: number = Leaflet.GeometryUtil.geodesicArea(layer.getLatLngs()[0]);
    this.drawItems.getLayer(id).bindPopup(this.makePopUp(area)).openPopup();

    const shape = layer.toGeoJSON();

    var coordinates = shape.geometry.coordinates[0];

    //Send data
    await this.store.dispatch([new PolygonActions.SetProperty({ coordinates: coordinates })]).toPromise();

  }

  public drawPolygon(coordinates: Array<Array<number>>): void {

    this.drawItems.clearLayers();

    let lCoordinates: Array<Leaflet.LatLngExpression> = new Array<Leaflet.LatLngExpression>();
    coordinates.forEach(cnd => {
      lCoordinates.push(Leaflet.latLng(cnd[1], cnd[0]));
    });
    
    let polygon = Leaflet.polygon(lCoordinates, { color: 'rgba(0,0,0,1)', fillColor: 'red' });
    this.drawItems.addLayer(polygon);
   
    /*const id: number = this.drawItems.getLayerId(polygon);

    const area: number = Leaflet.GeometryUtil.geodesicArea();
    this.drawItems.getLayer(id).bindPopup(this.makePopUp(area)).openPopup();*/

    const lCenter = this.getCoordinatesImage(coordinates);
    this.map.fitBounds(lCenter);
  }

  private makePopUp(area: number): string {
    return `` +
      `<div>Area: ${(area / 10000).toFixed(2)} Hectareas</div> `
  }

  public drawImage(imgUrl: string, coordinates: any): void {

    const imgCoordinates = this.getCoordinatesImage(coordinates);

    //IMAGES
    //Leaflet.imageOverlay(imgUrl, imgCoordinates).addTo(this.map)
    Leaflet.tileLayer(imgUrl, { maxZoom: 19 }).addTo(this.map).bringToFront();


    //Move towards the image
    this.map.fitBounds(imgCoordinates);
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

  public setMap(map: Leaflet.DrawMap): void {
    this.map = map;
  }

  public setDrawItems(drawItems: Leaflet.FeatureGroup): void {
    this.drawItems = drawItems;
  }

}
