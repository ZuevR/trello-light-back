import { Component, OnDestroy, OnInit } from '@angular/core';
import { BoardService } from '../../../services/board.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Board } from '../../../shared/interfaces';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss']
})
export class BoardPageComponent implements OnInit, OnDestroy {

  id: string;
  bSub: Subscription;
  board: Board;
  display = false;

  constructor(
    private boardService: BoardService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.bSub = this.boardService.getBoard(this.id).subscribe((board: Board) => {
      this.board = board;
      console.log(board);
    }, error => {
      if (error.status === 403) {
        this.router.navigate(['/boards']);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.bSub) {
      this.bSub.unsubscribe();
    }
  }

}
