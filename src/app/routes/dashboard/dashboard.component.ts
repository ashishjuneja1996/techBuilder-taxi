
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MtxProgressModule } from '@ng-matero/extensions/progress';
import { AppSettings, SettingsService, } from '@core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {apiUrl } from '@core/authentication/apiUrl';
// import { DashboardService } from './dashboard.service';
import {
  AfterViewInit, Component, ViewChild, ChangeDetectionStrategy, OnDestroy,
  OnInit, ChangeDetectorRef,NgZone,
  inject,
  Inject,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApexOptions } from 'apexcharts';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ApiService } from '@core/authentication/api-service';
import { MatOptionModule } from '@angular/material/core';
import { BreadcrumbComponent } from '@shared';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule, JsonPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatRadioModule } from '@angular/material/radio';
import { Subscription } from 'rxjs';
import { TokenService } from '@core/authentication/token.service';
import { ExcelService } from '@shared/services/excel.service';
import { AmpmDatePipe } from '@shared/pipes/ampm-date.pipe';
import ApexCharts from 'apexcharts';
import { EncryptDecryptService } from '@core/authentication/encrypt-decrypt.service';
import { ScriptLoaderService } from '@core/authentication/script-loader.service';
export interface productElements {
  id: number;
  name: string;
  imageUrl: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatChipsModule,
    MatListModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MtxProgressModule,
    MatRadioModule, FormsModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
     MatPaginatorModule,
    MatToolbarModule,
    MatSelectModule,
    MatOptionModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    CommonModule,
    MatTabsModule,
    MatDatepickerModule,
    TranslateModule,
    GoogleMapsModule
    ],
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  dashboardStatus:any={};
  private readonly ngZone = inject(NgZone);
  protected readonly EncryptDecryptService= inject(EncryptDecryptService);
  private readonly settings = inject(SettingsService);
  // private readonly dashboardSrv = inject(DashboardService);
  private readonly tokenService = inject(TokenService);
  private readonly router = inject(Router);
  public readonly END_POINT: any;
  productsArray:productElements[]=[
    {
      id:1,
      imageUrl:'images/A2B-Logo.png',
      name:'A2B'
    },
    {
      id:2,
      imageUrl:'images/logo_new.png',
      name:'Supper App'
    },
    {
      id:3,
      imageUrl:'images/vyba_logo.png',
      name:'Vyba'
    },
    {
      id:4,
      imageUrl:'images/ujeff-long.png',
      name:'Ujeff'
    },
    {
      id:5,
      imageUrl:'images/mride.png',
      name:'MRide'
    },
    {
      id:6,
      imageUrl:'images/logo-sharp.png',
      name:'Sharpally'
    },
    {
      id:7,
      imageUrl:'images/MIATSC-Logo.png',
      name:'TaxiKo'
    },
    {
      id:8,
      imageUrl:'images/be-taxi-logo.png',
      name:'Be Taxi'
    },
    {
      id:9,
      imageUrl:'images/mcarrental.png',
      name:'M Car Rentel'
    },
    {
      id:10,
      imageUrl:'images/fareone.png',
      name:'Fare 1'
    },
    {
      id:11,
      imageUrl:'images/elite_ride_logo.svg',
      name:'Elite Ride'
    },
    {
      id:12,
      imageUrl:'images/door2fly_logo.svg',
      name:'Door2fly'
    },
  ];
  dateFilter = (d: Date | null): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ensure it's midnight today
    return d ? d <= today : false;
  };
  maxDate = new Date();
  startDate:any;
  barGraphData:any;
  endDate:any;
  cityArray:any=[];
  stroedCity:any;
  token: string | null = null;
  domainToken: string | null = null;
  currentCity:any;
  utcOffset:any;
  selectedOption: string = 'customer';
  searchId:(number | null)=null;
  isDateRangeModified: any = false;
  @ViewChild('customerPaginator') customerPaginator!: MatPaginator;
  currency:any;
  constructor(
    private SERVER:ApiService,
    private cdr: ChangeDetectorRef,
    private excelService: ExcelService,
    private googleMapsLoader: ScriptLoaderService

  ) {}
  ngOnInit() {
    this.googleMapsLoader.load()
    .then(() => {
      // this.mapSetup();
      console.log('maps done');
      
    })
    .catch((error) => {
      console.error('Error loading Google Maps:', error);
    });
  }
  getCityNameById(city_id: number): string {
    const city = this.cityArray.find((item: { city_id: number; }) => item.city_id === city_id);
    return city ? city.utc_offset : 'Unknown';
  }
  ngAfterViewInit() {
    // this.ngZone.runOutsideAngular(() => this.initCharts());
  }


  ngOnDestroy() {

  }
  goToLive(value: number): void {
    let url: string;

    switch (value) {
      case 1:
        url = 'https://admin-panel.a2blogistics.co';
        break;
      case 2:
        url = 'https://chuki-admin.venustaxi.in/auth/login';
        break;
      case 3:
        url = 'https://admin-panel.vybaenterprises.com/auth/login';
        break;
      case 4:
        url = 'https://admin.ujeff.app/';
        break;
      case 5:
        url = 'https://admin-panel.mride.co.uk/auth/login';
        break;
        case 6:
        url = 'https://dashboard.sharpally.com/auth/login';
        break;
      case 7:
        url = 'https://admin-panel.taksiko.com/';
        break;
      case 8:
        url = 'https://admin-panel.BeTaxiMK.com/auth/login';
        break;
      case 9:
        url = 'https://admin-mcarrentals.venustaxi.in/';
        break;
      case 10:
        url = 'https://admin-panel.fare1.co.uk/';
        break;
        case 11:
          url = 'https://dashboard.parisdisneytaxitransfer.com/auth/login';
          break;
        case 12:
          url = 'https://dashboard.door2fly.lu/dashboard#/app/dashboard/';
          break;
      default:
        console.error('Invalid value provided');
        return; // Exit the function if the value doesn't match any case
    }

    window.open(url, '_blank'); // Opens the URL in a new tab
  }




  navigateToCustomer(): void {
    this.router.navigate(['/user/customer']);
  }
}


