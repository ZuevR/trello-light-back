import { Component, OnInit } from '@angular/core';

import { BoardService } from '../../../services/board.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(
    public boardService: BoardService
  ) {
  }

  ngOnInit() {
    this.boardService.getAllBoards().subscribe(response => {
      console.log(response);
    });
  }

}
