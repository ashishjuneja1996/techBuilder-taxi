import { Injectable, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { apiUrl } from './apiUrl';
import { Location } from '@angular/common';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TokenService } from './token.service';
import{EncryptDecryptService} from './encrypt-decrypt.service';
declare let jQuery: any;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly tokenService = inject(TokenService);
  protected readonly EncryptDecryptService= inject(EncryptDecryptService);
  token: string | null = null;
  domainToken: string | null = null;
  requestRideType: number = 1;
  private currentUser: any;
  public readonly BASE_URL2: string;
  public readonly END_POINT: any;
  private subject = new BehaviorSubject<any>(null);
  public title = this.subject.asObservable();
  private loaderSubject = new BehaviorSubject<any>(null);
  public loaderStatus = this.loaderSubject.asObservable();
  currentLanugae: any = 'en';
  apiLoader: boolean = false;
  isSubmitting: boolean;
  operatorId: any;
  constructor(
    private router: Router,
    private http: HttpClient,
    private location: Location,
  ) {
    this.END_POINT = apiUrl;
    const selectedTheme = localStorage.getItem('theme-settings');
    if (selectedTheme) {
      const selectedTheme2 = JSON.parse(selectedTheme);
      this.requestRideType = selectedTheme2?.theme === 'dark' ? 2 : 1;
    }

    this.tokenService.domainTokenSignal$.subscribe((token) => {
      this.domainToken = token;
    });

    this.tokenService.tokenSignal$.subscribe((token) => {
      this.token = token;
    });

    if (this.domainToken === null || this.domainToken === '') {
      const userJson2 = this.EncryptDecryptService.decryptDataLocalWithStorage('domain-token');
      if (userJson2) {
        if (userJson2 !== null || userJson2 !== '') {
          this.domainToken = userJson2;
        }
      }
    }

    if (this.token === null || this.token === '') {
      const userJson = this.EncryptDecryptService.decryptDataLocalWithStorage('currentUser');
      if (userJson) {
        if (this.token !== null || this.token !== '') {
          this.token = userJson.token;
        }
      }
    }

    this.BASE_URL2 = environment.BASE_URL;
    // this.CSP_URL = environment.BASE_URL;
    // this.OPERARIONS_URL = environment.BASE_URL;
    this.isSubmitting = false;
    // this.AUTOS_URL = environment.BASE_URL;
    // this.loginUrl = environment.BASE_URL;
  }
  // Replace with a secure key
  private addDomainHeaders() {
    const userData: any = this.EncryptDecryptService.decryptDataLocalWithStorage('domain-token');
    const accessToken = userData ? userData : null;
    const userJson = this.EncryptDecryptService.decryptDataLocalWithStorage('currentUser');

    if (userJson) {
      this.operatorId = userJson.operator_id;
    }

    if (this.operatorId === 149167 || this.operatorId === 149168) {
      this.requestRideType = 2;
    }

    return new HttpHeaders({
      Domain_token: accessToken ? `${accessToken}` : '',
      request_ride_type: this.requestRideType
    });
  }
  private addOperatorHeaders() {
    const userJson = this.EncryptDecryptService.decryptDataLocalWithStorage('currentUser');
    const userData = this.EncryptDecryptService.decryptDataLocalWithStorage('domain-token');
    const accessToken = userData ? userData : null;
    if (userJson) {
      this.operatorId = userJson.operator_id;
    }

    if (this.operatorId === 149167 || this.operatorId === 149168) {
      this.requestRideType = 2;
    }

    return new HttpHeaders({
      Domain_token: accessToken ? `${accessToken}` : '',
      operatorToken: accessToken ? `${accessToken}` : '',
      request_ride_type: this.requestRideType
    });
  }

  private addAuthorizationHeader2() {
    const userData2 = this.EncryptDecryptService.decryptDataLocalWithStorage('currentUser');
    this.token = userData2.token ? userData2.token : null;
    return this.token;
  }

  getDataTaxi(url: string, params: { [key: string]: any }): Observable<any> {
    const headers = this.addOperatorHeaders();
    this.addAuthorizationHeader2();
    params.token = this.token;

    let httpParams = new HttpParams();
    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        httpParams = httpParams.set(key, params[key]);
      }
    }

    return this.http.get<any>(`${this.BASE_URL2}${url}`, { headers, params: httpParams })
    .pipe(
      map((response) => {
        return JSON.parse(this.EncryptDecryptService.decryptData(response.data));
      }),
      catchError(this.handleError)
    );
  }
  // OPERARIONS_URL block ----------------------------------
  postDataTaxi(url: string, body: any, params?: { [key: string]: any }): Observable<any> {
    const headers = this.addDomainHeaders();
    this.addAuthorizationHeader2();
    body.token = this.token;
    let httpParams = new HttpParams();
    if (params) {
      for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
          httpParams = httpParams.set(key, params[key]);
        }
      }
    }

    return this.http.post<any>(`${this.BASE_URL2}${url}`, body, { headers, params: httpParams }).pipe(
      map((response) => {
        // if (response.message !=='' && response.status==='success') {
        //   this.toast.success(response.message);
        // }
        // else if (response.message ==='' && response.status==='success') {
        //   this.toast.success('SUCCESS');
        // }
        // else if (response.message !=='' && response.status==='error') {
        //   this.toast.error(response.message);
        // }else if (response.message ==='' && response.status==='error') {
        //   this.toast.error('ERROR');
        // }
        return JSON.parse(this.EncryptDecryptService.decryptData(response.data));
      }),
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }

  POST_DATA_WITH_HEADER_PROFILE_UPLOAD(url: string, data: any) {
    const userData = this.EncryptDecryptService.decryptDataLocalWithStorage('currentUser');
    const headers = new HttpHeaders({
      /*  'Content-Type': 'application/json', */
      Authorization: `${userData.accessToken}`,
    });

    return this.http.post<any>(this.BASE_URL2 + url, data, {
      reportProgress: false,
      headers,
    });
  }
}
