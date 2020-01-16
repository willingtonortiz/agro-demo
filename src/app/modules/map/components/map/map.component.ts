import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as Leaflet from "leaflet";
import { Store } from '@ngxs/store';
import { PolygonActions } from '../../../../store/polygon/polygon.actions';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
	public map: Leaflet.DrawMap;
	public drawItems: Leaflet.FeatureGroup;

	constructor(private readonly store: Store) { }

	ngAfterViewInit(): void {
		this.initMap();
	}

	public initMap(): void {
		// Map creation
		this.map = Leaflet.map('map', {
			center: [-5.131637, -80.001841],
			zoom: 14
		});

		// Map layers
		const tiles = Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: "Gracias OpenStreetMap :3"
		})
		tiles.addTo(this.map);

		this.drawItems = new Leaflet.FeatureGroup();
		this.map.addLayer(this.drawItems);

		// Adding controls
		const drawControl = new Leaflet.Control.Draw({
			position: "topleft",
			draw: {
				polygon: {
					shapeOptions: {
						color: "#323232",
						opacity: 1,
						weight: 5
					},
					showArea: true,
				},
				marker: false,
				circle: false,
				circlemarker: false,
				rectangle: false,
				polyline: false,
			},
		});
		this.map.addControl(drawControl);

		this.map.on(Leaflet.Draw.Event.CREATED, (event) => {
			this.drawPolygon(event);
		});
	}


	public drawPolygon(event): void {

		const layer = event.layer;


		this.drawItems.addLayer(layer);
		const id: number = this.drawItems.getLayerId(layer);

		const area: number = Leaflet.GeometryUtil.geodesicArea(layer.getLatLngs()[0]);
		this.drawItems.getLayer(id).bindPopup(this.makePopUp(area)).openPopup();

		const shape = layer.toGeoJSON();

		console.log(shape.geometry.coordinates[0]);

		//Send data
		this.store.dispatch([new PolygonActions.SetProperty({ coordinates: shape.geometry.coordinates[0] })]);


	}

	public drawImage(imgUrl: string, coordinates: any): void {

		const imgCoordinates = this.getCoordinatesImage(coordinates);
		Leaflet.imageOverlay(imgUrl, imgCoordinates).addTo(this.map);
		//Move towards the image
		//this.map.fitBounds()
	}

	public getCoordinatesImage(coordinates: Array<Array<number>>): Leaflet.LatLngBounds {

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

	public makePopUp(area: number): string {
		return `` +
			`<input>` +
			`<div>Name: ${(area / 10000).toFixed(2)} Hectareas</div> `
	}

	public isPointInsidePolygon(point: Array<number>, polyPoints: Array<Array<number>>): Boolean {
		const x = point[0];
		const y = point[1];
		let inside = false;
		for (var i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
			var xi = polyPoints[i][0], yi = polyPoints[i][1];
			var xj = polyPoints[j][0], yj = polyPoints[j][1];

			var intersect = ((yi > y) != (yj > y))
				&& (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
			if (intersect) inside = !inside;
		}

		return inside;
	}

	public isPolygonInsidePolygon(polyPoints1: Array<Array<number>>, polyPoints2: Array<Array<number>>) {

	}
}
