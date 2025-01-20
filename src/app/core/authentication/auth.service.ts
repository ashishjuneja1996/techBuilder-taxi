
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, catchError,Observable,iif, map, merge, of, share, switchMap, tap, from } from 'rxjs';
import { filterObject, isEmptyObject } from './helpers';
import { User } from './interface';
import { apiUrl } from './apiUrl';
import { LoginService } from './login.service';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { TokenService } from './token.service';
import { environment } from '../../../environments/environment';
import { EncryptDecryptService } from './encrypt-decrypt.service';
import { ScriptLoaderService } from './script-loader.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private domainToken: any;
  customEncriptionUserJson:any;
  protected readonly EncryptDecryptService= inject(EncryptDecryptService);
  private readonly loginService = inject(LoginService);
  private readonly tokenService = inject(TokenService);
  public readonly BASE_URL2: string;
  public readonly END_POINT: any;
  constructor(  private http: HttpClient,private scriptLoaderService: ScriptLoaderService
  ) {
    this.BASE_URL2 = environment.BASE_URL;
    this.END_POINT = apiUrl;

  }
  private user$ = new BehaviorSubject<User>({});
  private change$ = merge(
    this.tokenService.change(),
    this.tokenService.refresh().pipe(switchMap(() => this.refresh()))
  ).pipe(
    switchMap(() => this.assignUser()),
    share()
  );

  init() {
    return new Promise<void>(resolve => this.change$.subscribe(() => resolve()));
  }

  change() {
    return this.change$;
  }

  check() {
    return this.tokenService.valid();
  }
  login(username: string, password: string, rememberMe = false) {
    return this.loginService.login(username, password, rememberMe).pipe(
      tap(token =>  {
      this.tokenService.set(token);}),
      map(() => this.check())
    );
  }
  login2(username: string, password: string): Observable<any> {
    return this.fetchToken().pipe(
      switchMap(() => {
        const headers = new HttpHeaders({
          'Domain_token': this.domainToken[0].token || '', // Ensure domainToken is set before login
          'Content-Type': 'application/json',
        });

        return this.loginService.login2(username, password, headers);
      }),
      map((user) => {
        const user2=JSON.parse(user);
        if (user2) {
          this.loadGoogleMaps(user2.google_key);
        } else {
          // console.error('Google Maps API key not found.');
        }
        const currentUserData = this.EncryptDecryptService.encryptDataLocal(user2);
        localStorage.setItem('currentUser', currentUserData);
        const userNameData = this.EncryptDecryptService.encryptDataLocal(username);
        localStorage.setItem('userName', userNameData);
        this.tokenService.setToken(user2.token);
        return user;
      }),
      catchError((error) => {
        // console.error('Login failed', error);
        return of(null);
      })
    );
  }
   loadGoogleMaps(apiKey: string): Promise<void> {
    const scriptId = 'googleMapsScript';
    const scriptUrl = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,drawing`;

    return this.scriptLoaderService
      .loadScript(scriptId, scriptUrl)
      .then(() => {
        // this.loadMap.mapSetup();
      })
      .catch((error) => {

        // console.error('Error loading Google Maps script:', error);
      });
  }
  isLoggedInauth(): Observable<boolean> {

    const userJson = this.EncryptDecryptService.decryptDataLocalWithStorage('currentUser');
if(userJson)
{
  // this.loadGoogleMaps(userJson.google_key);
}
    if (!userJson) {
      return of(false);
    }

    const savedUser = userJson;
    const token = savedUser.token;
    return this.loginService.isLoggedIn().pipe(
      switchMap((newUserData: any) => {
        const newUserData2=JSON.parse(newUserData);
        if (newUserData2 && Object.keys(newUserData2).length) {
          newUserData2.token = token;
          newUserData2.user_name = savedUser.user_name;

          if (newUserData2) {
            // this.loadGoogleMaps(newUserData2.google_key);
            // console.error('Google Maps founded ghhhhhhhhhhhh.');
          } else {
            // console.error('Google Maps API key not found.');
          }
          const currentUserData2 = this.EncryptDecryptService.encryptDataLocal(newUserData2);
          localStorage.setItem('currentUser', currentUserData2);
          return of(true);
        } else {
          return this.logout().pipe(map(() => false));
        }
      }),
      catchError(() => {
        return of(false);
      })
    );
  }


  fetchToken(): Observable<any> {
    return this.loginService.fetchOperatorToken().pipe(
      tap((res) => {
        // console.log(JSON.parse(res));
        this.domainToken = JSON.parse(res);
        // console.log(this.domainToken[0].token);
        const domainTokenData = this.EncryptDecryptService
        .encryptDataLocal(this.domainToken[0].token);
        localStorage.setItem('domain-token', domainTokenData);
        this.tokenService.setDomainToken(this.domainToken[0].token);
      }),
      catchError((error) => {
        // console.error('Fetching token failed', error);
        return of(null);
      })
    );
  }

  refresh() {
    return this.loginService
      .refresh(filterObject({ refresh_token: this.tokenService.getRefreshToken() }))
      .pipe(
        catchError(() => of(undefined)),
        tap(token => this.tokenService.set(token)),
        map(() => this.check())
      );
  }

  logout() {
    return this.loginService.logout().pipe(
      tap(() => {
        this.tokenService.clear();
        // localStorage.removeItem('currentUser');
        // localStorage.removeItem('domain-token');
        // localStorage.removeItem('theme-settings');
        // localStorage.removeItem('storedCity');
        // localStorage.removeItem('setCountry');
        // localStorage.removeItem('userName');
        // localStorage.removeItem('vehcleList');
        localStorage.clear();
      }),
      map(() => !this.check())
    );
  }

  user() {
    return this.user$.pipe(share());
  }

  menu() {
    return iif(() => this.check(), this.loginService.menu(), of([]));
  }

  private assignUser() {
    if (!this.check()) {
      return of({}).pipe(tap(user => this.user$.next(user)));
    }

    if (!isEmptyObject(this.user$.getValue())) {
      return of(this.user$.getValue());
    }

    return this.loginService.me().pipe(tap(user => this.user$.next(user)));
  }

  // Method to validate current user from localStorage
  validateUser(): Observable<any> {
    const userJson = this.EncryptDecryptService.decryptDataLocalWithStorage('currentUser');
    const token = this.tokenService.getToken(); // Assuming this retrieves the current token

    if (!userJson || !token) {
      this.logout(); // If no user data or token, logout
      return of(false);
    }

    const user = userJson;

    // Here, you may want to call an API to validate the token or user data
    return this.http.get(`/api/validateUser`, {
      headers: { Authorization: `Bearer ${token}` }
    }).pipe(
      catchError(() => {
        this.logout(); // If the API call fails, logout
        return of(false);
      })
    );
  }
}
