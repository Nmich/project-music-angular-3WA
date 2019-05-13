import { Component, OnInit } from '@angular/core';
import { Album, Position } from '../albums';
import { AlbumService } from '../album.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
  animations: [

  ]
})
export class AlbumsComponent implements OnInit {

  albums: Album[] = [];
  count: number;
  isSearch: boolean = false;

  position = Position; // comme valeurs positions

  selectedAlbum: Album;
  title: string = "Details des chansons d'un album...";

  // service on doit DI ~ préparation des services par Angular éventuellement dépend d'autre(s) service(s)
  constructor(private aS: AlbumService) {
    //console.log('constructor AlbumsComponent');
    //console.log(this.aS.paginate(0, 2));
  }

  ngOnInit() {
    // vous pouvez passer en paramètre une fonction flèchée pour sort définie dans le service
    this.count = this.aS.count();
    this.albums = this.aS.paginate(0, environment.perPage);
  }

  ngOnChanges() {
    console.log('ngOnChanges AlbumsComponent')
  }

  onSelect(album: Album, $event) {
    this.selectedAlbum = album;
  }

  // TODO 
  playParent($event: Album) {
    this.aS.switchOn($event);
  }

  searchParent($event: Album[]) {
    this.albums = $event;
    this.isSearch = true;
  }

  reloadParent($event: boolean) {
    console.log($event);
    this.isSearch = false;

    if ($event) {
      this.albums = this.aS.paginate(0, environment.perPage);
    }
  }

  paginateParent($event: { start: number, end: number }) {

    const { start, end } = $event;
    this.albums = this.aS.paginate(start, end);
  }

}