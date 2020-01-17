import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngxs/store';
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
		console.log(this.polygon);
		this.makerService.drawPolygon(this.polygon.coordinates);
		console.log("Clicked");
	}
}
