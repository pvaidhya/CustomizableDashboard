import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef, ViewChild, Injector, ApplicationRef, AfterViewInit } from '@angular/core';
import { IShContextMenuItem, IShContextOptions, BeforeMenuEvent } from 'ng2-right-click-menu';
import { DropEvent } from 'ng-drag-drop';
import { ComponentListAnimation } from '../../../animations/ComponentListAnimation'
import * as _ from 'underscore';
import { Chart1Component } from "../../chart/chart1.component";
import { Chart2Component } from "../../chart/chart2.component";
import { Chart3Component } from "../../chart/chart3.component";
import { Chart4Component } from "../../chart/chart4.component";

@Component({
  selector: 'base-component',
  templateUrl: './base-component.component.html',
  styleUrls: ['./base-component.component.scss'],
  animations: [ComponentListAnimation]
})

export class BaseComponentComponent implements OnInit {

  chartData: any;
  dashboardTiles = [];
  enableDeleteOnDrag = true;
  UserDetails = {};
  items: IShContextMenuItem[];

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private viewContainerRef: ViewContainerRef, private injector: Injector, private app: ApplicationRef) {
  }
  ngOnInit() {
    this.getDashboardComponents();
    this.getComponentDetails();
  }

  getDashboardComponents() {

    this.dashboardTiles.push({ title: "Chart1", size: "col-md-6", position: 1, uniqueId: "RS_00" + 1, componentName: "Chart1Component" });
    this.dashboardTiles = _.sortBy(this.dashboardTiles, 'position');
    setTimeout(() => {
      this.BuildComponents(null, null);
    }, 1000);
  }

  getComponentDetails() {
    this.items = [
      {
        label: '<i class="menu-icon fa fa-cube"></i> Chart1Component',
        data: {
          componentName: 'Chart1Component',
          size: 'col-md-6'
        },
        onClick: this.openFolderModel,
      },
      {
        label: '<i class="menu-icon fa fa-area-chart"></i> Chart2Component',
        data: {
          componentName: 'Chart2Component',
          size: 'col-md-6'
        },
        onClick: this.openFolderModel,
      },
      {
        label: '<i class="menu-icon fa fa-area-chart"></i> Chart3Component',
        onClick: this.openFolderModel,
        data: {
          componentName: 'Chart3Component',
          size: 'col-md-6'
        },
      },
      {
        label: '<i class="menu-icon fa fa-area-chart"></i> Chart4Component',
        onClick: this.openFolderModel,
        data: {
          componentName: 'Chart4Component',
          size: 'col-md-6'
        },
      }
    ];
  }

  openFolderModel = (event) => {
    debugger;
    this.BuildComponents(event.menuItem.data.componentName, event.menuItem.data.size);
  }

  onBefore = (event: BeforeMenuEvent) => {
    event.open(this.items);
  };

  AddComponents(event) {
    var parentId = event.target.parentElement.id;
    this.ResolveComponents(parentId, null);
  }

  ResolveComponents(parentId, componentName) {
    var factory: any;
    var ref: any;
    let newNode = document.createElement('div');
    newNode.id = 'dynamicComponent';
    var node = document.getElementById(parentId);

    document.getElementById(parentId).appendChild(newNode);

    switch (componentName) {
      case "Chart1Component":
        factory = this.componentFactoryResolver.resolveComponentFactory(Chart1Component);
        ref = factory.create(this.injector, [], newNode);
        this.app.attachView(ref.hostView);
        break;
      case "Chart2Component":
        factory = this.componentFactoryResolver.resolveComponentFactory(Chart2Component);
        ref = factory.create(this.injector, [], newNode);
        this.app.attachView(ref.hostView);
        break;
      case "Chart3Component":
        factory = this.componentFactoryResolver.resolveComponentFactory(Chart3Component);
        ref = factory.create(this.injector, [], newNode);
        this.app.attachView(ref.hostView);
        break;
      case "Chart4Component":
        factory = this.componentFactoryResolver.resolveComponentFactory(Chart4Component);
        ref = factory.create(this.injector, [], newNode);
        this.app.attachView(ref.hostView);
        break;
    }
  }

  BuildComponents(componentName, size) {
    if (componentName != null) {
      var newPosition = this.dashboardTiles.length + 1;
      var result = { title: "Temperature Component", size: size, position: newPosition, uniqueId: "RS_00" + newPosition, componentName: componentName };
      this.dashboardTiles.push(result);
      //this.updateDashboardConfigurations(true, result.position, result.componentName);
      this.ResolveComponents(result.position, result.componentName);
    }
    else {
      debugger;
      this.dashboardTiles.forEach(tiles => {
        this.ResolveComponents(tiles.position, tiles.componentName);
      });
    }
  }

  onDragStart() {
    this.enableDeleteOnDrag = false;
  }

  onDragEnd() {
    this.enableDeleteOnDrag = true;
  }

  onComponentDrop(dragTarget: DropEvent, droppedElementPosition) {
    debugger;
    var draggedElement: any;
    var dropElement: any;
    var localTilesArray = [];
    var dragposition = dragTarget.dragData.position;

    this.dashboardTiles.forEach(element => {
      if (element.position == dragTarget.dragData.position) {
        draggedElement = element;
      }
      else if (element.position == droppedElementPosition) {
        dropElement = element;
      }
      else {
        localTilesArray.push(element);
      }
    });

    draggedElement.position = droppedElementPosition;
    dropElement.position = dragposition;
    localTilesArray.push(draggedElement);
    localTilesArray.push(dropElement);
    this.dashboardTiles = _.sortBy(localTilesArray, 'position');
    this.updateDashboardConfigurations(false, null, null);
  }

  removeItem(item: any, list: Array<any>) {
    let index = list.map(function (e) {
      return e.uniqueId
    }).indexOf(item.uniqueId);
    list.splice(index, 1);
  }

  onDeleteDrop(e: DropEvent) {
    this.removeItem(e.dragData, this.dashboardTiles);
    this.enableDeleteOnDrag = true;
    this.reOrderPositions();
    this.updateDashboardConfigurations(false, null, null);
  }

  reOrderPositions() {
    this.dashboardTiles = _.sortBy(this.dashboardTiles, 'position');
    var i = 1;
    this.dashboardTiles.forEach(tiles => {
      tiles.position = i;
      i = i + 1;
    });
  }

  changeColumnSize(tilePosition) {

    debugger;
    this.dashboardTiles.forEach(tile => {
      if (tile.position == tilePosition) {
        tile.size = (tile.size == "col-md-12") ? "col-md-6" : "col-md-12";
        this.updateDashboardConfigurations(false, null, null);
      }
    });
  }

  updateDashboardConfigurations(isNewAdd, position, componentName) {

    //this.ResolveComponents(position, componentName); 
    if (isNewAdd) {
      this.ResolveComponents(position, componentName);
    }
  }
}
