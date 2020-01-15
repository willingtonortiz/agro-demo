import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as Leaflet from "leaflet";

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
	public map: Leaflet.DrawMap;

	constructor() { }

	ngAfterViewInit(): void {
		this.initMap();
	}

	public initMap(): void {
		// Map creation
		this.map = Leaflet.map('map', {
			center: [39.8282, -98.5795],
			zoom: 3
		});

		// Map layers
		const tiles = Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: "Gracias OpenStreetMap :3"
		})
		tiles.addTo(this.map);

		const drawItems = new Leaflet.FeatureGroup();

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


	}
}
