import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
import { apiUrl } from '@core/authentication/apiUrl';
import { BehaviorSubject, Observable } from 'rxjs';
import { EncryptDecryptService } from '@core/authentication/encrypt-decrypt.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleFareSettingsService {
  public readonly BASE_URL2: string;
  public readonly END_POINT: any;
  protected readonly EncryptDecryptService= inject(EncryptDecryptService);
  public readonly VEHICLE_LIST:any;
  private domainToken: any;
  private storage: any = localStorage;
  public readonly INSERT_VEHICLE_TYPE: string;
  requestRideType:number=1;
  operatorId: any;

  constructor(private http: HttpClient) {
    this.getDomainToken();
    this.BASE_URL2 = environment.BASE_URL;
    this.END_POINT = apiUrl.vehicleFareSettings;
    this.VEHICLE_LIST  = apiUrl.vehicleList;
    this.INSERT_VEHICLE_TYPE = apiUrl.insertVehicleFareSettings;
    const selectedTheme=localStorage.getItem('theme-settings');
    if(selectedTheme)
    {
      const selectedTheme2=JSON.parse(selectedTheme);
      this.requestRideType=selectedTheme2?.theme==='dark' ? 2 : 1;
    }
  }

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
      'Domain_token': accessToken ? `${accessToken}` : '',
      'request_ride_type': this.requestRideType,
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    });
  }

  /**
   * This is used to get domain token.
   * @returns
   */
  getDomainToken() {
    this.domainToken = this.EncryptDecryptService.decryptDataLocalWithStorage('domain-token');
    return this.domainToken;
  }

  /**
   * This is used to encoded.
   * @param params
   * @returns
   */
  toUrlEncoded(params: any): string {
    let encodedParams = new HttpParams();
    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        encodedParams = encodedParams.set(key, params[key]);
      }
    }
    return encodedParams.toString();
  }

  /**
   * This is used to insert vehicle type.
   * @param vehicleType
   * @returns
   */
  createVehicleType(vehicleType: any, domainToken:any) {
    const body = this.toUrlEncoded(vehicleType);
    const headers = this.addDomainHeaders();
    return this.http.post<any>(`${this.BASE_URL2}${this.INSERT_VEHICLE_TYPE}`, body, { headers });
  }

  /**
   * This function is used get vehicle fare setting list.
   * @param formData
   */
  getVehicleFareSettingsList(params: any):Observable<any> {
    const body = this.toUrlEncoded(params);
    const headers = this.addDomainHeaders();
    return this.http.post<any>(`${this.BASE_URL2}${this.END_POINT}`, body, { headers });
  }

  /**
   * This function is used to get vehicle list.
   * @param params
   * @returns
   */
  getVehicleList(params:any):Observable<any>{
    const token = JSON.parse(this.storage.getItem('currentUser')).token;
    const headers = this.addDomainHeaders();
    return this.http.get<any>(`${this.BASE_URL2}${this.VEHICLE_LIST}${'?city_id='}${params.city_id}${'&token='}${token}`, { headers});
  }
}
