import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-polygon-list',
	templateUrl: './polygon-list.component.html',
	styleUrls: ['./polygon-list.component.scss']
})
export class PolygonListComponent implements OnInit {
	@Input() polygons: Array<any>

	constructor() {
		this.polygons = [];
	}

	ngOnInit() {
	}

}
