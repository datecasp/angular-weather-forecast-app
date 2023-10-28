import { Component, OnInit } from '@angular/core';
import { Map, View } from 'ol';
import { defaults as defaultControls } from 'ol/control.js';
import { createStringXY } from 'ol/coordinate';
import TileLayer from 'ol/layer/Tile';
import { useGeographic } from 'ol/proj';
import OSM from 'ol/source/OSM';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CustomMousePosition } from '../CustomMousePosition';
import { List } from '../models/five-days-forecast';
import { WeatherService } from '../weather.service';

useGeographic();
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  city = '';
  cityCountry = '';
  weatherData: List[] = [];
  selectedRowIndex: number = -1;
  showSelectedRow: boolean = false;
  icon: string = '';
  cityError: boolean = false;
  logoUri = 'assets/LogoIntro.png';
  hasForecast: boolean = false;
  loadMap: boolean = false;
  map: Map = new Map();
  view: View = new View({
    center: [0, 0],
    zoom: 2,
  });
  clickPosition: number[] = [];

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    const mapModal = document.getElementById('mapModal');

    if (mapModal) {
      mapModal.addEventListener('shown.bs.modal', () => {
        this.initMap();
      });
    }
  }

  mousePositionControl = new CustomMousePosition({
    coordinateFormat: createStringXY(4),
    projection: 'EPSG:4326',
  });

  private initMap(): void {
    if (this.loadMap) {
      this.map = new Map({
        controls: defaultControls().extend([this.mousePositionControl]),
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        target: 'map',
        view: this.view,
      });
    }
  }

  getFiveDayForecast() {
    if (this.city.trim() === '') {
      return;
    }

    this.weatherService
      .getFiveDayForecast(this.city)
      .pipe(
        catchError((error) => {
          this.cityError = true;
          this.hasForecast = false;
          return throwError(error);
        })
      )
      .subscribe((data) => {
        if (data && data.list && data.list.length > 0) {
          this.cityError = false;
          this.hasForecast = true;
          for (let i = 0; i < data.list.length; i++) {
            data.list[i].weather[0].icon = this.descriptionIconSelector(
              data.list[i].weather[0].main,
              data.list[i].weather[0].description
            );
          }
          this.cityCountry = data.city.name.concat(
            ' (' + data.city.country + ')'
          );
          this.weatherData = data.list;
        }
      });
  }

  getInitPosition() {
    this.clickPosition = this.mousePositionControl.getCoordinatesJSON();
  }

  getFiveDayForecastByLatLong() {
    const coordinatesJSON = this.mousePositionControl.getCoordinatesJSON();
    if(this.clickPosition[0] !== coordinatesJSON[0] || this.clickPosition[1] !== coordinatesJSON[1]) return;
    this.weatherService
      .getFiveDayForecastByLatLong(coordinatesJSON)
      .subscribe((data) => {
        if (data && data.list && data.list.length > 0) {
          this.cityError = false;
          this.hasForecast = true;
          for (let i = 0; i < data.list.length; i++) {
            data.list[i].weather[0].icon = this.descriptionIconSelector(
              data.list[i].weather[0].main,
              data.list[i].weather[0].description
            );
          }
          /* this.cityCountry = data.city.name.concat(
            ' (' + data.city.country + ')'
          ); */
          this.cityCountry = ' lat: '+coordinatesJSON[0]+', lon: '+coordinatesJSON[1];
          this.weatherData = data.list;
        }
      });

    var btnClose = document.getElementById('btnClose');
    this.map.dispose();
    btnClose?.click();
  }

  public onMapReady() {
    console.log('Map Ready');
  }

  /**
   * Selects icon to show based in wether main and description
   * @param weatherMain
   * @param weatherDescription
   * @returns URI of icon to show
   */
  descriptionIconSelector(
    weatherMain: string,
    weatherDescription: string
  ): string {
    let icon: string = '';
    switch (weatherMain) {
      case 'Clouds':
        if (
          weatherDescription === 'few clouds' ||
          weatherDescription === 'scattered clouds'
        ) {
          icon = 'assets/cloudy.png';
        } else {
          icon = 'assets/overcast.png';
        }
        break;
      case 'Snow':
        icon = 'assets/snow.png';
        break;
      case 'Clear':
        icon = 'assets/sunny.png';
        break;
      case 'Drizzle':
        icon = 'assets/lightrain.png';
        break;
      case 'Thunderstorm':
        icon = 'assets/thunderstorm.png';
        break;
      case 'Rain':
        if (weatherDescription === 'light rain') {
          icon = 'assets/lightrain.png';
        } else {
          icon = 'assets/rain.png';
        }
        break;
      default:
        icon = 'assets/atmosphere.png';
        break;
    }

    return icon;
  }
}
