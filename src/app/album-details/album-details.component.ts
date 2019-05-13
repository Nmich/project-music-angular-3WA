import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

// typeScript structure de type
import { Album } from '../albums';
import { AlbumService } from '../album.service';

import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss'],
  animations: [
    trigger('details', [
      state('open', style({
        backgroundColor: 'yellow'
      })),
      state('opening', style({
        backgroundColor: 'red',
      })),
      transition('opening => open', [
        animate('1s')
      ]),
    ]),
  ],
})
export class AlbumDetailsComponent implements OnInit, OnChanges {

  @Input() album: Album; // une fois que l'on a sélectionné un album
  @Input() title: string;

  @Output() onPlay: EventEmitter<Album> = new EventEmitter();

  songs: string[]; // array de string
  isOpen: boolean = false;
  isActive: boolean = true;

  // lifeCycle 
  constructor(private aS: AlbumService) {
    // console.log('constructor AlbumDetailsComponent 1');

    this.aS.buttonPlay.subscribe(state => {
      this.isActive = state;
      console.log(state)
    })
  }

  ngOnInit() {
    // console.log('ngOnInit AlbumDetailsComponent');
  }

  // à chaque fois qu'il détecte une valeur qui a changé 
  // et que l'on passe au Component enfant []
  ngOnChanges() {

    // on vérifie que c'est != null
    if (this.album) {
      const albumList = this.aS.getAlbumList(this.album.id);

      if (albumList) this.songs = albumList.list;
      this.toggle();
    }
  }

  play(album: Album) {
    this.onPlay.emit(album); // émettre un album vers le parent
  }

  stop(album : Album){
    this.aS.stop(album);
  }

  toggle() {
    this.isOpen = false;

    const animate = setInterval(() => {
      this.isOpen = !this.isOpen;
      clearInterval(animate);
    }
      , 10);
  }
}
