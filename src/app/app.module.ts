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
import { MapComponent } from './map/map.component';
import { PolygonFormComponent } from './polygon-form/polygon-form.component';

@NgModule({
	declarations: [
		AppComponent,
		MapComponent,
		PolygonFormComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		LeafletModule.forRoot(),
		LeafletDrawModule.forRoot(),
		HttpClientModule,
		ReactiveFormsModule,
		// NgxsModule.forRoot([ZooState])
		// NgxsReduxDevtoolsPluginModule.forRoot()
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
