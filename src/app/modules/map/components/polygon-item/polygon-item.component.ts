import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngxs/store';

@Component({
	selector: 'app-polygon-item',
	templateUrl: './polygon-item.component.html',
	styleUrls: ['./polygon-item.component.scss']
})
export class PolygonItemComponent implements OnInit {

	@Input() polygon: any;

	constructor(private store: Store) {
		this.polygon = {};
	}

	ngOnInit() {
	}

	public selectPolygon() {
		console.log(this.polygon);
		console.log("Clicked");
	}
}
