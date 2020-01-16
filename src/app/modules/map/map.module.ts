import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapRoutingModule } from './map-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { IndexComponent } from './pages/index/index.component';
import { MapComponent } from './components/map/map.component';
import { PolygonFormComponent } from './components/polygon-form/polygon-form.component';


@NgModule({
	declarations: [IndexComponent, MapComponent, PolygonFormComponent],
	imports: [
		CommonModule,
		MapRoutingModule,
		ReactiveFormsModule
	]
})
export class MapModule { }
