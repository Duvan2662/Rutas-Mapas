import { Component, inject } from '@angular/core';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  standalone: true,
  imports: [],
  templateUrl: './btn-my-location.component.html',
  styleUrl: './btn-my-location.component.css'
})
export class BtnMyLocationComponent {

  private mapServices = inject(MapService);
  private placesServices = inject(PlacesService);


  public goToMiLocation() {
    if (!this.placesServices.isUserLocationReady) {
      throw Error("No ahi ubicacion de usuario");
    }
    if (!this.mapServices.isMapReady) {
      throw Error("No ahi mapa disponible");
    }
    const [longitude, latitude] = this.placesServices.userLocation()
    this.mapServices.flyTo([longitude,latitude])
    console.log('Ir a mi ubicación');

  }
}
