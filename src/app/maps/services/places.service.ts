import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places.interface';
import { PlacesApiClient } from '../api/placesApiClient';

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

  private placesApi = inject(PlacesApiClient);
  public isLoadingPlaces = signal(false);
  public places = signal<Feature[]>([]);

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


  public getPlacesByQuery(query:string = '') {
    //TODO evaluar cuando el query es vacio

    if (this.latitude() === 0 && this.longitude() === 0) {
      throw Error('No ahi userLocation')
    }

    this.isLoadingPlaces.set(true);
    this.placesApi.get<PlacesResponse>(`q=${query}`,{
      params:{
        proximity: this.userLocation().join(',')
      }
    })
      .subscribe(resp => {
        console.log(resp.features);
        this.isLoadingPlaces.set(false);
        this.places.set(resp.features)
      })

  }
}
