import { AfterViewInit, Component, ElementRef, inject, signal, ViewChild, } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import {Map, Popup, Marker} from 'mapbox-gl';

@Component({
  selector: 'app-maps-view',
  standalone: true,
  imports: [],
  templateUrl: './maps-view.component.html',
  styleUrl: './maps-view.component.css'
})
export class MapsViewComponent implements AfterViewInit {
  @ViewChild('mapDiv')
  mapDivElement!:ElementRef

  private placesServices = inject(PlacesService);
  private mapServices = inject(MapService);




  ngAfterViewInit(): void {
    const [longitude, latitude] = this.placesServices.userLocation()
    if (longitude === 0 && latitude === 0) {
      throw Error('No ahi placeService.userLocation')
    }
    const map = new Map({
      container: this.mapDivElement.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [longitude,latitude], // starting position [lng, lat]
      zoom: 14, // starting zoom
    });

    const popup = new Popup()
      .setHTML(`
        <h6>Aqui estoy</h6>
        <span>Estoy en este lugar del mundo</span>
        `)

    new Marker({
      color: 'red'
    })
      .setLngLat([longitude,latitude])
      .setPopup(popup)
      .addTo(map)

   this.mapServices.setMap(map);
  }

}
