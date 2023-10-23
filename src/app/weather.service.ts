import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Secrets } from 'src/secrets';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = Secrets.secrets['apiKey'];
  private apiUrl = 'https://api.openweathermap.org/data/2.5';
  
  constructor(private http: HttpClient) {}

  getFiveDayForecast(city: string) {
    const params = {
      q: city,
      appid: this.apiKey,
      units: 'metric',
      cnt: '5' // Obtenemos datos para los próximos 5 días
    };

    return this.http.get(`${this.apiUrl}/forecast`, { params });
  }
}
