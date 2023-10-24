import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';
import { List, Root } from '../models/five-days-forecast';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
  city = '';
  weatherData: List[] = [];
  
  constructor(private weatherService: WeatherService) {}

  getFiveDayForecast() {
    if (this.city.trim() === '') {
      return;
    }

    this.weatherService.getFiveDayForecast(this.city)
      .subscribe(data => {
        this.weatherData = data.list;
      });
  }
}
