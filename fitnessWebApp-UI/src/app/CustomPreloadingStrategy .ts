import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
/*
* Custom preloading strategy to load all the modules that are marked for preloading.
*/
@Injectable({ providedIn: 'root' })
export class CustomPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data && route.data['preload']) {
      console.log(`Preloading ${route.path}`);
      return load();
    } else {
      return of(null);
    }
  }
}