import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Asegúrate de agregar esta importación
import { MaterialModule } from './MaterialModule';

import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import { WeatherService } from './weather.service'; // Debes mantener esta importación
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule, 
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [WeatherService], // Agrega el servicio al arreglo de providers
  bootstrap: [AppComponent]
})
export class AppModule { }
