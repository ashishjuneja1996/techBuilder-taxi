import { Injectable, inject } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { apiUrl } from './apiUrl';
import { Menu } from '@core';
import { Token, User } from './interface';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import{EncryptDecryptService} from './encrypt-decrypt.service';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root',
})
export class LoginService {
   private readonly toast = inject(ToastrService);
  public readonly BASE_URL2: string;
  public readonly END_POINT: any;
  protected readonly EncryptDecryptService= inject(EncryptDecryptService);
  protected readonly http = inject(HttpClient);
  tokenService: any;

  constructor(
  ) {
    this.BASE_URL2 = environment.BASE_URL;
    this.END_POINT = apiUrl;

  }
  private addAuthorizationHeader(): HttpHeaders {
    const userData: any = this.EncryptDecryptService.decryptDataLocalWithStorage('domain-token');
    // console.log(userData)
    const accessToken = userData ? userData : null;
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Domain_token': accessToken ? `${accessToken}` : ''
    });
  }
  login2(email: string, password: string, headers?: HttpHeaders) {
    // const headers = this.addAuthorizationHeader();
    const httpHeaders = headers || new HttpHeaders();

    // Example of adding headers if needed
    const requestOptions = {
      headers: httpHeaders
    };
    return this.http.post<Token>(`${this.BASE_URL2}${this.END_POINT.adminLogin}`, { email, password }, requestOptions)
    .pipe(
      map((response) => {
        // console.log(response);
// const ashish=this.EncryptDecryptService.decryptData(response.data);
// console.log(ashish);
        // Use the decryption service to decrypt the data
        return this.EncryptDecryptService.decryptData(response.data);
      })
    );
  }
  login(username: string, password: string, rememberMe = false) {
    return this.http.post<Token>('/auth/login', { username, password, rememberMe });
  }
  refresh(params: Record<string, any>) {
    return this.http.post<Token>('/auth/refresh', params);
  }

  logout() {
    return this.http.post<any>('/auth/logout', {});
  }
  check() {
    throw new Error('Method not implemented.');
  }
  private getSubDomain(): string {
    const domainMatch = /:\/\/([^/]+)/.exec(window.location.href);
    // const domainMatch = /:\/\/([^\/]+)/.exec('https://admin-panel.mride.co.uk/auth/login ');
    const subDomain = domainMatch?.[1] || 'chuki-admin.venustaxi.in'; // Ensure subDomain is always a string
    return domainMatch?.[1] === 'localhost:50304' ? 'chuki-admin.venustaxi.in' : subDomain; // Return subDomain instead of domainMatch?.[1]
  }
  // fetchOperatorToken(): Observable<any> {
  //   return this.http.post<any>(`${this.BASE_URL2}${this.END_POINT.forFetchToken}`, { domain: this.getSubDomain()}).pipe(
  //     map((response) => {
  //       const { data, iv } = response; // Assuming API returns `{ data, iv }`
  //       return this.EncryptDecryptService.decryptData(response.data);
  //     })
  //   );
  // }
  fetchOperatorToken(): Observable<any> {
    return this.http
      .post<any>(`${this.BASE_URL2}${this.END_POINT.forFetchToken}`, { domain: this.getSubDomain() })
      .pipe(
        map((response) => {
          if (response.message !=='' && response.status==='success') {
            this.toast.success(response.message);
          }
          else if (response.message !=='' && response.status==='error') {
            this.toast.error(response.message);
          }else if (response.message ==='' && response.status==='error') {
            this.toast.error('ERROR');
          }
          return this.EncryptDecryptService.decryptData(response.data);
        })
      );
  }
  // fetchOperatorToken(): Observable<any> {
  //   // eslint-disable-next-line no-debugger
  //   // debugger;
  //   return this.http.post<any>(`${this.BASE_URL2}${this.END_POINT.forFetchToken}`, { domain: this.getSubDomain() })
  //     .pipe(
  //       map(response => {
  //         console.log(response);
  //         if (response.status === 'success' && response.data) {
  //           const decryptedData = this.EncryptDecryptService.decrypt(response.data);
  //           try {
  //             // Parse the decrypted data if it's JSON
  //             return JSON.parse(decryptedData);
  //           } catch (e) {
  //             console.error('Failed to parse decrypted data:', e);
  //             return null;
  //           }
  //         } else {
  //           console.error('Invalid response format or status:', response);
  //           return null;
  //         }
  //       }),
  //       catchError(error => {
  //         console.error('Error fetching operator token:', error);
  //         return of(null);
  //       })
  //     );
  // }
  // fetchOperatorToken(): Observable<any> {
  //   return this.http.post<any>(`${this.BASE_URL2}${this.END_POINT.forFetchToken}`, { domain: this.getSubDomain() })
  //     .pipe(
  //       map(response => {
  //         console.log('Raw Response:', response);
  //         if (response.status === 'success' && response.data) {
  //           const decryptedData = this.EncryptDecryptService.decryptData(response.data);
  //           console.log('Decrypted Data:', decryptedData);

  //           if (!decryptedData) {
  //             console.error('Decryption failed or returned empty string.');
  //             return null;
  //           }

  //           try {
  //             return JSON.parse(decryptedData);
  //           } catch (e) {
  //             console.error('Failed to parse decrypted data:', e, 'Decrypted:', decryptedData);
  //             return null;
  //           }
  //         } else {
  //           console.error('Invalid response format or status:', response);
  //           return null;
  //         }
  //       }),
  //       catchError(error => {
  //         console.error('Error fetching operator token:', error);
  //         return of(null);
  //       })
  //     );
  // }
  me() {
    return this.http.get<User>('/me');
  }

  menu() {
    return this.http.get<{ menu: Menu[] }>('/me/menu').pipe(map(res => res.menu));
  }
  isLoggedIn(): Observable<any> {
    const userData=this.EncryptDecryptService.decryptDataLocalWithStorage('currentUser');
    const accessToken = this.EncryptDecryptService.decryptDataLocalWithStorage('domain-token');
    const token = userData.token;

    const headers = new HttpHeaders({
      Domain_token: accessToken ? `${accessToken}` : '',
    });

    const params = new HttpParams().set('token', token || '');

    return this.http
      .get<any>(`${this.BASE_URL2}${this.END_POINT.isLoggedIn}`, {
        headers,
        params,
      })
      .pipe(
        map((response) => {
          // console.log('Raw API Response:', response); // Log the raw response
          if (!response || !response.data) {
            throw new Error('Invalid response format');
          }
          if (response.message !=='' && response.status==='success') {
            this.toast.success(response.message);
          }
          else if (response.message !=='' && response.status==='error') {
            this.toast.error(response.message);
          }else if (response.message ==='' && response.status==='error') {
            this.toast.error('ERROR');
          }
          // Decrypt the data
          const decryptedData = this.EncryptDecryptService.decryptData(response.data);
          // console.log('Decrypted Response Data:', decryptedData); // Log decrypted data
          return decryptedData;
        }),
        catchError((error) => {
          console.error('Error in isLoggedIn API:', error); // Log errors
          return of([]); // Return an empty array on error
        })
      );
  }

}
