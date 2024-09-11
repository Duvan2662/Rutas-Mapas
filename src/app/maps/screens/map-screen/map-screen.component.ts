import { Component, inject } from '@angular/core';
import { PlacesService } from '../../services';
import { LoadingComponent } from '../../components/loading/loading.component';
import { MapsViewComponent } from "../../components/maps-view/maps-view.component";
import { AngularLogoComponent } from "../../components/angular-logo/angular-logo.component";
import { BtnMyLocationComponent } from '../../components/btn-my-location/btn-my-location.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';

@Component({
  selector: 'app-map-screen',
  standalone: true,
  imports: [LoadingComponent, MapsViewComponent, AngularLogoComponent,BtnMyLocationComponent, SearchBarComponent],
  templateUrl: './map-screen.component.html',
  styleUrl: './map-screen.component.css'
})
export class MapScreenComponent {

  private placesService = inject(PlacesService);

  get isUserLocationReady(): boolean {
    return this.placesService.isUserLocationReady;
  }

}
