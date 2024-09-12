import { Component, inject, signal, Signal } from '@angular/core';
import { PlacesService } from '../../services';
import { Feature } from '../../interfaces/places.interface';
import { MapService } from '../../services/map.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent {

  private placesService = inject(PlacesService);
  private MapService = inject(MapService);
  public selectedId = signal('');


  get isLoadingPlaces(): boolean {
    return this.placesService.isLoadingPlaces();
  }
  get places(): Feature[]{
    return this.placesService.places();
  }


  public flyTo(place:Feature) {
    this.selectedId.set(place.id)
    const {longitude,latitude} = place.properties.coordinates
    this.MapService.flyTo([longitude,latitude])
  }

}
