import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as Leaflet from "leaflet";
import { Store } from '@ngxs/store';
import { PolygonActions } from '../../../../store/polygon/polygon.actions';
import { MakerService } from 'src/app/services/maker/maker.service';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
	public map: Leaflet.DrawMap;
	public drawItems: Leaflet.FeatureGroup;

	constructor(private readonly store: Store, private readonly makerService: MakerService) { }

	ngAfterViewInit(): void {
		this.initMap();
	}

	public initMap(): void {
		// Map layers
		const tiles = Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: "Gracias OpenStreetMap :3"
		})

		const satelliteMap = Leaflet.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
			maxZoom: 20,
			subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
		});



		let baseMaps = {
			"openStreetMap": tiles,
			"satelliteMap": satelliteMap
		};

		// Map creation
		this.map = Leaflet.map('map', {
			center: [-5.219646, -79.975689],
			zoom: 20,
			layers: [tiles, satelliteMap]
		});

		//satelliteMap.addTo(this.map);

		Leaflet.control.layers(baseMaps).addTo(this.map);


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

		this.makerService.setMap(this.map);
		this.makerService.setDrawItems(this.drawItems);


		this.map.on(Leaflet.Draw.Event.CREATED, (event) => {
			this.makerService.makePolygon(event);
		});

		/*var imageUrl = 'http://api.agromonitoring.com/image/1.0/1205d40da00/5e1f706a4fcefd6d32f91021?appid=9d411dc6b0e4cc020bd8b3b2e4ef69cc';
		const southWest = Leaflet.latLng(-5.219646, -79.975689);
		const northEast = Leaflet.latLng(-5.221681, -79.973205);

		var imageBounds = Leaflet.latLngBounds(southWest, northEast);
		var lyrTest = Leaflet.imageOverlay(imageUrl, imageBounds).addTo(this.map);
		this.map.fitBounds(imageBounds);*/
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
