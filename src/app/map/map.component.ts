import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as Leaflet from "leaflet";

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
	public map;

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
		const tiles = Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
			maxZoom: 19,
			attribution: "Gracias OpenStreetMap :3"
		})
		tiles.addTo(this.map);

	}
}
