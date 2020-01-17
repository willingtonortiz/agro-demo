import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { PolygonsActions } from 'src/app/store/polygons/polygons.actions';
import { MakerService } from 'src/app/services/maker/maker.service';

@Component({
	selector: 'app-polygon-item',
	templateUrl: './polygon-item.component.html',
	styleUrls: ['./polygon-item.component.scss']
})
export class PolygonItemComponent implements OnInit {

	@Input() polygon: any;

	constructor(private store: Store, private makerService: MakerService) {
		this.polygon = {};
	}

	ngOnInit() {
	}

	public selectPolygon() {
		this.store.dispatch([new PolygonsActions.SetCurrentPolygon(this.polygon.agroApiId)])
		this.makerService.drawPolygon(this.polygon.coordinates,this.polygon.area);
		console.log(this.polygon);
	}

	public fetchPolygonInfo() {
		this.store.dispatch([new PolygonsActions.FetchCurrentPolygonInfo()]);
		console.log("Clicked");
	}
}
