import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsModule } from "ng2-charts";
import { TestRoutingModule } from './test-routing.module';

import { GraphicComponent } from './components/graphic/graphic.component';
import { IndexComponent } from './pages/index/index.component';


@NgModule({
	declarations: [IndexComponent, GraphicComponent],
	imports: [
		CommonModule,
		TestRoutingModule,
		ChartsModule
	]
})
export class TestModule { }
