import { Component, inject, OnInit } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-maps-view',
  standalone: true,
  imports: [],
  templateUrl: './maps-view.component.html',
  styleUrl: './maps-view.component.css'
})
export class MapsViewComponent implements OnInit {
  private placesServices = inject(PlacesService);

  ngOnInit(): void {
    console.log(this.placesServices.userLocation());

  }

}
