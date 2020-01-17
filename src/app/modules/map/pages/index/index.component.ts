import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Select, Store } from '@ngxs/store';
import { PolygonsState, Polygon } from 'src/app/store/polygons/polygons.state';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

	@Select(state => state.AppPolygons.polygons) polygons$: Observable<Polygon[]>;
	// public polygons$: Observable<any>;
	public polygons: Array<any>;

	constructor(private store: Store) {
		// this.polygons = [];
		// this.polygons$ = this.store.select(state => state.Polygons.polygons);
	}

	ngOnInit() {
		this.polygons$.subscribe({
			next: (data) => {
				this.polygons = data;
			}
		});
	}

}
