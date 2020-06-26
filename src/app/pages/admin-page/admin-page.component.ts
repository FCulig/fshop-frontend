import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentFactory, ComponentRef, AfterViewInit } from '@angular/core';
import { UserListComponent } from 'src/app/components/user-list/user-list.component';
import { CategoryManagerComponent } from 'src/app/components/category-manager/category-manager.component';
import { PromotionRequestManagerComponent } from 'src/app/components/promotion-request-manager/promotion-request-manager.component';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements AfterViewInit {

  @ViewChild('container', { read: ViewContainerRef }) container;

  activeComponentKey;
  activeComponent;

  constructor(private resolver: ComponentFactoryResolver) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.setActiveComponent('CATEGORY_MANAGER');
      this.createComponent(this.activeComponent);
    });
  }

  onMenuClick(key: string) {
    this.container.clear();
    this.setActiveComponent(key);
    this.createComponent(this.activeComponent);
  }

  createComponent(component) {
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(component);
    let componentRef = this.container.createComponent(factory);
  }

  setActiveComponent(key: string) {
    this.activeComponentKey = key;
    this.activeComponent = this.getComponenet(key);
  }

  getComponenet(key: string): any {
    switch (key) {
      case 'USER_LIST':
        return UserListComponent;
      case 'CATEGORY_MANAGER':
        return CategoryManagerComponent;
      case 'PROMOTION_REQUEST_MANAGER':
        return PromotionRequestManagerComponent;
    }
  }

}
