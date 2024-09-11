import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {


  public latitude = signal<number>(0);
  public longitude = signal<number>(0);

  public userLocation = computed(() => [
    this.longitude(),
    this.latitude()
  ]);

  // Verifica si las coordenadas son diferentes de [0, 0]
  get isUserLocationReady(): boolean {
    return this.latitude() !== 0 && this.longitude() !== 0;
  }

  constructor() {
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.longitude.set(coords.longitude);
          this.latitude.set(coords.latitude);
          resolve([this.longitude(), this.latitude()]);
        },
        (error) => {
          alert('No se pudo obtener la geolocalización');
          console.log(error);
          reject();
        }
      );
    });
  }
}
