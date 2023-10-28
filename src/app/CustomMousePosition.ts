import MousePosition from 'ol/control/MousePosition';
import { Coordinate } from 'ol/coordinate';
import { unlistenByKey } from 'ol/events';

export class CustomMousePosition extends MousePosition {
  private currentPosition: Coordinate | null = null;
  private pointerMoveListener: any;
  private lat: number = 0;
  private lon: number = 0;

  constructor(options?: CustomMousePositionOptions) {
    super(options);
    this.pointerMoveListener = this.getMap()?.on('click', (event) => {
      var text = document.getElementById('map')?.innerText ?? '';
      this.extractCoordinates(text);
      this.currentPosition = [this.lat, this.lon];
    });
  }

  getCoordinatesJSON(): number[] {
    var text = document.getElementById('map')?.innerText ?? '';
    this.extractCoordinates(text);
    this.currentPosition = [this.lat, this.lon];
    return this.currentPosition;
  }

  private extractCoordinates(innerText: string) {
    const regex: RegExp = /([-+]?\d+\.\d+),\s+([-+]?\d+\.\d+)/;
    const matches: RegExpMatchArray | null = innerText.match(regex);

    if (matches) {
      this.lat = parseFloat(matches[1]);
      this.lon = parseFloat(matches[2]);
    } else {
      console.log('Something went wrong with location.');
    }
  }
}

export interface CustomMousePositionOptions {}
