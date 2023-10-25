import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';
import { List, Root } from '../models/five-days-forecast';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent {
  city = '';
  weatherData: List[] = [];
  icon: string ="";

  constructor(private weatherService: WeatherService) {}

  getFiveDayForecast() {
    if (this.city.trim() === '') {
      return;
    }

    this.weatherService.getFiveDayForecast(this.city).subscribe((data) => {
      this.icon = this.descriptionIconSelector(
        data.list[0].weather[0].main,
        data.list[0].weather[0].description
      );
      this.weatherData = data.list;
    });
  }

  /**
   * Selects icon to show based in wether main and description
   * @param weatherMain 
   * @param weatherDescription 
   * @returns URI od icon to show
   */
  descriptionIconSelector(weatherMain: string, weatherDescription: string): string {
    let icon: string = "";
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
