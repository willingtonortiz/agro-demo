import { Injectable } from '@angular/core';
import * as Leaflet from "leaflet";
import { Store } from '@ngxs/store';
import { PolygonActions } from 'src/app/store/polygon/polygon.actions';
import { CoordinateConverterService } from '../coordinate-converter.service';

@Injectable({
  providedIn: 'root'
})
export class MakerService {

  private map: Leaflet.DrawMap;
  private drawItems: Leaflet.FeatureGroup;
  constructor(private readonly store: Store, private coordinateConverterService: CoordinateConverterService) { }

  public async makePolygon(event): Promise<void> {
    const layer = event.layer;

    this.drawItems.addLayer(layer);
    const id: number = this.drawItems.getLayerId(layer);

    const shape = layer.toGeoJSON();
    var coordinates = shape.geometry.coordinates[0];
    const perimeter = this.getPerimeter(this.coordinateConverterService.coordinatesToArrayLatLng(coordinates));

    const area: number = Leaflet.GeometryUtil.geodesicArea(layer.getLatLngs()[0]);
    this.drawItems.getLayer(id).bindPopup(this.makePopUp(area, perimeter)).openPopup();

    //Send data
    await this.store.dispatch([new PolygonActions.SetProperty({ coordinates: coordinates })]).toPromise();

  }

  public drawPolygon(coordinates: Array<Array<number>>, area: number): void {
    console.log("llegue");
    this.drawItems.clearLayers();

    let lCoordinates: Array<Leaflet.LatLngExpression>;
    lCoordinates = this.coordinateConverterService.coordinatesToArrayLatLngExpression(coordinates);

    let llCoordinates: Array<Leaflet.LatLng>;
    llCoordinates = this.coordinateConverterService.coordinatesToArrayLatLng(coordinates);

    let perimeter: number = this.getPerimeter(llCoordinates);

    let polygon = Leaflet.polygon(lCoordinates, { color: 'rgba(0,0,0,1)', fillColor: 'red' });
    this.drawItems.addLayer(polygon);

    const id: number = this.drawItems.getLayerId(polygon);
    this.drawItems.getLayer(id).bindPopup(this.makePopUp(area, perimeter, true)).openPopup();

    const lCenter = this.coordinateConverterService.coordinatesToLatLngBounds(coordinates);
    this.map.fitBounds(lCenter);
  }

  private makePopUp(area: number, perimeter: number = 0, fixed: boolean = false): string {
    let sArea: string;

    if (!fixed)
      sArea = (area / 10000).toFixed(2);
    else
      sArea = area.toFixed(2);

    return `` +
      `<div>Area: ${sArea} Hectareas</div> ` +
      `<div>Perimetro: ${perimeter.toFixed(2)} m</div> `
  }

  public drawImage(imgUrl: string, coordinates: any): void {

    const imgCoordinates = this.coordinateConverterService.coordinatesToLatLngBounds(coordinates);

    //IMAGES
    //Leaflet.imageOverlay(imgUrl, imgCoordinates).addTo(this.map)
    Leaflet.tileLayer(imgUrl, { maxZoom: 19 }).addTo(this.map).bringToFront();

    //Move towards the image
    this.map.fitBounds(imgCoordinates);
  }

  public getPerimeter(lCoordinates: Array<Leaflet.LatLng>): number {
    let perimeter: number = 0;
    for (var i = 0; i < lCoordinates.length - 1; ++i) {
      perimeter += Math.abs(lCoordinates[i].distanceTo(lCoordinates[i + 1]));
    }
    return perimeter;
  }

  public setMap(map: Leaflet.DrawMap): void {
    this.map = map;
  }

  public setDrawItems(drawItems: Leaflet.FeatureGroup): void {
    this.drawItems = drawItems;
  }

}
