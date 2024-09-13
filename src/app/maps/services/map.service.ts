import { inject, Injectable, signal } from '@angular/core';
import {AnySourceData, LngLat, LngLatBounds, LngLatLike, Map, Marker, Popup, SourceSpecification} from 'mapbox-gl';
import { Feature } from '../interfaces/places.interface';
import { DirectionApiClient } from '../api/directionApiClient';
import { DirectionsResponse, Route } from '../interfaces/directions.interface';


@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map = signal<Map | undefined>(undefined);
  private markers = signal<Marker[]>([]);
  private directionsApi = inject(DirectionApiClient);

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


  public getRouteBetweenPoints(start:[number,number], end:[number,number]) {

    this.directionsApi.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`)
      .subscribe(resp => this.drawPolyline(resp.routes[0]));
  }


  private drawPolyline(route:Route) {
    // console.log({Distancia: route.distance / 1000, duration: route.duration/60});
    if (!this.map()) {
      throw new Error("Mapa no inicializado");
    }

    const coords = route.geometry.coordinates;
    const bounds = new LngLatBounds();

    coords.forEach(([lng, lat]) => bounds.extend([lng,lat]))

    this.map()?.fitBounds(bounds,{
      padding:150
    })

    //polyLine
    // const sourceData:AnySourceData
    const sourceData:SourceSpecification = {
      type:"geojson",
      data:{
        type:"FeatureCollection",
        features: [
          {
            type:"Feature",
            properties:{},
            geometry:{
              type:"LineString",
              coordinates: coords
            }
          }
        ]
      }
    }

    //TODO limpiar ruta  previa
    if (this.map()!.getLayer('RouteString')) {
      this.map()!.removeLayer('RouteString');
      this.map()!.removeSource('RouteString');
    }

    this.map()!.addSource('RouteString',sourceData);
    this.map()!.addLayer({
      id:'RouteString',
      type:'line',
      source:'RouteString',
      layout:{
        "line-cap":"round",
        "line-join":"round"
      },
      paint:{
        "line-color":"black",
        "line-width":3
      }
    })

  }




}
