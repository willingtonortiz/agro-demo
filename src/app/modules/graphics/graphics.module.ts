import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphicsRoutingModule } from './graphics-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { NdviGraphComponent } from './components/ndvi-graph/ndvi-graph.component';


@NgModule({
  declarations: [IndexComponent, NdviGraphComponent],
  imports: [
    CommonModule,
    GraphicsRoutingModule
  ]
})
export class GraphicsModule { }
