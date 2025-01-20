
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
  ElementRef,
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
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  map!: google.maps.Map;
  polygon: google.maps.Polygon | null = null;
  polygon2: google.maps.Polygon | null = null;
  polygons: google.maps.Polygon[] = [];
  overlays: google.maps.GroundOverlay[] = [];
  markers: google.maps.Marker[] = [];
  drawingManager!: google.maps.drawing.DrawingManager;
  cordinates: { x: number; y: number }[][]=[
    [
        {
            x: 30.750591667183723,
            y: 76.79251248515902
        },
        {
            x: 30.738198687486737,
            y: 76.79251248515902
        },
        {
            x: 30.74114954155428,
            y: 76.81757504619418
        }
    ],
    [
        {
            x: 30.7482312225514,
            y: 76.83165127910434
        },
        {
            x: 30.735247743043022,
            y: 76.83405453838168
        },
        {
            x: 30.73347713299836,
            y: 76.86632687724887
        },
        {
            x: 30.74321508562502,
            y: 76.8683868137723
        },
        {
            x: 30.744100305240604,
            y: 76.85293728984652
        }
    ],
      [
          {
              x: 31.32092767978393,
              y: 71.15442078791487
          },
          {
              x: 25.408688084999177,
              y: 70.71496766291487
          },
          {
              x: 24.011486894955134,
              y: 82.18469422541487
          },
          {
              x: 30.680574219094602,
              y: 82.79992860041487
          }
      ],
      [
          {
              x: 34.926603094231204,
              y: 87.63391297541487
          },
          {
              x: 27.064156742422064,
              y: 87.32629578791487
          },
          {
              x: 27.337753764069284,
              y: 100.33410828791486
          },
          {
              x: 34.130124135843424,
              y: 91.58899110041487
          }
      ],
        [
            {
                x: 49.53923160176737,
                y: 51.26374860445189
            },
            {
                x: 34.21604216332086,
                y: 49.85749860445189
            },
            {
                x: 45.996707466413966,
                y: 63.91999860445189
            }
        ],
        [
            {
                x: 54.711717503734825,
                y: 80.79499860445189
            },
            {
                x: 43.24493622962853,
                y: 82.55281110445189
            },
            {
                x: 46.48301282003159,
                y: 102.94343610445189
            },
            {
                x: 56.49868963809721,
                y: 100.13093610445189
            }
        ],
          [
              {
                  x: 25.80615658172619,
                  y: 12.650463778173204
              },
              {
                  x: -11.171574554582998,
                  y: 12.650463778173204
              },
              {
                  x: -12.547770571006872,
                  y: 29.525463778173204
              },
              {
                  x: 15.96801994064358,
                  y: 40.072338778173204
              }
          ],
          [
              {
                  x: 51.62233736167047,
                  y: 120.2285887781732
              },
              {
                  x: 9.802535318832668,
                  y: 111.0879637781732
              },
              {
                  x: 6.322215528500246,
                  y: 159.6035887781732
              },
              {
                  x: 44.092583499590276,
                  y: 161.0098387781732
              }
          ]
];
  requestRideType: number = 1;
  private readonly ngZone = inject(NgZone);
  protected readonly EncryptDecryptService= inject(EncryptDecryptService);
  private readonly settings = inject(SettingsService);
  private readonly tokenService = inject(TokenService);
  private readonly router = inject(Router);
  public readonly END_POINT: any;
  subtleReddishStyle = [
    {
      elementType: 'geometry',
      stylers: [{ color: '#f9e3e6' }]  // Lightened reddish-pinkish background for land
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#ffffff' }]
    },
    {
      elementType: 'labels.text.fill',
      stylers: [{ color: '#a94442' }]  // Soft red for labels
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#e0cfcf' }]  // Light pinkish-red water color
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#f5f5f5' }]  // Standard light color for roads
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [{ color: '#e7e3e3' }]  // Light neutral color for points of interest
    },
    {
      featureType: 'landscape.man_made',
      elementType: 'geometry',
      stylers: [{ color: '#ececec' }]  // Light grey for man-made landscapes
    }
  ];

  subtleBluishStyle = [
    {
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#ffffff' }]
    },
    {
      elementType: 'labels.text.fill',
      stylers: [{ color: '#31708f' }]  // Soft blue for labels
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#cce5f6' }]  // Light blue for water
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#fafafa' }]  // Standard light color for roads
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [{ color: '#e1e8ed' }]  // Light neutral for points of interest
    },
    {
      featureType: 'landscape.man_made',
      elementType: 'geometry',
      stylers: [{ color: '#dfe3e6' }]  // Light grey for man-made landscapes
    }
  ];
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
    today.setHours(0, 0, 0, 0);
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
  imageUrls: string[] = [
    'images/A2B-Logo.png',
    'images/logo_new.png',
    'images/ujeff-long.png',
    'images/mride.png',
    'images/door2fly_logo.svg',
    'images/fareone.png',
    'images/be-taxi-logo.png',
    'images/MIATSC-Logo.png',
  ];
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
    this.initializeMap();
    console.log(this.cordinates);
    this.drawMarkers(this.cordinates,this.imageUrls);
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

    window.open(url, '_blank');
  }
  private initializeMap() {
    const mapOptions: google.maps.MapOptions = {
      zoom: 1,
      styles: this.subtleBluishStyle
    };
    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
  }
  private drawMarkers(
    polygonCoordinatesList: { x: number; y: number }[][],
    imageUrls: string[]
  ) {
    this.resetMarkers(); // Clear existing markers

    polygonCoordinatesList.forEach((coordinates, index) => {
      // Calculate the center of the polygon (or bounding area) for placing the marker
      const center = this.getPolygonCenter(coordinates);

      // Add a custom marker with the image as an icon
      const marker = new google.maps.Marker({
        position: center,
        map: this.map,
        icon: {
          url: imageUrls[index], // Image URL for the marker
          scaledSize: new google.maps.Size(50, 50) // Adjust the size of the marker icon
        }
      });

      this.markers.push(marker); // Store the marker instance
    });

    this.adjustMapBounds(polygonCoordinatesList); // Adjust map bounds to fit all markers
  }
  private getPolygonCenter(coordinates: { x: number; y: number }[]): google.maps.LatLng {
    let latSum = 0;
    let lngSum = 0;

    coordinates.forEach(coord => {
      latSum += coord.x;
      lngSum += coord.y;
    });

    const latCenter = latSum / coordinates.length;
    const lngCenter = lngSum / coordinates.length;

    return new google.maps.LatLng(latCenter, lngCenter);
  }
  private adjustMapBounds(polygonCoordinatesList: { x: number; y: number }[][]) {
    const bounds = new google.maps.LatLngBounds();
    polygonCoordinatesList.forEach(coordinates => {
      coordinates.forEach(coord => {
        bounds.extend({ lat: coord.x, lng: coord.y });
      });
    });
    this.map.fitBounds(bounds); // Adjust map to fit all polygons
  }

  private resetMarkers() {
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = []; // Reset the markers array
  }
  navigateToCustomer(): void {
    this.router.navigate(['/user/customer']);
  }
}


