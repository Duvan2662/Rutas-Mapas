import { Injectable, signal } from '@angular/core';
import {LngLat, LngLatBounds, LngLatLike, Map, Marker, Popup} from 'mapbox-gl';
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



  public createMarkerFromPlaces(places:Feature[], userLocation:[number, number]) {
    if (!this.map()) {
      throw  Error("Mapa no inicializado");
    }

    this.markers().forEach(marker => marker.remove());
    const newMarkers = [];
    for (const place of places) {
      const [longitude,latitude] = place.center
      const popup = new Popup()
        .setHTML(
          `
            <h6>${place.text_es}</h6>
            <span>${place.place_name}</span>
          `
        )
      const newMarker = new Marker()
        .setLngLat([longitude,latitude])
        .setPopup(popup)
        .addTo(this.map()!)

        newMarkers.push(newMarker);
    }
    this.markers.set(newMarkers);
    if (places.length === 0) {
      return
    }

    const bounds = new LngLatBounds();
    newMarkers.forEach(marker => bounds.extend(marker.getLngLat()));
    bounds.extend(userLocation)

    this.map()!.fitBounds(bounds,{
      padding:150
    });

  }




}
