import { Injectable } from '@angular/core';
import { ApiService } from '@core/authentication/api-service';
import { apiUrl } from '@core/authentication/apiUrl';
import { environment } from '@env/environment';
import { VehicleFareSettingsService } from './vehicle-fare-settings.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehicleTypeDetailsService {
  private url_1: any;
  private url_2: any;
  private url_3: any;
  private url_4: any;
  private url_5: any;
  private url_6: any;
  private url_7: any;
  private url_8: any;
  private url_9: any;
  private image_url: any;

  constructor(private apiService: ApiService, private http: HttpClient, private vehicleFareService: VehicleFareSettingsService) {
    this.url_1 = apiUrl.update_operator_vehicle_type;
    this.url_2 = apiUrl.fetch_operator_request_radius;
    this.url_3 = apiUrl.update_operator_vehicle_type;
    this.url_4 = apiUrl.update_vehicle_set;
    this.url_5 = apiUrl.fetch_vehicle_set;
    this.url_6 = apiUrl.internalFetchVehicleImagesFare;
    this.url_7 = apiUrl.update_operator_fares;
    this.url_8 = apiUrl.fetch_operator_request_radius;
    this.url_9 = apiUrl.update_operator_request_radius;
    this.image_url = apiUrl.image_upload;
  }

  /**
   * get fare structure data.
   * @param body
   * @returns
   */
  getFareStructure(body: any) {
    return this.apiService.postDataTaxiOperations(this.url_1, body);
  }

  /**
   * used to change enable/disbale.
   * @param body
   * @returns
   */
  getStatusEnableDisable(body: any) {
    return this.apiService.postDataTaxiOperations(this.url_3, body);
  }

  /**
   * used to chage the vehicle set.
   * @param body
   * @returns
   */
  changeVehicleSet(params: any) {
    return this.apiService.postDataTaxiOperations(this.url_4, '', params);
  }

  /**
   * used to get vehicle set list.
   * @param params
   * @returns
   */
  getVehicleSetList(params: any) {
    return this.apiService.getDataTaxi(`${this.url_5}`, params);
  }

  /**
   * used to get fare images
   */
  getVehicleFarImages(body: any) {
    return this.apiService.postDataTaxiOperations(this.url_6, body);
  }

  /**
   * Used to update operator fares.
   */
  updateOperatorFares(payLoad: any) {
    return this.apiService.postDataTaxiOperations(this.url_7, payLoad);
  }

  /**
   * Used to fetch operator radius.
   * @param body
   * @returns
   */
  fetchOperatorRadius(body: any) {
    return this.apiService.postDataTaxiOperations(this.url_8, body);
  }

  /**
   * update operator radius.
   * @param body
   * @returns
   */
  updateOperatorRadius(body: any) {
    return this.apiService.postDataTaxiOperations(this.url_9, body);
  }


  imageUpload(formData: any, token: any) {
    return this.apiService.postDataTaxiOperations(`${this.image_url}?token=${token}`, formData);
  }

  //'https://operations.venustaxi.in/internal/upload_img_to_s3?token=db4aba455a7f8e7c280ff6e69d762e5ee804e8c7a865f777cf35b88d13b492d3'
}
