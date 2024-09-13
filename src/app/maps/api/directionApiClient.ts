import { HttpClient, HttpHandler } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { environment } from "../../../environments/environments";

@Injectable({
  providedIn:'root'
})

export class DirectionApiClient extends HttpClient {
  // public baseUrl = signal('https://api.mapbox.com/search/geocode/v6/forward?');
  public baseUrl = signal('https://api.mapbox.com/directions/v5/mapbox/driving');

  constructor(handler:HttpHandler){
    super(handler);
  }

  public override get<T>(url:string){
    url= this.baseUrl() + url;
    return super.get<T>(url,{
      params:{
        alternatives:false,
        geometries: 'geojson',
        language:'es',
        overview:'full',
        steps:false,
        access_token:environment.mapbox_key
      }
    });
  }
}
