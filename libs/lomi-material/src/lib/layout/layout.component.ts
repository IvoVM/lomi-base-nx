import { Component, ComponentRef, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { ActivationEnd, NavigationEnd, Route, Router, RouterModule } from '@angular/router';
import { MenuRoute } from '../../interfaces/Route.type';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ModalsService } from './modals.service';
import { AdDirective } from './ad.directive';
import { AdModule } from './ad.module';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lm-layout',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterModule, MatSidenavModule, AdModule, MatIconModule],
  providers: [ModalsService, AdDirective],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  routes: MenuRoute[] = []
  public title = 'Lomi Material';
  public breadcrumbs: Route[] = [];
  public rootPath = 'admin'
  public openedComponent:ComponentRef<any> | null = null;
  public opened = false;
  public menuOpened = false;

  private modalsService:ModalsService =  inject(ModalsService)

  @ViewChild(AdDirective, {static: true}) adHost!: AdDirective;
  @Output() menuItemClicked: EventEmitter<any> = new EventEmitter();
  
  currentAdIndex = -1;


  loadComponent(component:any, data:any) {
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<any>(component);
    Object.keys(data).forEach((value:any, index)=>{
      componentRef.instance[value] = Object.values(data)[index]
    })
  }

  getPath(index:any){
    console.log(this.breadcrumbs, this.rootPath)
    return this.rootPath + this.breadcrumbs.slice(0, index + 1).map((breadcrumb: any) => {
      return breadcrumb.path
    }).join('/')
  }

  constructor(router: Router) {
    this.modalsService.currentComponent$.subscribe((component)=>{
      if(component){
        this.openedComponent = component.component;
        this.opened = true;
        this.loadComponent(component.component, component.data)
        console.log(component,"opened")
      } else {
        this.opened = false;
        console.log(component,"closed")
      }
    })
    const AdminMainRoute = router.config.find((route: any) => {
      return route.data && route.data.headerRoot
    })
    this.rootPath = AdminMainRoute?.path as string
    console.log(this.rootPath)

    if(AdminMainRoute?.children){
      this.routes = AdminMainRoute?.children.filter((route:any)=>{
        return route.data && route.data.navData
      }).map((route: any) => {
        return {
          routeHref: route.path,
          name: route.data.navData.title
        }
      })
    }

    
    router.events.subscribe((event) => {
      this.breadcrumbs = router.url.split('/').map((url: string) => {
        return {
          path: url.replace(this.rootPath || '', ''),
        }
      }).splice(1)
      if(event instanceof ActivationEnd){
        const navData = event.snapshot.data as any
        if(navData?.navData){
          this.title = navData.navData.title
        }
      }
    })
  }
}