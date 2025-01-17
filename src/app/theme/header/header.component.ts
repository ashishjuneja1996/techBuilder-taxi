import {AfterViewInit, Component, ViewChild,ChangeDetectionStrategy, OnDestroy,
  OnInit,ChangeDetectorRef,EventEmitter, Input, Output, ViewEncapsulation,
  inject} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import screenfull from 'screenfull';

import { BrandingComponent } from '../widgets/branding.component';
import { TranslateComponent } from '../widgets/translate.component';
import { UserComponent } from '../widgets/user.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ApiService } from '@core/authentication/api-service';

import { BreadcrumbComponent } from '@shared';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { EncryptDecryptService } from '@core/authentication/encrypt-decrypt.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  host: {
    class: 'matero-header',
  },
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    BrandingComponent,
    UserComponent,
    MatSelectModule,
    MatRadioModule, MatCheckboxModule, MatSlideToggleModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
  ],
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy{
  operatorId: any;
  constructor(
    private SERVER:ApiService,
    private cdr: ChangeDetectorRef,
  ) {

  }
  protected readonly EncryptDecryptService= inject(EncryptDecryptService);
  countries: any[] = [];
  data: any[] = [];
  checked = false;
  dark={
    navPos: 'side',
    dir: 'ltr',
    theme: 'dark',
    showHeader: true,
    headerPos: 'fixed',
    showUserPanel: true,
    sidenavOpened: true,
    sidenavCollapsed: false,
    language: 'en-US'
};
light={
  navPos: 'side',
  dir: 'ltr',
  theme: 'light',
  showHeader: true,
  headerPos: 'fixed',
  showUserPanel: true,
  sidenavOpened: true,
  sidenavCollapsed: false,
  language: 'en-US'
};
  disabled = false;
  operatorName: string = '';
  selectedCity: number | null=null;
  @Input() showToggle = true;
  @Input() showBranding = false;

  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleSidenavNotice = new EventEmitter<void>();
  ngOnInit() {

   }
   ngOnDestroy() {

   }
   ngAfterViewInit() {
   }
  toggleFullscreen() {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  }

}
