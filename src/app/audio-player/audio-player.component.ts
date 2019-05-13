import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../album.service';
import { Album } from '../albums';

// import { interval } from 'rxjs'; // Observable
// import { take, map, mergeMap } from 'rxjs/operators'; // opérateurs

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit {

  current: number = 1; // numero d'album
  total: number = null; // total des albums
  ratio: number = 0; // ratio pour la bar de progression

  constructor(private aS: AlbumService) { }

  ngOnInit() {

    // définir un streaming de chanson simulé
    // Obsevable(Observer)
    this.aS.subjectAlbum.subscribe(album => {

      // chaque album dans les sources dur 2 minutes
      this.total = Math.floor(album.duration / 120);

      const interval = setInterval(() => {
        if (this.current < this.total) {
          this.current++;
          this.ratio = Math.floor(this.current * (100 / this.total));
        } else {
          clearInterval(interval);
          this.total = null;
          this.ratio = 0;
          this.current = 1;
          this.aS.switchOff(album);
        }
      }, 1000)

    });

  }


}
