import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places.interface';

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

  private http = inject(HttpClient);
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

    this.isLoadingPlaces.set(true);
    this.http.get<PlacesResponse>(`https://api.mapbox.com/search/geocode/v6/forward?q=${query}&proximity=-74.16801336419535,2C4.640612418987658&language=es&access_token=pk.eyJ1IjoiZHV2YW4xNyIsImEiOiJjbTA1cGJoa20wamF3Mm1vZXpuZzhvc2FzIn0.uKGdT4Lf5qV7uf-q10PBfA`)
      .subscribe(resp => {
        console.log(resp.features);
        this.isLoadingPlaces.set(false);
        this.places.set(resp.features)
      })

  }
}
