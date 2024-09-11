import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation = signal<[number,number]>([0, 0]);

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  constructor() {
    this.getUserLocation();
  }



  public async getUserLocation(): Promise<[number,number]> {


    return new Promise ( (resolve, reject) => {

      navigator.geolocation.getCurrentPosition(
        ({coords}) => {
          this.userLocation.set([coords.longitude, coords.latitude]);
          resolve(this.userLocation())
        },
        (error) => {
          alert('No se puedo obtener la geolocalizacion');
          console.log(error);
          reject();
        }
      )
    })
  }
}
