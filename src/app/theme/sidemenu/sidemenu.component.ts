import { animate, state, style, transition, trigger } from '@angular/animations';
import { AsyncPipe, CommonModule, NgTemplateOutlet, SlicePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPermissionsModule } from 'ngx-permissions';

import { MenuService } from '@core';
import { NavAccordionItemDirective } from './nav-accordion-item.directive';
import { NavAccordionToggleDirective } from './nav-accordion-toggle.directive';
import { NavAccordionDirective } from './nav-accordion.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { AppSettings, SettingsService } from '@core';
import { EncryptDecryptService } from '@core/authentication/encrypt-decrypt.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    SlicePipe,
    NgTemplateOutlet,
    RouterLink,
    RouterLinkActive,
    NgxPermissionsModule,
    MatIconModule,
    MatRippleModule,
    TranslateModule,
    NavAccordionDirective,
    NavAccordionItemDirective,
    NavAccordionToggleDirective,
    BreadcrumbComponent,
    MatMenuModule,
    MatCardModule,
    MatButtonModule,
  ],
  animations: [
    trigger('expansion', [
      state('collapsed, void', style({ height: '0px', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: '' })),
      transition(
        'expanded <=> collapsed, void => collapsed',
        animate('225ms cubic-bezier(0.4,0,0.2,1)')
      ),
    ]),
  ],
})
export class SidemenuComponent implements OnInit {
  private readonly settings = inject(SettingsService);
  protected readonly EncryptDecryptService= inject(EncryptDecryptService);
  options = this.settings.options;
  @Input() ripple = false;
  showMenu:number=0;
  private readonly menu = inject(MenuService);
  menu$ = this.menu.getAll();
  buildRoute = this.menu.buildRoute;
  sideBarMenu: any[] = []; // Initialize as an array

  ngOnInit(): void {
    // const domainMatch = /:\/\/([^/]+)/.exec('https://admin-panel.mride.co.uk/auth/login');

    const domainMatch = /:\/\/([^/]+)/.exec(window.location.href);
    const domain = domainMatch ? domainMatch[1] : '';
  // console.log(domain);


  // Define URL-based color mappings
  if (domain.includes('admin-panel.mride.co.uk')) {
    this.showMenu=1;
  }else if (domain.includes('admin-panel.BeTaxiMK.com')){
    this.showMenu=2;
  } else {
    this.showMenu=0;
  }

    let permissionMenu: any;
    const currentUser = this.EncryptDecryptService.decryptDataLocalWithStorage('currentUser');

    if (currentUser?.access_menu) {
      permissionMenu = currentUser?.access_menu;
    }

    // Subscribe to the menu$ observable to get the menu data
    // this.menu$.subscribe(menu => {
    //   console.log('menu.json array', menu)
    //   console.log('local storage array', permissionMenu)
    //   this.sideBarMenu = this.filterMenuByPermissions(menu, permissionMenu);

    //   this.menu.set(this.sideBarMenu);

    //   console.log('UpdatedsideBarMenu  Data:', this.sideBarMenu);
    // });
  }

  filterMenuByPermissions(menuData: any[], permissionMenu: any[]): any[] {
    const allowedSlugs = new Set(permissionMenu.map(tab => tab.slug.toLowerCase()));

    const filterItems = (items: any[]): any[] => {
      return items.reduce((filteredItems, item) => {
        const matchesParent = allowedSlugs.has(item.slug.toLowerCase());
        const filteredChildren = item.children ? filterItems(item.children) : [];

        if (matchesParent || filteredChildren.length > 0) {
          const newItem = {
            ...item,
            ...(matchesParent ? permissionMenu.find(tab => tab.slug.toLowerCase() === item.slug.toLowerCase()) : {}),
            children: filteredChildren.length > 0 ? filteredChildren : [],
          };

          filteredItems.push(newItem);
        }

        return filteredItems;
      }, []);
    };

    return filterItems(menuData);
  }
}
