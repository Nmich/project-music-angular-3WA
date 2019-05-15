import {
  Injectable
} from '@angular/core';
import {
  Album,
  List,
  Position
} from './albums'; // types
import {
  ALBUMS,
  ALBUM_LISTS
} from './mock-albums';

import {
  Subject,
  Observable
} from 'rxjs'; // librarie à parti intégrée dans Angular
// Service et classe utile
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
// Opérateurs de RxJS
import {
  map
} from 'rxjs/operators';
// libraire utile pour le traitement de données
import * as _ from 'lodash';
// définition des headers
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  // convention dans l'API ajoutez votre identifant de base de données
  private albumsUrl = 'https://app-music-276e0.firebaseio.com/albums';
  private albumListsUrl = 'https://app-music-276e0.firebaseio.com/albumLists';


  private _albums: Album[] = ALBUMS; // _ convention private et protected
  private _albumList: List[] = ALBUM_LISTS;

  // Observer => next publication d'information et Observable d'attendre des informations et d'exécuter du code
  sendCurrentNumberPage = new Subject < {
    current: number,
    position: Position
  } > ();
  subjectAlbum = new Subject < Album > ();
  buttonPlay = new Subject < boolean > ();

  constructor(private http: HttpClient) {}

  getAlbums(): Observable < Album[] > {
    return this.http.get < Album[] > (this.albumsUrl + '/.json', httpOptions).pipe(
      // Préparation des données avec _.values pour avoir un format exploitable dans l'application => Array de values JSON
      map(albums => _.values(albums)),
      // Ordonnez les albums par ordre de durées décroissantes
      map(albums => {
        return this._albums.sort((a, b) => {
          return b.duration - a.duration
        });
      })
    )
  }

  getAlbum(id: string): Observable < Album > {
    // URL/ID/.json pour récupérer un album
    return this.http.get < Album > (this.albumsUrl + `/${id}/.json`).pipe(map(album => album) // JSON
    );
  }

  getAlbumList(id: string): List {
    return this._albumList.find(l => l.id === id);
  }

  count(): number {
    return this._albums == null ? 0 : this._albums.length;
  }

  switchOn(album: Album, options = httpOptions): Observable < Album > {
    this.buttonPlay.next(false);
    album.status = "on";

    // On peut faire une copie de l'objet album mais ce n'est pas fondamental
    // méthode { ...album } fait une copie
    const Album = {
      ...album
    };

    return this.http.put < Album > (`${this.albumsUrl}/${album.id}/.json`, Album, options);
  }

  switchOff(album: Album, options = httpOptions): Observable < Album > {
    this.buttonPlay.next(true);
    album.status = 'off';

    // On peut faire une copie de l'objet album mais ce n'est pas fondamental
    // méthode { ...album } fait une copie
    const Album = {
      ...album
    };

    return this.http.put < Album > (`${this.albumsUrl}/${album.id}/.json`, Album, options)
  }

  paginate(start: number, end: number): Observable<Album[]> {

    return this.http.get<Album[]>(this.albumsUrl + '/.json', httpOptions).pipe(
      map(albums => _.values(albums)),
      map(albums => albums.slice(start, end)),
    );
}


search(word: string | null): Observable<Album[]> {

  return this.http.get<Album[]>(this.albumsUrl + '/.json', httpOptions).pipe(

    map(albums => _.values(albums)),

    map(albums => {
      let Albums = [];
      if (word.length > 3) {
        albums.forEach(album => {
          if (album.title.includes(word)) Albums.push(album);
        })
      }

      return Albums;
    })
  );
}

}
