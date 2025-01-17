import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
import { apiUrl } from '@core/authentication/apiUrl';
import { BehaviorSubject, Observable } from 'rxjs';
import { EncryptDecryptService } from '@core/authentication/encrypt-decrypt.service';

@Injectable({
    providedIn: 'root'
})
export class VehicleListService {
    public readonly BASE_URL2: string;
    protected readonly EncryptDecryptService= inject(EncryptDecryptService);
    public readonly END_POINT: any;
    public readonly VEHICLE_LIST: any;
    public readonly ALLVEHICLE_TYPE_LIST;
    private domainToken: any;
    private storage: any = localStorage;
    requestRideType:number=1;
    operatorId: any;


    constructor(private http: HttpClient) {
        this.getDomainToken();
        this.BASE_URL2 = environment.BASE_URL;
        this.VEHICLE_LIST = apiUrl.vehicleList;
        this.ALLVEHICLE_TYPE_LIST = apiUrl.allvehicleTypeList;
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
        this.domainToken = JSON.parse(this.storage.getItem('domain-token'));
        return this.domainToken;
    }

    /**
     * This function is used to get vehicle list.
     * @param params
     * @returns
     */
    getVehicleTypeList(params: any): Observable<any> {
        const token = JSON.parse(this.storage.getItem('currentUser')).token;
        const headers = this.addDomainHeaders();
        return this.http.get<any>(`${this.BASE_URL2}${this.VEHICLE_LIST}${'?city_id='}${params.city_id}${'&token='}${token}`, { headers });
    }

    /**
     * This is used to get all vehicle type list.
     * @param params
     * @returns
     */
    getAllVehicleTypeList(params: any) {
        const token = JSON.parse(this.storage.getItem('currentUser')).token;
        const headers = this.addDomainHeaders();
        return this.http.get<any>(`${this.BASE_URL2}${this.ALLVEHICLE_TYPE_LIST}${'?vehicle_type='}${params.vehicle_type}${'&token='}${token}`, { headers });
    }
}
