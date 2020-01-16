import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';


const routes: Routes = [{
	path: '',
	redirectTo: 'map',
	pathMatch: 'full'
}, {
	path: 'map',
	loadChildren: () => import('./modules/map/map.module').then(m => m.MapModule)
}, {
	path: 'graphs',
	loadChildren: () => import('./modules/graphics/graphics.module').then(m => m.GraphicsModule)
}, {
	path: 'test',
	loadChildren: () => import('./modules/test/test.module').then(m => m.TestModule)
}];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
