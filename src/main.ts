import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { environment } from './environments/environments';

Mapboxgl.accessToken = environment.mapbox_key;

if (!navigator.geolocation) {
  alert("Navegador no soporta la geolocalizacion cambia de navegador")
  throw new Error("Navegador no soporta la geolocalizacion cambia de navegador");
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
