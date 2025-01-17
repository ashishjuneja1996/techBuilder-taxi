import { KeyValuePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateService } from '@ngx-translate/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { AppSettings, SettingsService } from '@core';
import { EncryptDecryptService } from '@core/authentication/encrypt-decrypt.service';
// <button mat-icon-button [matMenuTriggerFor]="menu">
//   <mat-icon>translate</mat-icon>
// </button>

// <mat-menu #menu="matMenu">
//   @for (lang of langs | keyvalue; track lang) {
//     <button mat-menu-item (click)="useLanguage(lang.key)">
//       <span>{{ lang.value }}</span>
//     </button>
//   }
// </mat-menu>
@Component({
  selector: 'app-translate',
  template: `

    <section class="example-section">
    <p>{{ checked ? 'Enable Taxi Service':'Enable Delivery Service'}}</p>
    @if(checked===false)
    {
  <div class="toggle-image-block" (click)=onToggleChange(true)>
<img src="images/venus-toggle.png" alt="image">
    </div>
    }
  @else
  {
<div class="toggle-image-block" (click)=onToggleChange(false)>
 <img src="images/delivery-toggle.png" alt="image">
    </div>
  }



</section>
  `,
  styles: [`
   section.example-section {
    display: flex;
    align-items: center;
    justify-content: center;
}
    section.example-section p
    {
    margin-bottom: 0px;
    margin-right: 10px;
    font-size: 16px;
    }
    .toggle-image-block
    {
    width:40px;
    cursor:pointer;
    }
    .toggle-image-block img
    {
    width:100%
    }
  `],
  standalone: true,
  imports: [KeyValuePipe, MatButtonModule, FormsModule,
     MatIconModule, MatMenuModule, MatRadioModule, MatCheckboxModule, MatSlideToggleModule,],
})
export class TranslateComponent implements OnInit {
  // @Output() optionsChange = new EventEmitter<AppSettings>();
  protected readonly EncryptDecryptService= inject(EncryptDecryptService);
  private readonly translate = inject(TranslateService);
  private readonly settings = inject(SettingsService);
  checked: boolean = false;
  options = this.settings.options;
  langs = {
    'en-US': 'English',
    'en-US2': 'English2',
    'zh-CN': '中文简体',
    'zh-TW': '中文繁体',
  };
  dark: AppSettings = {
    navPos: 'side',
    dir: 'ltr',
    theme: 'dark',
    showHeader: true,
    headerPos: 'fixed',
    showUserPanel: true,
    sidenavOpened: true,
    sidenavCollapsed: false,
    language: 'en-US2'
  };
  light: AppSettings = {
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
  operatorId: any;

  constructor() {
    this.translate.addLangs(['en-US', 'en-US2', 'zh-CN', 'zh-TW']);
  }
  ngOnInit() {
    const userJson = this.EncryptDecryptService.decryptDataLocalWithStorage('currentUser');
    if (userJson) {
      this.operatorId = userJson.operator_id;
    }
    if (this.operatorId === 149167 || this.operatorId === 149168) {
      this.onToggleChange(true);
    }
    if (this.options.theme === 'dark') {
      this.checked = true;
    } else {
      this.checked = false;
    }

  }
  onToggleChange(event: any) {
    // console.log("disabled "+event.checked)
    if (event === true) {
      this.checked = true;
      this.useLanguage2('en-US2');
      this.sendOptions(this.dark);
    } else {
      this.checked = false;
      this.useLanguage2('en-US');
      this.sendOptions(this.light);
    }
    if (this.operatorId !== 149167 && this.operatorId !== 149168) {
      window.location.reload();
    }
    //
  }

  useLanguage2(language: string) {
    this.translate.use(language);
    this.settings.setLanguage(language);
  }

  useLanguage(language: string) {
    this.translate.use(language);
    this.settings.setLanguage(language);
  }
  sendOptions(options: AppSettings) {
    // console.log(options)
    this.options = options;
    this.settings.setOptions(options);
    this.settings.setTheme();
    // this.optionsChange.emit(options);
  }
}
