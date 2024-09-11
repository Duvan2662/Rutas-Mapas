import { Component, inject } from '@angular/core';
import { PlacesService } from '../../services';
import { LoadingComponent } from '../../components/loading/loading.component';
import { MapsViewComponent } from "../../components/maps-view/maps-view.component";

@Component({
  selector: 'app-map-screen',
  standalone: true,
  imports: [LoadingComponent, MapsViewComponent],
  templateUrl: './map-screen.component.html',
  styleUrl: './map-screen.component.css'
})
export class MapScreenComponent {

  private placesService = inject(PlacesService);

  get isUserLocationReady(): boolean {
    return this.placesService.isUserLocationReady;
  }

}
