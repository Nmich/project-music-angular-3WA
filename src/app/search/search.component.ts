import { Component, OnInit, Output, EventEmitter, AfterViewChecked, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlbumService } from '../album.service';
import { Album } from '../albums';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() searchAlbums: EventEmitter<Album[]> = new EventEmitter();
  @Output() reload: EventEmitter<boolean> = new EventEmitter();

  word: string = '';
  isSumit: boolean = false;

  constructor(private aS: AlbumService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const albums = this.aS.search(form.value['word']);
    if (albums) {
      this.searchAlbums.emit(albums);
      this.isSumit = true;
    }
  }

  onChangeEmit($event :string) {
    if ($event.length == 0 && this.isSumit)
      this.reload.emit(true);
  }

}
