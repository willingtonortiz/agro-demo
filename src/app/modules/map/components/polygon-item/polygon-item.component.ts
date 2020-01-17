import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { PolygonsActions } from 'src/app/store/polygons/polygons.actions';

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
		this.store.dispatch([new PolygonsActions.SetCurrentPolygon(this.polygon.agroApiId)])
		console.log(this.polygon);
	}

	public fetchPolygonInfo() {
		this.store.dispatch([new PolygonsActions.FetchCurrentPolygonInfo()]);
	}
}
