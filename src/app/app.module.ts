import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Asegúrate de agregar esta importación

import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import { WeatherService } from './weather.service'; // Debes mantener esta importación
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // Agrega FormsModule al arreglo de imports
    HttpClientModule
  ],
  providers: [WeatherService], // Agrega el servicio al arreglo de providers
  bootstrap: [AppComponent]
})
export class AppModule { }
