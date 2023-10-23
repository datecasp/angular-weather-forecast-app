import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
  city = '';
  weatherData: any;

  constructor(private weatherService: WeatherService) {}

  getFiveDayForecast() {
    if (this.city.trim() === '') {
      return;
    }

    this.weatherService.getFiveDayForecast(this.city)
      .subscribe(data => {
        this.weatherData = data;
      });
  }
}
