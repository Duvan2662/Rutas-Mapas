import { Injectable, signal } from '@angular/core';
import {LngLatLike, Map, Marker, Popup} from 'mapbox-gl';
import { Feature } from '../interfaces/places.interface';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map = signal<Map | undefined>(undefined);
  private markers = signal<Marker[]>([]);

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



  public createMarkerFromPlaces(places:Feature[]) {
    if (!this.map()) {
      throw  Error("Mapa no inicializado");
    }
    this.markers().forEach(marker => marker.remove());
    const newMarkers = [];
    for (const place of places) {
      const {longitude, latitude} = place.properties.coordinates;
      const popup = new Popup()
        .setHTML(
          `
            <h6>${place.properties.name}</h6>
            <span>${place.properties.name_preferred}</span>
          `
        )
      const newMarker = new Marker()
        .setLngLat([longitude,latitude])
        .setPopup(popup)
        .addTo(this.map()!)

        newMarkers.push(newMarker);
    }
    this.markers.set(newMarkers)

  }




}
