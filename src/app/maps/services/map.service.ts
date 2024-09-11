import { Injectable, signal } from '@angular/core';
import {LngLatLike, Map} from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map = signal<Map | undefined>(undefined);

  get isMapReady(){
    return !!this.map;
  }

  public setMap(map:Map){
    this.map.set(map);
  }

  public flyTo(coords:LngLatLike){
    if (!this.isMapReady) {
      throw Error('El mapa no esta inicializado');
    }

    this.map()?.flyTo({
      zoom:14,
      center:coords
    })

  }




}
