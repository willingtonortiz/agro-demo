import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { LeafletDrawModule } from "@asymmetrik/ngx-leaflet-draw";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './modules/map/components/map/map.component';
import { PolygonFormComponent } from './modules/map/components/polygon-form/polygon-form.component';
import { PolygonState } from './store/polygon/polygon.state';
import { SharedModule } from './modules/shared/shared.module';
import { PolygonsState } from './store/polygons/polygons.state';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		LeafletModule.forRoot(),
		LeafletDrawModule.forRoot(),
		HttpClientModule,
		ReactiveFormsModule,

		NgxsModule.forRoot([PolygonState, PolygonsState]),
		NgxsReduxDevtoolsPluginModule.forRoot(),

		SharedModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
