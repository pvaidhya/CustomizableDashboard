import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { ComponentListAnimation } from '../../animations/ComponentListAnimation'
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class dashboardComponent implements OnInit {

  chartData: any;
  constructor(private componentFactoryResolver: ComponentFactoryResolver, private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit() {
  }

}
