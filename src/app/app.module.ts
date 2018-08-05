import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ShContextMenuModule } from 'ng2-right-click-menu';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from './app.component';
import { dashboardComponent } from "./dashboard/dashboard.component";
import { BaseComponentComponent } from "./dashboard/base-component/base-component.component";
import { NgDragDropModule } from 'ng-drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Chart1Component } from './chart/chart1.component';
import { Chart2Component } from './chart/chart2.component';
import { Chart3Component } from './chart/chart3.component';
import { Chart4Component } from './chart/chart4.component';

@NgModule({
  declarations: [
    AppComponent, dashboardComponent, BaseComponentComponent, Chart1Component, Chart2Component, Chart3Component, Chart4Component
  ],
  imports: [
    BrowserModule, AppRoutingModule,
    ShContextMenuModule, NgDragDropModule.forRoot(), BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [Chart1Component, Chart2Component, Chart3Component, Chart4Component]
})
export class AppModule { }
